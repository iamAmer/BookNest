import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return {
    toasts: context.toasts,
    success: context.success,
    error: context.error,
    info: context.info,
    warning: context.warning,
    removeToast: context.removeToast,
  }
}
