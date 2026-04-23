import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/auth'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        isAdmin?: boolean
      }
    }
  }
}

/**
 * Middleware to verify JWT token
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header required' })
    return
  }

  const token = authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Token required' })
    return
  }

  try {
    const decoded = verifyAccessToken(token)
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      isAdmin: decoded.isAdmin || false,
    }
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

/**
 * Middleware to check if user is admin
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user?.isAdmin) {
    res.status(403).json({ error: 'Admin access required' })
    return
  }
  next()
}
