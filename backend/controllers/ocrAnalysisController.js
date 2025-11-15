import { setTimeout as delay } from 'timers/promises';

/**
 * ocrAnalysisController.js
 *
 * Uses Hugging Face public inference endpoints (no API key required).
 * Models used:
 *  - Summarization: facebook/mbart-large-50-many-to-many-mmt  (multilingual)
 *  - Sentiment: nlptown/bert-base-multilingual-uncased-sentiment (multilingual, returns star labels)
 *  - Keyphrase extraction: ml6team/keyphrase-extraction-distilbert-inspec
 *  - Suggestions: facebook/blenderbot_small-90M (dialogue/generation)
 *
 * Expects JSON body:
 *  { text: "...", language: "eng" }
 *
 * Returns JSON:
 *  { summary, sentiment, keywords, hashtags, suggestions }
 */

// Helper: call Hugging Face inference endpoint (no Authorization header by default)
async function callHuggingFaceModel(model, input, options = {}) {
  const url = `https://router.huggingface.co/hf-inference/v1/models/${encodeURIComponent(model)}`;
  const body = typeof input === 'string' ? input : input;
  // Build fetch options
  const fetchOpts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // If you later want to use a HF token, set process.env.HF_TOKEN and uncomment below:
      // ...(process.env.HF_TOKEN ? { Authorization: `Bearer ${process.env.HF_TOKEN}` } : {}),
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  };

  // For some models the API expects raw text; for others it expects JSON
  // If options.contentType specified, set header accordingly
  if (options.contentType) {
    fetchOpts.headers['Content-Type'] = options.contentType;
  } else {
    // default JSON
    fetchOpts.headers['Content-Type'] = 'application/json';
  }

  // Try call, with simple retry on 503/429 (rate-limit)
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, fetchOpts);

      // If unauthenticated or other failure, return JSON error for controller to handle
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        const msg = `HF model ${model} request failed: ${res.status} ${res.statusText} ${text}`;
        // For rate-limited responses, wait a bit and retry
        if (res.status === 429 || res.status === 503) {
          await delay(1000 * (attempt + 1));
          continue;
        }
        throw new Error(msg);
      }

      const json = await res.json();
      return json;
    } catch (err) {
      // If last attempt, throw
      if (attempt === 3) throw err;
      // small backoff before retry
      await delay(600 * (attempt + 1));
    }
  }
}

// Map nlptown labels to simple sentiment
function mapNlptownToSentiment(inferenceOutput) {
  // nlptown usually returns array like [{label: "5 stars", score: 0.7}, ...]
  try {
    if (!Array.isArray(inferenceOutput)) return 'neutral';
    // find top label
    const top = inferenceOutput[0];
    if (!top || !top.label) return 'neutral';
    const label = String(top.label).toLowerCase();
    if (label.includes('1') || label.includes('2')) return 'negative';
    if (label.includes('3')) return 'neutral';
    if (label.includes('4') || label.includes('5')) return 'positive';
    return 'neutral';
  } catch {
    return 'neutral';
  }
}

// Normalize keywords returned by keyphrase model (some models return [{score,word}, ...] or ["phrase1","phrase2"])
function normalizeKeywords(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    // array of strings or objects
    const out = [];
    for (const item of raw) {
      if (!item) continue;
      if (typeof item === 'string') out.push(item);
      else if (typeof item === 'object') {
        if (item.keyphrase) out.push(item.keyphrase);
        else if (item.word) out.push(item.word);
        else if (item.label) out.push(item.label);
        else if (item.value) out.push(item.value);
      }
    }
    return [...new Set(out)].slice(0, 12);
  }
  return [];
}

// Create hashtags from keywords
function generateHashtags(keywords = [], max = 8) {
  const tags = [];
  for (const kw of keywords) {
    let cleaned = String(kw)
      .replace(/[^\p{L}\p{N}\s]/gu, '') // remove punctuation, keep unicode letters/numbers and spaces
      .trim();
    if (!cleaned) continue;
    // If multi-word, create camelcase hashtag
    const parts = cleaned.split(/\s+/).filter(Boolean);
    const tag = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    const finalTag = `#${tag}`;
    tags.push(finalTag);
    if (tags.length >= max) break;
  }
  return tags;
}

// Controller
export const analyzeText = async (req, res) => {
  try {
    const { text, language } = req.body || {};
    if (!text || !String(text).trim()) {
      return res.status(400).json({ message: 'No text provided' });
    }

    // language codes mapping (frontend may send 'eng','hin','spa','fra','por')
    // For HF models we will use language tags where necessary (mbart expects language tokens like 'en_XX', 'hi_IN', etc).
    const lang = (language || 'eng').toLowerCase();

    // map simple ISO to MBART tokens (a minimal mapping for our languages)
    const mbartLangMap = {
      eng: 'en_XX',
      hin: 'hi_IN',
      spa: 'es_XX',
      fra: 'fr_XX',
      por: 'pt_XX',
    };
    const mbartLang = mbartLangMap[lang] || 'en_XX';

    // 1) Summarization (short summary)
    // facebook/mbart-large-50-many-to-many-mmt supports multilingual summarization but expects special input format.
    // We'll use the HF inference endpoint with parameters: {"inputs": text, "parameters": {"max_length": 120}}
    let summary = '';
    try {
      const summModel = 'facebook/mbart-large-50-many-to-many-mmt';
      const summPayload = {
        inputs: text,
        parameters: {
          max_length: 120, // short summary (2-3 sentences)
          min_length: 20,
          num_beams: 4,
          forced_bos_token_id: undefined, // we'll try to set target_lang below if supported
        },
        options: { wait_for_model: true }
      };
      // Some inference instances accept a top-level "target_lang" param; include it in parameters if accepted.
      // The public inference API sometimes supports {"task": "summarization", "target_lang": "en_XX"} but it's inconsistent.
      // We'll include target_lang in parameters (many-to-many supports it).
      summPayload.parameters.target_lang = mbartLang;

      const summResp = await callHuggingFaceModel(summModel, summPayload);
      // summResp may be an array with {summary_text: "..."} or raw text. Try to extract.
      if (Array.isArray(summResp)) {
        // many models return [{summary_text: "..." }]
        summary = summResp[0]?.summary_text || (typeof summResp[0] === 'string' ? summResp[0] : '');
      } else if (typeof summResp === 'string') {
        summary = summResp;
      } else if (summResp.summary_text) {
        summary = summResp.summary_text;
      } else if (Array.isArray(summResp[0]) && summResp[0].summary_text) {
        summary = summResp[0].summary_text;
      } else {
        // fallback: take first string field
        summary = JSON.stringify(summResp).slice(0, 300);
      }
      summary = String(summary).trim();
    } catch (err) {
      console.error('Summarization error:', err?.message || err);
      summary = ''; // continue
    }

    // 2) Sentiment (nlptown)
    let sentiment = 'neutral';
    try {
      const sentModel = 'nlptown/bert-base-multilingual-uncased-sentiment';
      // model expects raw text in body
      const sentResp = await callHuggingFaceModel(sentModel, text);
      // typical response: [ { label: '5 stars', score: 0.45 }, ... ]
      sentiment = mapNlptownToSentiment(sentResp);
    } catch (err) {
      console.error('Sentiment error:', err?.message || err);
      sentiment = 'neutral';
    }

    // 3) Keyphrase extraction (ml6team)
    let keywords = [];
    try {
      const keyModel = 'ml6team/keyphrase-extraction-distilbert-inspec';
      // HF expects {"inputs": text}
      const keyResp = await callHuggingFaceModel(keyModel, { inputs: text });
      // keyResp often returns an array of strings or objects
      keywords = normalizeKeywords(keyResp);
      if (keywords.length === 0 && typeof keyResp === 'string') {
        // fallback: naive local extraction if HF doesn't return expected shape
        const words = String(text)
          .replace(/[^\p{L}\p{N}\s]/gu, ' ')
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean);
        // quick frequency count
        const freq = {};
        for (const w of words) {
          if (w.length <= 3) continue;
          freq[w] = (freq[w] || 0) + 1;
        }
        keywords = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 8);
      }
    } catch (err) {
      console.error('Keyword extraction error:', err?.message || err);
      // fallback to naive method
      const words = String(text)
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
      const freq = {};
      for (const w of words) {
        if (w.length <= 3) continue;
        freq[w] = (freq[w] || 0) + 1;
      }
      keywords = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 8);
    }

    // 4) Hashtag generation (local)
    const hashtags = generateHashtags(keywords);

    // 5) Suggestions (AI-generated) — use blenderbot_small to generate short advice based on text + sentiment + keywords
    let suggestions = [];
    try {
      const suggModel = 'facebook/blenderbot_small-90M';
      // Compose prompt
      const prompt = `You are a helpful assistant that gives short actionable suggestions (2-4 bullets) to improve the given content for social media. Language: ${lang}.
Content:
"""${text}"""

Detected keywords: ${keywords.slice(0, 10).join(', ') || 'none'}.
Detected sentiment: ${sentiment}.

Give 3 short suggestions, each as a single sentence.`;
      const suggResp = await callHuggingFaceModel(suggModel, { inputs: prompt, parameters: { max_length: 120, num_beams: 3 }, options: { wait_for_model: true } });
      // The response for generation models varies; try to extract text
      let suggestionText = '';
      if (Array.isArray(suggResp)) {
        // sometimes returns array of {generated_text: "..."}
        suggestionText = suggResp[0]?.generated_text || (typeof suggResp[0] === 'string' ? suggResp[0] : '');
      } else if (suggResp.generated_text) {
        suggestionText = suggResp.generated_text;
      } else if (typeof suggResp === 'string') {
        suggestionText = suggResp;
      } else {
        // try stringifying
        suggestionText = JSON.stringify(suggResp);
      }
      suggestionText = String(suggestionText).trim();
      // split into lines or sentences heuristically
      if (suggestionText.includes('\n')) {
        suggestions = suggestionText.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 5);
      } else {
        // split by sentences (., ?, !)
        suggestions = suggestionText.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean).slice(0, 5);
      }
      // fallback: if empty, create simple rule-based suggestions
      if (suggestions.length === 0) {
        suggestions = [
          'Consider shortening the content to one clear message.',
          'Use 2-3 relevant hashtags to increase reach.',
          'If the tone is negative, try rephrasing to a more positive frame.'
        ];
      }
    } catch (err) {
      console.error('Suggestions (AI) error:', err?.message || err);
      // fallback rule-based suggestions
      suggestions = [
        'Consider shortening the content to one clear message.',
        'Add 2–3 relevant hashtags to increase reach.',
        sentiment === 'negative' ? 'Soften the tone and highlight benefits.' : 'Add an engaging question to invite comments.'
      ];
    }

    // Return result in the requested format
    return res.json({
      summary: summary || '',
      sentiment,
      keywords,
      hashtags,
      suggestions
    });
  } catch (err) {
    console.error('AnalyzeText error:', err);
    return res.status(500).json({
      message: 'Failed to analyze text',
      error: err?.message || String(err)
    });
  }
};


