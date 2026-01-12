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


