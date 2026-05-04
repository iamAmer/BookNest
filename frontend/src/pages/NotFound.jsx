import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold font-heading text-brand-900">404</h1>
        <p className="text-xl text-brand-500 mt-4">Page not found</p>
        <p className="text-brand-400 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8">
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
