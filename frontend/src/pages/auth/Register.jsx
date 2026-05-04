import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { validateEmail, validatePassword } from '../../utils/validators'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const { error: toastError } = useToast()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}

    if (!fullName.trim()) newErrors.fullName = 'Full name is required'
    const emailError = validateEmail(email)
    if (emailError) newErrors.email = emailError
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
      await register(fullName.trim(), email, password)
      navigate('/dashboard')
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again.'
      toastError(message)
      setErrors({ form: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold font-heading text-brand-900">Create account</h1>
        <p className="text-sm text-brand-500 mt-1">Start your reading journey with BookNest</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.form && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {errors.form}
          </div>
        )}

        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          placeholder="John Doe"
          autoComplete="name"
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <Input
          label="Password"
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
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        <Button type="submit" loading={loading} className="w-full">
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-brand-500 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-900 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </>
  )
}
