import { useState } from 'react'
import { Link } from 'react-router-dom'
import { readerService } from '../../services/reader.service'
import { profileService } from '../../services/profile.service'
import { useToast } from '../../hooks/useToast'
import Button from '../../components/ui/Button'
import FileUpload from '../../components/shared/FileUpload'
import Textarea from '../../components/ui/Textarea'
import Spinner from '../../components/ui/Spinner'
import ProgressBar from '../../components/ui/ProgressBar'
import { CefrBadge } from '../../components/ui/Badge'

export default function ClassifyLevel() {
  const [file, setFile] = useState(null)
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [result, setResult] = useState(null)
  const { success, error: toastError } = useToast()

  function handleFileSelect(selectedFile) {
    setFile(selectedFile)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file && !summary.trim()) {
      toastError('Please upload a PDF or enter text to classify')
      return
    }

    setLoading(true)
    setUploadProgress(0)
    setResult(null)

    try {
      const response = await readerService.classifyLevel(file, summary.trim())
      setResult(response)
      success(`Document classified as ${response.cefrLevel}`)
    } catch (err) {
      toastError(err.response?.data?.error || 'Failed to classify document')
    } finally {
      setLoading(false)
    }
  }

  async function handleSetLevel() {
    if (!result?.cefrLevel) return
    try {
      await profileService.updateLevel(result.cefrLevel)
      success('Your reading level has been updated!')
    } catch (err) {
      toastError(err.response?.data?.error || 'Failed to update level')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-brand-900">Classify CEFR Level</h1>
        <p className="text-brand-500 mt-1">Upload a PDF or paste text to determine its reading level</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FileUpload
          accept=".pdf"
          maxSizeMB={20}
          onFileSelect={handleFileSelect}
          label="Upload PDF (optional)"
          currentFile={file?.name}
        />

        <div className="text-center text-sm text-brand-400">or</div>

        <Textarea
          label="Paste Text Summary (optional)"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Paste a summary or excerpt from the document..."
          className="min-h-[150px]"
        />

        {loading && (
          <div>
            <p className="text-sm text-brand-600 mb-2">Analyzing document...</p>
            <ProgressBar value={uploadProgress} max={100} showLabel />
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full">
          Classify Level
        </Button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-white rounded-xl border border-brand-200 shadow-card">
          <h2 className="text-lg font-semibold font-heading text-brand-900 mb-4">Result</h2>
          <div className="flex items-center gap-4">
            <CefrBadge level={result.cefrLevel} />
            <span className="text-brand-600">
              {result.documentName && `"${result.documentName}" is classified as`}
              {!result.documentName && 'Text is classified as'}
            </span>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={handleSetLevel}>Set as My Level</Button>
            <Button variant="secondary" onClick={() => setResult(null)}>
              Classify Another
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
