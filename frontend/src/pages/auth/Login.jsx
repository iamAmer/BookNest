import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { validateEmail } from '../../utils/validators'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { error: toastError } = useToast()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    const emailError = validateEmail(email)
    if (emailError) newErrors.email = emailError
    if (!password) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setErrors({})

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.error || 'Invalid email or password'
      toastError(message)
      setErrors({ form: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold font-heading text-brand-900">Welcome back</h1>
        <p className="text-sm text-brand-500 mt-1">Sign in to your BookNest account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.form && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {errors.form}
          </div>
        )}

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
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-end">
          <Link to="/forgot-password" className="text-sm text-brand-600 hover:text-brand-900">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-brand-500 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-900 font-medium hover:underline">
          Create one
        </Link>
      </p>
    </>
  )
}
