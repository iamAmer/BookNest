import { Request, Response, NextFunction } from 'express'
import { SupabaseClient, UserResponse } from '@supabase/supabase-js'
import { supabaseAdmin } from '../config/supabase'

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

const retryGetUser = async (token: string, retries = 2, delay = 500): Promise<UserResponse> => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await supabaseAdmin.auth.getUser(token) as UserResponse
    } catch (err) {
      if (i === retries) throw err
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
    }
  }
  throw new Error('Failed to get user after retries')
}

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header required' })
    return
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Token required' })
    return
  }

  try {
    const result: UserResponse = await retryGetUser(token)
    const { data, error } = result

    if (error || !data.user) {
      res.status(401).json({ error: 'Invalid or expired token' })
      return
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('is_admin')
      .eq('id', data.user.id)
      .single()

    if (profileError) {
      console.error('Profile fetch error:', profileError.message)
    }

    req.user = {
      id: data.user.id,
      email: data.user.email || '',
      isAdmin: profile?.is_admin || false,
    }
    next()
  } catch (err: any) {
    console.error('Auth middleware error:', {
      message: err.message,
      code: err?.cause?.code || 'UNKNOWN',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

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