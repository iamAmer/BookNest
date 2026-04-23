# BookNest Backend Setup Guide

## Overview

This guide provides step-by-step instructions to set up the Book Nest backend with local PostgreSQL database.

## Prerequisites

- Node.js 16+ installed
- Docker and Docker Compose installed
- Git
- Code editor (VS Code recommended)

---

## Step 1: Clone and Install Dependencies

```bash
# Navigate to project root
cd /home/amer/Graduation\ Project/BookNest

# Install backend dependencies
cd backend
npm install
```

---

## Step 2: Start PostgreSQL Database

```bash
# From project root
docker-compose up -d

# Verify database is running
docker ps | grep booknest-db
```

**Note:** The first time you run this, Docker will:

1. Download PostgreSQL 15 image
2. Create the database
3. Load schema from `backend/db/schema.sql`
4. Load seed data from `backend/db/seed.sql`

---

## Step 3: Configure Environment Variables

```bash
# Copy example environment file
cp backend/.env.example backend/.env

# Edit .env and set your values (optional - defaults work for local dev)
# nano backend/.env
```

**Key variables for local development:**

- `DB_HOST=localhost`
- `DB_USER=booknest`
- `DB_PASSWORD=booknest_password`
- `DB_NAME=booknest`
- `JWT_SECRET=your_secret_key_here`

---

## Step 4: Start Backend Server

```bash
cd backend

# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

You should see:

```
🚀 Server running on port 5000
📚 Environment: development
🌐 CORS enabled for: http://localhost:5173
```

---

## Step 5: Verify API is Working

```bash
# Health check
curl http://localhost:5000/health

# Expected response:
# {"status":"OK","timestamp":"2026-04-23T..."}
```

---

## Next Steps: Complete Backend Features

### 1. **Test Authentication Endpoints**

```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. **Complete AI Controller submitQuiz Function**

- Currently incomplete in `src/controllers/aiController.ts`
- Needs full achievement checking logic
- Needs proper error handling

### 3. **Implement Admin Endpoints**

Required in backend:

- `GET /admin/stats` - Platform statistics
- `POST /admin/books` - Add book (admin only)
- `PUT /admin/books/:id` - Update book (admin only)
- `DELETE /admin/books/:id` - Delete book (admin only)

### 4. **Add Request Validation**

- Input sanitization on all endpoints
- Type validation
- Business logic validation

### 5: **Implement Reading Streak Logic**

- Track consecutive reading days
- Achievement for 7-day and 14-day streaks

### 6: **Complete Book Controller**

- Search filtering needs optimization
- Pagination needs implementation
- Category/difficulty filters working but need testing

---

## Database Management

### View Database

```bash
# Connect to PostgreSQL
docker exec -it booknest-db psql -U booknest -d booknest

# Common commands:
\dt              # List all tables
\d books         # Describe books table
SELECT * FROM books;  # View books
\q              # Quit
```

### Reset Database

```bash
# Stop and remove database
docker-compose down -v

# Restart (will re-initialize)
docker-compose up -d
```

### View Logs

```bash
# PostgreSQL logs
docker logs booknest-db

# See if database is ready
docker-compose ps
```

---

## Common Issues & Solutions

### Issue: "Connection refused" when starting backend

**Solution:**

```bash
# Wait 5-10 seconds for PostgreSQL to fully start
sleep 10

# Then start backend
npm run dev
```

### Issue: "Cannot find module 'pg'"

**Solution:**

```bash
cd backend
npm install
```

### Issue: Database won't initialize

**Solution:**

```bash
# Remove existing database and recreate
docker-compose down -v
docker-compose up -d

# Check if schema loaded
docker exec booknest-db psql -U booknest -d booknest -c "\dt"
```

### Issue: Port 5432 already in use

**Solution:**

```bash
# Change DB_PORT in .env and docker-compose.yml
# Then run:
docker-compose down
docker-compose up -d
```

---

## API Endpoints Reference

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh-token` - Refresh JWT
- `GET /api/auth/status` - Check auth status

### Books

- `GET /api/books` - List books (with search/filters)
- `GET /api/books/:id` - Get book detail
- `GET /api/books/categories` - Get categories
- `GET /api/books/trending` - Get trending books

### Profile

- `GET /api/profile` - Get user profile & stats
- `PATCH /api/profile` - Update profile
- `PATCH /api/profile/level` - Update CEFR level

### Progress

- `POST /api/progress/update` - Update reading progress
- `GET /api/progress/:bookId` - Get book progress
- `GET /api/progress` - Get all progress
- `POST /api/progress/complete/:bookId` - Mark book complete

### Vocabulary

- `POST /api/vocabulary/save` - Save word
- `GET /api/vocabulary` - Get vocabulary list
- `PUT /api/vocabulary/:id/review` - Update review status
- `DELETE /api/vocabulary/:id` - Delete word
- `GET /api/vocabulary/stats` - Get vocabulary stats

### Notes

- `GET /api/notes/:bookId` - Get notes for book
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### AI/Reader

- `POST /api/reader/simplify` - Simplify sentence
- `GET /api/reader/quiz/:bookId` - Get quiz questions
- `POST /api/reader/quiz/submit` - Submit quiz

### Achievements

- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:id` - Get achievement detail
- `GET /api/achievements/user/achievements` - Get user achievements
- `POST /api/achievements/check/:bookId` - Check new achievements

---

## Development Workflow

1. **Start Database:**

   ```bash
   docker-compose up -d
   ```

2. **Start Backend:**

   ```bash
   cd backend
   npm run dev
   ```

3. **In Another Terminal, Start Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

4. **Open Browser:**

   ```
   http://localhost:5173
   ```

5. **Test Backend (Optional):**
   ```bash
   # Using Postman or Insomnia
   # Import API endpoints from MIGRATION_PROMPT.md
   ```

---

## Production Deployment

Before deploying to production:

1. **Update environment variables:**
   - Change `JWT_SECRET` to a strong random key
   - Set `NODE_ENV=production`
   - Configure production database
   - Set `FRONTEND_URL` to production domain

2. **Build backend:**

   ```bash
   cd backend
   npm run build
   ```

3. **Use process manager (PM2):**

   ```bash
   npm install -g pm2
   pm2 start build/server.js --name "booknest-backend"
   pm2 save
   pm2 startup
   ```

4. **Configure reverse proxy (NGINX):**

   ```nginx
   upstream backend {
       server localhost:5000;
   }

   server {
       server_name api.booknest.com;

       location / {
           proxy_pass http://backend;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
       }
   }
   ```

5. **Set up SSL (Let's Encrypt):**
   ```bash
   sudo certbot --nginx -d api.booknest.com
   ```

---

## Monitoring & Debugging

### Check Server Logs

```bash
# Development
npm run dev  # Logs appear in console

# Production
pm2 logs booknest-backend
```

### Check Database Logs

```bash
docker logs booknest-db
```

### Monitor Database Queries

```bash
docker exec booknest-db psql -U booknest -d booknest -c "SELECT * FROM pg_stat_statements;"
```

---

## Next Steps

1. ✅ Database setup complete
2. ⏳ Authentication endpoints ready
3. ⏳ Books & library endpoints ready
4. ⏳ Complete AI Controller submitQuiz function
5. ⏳ Implement admin endpoints
6. ⏳ Add comprehensive validation
7. ⏳ Implement caching (Redis)
8. ⏳ Set up monitoring & logging
9. ⏳ Create Postman collection for API testing
10. ⏳ Deploy to production

---

**For questions or issues, refer to MIGRATION_PROMPT.md for detailed technical documentation.**
