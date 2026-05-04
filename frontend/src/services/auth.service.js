import api from './api'

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/api/auth/login', { email, password })
    return data.data
  },

  async register(full_name, email, password) {
    const { data } = await api.post('/api/auth/register', { full_name, email, password })
    return data.data
  },

  async logout() {
    try {
      await api.post('/api/auth/logout')
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },

  async checkAuth() {
    const { data } = await api.get('/api/auth/status')
    return data
  },

  async forgotPassword(email) {
    const { data } = await api.post('/api/auth/password-reset', { email })
    return data
  },

  async resetPassword(newPassword) {
    const { data } = await api.post('/api/auth/reset-password', { newPassword })
    return data
  },
}
