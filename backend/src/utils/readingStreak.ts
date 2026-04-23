import { query } from '../config/database'

/**
 * Reading streak utilities
 */

/**
 * Get user's current reading streak
 * @param userId - The user ID
 * @returns Current streak count and last reading date
 */
export const getReadingStreak = async (
  userId: string,
): Promise<{ streak: number; last_reading_date: Date | null }> => {
  try {
    // Get the most recent progress update
    const result = await query(
      `SELECT updated_at FROM user_progress 
       WHERE user_id = $1 
       ORDER BY updated_at DESC 
       LIMIT 1`,
      [userId],
    )

    if (result.rows.length === 0) {
      return { streak: 0, last_reading_date: null }
    }

    const lastReadingDate = new Date(result.rows[0].updated_at)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const lastReadingDateNormalized = new Date(lastReadingDate)
    lastReadingDateNormalized.setHours(0, 0, 0, 0)

    // If last reading was not today or yesterday, streak is broken
    if (lastReadingDateNormalized < yesterday) {
      return { streak: 0, last_reading_date: lastReadingDate }
    }

    // Calculate streak by counting consecutive days with reading activity
    const streakResult = await query(
      `SELECT DISTINCT DATE(updated_at)::text as reading_day
       FROM user_progress 
       WHERE user_id = $1 
       ORDER BY DATE(updated_at) DESC 
       LIMIT 100`,
      [userId],
    )

    let streak = 0
    let expectedDate = new Date(today)

    for (const row of streakResult.rows) {
      const readingDate = new Date(row.reading_day)

      if (readingDate.getTime() === expectedDate.getTime()) {
        streak++
        expectedDate.setDate(expectedDate.getDate() - 1)
      } else {
        break
      }
    }

    return { streak, last_reading_date: lastReadingDate }
  } catch (error) {
    console.error('Error calculating reading streak:', error)
    return { streak: 0, last_reading_date: null }
  }
}

/**
 * Check if user should earn reading streak achievements
 * @param userId - The user ID
 * @param streak - Current streak count
 * @returns Array of achievement names to award
 */
export const checkStreakAchievements = async (
  userId: string,
  streak: number,
): Promise<string[]> => {
  const achievementsToCheck: { [key: number]: string } = {
    7: 'Week Warrior', // 7-day streak
    14: 'Reading Devotee', // 14-day streak
    30: 'Reading Master', // 30-day streak
  }

  const newAchievements: string[] = []

  try {
    for (const [streakGoal, achievementName] of Object.entries(
      achievementsToCheck,
    )) {
      if (streak >= parseInt(streakGoal)) {
        // Check if user already has this achievement
        const checkResult = await query(
          `SELECT ua.* FROM user_achievements ua
           JOIN achievements a ON ua.achievement_id = a.id
           WHERE ua.user_id = $1 AND a.name = $2`,
          [userId, achievementName],
        )

        if (checkResult.rows.length === 0) {
          // User doesn't have this achievement, add it to the list
          newAchievements.push(achievementName)

          // Get achievement ID and insert it
          const achievementResult = await query(
            'SELECT id FROM achievements WHERE name = $1',
            [achievementName],
          )

          if (achievementResult.rows.length > 0) {
            await query(
              'INSERT INTO user_achievements (user_id, achievement_id, earned_at) VALUES ($1, $2, NOW()) ON CONFLICT DO NOTHING',
              [userId, achievementResult.rows[0].id],
            )
          }
        }
      }
    }
  } catch (error) {
    console.error('Error checking streak achievements:', error)
  }

  return newAchievements
}

/**
 * Update user's reading streak when they read
 * This should be called whenever a user updates their reading progress
 * @param userId - The user ID
 * @returns Updated streak info and new achievements earned
 */
export const updateReadingStreak = async (
  userId: string,
): Promise<{
  streak: number
  last_reading_date: Date | null
  new_achievements: string[]
}> => {
  try {
    const streakInfo = await getReadingStreak(userId)
    const newAchievements = await checkStreakAchievements(
      userId,
      streakInfo.streak,
    )

    return {
      streak: streakInfo.streak,
      last_reading_date: streakInfo.last_reading_date,
      new_achievements: newAchievements,
    }
  } catch (error) {
    console.error('Error updating reading streak:', error)
    return {
      streak: 0,
      last_reading_date: null,
      new_achievements: [],
    }
  }
}

/**
 * Get reading statistics for a user
 * @param userId - The user ID
 * @returns User's reading statistics
 */
export const getReadingStats = async (userId: string) => {
  try {
    const result = await query(
      `SELECT 
        COUNT(DISTINCT book_id) as books_started,
        SUM(CASE WHEN is_completed = true THEN 1 ELSE 0 END) as books_completed,
        SUM(CASE WHEN time_spent_seconds > 0 THEN time_spent_seconds ELSE 0 END) as total_reading_seconds,
        AVG(CASE WHEN is_completed = true THEN 100 ELSE ROUND((current_page::float / 
          (SELECT total_pages FROM books WHERE id = user_progress.book_id)) * 100) END) as average_completion_percentage
      FROM user_progress 
      WHERE user_id = $1`,
      [userId],
    )

    const stats = result.rows[0]

    return {
      books_started: parseInt(stats.books_started) || 0,
      books_completed: parseInt(stats.books_completed) || 0,
      total_reading_hours:
        Math.round((parseInt(stats.total_reading_seconds || 0) / 3600) * 100) /
        100,
      average_completion_percentage:
        Math.round(parseFloat(stats.average_completion_percentage || 0) * 100) /
        100,
    }
  } catch (error) {
    console.error('Error getting reading stats:', error)
    return {
      books_started: 0,
      books_completed: 0,
      total_reading_hours: 0,
      average_completion_percentage: 0,
    }
  }
}
