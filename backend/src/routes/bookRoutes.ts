import { Router } from 'express'
import { authenticateJWT } from '../middleware/auth'
import {
  getBooks,
  getBookById,
  getCategories,
  getTrending,
} from '../controllers/bookController'

const router = Router()

// Book routes
router.get('/', authenticateJWT, getBooks)
router.get('/:id', authenticateJWT, getBookById)
router.get('/categories', authenticateJWT, getCategories)
router.get('/trending', authenticateJWT, getTrending)

export default router
