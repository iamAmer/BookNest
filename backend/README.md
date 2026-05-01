# ⚙️ BookNest Backend

The backend for BookNest is a RESTful API built with Node.js, Express, and TypeScript. It handles user authentication, book management, file uploads to Supabase Storage, AI-driven quiz generation (via Gemini API), progress tracking, and admin operations.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- npm
- Supabase project (PostgreSQL + Storage)

### Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your Supabase credentials and Gemini API key
npm run dev
```

The API runs on `http://localhost:5000`

### Environment Setup

Required `.env` variables:

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

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.ts        # Registration, login, logout, password reset
│   │   ├── profileController.ts     # User profile CRUD
│   │   ├── bookController.ts        # Book listing, file uploads (covers/content)
│   │   ├── adminController.ts       # Book CRUD, user management, stats
│   │   └── ...
│   ├── routes/
│   │   ├── authRoutes.ts            # /api/auth/*
│   │   ├── bookRoutes.ts            # /api/books/* + file upload routes
│   │   ├── adminRoutes.ts           # /api/admin/*
│   │   └── ...
│   ├── middleware/
│   │   ├── auth.ts                  # JWT verification + admin check
│   │   └── ...
│   ├── config/
│   │   ├── supabase.ts              # Supabase client (anon + service role)
│   │   └── swagger.ts               # OpenAPI config
│   ├── utils/
│   │   └── auth.ts                  # JWT helpers, password hashing
│   └── server.ts                    # Express app entry
├── db/
│   ├── schema.sql                   # Tables + Supabase Storage RLS policies
│   ├── seed.sql                     # Sample data
│   └── migrations/
│       └── 001_add_admin_to_profiles.sql
└── docs/                            # Documentation
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run test suite

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/status` | Check authentication status |
| POST | `/api/auth/password-reset` | Request password reset |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get current user profile |
| PUT | `/api/profile` | Update user profile |
| GET | `/api/profile/:id` | Get user profile by ID |

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | List books (filter, search, paginate) |
| GET | `/api/books/:id` | Get book by ID |
| GET | `/api/books/categories` | Get all categories |
| GET | `/api/books/trending` | Get trending books |

### File Uploads (Supabase Storage)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/books/:id/upload-cover` | Upload cover image (multipart) |
| POST | `/api/books/:id/upload-content` | Upload book content PDF/EPUB (multipart) |
| DELETE | `/api/books/:id/delete-file/:type` | Delete cover or content file |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Platform statistics |
| POST | `/api/admin/books` | Create book |
| PUT | `/api/admin/books/:id` | Update book |
| DELETE | `/api/admin/books/:id` | Delete book |
| GET | `/api/admin/users` | List all users |
| POST | `/api/admin/users/:userId/admin` | Promote user to admin |
| DELETE | `/api/admin/users/:userId/admin` | Remove admin role |

### AI / Reader
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reader/quiz/:bookId` | Get quiz for a book |
| POST | `/api/reader/quiz/submit` | Submit quiz answers |
| POST | `/api/reader/simplify` | Simplify sentence for level |
| POST | `/api/reader/classify-level` | Classify CEFR level from PDF |
| POST | `/api/reader/generate-quiz` | Generate quiz from PDF/text |

## 📦 Supabase Storage Integration

### Bucket: `books`
- **Public** bucket (readable by anyone)
- **Authenticated** users can upload/delete
- Folder structure:
  - `covers/` - Book cover images (JPG, PNG, WebP, GIF)
  - `content/` - Book content files (PDF, EPUB)

### RLS Policies
Applied via `backend/db/schema.sql`:
- `Public read access` - SELECT on `storage.objects`
- `Authenticated users can upload` - INSERT
- `Authenticated users can update` - UPDATE
- `Authenticated users can delete` - DELETE

### Upload Details
- Max file size: **10MB**
- Multer stores files in memory, streams directly to Supabase Storage
- After upload, the public URL is saved to `books.cover_image_url` or `books.content_url`

## 🗄️ Database Schema

Core tables (see `db/schema.sql` for full definition):

| Table | Purpose |
|-------|---------|
| `auth_users` | Custom auth (email, password_hash, is_admin) |
| `profiles` | User profiles (email, full_name, cefr_level, avatar_url, is_admin) |
| `books` | Book catalog (title, author, category, difficulty, cover_image_url, content_url) |
| `user_progress` | Reading progress per user/book |
| `vocabulary` | User word bank with mastery levels |
| `notes` | Annotations linked to books |
| `achievements` | System-defined badges |
| `user_achievements` | User-to-achievement mapping |
| `quiz_results` | Quiz attempt history |
| `categories` | Book genres |
| `refresh_tokens` | JWT refresh token management |

### Key Fix: Admin Authentication
The `is_admin` column exists in both `auth_users` and `profiles` tables. The middleware queries `profiles.is_admin` for role checks.

To make a user admin:
```sql
UPDATE profiles SET is_admin = true WHERE email = 'your@email.com';
```

## 📚 API Documentation

When the server is running:
- Swagger UI: `http://localhost:5000/api-docs`
- Health Check: `http://localhost:5000/health`

## 🔍 Troubleshooting

### Database Connection Issues
- Verify Supabase credentials in `.env`
- Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

### File Upload Fails
- Ensure `books` bucket exists in Supabase Dashboard → Storage
- Verify RLS policies are applied (run schema.sql)
- Check file type is allowed (jpg, jpeg, png, gif, webp, pdf, epub)
- Max file size is 10MB

### Admin Endpoints Return 403
- Your user must have `is_admin = true` in `profiles` table
- Check your auth token contains admin role

### Server Startup Issues
```bash
# Verify TypeScript compilation
npx tsc --noEmit

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

## 📄 License

MIT License - part of the BookNest platform.
