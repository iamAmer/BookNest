import { useState } from 'react'

export default function ReaderControls({
  currentPage,
  totalPages,
  zoom,
  isFullscreen,
  sidebarOpen,
  progress,
  onPageChange,
  onNext,
  onPrev,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFullscreen,
  onToggleSidebar,
  onGoBack,
}) {
  const [pageInput, setPageInput] = useState('')

  function handlePageSubmit(e) {
    e.preventDefault()
    const num = parseInt(pageInput) - 1
    if (!isNaN(num) && num >= 0 && num < totalPages) {
      onPageChange(num)
    }
    setPageInput('')
  }

  return (
    <div className="bg-brand-900 text-white px-3 py-2 flex items-center gap-2 flex-wrap border-b border-brand-800">
      <button
        onClick={onGoBack}
        className="p-1.5 rounded hover:bg-brand-800 transition-colors"
        title="Back to book"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m2 14h7a2 2 0 002-2V5a2 2 0 00-2-2h-7" />
        </svg>
      </button>

      <div className="h-5 w-px bg-brand-700" />

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          disabled={currentPage === 0}
          className="p-1.5 rounded hover:bg-brand-800 disabled:opacity-30 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <form onSubmit={handlePageSubmit} className="flex items-center gap-1">
          <input
            type="number"
            value={pageInput || (currentPage + 1)}
            onChange={(e) => setPageInput(e.target.value)}
            min="1"
            max={totalPages}
            className="w-12 text-center bg-brand-800 border border-brand-700 rounded px-1 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <span className="text-xs text-brand-400">/ {totalPages}</span>
        </form>

        <button
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          className="p-1.5 rounded hover:bg-brand-800 disabled:opacity-30 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="h-5 w-px bg-brand-700" />

      {/* Zoom */}
      <div className="flex items-center gap-1">
        <button
          onClick={onZoomOut}
          disabled={zoom <= 0.5}
          className="p-1.5 rounded hover:bg-brand-800 disabled:opacity-30 transition-colors"
          title="Zoom out"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="text-xs text-brand-300 w-10 text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={onZoomIn}
          disabled={zoom >= 3}
          className="p-1.5 rounded hover:bg-brand-800 disabled:opacity-30 transition-colors"
          title="Zoom in"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          onClick={onResetZoom}
          className="p-1 rounded hover:bg-brand-800 transition-colors text-xs text-brand-400"
          title="Reset zoom"
        >
          1:1
        </button>
      </div>

      <div className="h-5 w-px bg-brand-700" />

      {/* Progress */}
      <div className="flex-1 min-w-[100px] max-w-[200px]">
        <div className="w-full bg-brand-800 rounded-full h-1.5">
          <div
            className="bg-brand-400 h-1.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="h-5 w-px bg-brand-700" />

      {/* Actions */}
      <button
        onClick={onToggleSidebar}
        className={`p-1.5 rounded transition-colors ${sidebarOpen ? 'bg-brand-700' : 'hover:bg-brand-800'}`}
        title="Toggle sidebar"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </button>

      <button
        onClick={onToggleFullscreen}
        className="p-1.5 rounded hover:bg-brand-800 transition-colors"
        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 16v4m0 0h4m8-12V4m0 0h4m-4 12v4m0 0h4M20 8h-4m0 0V4" />
          </svg>
        )}
      </button>
    </div>
  )
}
