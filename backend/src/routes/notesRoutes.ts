import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/notesController';

const router = Router();

// Notes routes
router.get('/:bookId', authenticateJWT, getNotes);
router.post('/', authenticateJWT, createNote);
router.put('/:id', authenticateJWT, updateNote);
router.delete('/:id', authenticateJWT, deleteNote);

export default router;
