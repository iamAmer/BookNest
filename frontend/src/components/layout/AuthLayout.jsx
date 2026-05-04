import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v1.5H8V13zm0 3h8v1.5H8V16zm0-6h3v1.5H8V10z" />
                </svg>
              </div>
              <span className="font-heading font-bold text-2xl text-brand-900">BookNest</span>
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-card border border-brand-200 p-8">
            <Outlet />
          </div>
        </div>
      </div>
      <footer className="text-center py-6 text-sm text-brand-400">
        <Link to="/" className="hover:text-brand-600 transition-colors">Back to home</Link>
      </footer>
    </div>
  )
}
