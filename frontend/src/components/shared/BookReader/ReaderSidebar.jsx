import { useState, useEffect } from 'react'
import { notesService } from '../../../services/notes.service'
import { useToast } from '../../../hooks/useToast'
import { formatDateTime } from '../../../utils/formatters'

export default function ReaderSidebar({ bookId, currentPage, sessionWords }) {
  const [activeTab, setActiveTab] = useState('notes')
  const [noteContent, setNoteContent] = useState('')
  const [notes, setNotes] = useState([])
  const [saving, setSaving] = useState(false)
  const { success, error: toastError } = useToast()

  useEffect(() => {
    async function loadNotes() {
      try {
        const data = await notesService.getByBook(bookId, { limit: 50 })
        setNotes(data?.data || [])
      } catch {
        // Ignore
      }
    }
    if (activeTab === 'notes') {
      loadNotes()
    }
  }, [bookId, activeTab])

  async function handleAddNote(e) {
    e.preventDefault()
    if (!noteContent.trim()) return
    setSaving(true)
    try {
      const created = await notesService.create(bookId, currentPage + 1, noteContent.trim())
      setNotes((prev) => [created, ...prev])
      setNoteContent('')
      success('Note added')
    } catch (err) {
      toastError(err.response?.data?.error || 'Failed to add note')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="w-72 bg-white border-l border-brand-200 flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-brand-200">
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'notes'
              ? 'text-brand-900 border-b-2 border-brand-900'
              : 'text-brand-500 hover:text-brand-700'
          }`}
        >
          Notes ({notes.length})
        </button>
        <button
          onClick={() => setActiveTab('words')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'words'
              ? 'text-brand-900 border-b-2 border-brand-900'
              : 'text-brand-500 hover:text-brand-700'
          }`}
        >
          Words ({sessionWords.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
        {activeTab === 'notes' && (
          <>
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder={`Add a note for page ${currentPage + 1}...`}
                className="input-field text-sm py-2 px-3 min-h-[80px] resize-none"
              />
              <button
                type="submit"
                disabled={saving || !noteContent.trim()}
                className="btn-primary w-full text-xs py-1.5"
              >
                {saving ? 'Adding...' : 'Add Note'}
              </button>
            </form>

            {notes.map((note) => (
              <div key={note.id} className="p-3 bg-brand-50 rounded-lg border border-brand-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-brand-500">Page {note.page_number}</span>
                  <span className="text-xs text-brand-400">{formatDateTime(note.created_at)}</span>
                </div>
                <p className="text-sm text-brand-700 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}

            {notes.length === 0 && (
              <p className="text-sm text-brand-400 text-center py-8">No notes yet</p>
            )}
          </>
        )}

        {activeTab === 'words' && (
          <>
            {sessionWords.length === 0 && (
              <p className="text-sm text-brand-400 text-center py-8">
                No words saved in this session. Select text while reading to save new words.
              </p>
            )}
            {sessionWords.map((w, idx) => (
              <div key={idx} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="text-sm font-semibold text-amber-900">{w.word}</h4>
                <p className="text-xs text-amber-700 mt-1">{w.definition}</p>
                <p className="text-xs text-amber-500 mt-1 italic truncate">&ldquo;{w.context}&rdquo;</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
