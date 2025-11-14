// controllers/ocrController.js

import { createWorker } from 'tesseract.js';
import { createCanvas } from 'canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import cloudinary from '../services/cloudinary.js';

// Upload image buffer → Cloudinary
const uploadToCloudinary = (buffer, folder = 'contentlab') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
};

const isPageEmpty = (text) => !text || text.trim().length < 5;

const renderPageToImage = async (page) => {
  const viewport = page.getViewport({ scale: 2 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext('2d');
  await page.render({ canvasContext: context, viewport }).promise;
  return canvas.toBuffer('image/png');
};

// ✅ IMAGE EXTRACTION
export const extractFromImage = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const { originalname, mimetype, buffer } = req.file;

    // Only allow image/*
    if (!mimetype.startsWith('image/')) {
      return res.status(400).json({ message: 'Unsupported file type — only images allowed' });
    }

    // Upload image → Cloudinary
    const uploaded = await uploadToCloudinary(buffer);
    const fileUrl = uploaded.secure_url;

    // OCR Extraction
    const worker = await createWorker();
    const { data } = await worker.recognize(fileUrl, req.body.lang || 'eng');
    await worker.terminate();

    return res.json({
      fileName: originalname,
      fileUrl,
      type: 'image',
      pages: [
        {
          text: data.text,
          method: 'ocr'
        }
      ]
    });

  } catch (err) {
    console.error('Image Extraction Error:', err);
    return res.status(500).json({ message: 'Failed to extract from image', error: err.message });
  }
};

// ✅ PDF EXTRACTION
export const extractFromPDF = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const { originalname, mimetype, buffer } = req.file;

    // Only allow PDFs
    if (mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Unsupported file type — only PDFs allowed' });
    }

    // Convert to Uint8Array as required by pdfjs
    // Ensure we create a plain Uint8Array (not a Buffer subclass).
    let uint8buf;
    if (buffer instanceof Uint8Array && buffer.constructor && buffer.constructor.name === 'Uint8Array') {
      uint8buf = buffer;
    } else {
      uint8buf = new Uint8Array(buffer.length);
      uint8buf.set(buffer);
    }

    // Diagnostic log to help debug type issues when pdfjs rejects the data
    try {
      console.debug('PDF upload types:', {
        isBuffer: typeof Buffer !== 'undefined' && Buffer.isBuffer(buffer),
        bufferConstructor: buffer && buffer.constructor && buffer.constructor.name,
        uint8IsTypedArray: uint8buf instanceof Uint8Array,
        uint8Constructor: uint8buf && uint8buf.constructor && uint8buf.constructor.name,
        uint8ByteLength: uint8buf.byteLength
      });
    } catch (e) {
      // ignore logging errors
    }

    const loadingTask = getDocument({ data: uint8buf });
    const pdf = await loadingTask.promise;

    const worker = await createWorker();
    const pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ').trim();

      if (isPageEmpty(pageText)) {
        // OCR if page has minimal text (likely scanned)
        const imgBuffer = await renderPageToImage(page);
        const { data } = await worker.recognize(imgBuffer, req.body.lang || 'eng');
        pages.push({ 
          pageNum: i, 
          text: data.text, 
          method: 'ocr' 
        });
      } else {
        pages.push({ 
          pageNum: i, 
          text: pageText, 
          method: 'pdf-text' 
        });
      }
    }

    await worker.terminate();

    // Upload PDF → Cloudinary for reference
    const uploaded = await uploadToCloudinary(buffer);
    const fileUrl = uploaded.secure_url;

    return res.json({
      fileName: originalname,
      fileUrl,
      type: 'pdf',
      pages
    });

  } catch (err) {
    console.error('PDF Extraction Error:', err);
    return res.status(500).json({ message: 'Failed to extract from PDF', error: err.message });
  }
};




// // controllers/ocrController.js
// import { createWorker } from 'tesseract.js';
// import { createCanvas } from 'canvas';
// // Use the ESM build file that exists in this package (pdf.mjs)
// import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
// import fs from 'fs';
// import path from 'path';

// const isPageEmpty = (text) => !text || text.trim().length < 5;

// const renderPageToImage = async (page) => {
//   const viewport = page.getViewport({ scale: 2 });
//   const canvas = createCanvas(viewport.width, viewport.height);
//   const context = canvas.getContext('2d');
//   await page.render({ canvasContext: context, viewport }).promise;
//   return canvas.toBuffer('image/png');
// };

// export const extractFromFile = async (req, res) => {
//   try {
//     if (!req.file || !req.file.buffer) {
//       return res.status(400).json({ message: 'No file provided' });
//     }

//     const { originalname, mimetype, buffer } = req.file;
//     const fileType = mimetype.startsWith('image/') ? 'image' :
//                      mimetype === 'application/pdf' ? 'pdf' : null;

//     if (!fileType) return res.status(400).json({ message: 'Unsupported file type' });

//     let pages = [];

//     if (fileType === 'image') {
//       // Image: OCR only
//       const worker = await createWorker();
//       await worker.load();
//       await worker.loadLanguage(req.body.lang || 'eng');
//       await worker.initialize(req.body.lang || 'eng');

//       const { data } = await worker.recognize(buffer);
//       pages.push({ text: data.text, method: 'ocr' });

//       await worker.terminate();
//     } else if (fileType === 'pdf') {
//       // PDF: parse text using pdfjs-dist
//       // pdfjs expects `Uint8Array` for binary data in ESM builds
//       const uint8buf = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
//       const loadingTask = getDocument({ data: uint8buf });
//       const pdf = await loadingTask.promise;

//       const worker = await createWorker();
//       await worker.load();
//       await worker.loadLanguage(req.body.lang || 'eng');
//       await worker.initialize(req.body.lang || 'eng');

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         const pageText = content.items.map(item => item.str).join(' ').trim();

//         if (isPageEmpty(pageText)) {
//           // OCR if page has minimal text (likely scanned)
//           const imgBuffer = await renderPageToImage(page);
//           const { data } = await worker.recognize(imgBuffer);
//           pages.push({ text: data.text, method: 'ocr' });
//         } else {
//           pages.push({ text: pageText, method: 'pdf-text' });
//         }
//       }

//       await worker.terminate();
//     }

//     return res.json({
//       fileName: originalname,
//       type: fileType,
//       pages,
//     });

//   } catch (err) {
//     console.error('File Extraction Error:', err);
//     return res.status(500).json({ message: 'Failed to extract file', error: err.message });
//   }
// };




// // controllers/ocrController.js
// import { createWorker } from 'tesseract.js';
// import fs from 'fs';
// import path from 'path';
// import os from 'os';
// import OpenAI from 'openai';
// import dotenv from "dotenv";


// dotenv.config();
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Make sure your .env has this
// });

// // Utility: check if page text is minimal
// const isPageEmpty = (text) => !text || text.trim().length < 5;

// // OCR for image files
// const recognizeImage = async (buffer, lang = 'eng') => {
//   const worker = await createWorker();
//   await worker.load();
//   await worker.loadLanguage(lang);
//   await worker.initialize(lang);

//   const { data } = await worker.recognize(buffer);
//   await worker.terminate();
//   return data.text;
// };

// // Extract PDF text using Gemini API
// const extractPdfWithGemini = async (buffer) => {
//   // Save PDF temporarily
//   const tmpPath = path.join(os.tmpdir(), `temp_${Date.now()}.pdf`);
//   fs.writeFileSync(tmpPath, buffer);
// ī
//   try {
//     // Call Gemini API for document extraction
//     const response = await openai.chat.completions.create({
//       model: 'gemini-1.5',
//       messages: [
//         {
//           role: 'user',
//           content: `Extract the text from this PDF and provide the result page-wise. Return as JSON: { pages: [{ text: "..." }] }`,
//         },
//       ],
//       files: [
//         {
//           name: path.basename(tmpPath),
//           data: fs.readFileSync(tmpPath),
//         },
//       ],
//     });

//     // Gemini API returns text in content of message
//     const text = response.choices[0].message.content;

//     // Parse JSON if API returned JSON
//     let pages = [];
//     try {
//       const parsed = JSON.parse(text);
//       if (parsed.pages && Array.isArray(parsed.pages)) {
//         pages = parsed.pages.map((p) => ({ text: p.text, method: 'gemini' }));
//       }
//     } catch (e) {
//       // fallback: all text as one page
//       pages = [{ text, method: 'gemini' }];
//     }

//     return pages;
//   } finally {
//     fs.unlinkSync(tmpPath);
//   }
// };

// export const extractFromFile = async (req, res) => {
//   try {
//     if (!req.file || !req.file.buffer) {
//       return res.status(400).json({ message: 'No file provided' });
//     }

//     const { originalname, mimetype, buffer } = req.file;
//     const fileType = mimetype.startsWith('image/')
//       ? 'image'
//       : mimetype === 'application/pdf'
//       ? 'pdf'
//       : null;

//     if (!fileType) return res.status(400).json({ message: 'Unsupported file type' });

//     let pages = [];

//     if (fileType === 'image') {
//       const text = await recognizeImage(buffer, req.body.lang || 'eng');
//       pages.push({ text, method: 'ocr' });
//     } else if (fileType === 'pdf') {
//       pages = await extractPdfWithGemini(buffer);
//     }

//     return res.json({
//       fileName: originalname,
//       type: fileType,
//       pages,
//     });
//   } catch (err) {
//     console.error('File Extraction Error:', err);
//     return res.status(500).json({ message: 'Failed to extract file', error: err.message });
//   }
// };
