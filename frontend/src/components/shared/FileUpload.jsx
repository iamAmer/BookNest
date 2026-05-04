import { useState, useCallback } from 'react'

export default function FileUpload({ accept, maxSizeMB = 10, onFileSelect, label, currentFile }) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState(null)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const validateFile = useCallback((file) => {
    if (!file) return 'No file selected'
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size must be less than ${maxSizeMB}MB`
    }
    return null
  }, [maxSizeMB])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }
      setError(null)
      onFileSelect(file)
    }
  }, [onFileSelect, validateFile])

  const handleFileInput = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }
      setError(null)
      onFileSelect(file)
    }
  }, [onFileSelect, validateFile])

  return (
    <div>
      {label && <label className="block text-sm font-medium text-brand-700 mb-1.5">{label}</label>}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-brand-500 bg-brand-50'
            : 'border-brand-300 hover:border-brand-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <svg className="mx-auto h-10 w-10 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3" />
        </svg>
        <p className="mt-2 text-sm text-brand-600">
          Drag and drop your file here, or{' '}
          <label className="text-brand-900 font-medium cursor-pointer hover:underline">
            browse
            <input
              type="file"
              accept={accept}
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </p>
        <p className="mt-1 text-xs text-brand-400">Max {maxSizeMB}MB</p>
        {currentFile && (
          <p className="mt-2 text-sm text-green-600">Current: {currentFile}</p>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
