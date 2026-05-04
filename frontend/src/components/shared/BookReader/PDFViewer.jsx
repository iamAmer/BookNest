import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import 'pdfjs-dist/web/pdf_viewer.css'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default function PDFViewer({ url, pageNumber, zoom, onTextSelected, onPageRendered }) {
  const canvasRef = useRef(null)
  const textLayerRef = useRef(null)
  const pdfDocRef = useRef(null)
  const renderTaskRef = useRef(null)
  const renderVersionRef = useRef(0)
  const zoomRef = useRef(zoom)
  const onTextSelectedRef = useRef(onTextSelected)
  const onPageRenderedRef = useRef(onPageRendered)
  const [error, setError] = useState(null)
  const [rendering, setRendering] = useState(false)

  useEffect(() => {
    zoomRef.current = zoom
    onTextSelectedRef.current = onTextSelected
    onPageRenderedRef.current = onPageRendered
  }, [zoom, onTextSelected, onPageRendered])

  async function renderPage(pageNum) {
    if (!pdfDocRef.current) return

    const currentVersion = ++renderVersionRef.current
    if (renderTaskRef.current) {
      try { renderTaskRef.current.cancel() } catch { /* previous render cancelled */ }
      renderTaskRef.current = null
    }

    setRendering(true)
    try {
      const page = await pdfDocRef.current.getPage(pageNum + 1)
      const currentZoom = zoomRef.current
      const viewport = page.getViewport({ scale: currentZoom * 1.5 })

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      canvas.width = viewport.width
      canvas.height = viewport.height

      renderTaskRef.current = page.render({ canvasContext: ctx, viewport })
      await renderTaskRef.current.promise
      renderTaskRef.current = null

      if (currentVersion !== renderVersionRef.current) return

      const textContent = await page.getTextContent()

      const textLayerDiv = textLayerRef.current
      if (textLayerDiv) {
        textLayerDiv.innerHTML = ''
        textLayerDiv.style.width = `${viewport.width}px`
        textLayerDiv.style.height = `${viewport.height}px`
        textLayerDiv.style.setProperty('--scale-factor', viewport.scale)

        const textLayer = new pdfjsLib.TextLayer({
          textContentSource: textContent,
          container: textLayerDiv,
          viewport,
        })
        await textLayer.render()
      }

      if (currentVersion !== renderVersionRef.current) return

      if (onPageRenderedRef.current) {
        onPageRenderedRef.current(pageNum)
      }
    } catch (err) {
      if (err?.message?.includes('cancelled')) return
      setError('Failed to render page')
      console.error('PDF render error:', err)
    } finally {
      if (currentVersion === renderVersionRef.current) {
        setRendering(false)
      }
    }
  }

  useEffect(() => {
    async function loadPDF() {
      try {
        setError(null)
        const loadingTask = pdfjsLib.getDocument({
          url,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/cmaps/',
          cMapPacked: true,
        })
        pdfDocRef.current = await loadingTask.promise
        renderPage(pageNumber)
      } catch (err) {
        setError('Failed to load PDF. The file may be inaccessible.')
        console.error('PDF load error:', err)
      }
    }
    loadPDF()

    return () => {
      if (renderTaskRef.current) {
        try { renderTaskRef.current.cancel() } catch { /* cancelled */ }
        renderTaskRef.current = null
      }
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy()
        pdfDocRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  useEffect(() => {
    if (pdfDocRef.current) {
      renderPage(pageNumber)
    }
  }, [pageNumber, zoom])

  useEffect(() => {
    function handleSelection() {
      const selection = window.getSelection()
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        const text = selection.toString().trim()

        const words = text.split(/\s+/)
        if (words.length <= 15) {
          if (onTextSelectedRef.current) {
            onTextSelectedRef.current(text, rect, pageNumber)
          }
        }
      }
    }

    const container = textLayerRef.current?.parentElement
    if (container) {
      container.addEventListener('mouseup', handleSelection)
      return () => container.removeEventListener('mouseup', handleSelection)
    }
  }, [onTextSelected, pageNumber])

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-400">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M12 3l9 18H3l9-18z" />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-auto h-full bg-gray-800 flex items-start justify-center p-4">
      {rendering && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80 z-10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <div className="relative shadow-2xl">
        <canvas ref={canvasRef} className="block" />
        <div
          ref={textLayerRef}
          className="absolute top-0 left-0 overflow-hidden text-layer-overlay"
          style={{ zIndex: 0, textAlign: 'initial', opacity: 1, lineHeight: 1, transformOrigin: '0 0', textSizeAdjust: 'none', forcedColorAdjust: 'none' }}
        />
      </div>
      <style>{`
        .text-layer-overlay span {
          color: transparent;
          position: absolute;
          white-space: pre;
          cursor: text;
          transform-origin: 0% 0%;
        }
      `}</style>
    </div>
  )
}
