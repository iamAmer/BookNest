export default function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-brand-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={`input-field resize-none min-h-[100px] ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
