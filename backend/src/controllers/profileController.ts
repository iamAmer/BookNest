import { Request, Response } from 'express'
import { query } from '../config/database'

/**
 * Get user profile and statistics
 * @param req - Express request object
 * @param res - Express response object
 */
export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id

    // Get user profile data
    const profileResult = await query('SELECT * FROM profiles WHERE id = $1', [
      userId,
    ])

    if (profileResult.rows.length === 0) {
      res.status(404).json({ error: 'Profile not found' })
      return
    }

    const profile = profileResult.rows[0]

    // Get user stats
    const [vocabCount, booksCompleted, quizResults, totalReadTime] =
      await Promise.all([
        // Words learned count
        query('SELECT COUNT(*) as count FROM vocabulary WHERE user_id = $1', [
          userId,
        ]),
        // Books completed count
        query(
          'SELECT COUNT(*) as count FROM user_progress WHERE user_id = $1 AND is_completed = true',
          [userId],
        ),
        // Quiz results
        query(
          'SELECT AVG(score) as avg_score, COUNT(*) as total_quizzes FROM quiz_results WHERE user_id = $1',
          [userId],
        ),
        // Total reading time
        query(
          'SELECT COALESCE(SUM(time_spent_seconds), 0) as total_seconds FROM user_progress WHERE user_id = $1',
          [userId],
        ),
      ])

    const stats = {
      wordsLearned: parseInt(vocabCount.rows[0].count),
      booksCompleted: parseInt(booksCompleted.rows[0].count),
      averageQuizScore: quizResults.rows[0].avg_score
        ? Math.round(quizResults.rows[0].avg_score)
        : 0,
      totalQuizzes: parseInt(quizResults.rows[0].total_quizzes),
      totalReadingTimeHours:
        Math.round(
          (parseInt(totalReadTime.rows[0].total_seconds) / 3600) * 10,
        ) / 10,
    }

    res.json({
      success: true,
      data: {
        id: profile.id,
        full_name: profile.full_name,
        cefr_level: profile.cefr_level,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        created_at: profile.created_at,
        stats,
      },
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Update user profile
 */
export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id
    const { full_name, bio, avatar_url } = req.body

    const updateResult = await query(
      'UPDATE profiles SET full_name = COALESCE($1, full_name), bio = COALESCE($2, bio), avatar_url = COALESCE($3, avatar_url), updated_at = NOW() WHERE id = $4 RETURNING *',
      [full_name, bio, avatar_url, userId],
    )

    if (updateResult.rows.length === 0) {
      res.status(404).json({ error: 'Profile not found' })
      return
    }

    res.json({
      success: true,
      data: updateResult.rows[0],
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Update user's CEFR level
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateLevel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id
    const { cefr_level } = req.body

    // Validate CEFR level
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    if (!validLevels.includes(cefr_level)) {
      res.status(400).json({ error: 'Invalid CEFR level' })
      return
    }

    // Update user's CEFR level
    const result = await query(
      'UPDATE profiles SET cefr_level = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [cefr_level, userId],
    )

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Profile not found' })
      return
    }

    res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Error updating level:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
