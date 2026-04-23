# Book Nest Backend

This is the Node.js/Express backend for the Book Nest adaptive reading platform, written in TypeScript.

## Features

- User profile management (CEFR level, statistics)
- Book library browsing and metadata retrieval
- Reading progress tracking
- Note-taking functionality
- Vocabulary saving and review system
- AI-powered sentence simplification and quiz generation (via proxy to Python service)
- Supabase integration for authentication and data storage
- JWT-based authentication middleware
- Written in TypeScript for type safety and improved developer experience

## Project Structure

```
backend/
├── src/
│   ├── config/             # Configuration files
│   │   └── supabase.ts     # Supabase client setup
│   ├── controllers/        # Request handlers
│   │   ├── aiController.ts         # AI service proxy endpoints
│   │   ├── bookController.ts       # Book-related endpoints
│   │   ├── notesController.ts      # Note management endpoints
│   │   ├── progressController.ts   # Reading progress tracking
│   │   ├── profileController.ts    # User profile management
│   │   └── vocabularyController.ts # Vocabulary learning tools
│   ├── middleware/         # Custom middleware
│   │   └── auth.ts         # JWT authentication middleware
│   ├── routes/             # API route definitions
│   │   ├── aiRoutes.ts
│   │   ├── bookRoutes.ts
│   │   ├── notesRoutes.ts
│   │   ├── progressRoutes.ts
│   │   ├── profileRoutes.ts
│   │   └── vocabularyRoutes.ts
│   └── server.ts           # Express application entry point
├── .env                    # Environment variables (not committed)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project
- Python AI service running (for sentence simplification and quiz generation)

### Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (for admin operations)

# Python AI Service Configuration
PYTHON_SERVICE_URL=http://localhost:8000  # Adjust if your Python service runs on a different port/host
AI_SERVICE_TIMEOUT=10000

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key

# Optional Services
REDIS_URL=redis://localhost:6379
SENDGRID_API_KEY=your_sendgrid_key (for email)
```

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your Supabase database schema (see schema.sql in the PRD)
5. Configure your environment variables in `.env`
6. Start the development server:
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

Refer to the PRD.md for detailed API documentation.

### Profile
- `GET /api/profile` - Get user profile and statistics
- `PATCH /api/profile/level` - Update user's CEFR level

### Books
- `GET /api/books` - Get list of books (with optional category/difficulty filters)
- `GET /api/books/:id` - Get specific book metadata

### Progress
- `POST /api/progress/update` - Update reading progress
- `GET /api/progress/:bookId` - Get reading progress for a specific book

### Notes
- `GET /api/notes/:bookId` - Get user notes for a specific book
- `POST /api/notes` - Save a new note
- `PUT /api/notes/:id` - Update an existing note
- `DELETE /api/notes/:id` - Delete a note

### Vocabulary
- `POST /api/vocabulary/save` - Save a word to user's vocabulary
- `GET /api/vocabulary` - Get user's vocabulary list
- `PUT /api/vocabulary/:id/review` - Update vocabulary review status

### AI Services (Proxy to Python Service)
- `POST /api/ai/simplify` - Get AI-generated sentence simplification
- `GET /api/ai/quiz/:bookId` - Get AI-generated quiz questions for a book
- `POST /api/ai/quiz/submit` - Submit quiz results and check for achievements

## TypeScript Compilation

The project uses TypeScript for type safety. To compile:

```bash
# Compile once
npm run build

# Watch for changes during development
npx tsc --watch
```

## Development Tips

### Proxying to Python AI Service

The backend acts as a gateway to the Python AI service for:
- Sentence simplification (`/api/ai/simplify`)
- Quiz generation (`/api/ai/quiz/:bookId`)

Make sure your Python service is running and accessible at the URL specified in `PYTHON_SERVICE_URL`.

### CORS Configuration

The backend is configured to accept requests from your frontend development server (default: `http://localhost:5173`). Adjust the `FRONTEND_URL` environment variable if your frontend runs on a different port or host.

### Error Handling

All API endpoints follow a consistent response format:
- Success: `{ success: true, data: {...} }`
- Error: `{ error: 'Error message' }` with appropriate HTTP status code

## Deployment

For production deployment:
1. Set environment variables appropriately
2. Run `npm run build` to compile TypeScript to JavaScript
3. Start the server: `npm start`
4. Consider using a process manager like PM2
5. Set up a reverse proxy (NGINX, Apache) if needed
6. Monitor logs and performance
7. Set up regular backups of your Supabase database

## Troubleshooting

### Common Issues

1. **Connection refused to Python service**
   - Verify the Python service is running
   - Check `PYTHON_SERVICE_URL` in `.env`
   - Ensure network connectivity between services

2. **Supabase authentication errors**
   - Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
   - Check that the Supabase project is active
   - Ensure JWT secret is properly configured in Supabase

3. **Database connection issues**
   - Verify Supabase credentials
   - Check network connectivity to Supabase
   - Ensure database schema is properly applied

4. **TypeScript compilation errors**
   - Check that all TypeScript files are syntactically correct
   - Verify type definitions are installed
   - Run `tsc` to see compilation errors

5. **CORS errors**
   - Verify `FRONTEND_URL` matches your frontend's origin
   - Check that the cors middleware is properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
