import { Request, Response } from 'express'
import { supabaseAdmin } from '../config/supabase'

export const saveVocabulary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const { word, context_sentence, definition } = req.body

    if (!word || !context_sentence || !definition) {
      res.status(400).json({ error: 'Word, context sentence, and definition are required' })
      return
    }

    if (typeof word !== 'string' || word.trim().length === 0) {
      res.status(400).json({ error: 'Word cannot be empty' })
      return
    }

    const { data: existing } = await supabaseAdmin
      .from('vocabulary')
      .select('*')
      .eq('user_id', userId)
      .ilike('word', word)
      .single()

    let vocabData

    if (existing) {
      const { data, error } = await supabaseAdmin
        .from('vocabulary')
        .update({
          context_sentence,
          definition,
          last_reviewed: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single()

      if (error) throw error
      vocabData = data
    } else {
      const { data, error } = await supabaseAdmin
        .from('vocabulary')
        .insert({
          user_id: userId,
          word,
          context_sentence,
          definition,
          mastery_level: 0,
          last_reviewed: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      vocabData = data
    }

    res.status(201).json({
      success: true,
      data: vocabData,
    })
  } catch (error: any) {
    console.error('Error saving vocabulary:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const getVocabulary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const { limit = 50, offset = 0, mastery_level } = req.query

    const limitNum = Math.min(parseInt(limit as string) || 50, 100)
    const offsetNum = Math.max(0, parseInt(offset as string) || 0)

    let query = supabaseAdmin
      .from('vocabulary')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)

    if (mastery_level !== undefined) {
      const level = parseInt(mastery_level as string)
      if (level >= 0 && level <= 5) {
        query = query.eq('mastery_level', level)
      }
    }

    query = query
      .order('last_reviewed', { ascending: false })
      .range(offsetNum, offsetNum + limitNum - 1)

    const { data, error, count } = await query

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
      count: count || 0,
      limit: limitNum,
      offset: offsetNum,
    })
  } catch (error: any) {
    console.error('Error fetching vocabulary:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const updateVocabularyReview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const vocabId = req.params.id
    const { mastery_level } = req.body

    if (mastery_level !== undefined) {
      if (typeof mastery_level !== 'number' || mastery_level < 0 || mastery_level > 5) {
        res.status(400).json({ error: 'Mastery level must be between 0 and 5' })
        return
      }
    }

    const { data: check } = await supabaseAdmin
      .from('vocabulary')
      .select('*')
      .eq('id', vocabId)
      .eq('user_id', userId)
      .single()

    if (!check) {
      res.status(404).json({ error: 'Vocabulary entry not found' })
      return
    }

    const { data, error } = await supabaseAdmin
      .from('vocabulary')
      .update({
        mastery_level: mastery_level ?? check.mastery_level,
        last_reviewed: new Date().toISOString(),
      })
      .eq('id', vocabId)
      .select()
      .single()

    if (error) throw error

    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    console.error('Error updating vocabulary review:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const getVocabularyStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id

    const { data, error } = await supabaseAdmin
      .from('vocabulary')
      .select('mastery_level')
      .eq('user_id', userId)

    if (error) throw error

    const total = data?.length || 0
    const learned = data?.filter((w: any) => w.mastery_level >= 3).length || 0
    const mastered = data?.filter((w: any) => w.mastery_level >= 5).length || 0
    const avgMastery =
      total > 0
        ? data!.reduce((sum: number, w: any) => sum + (w.mastery_level || 0), 0) / total
        : 0

    res.json({
      success: true,
      data: {
        total_words: total,
        learned_words: learned,
        mastered_words: mastered,
        average_mastery: avgMastery.toFixed(2),
      },
    })
  } catch (error: any) {
    console.error('Error fetching vocabulary stats:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const deleteVocabulary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const vocabId = req.params.id

    const { data: check } = await supabaseAdmin
      .from('vocabulary')
      .select('id')
      .eq('id', vocabId)
      .eq('user_id', userId)
      .single()

    if (!check) {
      res.status(404).json({ error: 'Vocabulary entry not found' })
      return
    }

    const { error } = await supabaseAdmin
      .from('vocabulary')
      .delete()
      .eq('id', vocabId)

    if (error) throw error

    res.json({
      success: true,
      message: 'Vocabulary entry deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting vocabulary:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}