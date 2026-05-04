import axios from 'axios'
import api from './api'

const uploadApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
})

uploadApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }
  return config
})

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

  async uploadBookContent(bookId, file) {
    const formData = new FormData()
    formData.append('content', file)
    const { data } = await uploadApi.post(`/api/books/${bookId}/upload-content`, formData)
    return data
  },

  async uploadBookCover(bookId, file) {
    const formData = new FormData()
    formData.append('cover', file)
    const { data } = await uploadApi.post(`/api/books/${bookId}/upload-cover`, formData)
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
  }
}
