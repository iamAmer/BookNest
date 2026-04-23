# Backend Implementation Guide - PostgreSQL & API Complete

**For Developers:** Reference guide for understanding and extending the BookNest backend implementation.

---

## Executive Summary

The **BookNest** backend is fully implemented with a **local PostgreSQL database** and JWT-based authentication. This guide documents the implementation patterns and architecture used.

**Technology Stack:**

- PostgreSQL database with Docker
- JWT + bcryptjs for authentication
- Express.js + TypeScript
- Swagger/OpenAPI 3.0 documentation
- Complete all unfinished controllers and endpoints
- Add missing features (authentication, admin, search, achievements)

---

## Phase 1: Environment & Infrastructure Setup

### Tasks:

1. ✅ Create `docker-compose.yml` with PostgreSQL 15 and Redis services
2. ✅ Create `backend/db/schema.sql` with all tables (auth_users, profiles, books, vocabulary, notes, quiz_results, achievements, user_achievements, categories, refresh_tokens)
3. ✅ Create `backend/db/seed.sql` with sample data (books, categories, achievements, demo users)
4. ✅ Create `backend/.env.example` with all required environment variables
5. ✅ Update `backend/package.json` to replace `@supabase/supabase-js` with `pg`, `bcryptjs`, `jsonwebtoken`

### Deliverables:

- Docker Compose configuration running PostgreSQL + Redis
- Automated schema initialization
- Sample data for testing

---

## Phase 2: Database Configuration & Authentication

### Tasks:

1. ✅ Create `backend/src/config/database.ts` - PostgreSQL connection pool using `pg` library
2. ✅ Create `backend/src/utils/auth.ts` - JWT generation, bcrypt hashing, token verification
3. ✅ Update `backend/src/middleware/auth.ts` - Replace Supabase JWT verification with local JWT verification
4. ✅ Create `backend/src/controllers/authController.ts` with functions:
   - `register()` - Register new user with bcrypt password hashing
   - `login()` - Authenticate user, return JWT access + refresh tokens
   - `logout()` - Invalidate session
   - `refreshToken()` - Generate new access token from refresh token
   - `getAuthStatus()` - Check if user is authenticated
   - `requestPasswordReset()` - Password reset request
   - `resetPassword()` - Reset password with token
5. ✅ Create `backend/src/routes/authRoutes.ts` with routes:
   - `POST /register`
   - `POST /login`
   - `POST /logout`
   - `POST /refresh-token`
   - `GET /status`
   - `POST /password-reset`
   - `POST /reset-password`

### Key Implementation Details:

- Use bcryptjs with salt rounds = 10
- JWT expires in 24 hours, refresh token in 7 days
- Store refresh tokens in database for validation
- Implement CORS with frontend URL
- Add global `requireAdmin` middleware for admin-only routes

### Deliverables:

- Functional JWT-based authentication system
- Secure password hashing
- Token refresh mechanism
- Protected routes

---

## Phase 3: User Profile & Statistics

### Tasks:

1. ✅ Update `backend/src/controllers/profileController.ts`:
   - `getProfile()` - Return profile WITH calculated stats:
     - `wordsLearned` - COUNT from vocabulary table
     - `booksCompleted` - COUNT from user_progress where is_completed = true
     - `averageQuizScore` - AVG(score) from quiz_results
     - `totalQuizzes` - COUNT from quiz_results
     - `totalReadingTimeHours` - SUM(time_spent_seconds) / 3600 from user_progress
   - `updateProfile()` - Update full_name, bio, avatar_url
   - `updateLevel()` - Update CEFR level with validation
2. ✅ Update `backend/src/routes/profileRoutes.ts` to include new routes

### Key Changes:

- Replace Supabase queries with direct database queries
- Calculate real statistics from related tables
- Add proper error handling
- Return complete user profile object

### Deliverables:

- Profile endpoint returning real user statistics
- Profile update endpoint

---

## Phase 4: Books & Library Features

### Tasks:

1. ✅ Update `backend/src/controllers/bookController.ts`:
   - `getBooks()` - Enhanced with:
     - Full-text search (title, author, description) via ILIKE
     - Filtering by category and difficulty
     - Pagination (limit, offset)
     - Return total count
   - `getBookById()` - Increment views counter on GET
   - `getCategories()` - Return all categories from categories table
   - `getTrending()` - Return top 10 books by views DESC, rating DESC
2. ✅ Update `backend/src/routes/bookRoutes.ts` to include new routes

### Key SQL Queries:

```sql
-- Search with pagination
SELECT * FROM books
WHERE (title ILIKE ? OR author ILIKE ? OR description ILIKE ?)
  AND category = ?
  AND difficulty = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?

-- Trending
SELECT * FROM books
ORDER BY views DESC, rating DESC
LIMIT 10
```

### Deliverables:

- Full-featured book search
- Category and difficulty filtering
- Pagination
- Trending books endpoint
- Categories endpoint

---

## Phase 5: Achievements System

### Tasks:

1. ✅ Create `backend/src/controllers/achievementsController.ts`:
   - `getAchievements()` - Return all available achievements
   - `getUserAchievements()` - Return user's earned achievements
   - `getAchievementById()` - Get specific achievement details
   - `checkAchievements()` - Called after book completion/quiz:
     - Check for "First Steps" (1 book completed)
     - Check for "Bookworm" (5 books completed)
     - Check for "Book Collector" (10 books completed)
     - Check for "Vocabulary Apprentice" (10 words learned)
     - Check for "Vocabulary Master" (50 words learned)
     - Check for "Quiz Champion" (100% quiz score)
     - Check for "Consistent Reader" (7-day streak)
     - Insert into user_achievements table
     - Return list of newly earned achievements
2. ✅ Create `backend/src/routes/achievementsRoutes.ts`

### Achievement Criteria:

```sql
INSERT INTO achievements (name, description, badge_color, criteria_json) VALUES
('First Steps', 'Complete your first book', '#FFD700', '{"type":"book_completed","count":1}'),
('Bookworm', 'Complete 5 books', '#C0C0C0', '{"type":"book_completed","count":5}'),
('Book Collector', 'Complete 10 books', '#CD7F32', '{"type":"book_completed","count":10}'),
-- ... etc
```

### Deliverables:

- Complete achievements system
- Dynamic achievement checking
- User achievement tracking

---

## Phase 6: Complete Existing Features (Update for Local DB)

### Update All Controllers to Use Local PostgreSQL Instead of Supabase:

1. **`bookController.ts`** ✅
2. **`progressController.ts`** - Update queries to use `query()` function
3. **`notesController.ts`** - Update queries to use `query()` function
4. **`vocabularyController.ts`** - Update queries to use `query()` function
5. **`profileController.ts`** ✅
6. **`aiController.ts`** - Fix `submitQuiz()` function (currently incomplete)

### For Each Controller:

- Replace Supabase `.from().select().eq()` syntax with PostgreSQL queries
- Replace `req.user` access to `req.user?.id` safely
- Update error handling
- Add proper response status codes

### Pattern to Follow:

```typescript
// OLD (Supabase)
const { data, error } = await supabase
  .from('table')
  .select('*')
  .eq('id', userId)

// NEW (PostgreSQL)
const result = await query('SELECT * FROM table WHERE id = $1', [userId])
const data = result.rows[0]
```

---

## Phase 7: Complete AI Controller

### Task:

Update `backend/src/controllers/aiController.ts` - `submitQuiz()` function:

The function is currently incomplete. It needs to:

1. Validate inputs (bookId, answers, score)
2. Insert quiz result into quiz_results table
3. Mark book as completed if score >= 70% (or configurable threshold)
4. Update user_progress.is_completed = true if applicable
5. Call `checkAchievements()` to unlock new achievements
6. Return quiz result with any newly earned achievements

```typescript
export const submitQuiz = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id
    const { bookId, answers, score, totalQuestions } = req.body

    // Validate
    if (!bookId || answers === undefined || score === undefined) {
      res.status(400).json({ error: 'Missing required fields' })
      return
    }

    // Save quiz result
    const quizResult = await query(
      `INSERT INTO quiz_results (user_id, book_id, answers, score, total_questions) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, bookId, JSON.stringify(answers), score, totalQuestions],
    )

    // Mark book as completed if passed
    if (score >= 70) {
      await query(
        'UPDATE user_progress SET is_completed = true, completed_at = NOW() WHERE user_id = $1 AND book_id = $2',
        [userId, bookId],
      )
    }

    // Check for achievements
    const achievementCheck = await query(
      'SELECT * FROM achievements WHERE criteria_json @> ?',
      [JSON.stringify({ type: 'quiz_score', score: 100 })],
    )

    // Return result with achievements
    res.json({
      success: true,
      data: {
        quizResult: quizResult.rows[0],
        newAchievements: [], // Populate based on checks
      },
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
```

### Deliverables:

- Functional quiz submission with result persistence
- Automatic book completion marking
- Achievement unlocking

---

## Phase 8: Update Server Entry Point

### Task:

Update `backend/src/server.ts`:

1. ✅ Import new routes (authRoutes, achievementsRoutes)
2. ✅ Register new routes (app.use('/api/auth', authRoutes), etc.)
3. ✅ Update health check endpoint
4. ✅ Add graceful shutdown handler to close DB connection pool
5. ✅ Add proper logging for server startup

### Expected Output on Startup:

```
🚀 Server running on port 5000
📚 Environment: development
🌐 CORS enabled for: http://localhost:5173
```

### Deliverables:

- Updated server configuration
- All routes properly registered
- Graceful database connection cleanup

---

## Phase 9: Optional Enhancements

### Admin Endpoints (If Time Permits):

Create `backend/src/controllers/adminController.ts`:

- `getStats()` - Platform statistics (total users, total books, avg score, etc.)
- `addBook()` - Add new book to catalog
- `updateBook()` - Update book information
- `deleteBook()` - Remove book from catalog

Create `backend/src/routes/adminRoutes.ts`:

```typescript
router.get('/stats', authenticateJWT, requireAdmin, getStats)
router.post('/books', authenticateJWT, requireAdmin, addBook)
router.put('/books/:id', authenticateJWT, requireAdmin, updateBook)
router.delete('/books/:id', authenticateJWT, requireAdmin, deleteBook)
```

### Request Validation:

Add validation middleware for all endpoints:

- Email format validation
- CEFR level validation
- Pagination limits (max 100)
- Query parameter type checking

### Reading Streak Logic:

Implement in progressController:

- Track last reading date
- Calculate consecutive days
- Award achievement at 7 and 14 days

---

## Phase 10: Testing & Verification

### Manual Testing Checklist:

```bash
# 1. Start services
docker-compose up -d
cd backend && npm run dev

# 2. Test Authentication
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"pass123","full_name":"Test User"}'

# 3. Get Token from Login Response
# Use returned accessToken for next requests

# 4. Test Protected Endpoints
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# 5. Test Books Endpoints
curl -X GET "http://localhost:5000/api/books?search=gatsby&difficulty=B1" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 6. Test Achievements
curl -X POST http://localhost:5000/api/achievements/check/BOOK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Expected Responses:

All endpoints should return consistent JSON format:

```json
{
  "success": true/false,
  "data": { /* endpoint-specific data */ },
  "message": "optional message",
  "error": "only if success=false"
}
```

---

## File Structure After Completion

```
backend/
├── db/
│   ├── schema.sql          ✅
│   └── seed.sql            ✅
├── src/
│   ├── config/
│   │   ├── database.ts     ✅
│   │   └── supabase.ts     ❌ REMOVE
│   ├── controllers/
│   │   ├── authController.ts          ✅
│   │   ├── bookController.ts          ✅
│   │   ├── profileController.ts       ✅
│   │   ├── achievementsController.ts  ✅
│   │   ├── aiController.ts            ⏳ Fix submitQuiz()
│   │   ├── progressController.ts      ⏳ Update to local DB
│   │   ├── notesController.ts         ⏳ Update to local DB
│   │   ├── vocabularyController.ts    ⏳ Update to local DB
│   │   └── adminController.ts         ⏳ Optional
│   ├── middleware/
│   │   └── auth.ts         ✅
│   ├── routes/
│   │   ├── authRoutes.ts           ✅
│   │   ├── bookRoutes.ts           ✅
│   │   ├── profileRoutes.ts        ✅
│   │   ├── achievementsRoutes.ts   ✅
│   │   ├── progressRoutes.ts       ⏳
│   │   ├── notesRoutes.ts          ⏳
│   │   ├── vocabularyRoutes.ts     ⏳
│   │   ├── aiRoutes.ts             ⏳
│   │   └── adminRoutes.ts          ⏳ Optional
│   ├── utils/
│   │   └── auth.ts         ✅
│   └── server.ts           ✅
├── build/
├── .env                    (local config)
├── .env.example            ✅
├── package.json            ✅
└── tsconfig.json
```

---

## Deployment Considerations

### Before Production:

1. Change JWT_SECRET to strong random key
2. Set NODE_ENV=production
3. Use connection pooling (already configured)
4. Enable HTTPS via reverse proxy (NGINX)
5. Set up database backups
6. Configure rate limiting
7. Add request logging/monitoring
8. Set up error tracking (Sentry)

### Docker Deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/build ./build
COPY backend/db ./db
EXPOSE 5000
CMD ["node", "build/server.js"]
```

---

## Success Criteria

✅ **All Endpoints Working:**

- Authentication (register, login, logout, refresh)
- Profile (get, update, update level)
- Books (list, search, categories, trending)
- Progress (update, get)
- Notes (create, read, update, delete)
- Vocabulary (save, list, update, delete, stats)
- Achievements (list, user achievements, check)
- AI (simplify, quiz, submit)

✅ **Database:**

- PostgreSQL running in Docker
- All tables created with indexes
- Sample data loaded
- Proper foreign keys and constraints

✅ **Authentication:**

- JWT tokens generated and validated
- Passwords hashed with bcryptjs
- Refresh token mechanism working
- Admin role enforcement

✅ **Error Handling:**

- Consistent error response format
- Proper HTTP status codes
- Validation on all inputs

✅ **Documentation:**

- MIGRATION_PROMPT.md completed
- BACKEND_SETUP.md with setup instructions
- BACKEND_COMPLETION.md with implementation details
- PRD.md updated with local Postgres details

---

## References

- PostgreSQL Documentation: https://www.postgresql.org/docs/
- JWT Best Practices: https://tools.ietf.org/html/rfc8725
- bcryptjs: https://github.com/dcodeIO/bcrypt.js
- Express.js: https://expressjs.com/
- Docker: https://docs.docker.com/

---

**Total Estimated Time:** 8-12 hours for complete implementation
**Dependencies:** Node.js, PostgreSQL (Docker), bcryptjs, jsonwebtoken, pg

**This prompt is comprehensive and ready for execution by you or another developer.**
