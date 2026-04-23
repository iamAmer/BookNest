import { Router } from 'express'
import { authenticateJWT } from '../middleware/auth'
import {
  validateContentLength,
  validateNumericFields,
} from '../middleware/validation'
import {
  saveVocabulary,
  getVocabulary,
  updateVocabularyReview,
  getVocabularyStats,
  deleteVocabulary,
} from '../controllers/vocabularyController'

const router = Router()

// Vocabulary routes
router.post('/save', authenticateJWT, validateContentLength, saveVocabulary)
router.get('/', authenticateJWT, getVocabulary)
router.get('/stats', authenticateJWT, getVocabularyStats)
router.put(
  '/:id/review',
  authenticateJWT,
  validateNumericFields(['mastery_level']),
  updateVocabularyReview,
)
router.delete('/:id', authenticateJWT, deleteVocabulary)

export default router
