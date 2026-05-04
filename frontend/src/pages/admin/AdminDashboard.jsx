import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../../services/admin.service'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await adminService.getStats()
        setStats(data)
      } catch {
        // Stats might fail
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  const statCards = [
    { label: 'Total Users', value: stats?.total_users || 0, icon: '👥', to: '/admin/users' },
    { label: 'Total Books', value: stats?.total_books || 0, icon: '📚', to: '/admin/books' },
    { label: 'Categories', value: stats?.total_categories || 0, icon: '📁', to: null },
    { label: 'Quizzes Taken', value: stats?.total_quizzes_taken || 0, icon: '📝', to: null },
    { label: 'Avg Quiz Score', value: `${stats?.average_quiz_score || 0}%`, icon: '🎯', to: null },
    { label: 'Books Completed', value: stats?.total_books_completed || 0, icon: '✅', to: null },
    { label: 'Reading Time', value: `${stats?.total_reading_time_hours?.toFixed(1) || 0}h`, icon: '⏱️', to: null },
    { label: 'Achievements', value: stats?.total_achievements || 0, icon: '🏆', to: null },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-brand-900">Admin Dashboard</h1>
          <p className="text-brand-500 mt-1">Platform overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-brand-200 shadow-card p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-2xl font-bold text-brand-900">{stat.value}</p>
                <p className="text-sm text-brand-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/books" className="block p-6 bg-white rounded-xl border border-brand-200 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-900">Manage Books</h3>
              <p className="text-sm text-brand-500">Add, edit, and remove books</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/users" className="block p-6 bg-white rounded-xl border border-brand-200 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-900">Manage Users</h3>
              <p className="text-sm text-brand-500">View users and manage admin roles</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
