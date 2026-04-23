import { Router } from 'express'
import { authenticateJWT, requireAdmin } from '../middleware/auth'
import {
  getPlatformStats,
  createBook,
  updateBook,
  deleteBook,
  getAllUsers,
  makeUserAdmin,
  removeUserAdmin,
} from '../controllers/adminController'

const router = Router()

/**
 * Admin routes - all require authentication and admin role
 */

// Platform statistics
router.get('/stats', authenticateJWT, requireAdmin, getPlatformStats)

// Book management
router.post('/books', authenticateJWT, requireAdmin, createBook)
router.put('/books/:id', authenticateJWT, requireAdmin, updateBook)
router.delete('/books/:id', authenticateJWT, requireAdmin, deleteBook)

// User management
router.get('/users', authenticateJWT, requireAdmin, getAllUsers)
router.post(
  '/users/:userId/admin',
  authenticateJWT,
  requireAdmin,
  makeUserAdmin,
)
router.delete(
  '/users/:userId/admin',
  authenticateJWT,
  requireAdmin,
  removeUserAdmin,
)

export default router
