import { useState, useEffect, useRef } from 'react'
import { vocabularyService } from '../../../services/vocabulary.service'
import { readerService } from '../../../services/reader.service'
import { useToast } from '../../../hooks/useToast'

export default function VocabularyPopup({ selectedText, position, page, onClose, onWordSaved }) {
  const [word, setWord] = useState(selectedText?.trim() || '')
  const [definition, setDefinition] = useState('')
  const [example, setExample] = useState('')
  const [context, setContext] = useState('')
  const [saving, setSaving] = useState(false)
  const [defining, setDefining] = useState(false)
  const [open, setOpen] = useState(!!selectedText)
  const popupRef = useRef(null)
  const { success, error: toastError } = useToast()

  useEffect(() => {
    if (selectedText) {
      const trimmed = selectedText.trim()
      const words = trimmed.split(/\s+/)
      setWord(words.length > 1 ? words[0] : words.join(' '))
      setDefinition('')
      setExample('')
      setContext(trimmed)
      setOpen(true)
      setDefining(true)
    }
  }, [selectedText])

  useEffect(() => {
    let cancelled = false
    if (open && word) {
      readerService.defineWord(word)
        .then((result) => {
          if (!cancelled) {
            setDefinition(result.definition || '')
            setExample(result.example || '')
          }
        })
        .catch(() => {
          if (!cancelled) {
            setDefinition('')
          }
        })
        .finally(() => {
          if (!cancelled) setDefining(false)
        })
    }
    return () => { cancelled = true }
  }, [open, word])

  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false)
        onClose()
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  async function handleSave(e) {
    e.preventDefault()
    if (!word.trim()) return
    if (!definition.trim()) {
      toastError('Please add a definition')
      return
    }
    setSaving(true)
    try {
      await vocabularyService.save(word.trim(), context, definition.trim())
      success(`"${word.trim()}" saved to vocabulary!`)
      if (onWordSaved) {
        onWordSaved({ word: word.trim(), definition: definition.trim(), context })
      }
      setOpen(false)
      onClose()
    } catch (err) {
      toastError(err.response?.data?.error || 'Failed to save word')
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null

  const style = {
    left: Math.min(position?.right || 200, window.innerWidth - 320),
    top: Math.min((position?.bottom || 100) + 10, window.innerHeight - 300),
  }

  return (
    <div
      ref={popupRef}
      className="absolute z-50 bg-white rounded-xl shadow-2xl border border-brand-200 w-72 p-4 animate-slide-down"
      style={style}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold font-heading text-brand-900">Save Word</h4>
        <button onClick={() => { setOpen(false); onClose() }} className="text-brand-400 hover:text-brand-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-brand-600 mb-1">Word</label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="input-field text-sm py-1.5 px-3"
            placeholder="word"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-600 mb-1">
            Definition *
            {defining && (
              <span className="ml-2 inline-flex items-center gap-1 text-brand-400">
                <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Fetching...
              </span>
            )}
          </label>
          <textarea
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            className="input-field text-sm py-1.5 px-3 min-h-[60px] resize-none"
            placeholder={defining ? 'Loading definition...' : 'Meaning of the word...'}
            disabled={defining}
          />
        </div>
        {example && (
          <div>
            <label className="block text-xs font-medium text-brand-600 mb-1">Example</label>
            <p className="text-xs text-brand-500 italic">{example}</p>
          </div>
        )}
        <div>
          <label className="block text-xs font-medium text-brand-600 mb-1">Context</label>
          <p className="text-xs text-brand-400 italic truncate max-w-full">{context}</p>
          {page >= 0 && <p className="text-xs text-brand-300 mt-0.5">Page {page + 1}</p>}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving || !definition.trim()}
            className="flex-1 btn-primary text-xs py-1.5"
          >
            {saving ? 'Saving...' : 'Save Word'}
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onClose() }}
            className="btn-ghost text-xs py-1.5 px-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
