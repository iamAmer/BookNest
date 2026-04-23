import { Router } from 'express'
import { authenticateJWT } from '../middleware/auth'
import { validateContentLength } from '../middleware/validation'
import {
  getProfile,
  updateProfile,
  updateLevel,
} from '../controllers/profileController'

const router = Router()

// Profile routes
router.get('/', authenticateJWT, getProfile)
router.patch('/', authenticateJWT, validateContentLength, updateProfile)
router.patch('/level', authenticateJWT, updateLevel)

export default router
