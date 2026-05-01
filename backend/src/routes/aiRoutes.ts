import { Router } from 'express'
import multer from 'multer'
import { authenticateJWT } from '../middleware/auth'
import { validateNumericFields } from '../middleware/validation'
import {
  simplifySentence,
  getQuizQuestions,
  submitQuiz,
  classifyLevel,
  generateQuizStandalone,
} from '../controllers/aiController'

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit
  },
})

// AI routes
router.post('/simplify', authenticateJWT, simplifySentence)
router.get('/quiz/:bookId', authenticateJWT, getQuizQuestions)
router.post(
  '/quiz/submit',
  authenticateJWT,
  validateNumericFields(['score']),
  submitQuiz,
)

// Standalone AI Quiz Generator routes (integrated from 4-react-quiz-generator)
router.post(
  '/classify-level',
  authenticateJWT,
  upload.single('pdf'),
  classifyLevel,
)
router.post(
  '/generate-quiz',
  authenticateJWT,
  upload.single('pdf'),
  generateQuizStandalone,
)

export default router
