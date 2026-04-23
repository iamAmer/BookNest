import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { saveVocabulary, getVocabulary, updateVocabularyReview } from '../controllers/vocabularyController';

const router = Router();

// Vocabulary routes
router.post('/save', authenticateJWT, saveVocabulary);
router.get('/', authenticateJWT, getVocabulary);
router.put('/:id/review', authenticateJWT, updateVocabularyReview);

export default router;
