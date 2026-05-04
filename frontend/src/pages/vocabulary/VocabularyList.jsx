import { useState, useEffect, useCallback } from 'react'
import { vocabularyService } from '../../services/vocabulary.service'
import { useToast } from '../../hooks/useToast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Modal from '../../components/ui/Modal'
import { MASTERY_LABELS, MASTERY_COLORS } from '../../utils/constants'
import { formatDateTime } from '../../utils/formatters'

export default function VocabularyList() {
  const [words, setWords] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [newWord, setNewWord] = useState({ word: '', context_sentence: '', definition: '' })
  const [saving, setSaving] = useState(false)
  const [reviewing, setReviewing] = useState(null)
  const { success, error: toastError } = useToast()

  const fetchData = useCallback(async () => {
    try {
      const [wordsData, statsData] = await Promise.all([
        vocabularyService.getAll({ limit: 100 }),
        vocabularyService.getStats(),
      ])
      setWords(wordsData?.data || [])
      setStats(statsData)
    } catch {
      toastError('Failed to load vocabulary')
    } finally {
      setLoading(false)
    }
  }, [toastError])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function handleSaveWord(e) {
    e.preventDefault()
    if (!newWord.word.trim() || !newWord.definition.trim()) {
      toastError('Word and definition are required')
      return
    }
    setSaving(true)
    try {
      await vocabularyService.save(newWord.word.trim(), newWord.context_sentence.trim(), newWord.definition.trim())
      success('Word saved!')
      setNewWord({ word: '', context_sentence: '', definition: '' })
      setModalOpen(false)
      fetchData()
    } catch (err) {
      toastError(err.response?.data?.error || 'Failed to save word')
    } finally {
      setSaving(false)
    }
  }

  async function handleReview(id, level) {
    try {
      await vocabularyService.review(id, level)
      success('Mastery updated!')
      fetchData()
    } catch {
      toastError('Failed to update mastery')
    } finally {
      setReviewing(null)
    }
  }

  async function handleDelete(id) {
    try {
      await vocabularyService.remove(id)
      success('Word deleted')
      fetchData()
    } catch {
      toastError('Failed to delete word')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-brand-900">Vocabulary</h1>
          <p className="text-brand-500 mt-1">Your saved words and their mastery levels</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Add Word</Button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-brand-200 shadow-card p-4">
            <p className="text-2xl font-bold text-brand-900">{stats.total_words}</p>
            <p className="text-sm text-brand-500">Total Words</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 shadow-card p-4">
            <p className="text-2xl font-bold text-green-600">{stats.learned_words}</p>
            <p className="text-sm text-brand-500">Learned</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 shadow-card p-4">
            <p className="text-2xl font-bold text-purple-600">{stats.mastered_words}</p>
            <p className="text-sm text-brand-500">Mastered</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 shadow-card p-4">
            <p className="text-2xl font-bold text-brand-900">{stats.average_mastery}</p>
            <p className="text-sm text-brand-500">Avg Mastery</p>
          </div>
        </div>
      )}

      {/* Words List */}
      {words.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
          title="No words saved yet"
          description="Start building your vocabulary by saving words as you read."
          action={
            <Button onClick={() => setModalOpen(true)}>Add Your First Word</Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {words.map((entry) => (
            <div key={entry.id} className="bg-white rounded-xl border border-brand-200 shadow-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-brand-900">{entry.word}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${MASTERY_COLORS[entry.mastery_level] || MASTERY_COLORS[0]}`}>
                      {MASTERY_LABELS[entry.mastery_level] || 'New'}
                    </span>
                  </div>
                  <p className="text-sm text-brand-600 mt-1">{entry.definition}</p>
                  {entry.context_sentence && (
                    <p className="text-xs text-brand-400 mt-1 italic">"{entry.context_sentence}"</p>
                  )}
                  <p className="text-xs text-brand-400 mt-2">{formatDateTime(entry.last_reviewed || entry.created_at)}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setReviewing(entry.id)}
                    className="p-2 text-brand-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                    title="Update mastery"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {reviewing === entry.id && (
                <div className="mt-4 p-3 bg-brand-50 rounded-lg">
                  <p className="text-sm font-medium text-brand-700 mb-2">Update mastery level:</p>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleReview(entry.id, level)}
                        className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                          entry.mastery_level === level
                            ? 'bg-brand-900 text-white border-brand-900'
                            : 'bg-white border-brand-200 text-brand-600 hover:bg-brand-50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Word Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Save New Word" size="md">
        <form onSubmit={handleSaveWord} className="space-y-4">
          <Input
            label="Word"
            value={newWord.word}
            onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
            placeholder="e.g., serendipity"
          />
          <Textarea
            label="Definition"
            value={newWord.definition}
            onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
            placeholder="The occurrence of events by chance in a happy way..."
          />
          <Textarea
            label="Context Sentence (optional)"
            value={newWord.context_sentence}
            onChange={(e) => setNewWord({ ...newWord, context_sentence: e.target.value })}
            placeholder="It was pure serendipity that we met at the bookstore."
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={saving}>Save Word</Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
