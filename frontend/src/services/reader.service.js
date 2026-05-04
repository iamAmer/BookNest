import api from './api'

export const readerService = {
  async defineWord(word) {
    const { data } = await api.post('/api/reader/define', { word })
    return data.data
  },

  async getQuiz(bookId, params = {}) {
    const { data } = await api.get(`/api/reader/quiz/${bookId}`, { params })
    return data.data
  },

  async submitQuiz(bookId, answers, score, total_questions) {
    const { data } = await api.post('/api/reader/quiz/submit', {
      bookId,
      answers,
      score,
      total_questions,
    })
    return data.data
  },

  async classifyLevel(file, summary) {
    const formData = new FormData()
    if (file) formData.append('pdf', file)
    if (summary) formData.append('summary', summary)
    const { data } = await api.post('/api/reader/classify-level', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  async generateQuiz(formData, onProgress) {
    const { data } = await api.post('/api/reader/generate-quiz', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress,
    })
    return data
  },
}
