import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { updateProgress, getProgress } from '../controllers/progressController';

const router = Router();

// Progress routes
router.post('/update', authenticateJWT, updateProgress);
router.get('/:bookId', authenticateJWT, getProgress);

export default router;
