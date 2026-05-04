import api from './api'

export const adminService = {
  async getStats() {
    const { data } = await api.get('/api/admin/stats')
    return data.data
  },

  async createBook(bookData) {
    const { data } = await api.post('/api/admin/books', bookData)
    return data.data
  },

  async updateBook(id, bookData) {
    const { data } = await api.put(`/api/admin/books/${id}`, bookData)
    return data.data
  },

  async deleteBook(id) {
    const { data } = await api.delete(`/api/admin/books/${id}`)
    return data
  },

  async getUsers(params = {}) {
    const { data } = await api.get('/api/admin/users', { params })
    return data
  },

  async grantAdmin(userId) {
    const { data } = await api.post(`/api/admin/users/${userId}/admin`)
    return data.data
  },

  async revokeAdmin(userId) {
    const { data } = await api.delete(`/api/admin/users/${userId}/admin`)
    return data.data
  },
}
