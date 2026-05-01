import { Router } from 'express'
import { authenticateJWT } from '../middleware/auth'
import {
  getBooks,
  getBookById,
  getCategories,
  getTrending,
  uploadCover,
  uploadContent,
  handleUploadCover,
  handleUploadContent,
  deleteFile,
} from '../controllers/bookController'

const router = Router()

// Book routes
router.get('/', authenticateJWT, getBooks)
router.get('/:id', authenticateJWT, getBookById)
router.get('/categories', authenticateJWT, getCategories)
router.get('/trending', authenticateJWT, getTrending)

// File upload routes
router.post('/:id/upload-cover', authenticateJWT, uploadCover, handleUploadCover)
router.post('/:id/upload-content', authenticateJWT, uploadContent, handleUploadContent)
router.delete('/:id/delete-file/:type', authenticateJWT, deleteFile)

export default router
