import { Request, Response } from 'express'
import { query } from '../config/database'

/**
 * Get platform statistics
 * @param req - Express request object
 * @param res - Express response object
 */
export const getPlatformStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get counts of various entities
    const [
      usersResult,
      booksResult,
      categoriesResult,
      quizzesResult,
      achievementsResult,
    ] = await Promise.all([
      query('SELECT COUNT(*) FROM auth_users'),
      query('SELECT COUNT(*) FROM books'),
      query('SELECT COUNT(*) FROM categories'),
      query('SELECT COUNT(*) FROM quiz_results'),
      query('SELECT COUNT(*) FROM achievements'),
    ])

    // Get total reading time
    const readingTimeResult = await query(
      'SELECT SUM(time_spent_seconds) as total_seconds FROM user_progress',
    )

    // Get books completed
    const completedResult = await query(
      'SELECT COUNT(*) FROM user_progress WHERE is_completed = true',
    )

    // Get average quiz score
    const avgScoreResult = await query(
      'SELECT AVG(score) as average_score FROM quiz_results',
    )

    const stats = {
      total_users: parseInt(usersResult.rows[0].count),
      total_books: parseInt(booksResult.rows[0].count),
      total_categories: parseInt(categoriesResult.rows[0].count),
      total_quizzes_taken: parseInt(quizzesResult.rows[0].count),
      total_achievements: parseInt(achievementsResult.rows[0].count),
      total_reading_time_hours:
        Math.round(
          (parseInt(readingTimeResult.rows[0].total_seconds || 0) / 3600) * 100,
        ) / 100,
      total_books_completed: parseInt(completedResult.rows[0].count),
      average_quiz_score: parseFloat(
        avgScoreResult.rows[0].average_score || 0,
      ).toFixed(2),
    }

    res.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Error fetching platform stats:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Create a new book
 * @param req - Express request object
 * @param res - Express response object
 */
export const createBook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      title,
      author,
      description,
      category_id,
      difficulty,
      total_pages,
      isbn,
      cover_url,
    } = req.body

    // Validate required fields
    if (
      !title ||
      !author ||
      !description ||
      !category_id ||
      !difficulty ||
      !total_pages
    ) {
      res
        .status(400)
        .json({
          error:
            'Title, author, description, category_id, difficulty, and total_pages are required',
        })
      return
    }

    // Validate difficulty level
    const validDifficulties = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    if (!validDifficulties.includes(difficulty)) {
      res.status(400).json({ error: 'Invalid difficulty level' })
      return
    }

    // Validate total_pages
    if (typeof total_pages !== 'number' || total_pages <= 0) {
      res.status(400).json({ error: 'Total pages must be a positive number' })
      return
    }

    // Insert the book
    const result = await query(
      `INSERT INTO books (title, author, description, category_id, difficulty, total_pages, isbn, cover_url, views, rating)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        title,
        author,
        description,
        category_id,
        difficulty,
        total_pages,
        isbn || null,
        cover_url || null,
        0,
        0,
      ],
    )

    res.status(201).json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Error creating book:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Update an existing book
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateBook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bookId = req.params.id
    const {
      title,
      author,
      description,
      category_id,
      difficulty,
      total_pages,
      isbn,
      cover_url,
      rating,
    } = req.body

    // Check if book exists
    const checkResult = await query('SELECT * FROM books WHERE id = $1', [
      bookId,
    ])

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' })
      return
    }

    const book = checkResult.rows[0]

    // Build update query dynamically
    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`)
      values.push(title)
    }
    if (author !== undefined) {
      updates.push(`author = $${paramCount++}`)
      values.push(author)
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`)
      values.push(description)
    }
    if (category_id !== undefined) {
      updates.push(`category_id = $${paramCount++}`)
      values.push(category_id)
    }
    if (difficulty !== undefined) {
      const validDifficulties = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
      if (!validDifficulties.includes(difficulty)) {
        res.status(400).json({ error: 'Invalid difficulty level' })
        return
      }
      updates.push(`difficulty = $${paramCount++}`)
      values.push(difficulty)
    }
    if (total_pages !== undefined) {
      if (typeof total_pages !== 'number' || total_pages <= 0) {
        res.status(400).json({ error: 'Total pages must be a positive number' })
        return
      }
      updates.push(`total_pages = $${paramCount++}`)
      values.push(total_pages)
    }
    if (isbn !== undefined) {
      updates.push(`isbn = $${paramCount++}`)
      values.push(isbn)
    }
    if (cover_url !== undefined) {
      updates.push(`cover_url = $${paramCount++}`)
      values.push(cover_url)
    }
    if (rating !== undefined) {
      if (typeof rating !== 'number' || rating < 0 || rating > 5) {
        res.status(400).json({ error: 'Rating must be between 0 and 5' })
        return
      }
      updates.push(`rating = $${paramCount++}`)
      values.push(rating)
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'No fields to update' })
      return
    }

    updates.push(`updated_at = NOW()`)
    values.push(bookId)

    const updateQuery = `UPDATE books SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`

    const result = await query(updateQuery, values)

    res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Error updating book:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Delete a book
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteBook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bookId = req.params.id

    // Check if book exists
    const checkResult = await query('SELECT * FROM books WHERE id = $1', [
      bookId,
    ])

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' })
      return
    }

    // Delete the book (cascade delete should handle related records)
    await query('DELETE FROM books WHERE id = $1', [bookId])

    res.json({
      success: true,
      message: 'Book deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting book:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get all users (admin view)
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { limit = 50, offset = 0 } = req.query

    const limitNum = Math.min(parseInt(limit as string) || 50, 100)
    const offsetNum = Math.max(0, parseInt(offset as string) || 0)

    const result = await query(
      `SELECT u.id, u.email, u.created_at, u.is_admin, 
              p.full_name, p.cefr_level,
              (SELECT COUNT(*) FROM user_progress WHERE user_id = u.id AND is_completed = true) as books_completed,
              (SELECT COUNT(*) FROM vocabulary WHERE user_id = u.id) as words_learned
       FROM auth_users u
       LEFT JOIN profiles p ON u.id = p.user_id
       ORDER BY u.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limitNum, offsetNum],
    )

    const countResult = await query('SELECT COUNT(*) FROM auth_users')

    res.json({
      success: true,
      data: result.rows,
      count: parseInt(countResult.rows[0].count),
      limit: limitNum,
      offset: offsetNum,
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Make a user admin
 * @param req - Express request object
 * @param res - Express response object
 */
export const makeUserAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.userId

    // Check if user exists
    const checkResult = await query('SELECT * FROM auth_users WHERE id = $1', [
      userId,
    ])

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // Update user to admin
    const result = await query(
      'UPDATE auth_users SET is_admin = true WHERE id = $1 RETURNING *',
      [userId],
    )

    res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Error making user admin:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Remove admin privileges from a user
 * @param req - Express request object
 * @param res - Express response object
 */
export const removeUserAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.userId

    // Check if user exists
    const checkResult = await query('SELECT * FROM auth_users WHERE id = $1', [
      userId,
    ])

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // Prevent removing the last admin
    const adminCount = await query(
      'SELECT COUNT(*) FROM auth_users WHERE is_admin = true',
    )

    if (
      parseInt(adminCount.rows[0].count) <= 1 &&
      checkResult.rows[0].is_admin
    ) {
      res.status(400).json({ error: 'Cannot remove the last admin user' })
      return
    }

    // Update user to remove admin
    const result = await query(
      'UPDATE auth_users SET is_admin = false WHERE id = $1 RETURNING *',
      [userId],
    )

    res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Error removing user admin:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
