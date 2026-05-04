export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const CEFR_LABELS = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Proficiency',
}

export const CEFR_COLORS = {
  A1: 'bg-green-100 text-green-800 border-green-200',
  A2: 'bg-blue-100 text-blue-800 border-blue-200',
  B1: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  B2: 'bg-orange-100 text-orange-800 border-orange-200',
  C1: 'bg-red-100 text-red-800 border-red-200',
  C2: 'bg-purple-100 text-purple-800 border-purple-200',
}

export const MASTERY_LABELS = {
  0: 'New',
  1: 'Learning',
  2: 'Familiar',
  3: 'Learned',
  4: 'Proficient',
  5: 'Mastered',
}

export const MASTERY_COLORS = {
  0: 'bg-gray-100 text-gray-600',
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-yellow-100 text-yellow-700',
  3: 'bg-green-100 text-green-700',
  4: 'bg-emerald-100 text-emerald-700',
  5: 'bg-purple-100 text-purple-700',
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  BOOKS: '/books',
  BOOK_DETAIL: (id) => `/books/${id}`,
  QUIZ: (id) => `/books/${id}/quiz`,
  QUIZ_RESULTS: (id) => `/books/${id}/quiz/results`,
  CLASSIFY_LEVEL: '/classify-level',
  VOCABULARY: '/vocabulary',
  PROFILE: '/profile',
  NOTES: (bookId) => `/books/${bookId}/notes`,
  KIDS: '/kids',
  CATEGORIES: '/categories',
  LEARN_LANGUAGE: '/learn-language',
  ABOUT: '/about',
  ADMIN: '/admin',
  ADMIN_BOOKS: '/admin/books',
  ADMIN_USERS: '/admin/users',
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]
