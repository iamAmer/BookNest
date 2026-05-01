import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios'

export default function AdminPanel() {
  const { userToken, userData } = useContext(UserContext)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    difficulty: 'A1',
    description: '',
    total_pages: 100,
    cover_file: null,
    content_file: null,
  })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books', {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      setBooks(res.data.data || [])
    } catch {
      setError('Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setError('')
    setMessage('')

    try {
      let bookId = editingBook?.id

      if (!bookId) {
        const res = await axios.post('/api/admin/books', formData, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
        bookId = res.data.data.id
      } else {
        await axios.put(`/api/admin/books/${bookId}`, formData, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
      }

      if (formData.cover_file) {
        const coverFormData = new FormData()
        coverFormData.append('cover', formData.cover_file)
        await axios.post(`/api/books/${bookId}/upload-cover`, coverFormData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data'
          }
        })
      }

      if (formData.content_file) {
        const contentFormData = new FormData()
        contentFormData.append('content', formData.content_file)
        await axios.post(`/api/books/${bookId}/upload-content`, contentFormData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data'
          }
        })
      }

      setMessage(editingBook ? 'Book updated successfully' : 'Book created successfully')
      resetForm()
      fetchBooks()
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setFormData({
      title: book.title || '',
      author: book.author || '',
      category: book.category || '',
      difficulty: book.difficulty || 'A1',
      description: book.description || '',
      total_pages: book.total_pages || 100,
      cover_file: null,
      content_file: null,
    })
    setShowForm(true)
  }

  const handleDelete = async (bookId) => {
    if (!confirm('Delete this book? This cannot be undone.')) return
    try {
      await axios.delete(`/api/admin/books/${bookId}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      setMessage('Book deleted')
      fetchBooks()
    } catch (err) {
      setError('Delete failed')
    }
  }

  const handleDeleteFile = async (bookId, type) => {
    if (!confirm(`Delete the ${type} file?`)) return
    try {
      await axios.delete(`/api/books/${bookId}/delete-file/${type}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      setMessage(`${type} file deleted`)
      fetchBooks()
    } catch (err) {
      setError('Delete failed')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      category: '',
      difficulty: 'A1',
      description: '',
      total_pages: 100,
      cover_file: null,
      content_file: null,
    })
    setEditingBook(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#795420] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#8B6F47]">Manage Books</h1>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="px-4 py-2 bg-[#8B6F47] text-white rounded-lg hover:bg-[#7A5F37] transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Book'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 mb-4 rounded">
          {error}
        </div>
      )}
      {message && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 mb-4 rounded">
          {message}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#6B5744] mb-4">
            {editingBook ? 'Edit Book' : 'Add New Book'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#6B5744] mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F47]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6B5744] mb-1">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F47]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6B5744] mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F47]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6B5744] mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F47]"
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6B5744] mb-1">Total Pages</label>
              <input
                type="number"
                name="total_pages"
                value={formData.total_pages}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F47]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#6B5744] mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6F47]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6B5744] mb-1">Cover Image</label>
              <input
                type="file"
                name="cover_file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {editingBook?.cover_image_url && !formData.cover_file && (
                <p className="text-xs text-gray-500 mt-1">Current cover uploaded</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6B5744] mb-1">Book Content (PDF/EPUB)</label>
              <input
                type="file"
                name="content_file"
                accept=".pdf,.epub"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {editingBook?.content_url && !formData.content_file && (
                <p className="text-xs text-gray-500 mt-1">Current content uploaded</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="mt-4 px-6 py-2 bg-[#8B6F47] text-white rounded-lg hover:bg-[#7A5F37] disabled:opacity-50 transition-colors"
          >
            {uploading ? 'Saving...' : editingBook ? 'Update Book' : 'Create Book'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {books.map(book => (
          <div key={book.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4">
            {book.cover_image_url ? (
              <img
                src={book.cover_image_url}
                alt={book.title}
                className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
              />
            ) : (
              <div className="w-24 h-32 bg-[#F5E6D3] rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-book text-[#8B6F47] text-2xl" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#6B5744] truncate">{book.title}</h3>
              <p className="text-sm text-[#A0907D]">{book.author}</p>
              <div className="flex gap-2 mt-1 text-xs">
                <span className="px-2 py-0.5 bg-[#F5E6D3] text-[#8B6F47] rounded">{book.category}</span>
                <span className="px-2 py-0.5 bg-[#F5E6D3] text-[#8B6F47] rounded">{book.difficulty}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 truncate">{book.description}</p>
              <div className="flex gap-2 mt-2 text-xs text-gray-500">
                {book.cover_image_url && <span>Cover</span>}
                {book.content_url && <span>Content</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-shrink-0">
              <button
                onClick={() => handleEdit(book)}
                className="px-3 py-1 bg-[#E8D4B8] text-[#6B5744] rounded-lg hover:bg-[#D4A574] text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
              >
                Delete
              </button>
              {book.cover_image_url && (
                <button
                  onClick={() => handleDeleteFile(book.id, 'cover')}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-xs"
                >
                  Remove Cover
                </button>
              )}
              {book.content_url && (
                <button
                  onClick={() => handleDeleteFile(book.id, 'content')}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-xs"
                >
                  Remove Content
                </button>
              )}
            </div>
          </div>
        ))}
        {books.length === 0 && (
          <p className="text-center text-gray-500 py-8">No books yet. Add your first book!</p>
        )}
      </div>
    </div>
  )
}
