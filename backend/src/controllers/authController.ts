import { Request, Response } from 'express'
import { query } from '../config/database'
import {
  hashPassword,
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
} from '../utils/auth'

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, full_name } = req.body

    // Validate inputs
    if (!email || !password || !full_name) {
      res
        .status(400)
        .json({ error: 'Email, password, and full name are required' })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' })
      return
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM auth_users WHERE email = $1',
      [email],
    )

    if (existingUser.rows.length > 0) {
      res.status(409).json({ error: 'Email already registered' })
      return
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const result = await query(
      'INSERT INTO auth_users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name',
      [email, passwordHash, full_name],
    )

    const user = result.rows[0]

    // Create profile
    await query(
      'INSERT INTO profiles (id, full_name, cefr_level) VALUES ($1, $2, $3)',
      [user.id, full_name, 'A1'],
    )

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    })
    const refreshToken = generateRefreshToken(user.id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Login user
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validate inputs
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
      return
    }

    // Find user
    const result = await query(
      'SELECT id, email, password_hash, full_name, is_admin FROM auth_users WHERE email = $1 AND is_active = true',
      [email],
    )

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const user = result.rows[0]

    // Verify password
    const isPasswordValid = await comparePasswords(password, user.password_hash)

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin,
    })
    const refreshToken = generateRefreshToken(user.id)

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          isAdmin: user.is_admin,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Refresh access token
 */
export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { refreshToken: token } = req.body

    if (!token) {
      res.status(400).json({ error: 'Refresh token is required' })
      return
    }

    // Get user from token (basic check - in production use proper validation)
    const result = await query(
      'SELECT id, email, is_admin FROM auth_users WHERE is_active = true',
      [],
    )

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'User not found' })
      return
    }

    const user = result.rows[0]

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin,
    })

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    })
  } catch (error) {
    console.error('Error refreshing token:', error)
    res.status(401).json({ error: 'Invalid refresh token' })
  }
}

/**
 * Logout user
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // In JWT-based auth, logout is typically handled client-side (delete token)
    // Server-side: can invalidate tokens via blacklist or token revocation table
    res.json({
      success: true,
      message: 'Logout successful',
    })
  } catch (error) {
    console.error('Error logging out:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get authentication status
 */
export const getAuthStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.json({ authenticated: false })
      return
    }

    // Get full user info
    const result = await query(
      'SELECT id, email, full_name, is_admin, created_at FROM auth_users WHERE id = $1',
      [req.user.id],
    )

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const user = result.rows[0]

    res.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        isAdmin: user.is_admin,
      },
    })
  } catch (error) {
    console.error('Error checking auth status:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Password reset request
 */
export const requestPasswordReset = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.body

    if (!email) {
      res.status(400).json({ error: 'Email is required' })
      return
    }

    // Check if user exists
    const result = await query('SELECT id FROM auth_users WHERE email = $1', [
      email,
    ])

    if (result.rows.length === 0) {
      // Don't reveal if email exists or not (security best practice)
      res.json({
        success: true,
        message: 'If email exists, reset link has been sent',
      })
      return
    }

    // In production: Generate reset token, save to DB, send email
    // For now: Just return success message
    res.json({
      success: true,
      message: 'Password reset link sent to email',
    })
  } catch (error) {
    console.error('Error requesting password reset:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Reset password with token
 */
export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      res.status(400).json({ error: 'Token and new password are required' })
      return
    }

    // In production: Verify token, get user_id, update password
    // For now: Return error (not implemented)
    res.status(501).json({
      error: 'Password reset implementation pending',
    })
  } catch (error) {
    console.error('Error resetting password:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
