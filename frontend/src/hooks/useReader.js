import { useState, useEffect, useRef, useCallback } from 'react'
import { progressService } from '../services/progress.service'

export function useReader(bookId, initialPage = 0) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(0)
  const [zoom, setZoom] = useState(1.0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pdfError, setPdfError] = useState(null)

  const startTimeRef = useRef(null)
  const elapsedRef = useRef(0)
  const saveTimerRef = useRef(null)

  useEffect(() => {
    async function loadProgress() {
      try {
        const data = await progressService.getByBook(bookId)
        if (data?.current_page > 0) {
          setCurrentPage(data.current_page)
        }
      } catch {
        // No progress yet, start from page 0
      } finally {
        setLoading(false)
      }
    }
    loadProgress()
  }, [bookId])

  const saveProgress = useCallback(async () => {
    const timeSpent = Math.floor(elapsedRef.current / 1000)
    if (timeSpent === 0) return
    try {
      await progressService.update(bookId, currentPage + 1, timeSpent)
    } catch {
      // Silently fail
    }
  }, [bookId, currentPage])

  // Auto-save every 30 seconds
  useEffect(() => {
    saveTimerRef.current = setInterval(saveProgress, 30000)
    return () => {
      if (saveTimerRef.current) clearInterval(saveTimerRef.current)
    }
  }, [saveProgress])

  // Track elapsed time
  useEffect(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now()
    }
    return () => {
      elapsedRef.current = Date.now() - startTimeRef.current
      saveProgress()
    }
  }, [saveProgress])

  // Save on page change
  useEffect(() => {
    elapsedRef.current = Date.now() - startTimeRef.current
    const timeout = setTimeout(() => saveProgress(), 1000)
    return () => clearTimeout(timeout)
  }, [currentPage, saveProgress])

  // Fullscreen change listener
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const goToPage = useCallback((page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page)
    }
  }, [totalPages])

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1)
    }
  }, [currentPage, totalPages])

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1)
    }
  }, [currentPage])

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.25, 3)), [])
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.25, 0.5)), [])
  const resetZoom = useCallback(() => setZoom(1.0), [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

  return {
    currentPage,
    totalPages,
    setTotalPages,
    zoom,
    isFullscreen,
    sidebarOpen,
    loading,
    pdfError,
    setPdfError,
    setLoading,
    goToPage,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleFullscreen,
    setSidebarOpen,
  }
}
