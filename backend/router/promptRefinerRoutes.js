import express from 'express';
import uploadRefiner from '../middlewares/uploadRefiner.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { refinePrompt } from '../controllers/promptRefinerController.js';

const router = express.Router();

// Prompt refinement route (protected)
router.post(
  '/refine',
  isAuthenticated,
  uploadRefiner.array('files', 5), // Allow up to 5 files
  refinePrompt
);

export default router;
