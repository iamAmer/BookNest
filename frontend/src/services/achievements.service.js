import api from './api'

export const achievementsService = {
  async getAll() {
    const { data } = await api.get('/api/achievements')
    return data.data
  },

  async getById(id) {
    const { data } = await api.get(`/api/achievements/${id}`)
    return data.data
  },

  async getUserAchievements() {
    const { data } = await api.get('/api/achievements/user/achievements')
    return data
  },

  async check(bookId) {
    const { data } = await api.post(`/api/achievements/check/${bookId}`)
    return data
  },
}
