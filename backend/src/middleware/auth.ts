import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

/**
 * Middleware to verify Supabase JWT
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header required' });
    return;
  }
  
  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    res.status(401).json({ error: 'Token required' });
    return;
  }
  
  try {
    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    
    // Attach user to request for use in controllers
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token verification failed' });
  }
};
