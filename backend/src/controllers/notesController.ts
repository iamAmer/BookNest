import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

/**
 * Get user notes for a specific book
 * @param req - Express request object
 * @param res - Express response object
 */
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const bookId = req.params.bookId;
    
    const { data: notes, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json({
      success: true,
      data: notes
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Save a new note
 * @param req - Express request object
 * @param res - Express response object
 */
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { book_id, page_number, content } = req.body;
    
    // Validate inputs
    if (!book_id || page_number === undefined || !content) {
      res.status(400).json({ error: 'Book ID, page number, and content are required' });
      return;
    }
    
    const { data: note, error } = await supabase
      .from('notes')
      .insert({
        user_id: userId,
        book_id,
        page_number,
        content
      })
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Update an existing note
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const noteId = req.params.id;
    const { content } = req.body;
    
    // Validate inputs
    if (!content) {
      res.status(400).json({ error: 'Content is required' });
      return;
    }
    
    // Verify note belongs to user before updating
    const { data: note, error: fetchError } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .eq('user_id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }
    
    const { data: updatedNote, error: updateError } = await supabase
      .from('notes')
      .update({ content })
      .eq('id', noteId)
      .select()
      .single();
    
    if (updateError) throw updateError;
    
    res.json({
      success: true,
      data: updatedNote
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Delete a note
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const noteId = req.params.id;
    
    // Verify note belongs to user before deleting
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
