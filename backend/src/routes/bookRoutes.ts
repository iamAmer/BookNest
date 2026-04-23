import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { getBooks, getBookById } from '../controllers/bookController';

const router = Router();

// Book routes
router.get('/', authenticateJWT, getBooks);
router.get('/:id', authenticateJWT, getBookById);

export default router;
