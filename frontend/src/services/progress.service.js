import api from './api'

export const progressService = {
  async update(bookId, current_page, time_spent_seconds) {
    const { data } = await api.post('/api/progress/update', {
      bookId,
      current_page,
      time_spent_seconds,
    })
    return data.data
  },

  async getByBook(bookId) {
    const { data } = await api.get(`/api/progress/${bookId}`)
    return data.data
  },
}
