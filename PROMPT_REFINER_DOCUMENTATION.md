# Prompt Refiner - Multi-Modal Prompt Refinement System

## Overview

The **Prompt Refiner** is a comprehensive system that processes various input types (text, images, PDFs, Word documents, or combinations) and transforms them into a standardized, structured prompt format suitable for downstream AI processing.

## Feature Location

- **Route**: `/refine-prompt`
- **Backend API**: `/api/v1/prompt-refiner/refine`
- **Frontend Component**: `frontend/src/pages/PromptRefiner.jsx`
- **Backend Controller**: `backend/controllers/promptRefinerController.js`

## Architecture & Design Decisions

### 1. Multi-Modal Input Handling

The system accepts:
- **Plain Text**: Direct text input via textarea
- **Images**: JPG, PNG (via OCR using Tesseract.js)
- **PDFs**: Native text extraction + OCR fallback for scanned PDFs (using pdfjs-dist + Canvas)
- **Word Documents**: DOCX/DOC files (using mammoth library)

**Design Rationale**: 
- Reused existing OCR infrastructure (Tesseract.js, pdfjs-dist) for consistency
- Added mammoth for DOCX support as it's lightweight and reliable
- All files processed in-memory (no disk storage) for security and performance

### 2. Prompt Template Structure

The refined prompt follows this JSON structure:

```json
{
  "intent": "string",              // Core purpose/goal
  "requirements": ["string"],       // Key functional requirements
  "constraints": ["string"],        // Technical/business constraints
  "deliverables": ["string"],      // Expected outputs
  "metadata": {
    "sourceTypes": ["text", "image", "pdf", "docx"],
    "confidence": 0.0-1.0,
    "extractedText": "string",
    "timestamp": "ISO string",
    "fileCount": number,
    "hasPlainText": boolean
  }
}
```

**Design Rationale**:
- **Intent**: Captures the "why" - essential for understanding purpose
- **Requirements**: Actionable items - what needs to be done
- **Constraints**: Limitations that affect implementation
- **Deliverables**: Expected outputs - defines success criteria
- **Metadata**: Tracks source, confidence, and context for debugging/improvement

**Why This Structure?**
- Covers essential information for AI processing
- Separates concerns (intent vs requirements vs constraints)
- Extensible (metadata can grow without breaking changes)
- Human-readable and machine-parseable

### 3. AI-Powered Refinement

**Primary Method**: Hugging Face API (`facebook/bart-large-cnn`)
- Summarization model that extracts structured information
- Free tier available
- Handles multilingual content

**Fallback Method**: Rule-based extraction
- Regex patterns to identify sections
- Keyword-based heuristics
- Ensures system works even if AI fails

**Design Rationale**:
- Hugging Face chosen for free tier and reliability
- Fallback ensures graceful degradation
- Retry logic handles rate limits (429/503 errors)

### 4. Validation & Rejection Logic

**Validation Rules**:
1. **Minimum Length**: Input must be at least 10 characters
2. **Word Count**: Must have at least 3 words
3. **Spam Detection**: 
   - Rejects single words or very short inputs
   - Rejects repeated characters (e.g., "aaaaaaaa")
   - Rejects pure URLs without context

**Rejection Criteria**:
- Input too short (< 10 chars)
- Too brief (< 3 words)
- Appears to be spam/irrelevant

**Design Rationale**:
- Prevents API abuse
- Ensures meaningful inputs
- Protects against malicious content

### 5. Information Extraction Strategy

**For Images**:
1. Upload to memory buffer
2. Use Tesseract.js OCR with language selection
3. Extract text with confidence scores

**For PDFs**:
1. Try native text extraction (pdfjs-dist)
2. If page is empty/minimal (< 5 chars), render to image and OCR
3. Combine all pages with separators

**For DOCX**:
1. Use mammoth to extract raw text
2. Preserve basic formatting where possible

**For Combined Inputs**:
1. Process each input type separately
2. Merge with clear separators (`---`)
3. Include source file names for context
4. Pass merged text to AI refinement

**Design Rationale**:
- Handles edge cases (scanned PDFs, image-only docs)
- Preserves context (file names, page breaks)
- Combines inputs intelligently

## Technical Implementation

### Backend Components

1. **Controller** (`promptRefinerController.js`):
   - `extractTextFromImage()`: OCR for images
   - `extractTextFromPDF()`: PDF text + OCR fallback
   - `extractTextFromDOCX()`: Word document parsing
   - `refinePromptWithAI()`: Hugging Face integration
   - `parseRefinedText()`: Structure extraction
   - `validateInput()`: Input validation
   - `refinePrompt()`: Main controller

2. **Middleware** (`uploadRefiner.js`):
   - Extended multer config
   - Supports images, PDFs, DOCX
   - 50MB file size limit
   - Up to 5 files per request

3. **Route** (`promptRefinerRoutes.js`):
   - POST `/api/v1/prompt-refiner/refine`
   - Protected route (requires authentication)
   - Accepts multipart/form-data

### Frontend Components

1. **Page** (`PromptRefiner.jsx`):
   - Multi-input UI (text + file uploads)
   - File preview with removal
   - Progress tracking
   - Structured output display
   - Copy/Download functionality

2. **Features**:
   - Drag-and-drop file selection
   - Image previews
   - File type icons
   - Real-time progress
   - Error handling
   - Export options (copy text, download JSON)

## Usage Examples

### Example 1: Text-Only Input

**Input**:
```
I need a web application for managing tasks. It should have user authentication, 
task creation, editing, and deletion. Must work on mobile devices. Should export 
tasks to CSV format.
```

**Refined Output**:
```json
{
  "intent": "Create a web application for task management",
  "requirements": [
    "User authentication system",
    "Task creation functionality",
    "Task editing capability",
    "Task deletion feature"
  ],
  "constraints": [
    "Must work on mobile devices"
  ],
  "deliverables": [
    "Web application",
    "CSV export functionality"
  ]
}
```

### Example 2: Image + Text

**Input**:
- Text: "Build this design"
- Image: Screenshot of a UI mockup

**Process**:
1. Extract text from image (OCR)
2. Merge with plain text
3. Refine into structured prompt

### Example 3: PDF Document

**Input**:
- PDF file containing project specifications

**Process**:
1. Extract text from PDF (native or OCR)
2. Refine into structured format
3. Identify intent, requirements, constraints, deliverables

## Error Handling

1. **File Processing Errors**: Continue with other files if one fails
2. **AI API Errors**: Fallback to rule-based extraction
3. **Validation Errors**: Return clear error messages
4. **Network Errors**: Retry logic with exponential backoff

## Performance Considerations

- **File Size Limit**: 50MB per file
- **Max Files**: 5 files per request
- **Processing Time**: Varies by file size and type
- **OCR**: Can be slow for large images (cached on subsequent runs)

## Future Enhancements

1. **Batch Processing**: Process multiple prompts at once
2. **Template Customization**: User-defined output templates
3. **History**: Save refined prompts to database
4. **Advanced AI**: Fine-tuned models for better extraction
5. **More Formats**: Support for Excel, PowerPoint, etc.

## Dependencies

### Backend
- `mammoth`: DOCX parsing
- `tesseract.js`: OCR (existing)
- `pdfjs-dist`: PDF parsing (existing)
- `canvas`: PDF rendering (existing)

### Frontend
- `axios`: HTTP requests
- `sonner`: Toast notifications
- `lucide-react`: Icons

## API Reference

### POST `/api/v1/prompt-refiner/refine`

**Request**:
- Method: POST
- Content-Type: multipart/form-data
- Authentication: Required (JWT cookie)

**Body Parameters**:
- `text` (string, optional): Plain text input
- `files` (File[], optional): Up to 5 files (images, PDFs, DOCX)
- `lang` (string, optional): Language code (default: 'eng')

**Response** (200 OK):
```json
{
  "success": true,
  "refinedPrompt": {
    "intent": "...",
    "requirements": ["..."],
    "constraints": ["..."],
    "deliverables": ["..."],
    "metadata": {...}
  },
  "message": "Prompt refined successfully"
}
```

**Error Responses**:
- 400: Invalid input (too short, spam, etc.)
- 401: Unauthorized
- 500: Server error

## Testing

### Test Cases

1. **Text-only input**: Should refine successfully
2. **Image-only input**: Should extract via OCR and refine
3. **PDF input**: Should extract text and refine
4. **DOCX input**: Should extract text and refine
5. **Combined inputs**: Should merge and refine
6. **Invalid input**: Should reject with clear error
7. **Empty input**: Should show validation error
8. **Large files**: Should handle gracefully

## Security Considerations

1. **File Validation**: MIME type checking
2. **Size Limits**: Prevents DoS attacks
3. **Authentication**: Protected route
4. **Input Sanitization**: Prevents injection attacks
5. **Error Messages**: Don't leak sensitive info

## Comparison with Alternative Approaches

### Alternative 1: OpenAI GPT-4
- **Pros**: Better accuracy, structured output
- **Cons**: Cost, rate limits
- **Decision**: Chose Hugging Face for free tier

### Alternative 2: Local LLM (Ollama)
- **Pros**: Free, no API limits
- **Cons**: Requires setup, resource-intensive
- **Decision**: Not chosen due to deployment complexity

### Alternative 3: Rule-based Only
- **Pros**: Fast, reliable
- **Cons**: Less accurate, limited understanding
- **Decision**: Used as fallback, not primary

## Unique Contributions

1. **Multi-modal merging**: Intelligent combination of different input types
2. **Graceful degradation**: Fallback when AI fails
3. **Comprehensive validation**: Prevents abuse while being user-friendly
4. **Structured output**: Clear, actionable format
5. **Export functionality**: Copy and download options

## Conclusion

The Prompt Refiner system successfully handles multi-modal inputs and transforms them into structured, actionable prompts. It balances AI-powered intelligence with reliable fallbacks, ensuring the system works even when external services fail.
