import express from 'express';
import upload from '../middlewares/upload.js';
import { extractFromImage, extractFromPDF } from '../controllers/ocrController.js';

const router = express.Router();

// Image extraction route
router.post('/extract-image', upload.single('file'), extractFromImage);

// PDF extraction route
router.post('/extract-pdf', upload.single('file'), extractFromPDF);

export default router;
