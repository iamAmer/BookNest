import { CEFR_COLORS, CEFR_LABELS } from '../../utils/constants'

export function CefrBadge({ level }) {
  if (!level) return null
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${CEFR_COLORS[level] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {level}
      {CEFR_LABELS[level] && <span className="ml-1 opacity-75">({CEFR_LABELS[level]})</span>}
    </span>
  )
}

export function StatusBadge({ status }) {
  const styles = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-600',
    pending: 'bg-amber-100 text-amber-800',
    completed: 'bg-blue-100 text-blue-800',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  )
}
