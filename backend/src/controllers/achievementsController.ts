import { Request, Response } from 'express'
import { query } from '../config/database'

/**
 * Get all available achievements
 */
export const getAchievements = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await query(
      'SELECT * FROM achievements ORDER BY created_at DESC',
    )

    res.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error('Error fetching achievements:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get user's earned achievements
 */
export const getUserAchievements = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id

    const result = await query(
      `SELECT a.*, ua.earned_at 
       FROM achievements a
       INNER JOIN user_achievements ua ON a.id = ua.achievement_id
       WHERE ua.user_id = $1
       ORDER BY ua.earned_at DESC`,
      [userId],
    )

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    console.error('Error fetching user achievements:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get specific achievement details
 */
export const getAchievementById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params

    const result = await query('SELECT * FROM achievements WHERE id = $1', [id])

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Achievement not found' })
      return
    }

    res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Error fetching achievement:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Check for new achievements after reading/quiz completion
 */
export const checkAchievements = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id
    const { bookId } = req.params

    if (!bookId) {
      res.status(400).json({ error: 'Book ID is required' })
      return
    }

    const newAchievements = []

    // Check: Book Completed
    const progressResult = await query(
      `SELECT COUNT(*) as count FROM user_progress 
       WHERE user_id = $1 AND is_completed = true`,
      [userId],
    )
    const booksCompleted = parseInt(progressResult.rows[0].count)

    // Check "First Steps" achievement
    if (booksCompleted === 1) {
      const existingAchievement = await query(
        `SELECT * FROM user_achievements 
         WHERE user_id = $1 AND achievement_id IN (
           SELECT id FROM achievements WHERE name = 'First Steps'
         )`,
        [userId],
      )

      if (existingAchievement.rows.length === 0) {
        const achievementResult = await query(
          'SELECT id FROM achievements WHERE name = $1',
          ['First Steps'],
        )

        if (achievementResult.rows.length > 0) {
          await query(
            `INSERT INTO user_achievements (user_id, achievement_id) 
             VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [userId, achievementResult.rows[0].id],
          )
          newAchievements.push({
            name: 'First Steps',
            message: 'You completed your first book!',
          })
        }
      }
    }

    // Check "Bookworm" achievement (5 books)
    if (booksCompleted === 5) {
      const achievementResult = await query(
        'SELECT id FROM achievements WHERE name = $1',
        ['Bookworm'],
      )

      if (achievementResult.rows.length > 0) {
        await query(
          `INSERT INTO user_achievements (user_id, achievement_id) 
           VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [userId, achievementResult.rows[0].id],
        )
        newAchievements.push({
          name: 'Bookworm',
          message: 'You completed 5 books!',
        })
      }
    }

    // Check "Book Collector" achievement (10 books)
    if (booksCompleted === 10) {
      const achievementResult = await query(
        'SELECT id FROM achievements WHERE name = $1',
        ['Book Collector'],
      )

      if (achievementResult.rows.length > 0) {
        await query(
          `INSERT INTO user_achievements (user_id, achievement_id) 
           VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [userId, achievementResult.rows[0].id],
        )
        newAchievements.push({
          name: 'Book Collector',
          message: 'You collected 10 books!',
        })
      }
    }

    // Check vocabulary achievements
    const vocabResult = await query(
      'SELECT COUNT(*) as count FROM vocabulary WHERE user_id = $1',
      [userId],
    )
    const wordsLearned = parseInt(vocabResult.rows[0].count)

    if (wordsLearned === 10) {
      const achievementResult = await query(
        'SELECT id FROM achievements WHERE name = $1',
        ['Vocabulary Apprentice'],
      )

      if (achievementResult.rows.length > 0) {
        await query(
          `INSERT INTO user_achievements (user_id, achievement_id) 
           VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [userId, achievementResult.rows[0].id],
        )
        newAchievements.push({
          name: 'Vocabulary Apprentice',
          message: 'You learned 10 words!',
        })
      }
    }

    if (wordsLearned === 50) {
      const achievementResult = await query(
        'SELECT id FROM achievements WHERE name = $1',
        ['Vocabulary Master'],
      )

      if (achievementResult.rows.length > 0) {
        await query(
          `INSERT INTO user_achievements (user_id, achievement_id) 
           VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [userId, achievementResult.rows[0].id],
        )
        newAchievements.push({
          name: 'Vocabulary Master',
          message: 'You learned 50 words!',
        })
      }
    }

    res.json({
      success: true,
      newAchievements,
      totalAchievements: newAchievements.length,
    })
  } catch (error) {
    console.error('Error checking achievements:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
