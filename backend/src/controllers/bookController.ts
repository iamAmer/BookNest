import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

/**
 * Get list of books with optional filters
 * @param req - Express request object
 * @param res - Express response object
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    let query = supabase.from('books').select('*');
    
    // Apply filters if provided
    if (req.query.category) {
      query = query.eq('category', req.query.category as string);
    }
    
    if (req.query.difficulty) {
      query = query.eq('difficulty', req.query.difficulty as string);
    }
    
    const { data: books, error } = await query;
    
    if (error) throw error;
    
    res.json({
      success: true,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get specific book metadata and content
 * @param req - Express request object
 * @param res - Express response object
 */
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.id;
    
    const { data: book, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .single();
    
    if (error) throw error;
    
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    
    // Note: For large content, we might want to store content separately
    // or implement pagination. For MVP, we'll return the full content.
    // In a real implementation, content might be stored in a separate table
    // or fetched from object storage based on content_url
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
