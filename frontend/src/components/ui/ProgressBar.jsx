export default function ProgressBar({ value = 0, max = 100, className = '', showLabel = false, color = 'brand' }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const colors = {
    brand: 'bg-brand-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  }
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-brand-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${colors[color] || colors.brand}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-brand-500 mt-1 block">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}
