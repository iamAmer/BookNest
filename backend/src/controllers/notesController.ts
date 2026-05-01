import { Request, Response } from 'express'
import { supabaseAdmin } from '../config/supabase'

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const bookId = req.params.bookId
    const { limit = 50, offset = 0 } = req.query

    if (!bookId) {
      res.status(400).json({ error: 'Book ID is required' })
      return
    }

    const limitNum = Math.min(parseInt(limit as string) || 50, 100)
    const offsetNum = Math.max(0, parseInt(offset as string) || 0)

    const { data, error, count } = await supabaseAdmin
      .from('notes')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .order('created_at', { ascending: false })
      .range(offsetNum, offsetNum + limitNum - 1)

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
      count: count || 0,
      limit: limitNum,
      offset: offsetNum,
    })
  } catch (error: any) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const createNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const { book_id, page_number, content } = req.body

    if (!book_id || page_number === undefined || !content) {
      res.status(400).json({ error: 'Book ID, page number, and content are required' })
      return
    }

    if (typeof page_number !== 'number' || page_number < 0) {
      res.status(400).json({ error: 'Page number must be a non-negative number' })
      return
    }

    if (typeof content !== 'string' || content.trim().length === 0) {
      res.status(400).json({ error: 'Content cannot be empty' })
      return
    }

    const { data, error } = await supabaseAdmin
      .from('notes')
      .insert({
        user_id: userId,
        book_id,
        page_number,
        content,
      })
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success: true,
      data,
    })
  } catch (error: any) {
    console.error('Error creating note:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const updateNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const noteId = req.params.id
    const { content } = req.body

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      res.status(400).json({ error: 'Content is required' })
      return
    }

    const { data: check } = await supabaseAdmin
      .from('notes')
      .select('id')
      .eq('id', noteId)
      .eq('user_id', userId)
      .single()

    if (!check) {
      res.status(404).json({ error: 'Note not found' })
      return
    }

    const { data, error } = await supabaseAdmin
      .from('notes')
      .update({
        content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', noteId)
      .select()
      .single()

    if (error) throw error

    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    console.error('Error updating note:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const deleteNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.id
    const noteId = req.params.id

    const { data: check } = await supabaseAdmin
      .from('notes')
      .select('id')
      .eq('id', noteId)
      .eq('user_id', userId)
      .single()

    if (!check) {
      res.status(404).json({ error: 'Note not found' })
      return
    }

    const { error } = await supabaseAdmin
      .from('notes')
      .delete()
      .eq('id', noteId)

    if (error) throw error

    res.json({
      success: true,
      message: 'Note deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting note:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}