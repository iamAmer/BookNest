import { Router } from 'express'
import { authenticateJWT } from '../middleware/auth'
import {
  validateRegistration,
  validateLogin,
  validateContentLength,
} from '../middleware/validation'
import {
  register,
  login,
  logout,
  refreshToken,
  getAuthStatus,
  requestPasswordReset,
  resetPassword,
} from '../controllers/authController'

const router = Router()

// Public routes
router.post('/register', validateContentLength, validateRegistration, register)
router.post('/login', validateLogin, login)
router.post('/refresh-token', refreshToken)
router.post('/password-reset', requestPasswordReset)
router.post('/reset-password', resetPassword)

// Protected routes
router.get('/status', authenticateJWT, getAuthStatus)
router.post('/logout', authenticateJWT, logout)

export default router
