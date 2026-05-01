# 📚 BookNest - Complete Adaptive Reading Platform

BookNest is a comprehensive language learning platform that helps users improve their English skills through personalized book recommendations, adaptive quizzes, vocabulary building, and progress tracking. The platform uses AI to assess users' CEFR language levels (A1-C2) and provides content tailored to their proficiency.

## 🏗️ System Overview

BookNest consists of three main components:

1. **Frontend** (`/frontend`) - React/Vite application with routing, auth, admin panel, and book browsing
2. **Backend** (`/backend`) - Node.js/Express API with Supabase (PostgreSQL + Storage) handling all core logic
3. **AI Service** (`/ai-service`) - Python/FastAPI service for language processing and quiz generation

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v20+)
- npm
- Supabase project (database + storage)
- Google Gemini API key (for AI service)

### Step 1: Setup and Start the Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```
Backend runs on `http://localhost:5000`

### Step 2: Setup and Start the Frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` and proxies `/api` requests to the backend.

### Step 3: Apply Database Migrations
Run the SQL in `backend/db/schema.sql` and `backend/db/migrations/001_add_admin_to_profiles.sql` in your Supabase SQL Editor.

### Step 4: Setup Supabase Storage
Create a bucket named `books` (public) in Supabase Dashboard → Storage. The RLS policies are in `backend/db/schema.sql`.

## 📖 Component Details

### Frontend (React/Vite)
- **URL**: `http://localhost:5173`
- **Features**: Auth, book browsing, admin panel (file uploads), quiz interface, profile management
- **Key Technologies**: React, Vite, TailwindCSS, React Router, Axios, Formik
- **API Proxy**: Vite dev server proxies `/api` → `http://localhost:5000`

### Backend (Node.js/Express)
- **URL**: `http://localhost:5000`
- **Features**: RESTful API, JWT auth, Supabase (PostgreSQL + Storage), file uploads, admin endpoints
- **Key Technologies**: Node.js, Express, TypeScript, Supabase, Swagger/OpenAPI, Multer
- **API Documentation**: `http://localhost:5000/api-docs`
- **Health Check**: `http://localhost:5000/health`

## 🔗 Book Storage Architecture

Books are stored using Supabase:
- **Metadata**: PostgreSQL `books` table (title, author, category, difficulty, etc.)
- **Covers**: Supabase Storage bucket `books/covers/` (JPG, PNG, WebP, GIF)
- **Content**: Supabase Storage bucket `books/content/` (PDF, EPUB, max 10MB)
- **URLs**: `cover_image_url` and `content_url` columns store public URLs from Storage

### Upload Flow
1. Admin creates book via `POST /api/admin/books` (metadata only)
2. Upload cover: `POST /api/books/:id/upload-cover` (multipart/form-data)
3. Upload content: `POST /api/books/:id/upload-content` (multipart/form-data)
4. Storage returns public URL → DB record updated automatically

## 📚 Features

### Auth & Users
- ✅ Registration and login via Supabase Auth
- ✅ JWT-based session management
- ✅ Admin role with `is_admin` flag in profiles table
- ✅ Profile management with avatar

### Books & Library
- ✅ Book catalog with search, filter by category/difficulty, pagination
- ✅ Dynamic cover images from Supabase Storage
- ✅ PDF/EPUB content upload and storage
- ✅ Trending books, categories

### Admin Panel
- ✅ Full CRUD for books (create, read, update, delete)
- ✅ File upload UI for covers and book content
- ✅ File deletion (individual covers/content)
- ✅ Platform statistics
- ✅ User management (promote/demote admins)
- ✅ Accessible at `/home/admin` for admin users only

### Language Learning
- ✅ Adaptive quiz system based on CEFR levels
- ✅ AI-powered question generation via Gemini
- ✅ Quiz submission and scoring
- ✅ Progress tracking

### Storage & Security
- ✅ Supabase Storage bucket with RLS policies
- ✅ Public read access for book files
- ✅ Authenticated write/delete access
- ✅ File type validation (images + PDF/EPUB)
- ✅ 10MB file size limit

## 🛠️ Configuration

### Backend (`.env`)
```
PORT=5000
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

### Frontend
No `.env` required for development. Vite proxy forwards `/api` to backend automatically.

## 📁 Project Structure

```
BookNest/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers (auth, books, admin, etc.)
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Auth, admin checks
│   │   ├── config/          # Supabase client setup
│   │   ├── utils/           # JWT helpers
│   │   └── server.ts        # Express app entry
│   ├── db/
│   │   ├── schema.sql       # Database schema + Storage RLS policies
│   │   ├── seed.sql         # Sample data
│   │   └── migrations/      # Migration files
│   ├── docs/                # Backend documentation
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AdminPanel/  # Admin book management + file uploads
│   │   │   ├── LearnLanguage/ # Book listing with covers + quiz
│   │   │   ├── Home/        # Landing page
│   │   │   ├── Login/       # Auth forms
│   │   │   ├── ProfileUser/ # User profile
│   │   │   └── ...
│   │   ├── App.jsx          # Routing
│   │   └── main.jsx         # Axios baseURL config
│   └── vite.config.js       # Dev proxy to backend
└── docs/                    # Project-level docs
```

## 🔍 Troubleshooting

**Books not showing covers:** Ensure `cover_image_url` is set (upload via admin panel).

**Upload fails:** Check that the `books` storage bucket exists and is public in Supabase Dashboard.

**Admin panel not visible:** Your user needs `is_admin = true` in the `profiles` table. Run:
```sql
UPDATE profiles SET is_admin = true WHERE email = 'your@email.com';
```

**API proxy issues:** Make sure the backend is running on port 5000 before starting the frontend.

## 📈 Future Enhancements

- PDF/EPUB book reader in the frontend
- Reading streak tracking with calendar view
- Social features (book clubs, sharing)
- Offline synchronization
- Mobile applications (React Native)

---

**Ready to start?**
1. Follow the Quick Start Guide above
2. Register at `http://localhost:5173/register`
3. Make yourself admin via SQL if needed
4. Explore the Admin Panel at `/home/admin`
5. Visit `http://localhost:5000/api-docs` for API docs
