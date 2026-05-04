import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import { useToast } from '../../hooks/useToast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { validateEmail } from '../../utils/validators'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { success, error: toastError } = useToast()

  async function handleSubmit(e) {
    e.preventDefault()
    const emailError = validateEmail(email)
    if (emailError) {
      setError(emailError)
      return
    }

    setLoading(true)
    setError('')

    try {
      await authService.forgotPassword(email)
      setSent(true)
      success('Password reset link sent to your email')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send reset link'
      toastError(message)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <>
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold font-heading text-brand-900">Check your email</h1>
          <p className="text-sm text-brand-500 mt-1">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
        </div>
        <Link to="/login" className="block">
          <Button className="w-full">Back to Login</Button>
        </Link>
      </>
    )
  }

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold font-heading text-brand-900">Reset password</h1>
        <p className="text-sm text-brand-500 mt-1">Enter your email to receive a reset link</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Button type="submit" loading={loading} className="w-full">
          Send Reset Link
        </Button>
      </form>

      <p className="text-center text-sm text-brand-500 mt-6">
        Remember your password?{' '}
        <Link to="/login" className="text-brand-900 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </>
  )
}
