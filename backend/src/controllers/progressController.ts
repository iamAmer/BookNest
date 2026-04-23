import { Request, Response } from 'express'
import { query } from '../config/database'

/**
 * Update reading progress
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateProgress = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const { bookId, current_page, time_spent_seconds } = req.body

    // Validate inputs
    if (!bookId || current_page === undefined) {
      res.status(400).json({ error: 'Book ID and current page are required' })
      return
    }

    if (typeof current_page !== 'number' || current_page < 0) {
      res
        .status(400)
        .json({ error: 'Current page must be a non-negative number' })
      return
    }

    // Check if progress entry exists for this user/book
    const existingResult = await query(
      'SELECT * FROM user_progress WHERE user_id = $1 AND book_id = $2',
      [userId, bookId],
    )

    let progressData

    if (existingResult.rows.length > 0) {
      // Update existing progress
      const existingProgress = existingResult.rows[0]
      const updatedTimeSpent =
        (existingProgress.time_spent_seconds || 0) + (time_spent_seconds || 0)

      const updateResult = await query(
        'UPDATE user_progress SET current_page = $1, time_spent_seconds = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
        [current_page, updatedTimeSpent, existingProgress.id],
      )

      progressData = updateResult.rows[0]
    } else {
      // Create new progress entry
      const insertResult = await query(
        'INSERT INTO user_progress (user_id, book_id, current_page, is_completed, time_spent_seconds) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, bookId, current_page, false, time_spent_seconds || 0],
      )

      progressData = insertResult.rows[0]
    }

    // Get book info to calculate completion percentage
    const bookResult = await query(
      'SELECT total_pages FROM books WHERE id = $1',
      [bookId],
    )

    const book = bookResult.rows[0]
    const completionPercentage = book
      ? Math.round((progressData.current_page / book.total_pages) * 100)
      : 0

    res.json({
      success: true,
      data: {
        ...progressData,
        completion_percentage: completionPercentage,
      },
    })
  } catch (error) {
    console.error('Error updating progress:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get user's reading progress for a specific book
 * @param req - Express request object
 * @param res - Express response object
 */
export const getProgress = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const bookId = req.params.bookId

    if (!bookId) {
      res.status(400).json({ error: 'Book ID is required' })
      return
    }

    const result = await query(
      'SELECT * FROM user_progress WHERE user_id = $1 AND book_id = $2',
      [userId, bookId],
    )

    // If no progress exists, return default values
    if (result.rows.length === 0) {
      res.json({
        success: true,
        data: {
          user_id: userId,
          book_id: bookId,
          current_page: 0,
          is_completed: false,
          time_spent_seconds: 0,
          completion_percentage: 0,
        },
      })
      return
    }

    const progress = result.rows[0]

    // Get book info to calculate completion percentage
    const bookResult = await query(
      'SELECT total_pages FROM books WHERE id = $1',
      [bookId],
    )

    const book = bookResult.rows[0]
    const completionPercentage = book
      ? Math.round((progress.current_page / book.total_pages) * 100)
      : 0

    res.json({
      success: true,
      data: {
        ...progress,
        completion_percentage: completionPercentage,
      },
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
