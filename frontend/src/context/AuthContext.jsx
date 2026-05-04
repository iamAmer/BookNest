import { createContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/auth.service'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const data = await authService.checkAuth()
      setUser(data.user)
    } catch {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const login = async (email, password) => {
    const result = await authService.login(email, password)
    localStorage.setItem('accessToken', result.tokens.accessToken)
    localStorage.setItem('refreshToken', result.tokens.refreshToken)
    setUser(result.user)
    return result
  }

  const register = async (full_name, email, password) => {
    const result = await authService.register(full_name, email, password)
    localStorage.setItem('accessToken', result.tokens.accessToken)
    localStorage.setItem('refreshToken', result.tokens.refreshToken)
    setUser(result.user)
    return result
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}
