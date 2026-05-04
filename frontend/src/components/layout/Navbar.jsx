import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categories' },
  { to: '/learn-language', label: 'Learn Language' },
  { to: '/about', label: 'About' },
]

const adminLinks = [
  { to: '/admin', label: 'Admin' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const isAdmin = user?.isAdmin
  const isKidsPage = location.pathname.startsWith('/kids')

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  function isActive(path) {
    if (path === '/') return location.pathname === '/' || location.pathname === '/dashboard'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-brand-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-700 to-brand-900 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v1.5H8V13zm0 3h8v1.5H8V16zm0-6h3v1.5H8V10z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-brand-900">BookNest</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-brand-100 text-brand-900 font-semibold'
                    : 'text-brand-600 hover:bg-brand-50 hover:text-brand-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin &&
              adminLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'bg-brand-100 text-brand-900 font-semibold'
                      : 'text-brand-600 hover:bg-brand-50 hover:text-brand-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            {/* Kids Button - special styling */}
            <Link
              to="/kids"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isKidsPage
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md'
                  : 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 hover:from-pink-200 hover:to-purple-200'
              }`}
            >
              <span className="text-base">🧸</span>
              Kids
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-brand-50 transition-colors"
                >
                  <Avatar name={user?.full_name} src={user?.avatar_url} size="sm" />
                  <span className="text-sm font-medium text-brand-700">{user?.full_name?.split(' ')[0]}</span>
                  <svg className={`w-4 h-4 text-brand-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-dropdown border border-brand-100 animate-slide-down z-20">
                      <div className="p-3 border-b border-brand-100">
                        <p className="text-sm font-medium text-brand-900">{user?.full_name}</p>
                        <p className="text-xs text-brand-500 truncate">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          to="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-brand-700 rounded-lg hover:bg-brand-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-brand-700 rounded-lg hover:bg-brand-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-brand-600 hover:bg-brand-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-brand-200 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'bg-brand-100 text-brand-900'
                      : 'text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/kids"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-pink-600 hover:bg-pink-50 transition-colors flex items-center gap-2"
              >
                🧸 Kids
              </Link>
              {isAdmin &&
                adminLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              <div className="border-t border-brand-200 mt-2 pt-2">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-brand-700 rounded-lg hover:bg-brand-50"
                    >
                      <Avatar name={user?.full_name} src={user?.avatar_url} size="sm" />
                      {user?.full_name}
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start text-red-600">
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 px-3">
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      <Button variant="secondary" size="sm" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)}>
                      <Button size="sm" className="w-full">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
