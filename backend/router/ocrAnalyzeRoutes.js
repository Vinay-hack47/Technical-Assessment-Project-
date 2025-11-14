import express from 'express';
import { analyzeText } from '../controllers/ocrAnalysisController.js';

const router = express.Router();

// POST /api/v1/ocr/analyze-text
router.post('/analyze-text', analyzeText);

export default router;
