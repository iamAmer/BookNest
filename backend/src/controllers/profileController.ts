import { Request, Response } from 'express'
import { supabaseAdmin } from '../config/supabase'

export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      res.status(404).json({ error: 'Profile not found' })
      return
    }

    const [
      vocabRes,
      completedRes,
      quizRes,
      timeRes,
    ] = await Promise.all([
      supabaseAdmin
        .from('vocabulary')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId),
      supabaseAdmin
        .from('user_progress')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_completed', true),
      supabaseAdmin
        .from('quiz_results')
        .select('score, id')
        .eq('user_id', userId),
      supabaseAdmin
        .from('user_progress')
        .select('time_spent_seconds')
        .eq('user_id', userId),
    ])

    const timeData = timeRes.data || []
    const quizData = quizRes.data || []

    const totalReadTime = timeData.reduce(
      (sum: number, p: any) => sum + (p.time_spent_seconds || 0),
      0,
    ) || 0

    const avgScore =
      quizData.length > 0
        ? Math.round(quizData.reduce((sum: number, q: any) => sum + (q.score || 0), 0) / quizData.length)
        : 0

    const stats = {
      wordsLearned: vocabRes.count || 0,
      booksCompleted: completedRes.count || 0,
      averageQuizScore: avgScore,
      totalQuizzes: quizData.length,
      totalReadingTimeHours: Math.round((totalReadTime / 3600) * 10) / 10,
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
  } catch (error: any) {
    console.error('Error fetching profile:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id
    const { full_name, bio, avatar_url } = req.body

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name: full_name || null,
        bio: bio || null,
        avatar_url: avatar_url || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error

    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    console.error('Error updating profile:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const updateLevel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id
    const { cefr_level } = req.body

    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    if (!validLevels.includes(cefr_level)) {
      res.status(400).json({ error: 'Invalid CEFR level' })
      return
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        cefr_level,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error

    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    console.error('Error updating level:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}