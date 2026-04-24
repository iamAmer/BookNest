# ⚙️ BookNest Backend

The backend for BookNest is a RESTful API built with Node.js, Express, and TypeScript that provides all the core functionality for the adaptive reading platform. It handles user authentication, book management, quiz processing, progress tracking, and more, all backed by a PostgreSQL database.

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose (for PostgreSQL)
- Node.js (v16+)
- npm or yarn

### Quick Start

1. Start the database:
```bash
docker-compose up -d
```

2. Install dependencies:
```bash
npm install
```

3. Build the TypeScript code:
```bash
npm run build
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Environment Setup

Copy the example environment file and configure it:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🔧 Configuration

The backend uses environment variables for configuration. Copy `.env.example` to `.env` and adjust the values:

### Required Variables
- `PORT` - Server port (default: 5000)
- `PYTHON_SERVICE_URL` - URL of the AI service (default: http://localhost:8000)
- `JWT_SECRET` - Secret key for JWT token signing
- Database connection:
  - `DB_HOST` - Database host (default: localhost)
  - `DB_PORT` - Database port (default: 5432)
  - `DB_USER` - Database username (default: postgres)
  - `DB_PASSWORD` - Database password (default: postgres)
  - `DB_NAME` - Database name (default: booknest)

### Optional Variables
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level

## 📁 Project Structure

```
backend/
├── src/                    # TypeScript source code
│   ├── controllers/        # Request handlers
│   │   ├── authController.ts       # Authentication endpoints
│   │   ├── profileController.ts    # User profile management
│   │   ├── bookController.ts       # Book catalog and search
│   │   ├── progressController.ts   # Reading progress tracking
│   │   ├── vocabularyController.ts # Word bank management
│   │   ├── notesController.ts      # User notes and annotations
│   │   ├── aiController.ts         # AI service integration
│   │   └── achievementsController.ts # Achievement system
│   ├── middleware/         # Custom Express middleware
│   │   ├── auth.ts         # JWT verification
│   │   ├── validation.ts   # Input validation (to be implemented)
│   │   └── ...             # Other middleware
│   ├── routes/             # API route definitions
│   │   ├── authRoutes.ts           # Authentication routes
│   │   ├── profileRoutes.ts        # Profile routes
│   │   ├── bookRoutes.ts           # Book routes
│   │   ├── progressRoutes.ts       # Progress routes
│   │   ├── vocabularyRoutes.ts     # Vocabulary routes
│   │   ├── notesRoutes.ts          # Notes routes
│   │   ├── aiRoutes.ts             # AI service routes
│   │   └── achievementsRoutes.ts   # Achievement routes
│   ├── config/             # Configuration files
│   │   └── database.ts     # PostgreSQL connection pool
│   ├── utils/              # Utility functions
│   │   └── auth.ts         # JWT and password helpers
│   ├── server.ts         # Express application setup
│   └── ...                 # Other source files
├── db/                     # Database files
│   ├── schema.sql          # Database schema definition
│   └── seed.sql            # Initial sample data
├── docs/                   # Documentation files
├── build/                  # Compiled JavaScript output
├── node_modules/           # Dependencies
├── package.json            # Project metadata and scripts
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variables template
├── docker-compose.yml      # Docker services definition
└── README.md               # This file
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server (built code)
- `npm test` - Run test suite (to be implemented)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/status` - Check authentication status
- `POST /api/auth/password-reset` - Request password reset

### User Profile
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update user profile
- `GET /api/profile/:id` - Get user profile by ID

### Books & Library
- `GET /api/books` - Get books with filtering and pagination
- `GET /api/books/:id` - Get book by ID
- `GET /api/books/categories` - Get all book categories
- `GET /api/books/trending` - Get trending books

### Progress Tracking
- `GET /api/progress` - Get user's reading progress
- `POST /api/progress` - Update reading progress
- `GET /api/progress/:bookId` - Get progress for specific book

### Quiz System
- `GET /api/reader/quiz/:bookId` - Get quiz questions for a book
- `POST /api/reader/quiz/submit` - Submit quiz answers
- `POST /api/reader/simplify` - Simplify sentence for user's level

### Vocabulary Management
- `GET /api/vocabulary` - Get user's vocabulary words
- `POST /api/vocabulary` - Add new vocabulary word
- `PUT /api/vocabulary/:id` - Update vocabulary word
- `DELETE /api/vocabulary/:id` - Remove vocabulary word

### Notes & Annotations
- `GET /api/notes` - Get user's notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Achievements
- `GET /api/achievements` - Get all available achievements
- `GET /api/user/achievements` - Get user's earned achievements

### Admin Endpoints (Planned)
- `GET /admin/stats` - Platform statistics
- `POST /admin/books` - Add new book
- `PUT /admin/books/:id` - Update book
- `DELETE /admin/books/:id` - Delete book

## 🗄️ Database Schema

The backend uses PostgreSQL with the following core tables:

1. **users** - User accounts and authentication data
2. **books** - Book catalog with metadata
3. **categories** - Book classification categories
4. **user_progress** - Reading progress tracking per user/book
5. **vocabulary** - User's word bank with mastery levels
6. **notes** - User's notes and annotations on books
7. **achievements** - Definition of achievements and badges
8. **user_achievements** - Junction table for user achievement tracking
9. **quiz_results** - Storage of quiz attempts and scores
10. **refresh_tokens** - JWT refresh token management
11. **password_resets** - Password reset request tracking

Refer to `db/schema.sql` for the complete schema definition.

## 🧪 Testing

Currently, the backend has a basic test setup with Jest. To run tests:
```bash
npm test
```

## 📚 API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:5000/api-docs`
- Health Check: `http://localhost:5000/health`

The Swagger UI provides interactive documentation for all available endpoints with the ability to test them directly.

## 🔍 Troubleshooting

### Database Connection Issues
- Ensure Docker is running: `docker ps`
- Check PostgreSQL status: `docker logs booknest-db`
- Verify .env database credentials
- Try manual connection: `psql -h localhost -U postgres -d booknest`

### Backend Startup Issues
- Check if port 5000 is available: `lsof -i :5000`
- Verify TypeScript compilation: `npx tsc --noEmit`
- Check for missing dependencies: `npm install`
- Look at error logs in terminal

### AI Service Integration Issues
- Verify AI service is running on configured port
- Check PYTHON_SERVICE_URL in .env
- Test AI service directly: `curl http://localhost:8000/health`
- Check backend logs for timeout errors

### Authentication Problems
- Verify JWT_SECRET is set in .env
- Check token expiration settings
- Ensure cookies are being set properly (for refresh tokens)
- Clear browser cookies and localStorage if having auth issues

## 📝 Environment Variables Example

```
# Server Configuration
PORT=5000
PYTHON_SERVICE_URL=http://localhost:8000
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=booknest

# Environment
NODE_ENV=development
LOG_LEVEL=info
```

## 🤝 Contributing

1. Ensure your code follows the existing TypeScript and ESLint conventions
2. Write unit tests for new functionality
3. Update API documentation in Swagger comments
4. Keep commits focused and descriptive
5. Update changelog for significant changes

## 📄 License

This project is part of the BookNest platform and is licensed under the MIT License.

## 👥 Authors

- Book Nest Development Team

## 🙏 Acknowledgments

- Express.js and TypeScript communities
- PostgreSQL team for the excellent database
- Docker team for containerization excellence
- All open source contributors whose work makes this possible