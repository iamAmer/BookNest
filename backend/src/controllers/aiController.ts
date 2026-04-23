import { Request, Response } from 'express';
import axios from 'axios';
import { supabase } from '../config/supabase';

/**
 * Proxy request to the Python AI service to get a simplified version of a sentence
 * based on user's CEFR level.
 * @param req - Express request object
 * @param res - Express response object
 */
export const simplifySentence = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sentence, cefr_level } = req.body;
    
    // Validate inputs
    if (!sentence || !cefr_level) {
      res.status(400).json({ error: 'Sentence and CEFR level are required' });
      return;
    }
    
    // Validate CEFR level
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    if (!validLevels.includes(cefr_level)) {
      res.status(400).json({ error: 'Invalid CEFR level' });
      return;
    }
    
    // Proxy to Python AI service
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';
    
    const response = await axios.post(`${pythonServiceUrl}/simplify`, {
      sentence,
      cefr_level
    }, {
      timeout: 10000 // 10 second timeout
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error: any) {
    console.error('Error simplifying sentence:', error.message);
    
    // Handle specific error types
    if (error.code === 'ECONNABORTED') {
      res.status(504).json({ error: 'AI service timeout' });
      return;
    }
    
    if (error.response) {
      // Python service returned an error
      res.status(error.response.status).json({ 
        error: 'AI service error',
        details: error.response.data
      });
      return;
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Proxy request to get AI-generated quiz questions for a book
 * @param req - Express request object
 * @param res - Express response object
 */
export const getQuizQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.bookId;
    const { cefr_level, numQuestions = 5 } = req.query;
    
    // Validate inputs
    if (!bookId) {
      res.status(400).json({ error: 'Book ID is required' });
      return;
    }
    
    // Validate CEFR level if provided
    if (cefr_level) {
      const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      if (!validLevels.includes(cefr_level as string)) {
        res.status(400).json({ error: 'Invalid CEFR level' });
        return;
      }
    }
    
    // Proxy to Python AI service
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';
    
    const response = await axios.get(`${pythonServiceUrl}/quiz/${bookId}`, {
      params: {
        cefr_level,
        numQuestions
      },
      timeout: 15000 // 15 second timeout for quiz generation
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error: any) {
    console.error('Error getting quiz questions:', error.message);
    
    // Handle specific error types
    if (error.code === 'ECONNABORTED') {
      res.status(504).json({ error: 'AI service timeout' });
      return;
    }
    
    if (error.response) {
      // Python service returned an error
      res.status(error.response.status).json({ 
        error: 'AI service error',
        details: error.response.data
      });
      return;
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Submit quiz results and check for achievements
 * @param req - Express request object
 * @param res - Express response object
 */
export const submitQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { bookId, answers, score } = req.body;
    
    // Validate inputs
    if (!bookId || answers === undefined || score === undefined) {
      res.status(400).json({ error: 'Book ID, answers, and score are required' });
      return;
    }
    
    // Save quiz results
    const { data: quizResult, error: quizError } = await supabase
      .from('quiz_results')
      .insert({
        user_id: userId,
        book_id: bookId,
        answers,
        score,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (quizError) throw quizError;
    
    // Check for achievements based on quiz performance
    // This is a simplified version - in a full implementation, we'd check various criteria
    let newAchievements = [];
    
    // Example: Award "First Quiz" achievement if this is user's first quiz
    const { data: existingQuizzes, error: quizCountError } = await supabase
      .from('quiz_results')
      .select('id', { count: 'exact' })
      .eq('user_id', userId);
    
    if (!quizCountError && existingQuizzes.length === 1) {
      // This is the user's first quiz, check if they qualify for an achievement
      const { data: achievement, error: achievementError } = await supabase
        .from('achievements')
        .select('*')
        .eq('name', 'First Quiz')
        .single();
      
      if (!achievementError && achievement) {
        // Check if user already has this achievement
        const { data: userAchievement, error: userAchievementError } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', userId)
          .eq('achievement_id', achievement.id)
          .single();
        
        if (userAchievementError && userAchievementError.code === 'PGRST116') {
          // User doesn't have this achievement yet, award it
          const { data: userAchievementInsert, error: insertError } = await supabase
            .from('user_achievements')
            .insert({
              user_id: userId,
              achievement_id: achievement.id,
              earned_at: new Date().toISOString()
            })
            .select()
            .single();
            
          if (!insertError) {
            newAchievements.push({
              id: achievement.id,
              name: achievement.name,
              description: achievement.description,
              earned_at: new Date().toISOString()
            });
          }
        }
      }
    }
    
    res.json({
      success: true,
      data: {
        quizResult,
        newAchievements
      }
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
