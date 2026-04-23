# 🚀 BookNest Backend

**Status:** ✅ 100% Complete  
**API Endpoints:** 35+  
**API Documentation:** 📚 Swagger UI Available  
**Ready for:** Frontend Integration, Testing, Production

---

## 📖 Documentation & Swagger UI

**[📚 Read Full Documentation →](docs/README.md)**

**[🔍 Interactive Swagger UI →](http://localhost:5000/api-docs)** (Start backend first!)

All backend documentation is in the `docs/` folder, including:

- [SWAGGER_GUIDE.md](docs/SWAGGER_GUIDE.md) - How to use interactive API docs
- [BACKEND_SETUP.md](docs/BACKEND_SETUP.md) - Setup instructions
- [IMPLEMENTATION_COMPLETE.md](docs/IMPLEMENTATION_COMPLETE.md) - Full API reference

---

## ⚡ Quick Start (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL
docker-compose up -d

# 3. Wait for initialization
sleep 10

# 4. Build and run
npm run build
npm run dev

# 5. Test it
curl http://localhost:5000/health
```

---

## 📁 Folder Structure

```
backend/
├── docs/                    # 📚 Full documentation
│   ├── README.md           # Start here
│   ├── BACKEND_SETUP.md    # Setup guide
│   ├── IMPLEMENTATION_COMPLETE.md # API reference
│   ├── DETAILED_IMPLEMENTATION_PROMPT.md # Developer guide
│   ├── COMPLETION_REPORT.md # Final report
│   └── BACKEND_COMPLETION_STATUS.md # Status
├── src/
│   ├── server.ts           # Main entry point
│   ├── config/             # Database configuration
│   ├── controllers/        # 9 controllers
│   ├── routes/             # 9 route modules
│   ├── middleware/         # Auth & validation
│   └── utils/              # Utilities
├── db/
│   ├── schema.sql          # 11 database tables
│   └── seed.sql            # Sample data
├── build/                  # Compiled JavaScript (auto-generated)
├── node_modules/           # Dependencies (auto-generated)
├── .env                    # Configuration
├── package.json
├── tsconfig.json
└── docker-compose.yml      # Docker setup
```

---

## ✨ Features

✅ **Authentication System**

- JWT-based auth (24h access, 7d refresh)
- Bcryptjs 
g (10-round salt)
- Admin role support

✅ **Core Features**

- Book search & filtering
- Reading progress tracking with time
- Notes & annotations
- Vocabulary management with mastery levels
- Quiz system with achievement checking
- Reading streaks with badges
- Admin dashboard

✅ **Security**

- SQL injection prevention
- Input validation on all endpoints
- User ownership verification
- Admin role-based access control

---

## 🔧 Available Commands

```bash
# Development
npm run dev          # Start with hot reload (nodemon)
npm run build        # Build TypeScript → JavaScript
npm start            # Run compiled server

# Database
docker-compose up   # Start PostgreSQL
docker-compose down # Stop containers
```

---

## 📡 API Overview

**35+ Endpoints** organized in 9 routes:

| Route               | Endpoints | Purpose                          |
| ------------------- | --------- | -------------------------------- |
| `/api/auth`         | 6         | User authentication              |
| `/api/profile`      | 3         | User profile & stats             |
| `/api/books`        | 4         | Book search & metadata           |
| `/api/progress`     | 2         | Reading progress                 |
| `/api/notes`        | 4         | Note management                  |
| `/api/vocabulary`   | 5         | Word learning                    |
| `/api/reader`       | 3         | AI text simplification & quizzes |
| `/api/achievements` | 1         | Achievement system               |
| `/api/admin`        | 7         | Admin management                 |

---

## 🔑 Environment Variables

Create `.env` file (copy from `.env.example`):

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=booknest
DB_PASSWORD=booknest_password
DB_NAME=booknest
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

---

| File                                                                             | Purpose            | Read Time |
| -------------------------------------------------------------------------------- | ------------------ | --------- |
| [docs/README.md](docs/README.md)                                                 | 📚 **START HERE**  | 5 min     |
| [docs/BACKEND_SETUP.md](docs/BACKEND_SETUP.md)                                   | Setup & deployment | 15 min    |
| [docs/IMPLEMENTATION_COMPLETE.md](docs/IMPLEMENTATION_COMPLETE.md)               | API reference      | 25 min    |
| [docs/DETAILED_IMPLEMENTATION_PROMPT.md](docs/DETAILED_IMPLEMENTATION_PROMPT.md) | Development        | 25 min    |
| [docs/COMPLETION_REPORT.md](docs/COMPLETION_REPORT.md)                           | Final report       | 10 min    |
| [docs/BACKEND_COMPLETION_STATUS.md](docs/BACKEND_COMPLETION_STATUS.md)           | Status tracking    | 10 min    |

---

## 📊 Database

**11 Tables** with relationships and indexes:

- `auth_users` - User credentials & admin flag
- `profiles` - User profile & CEFR level
- `books` - Book catalog (11,000+ sample books)
- `categories` - Book categories
- `user_progress` - Reading progress tracking
- `notes` - User annotations
- `vocabulary` - Personal word bank with mastery
- `quiz_results` - Quiz responses & scores
- `achievements` - Achievement definitions
- `user_achievements` - Earned achievements
- `refresh_tokens` - Token invalidation

---

## 🆘 Troubleshooting

### PostgreSQL not connecting?

```bash
docker-compose up -d
docker logs booknest-db
```

### Port 5000 already in use?

```bash
lsof -i :5000
kill -9 <PID>
```

### Need to reset database?

```bash
docker-compose down -v
docker-compose up -d
npm run build
npm run dev
```

**More help:** See `docs/BACKEND_SETUP.md` → Common Issues

---

## 🎯 Next Steps

1. **Read Documentation:** [docs/README.md](docs/README.md)
2. **Setup Backend:** [docs/BACKEND_SETUP.md](docs/BACKEND_SETUP.md)
3. **Explore API:** [docs/IMPLEMENTATION_COMPLETE.md](docs/IMPLEMENTATION_COMPLETE.md)
4. **Develop Features:** [docs/DETAILED_IMPLEMENTATION_PROMPT.md](docs/DETAILED_IMPLEMENTATION_PROMPT.md)

---

**Status:** ✅ Production Ready  
**Database:** PostgreSQL  
**Last Updated:** April 23, 2026

👉 **[📚 Read Full Documentation →](docs/README.md)**

- Check that the cors middleware is properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
