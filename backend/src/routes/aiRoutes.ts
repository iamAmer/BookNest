import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { simplifySentence, getQuizQuestions, submitQuiz } from '../controllers/aiController';

const router = Router();

// AI routes
router.post('/simplify', authenticateJWT, simplifySentence);
router.get('/quiz/:bookId', authenticateJWT, getQuizQuestions);
router.post('/quiz/submit', authenticateJWT, submitQuiz);

export default router;
