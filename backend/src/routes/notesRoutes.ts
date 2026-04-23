import { Router } from 'express'
import { authenticateJWT } from '../middleware/auth'
import {
  validateContentLength,
  validateNumericFields,
} from '../middleware/validation'
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController'

const router = Router()

// Notes routes
router.get('/:bookId', authenticateJWT, getNotes)
router.post(
  '/',
  authenticateJWT,
  validateContentLength,
  validateNumericFields(['page_number']),
  createNote,
)
router.put('/:id', authenticateJWT, validateContentLength, updateNote)
router.delete('/:id', authenticateJWT, deleteNote)

export default router
