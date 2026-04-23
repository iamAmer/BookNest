import { Router } from 'express'
import { authenticateJWT, requireAdmin } from '../middleware/auth'
import {
  getAchievements,
  getUserAchievements,
  getAchievementById,
  checkAchievements,
} from '../controllers/achievementsController'

const router = Router()

// Public routes
router.get('/', getAchievements)
router.get('/:id', getAchievementById)

// Protected routes
router.get('/user/achievements', authenticateJWT, getUserAchievements)
router.post('/check/:bookId', authenticateJWT, checkAchievements)

export default router
