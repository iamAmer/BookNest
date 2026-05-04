import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { booksService } from '../../services/books.service'
import BookCard from '../../components/shared/BookCard'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'

const levels = [
  {
    level: 'A1',
    label: 'Beginner',
    description: 'Simple words and basic phrases',
    color: 'from-green-400 to-emerald-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    lightBg: 'bg-green-100',
  },
  {
    level: 'A2',
    label: 'Elementary',
    description: 'Simple sentences about familiar topics',
    color: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-800',
    lightBg: 'bg-sky-100',
  },
  {
    level: 'B1',
    label: 'Intermediate',
    description: 'Understand main points of clear standard text',
    color: 'from-amber-400 to-yellow-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    lightBg: 'bg-amber-100',
  },
  {
    level: 'B2',
    label: 'Upper Intermediate',
    description: 'Understand complex text on concrete and abstract topics',
    color: 'from-orange-400 to-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    lightBg: 'bg-orange-100',
  },
  {
    level: 'C1',
    label: 'Advanced',
    description: 'Understand demanding, longer texts with implicit meaning',
    color: 'from-red-400 to-rose-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    lightBg: 'bg-red-100',
  },
  {
    level: 'C2',
    label: 'Proficiency',
    description: 'Understand virtually everything heard or read',
    color: 'from-purple-400 to-violet-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    lightBg: 'bg-purple-100',
  },
]

export default function LearnLanguagePage() {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedLevel) {
      setLoading(true)
      async function fetchBooks() {
        try {
          const result = await booksService.getAll({ difficulty: selectedLevel, limit: 12 })
          setBooks(result.data || [])
        } catch {
          setBooks([])
        } finally {
          setLoading(false)
        }
      }
      fetchBooks()
    }
  }, [selectedLevel])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 rounded-full mb-4">
          <span className="text-lg">🎯</span>
          <span className="text-sm font-medium text-brand-700">Improve Your English</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-brand-900">
          Choose Your Level
        </h1>
        <p className="text-brand-500 mt-3 max-w-xl mx-auto">
          Select your CEFR level to discover books perfectly matched to your reading ability. Start where you're comfortable and level up as you grow!
        </p>
      </div>

      {/* Level Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {levels.map((item) => (
          <button
            key={item.level}
            onClick={() => setSelectedLevel(selectedLevel === item.level ? null : item.level)}
            className={`relative p-5 rounded-2xl border-2 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              selectedLevel === item.level
                ? `bg-gradient-to-br ${item.color} text-white border-transparent shadow-lg scale-[1.02]`
                : `${item.bg} ${item.border} ${item.text} hover:border-opacity-100`
            }`}
          >
            <div className={`text-2xl font-bold font-heading mb-1 ${selectedLevel === item.level ? 'text-white' : ''}`}>
              {item.level}
            </div>
            <div className={`text-xs font-medium ${selectedLevel === item.level ? 'text-white/90' : 'opacity-75'}`}>
              {item.label}
            </div>
            {selectedLevel === item.level && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Level Info Banner */}
      {selectedLevel && (
        <div className={`mb-10 p-6 rounded-2xl ${levels.find(l => l.level === selectedLevel)?.bg || 'bg-brand-50'} border ${levels.find(l => l.level === selectedLevel)?.border || 'border-brand-200'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${levels.find(l => l.level === selectedLevel)?.color} text-white text-xl font-bold`}>
              {selectedLevel}
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-brand-900 text-lg">
                {levels.find(l => l.level === selectedLevel)?.label}
              </h3>
              <p className="text-sm text-brand-600 mt-1">
                {levels.find(l => l.level === selectedLevel)?.description}
              </p>
            </div>
            <Link to="/classify-level">
              <Button variant="secondary" size="sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Test Your Level
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Books for selected level */}
      {selectedLevel && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold font-heading text-brand-900">
              Books for {selectedLevel} Level
            </h2>
            <Link to={`/books?difficulty=${selectedLevel}`}>
              <Button variant="ghost" size="sm">
                View All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16 bg-brand-50 rounded-2xl">
              <span className="text-5xl block mb-4">📭</span>
              <h3 className="text-xl font-bold text-brand-900 mb-2">No books at this level yet</h3>
              <p className="text-brand-500 mb-6">We're working on adding more books. Try another level!</p>
              <Link to="/books">
                <Button variant="secondary">Browse All Books</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Show prompt if no level selected */}
      {!selectedLevel && (
        <div className="text-center py-12 bg-brand-50 rounded-2xl">
          <span className="text-5xl block mb-4">👆</span>
          <h3 className="text-xl font-bold text-brand-900 mb-2">Select a Level Above</h3>
          <p className="text-brand-500 mb-6">Choose your CEFR level to discover books tailored to your reading ability</p>
          <Link to="/classify-level">
            <Button>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Not sure? Classify Your Level
            </Button>
          </Link>
        </div>
      )}

      {/* Bottom Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-gradient-to-br from-brand-100 to-brand-200 rounded-2xl">
          <h3 className="text-xl font-bold font-heading text-brand-900 mb-3">📊 Track Your Progress</h3>
          <p className="text-sm text-brand-600 leading-relaxed mb-4">
            See how many books you've read at each level and track your improvement over time.
          </p>
          <Link to="/profile">
            <Button variant="secondary" size="sm">View Profile</Button>
          </Link>
        </div>
        <div className="p-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl">
          <h3 className="text-xl font-bold font-heading text-brand-900 mb-3">🧠 Take a Quiz</h3>
          <p className="text-sm text-brand-600 leading-relaxed mb-4">
            Test your comprehension with AI-powered quizzes after reading each book.
          </p>
          <Link to="/books">
            <Button variant="secondary" size="sm">Find a Book</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
