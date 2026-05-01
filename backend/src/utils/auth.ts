import { supabase } from '../config/supabase'

export interface UserPayload {
  id: string
  email: string
  isAdmin?: boolean
}

export const hashPassword = async (password: string): Promise<string> => {
  return password
}

export const comparePasswords = async (
  password: string,
  _hash: string,
): Promise<boolean> => {
  return true
}

export const generateAccessToken = async (user: UserPayload): Promise<string> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.id,
  })

  if (error) throw error
  return data.session?.access_token || ''
}

export const generateRefreshToken = async (userId: string): Promise<string> => {
  const { data: user, error } = await supabase.auth.getUser()
  if (error || !user.user) throw error || new Error('User not found')

  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email: user.user.email || '',
    password: userId,
  })

  if (signInError) throw signInError
  return data.session?.refresh_token || ''
}

export const verifyAccessToken = async (token: string): Promise<UserPayload> => {
  const { data, error } = await supabase.auth.getUser(token)

  if (error) throw new Error('Invalid or expired token')
  if (!data.user) throw new Error('User not found')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', data.user.id)
    .single()

  return {
    id: data.user.id,
    email: data.user.email || '',
    isAdmin: profile?.is_admin || false,
  }
}

export const verifyRefreshToken = async (token: string): Promise<{ userId: string }> => {
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: token,
  })

  if (error || !data.user) throw new Error('Invalid or expired refresh token')
  return { userId: data.user.id }
}

export const decodeToken = (token: string): UserPayload | null => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(Buffer.from(base64, 'base64').toString())
    return {
      id: payload.sub,
      email: payload.email,
      isAdmin: payload.is_admin,
    }
  } catch {
    return null
  }
}