import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import { useToast } from '../../hooks/useToast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { validatePassword } from '../../utils/validators'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { success, error: toastError } = useToast()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    const passwordError = validatePassword(password)
    if (passwordError) newErrors.password = passwordError
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setErrors({})

    try {
      await authService.resetPassword(password)
      success('Password updated successfully')
      navigate('/login')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to reset password'
      toastError(message)
      setErrors({ form: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold font-heading text-brand-900">New password</h1>
        <p className="text-sm text-brand-500 mt-1">Enter your new password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.form && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {errors.form}
          </div>
        )}

        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Min 8 chars, uppercase, number, special char"
          autoComplete="new-password"
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          placeholder="Re-enter your new password"
          autoComplete="new-password"
        />

        <Button type="submit" loading={loading} className="w-full">
          Reset Password
        </Button>
      </form>

      <p className="text-center text-sm text-brand-500 mt-6">
        <Link to="/login" className="text-brand-900 font-medium hover:underline">
          Back to Login
        </Link>
      </p>
    </>
  )
}
