import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-900 mb-4">
          About BookNest
        </h1>
        <p className="text-lg text-brand-500 max-w-2xl mx-auto leading-relaxed">
          BookNest is your personal reading sanctuary — a platform designed to help you discover,
          read, and organize your favorite books while improving your English skills.
        </p>
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-bold font-heading text-brand-900 mb-4">Our Mission</h2>
          <p className="text-brand-600 leading-relaxed mb-4">
            We believe that reading is the most natural and enjoyable way to learn a language. 
            BookNest makes this journey accessible to everyone by providing carefully curated books 
            organized by difficulty level, combined with AI-powered tools to help you learn as you read.
          </p>
          <p className="text-brand-600 leading-relaxed">
            Whether you're a beginner starting with simple stories or an advanced reader tackling 
            literary classics, BookNest has something for you.
          </p>
        </div>
        <div className="bg-gradient-to-br from-brand-100 to-brand-200 rounded-2xl p-10 text-center">
          <span className="text-7xl block mb-4">📚</span>
          <p className="text-xl font-bold font-heading text-brand-900">Read. Learn. Grow.</p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold font-heading text-brand-900 text-center mb-10">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '📖',
              title: 'Curated Library',
              description: 'Hundreds of books carefully selected and categorized by genre and CEFR difficulty level.',
            },
            {
              icon: '🤖',
              title: 'AI-Powered Quizzes',
              description: 'Test your comprehension with intelligent quizzes generated specifically for each book.',
            },
            {
              icon: '📝',
              title: 'Vocabulary Builder',
              description: 'Save new words as you read and track your progress toward mastering them.',
            },
            {
              icon: '📊',
              title: 'Progress Tracking',
              description: 'Monitor your reading activity, books completed, and overall improvement over time.',
            },
            {
              icon: '🧸',
              title: 'Kids Section',
              description: 'A dedicated, colorful section with age-appropriate stories designed for young readers.',
            },
            {
              icon: '🏆',
              title: 'Achievements',
              description: 'Earn badges and rewards as you reach reading milestones and complete challenges.',
            },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-brand-100 shadow-card hover:shadow-card-hover transition-shadow">
              <span className="text-3xl block mb-3">{feature.icon}</span>
              <h3 className="font-heading font-bold text-brand-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-brand-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-900 rounded-3xl p-10 md:p-14 text-center text-white">
        <h2 className="text-3xl font-bold font-heading mb-4">Ready to Start Reading?</h2>
        <p className="text-brand-300 mb-8 max-w-md mx-auto">
          Join thousands of readers who are improving their English through the joy of reading.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-white text-brand-900 hover:bg-brand-50">
              Create Free Account
            </Button>
          </Link>
          <Link to="/books">
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
