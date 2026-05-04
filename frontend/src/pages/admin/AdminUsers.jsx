import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../../services/admin.service'
import { useToast } from '../../hooks/useToast'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Avatar from '../../components/ui/Avatar'
import { CefrBadge } from '../../components/ui/Badge'
import { formatDate } from '../../utils/formatters'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ limit: 50, offset: 0, total: 0 })
  const { success, error: toastError } = useToast()

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const result = await adminService.getUsers({ limit: pagination.limit, offset: pagination.offset })
      setUsers(result.data || [])
      setPagination((prev) => ({ ...prev, total: result.count || 0 }))
    } catch {
      toastError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [toastError, pagination.limit, pagination.offset])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  async function handleToggleAdmin(userId, currentIsAdmin) {
    try {
      if (currentIsAdmin) {
        await adminService.revokeAdmin(userId)
        success('Admin role revoked')
      } else {
        await adminService.grantAdmin(userId)
        success('Admin role granted')
      }
      fetchUsers()
    } catch (err) {
      toastError(err.response?.data?.error || 'Failed to update admin role')
    }
  }

  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1
  const totalPages = Math.ceil((pagination.total || 1) / pagination.limit)

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-sm text-brand-600 hover:text-brand-900">Admin</Link>
            <span className="text-brand-300">/</span>
            <span className="text-sm text-brand-900 font-medium">Users</span>
          </div>
          <h1 className="text-3xl font-bold font-heading text-brand-900">Manage Users</h1>
          <p className="text-brand-500 mt-1">{pagination.total} users registered</p>
        </div>
      </div>

      {users.length === 0 ? (
        <EmptyState title="No users found" />
      ) : (
        <div className="bg-white rounded-xl border border-brand-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-brand-50 border-b border-brand-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-brand-700">User</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-brand-700">Email</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-brand-700">Level</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-brand-700 hidden md:table-cell">Books</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-brand-700 hidden md:table-cell">Words</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-brand-700 hidden lg:table-cell">Joined</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-brand-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-brand-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.full_name} src={user.avatar_url} size="sm" />
                        <div>
                          <span className="font-medium text-brand-900">{user.full_name}</span>
                          {user.isAdmin && (
                            <span className="ml-2 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">Admin</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-brand-600">{user.email}</td>
                    <td className="px-4 py-3">{user.cefr_level ? <CefrBadge level={user.cefr_level} /> : '-'}</td>
                    <td className="px-4 py-3 text-sm text-brand-500 hidden md:table-cell">{user.books_completed || 0}</td>
                    <td className="px-4 py-3 text-sm text-brand-500 hidden md:table-cell">{user.words_learned || 0}</td>
                    <td className="px-4 py-3 text-sm text-brand-400 hidden lg:table-cell">{formatDate(user.created_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant={user.isAdmin ? 'secondary' : 'primary'}
                        onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                      >
                        {user.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-brand-200">
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => {
                  setPagination((prev) => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }))
                  setTimeout(() => fetchUsers(), 0)
                }}
              >
                Previous
              </Button>
              <span className="text-sm text-brand-500">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setPagination((prev) => ({ ...prev, offset: prev.offset + prev.limit }))
                  setTimeout(() => fetchUsers(), 0)
                }}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
