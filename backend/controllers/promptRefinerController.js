// controllers/promptRefinerController.js
// Multi-Modal Prompt Refinement System
// Processes text, images, PDFs, DOCX and combines them into structured prompts

import { createWorker } from 'tesseract.js';
import { createCanvas } from 'canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import mammoth from 'mammoth';
import { setTimeout as delay } from 'timers/promises';

/**
 * PROMPT REFINEMENT TEMPLATE STRUCTURE
 * 
 * {
 *   intent: string,              // Core purpose/goal of the prompt
 *   requirements: string[],      // Key functional requirements
 *   constraints: string[],        // Technical/business constraints
 *   deliverables: string[],      // Expected outputs
 *   metadata: {
 *     sourceTypes: string[],     // ['text', 'image', 'pdf', 'docx']
 *     confidence: number,        // 0-1 confidence score
 *     extractedText: string,     // Raw extracted text
 *     timestamp: string
 *   }
 * }
 */

// Helper: Extract text from image using OCR
async function extractTextFromImage(buffer, lang = 'eng') {
  try {
    const worker = await createWorker();
    const { data } = await worker.recognize(buffer, lang);
    await worker.terminate();
    return data.text.trim();
  } catch (err) {
    throw new Error(`Image OCR failed: ${err.message}`);
  }
}

// Helper: Extract text from PDF
async function extractTextFromPDF(buffer, lang = 'eng') {
  try {
    let uint8buf;
    if (buffer instanceof Uint8Array && buffer.constructor && buffer.constructor.name === 'Uint8Array') {
      uint8buf = buffer;
    } else {
      uint8buf = new Uint8Array(buffer.length);
      uint8buf.set(buffer);
    }

    const loadingTask = getDocument({ data: uint8buf });
    const pdf = await loadingTask.promise;
    const worker = await createWorker();
    const pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ').trim();

      // If page is empty/minimal, use OCR
      if (!pageText || pageText.length < 5) {
        const viewport = page.getViewport({ scale: 2 });
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext('2d');
        await page.render({ canvasContext: context, viewport }).promise;
        const imgBuffer = canvas.toBuffer('image/png');
        const { data } = await worker.recognize(imgBuffer, lang);
        pages.push(data.text);
      } else {
        pages.push(pageText);
      }
    }

    await worker.terminate();
    return pages.join('\n\n').trim();
  } catch (err) {
    throw new Error(`PDF extraction failed: ${err.message}`);
  }
}

// Helper: Extract text from DOCX
async function extractTextFromDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  } catch (err) {
    throw new Error(`DOCX extraction failed: ${err.message}`);
  }
}

// Helper: Call Hugging Face model for prompt refinement
async function callHuggingFaceModel(model, input, options = {}) {
  // Try router endpoint first, fallback to inference API if needed
  const endpoints = [
    `https://router.huggingface.co/models/${encodeURIComponent(model)}`,
    `https://api-inference.huggingface.co/models/${encodeURIComponent(model)}`
  ];

  const fetchOpts = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(typeof input === 'string' ? { inputs: input } : input),
  };

  // Try each endpoint with retry logic
  for (const url of endpoints) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(url, fetchOpts);
        if (!res.ok) {
          if (res.status === 429 || res.status === 503) {
            await delay(1000 * (attempt + 1));
            continue;
          }
          // If 410 Gone or other permanent error, try next endpoint
          if (res.status === 410) {
            break; // Try next endpoint
          }
          const text = await res.text().catch(() => '');
          throw new Error(`HF API error: ${res.status} ${res.statusText} ${text}`);
        }
        return await res.json();
      } catch (err) {
        if (attempt === 2) {
          // Last attempt for this endpoint, try next one or throw
          if (endpoints.indexOf(url) === endpoints.length - 1) {
            throw err; // Last endpoint, throw error
          }
          break; // Try next endpoint
        }
        await delay(600 * (attempt + 1));
      }
    }
  }
  throw new Error('All Hugging Face endpoints failed');
}

// Helper: Refine extracted text into structured prompt using AI
async function refinePromptWithAI(extractedText) {
  try {
    // Use a text generation model to create structured output
    // We'll use facebook/bart-large-cnn for summarization and structure extraction
    const model = 'facebook/bart-large-cnn';
    
    // Create a structured prompt for the AI
    const refinementPrompt = `Extract and structure the following content into a clear, actionable prompt. Identify:
1. Core Intent: What is the main goal or purpose?
2. Requirements: List key functional requirements (bullet points)
3. Constraints: Any technical or business limitations mentioned
4. Deliverables: What outputs are expected?

Content to analyze:
${extractedText}

Format your response as structured sections clearly labeled.`;

    const response = await callHuggingFaceModel(model, {
      inputs: refinementPrompt,
      parameters: {
        max_length: 500,
        min_length: 100,
        num_beams: 4,
      },
      options: { wait_for_model: true }
    });

    // Parse the AI response
    let refinedText = '';
    if (Array.isArray(response)) {
      refinedText = response[0]?.summary_text || response[0] || '';
    } else if (response.summary_text) {
      refinedText = response.summary_text;
    } else if (typeof response === 'string') {
      refinedText = response;
    } else {
      refinedText = JSON.stringify(response);
    }

    return refinedText.trim();
  } catch (err) {
    console.error('AI refinement error:', err);
    // Return null to indicate AI failed, will use fallback in main controller
    return null;
  }
}

// Fallback: Rule-based extraction when AI fails
function extractStructuredInfo(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Simple heuristics to extract structure
  const intent = lines[0] || 'Purpose not clearly specified';
  const requirements = lines.filter(l => 
    l.toLowerCase().includes('requirement') || 
    l.toLowerCase().includes('need') ||
    l.toLowerCase().includes('must') ||
    l.startsWith('-') ||
    l.startsWith('*')
  ).slice(0, 10);
  
  const constraints = lines.filter(l =>
    l.toLowerCase().includes('constraint') ||
    l.toLowerCase().includes('limit') ||
    l.toLowerCase().includes('cannot') ||
    l.toLowerCase().includes('must not')
  ).slice(0, 5);
  
  const deliverables = lines.filter(l =>
    l.toLowerCase().includes('deliverable') ||
    l.toLowerCase().includes('output') ||
    l.toLowerCase().includes('result') ||
    l.toLowerCase().includes('should produce')
  ).slice(0, 5);

  return {
    intent,
    requirements: requirements.length > 0 ? requirements : ['Requirements not explicitly stated'],
    constraints: constraints.length > 0 ? constraints : ['No constraints specified'],
    deliverables: deliverables.length > 0 ? deliverables : ['Deliverables not explicitly defined']
  };
}

// Helper: Parse AI response into structured format
function parseRefinedText(refinedText, originalText) {
  // Ensure refinedText is a string
  if (typeof refinedText !== 'string') {
    refinedText = String(refinedText);
  }

  const sections = {
    intent: '',
    requirements: [],
    constraints: [],
    deliverables: []
  };

  // Try to parse structured sections from AI response
  const intentMatch = refinedText.match(/(?:Core Intent|Intent|Purpose|Goal)[:]\s*(.+?)(?:\n|$)/i);
  sections.intent = intentMatch ? intentMatch[1].trim() : refinedText.split('\n')[0] || 'Purpose not clearly specified';

  // Extract requirements
  const reqSection = refinedText.match(/(?:Requirements|Requirement)[:]([\s\S]*?)(?:\n(?:Constraints|Deliverables)|$)/i);
  if (reqSection) {
    sections.requirements = reqSection[1]
      .split(/[•\-\*]/)
      .map(r => r.trim())
      .filter(r => r.length > 0)
      .slice(0, 10);
  }

  // Extract constraints
  const constraintSection = refinedText.match(/(?:Constraints|Constraint)[:]([\s\S]*?)(?:\n(?:Deliverables|$)|$)/i);
  if (constraintSection) {
    sections.constraints = constraintSection[1]
      .split(/[•\-\*]/)
      .map(c => c.trim())
      .filter(c => c.length > 0)
      .slice(0, 5);
  }

  // Extract deliverables
  const deliverableSection = refinedText.match(/(?:Deliverables|Deliverable)[:]([\s\S]*?)$/i);
  if (deliverableSection) {
    sections.deliverables = deliverableSection[1]
      .split(/[•\-\*]/)
      .map(d => d.trim())
      .filter(d => d.length > 0)
      .slice(0, 5);
  }

  // If parsing failed, use fallback
  if (sections.requirements.length === 0 && sections.constraints.length === 0 && sections.deliverables.length === 0) {
    const fallback = extractStructuredInfo(originalText);
    return {
      intent: fallback.intent || sections.intent,
      requirements: fallback.requirements || sections.requirements,
      constraints: fallback.constraints || sections.constraints,
      deliverables: fallback.deliverables || sections.deliverables
    };
  }

  return sections;
}

// Validation: Check if input is relevant for prompt refinement
function validateInput(text) {
  if (!text || text.trim().length < 10) {
    return { valid: false, reason: 'Input too short. Minimum 10 characters required.' };
  }

  // Check for spam/irrelevant content
  const spamPatterns = [
    /^[a-z0-9]{1,3}$/i, // Single words or very short
    /^(.)\1{20,}$/, // Repeated characters
    /^https?:\/\/\S+$/, // Just a URL
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(text.trim())) {
      return { valid: false, reason: 'Input appears to be spam or irrelevant.' };
    }
  }

  // Check if text is meaningful (has multiple words, some structure)
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 3) {
    return { valid: false, reason: 'Input too brief. Please provide more context.' };
  }

  return { valid: true };
}

// Main controller: Refine prompt from multi-modal inputs
export const refinePrompt = async (req, res) => {
  try {
    const { text: plainText = '' } = req.body;
    const files = req.files || [];
    
    // Collect all extracted text
    let allExtractedText = [];
    const sourceTypes = [];

    // Process plain text input
    if (plainText && plainText.trim().length > 0) {
      allExtractedText.push(plainText.trim());
      sourceTypes.push('text');
    }

    // Process uploaded files
    for (const file of files) {
      const { mimetype, buffer, originalname } = file;
      let extracted = '';

      try {
        if (mimetype.startsWith('image/')) {
          extracted = await extractTextFromImage(buffer, req.body.lang || 'eng');
          sourceTypes.push('image');
        } else if (mimetype === 'application/pdf') {
          extracted = await extractTextFromPDF(buffer, req.body.lang || 'eng');
          sourceTypes.push('pdf');
        } else if (
          mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          mimetype === 'application/msword'
        ) {
          extracted = await extractTextFromDOCX(buffer);
          sourceTypes.push('docx');
        }
      } catch (err) {
        console.error(`Error processing ${originalname}:`, err);
        // Continue with other files even if one fails
        continue;
      }

      if (extracted && extracted.trim().length > 0) {
        allExtractedText.push(`[From ${originalname}]\n${extracted}`);
      }
    }

    // Merge all extracted text
    const mergedText = allExtractedText.join('\n\n---\n\n');

    // Validate merged input
    const validation = validateInput(mergedText);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.reason,
        error: 'INVALID_INPUT'
      });
    }

    // Refine using AI
    const refinedText = await refinePromptWithAI(mergedText);
    
    // Parse into structured format
    // If AI failed (returned null), use rule-based extraction directly
    let structured;
    if (refinedText === null) {
      // AI failed, use fallback extraction
      structured = extractStructuredInfo(mergedText);
    } else {
      // Ensure refinedText is a string before parsing
      const textToParse = typeof refinedText === 'string' ? refinedText : String(refinedText);
      structured = parseRefinedText(textToParse, mergedText);
    }

    // Build final output template
    const refinedPrompt = {
      intent: structured.intent || 'Purpose not clearly specified',
      requirements: structured.requirements || ['Requirements not explicitly stated'],
      constraints: structured.constraints || ['No constraints specified'],
      deliverables: structured.deliverables || ['Deliverables not explicitly defined'],
      metadata: {
        sourceTypes: [...new Set(sourceTypes)], // Unique source types
        confidence: mergedText.length > 500 ? 0.8 : 0.6, // Higher confidence for longer inputs
        extractedText: mergedText.substring(0, 2000), // First 2000 chars for reference
        timestamp: new Date().toISOString(),
        fileCount: files.length,
        hasPlainText: !!plainText
      }
    };

    return res.json({
      success: true,
      refinedPrompt,
      message: 'Prompt refined successfully'
    });

  } catch (err) {
    console.error('Prompt refinement error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to refine prompt',
      error: err.message
    });
  }
};
