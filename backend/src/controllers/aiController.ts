import { Request, Response } from 'express'
import axios from 'axios'
import { query } from '../config/database'

/**
 * Proxy request to the Python AI service to get a simplified version of a sentence
 * based on user's CEFR level.
 * @param req - Express request object
 * @param res - Express response object
 */
export const simplifySentence = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { sentence, cefr_level } = req.body

    // Validate inputs
    if (!sentence || !cefr_level) {
      res.status(400).json({ error: 'Sentence and CEFR level are required' })
      return
    }

    // Validate CEFR level
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    if (!validLevels.includes(cefr_level)) {
      res.status(400).json({ error: 'Invalid CEFR level' })
      return
    }

    // Proxy to Python AI service
    const pythonServiceUrl =
      process.env.PYTHON_SERVICE_URL || 'http://localhost:8000'

    const response = await axios.post(
      `${pythonServiceUrl}/simplify`,
      {
        sentence,
        cefr_level,
      },
      {
        timeout: 10000, // 10 second timeout
      },
    )

    res.json({
      success: true,
      data: response.data,
    })
  } catch (error: any) {
    console.error('Error simplifying sentence:', error.message)

    // Handle specific error types
    if (error.code === 'ECONNABORTED') {
      res.status(504).json({ error: 'AI service timeout' })
      return
    }

    if (error.response) {
      // Python service returned an error
      res.status(error.response.status).json({
        error: 'AI service error',
        details: error.response.data,
      })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Proxy request to get AI-generated quiz questions for a book
 * @param req - Express request object
 * @param res - Express response object
 */
export const getQuizQuestions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bookId = req.params.bookId
    const { cefr_level, numQuestions = 5 } = req.query

    // Validate inputs
    if (!bookId) {
      res.status(400).json({ error: 'Book ID is required' })
      return
    }

    // Validate CEFR level if provided
    if (cefr_level) {
      const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
      if (!validLevels.includes(cefr_level as string)) {
        res.status(400).json({ error: 'Invalid CEFR level' })
        return
      }
    }

    // Proxy to Python AI service
    const pythonServiceUrl =
      process.env.PYTHON_SERVICE_URL || 'http://localhost:8000'

    const response = await axios.get(`${pythonServiceUrl}/quiz/${bookId}`, {
      params: {
        cefr_level,
        numQuestions,
      },
      timeout: 15000, // 15 second timeout for quiz generation
    })

    res.json({
      success: true,
      data: response.data,
    })
  } catch (error: any) {
    console.error('Error getting quiz questions:', error.message)

    // Handle specific error types
    if (error.code === 'ECONNABORTED') {
      res.status(504).json({ error: 'AI service timeout' })
      return
    }

    if (error.response) {
      // Python service returned an error
      res.status(error.response.status).json({
        error: 'AI service error',
        details: error.response.data,
      })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Submit quiz results and check for achievements
 * @param req - Express request object
 * @param res - Express response object
 */
export const submitQuiz = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const { bookId, answers, score, total_questions } = req.body

    // Validate inputs
    if (!bookId || answers === undefined || score === undefined) {
      res
        .status(400)
        .json({ error: 'Book ID, answers, and score are required' })
      return
    }

    if (typeof score !== 'number' || score < 0 || score > 100) {
      res.status(400).json({ error: 'Score must be between 0 and 100' })
      return
    }

    // Save quiz results
    const quizResult = await query(
      `INSERT INTO quiz_results (user_id, book_id, answers, score, total_questions, completed_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [userId, bookId, JSON.stringify(answers), score, total_questions || 0],
    )

    const newQuizResult = quizResult.rows[0]

    // Mark book as completed if score >= 70%
    if (score >= 70) {
      await query(
        'UPDATE user_progress SET is_completed = true WHERE user_id = $1 AND book_id = $2',
        [userId, bookId],
      )
    }

    // Check for achievements
    const newAchievements = []

    try {
      // Get all achievement definitions
      const achievementsResult = await query(
        'SELECT * FROM achievements ORDER BY id',
      )

      const achievements = achievementsResult.rows

      for (const achievement of achievements) {
        const criteria = achievement.criteria_json
          ? JSON.parse(achievement.criteria_json)
          : {}
        let qualifies = false

        switch (achievement.name) {
          case 'First Steps':
            // 1 book completed
            const completedBooksResult1 = await query(
              'SELECT COUNT(*) FROM user_progress WHERE user_id = $1 AND is_completed = true',
              [userId],
            )
            qualifies = parseInt(completedBooksResult1.rows[0].count) >= 1
            break

          case 'Bookworm':
            // 5 books completed
            const completedBooksResult5 = await query(
              'SELECT COUNT(*) FROM user_progress WHERE user_id = $1 AND is_completed = true',
              [userId],
            )
            qualifies = parseInt(completedBooksResult5.rows[0].count) >= 5
            break

          case 'Book Collector':
            // 10 books completed
            const completedBooksResult10 = await query(
              'SELECT COUNT(*) FROM user_progress WHERE user_id = $1 AND is_completed = true',
              [userId],
            )
            qualifies = parseInt(completedBooksResult10.rows[0].count) >= 10
            break

          case 'Vocabulary Apprentice':
            // 10 words learned
            const wordsResult10 = await query(
              'SELECT COUNT(*) FROM vocabulary WHERE user_id = $1 AND mastery_level >= 1',
              [userId],
            )
            qualifies = parseInt(wordsResult10.rows[0].count) >= 10
            break

          case 'Vocabulary Master':
            // 50 words learned
            const wordsResult50 = await query(
              'SELECT COUNT(*) FROM vocabulary WHERE user_id = $1 AND mastery_level >= 1',
              [userId],
            )
            qualifies = parseInt(wordsResult50.rows[0].count) >= 50
            break

          case 'Perfect Score':
            // Quiz score of 100%
            qualifies = score === 100
            break

          case 'Reader':
            // Any book completed
            qualifies = score >= 70 // Quiz passed = book completed
            break

          default:
            qualifies = false
        }

        if (qualifies) {
          // Check if user already has this achievement
          const existingResult = await query(
            'SELECT * FROM user_achievements WHERE user_id = $1 AND achievement_id = $2',
            [userId, achievement.id],
          )

          if (existingResult.rows.length === 0) {
            // Award achievement
            const insertResult = await query(
              'INSERT INTO user_achievements (user_id, achievement_id, earned_at) VALUES ($1, $2, NOW()) RETURNING *',
              [userId, achievement.id],
            )

            newAchievements.push({
              id: achievement.id,
              name: achievement.name,
              description: achievement.description,
              earned_at: insertResult.rows[0].earned_at,
            })
          }
        }
      }
    } catch (achievementError) {
      console.error('Error checking achievements:', achievementError)
      // Don't fail the quiz submission if achievement checking fails
    }

    res.json({
      success: true,
      data: {
        quiz_result: newQuizResult,
        new_achievements: newAchievements,
        message:
          score >= 70
            ? 'Quiz passed! Book marked as completed.'
            : 'Quiz submitted. Keep practicing!',
      },
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
