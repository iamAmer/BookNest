import { Request, Response } from 'express'
import { supabaseAdmin } from '../config/supabase'

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, difficulty, search, limit = 20, offset = 0 } = req.query

    let query = supabaseAdmin.from('books').select('*', { count: 'exact' })

    if (category) query = query.eq('category', category as string)
    if (difficulty) query = query.eq('difficulty', difficulty as string)
    if (search) {
      query = query.or(`title.ilike.*${search}*,author.ilike.*${search}*,description.ilike.*${search}*`)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1)

    const { data, error, count } = await query

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
      pagination: {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        total: count || 0,
      },
    })
  } catch (error: any) {
    console.error('Error fetching books:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const getBookById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params

    const { data, error } = await supabaseAdmin
      .from('books')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Book not found' })
      return
    }

    await supabaseAdmin.rpc('increment_book_views', { book_id: id })

    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    console.error('Error fetching book:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const getCategories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
    })
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

export const getTrending = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { limit = 10 } = req.query

    const { data, error } = await supabaseAdmin
      .from('books')
      .select('*')
      .order('views', { ascending: false })
      .order('rating', { ascending: false })
      .limit(parseInt(limit as string))

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
    })
  } catch (error: any) {
    console.error('Error fetching trending books:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}