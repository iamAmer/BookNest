export default function Input({
  label,
  error,
  type = 'text',
  icon,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-brand-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
