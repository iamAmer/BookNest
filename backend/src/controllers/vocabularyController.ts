import { Request, Response } from 'express'
import { query } from '../config/database'

/**
 * Save a word tapped in the UI to the user's personal list
 * @param req - Express request object
 * @param res - Express response object
 */
export const saveVocabulary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const { word, context_sentence, definition } = req.body

    // Validate inputs
    if (!word || !context_sentence || !definition) {
      res
        .status(400)
        .json({ error: 'Word, context sentence, and definition are required' })
      return
    }

    if (typeof word !== 'string' || word.trim().length === 0) {
      res.status(400).json({ error: 'Word cannot be empty' })
      return
    }

    // Check if word already exists for this user (to avoid duplicates)
    const existingResult = await query(
      'SELECT * FROM vocabulary WHERE user_id = $1 AND LOWER(word) = LOWER($2)',
      [userId, word],
    )

    let vocabData

    if (existingResult.rows.length > 0) {
      // Update existing vocabulary entry
      const updateResult = await query(
        'UPDATE vocabulary SET context_sentence = $1, definition = $2, last_reviewed = NOW() WHERE id = $3 RETURNING *',
        [context_sentence, definition, existingResult.rows[0].id],
      )

      vocabData = updateResult.rows[0]
    } else {
      // Create new vocabulary entry
      const insertResult = await query(
        'INSERT INTO vocabulary (user_id, word, context_sentence, definition, mastery_level, last_reviewed) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
        [userId, word, context_sentence, definition, 0],
      )

      vocabData = insertResult.rows[0]
    }

    res.status(201).json({
      success: true,
      data: vocabData,
    })
  } catch (error) {
    console.error('Error saving vocabulary:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get user's vocabulary list
 * @param req - Express request object
 * @param res - Express response object
 */
export const getVocabulary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const { limit = 50, offset = 0, mastery_level } = req.query

    const limitNum = Math.min(parseInt(limit as string) || 50, 100)
    const offsetNum = Math.max(0, parseInt(offset as string) || 0)

    let sqlQuery = 'SELECT * FROM vocabulary WHERE user_id = $1'
    let params: any[] = [userId]

    if (mastery_level !== undefined) {
      const level = parseInt(mastery_level as string)
      if (level >= 0 && level <= 5) {
        sqlQuery += ' AND mastery_level = $2'
        params.push(level)
      }
    }

    sqlQuery +=
      ' ORDER BY last_reviewed DESC LIMIT $' +
      (params.length + 1) +
      ' OFFSET $' +
      (params.length + 2)
    params.push(limitNum, offsetNum)

    const result = await query(sqlQuery, params)

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) FROM vocabulary WHERE user_id = $1'
    let countParams: any[] = [userId]

    if (mastery_level !== undefined) {
      const level = parseInt(mastery_level as string)
      if (level >= 0 && level <= 5) {
        countQuery += ' AND mastery_level = $2'
        countParams.push(level)
      }
    }

    const countResult = await query(countQuery, countParams)

    res.json({
      success: true,
      data: result.rows,
      count: parseInt(countResult.rows[0].count),
      limit: limitNum,
      offset: offsetNum,
    })
  } catch (error) {
    console.error('Error fetching vocabulary:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Update vocabulary mastery level
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateVocabularyReview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const vocabId = req.params.id
    const { mastery_level } = req.body

    // Validate mastery level
    if (mastery_level !== undefined) {
      if (
        typeof mastery_level !== 'number' ||
        mastery_level < 0 ||
        mastery_level > 5
      ) {
        res.status(400).json({ error: 'Mastery level must be between 0 and 5' })
        return
      }
    }

    // Verify vocabulary belongs to user
    const checkResult = await query(
      'SELECT * FROM vocabulary WHERE id = $1 AND user_id = $2',
      [vocabId, userId],
    )

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: 'Vocabulary entry not found' })
      return
    }

    const updateResult = await query(
      'UPDATE vocabulary SET mastery_level = $1, last_reviewed = NOW() WHERE id = $2 RETURNING *',
      [
        mastery_level !== undefined
          ? mastery_level
          : checkResult.rows[0].mastery_level,
        vocabId,
      ],
    )

    res.json({
      success: true,
      data: updateResult.rows[0],
    })
  } catch (error) {
    console.error('Error updating vocabulary review:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get vocabulary statistics for the user
 * @param req - Express request object
 * @param res - Express response object
 */
export const getVocabularyStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id

    const result = await query(
      `SELECT 
        COUNT(*) as total_words,
        SUM(CASE WHEN mastery_level >= 3 THEN 1 ELSE 0 END) as learned_words,
        SUM(CASE WHEN mastery_level >= 5 THEN 1 ELSE 0 END) as mastered_words,
        AVG(mastery_level) as average_mastery
      FROM vocabulary WHERE user_id = $1`,
      [userId],
    )

    res.json({
      success: true,
      data: {
        total_words: parseInt(result.rows[0].total_words),
        learned_words: parseInt(result.rows[0].learned_words || 0),
        mastered_words: parseInt(result.rows[0].mastered_words || 0),
        average_mastery: parseFloat(
          result.rows[0].average_mastery || 0,
        ).toFixed(2),
      },
    })
  } catch (error) {
    console.error('Error fetching vocabulary stats:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Delete a vocabulary entry
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteVocabulary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const vocabId = req.params.id

    // Verify vocabulary belongs to user before deleting
    const checkResult = await query(
      'SELECT * FROM vocabulary WHERE id = $1 AND user_id = $2',
      [vocabId, userId],
    )

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: 'Vocabulary entry not found' })
      return
    }

    await query('DELETE FROM vocabulary WHERE id = $1', [vocabId])

    res.json({
      success: true,
      message: 'Vocabulary entry deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting vocabulary:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
