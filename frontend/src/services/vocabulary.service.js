import api from './api'

export const vocabularyService = {
  async save(word, context_sentence, definition) {
    const { data } = await api.post('/api/vocabulary/save', {
      word,
      context_sentence,
      definition,
    })
    return data.data
  },

  async getAll(params = {}) {
    const { data } = await api.get('/api/vocabulary', { params })
    return data
  },

  async getStats() {
    const { data } = await api.get('/api/vocabulary/stats')
    return data.data
  },

  async review(id, mastery_level) {
    const { data } = await api.put(`/api/vocabulary/${id}/review`, { mastery_level })
    return data.data
  },

  async remove(id) {
    const { data } = await api.delete(`/api/vocabulary/${id}`)
    return data
  },
}
