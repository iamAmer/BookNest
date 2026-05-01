# 📖 BookNest Frontend

The frontend for BookNest is a responsive React application built with Vite that provides an intuitive interface for users to browse books, take adaptive quizzes, track their progress, and manage book content through an admin panel.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

The application runs on `http://localhost:5173` and proxies `/api` requests to the backend at `http://localhost:5000`.

### Production Build
```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Vite Proxy
The dev server automatically proxies API requests. Configured in `vite.config.js`:
```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

### Axios Base URL
Set globally in `src/main.jsx`:
```js
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

### Environment Variables
Optional `.env` file:
```
VITE_API_URL=http://localhost:5000
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── Components/
│   │   ├── AdminPanel/          # Admin book management + file uploads
│   │   │   └── AdminPanel.jsx   # CRUD UI with cover/content upload
│   │   ├── Context/
│   │   │   └── UserContext.jsx  # Global auth state (userToken, userData)
│   │   ├── Layout/
│   │   │   ├── GuestLayout.jsx  # Unauthenticated pages layout
│   │   │   └── MainLayout.jsx   # Authenticated pages layout
│   │   ├── Login/               # Login form
│   │   ├── Register/            # Registration form
│   │   ├── Home/                # Landing page with animations
│   │   ├── LearnLanguage/       # Book listing with covers + quiz
│   │   ├── ProfileUser/         # User profile management
│   │   ├── MainNavbar/          # Navigation (admin link for admins)
│   │   ├── Category/            # Category browsing
│   │   ├── CategoryType/        # Category detail page
│   │   ├── SharSections/        # Spotlight, trending, stats sections
│   │   └── ...
│   ├── App.jsx                  # Hash-based routing
│   ├── App.css                  # Global styles
│   ├── index.css                # Tailwind CSS
│   └── main.jsx                 # Entry point + Axios config
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🧩 Key Features

### Authentication
- Registration and login via Supabase Auth
- JWT token stored in `localStorage` as `userToken`
- `UserContext` provides `userToken`, `userData`, `isLoading`
- Protected routes redirect unauthenticated users

### Admin Panel (`/home/admin`)
- Visible only to users with `isAdmin: true`
- Create books with title, author, category, difficulty, description, total pages
- Upload cover images (JPG, PNG, WebP, GIF) via file input
- Upload book content (PDF, EPUB, max 10MB) via file input
- Edit existing books with file replacement
- Delete books and individual files
- Book list with cover previews and metadata

### Book Discovery
- Browse book catalog from backend API
- Filter by category and difficulty level (A1-C2)
- Dynamic cover images from Supabase Storage
- Fallback placeholder icon when cover missing
- Trending books and category sections

### Language Learning
- Adaptive quiz system based on CEFR levels
- Quiz interface with progress tracking
- Score calculation and results display
- Achievement badges on quiz completion

### User Profile
- Personal information management
- Reading statistics and history
- Avatar customization (stored in localStorage)

## 🔌 API Integration

All API calls use Axios with the token from `UserContext`:

```js
const response = await axios.get('/api/books', {
  headers: { Authorization: `Bearer ${userToken}` }
})
```

Key integrated services:
- Authentication (`/api/auth/*`)
- Book catalog (`/api/books/*`)
- File uploads (`/api/books/:id/upload-cover`, `/api/books/:id/upload-content`)
- Admin endpoints (`/api/admin/*`)
- Quiz system (`/api/reader/*`)
- User profiles (`/api/profile/*`)

## 💡 Development Guidelines

### Component Structure
- Functional components with React hooks
- Lazy-loaded route components in `App.jsx`
- Context for global auth state (`UserContext`)

### Styling
- TailwindCSS for utility-first styling
- Custom color palette: `#8B6F47`, `#6B5744`, `#D4A574`, `#F5E6D3`
- AOS (Animate On Scroll) library for page animations

### State Management
- `UserContext` for auth state (token, user data)
- `useState` for component-local state
- No Redux or Zustand

### File Uploads
File uploads use `FormData` with `multipart/form-data`:
```js
const formData = new FormData()
formData.append('cover', file)
await axios.post(`/api/books/${id}/upload-cover`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
```

## 🚨 Troubleshooting

**Blank page / routing issues:**
The app uses hash-based routing (`createHashRouter`). Access via `#/home` not `/home`.

**API calls fail:**
- Ensure backend is running on port 5000
- Check Vite proxy is configured in `vite.config.js`
- Verify axios baseURL in `main.jsx`

**Admin panel not visible:**
Your user needs `isAdmin: true` in the `profiles` table.

**Cover images not loading:**
Check `cover_image_url` is set on the book record. Upload via Admin Panel.

**Port already in use:**
```bash
lsof -ti:5173 | xargs kill -9
```

## 📄 License

Part of the BookNest platform - MIT License.
