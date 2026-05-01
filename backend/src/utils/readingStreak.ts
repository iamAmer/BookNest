import { supabaseAdmin } from '../config/supabase'

export const getReadingStreak = async (
  userId: string,
): Promise<{ streak: number; last_reading_date: Date | null }> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_progress')
      .select('updated_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (error || !data) {
      return { streak: 0, last_reading_date: null }
    }

    const lastReadingDate = new Date(data.updated_at)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const lastReadingDateNormalized = new Date(lastReadingDate)
    lastReadingDateNormalized.setHours(0, 0, 0, 0)

    if (lastReadingDateNormalized < yesterday) {
      return { streak: 0, last_reading_date: lastReadingDate }
    }

    const { data: streakData } = await supabaseAdmin
      .from('user_progress')
      .select('updated_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(100)

    if (!streakData) {
      return { streak: 0, last_reading_date: lastReadingDate }
    }

    let streak = 0
    let expectedDate = new Date(today)

    for (const row of streakData) {
      const readingDate = new Date(row.updated_at)
      readingDate.setHours(0, 0, 0, 0)

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

export const checkStreakAchievements = async (
  userId: string,
  streak: number,
): Promise<string[]> => {
  const achievementsToCheck: { [key: number]: string } = {
    7: 'Week Warrior',
    14: 'Reading Devotee',
    30: 'Reading Master',
  }

  const newAchievements: string[] = []

  try {
    for (const [streakGoal, achievementName] of Object.entries(achievementsToCheck)) {
      if (streak >= parseInt(streakGoal)) {
        const { data: achievement } = await supabaseAdmin
          .from('achievements')
          .select('id')
          .eq('name', achievementName)
          .single()

        if (!achievement) continue

        const { data: existing } = await supabaseAdmin
          .from('user_achievements')
          .select('id')
          .eq('user_id', userId)
          .eq('achievement_id', achievement.id)
          .single()

        if (!existing) {
          newAchievements.push(achievementName)

          await supabaseAdmin.from('user_achievements').insert({
            user_id: userId,
            achievement_id: achievement.id,
            earned_at: new Date().toISOString(),
          })
        }
      }
    }
  } catch (error) {
    console.error('Error checking streak achievements:', error)
  }

  return newAchievements
}

export const updateReadingStreak = async (userId: string) => {
  try {
    const streakInfo = await getReadingStreak(userId)
    const newAchievements = await checkStreakAchievements(userId, streakInfo.streak)

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

export const getReadingStats = async (userId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_progress')
      .select('*, books!inner(total_pages)')
      .eq('user_id', userId)

    if (error) throw error

    const stats = {
      books_started: data?.length || 0,
      books_completed: data?.filter((p: any) => p.is_completed).length || 0,
      total_reading_seconds: data?.reduce(
        (sum: number, p: any) => sum + (p.time_spent_seconds || 0),
        0,
      ) || 0,
      average_completion_percentage: 0,
    }

    if (data && data.length > 0) {
      const totalCompletion = data.reduce((sum: number, p: any) => {
        if (p.is_completed) return sum + 100
        const book = p.books as any
        if (book?.total_pages) {
          return sum + (p.current_page / book.total_pages) * 100
        }
        return sum
      }, 0)
      stats.average_completion_percentage = totalCompletion / data.length
    }

    return {
      books_started: stats.books_started,
      books_completed: stats.books_completed,
      total_reading_hours: Math.round((stats.total_reading_seconds / 3600) * 100) / 100,
      average_completion_percentage:
        Math.round(stats.average_completion_percentage * 100) / 100,
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