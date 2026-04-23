import { Request, Response } from 'express'
import { query } from '../config/database'

/**
 * Get user notes for a specific book
 * @param req - Express request object
 * @param res - Express response object
 */
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const bookId = req.params.bookId
    const { limit = 50, offset = 0 } = req.query

    if (!bookId) {
      res.status(400).json({ error: 'Book ID is required' })
      return
    }

    const limitNum = Math.min(parseInt(limit as string) || 50, 100)
    const offsetNum = Math.max(0, parseInt(offset as string) || 0)

    const result = await query(
      'SELECT * FROM notes WHERE user_id = $1 AND book_id = $2 ORDER BY created_at DESC LIMIT $3 OFFSET $4',
      [userId, bookId, limitNum, offsetNum],
    )

    // Get total count for pagination
    const countResult = await query(
      'SELECT COUNT(*) FROM notes WHERE user_id = $1 AND book_id = $2',
      [userId, bookId],
    )

    res.json({
      success: true,
      data: result.rows,
      count: parseInt(countResult.rows[0].count),
      limit: limitNum,
      offset: offsetNum,
    })
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Save a new note
 * @param req - Express request object
 * @param res - Express response object
 */
export const createNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const { book_id, page_number, content } = req.body

    // Validate inputs
    if (!book_id || page_number === undefined || !content) {
      res
        .status(400)
        .json({ error: 'Book ID, page number, and content are required' })
      return
    }

    if (typeof page_number !== 'number' || page_number < 0) {
      res
        .status(400)
        .json({ error: 'Page number must be a non-negative number' })
      return
    }

    if (typeof content !== 'string' || content.trim().length === 0) {
      res.status(400).json({ error: 'Content cannot be empty' })
      return
    }

    const result = await query(
      'INSERT INTO notes (user_id, book_id, page_number, content) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, book_id, page_number, content],
    )

    res.status(201).json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Error creating note:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Update an existing note
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const noteId = req.params.id
    const { content } = req.body

    // Validate inputs
    if (!content) {
      res.status(400).json({ error: 'Content is required' })
      return
    }

    if (typeof content !== 'string' || content.trim().length === 0) {
      res.status(400).json({ error: 'Content cannot be empty' })
      return
    }

    // Verify note belongs to user before updating
    const checkResult = await query(
      'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
      [noteId, userId],
    )

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: 'Note not found' })
      return
    }

    const updateResult = await query(
      'UPDATE notes SET content = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [content, noteId],
    )

    res.json({
      success: true,
      data: updateResult.rows[0],
    })
  } catch (error) {
    console.error('Error updating note:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Delete a note
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const noteId = req.params.id

    // Verify note belongs to user before deleting
    const checkResult = await query(
      'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
      [noteId, userId],
    )

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: 'Note not found' })
      return
    }

    await query('DELETE FROM notes WHERE id = $1', [noteId])

    res.json({
      success: true,
      message: 'Note deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting note:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
