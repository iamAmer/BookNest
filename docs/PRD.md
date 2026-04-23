# Product Requirements Document (PRD) — Book Nest Adaptive Reading Platform

## 1. System Overview

Book Nest is a full-stack platform designed to facilitate English language learning through interactive reading. It uses AI to adapt content to the user's CEFR level (A1-C2).

## 2. Technical Stack

**Frontend:** React.js + Vite (Tailwind CSS for UI)

**Backend:** Node.js + Express.js + TypeScript

**Database & Auth:** Local PostgreSQL (via Docker) + JWT Authentication

**AI Engine:** FastAPI (Python) service for simplification and quiz generation

## 3. UI-Driven Feature Map (From Final Design Mockups)

### Authentication Flow

- Login/Signup screens with Supabase Auth integration
- Password reset and email confirmation flows
- Guest access option for limited functionality

### Library (Marketplace)

- Category-based browsing (Fiction, History, Kids, etc.) as shown in Categories.png and Category 1.png
- Difficulty badges indicating CEFR level
- Book cards with cover images, titles, authors, and ratings
- Search and filter functionality by category, difficulty, and length
- Guest browsing vs authenticated user experience

### Reader UI

- Interactive Text: Sentence/Word tapping for AI assistance
- Pagination: Progress tracking (e.g., "Page 1 of 48", "6% Done")
- Note Sidebar: Sidebar for users to save thoughts per book (as shown in Notes.png)
- Light/Dark Theme Toggle: As demonstrated in Book (Light Theme).png and Book (Dark Theme).png
- Chapter Navigation: Access to table of contents and jump to specific chapters (Chapters.png)
- Text Selection: Highlighting and annotation capabilities
- Font Size Adjustment: User-controlled text scaling

### Assessment & Quizzes

- Post-reading comprehension quizzes with timers and scoring
- Multiple choice and true/false question formats
- Immediate feedback with explanations
- Quiz results tracking over time
- Adaptive difficulty based on user performance

### Achievements

- Badge system (e.g., "Dedicated Student", "High Achiever") as shown in Achievements.png
- Progress tracking toward achievement completion
- Visual display of earned badges in user profile
- Motivational milestone celebrations

### Profile & Settings

- User profile displaying reading statistics and CEFR level
- Reading history with books completed and time spent
- Vocabulary management interface with review scheduling
- Achievement showcase with earned badges
- Settings for notifications, privacy, and display preferences
- Language interface options
- Data export and account management

### Kids Mode

- Specialized interface for younger learners as shown in Kids Page.png
- Age-appropriate content categorization (Little Readers 3-5, Growing Readers 6-8, Big Readers 9-11)
- Simplified navigation and larger touch targets
- Enhanced visual elements and reduced text density
- Guided reading pathways with parental controls
- Reward systems tailored to child development stages

### Vocabulary Management

- Personal word bank with context sentences and definitions
- Spaced repetition review system
- Word mastery tracking and proficiency levels
- Ability to edit, tag, and organize vocabulary
- Export/import functionality for word lists

### Reading Notes & Annotation

- In-text highlighting and note creation
- Side panel for viewing and managing notes per book
- Note search and filtering capabilities
- Export options for sharing or archiving
- Linking notes to specific vocabulary or concepts

## 4. Database Schema (Local PostgreSQL via Docker)

### Infrastructure

- PostgreSQL 15 running in Docker container
- Automatic schema initialization via `backend/db/schema.sql`
- Seed data loaded from `backend/db/seed.sql`
- Connection pooling via `pg` library (max 20 connections)
- Automatic timestamp triggers for `updated_at` columns
- Row-level security via application logic

### Core Tables

**profiles:** Extends Supabase auth.users

- id (uuid) - Primary key, references auth.users
- full_name (text)
- cefr_level (text) - Constrained to: 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'
- avatar_url (text)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

**books:** Catalog of available reading material

- id (uuid) - Primary key
- title (text)
- author (text)
- category (text) - e.g., Fiction, History, Science, Kids
- difficulty (text) - CEFR level: 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'
- content_url (text) - Reference to storage or external content
- total_pages (integer)
- created_at (timestamp with time zone)

**user_progress:** Tracking reading progress

- id (uuid) - Primary key
- user_id (uuid) - References auth.users
- book_id (uuid) - References books
- current_page (integer)
- is_completed (boolean)
- updated_at (timestamp with time zone)
- Unique constraint on (user_id, book_id)

**vocabulary:** User's personal word bank

- id (uuid) - Primary key
- user_id (uuid) - References auth.users
- word (text)
- context_sentence (text)
- definition (text)
- last_reviewed (timestamp with time zone)
- Unique constraint on (user_id, word) to prevent duplicates

**notes:** User-created annotations

- id (uuid) - Primary key
- user_id (uuid) - References auth.users
- book_id (uuid) - References books
- page_number (integer)
- content (text)
- created_at (timestamp with time zone)

**quiz_results:** Assessment outcomes

- id (uuid) - Primary key
- user_id (uuid) - References auth.users
- book_id (uuid) - References books
- answers (jsonb) - User's submitted answers
- score (decimal) - Percentage score (0-100)
- completed_at (timestamp with time zone)

**achievements:** System-defined accomplishments

- id (uuid) - Primary key
- name (text) - Unique achievement identifier
- description (text)
- criteria_json (jsonb) - Flexible earning conditions
- created_at (timestamp with time zone)

**user_achievements:** Earned achievements

- id (uuid) - Primary key
- user_id (uuid) - References auth.users
- achievement_id (uuid) - References achievements
- earned_at (timestamp with time zone)
- Unique constraint on (user_id, achievement_id)

### Additional Features

- Connection pooling for database interactions
- Indexes on frequently queried columns for performance
- Foreign key constraints for referential integrity
- Unique constraints to prevent duplicates
- Automatic timestamp updates via application logic
- JSON support for flexible achievement criteria storage

## 5. API Endpoints

### Authentication & Profile

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh JWT token
- `GET /api/auth/status` - Check authentication status
- `POST /api/auth/password-reset` - Request password reset
- `GET /api/profile` - Retrieve authenticated user's profile and statistics
- `PATCH /api/profile` - Update user profile (name, bio, avatar)
- `PATCH /api/profile/level` - Update user's CEFR level after assessment

### Books & Library

- `GET /api/books` - Get paginated list of books with filtering and search
  - Query parameters: category, difficulty, search, limit, offset
- `GET /api/books/:id` - Get detailed information for a specific book
- `GET /api/books/categories` - Get list of available content categories
- `GET /api/books/trending` - Get currently trending/popular books

### Reading Progress

- `POST /api/progress/update` - Update user's reading progress for a book
  - Body: { bookId, currentPage }
- `GET /api/progress/:bookId` - Get user's progress for a specific book
- `GET /api/progress` - Get user's progress across all books
- `POST /api/progress/complete/:bookId` - Mark a book as completed

### Notes & Annotations

- `GET /api/notes/:bookId` - Get all user notes for a specific book
- `POST /api/notes` - Create a new note
  - Body: { bookId, pageNumber, content }
- `PUT /api/notes/:id` - Update an existing note
  - Body: { content }
- `DELETE /api/notes/:id` - Delete a note

### Vocabulary Management

- `POST /api/vocabulary/save` - Save a new word to user's vocabulary
  - Body: { word, contextSentence, definition }
- `GET /api/vocabulary` - Get user's vocabulary list with pagination
  - Query parameters: limit, offset, search, sortBy
- `PUT /api/vocabulary/:id/review` - Update word review status
  - Body: { masteryLevel } (optional)
- `DELETE /api/vocabulary/:id` - Remove a word from vocabulary
- `GET /api/vocabulary/stats` - Get vocabulary learning statistics

### Reading Session & AI Assistance

- `POST /api/reader/simplify` - Get AI-powered sentence simplification
  - Body: { sentence, cefrLevel }
  - Proxy to Python AI service
- `POST /api/reader/explain` - Get word/phrase explanation
  - Body: { text, cefrLevel }
  - Proxy to Python AI service
- `POST /api/reader/quiz/:bookId` - Generate comprehension quiz for a book
  - Query parameters: numberOfQuestions, difficulty
  - Proxy to Python AI service
- `POST /api/reader/quiz/submit` - Submit quiz answers for scoring
  - Body: { bookId, answers }
  - Proxy to Python AI service for validation if needed

### Achievements

- `GET /api/achievements` - Get list of available achievements
- `GET /api/user/achievements` - Get current user's earned achievements
- `POST /api/achievements/check/:bookId` - Check for new achievements after reading
- `GET /api/achievements/:id` - Get details for a specific achievement

### Admin & Moderation

- `GET /admin/stats` - Platform usage statistics (admin only)
- `POST /admin/books` - Add new book to catalog (admin only)
- `PUT /admin/books/:id` - Update book information (admin only)
- `DELETE /admin/books/:id` - Remove book from catalog (admin only)

## 6. AI Service Integration

### Architecture

The backend serves as a gateway to the Python AI service for computationally intensive tasks:

- Sentence simplification based on user's CEFR level
- Contextual word explanations and definitions
- Quiz question generation from reading content
- Content difficulty classification and leveling

### Endpoint Proxying

All AI requests flow: Frontend → Node.js Backend → Python AI Service → Node.js Backend → Frontend

This approach provides:

- API key security (keys never exposed to frontend)
- Rate limiting and abuse prevention
- Caching opportunities for repeated requests
- Fallback mechanisms if AI service is unavailable
- Consistent error handling and response formatting

### Supported AI Operations

1. **Text Simplification**
   - Input: Original sentence, target CEFR level
   - Output: Simplified version maintaining core meaning
   - Caching: Per sentence/CEFR level combination

2. **Word Explanation**
   - Input: Word or phrase, context sentence
   - Output: Definition, usage example, pronunciation guide
   - Caching: Per word (independent of context for common words)

3. **Quiz Generation**
   - Input: Book/content ID, target CEFR level, number of questions
   - Output: Multiple choice and true/false questions with answers
   - Caching: Per book/CEFR level/question count combination

4. **Content Leveling**
   - Input: Raw text content
   - Output: CEFR level classification (A1-C2)
   - Used during content ingestion and cataloging

## 7. Security Considerations

### Authentication

- JWT-based authentication (local implementation with bcryptjs)
- Token expiration and refresh mechanisms
- HTTPS enforcement in production
- Secure password hashing with bcrypt
- Protection against brute force attacks

### Data Protection

- Row Level Security (RLS) policies in Supabase
- Input validation and sanitization on all endpoints
- Protection against SQL injection and XSS attacks
- Secure handling of user-generated content
- Regular security audits and dependency updates

### Privacy

- GDPR-compliant data handling
- User data export and deletion capabilities
- Minimal data collection principles
- Clear privacy policy and terms of service
- Age-appropriate safeguards for Kids Mode

### AI Safety

- Content filtering for inappropriate material
- Rate limiting to prevent API abuse
- Fallback responses when AI service is unavailable
- Monitoring for biased or harmful outputs
- Human review mechanisms for edge cases

## 8. Performance & Scalability

### Caching Strategy

- Redis-based caching for frequently accessed data
- CDN for static assets (book covers, UI assets)
- Database query optimization and indexing
- API response caching for non-user-specific data
- Browser caching with appropriate headers

### Database Optimization

- Connection pooling for Supabase interactions
- Indexes on foreign keys and query-filtered columns
- Read replicas for high-traffic queries (if needed)
- Archiving strategies for historical data
- Regular vacuum and analyze operations

### Horizontal Scaling

- Stateless backend services for easy replication
- Load balancing across multiple instances
- Database connection sharing and pooling
- Microservice separation for AI-heavy operations
- Containerization with Docker for consistent deployment

### Monitoring & Analytics

- Performance monitoring and alerting
- Error tracking and exception reporting
- Usage analytics for product improvement
- Health check endpoints for orchestration
- Log aggregation and analysis

## 9. Development & Deployment

### Environment Setup

- Node.js >= 16.x
- npm or yarn package manager
- Supabase account and project
- Python 3.9+ for AI service (separate repository)
- Git for version control

### Local Development

1. Clone repository
2. Install Docker Desktop
3. Start database: `docker-compose up -d`
4. Configure environment variables (copy `.env.example` to `.env`)
5. Install backend dependencies: `cd backend && npm install`
6. Start backend: `npm run dev`
7. Ensure Python AI service is running on configured port
8. Access frontend at http://localhost:5173

### Environment Variables

```
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Local PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=booknest
DB_PASSWORD=booknest_password
DB_NAME=booknest

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_long
JWT_EXPIRATION=24h
JWT_REFRESH_EXPIRATION=7d

# Python AI Service
PYTHON_SERVICE_URL=http://localhost:8000
AI_SERVICE_TIMEOUT=10000

# Optional Services
REDIS_URL=redis://localhost:6379
LOG_LEVEL=debug

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDER_EMAIL=noreply@booknest.com
```

### Production Deployment

1. Set environment variables for production
2. Build optimized assets: `npm run build`
3. Start production server: `npm start`
4. Use process manager (PM2, systemd) or container orchestration
5. Configure reverse proxy (NGINX) for SSL and load balancing
6. Set up monitoring, logging, and backup solutions
7. Configure custom domain and SSL certificates

### CI/CD Pipeline

- Automated testing on pull requests
- Security scanning for dependencies
- Build validation in staging environment
- Blue-green deployment strategy
- Rollback mechanisms for failed deployments
- Performance regression testing

## 10. Product Roadmap

### Phase 1: MVP (Current Implementation)

- Core reading experience with interactive text
- Basic user authentication and profiles
- Sentence simplification and word explanations
- Vocabulary saving and basic review
- Reading progress tracking
- Simple quiz generation
- Light/dark theme support
- Basic marketplace browsing

### Phase 2: Enhanced Features

- Advanced vocabulary review with spaced repetition
- Comprehensive achievement system
- Social features (reading clubs, sharing notes)
- Advanced analytics and progress visualization
- Offline reading capabilities
- Customizable reading goals and reminders
- Enhanced note-taking with tagging and organization

### Phase 3: AI-Powered Personalization

- Adaptive learning paths based on user behavior
- Personalized book recommendations
- AI-generated content summaries
- Pronunciation practice with speech recognition
- Writing practice with AI feedback
- Learning style adaptation and content formatting

### Phase 4: Expansion & Internationalization

- Multiple language interfaces (Arabic, Spanish, etc.)
- Expanded content library with licensing partnerships
- Educational institution integrations
- Teacher dashboards and classroom management
- Curriculum alignment and lesson planning tools
- Parent/guardian supervision features

## 11. Success Metrics

### Engagement

- Daily Active Users (DAU) / Monthly Active Users (MAU) ratio
- Average session duration
- Reading completion rates
- Vocabulary interaction frequency
- Quiz participation rates

### Learning Outcomes

- Vocabulary retention rates (post-review)
- Self-reported confidence improvement
- Assessment score improvements over time
- CEFR level progression velocity
- Time to reach learning milestones

### Retention

- Day 1, Day 7, Day 30 retention rates
- Churn rate and reactivation metrics
- Subscription conversion and upgrade rates
- Referral and organic growth metrics
- Net Promoter Score (NPS)

### System Performance

- Page load times and interaction responsiveness
- API error rates and downtime
- AI service latency and success rates
- Database query performance
- Resource utilization efficiency

## 12. Risks & Mitigations

### Technical Risks

- **AI Service Dependencies**: Mitigated by caching, fallback responses, and graceful degradation
- **Scalability Challenges**: Addressed through horizontal scaling, caching, and performance monitoring
- **Data Security**: Protected via encryption, regular audits, and compliance frameworks
- **Technical Debt**: Managed through regular refactoring, code reviews, and maintenance sprints

### Product Risks

- **User Adoption**: Addressed through intuitive UX, onboarding flows, and value-driven features
- **Content Limitations**: Mitigated by expanding library, user uploads, and partnership development
- **Learning Efficacy**: Validated through educational research partnerships and outcome measurement
- **Competition**: Differentiated through unique AI adaptation, superior UX, and specialized focus

### Operational Risks

- **Team Capacity**: Managed through clear prioritization, agile methodologies, and strategic hiring
- **Budget Constraints**: Addressed through phased implementation and cost optimization
- **Timeline Pressures**: Mitigated by MVP approach and iterative development cycles
- **External Dependencies**: Reduced through abstraction layers, fallback options, and vendor diversification

---

_Document Version: 1.0_
_Last Updated: April 22, 2026_
_Prepared by: Book Nest Development Team_
