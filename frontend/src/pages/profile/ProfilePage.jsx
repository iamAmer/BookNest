import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { profileService } from '../../services/profile.service'
import { achievementsService } from '../../services/achievements.service'
import { booksService } from '../../services/books.service'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Select from '../../components/ui/Select'
import Spinner from '../../components/ui/Spinner'
import Avatar from '../../components/ui/Avatar'
import { CefrBadge } from '../../components/ui/Badge'
import ProgressBar from '../../components/ui/ProgressBar'
import { CEFR_LEVELS, CEFR_LABELS } from '../../utils/constants'
import { formatDate } from '../../utils/formatters'

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [library, setLibrary] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ full_name: '', bio: '' })
  const [cefrLevel, setCefrLevel] = useState('')
  const [saving, setSaving] = useState(false)
  const { success, error: toastError } = useToast()

  const fetchData = useCallback(async () => {
    try {
      const [profileData, achievementsData, libraryData] = await Promise.all([
        profileService.get(),
        achievementsService.getUserAchievements(),
        booksService.getTrending(6),
      ])
      setProfile(profileData)
      setForm({ full_name: profileData.full_name || '', bio: profileData.bio || '' })
      setCefrLevel(profileData.cefr_level || '')
      setAchievements(achievementsData?.data || [])
      setLibrary(libraryData || [])
    } catch {
      toastError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }, [toastError])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const updates = {}
      if (form.full_name !== profile.full_name) updates.full_name = form.full_name
      if (form.bio !== profile.bio) updates.bio = form.bio

      if (Object.keys(updates).length > 0) {
        await profileService.update(updates)
      }

      if (cefrLevel !== profile.cefr_level) {
        await profileService.updateLevel(cefrLevel)
      }

      success('Profile updated!')
      setEditing(false)
      fetchData()
    } catch (err) {
      toastError(err.response?.data?.error || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!profile) return null

  const stats = profile.stats || {}

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="text-center mb-10">
        <div className="relative inline-block">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-brand-300 to-brand-500 p-1 shadow-lg mx-auto">
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <Avatar name={profile.full_name} src={profile.avatar_url} size="xl" className="w-full h-full" />
            </div>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="absolute bottom-0 right-0 w-8 h-8 bg-brand-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-brand-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
        </div>
        <h1 className="text-2xl font-bold font-heading text-brand-900 mt-4">{profile.full_name}</h1>
        <div className="flex items-center justify-center gap-4 mt-2 text-sm text-brand-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {profile.email}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Joined {formatDate(profile.created_at)}
          </span>
        </div>
      </div>

      {/* Edit Form (shown when editing) */}
      {editing && (
        <div className="mb-10 bg-white rounded-2xl border border-brand-200 shadow-card p-6">
          <h3 className="font-heading font-semibold text-brand-900 mb-4">Edit Profile</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Full Name"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
            <Select
              label="CEFR Level"
              value={cefrLevel}
              onChange={(e) => setCefrLevel(e.target.value)}
              options={[
                { value: '', label: 'Not set' },
                ...CEFR_LEVELS.map((level) => ({
                  value: level,
                  label: `${level} - ${CEFR_LABELS[level]}`,
                })),
              ]}
            />
            <Textarea
              label="Bio"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell us about yourself..."
            />
            <div className="flex gap-3">
              <Button type="submit" loading={saving}>Save Changes</Button>
              <Button variant="secondary" onClick={() => { setEditing(false); setForm({ full_name: profile.full_name || '', bio: profile.bio || '' }); setCefrLevel(profile.cefr_level || '') }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-200 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-brand-500">Books Read</p>
            <p className="text-3xl font-bold text-brand-900">{stats.booksCompleted || 0}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-200 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-brand-500">2024 Goal</p>
            <p className="text-3xl font-bold text-brand-900">{stats.booksCompleted || 0}/50</p>
          </div>
        </div>
      </div>

      {/* Reading Activity */}
      <div className="bg-white rounded-2xl border border-brand-200 shadow-card p-6 mb-8">
        <h3 className="font-heading font-semibold text-brand-900 mb-4">Reading Activity</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-brand-600">This Week</span>
          <span className="text-sm font-semibold text-brand-900">{stats.totalReadingTimeHours?.toFixed(1) || 0} hours</span>
        </div>
        <ProgressBar value={Math.min((stats.totalReadingTimeHours || 0) / 10 * 100, 100)} max={100} />
      </div>

      {/* My Library */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-brand-900 text-xl">My Library</h3>
          <Link to="/books" className="text-sm text-brand-600 hover:text-brand-900 font-medium transition-colors">
            {library.length} books →
          </Link>
        </div>
        {library.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {library.map((book) => (
              <Link key={book.id} to={`/books/${book.id}`} className="group">
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-card group-hover:shadow-card-hover transition-shadow bg-cream">
                  <img
                    src={book.cover_image_url || 'https://placehold.co/300x400/f5e6d3/8b6f47?text=No+Cover'}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2">
                  <h4 className="font-heading font-semibold text-sm text-brand-900 truncate group-hover:text-brand-700 transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-xs text-brand-500 truncate">{book.author}</p>
                  {book.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-xs font-medium text-brand-600">{book.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-brand-50 rounded-2xl">
            <span className="text-5xl block mb-3">📚</span>
            <p className="text-brand-500 mb-4">Your library is empty. Start reading!</p>
            <Link to="/books">
              <Button variant="secondary" size="sm">Browse Books</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl border border-brand-200 shadow-card p-6">
        <h3 className="font-heading font-semibold text-brand-900 mb-4">Achievements ({achievements.length})</h3>
        {achievements.length === 0 ? (
          <p className="text-sm text-brand-400 italic">No achievements earned yet. Keep reading!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((a) => (
              <div key={a.achievements?.id || a.id} className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-sm font-medium text-amber-900">{a.achievements?.name || 'Achievement'}</p>
                  <p className="text-xs text-amber-600">{a.achievements?.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
