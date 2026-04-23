import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

/**
 * Update reading progress
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { bookId, current_page } = req.body;
    
    // Validate inputs
    if (!bookId || current_page === undefined) {
      res.status(400).json({ error: 'Book ID and current page are required' });
      return;
    }
    
    // Check if progress entry exists for this user/book
    const { data: existingProgress, error: fetchError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .single();
    
    let progressData;
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows returned
      throw fetchError;
    }
    
    if (existingProgress) {
      // Update existing progress
      const { data: updatedProgress, error: updateError } = await supabase
        .from('user_progress')
        .update({ 
          current_page,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProgress.id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      progressData = updatedProgress;
    } else {
      // Create new progress entry
      const { data: newProgress, error: insertError } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          book_id: bookId,
          current_page,
          is_completed: false
        })
        .select()
        .single();
      
      if (insertError) throw insertError;
      progressData = newProgress;
    }
    
    // Calculate completion percentage (would need book's total_pages)
    // For now, we'll just return the progress data
    // In a full implementation, we'd join with books table to get total_pages
    
    res.json({
      success: true,
      data: progressData
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get user's reading progress for a specific book
 * @param req - Express request object
 * @param res - Express response object
 */
export const getProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const bookId = req.params.bookId;
    
    const { data: progress, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    // If no progress exists, return default values
    if (!progress) {
      res.json({
        success: true,
        data: {
          user_id: userId,
          book_id: bookId,
          current_page: 0,
          is_completed: false
        }
      });
      return;
    }
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
