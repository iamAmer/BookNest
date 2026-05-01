import { Request, Response } from 'express'
import { supabaseAdmin } from '../config/supabase'

export const updateProgress = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const { bookId, current_page, time_spent_seconds } = req.body

    if (!bookId || current_page === undefined) {
      res.status(400).json({ error: 'Book ID and current page are required' })
      return
    }

    if (typeof current_page !== 'number' || current_page < 0) {
      res.status(400).json({ error: 'Current page must be a non-negative number' })
      return
    }

    const { data: existing } = await supabaseAdmin
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .single()

    let progressData

    if (existing) {
      const updatedTimeSpent = (existing.time_spent_seconds || 0) + (time_spent_seconds || 0)

      const { data, error } = await supabaseAdmin
        .from('user_progress')
        .update({
          current_page,
          time_spent_seconds: updatedTimeSpent,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single()

      if (error) throw error
      progressData = data
    } else {
      const { data, error } = await supabaseAdmin
        .from('user_progress')
        .insert({
          user_id: userId,
          book_id: bookId,
          current_page,
          is_completed: false,
          time_spent_seconds: time_spent_seconds || 0,
        })
        .select()
        .single()

      if (error) throw error
      progressData = data
    }

    const { data: book } = await supabaseAdmin
      .from('books')
      .select('total_pages')
      .eq('id', bookId)
      .single()

    const completionPercentage = book
      ? Math.round((progressData.current_page / book.total_pages) * 100)
      : 0

    res.json({
      success: true,
      data: {
        ...progressData,
        completion_percentage: completionPercentage,
      },
    })
  } catch (error: any) {
    console.error('Error updating progress:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const getProgress = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const bookId = req.params.bookId

    if (!bookId) {
      res.status(400).json({ error: 'Book ID is required' })
      return
    }

    const { data, error } = await supabaseAdmin
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .single()

    if (error || !data) {
      res.json({
        success: true,
        data: {
          user_id: userId,
          book_id: bookId,
          current_page: 0,
          is_completed: false,
          time_spent_seconds: 0,
          completion_percentage: 0,
        },
      })
      return
    }

    const { data: book } = await supabaseAdmin
      .from('books')
      .select('total_pages')
      .eq('id', bookId)
      .single()

    const completionPercentage = book
      ? Math.round((data.current_page / book.total_pages) * 100)
      : 0

    res.json({
      success: true,
      data: {
        ...data,
        completion_percentage: completionPercentage,
      },
    })
  } catch (error: any) {
    console.error('Error fetching progress:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}