import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

/**
 * Get user profile and statistics
 * @param req - Express request object
 * @param res - Express response object
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    
    // Get user profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError) throw profileError;
    
    // Get user statistics (words learned, reading streaks, etc.)
    // For now, we'll return basic profile data
    // In a full implementation, we'd calculate these from related tables
    
    res.json({
      success: true,
      data: {
        id: profile.id,
        full_name: profile.full_name,
        cefr_level: profile.cefr_level,
        avatar_url: profile.avatar_url,
        // These would be calculated from actual data in a real implementation
        stats: {
          wordsLearned: 0, // Placeholder - would come from vocabulary table
          readingStreak: 0, // Placeholder - would come from user_progress/sessions
          booksCompleted: 0 // Placeholder
        }
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Update user's CEFR level
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateLevel = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { cefr_level } = req.body;
    
    // Validate CEFR level
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    if (!validLevels.includes(cefr_level)) {
      res.status(400).json({ error: 'Invalid CEFR level' });
      return;
    }
    
    // Update user's CEFR level
    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update({ cefr_level })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({
      success: true,
      data: updatedProfile
    });
  } catch (error) {
    console.error('Error updating level:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
