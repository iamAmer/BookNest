import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { booksService } from '../../services/books.service'
import { readerService } from '../../services/reader.service'
import { useToast } from '../../hooks/useToast'
import QuizComponent from '../../components/shared/QuizComponent'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Button from '../../components/ui/Button'

export default function QuizPage() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { error: toastError } = useToast()

  useEffect(() => {
    async function fetchData() {
      try {
        const bookData = await booksService.getById(id)
        setBook(bookData)

        const quizData = await readerService.getQuiz(id, { numQuestions: 5 })
        setQuestions(quizData.questions || [])
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load quiz')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  async function handleSubmit(totalQuestions, answers, score) {
    try {
      await readerService.submitQuiz(id, answers, score, totalQuestions)
      window.location.href = `/books/${id}/quiz/results?score=${score}&total=${totalQuestions}`
    } catch (err) {
      toastError(err.response?.data?.error || 'Failed to submit quiz')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="Unable to load quiz"
          description={error}
          action={
            <Link to={`/books/${id}`}>
              <Button>Back to Book</Button>
            </Link>
          }
        />
      </div>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          icon={
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
          title="No questions generated"
          description="The AI couldn't generate questions for this book. Try a different book."
          action={
            <Link to={`/books/${id}`}>
              <Button>Back to Book</Button>
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to={`/books/${id}`} className="text-sm text-brand-600 hover:text-brand-900 inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {book.title}
        </Link>
      </div>
      <QuizComponent questions={questions} onSubmit={handleSubmit} bookTitle={book.title} />
    </div>
  )
}
