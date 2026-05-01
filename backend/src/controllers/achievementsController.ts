import { Request, Response } from 'express'
import { supabaseAdmin } from '../config/supabase'

export const getAchievements = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
    })
  } catch (error: any) {
    console.error('Error fetching achievements:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const getUserAchievements = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id

    const { data, error } = await supabaseAdmin
      .from('user_achievements')
      .select('achievements(*), earned_at')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    })
  } catch (error: any) {
    console.error('Error fetching user achievements:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const getAchievementById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params

    const { data, error } = await supabaseAdmin
      .from('achievements')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Achievement not found' })
      return
    }

    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    console.error('Error fetching achievement:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

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

    const newAchievements: any[] = []

    const { count: booksCompleted } = await supabaseAdmin
      .from('user_progress')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_completed', true)

    const milestones = [
      { count: 1, name: 'First Steps' },
      { count: 5, name: 'Bookworm' },
      { count: 10, name: 'Book Collector' },
    ]

    for (const milestone of milestones) {
      if (booksCompleted === milestone.count) {
        const { data: achievement } = await supabaseAdmin
          .from('achievements')
          .select('id, name, description')
          .eq('name', milestone.name)
          .single()

        if (achievement) {
          const { data: existing } = await supabaseAdmin
            .from('user_achievements')
            .select('id')
            .eq('user_id', userId)
            .eq('achievement_id', achievement.id)
            .single()

          if (!existing) {
            await supabaseAdmin.from('user_achievements').insert({
              user_id: userId,
              achievement_id: achievement.id,
            })
            newAchievements.push(achievement)
          }
        }
      }
    }

    const { count: wordsLearned } = await supabaseAdmin
      .from('vocabulary')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)

    const wordMilestones = [
      { count: 10, name: 'Vocabulary Apprentice' },
      { count: 50, name: 'Vocabulary Master' },
    ]

    for (const milestone of wordMilestones) {
      if (wordsLearned === milestone.count) {
        const { data: achievement } = await supabaseAdmin
          .from('achievements')
          .select('id, name, description')
          .eq('name', milestone.name)
          .single()

        if (achievement) {
          const { data: existing } = await supabaseAdmin
            .from('user_achievements')
            .select('id')
            .eq('user_id', userId)
            .eq('achievement_id', achievement.id)
            .single()

          if (!existing) {
            await supabaseAdmin.from('user_achievements').insert({
              user_id: userId,
              achievement_id: achievement.id,
            })
            newAchievements.push(achievement)
          }
        }
      }
    }

    res.json({
      success: true,
      newAchievements,
      totalAchievements: newAchievements.length,
    })
  } catch (error: any) {
    console.error('Error checking achievements:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}