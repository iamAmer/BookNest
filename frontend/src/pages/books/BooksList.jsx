import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useBooks } from '../../hooks/useBooks'
import BookGrid from '../../components/shared/BookGrid'
import SearchBar from '../../components/shared/SearchBar'
import FilterPanel from '../../components/shared/FilterPanel'
import Pagination from '../../components/ui/Pagination'

export default function BooksList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')

  const { books, loading, error, categories, pagination, params, updateParams, setPage } = useBooks({
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    difficulty: searchParams.get('difficulty') || undefined,
    limit: parseInt(searchParams.get('limit') || '20'),
    offset: parseInt(searchParams.get('offset') || '0'),
  })

  useEffect(() => {
    const newParams = {}
    if (params.search) newParams.search = params.search
    if (params.category) newParams.category = params.category
    if (params.difficulty) newParams.difficulty = params.difficulty
    if (params.limit && params.limit !== 20) newParams.limit = params.limit
    if (params.offset && params.offset !== 0) newParams.offset = params.offset
    setSearchParams(newParams)
  }, [params, setSearchParams])

  const currentPage = Math.floor((pagination.offset || 0) / (pagination.limit || 20)) + 1
  const totalPages = Math.ceil((pagination.total || 0) / (pagination.limit || 20))

  function handleSearch(value) {
    setSearchInput(value)
    updateParams({ search: value || undefined })
  }

  function handlePageChange(page) {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-brand-900">
          📚 Browse Books
        </h1>
        <p className="text-brand-500 mt-2">Discover and explore books at your level</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search by title, author, or description..."
          className="flex-1"
        />
        <FilterPanel
          categories={categories}
          selectedCategory={params.category}
          selectedDifficulty={params.difficulty}
          onCategoryChange={(cat) => updateParams({ category: cat })}
          onDifficultyChange={(diff) => updateParams({ difficulty: diff })}
        />
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-500">
          {pagination.total || 0} books found
        </p>
        {(params.category || params.difficulty || params.search) && (
          <button
            onClick={() => {
              setSearchInput('')
              updateParams({ search: undefined, category: undefined, difficulty: undefined })
            }}
            className="text-sm text-brand-600 hover:text-brand-900 font-medium transition-colors"
          >
            Clear filters ✕
          </button>
        )}
      </div>

      <BookGrid books={books} loading={loading} error={error} />

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}
