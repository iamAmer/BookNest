import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { notesService } from '../../services/notes.service'
import { booksService } from '../../services/books.service'
import { useToast } from '../../hooks/useToast'
import Button from '../../components/ui/Button'
import Textarea from '../../components/ui/Textarea'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Modal from '../../components/ui/Modal'
import { formatDateTime } from '../../utils/formatters'

export default function NotesPage() {
  const { id } = useParams()
  const [notes, setNotes] = useState([])
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [newContent, setNewContent] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [saving, setSaving] = useState(false)
  const { success, error: toastError } = useToast()

  const fetchData = useCallback(async () => {
    try {
      const [notesData, bookData] = await Promise.all([
        notesService.getByBook(id, { limit: 100 }),
        booksService.getById(id),
      ])
      setNotes(notesData?.data || [])
      setBook(bookData)
    } catch {
      toastError('Failed to load notes')
    } finally {
      setLoading(false)
    }
  }, [id, toastError])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function handleCreate(e) {
    e.preventDefault()
    if (!newContent.trim()) {
      toastError('Note content cannot be empty')
      return
    }
    setSaving(true)
    try {
      await notesService.create(id, pageNumber, newContent.trim())
      success('Note added!')
      setNewContent('')
      setPageNumber(1)
      setModalOpen(false)
      fetchData()
    } catch (err) {
      toastError(err.response?.data?.error || 'Failed to add note')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdate(noteId, content) {
    setSaving(true)
    try {
      await notesService.update(noteId, content)
      success('Note updated!')
      setEditingNote(null)
      fetchData()
    } catch {
      toastError('Failed to update note')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(noteId) {
    try {
      await notesService.remove(noteId)
      success('Note deleted')
      fetchData()
    } catch {
      toastError('Failed to delete note')
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to={`/books/${id}`} className="text-sm text-brand-600 hover:text-brand-900 inline-flex items-center gap-1 mb-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {book?.title}
          </Link>
          <h1 className="text-3xl font-bold font-heading text-brand-900">Notes</h1>
          <p className="text-brand-500 mt-1">{notes.length} notes for this book</p>
        </div>
        <Button onClick={() => { setNewContent(''); setPageNumber(1); setModalOpen(true) }}>
          Add Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
          title="No notes yet"
          description="Add notes as you read to remember key points."
          action={
            <Button onClick={() => { setNewContent(''); setPageNumber(1); setModalOpen(true) }}>Add Your First Note</Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-white rounded-xl border border-brand-200 shadow-card p-5">
              {editingNote === note.id ? (
                <div>
                  <Textarea
                    value={note.content}
                    onChange={(e) => setNotes((prev) => prev.map((n) => n.id === note.id ? { ...n, content: e.target.value } : n))}
                    className="mb-3"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" loading={saving} onClick={() => handleUpdate(note.id, note.content)}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={() => { setEditingNote(null); fetchData() }}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-500">Page {note.page_number}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-brand-400">{formatDateTime(note.created_at)}</span>
                      <button
                        onClick={() => setEditingNote(note.id)}
                        className="p-1 text-brand-400 hover:text-brand-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-brand-700 whitespace-pre-wrap">{note.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Note Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Note" size="md">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Page Number</label>
            <input
              type="number"
              value={pageNumber}
              onChange={(e) => setPageNumber(parseInt(e.target.value) || 0)}
              min="0"
              className="input-field"
            />
          </div>
          <Textarea
            label="Note Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your note here..."
            className="min-h-[120px]"
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={saving}>Add Note</Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
