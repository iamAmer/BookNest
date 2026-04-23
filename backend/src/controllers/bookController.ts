import { Request, Response } from 'express'
import { query } from '../config/database'

/**
 * Get list of books with optional filters and search
 * @param req - Express request object
 * @param res - Express response object
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, difficulty, search, limit = 20, offset = 0 } = req.query

    let queryStr = 'SELECT * FROM books WHERE 1=1'
    const params: any[] = []
    let paramCount = 1

    // Apply filters
    if (category) {
      queryStr += ` AND category = $${paramCount}`
      params.push(category)
      paramCount++
    }

    if (difficulty) {
      queryStr += ` AND difficulty = $${paramCount}`
      params.push(difficulty)
      paramCount++
    }

    // Apply search (searches title, author, description)
    if (search) {
      queryStr += ` AND (title ILIKE $${paramCount} OR author ILIKE $${paramCount} OR description ILIKE $${paramCount})`
      params.push(`%${search}%`)
      paramCount++
    }

    // Get total count
    const countResult = await query(
      `SELECT COUNT(*) as total FROM books WHERE 1=1 ${
        category ? `AND category = $${params.indexOf(category) + 1}` : ''
      } ${
        difficulty ? `AND difficulty = $${params.indexOf(difficulty) + 1}` : ''
      } ${
        search
          ? `AND (title ILIKE '%${search}%' OR author ILIKE '%${search}%' OR description ILIKE '%${search}%')`
          : ''
      }`,
      [],
    )

    queryStr += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`
    params.push(parseInt(limit as string), parseInt(offset as string))

    const result = await query(queryStr, params)

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        total: parseInt(countResult.rows[0].total),
      },
    })
  } catch (error) {
    console.error('Error fetching books:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get specific book metadata and content
 * @param req - Express request object
 * @param res - Express response object
 */
export const getBookById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params

    const result = await query('SELECT * FROM books WHERE id = $1', [id])

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' })
      return
    }

    // Increment views
    await query('UPDATE books SET views = views + 1 WHERE id = $1', [id])

    res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Error fetching book:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get all categories
 */
export const getCategories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await query('SELECT * FROM categories ORDER BY name ASC')

    res.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get trending/popular books
 */
export const getTrending = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { limit = 10 } = req.query

    const result = await query(
      'SELECT * FROM books ORDER BY views DESC, rating DESC LIMIT $1',
      [parseInt(limit as string)],
    )

    res.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error('Error fetching trending books:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
