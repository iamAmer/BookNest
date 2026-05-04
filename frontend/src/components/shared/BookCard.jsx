import { Link } from 'react-router-dom'
import { CefrBadge } from '../ui/Badge'

export default function BookCard({ book }) {
  const coverUrl = book?.cover_image_url || 'https://placehold.co/300x400/f5e6d3/8b6f47?text=No+Cover'

  return (
    <Link
      to={`/books/${book.id}`}
      className="group block bg-white rounded-2xl border border-brand-100 shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-[3/4] overflow-hidden bg-cream">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3.5">
        <h3 className="font-heading font-semibold text-sm text-brand-900 truncate group-hover:text-brand-700 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-brand-500 mt-0.5 truncate">{book.author}</p>
        <div className="flex items-center justify-between mt-2.5">
          <CefrBadge level={book.difficulty} />
          {book.rating && (
            <div className="flex items-center gap-1 text-amber-500">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs font-semibold">{book.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        {book.category && (
          <p className="text-[11px] text-brand-400 mt-2 truncate">{book.category}</p>
        )}
      </div>
    </Link>
  )
}
