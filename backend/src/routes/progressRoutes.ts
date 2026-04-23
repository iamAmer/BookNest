import { Router } from 'express'
import { authenticateJWT } from '../middleware/auth'
import { validateNumericFields } from '../middleware/validation'
import { updateProgress, getProgress } from '../controllers/progressController'

const router = Router()

// Progress routes
router.post(
  '/update',
  authenticateJWT,
  validateNumericFields(['current_page', 'time_spent_seconds']),
  updateProgress,
)
router.get('/:bookId', authenticateJWT, getProgress)

export default router
