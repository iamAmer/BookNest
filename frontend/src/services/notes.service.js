import api from './api'

export const notesService = {
  async getByBook(bookId, params = {}) {
    const { data } = await api.get(`/api/notes/${bookId}`, { params })
    return data
  },

  async create(book_id, page_number, content) {
    const { data } = await api.post('/api/notes', { book_id, page_number, content })
    return data.data
  },

  async update(id, content) {
    const { data } = await api.put(`/api/notes/${id}`, { content })
    return data.data
  },

  async remove(id) {
    const { data } = await api.delete(`/api/notes/${id}`)
    return data
  },
}
