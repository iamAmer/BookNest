import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

/**
 * Save a word tapped in the UI to the user's personal list
 * @param req - Express request object
 * @param res - Express response object
 */
export const saveVocabulary = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { word, context_sentence, definition } = req.body;
    
    // Validate inputs
    if (!word || !context_sentence || !definition) {
      res.status(400).json({ error: 'Word, context sentence, and definition are required' });
      return;
    }
    
    // Check if word already exists for this user (to avoid duplicates)
    const { data: existingVocab, error: fetchError } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('user_id', userId)
      .eq('word', word)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }
    
    let vocabData;
    if (existingVocab) {
      // Update existing vocabulary entry (e.g., update context or definition)
      const { data: updatedVocab, error: updateError } = await supabase
        .from('vocabulary')
        .update({ 
          context_sentence,
          definition,
          last_reviewed: new Date().toISOString()
        })
        .eq('id', existingVocab.id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      vocabData = updatedVocab;
    } else {
      // Create new vocabulary entry
      const { data: newVocab, error: insertError } = await supabase
        .from('vocabulary')
        .insert({
          user_id: userId,
          word,
          context_sentence,
          definition,
          last_reviewed: new Date().toISOString()
        })
        .select()
        .single();
      
      if (insertError) throw insertError;
      vocabData = newVocab;
    }
    
    res.status(201).json({
      success: true,
      data: vocabData
    });
  } catch (error) {
    console.error('Error saving vocabulary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get user's vocabulary list
 * @param req - Express request object
 * @param res - Express response object
 */
export const getVocabulary = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { limit = 50, offset = 0 } = req.query;
    
    const { data: vocabulary, error, count } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('last_reviewed', { ascending: false })
      .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1);
    
    if (error) throw error;
    
    res.json({
      success: true,
      data: vocabulary,
      count
    });
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Update vocabulary review status
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateVocabularyReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const vocabId = req.params.id;
    const { mastery_level } = req.body; // e.g., 0-5 scale or boolean for known/unknown
    
    // Verify vocabulary belongs to user
    const { data: vocab, error: fetchError } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('id', vocabId)
      .eq('user_id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    if (!vocab) {
      res.status(404).json({ error: 'Vocabulary entry not found' });
      return;
    }
    
    const { data: updatedVocab, error: updateError } = await supabase
      .from('vocabulary')
      .update({ 
        last_reviewed: new Date().toISOString()
        // In a full implementation, we'd have a mastery_level column
        // For now, we'll just update the last_reviewed timestamp
      })
      .eq('id', vocabId)
      .select()
      .single();
    
    if (updateError) throw updateError;
    
    res.json({
      success: true,
      data: updatedVocab
    });
  } catch (error) {
    console.error('Error updating vocabulary review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
