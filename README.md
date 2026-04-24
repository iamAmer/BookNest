# 📚 BookNest - Complete Adaptive Reading Platform

BookNest is a comprehensive language learning platform that helps users improve their English skills through personalized book recommendations, adaptive quizzes, vocabulary building, and progress tracking. The platform uses AI to assess users' CEFR language levels (A1-C2) and provides content tailored to their proficiency.

## 🏗️ System Overview

BookNest consists of four interconnected components:

1. **Frontend** (`/frontend`) - React/Vite application providing the user interface
2. **Backend** (`/backend`) - Node.js/Express API with PostgreSQL database handling all core logic
3. **AI Service** (`/ai-service`) - Python/FastAPI service for language processing and quiz generation
4. **Quiz Generator Demo** (`/ai-service/4-react-quiz-generator`) - Standalone React frontend for testing AI capabilities

## 🚀 Quick Start Guide

Follow these steps to get the complete system running:

### Prerequisites
- Docker and Docker Compose
- Node.js (v16+)
- npm or yarn
- Python 3.9+
- Google Gemini API key (for AI service)

### Step 1: Start the Database
```bash
docker-compose up -d
```
Wait ~15 seconds for PostgreSQL to initialize.

### Step 2: Setup and Start the Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

### Step 3: Setup and Start the Frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### Step 4: Setup and Start the AI Service
In another terminal:
```bash
cd ai-service
npm install
cp .env.example .env
# Edit .env to add your Gemini API key
npm run dev:full
```
This starts both:
- AI API server: `http://localhost:8787`
- Quiz generator demo: `http://localhost:5174`

## 📖 Component Details

### Frontend (React/Vite)
- **URL**: `http://localhost:5173`
- **Features**: User authentication, book browsing, quiz interface, profile management, progress tracking
- **Key Technologies**: React, Vite, TailwindCSS, React Router, Axios
- **API Communication**: Calls backend endpoints at `/api/*`

### Backend (Node.js/Express)
- **URL**: `http://localhost:5000`
- **Features**: RESTful API, JWT authentication, PostgreSQL database, AI service proxy
- **Key Technologies**: Node.js, Express, TypeScript, PostgreSQL, Swagger/OpenAPI
- **API Documentation**: `http://localhost:5000/api-docs`
- **Health Check**: `http://localhost:5000/health`

### AI Service (Python/FastAPI)
- **API URL**: `http://localhost:8787`
- **Demo URL**: `http://localhost:5174`
- **Features**: CEFR level classification, adaptive quiz generation, sentence simplification
- **Key Technologies**: Python, FastAPI, Google Gemini API
- **Integration**: Proxied through backend at `/api/reader/*`

## 🔗 Data Flow Example

1. **User takes a quiz**:
   - Frontend → Backend: `GET /api/reader/quiz/:bookId`
   - Backend → AI Service: `GET /quiz/:bookId?cefr_level=B1&numQuestions=5`
   - AI Service processes book content, generates questions
   - AI Service → Backend: `{ cefrLevel: "B1", questions: [...] }`
   - Backend → Frontend: Returns quiz data
   - User answers questions
   - Frontend → Backend: `POST /api/reader/quiz/submit` with answers
   - Backend saves results, updates progress, checks achievements
   - Backend → Frontend: Returns score and any new achievements

2. **User views sentence simplification**:
   - Frontend → Backend: `POST /api/reader/simplify` with sentence and level
   - Backend → AI Service: `POST /simplify` with same data
   - AI Service returns simplified sentence
   - Backend → Frontend: Returns simplified result

## 🛠️ Configuration

### Environment Files

Each service requires a `.env` file. Copy from the examples:

**Backend** (`/backend/.env`):
```
PORT=5000
PYTHON_SERVICE_URL=http://localhost:8000
JWT_SECRET=your_jwt_secret_here
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=booknest
```

**AI Service** (`/ai-service/.env`):
```
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=8787
HOST=0.0.0.0
```

**Frontend**: No .env required for basic operation.

## 🧪 Testing the Complete Flow

1. Visit `http://localhost:5173` and register a new user
2. Login and explore the home page
3. Browse available books in the library
4. Click on a book to view details
5. Look for quiz functionality (to be implemented in frontend components)
6. Complete a quiz to test the AI integration
7. Check your profile at `/profile` for updated stats and achievements
8. Visit the AI service demo at `http://localhost:5174` to test quiz generation directly

## 📚 Features by Component

### Frontend Features
- ✅ User authentication (register/login/logout)
- ✅ Book browsing and search
- ✅ Category filtering and trending books
- ✅ User profile management
- ✅ Reading statistics visualization
- ✅ Responsive design for mobile/Desktop
- ⏳ Quiz interface (components to be created)
- ⏳ Vocabulary management interface
- ⏳ Achievement display

### Backend Features
- ✅ JWT-based authentication system
- ✅ User profile management with statistics
- ✅ Complete book catalog with search/filter/pagination
- ✅ Reading progress tracking
- ✅ Vocabulary management (word bank)
- ✅ User notes and annotations
- ✅ Achievement system with dynamic checking
- ✅ AI service integration (proxy endpoints)
- ✅ Quiz submission and scoring
- ✅ Book marking as completed (score ≥ 70%)
- ✅ Comprehensive API documentation (Swagger)
- ⏳ Input validation middleware
- ⏳ Admin endpoints for content management
- ⏳ Reading streak logic

### AI Service Features
- ✅ CEFR level classification (A1-C2)
- ✅ Adaptive multiple-choice question generation
- ✅ Sentence simplification for target levels
- ✅ PDF and text summary processing
- ✅ Gemini AI integration
- ✅ Frontend demo for testing capabilities
- ⏳ Enhanced error handling and fallbacks
- ⏳ Batch processing capabilities
- ⏳ Custom model fine-tuning support

## 🔍 Troubleshooting

### Common Issues

**Database Connection Problems:**
- Ensure Docker is running: `docker ps`
- Check PostgreSQL logs: `docker logs booknest-db`
- Verify .env database credentials in backend
- Try: `docker-compose restart booknest-db`

**Backend Won't Start:**
- Check if port 5000 is free: `lsof -i :5000`
- Verify TypeScript compilation: `cd backend && npx tsc --noEmit`
- Check Node.js version: `node --version`
- Try deleting node_modules and reinstalling

**Frontend Issues:**
- Check if port 5173 is free: `lsof -i :5173`
- Verify Node.js version compatibility
- Try clearing cache: `cd frontend && rm -rf node_modules package-lock.json && npm install`
- Check browser console for errors

**AI Service Problems:**
- Verify Gemini API key is valid in `/ai-service/.env`
- Check if port 8787 is free: `lsof -i :8787`
- Check Python version: `python --version`
- Try: `cd ai-service && pip install -r requirements.txt`
- Check API server logs in the ai-service terminal

**Proxy/Integration Issues:**
- Verify backend can reach AI service: `curl http://localhost:8000/health` (from backend container)
- Check PYTHON_SERVICE_URL in backend .env
- Look for timeout errors in backend logs
- Verify CORS settings if deploying to different domains

### Log Locations
- **Backend**: Terminal where `npm run dev` is running
- **Frontend**: Browser dev tools console + terminal where `npm run dev` runs
- **AI Service**: Terminal where `npm run dev:api` runs
- **Database**: `docker logs booknest-db`

## 📈 Future Enhancements

### Planned Features
- Reading streak tracking with calendar view
- Social features (book clubs, sharing achievements)
- Advanced analytics and learning insights
- Offline synchronization capabilities
- Teacher/tutor dashboard for classroom use
- Audio pronunciation integration
- Spaced repetition system for vocabulary
- Book upload and custom content creation
- Mobile applications (React Native)

### Technical Improvements
- Implement comprehensive input validation
- Add rate limiting and abuse prevention
- Enhance caching with Redis
- Add comprehensive test suite (unit/integration/e2e)
- Implement CI/CD pipeline
- Add monitoring and logging infrastructure
- Implement feature flags for gradual rollouts
- Add internationalization (i18n) support

## 📄 License

This project is part of the BookNest platform and is licensed under the MIT License.

## 👥 Contributing

We welcome contributions to BookNest! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🙏 Acknowledgments

- Google Gemini API for powerful AI capabilities
- PostgreSQL team for the excellent open-source database
- Express.js, React, and TypeScript communities
- Docker team for containerization excellence
- All open source contributors whose work makes this possible
- The BookNest development team and early users

---

**Ready to start your language learning journey?** 
1. Follow the Quick Start Guide above
2. Register at `http://localhost:5173/register`
3. Explore books, take quizzes, and track your progress!
4. Visit `http://localhost:5000/api-docs` to explore the API