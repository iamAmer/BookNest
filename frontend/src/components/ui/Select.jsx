export default function Select({ label, error, options, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-brand-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        className={`input-field appearance-none ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
