import { useState, useCallback } from 'react'
import PDFViewer from './PDFViewer'
import ReaderControls from './ReaderControls'
import VocabularyPopup from './VocabularyPopup'
import ReaderSidebar from './ReaderSidebar'

export default function BookReader({ book, reader }) {
  const [selectedText, setSelectedText] = useState(null)
  const [selectionPos, setSelectionPos] = useState(null)
  const [sessionWords, setSessionWords] = useState([])

  const handleTextSelected = useCallback((text, rect) => {
    setSelectedText(text)
    setSelectionPos({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
    })
  }, [])

  const handleVocabClose = useCallback(() => {
    setSelectedText(null)
    setSelectionPos(null)
    window.getSelection()?.removeAllRanges()
  }, [])

  const progress = reader.totalPages > 0
    ? ((reader.currentPage + 1) / reader.totalPages) * 100
    : 0

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Controls toolbar */}
      <ReaderControls
        currentPage={reader.currentPage}
        totalPages={reader.totalPages}
        zoom={reader.zoom}
        isFullscreen={reader.isFullscreen}
        sidebarOpen={reader.sidebarOpen}
        progress={progress}
        onPageChange={reader.goToPage}
        onNext={reader.nextPage}
        onPrev={reader.prevPage}
        onZoomIn={reader.zoomIn}
        onZoomOut={reader.zoomOut}
        onResetZoom={reader.resetZoom}
        onToggleFullscreen={reader.toggleFullscreen}
        onToggleSidebar={() => reader.setSidebarOpen(!reader.sidebarOpen)}
        onGoBack={() => window.history.back()}
      />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* PDF viewer */}
        <div className="flex-1 relative">
          <PDFViewer
            url={book.content_url}
            pageNumber={reader.currentPage}
            zoom={reader.zoom}
            onTextSelected={handleTextSelected}
            onPageRendered={() => {}}
          />

          {/* Vocabulary popup */}
          {selectedText && (
            <VocabularyPopup
              selectedText={selectedText}
              position={selectionPos}
              page={reader.currentPage}
              onClose={handleVocabClose}
              onWordSaved={(w) => setSessionWords((prev) => [w, ...prev])}
            />
          )}
        </div>

        {/* Sidebar */}
        {reader.sidebarOpen && (
          <ReaderSidebar
            bookId={book.id}
            currentPage={reader.currentPage}
            sessionWords={sessionWords}
          />
        )}
      </div>
    </div>
  )
}
