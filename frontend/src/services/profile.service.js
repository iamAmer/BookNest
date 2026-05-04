import api from './api'

export const profileService = {
  async get() {
    const { data } = await api.get('/api/profile')
    return data.data
  },

  async update(fields) {
    const { data } = await api.patch('/api/profile', fields)
    return data.data
  },

  async updateLevel(cefr_level) {
    const { data } = await api.patch('/api/profile/level', { cefr_level })
    return data.data
  },
}
