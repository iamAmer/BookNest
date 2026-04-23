import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET: Secret =
  process.env.JWT_SECRET || 'booknest-super-secret-key-change-in-production'
const JWT_EXPIRATION: string | number = process.env.JWT_EXPIRATION || '24h'
const JWT_REFRESH_EXPIRATION: string | number =
  process.env.JWT_REFRESH_EXPIRATION || '7d'

export interface JWTPayload {
  userId: string
  email: string
  isAdmin?: boolean
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const comparePasswords = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

export const generateAccessToken = (payload: JWTPayload): string => {
  // @ts-ignore - jsonwebtoken types issue with expiresIn
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })
}

export const generateRefreshToken = (userId: string): string => {
  // @ts-ignore - jsonwebtoken types issue with expiresIn
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION })
}

export const verifyAccessToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export const verifyRefreshToken = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch (error) {
    throw new Error('Invalid or expired refresh token')
  }
}

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwt.decode(token) as JWTPayload
  } catch (error) {
    return null
  }
}
