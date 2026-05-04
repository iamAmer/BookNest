import { useState, useEffect, useCallback } from 'react'
import { booksService } from '../services/books.service'

export function useBooks(initialParams = {}) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [params, setParams] = useState(initialParams)
  const [pagination, setPagination] = useState({ limit: 20, offset: 0, total: 0 })
  const [categories, setCategories] = useState([])

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await booksService.getAll(params)
      setBooks(result.data || [])
      if (result.pagination) {
        setPagination(result.pagination)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }, [params])

  const fetchCategories = useCallback(async () => {
    try {
      const result = await booksService.getCategories()
      setCategories(result || [])
    } catch {
      // Categories are optional, don't fail
    }
  }, [])

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, offset: 0 }))
  }, [])

  const setPage = useCallback((page) => {
    const limit = params.limit || 20
    setParams((prev) => ({ ...prev, offset: (page - 1) * limit }))
  }, [params.limit])

  return {
    books,
    loading,
    error,
    categories,
    pagination,
    params,
    updateParams,
    setPage,
    refetch: fetchBooks,
  }
}
