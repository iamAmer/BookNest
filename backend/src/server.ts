import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import authRoutes from './routes/authRoutes'
import profileRoutes from './routes/profileRoutes'
import bookRoutes from './routes/bookRoutes'
import progressRoutes from './routes/progressRoutes'
import notesRoutes from './routes/notesRoutes'
import vocabularyRoutes from './routes/vocabularyRoutes'
import aiRoutes from './routes/aiRoutes'
import achievementsRoutes from './routes/achievementsRoutes'
import adminRoutes from './routes/adminRoutes'
import {
  sanitizeSQLPatterns,
  validateQueryLength,
} from './middleware/validation'
import swaggerOptions from './config/swagger'

const app = express()
const PORT = process.env.PORT || 5000

// Swagger configuration
const swaggerSpec = swaggerJsdoc(swaggerOptions)

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())

// Security middleware
app.use(validateQueryLength(1000))
app.use(sanitizeSQLPatterns)

// Swagger UI
app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerSpec, { explorer: true }))

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/vocabulary', vocabularyRoutes)
app.use('/api/reader', aiRoutes)
app.use('/api/achievements', achievementsRoutes)
app.use('/api/admin', adminRoutes)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || 'Something went wrong!' })
})

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(
    `🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`,
  )
  console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n📛 Shutting down gracefully...')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})

export default app
