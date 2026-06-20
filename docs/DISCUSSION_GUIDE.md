# BookNest — Graduation Project Discussion Guide

## Backend Architecture, Database, Integrations & Design Decisions

---

## 1. Supabase Database Design & Integration

### 1.1 Why Supabase?

**Supabase** is an open-source Firebase alternative that provides a hosted PostgreSQL database with built-in authentication, storage, and real-time capabilities. It was chosen over alternatives for the following reasons:

| Factor | Supabase | Alternative | Why Supabase Wins |
|---|---|---|---|
| **Database** | PostgreSQL (relational, ACID-compliant) | Firebase Firestore (NoSQL, document-based) | Reading platforms need complex relational queries: join users with progress, books with notes, achievements with criteria. PostgreSQL's JOINs, indexes, and constraints ensure data integrity across 11 related tables. |
| **Auth** | Built-in JWT auth with Supabase Auth SDK | Custom auth with Passport.js / bcrypt | Eliminates the need to store password hashes or build token rotation ourselves. Supabase handles secure password hashing, refresh token rotation, and email-based password reset out of the box. |
| **Storage** | S3-compatible object storage with RLS | Separate AWS S3 bucket | Co-located with the database — same access policies (RLS), same dashboard. No need to manage separate credentials for file storage. |
| **Cost** | Free tier (500 MB DB, 1 GB storage) | Firebase (similar free tier) | Supabase's free tier is generous and doesn't require a credit card for the free plan. PostgreSQL skills are more transferable than Firestore's NoSQL. |
| **Self-hosting** | Open-source, can self-host | Firebase is proprietary | Future-proofing — we could migrate off the cloud if needed. |

### 1.2 Database Schema (11 Tables)

The schema is defined in `backend/db/schema.sql` and evolved through 8 migrations in `backend/db/migrations/`.

```
┌─────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│   auth_users    │       │    profiles      │       │      books       │
├─────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (UUID) PK    │──1:1──│ id (UUID) FK     │       │ id (UUID) PK     │
│ email           │       │ email            │       │ title            │
│ password_hash   │       │ full_name        │       │ author           │
│ full_name       │       │ cefr_level (A1-C2)│      │ category         │
│ is_active       │       │ reading_goal     │       │ difficulty (A1-C2)│
│ is_admin        │       │ total_site_time  │       │ age_group        │
│ int_id (SERIAL) │       │ avatar_url       │       │ content (text)   │
└─────────────────┘       └──────────────────┘       │ content_url      │
        │                                             │ cover_image_url  │
        │ 1:N                                          │ total_pages      │
        ▼                                             │ rating           │
┌─────────────────┐                                    │ views            │
│  user_progress  │                                    │ int_id (SERIAL)  │
├─────────────────┤                                    └────────┬─────────┘
│ id              │                                             │
│ user_id (FK)    │──N:1─┐                          ┌───────────┴───────────┐
│ book_id (FK)    │──N:1─┼──(composite UNIQUE)       │                      │
│ current_page    │     │                           ▼                      ▼
│ is_completed    │     │                  ┌──────────────┐     ┌──────────────┐
│ time_spent_sec  │     │                  │  quiz_results│     │    notes     │
│ completed_at    │     │                  ├──────────────┤     ├──────────────┤
└─────────────────┘     │                  │ id           │     │ id           │
                        │                  │ user_id (FK) │     │ user_id (FK) │
┌─────────────────┐     │                  │ book_id (FK) │     │ book_id (FK) │
│  vocabulary     │     │                  │ answers(JSONB)│     │ page_number  │
├─────────────────┤     │                  │ score        │     │ content      │
│ id              │     │                  │ total_ques   │     │ highlighted  │
│ user_id (FK)    │──N:1                  └──────────────┘     └──────────────┘
│ word (UNIQUE)   │
│ context_sentence│
│ definition      │     ┌──────────────────┐      ┌──────────────────────┐
│ mastery_level 0-5│     │  achievements    │      │  user_achievements   │
│ last_reviewed   │     ├──────────────────┤      ├──────────────────────┤
│ review_count    │     │ id               │      │ id                   │
└─────────────────┘     │ name (UNIQUE)     │──1:N─│ user_id (FK)         │
                        │ description       │      │ achievement_id (FK)  │
┌─────────────────┐     │ criteria_json     │      │ earned_at            │
│  categories     │     │ icon_url          │      └──────────────────────┘
├─────────────────┤     │ badge_color       │
│ id              │     └──────────────────┘
│ name (UNIQUE)   │
│ description     │     ┌──────────────────┐
│ icon_url        │     │  refresh_tokens  │
└─────────────────┘     ├──────────────────┤
                        │ id               │
                        │ user_id (FK)     │
                        │ token_hash       │
                        │ expires_at       │
                        └──────────────────┘
```

**Key Design Decisions:**

- **`int_id` SERIAL columns**: Added via migration `005` specifically for the machine learning model. The SVD++ algorithm works with integer user/item IDs, not UUIDs. This avoids costly UUID-to-integer mapping at prediction time.
- **`UNIQUE(user_id, book_id)` constraints**: Prevent duplicate progress or vocabulary entries. This is enforced at the database level, not the application layer.
- **`cefr_level` as TEXT with CHECK constraint**: CEFR levels (A1, A2, B1, B2, C1, C2) are a bounded set. A CHECK constraint ensures data integrity while keeping the schema simple — no need for a separate lookup table.
- **JSONB for quiz answers**: Each quiz has a variable number of questions with different structures. JSONB provides flexibility without needing a separate questions/answers table.
- **Index strategy**: 15+ indexes on foreign keys and frequently filtered columns (category, difficulty, user_id) ensure query performance as the dataset grows.

### 1.3 Integration Pattern

The backend uses **two Supabase clients**:

```typescript
// backend/src/config/supabase.ts
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)      // Auth only
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)  // All CRUD
```

- The **anon client** is used only for auth operations (`signInWithPassword`, `signUp`, `resetPasswordForEmail`).
- The **service-role client** bypasses Row-Level Security (RLS) and is used for all database operations from the backend controllers. This is the recommended pattern for server-side applications — the backend acts as a trusted intermediary, performing its own authorization via JWT middleware rather than relying on RLS policies.

### 1.4 Row-Level Security (RLS)

RLS policies are defined in `schema.sql` for the Storage bucket:
- **Public read**: Anyone can view book covers and content files.
- **Authenticated write**: Logged-in users can upload/delete files.
- **Admin delete**: Only admins can delete files.

**Why RLS only on Storage and not on tables?** The backend uses the service-role key for all table operations. This is intentional — authorization is handled at the application layer (JWT middleware + admin checks) rather than the database layer, giving more flexibility and making the logic testable.

---

## 2. AI Services Integration

### 2.1 Google Gemini Integration

**File:** `backend/src/services/aiService.ts`

**Architecture:** The backend calls Google Gemini's REST API directly via Node.js `fetch()` — no SDK, no intermediary microservice.

**Why direct API calls instead of a Python microservice?**

| Approach | Pros | Cons |
|---|---|---|
| **Direct from Node.js** (chosen) | No network hop, simpler deployment, fewer moving parts, lower latency | Couples AI logic to the backend codebase |
| **Separate Python microservice** | Language-native AI ecosystem (LangChain, Hugging Face) | Added latency, more infrastructure, overkill for REST API calls |

Gemini is consumed as a REST API (HTTP POST with JSON body), so there is no benefit to routing through another service. The Node.js backend can make HTTP calls just as efficiently as Python. A separate microservice would only add value if we needed Python-specific ML libraries (like PyTorch for fine-tuning).

**Key Features:**
- **Structured JSON output**: Gemini's `responseSchema` parameter ensures the AI returns parseable JSON with guaranteed fields. This is critical for production use — without it, the AI might return free-form text that breaks the application.
- **PDF support**: The service can base64-encode PDF buffers and send them inline to Gemini for direct content analysis (CEFR classification, quiz generation). No prior text extraction needed.
- **Temperature tuning**: 0.2 for deterministic tasks (classification, definitions), 0.5 for creative tasks (quiz generation).

**Exposed endpoints (`/api/reader/*`, all JWT-protected):**

| Endpoint | Input | Output | Use Case |
|---|---|---|---|
| `POST /define` | `{ word }` | `{ word, definition, example }` | In-reader dictionary lookup |
| `GET /quiz/:bookId` | `?cefr_level, numQuestions` | `{ cefrLevel, questions[] }` | Generate quiz from stored book content |
| `POST /quiz/submit` | `{ bookId, answers, score }` | Results + achievements | Score quiz and award badges |
| `POST /classify-level` | Multipart: `pdf` + `summary` | `{ cefrLevel }` | Classify uploaded content to CEFR level |
| `POST /generate-quiz` | Multipart: `pdf` + config | `{ cefrLevel, questions[] }` | Generate quiz from uploaded PDF |
| `POST /simplify` | `{ sentence, cefr_level }` | Simplified text | Simplify text to target level |

### 2.2 Recommendation System (Python Microservice)

**Files:** `python-service/` (FastAPI + scikit-surprise)

**Why SVD++ (Singular Value Decomposition ++)?**

SVD++ is an extension of the standard SVD matrix factorization algorithm used in collaborative filtering. It was chosen because:

| Algorithm | Pros | Cons | Why Not Chosen |
|---|---|---|---|
| **SVD++** (chosen) | Handles implicit feedback, considers which users rated which items (not just ratings), state-of-the-art for explicit+implicit data | Slower training than basic SVD | Best accuracy for our use case |
| **Basic SVD** | Fast, simple | Ignores implicit feedback (who rated what vs. who didn't) | Less accurate with sparse data |
| **KNN (k-nearest neighbors)** | Intuitive, explains recommendations | Poor scaling with large datasets, sensitive to sparsity | Doesn't scale to 53k users |
| **Content-based filtering** | No cold-start for new items | Requires rich item metadata, no serendipity | Books have limited metadata for feature engineering |
| **Neural collaborative filtering** | Highest potential accuracy | Requires large datasets, GPU for training, more complex deployment | Overkill; SVD++ achieves competitive accuracy with lower complexity |
| **Popularity-based** | Simple, always works | Not personalized at all | Used as cold-start fallback, not primary algorithm |

**Why a separate Python microservice?**

This is the opposite decision from the Gemini integration. The recommendation system needs:
1. **scikit-surprise** — a Python library that has no Node.js equivalent
2. **Pickle model loading** — the pre-trained model is a Python pickle file
3. **NumPy/SciPy** — for efficient matrix operations during prediction

These dependencies are deeply tied to the Python ML ecosystem. Attempting to replicate this in Node.js would require implementing matrix factorization from scratch — impractical and error-prone.

**Prediction pipeline:**

```
User visits Dashboard
  → React calls GET /api/recommendations?limit=6 (with JWT)
  → Express authenticates JWT, proxies to Python service
  → Python:
      1. Looks up auth_users.int_id by UUID from Supabase
      2. Queries all books the user hasn't read
      3. For each candidate: model.predict(user_int_id, book_int_id)
      4. Sorts by predicted rating, returns top N with full metadata
  → Express wraps in { success: true, data: [...] }
  → React renders "Recommended for You" grid
```

**Cold-start handling (critical for production):**

| Scenario | Behavior |
|---|---|
| New user (no reading history) | Falls back to trending books (views DESC, rating DESC) |
| User not in training set | Same fallback |
| Book not in training set | Skipped during scoring, padded with trending |
| Python service offline | Express returns empty recommendations, UI shows nothing gracefully |

This multi-layered fallback ensures the recommendation UI is never empty and never errors, even under adverse conditions.

### 2.3 Why Two Different AI Integration Strategies?

| Aspect | Gemini AI | Recommendation System |
|---|---|---|
| **Integration** | Direct from Node.js (fetch) | Separate Python microservice |
| **Reason** | Gemini is a REST API — any language can call it | SVD++ requires Python ML libraries (scikit-surprise, NumPy) no Node.js equivalent |
| **Deployment** | No extra service needed | Independent FastAPI service |
| **Scaling** | Scales with backend | Can scale independently if ML becomes bottleneck |
| **Latency** | One network hop | Two network hops (Express → Python → Supabase) |

The guiding principle: **use the simplest architecture that works**. Direct calls for REST APIs, microservices when language-specific dependencies are unavoidable.

---

## 3. Frontend Integration

### 3.1 Communication Architecture

```
[React App :5173]
    │ Axios + JWT in Authorization header
    ▼
[Express Backend :5000]
    │
    ├── Supabase (DB + Auth + Storage)
    ├── Google Gemini (direct REST)
    └── Python Microservice (proxy)
```

### 3.2 Development Proxy

In development, Vite proxies all `/api` requests to the Express backend:

```javascript
// frontend/vite.config.js
server: {
  proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } },
}
```

This eliminates CORS issues during development and keeps the frontend code agnostic to the backend's actual URL. In production, the same pattern is replicated with Nginx:

```nginx
# frontend/nginx.conf
location /api/ {
    proxy_pass http://backend:5000;
}
location / {
    try_files $uri $uri/ /index.html;  # SPA fallback
}
```

### 3.3 Axios Instance with JWT Interceptor

**File:** `frontend/src/services/api.js`

The Axios instance is the backbone of frontend-backend communication:

```javascript
// Request interceptor: Attaches JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor: Auto-refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true
      const { accessToken } = await authService.refreshToken()
      error.config.headers.Authorization = `Bearer ${accessToken}`
      return api(error.config)  // Retry the original request
    }
    return Promise.reject(error)
  }
)
```

**Why this pattern?**
- **No session cookies**: JWTs work better for SPAs that may be served from a different domain than the API.
- **Auto-refresh**: The user never sees a 401 — expired tokens are silently refreshed. Failed requests during refresh are queued and retried.
- **Centralized**: One place to handle all auth concerns rather than scattering token logic across 11 service modules.

### 3.4 Service Layer Pattern

All 11 frontend service modules follow a consistent pattern:

```javascript
// frontend/src/services/books.service.js
import api from './api'

export const bookService = {
  getAll: (params) => api.get('/api/books', { params }),
  getById: (id) => api.get(`/api/books/${id}`),
  getCategories: () => api.get('/api/books/categories'),
  getTrending: () => api.get('/api/books/trending'),
  // ...
}
```

This layer abstracts HTTP details from the React components:
- **Components** call `bookService.getAll({ category: 'Kids' })` — they don't know about Axios, headers, or URL construction.
- **Services** handle request/response transformation, error normalization, and endpoint routing.
- **Changes to the API** (e.g., renaming a query parameter) only affect the service module, not every component that calls it.

### 3.5 State Management

**No Redux or Zustand** — state is managed through:

| Mechanism | What It Manages |
|---|---|
| `AuthContext` | User session, login/logout state |
| `ToastContext` | Notification toasts |
| Custom hooks (`useBooks`, `useReader`, etc.) | Data fetching and caching for specific domains |

**Why not Redux?** The application's state is not complex enough to warrant a global state manager. Data is fetched per-page and cached minimally. The contexts and hooks keep related state co-located with the features that need it, avoiding the indirection that Redux introduces.

**Session restoration flow:**
```
Page reload
  → AuthContext checks localStorage for tokens
  → Calls GET /api/auth/status with stored token
  → If valid: restores user session, renders protected routes
  → If invalid: clears localStorage, redirects to /login
```

### 3.6 Additional Integrations

| Feature | Library | Purpose |
|---|---|---|
| **PDF rendering** | `pdfjs-dist` | Render PDF content in the browser reader |
| **Routing** | React Router v6 | 35+ client-side routes with nested layouts |
| **Styling** | TailwindCSS 3 | Utility-first CSS for rapid UI development |
| **Quiz generator** | Custom component | Interactive quiz UI with answer selection and scoring |

---

## 4. Technology Choices: Alternatives Considered

### 4.1 Database

| Alternative | Considered? | Why Not Chosen |
|---|---|---|
| **MongoDB** | Yes | Reading platforms need relational queries (join books with progress, users with achievements). MongoDB's lack of JOINs would require embedding or multiple queries, increasing complexity. |
| **Firebase Firestore** | Yes | NoSQL document database with limited query capabilities. Complex aggregation queries (leaderboard, stats) would be difficult or require separate indexing strategies. |
| **MySQL** | Yes | Equivalent to PostgreSQL in many ways, but Supabase only supports PostgreSQL. Self-hosting MySQL would mean building auth and storage from scratch. |
| **SQLite** | Yes | Not suitable for multi-user cloud deployment. No built-in auth or storage. |

### 4.2 AI — Content Classification

| Alternative | Considered? | Why Not Chosen |
|---|---|---|
| **OpenAI GPT-4** | Yes | 10-30x more expensive than Gemini for equivalent quality. Gemini's free tier and generous quotas made it more suitable for a graduation project. |
| **Claude** | Yes | Excellent for text analysis, but lacks the structured JSON output guarantees that Gemini provides with `responseSchema`. |
| **Hugging Face (local model)** | Yes | Would require a GPU-equipped server. DistilBERT or similar models would be smaller but less accurate for CEFR classification. |

**Cost comparison (approximate):**

| Service | Input (per 1M tokens) | Output (per 1M tokens) | Free Tier |
|---|---|---|---|
| Gemini 2.0 Flash | $0.10 | $0.40 | 1,500 RPM free |
| GPT-4o mini | $0.15 | $0.60 | Limited free credits |
| Claude 3 Haiku | $0.25 | $1.25 | Limited free credits |

### 4.3 AI — Recommendation System

| Alternative | Considered? | Why Not Chosen |
|---|---|---|
| **TensorFlow Recommenders** | Yes | More powerful but requires significantly more data and GPU training. Overkill for a platform with 53k users. |
| **Surprise SVD** | Yes | Faster to train than SVD++, but ignores implicit signals from the user-book interaction patterns. |
| **AWS Personalize** | Yes | Managed service, zero ML maintenance, but costly ($0.05 per recommendation + training costs). The project's budget couldn't justify it. |
| **LightFM** | Yes | Hybrid model that handles both collaborative and content-based features. Considered, but SVD++ performed better on our implicit interaction data. |
| **Popularity-only** | Yes | Trivially simple but not personalized. Adopted as the cold-start fallback. |

**Why train our own model instead of using a managed service?**

Cost is the primary driver. AWS Personalize would cost approximately $50-100/month for our scale. Self-hosting a FastAPI + scikit-surprise service costs nothing beyond the server it runs on. The maintenance overhead (model retraining, deployment) is a one-time effort.

### 4.4 Backend Framework

| Alternative | Considered? | Why Not Chosen |
|---|---|---|
| **Express** (chosen) | — | Mature ecosystem, simple middleware pattern, extensive community support, TypeScript-compatible. |
| **NestJS** | Yes | Adds opinionated architecture (modules, decorators, dependency injection) that creates unnecessary ceremony for a project of this size. |
| **Fastify** | Yes | Faster than Express, but has a smaller ecosystem and fewer middleware options. TypeScript support is less mature. |
| **Python FastAPI** | Yes | Excellent for the ML microservice, but for the main API backend, Node.js has better throughput for I/O-bound operations (multiple simultaneous DB/AI requests). |

### 4.5 Frontend Framework

| Alternative | Considered? | Why Not Chosen |
|---|---|---|
| **React** (chosen) | — | Largest ecosystem, most job market relevance, excellent tooling (Vite, Tailwind). |
| **Next.js** | Yes | Adds server-side rendering and API routes, but adds complexity (file-based routing, server/client component distinction) unnecessary for an SPA that primarily interacts with a separate backend. |
| **Vue** | Yes | Simpler than React, but smaller ecosystem. Less relevant for demonstrating industry-ready skills. |
| **Svelte** | Considered | Promising technology but too new — fewer libraries, less community support, harder to demonstrate stable engineering practices. |

### 4.6 Containerization

| Alternative | Considered? | Why Not Chosen |
|---|---|---|
| **Docker Compose** (chosen) | — | Perfect for orchestrating the 3 services (frontend, backend, Python). Simple YAML configuration, single command to start everything. |
| **Kubernetes** | Yes | Overkill for a graduation project with 3 services. Would add significant complexity (cluster setup, ingress, service mesh) without proportional benefit. |
| **Podman** | Yes | Docker-compatible but less widely adopted. Docker Compose is the industry standard. |

---

## 5. Architecture Diagram (Full Data Flow)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BOOKNEST SYSTEM                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Browser]                                                                   │
│    │ React 19 + Vite + TailwindCSS                                           │
│    │ 35+ Routes, 11 Service Modules, Axios + JWT                             │
│    ▼                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                   NGINX (Production) / Vite Proxy (Dev)              │    │
│  │                   /api/* → http://backend:5000                       │    │
│  │                   /*     → index.html (SPA fallback)                 │    │
│  └─────────────────────────┬───────────────────────────────────────────┘    │
│                            │ HTTP with Authorization: Bearer <JWT>          │
│                            ▼                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                   EXPRESS BACKEND (:5000)                            │    │
│  │                                                                      │    │
│  │  Middleware:                                                         │    │
│  │    ├── authenticateJWT → verifies token via Supabase + local JWT     │    │
│  │    ├── requireAdmin → checks req.user.isAdmin                        │    │
│  │    ├── validateQueryLength(1000) → prevents abuse                    │    │
│  │    └── sanitizeSQLPatterns → prevents SQL injection                  │    │
│  │                                                                      │    │
│  │  Controllers (10): Auth, Profile, Books, Progress, Notes,           │    │
│  │                   Vocabulary, AI/Reader, Achievements, Admin,        │    │
│  │                   Recommendations                                    │    │
│  │                                                                      │    │
│  │  ┌────────────────────────────────────────────────────────────────┐  │    │
│  │  │  Services Layer                                                │  │    │
│  │  │  ├── aiService.ts → fetch() → Google Gemini REST API           │  │    │
│  │  │  └── recommendationService.ts → fetch() → Python FastAPI       │  │    │
│  │  └────────────────────────────────────────────────────────────────┘  │    │
│  │                    │                                     │           │    │
│  └────────────────────┼─────────────────────────────────────┼───────────┘    │
│                       │                                     │                │
│         ┌─────────────▼──────────┐        ┌─────────────────▼──────────┐    │
│         │   SUPABASE CLOUD       │        │  PYTHON MICROSERVICE (:8000)│    │
│         │                       │        │                          │    │
│         │  ┌─────────────────┐  │        │  FastAPI + scikit-surprise│    │
│         │  │ PostgreSQL (11) │  │        │  SVD++ model (model.pkl)  │    │
│         │  │ Tables          │  │        │  ~53k users × ~10k items  │    │
│         │  └─────────────────┘  │        │                          │    │
│         │  ┌─────────────────┐  │        │  POST /api/recommendations│    │
│         │  │ Auth (JWT)      │  │        │  POST /api/similar-books  │    │
│         │  └─────────────────┘  │        │  GET /health              │    │
│         │  ┌─────────────────┐  │        │                          │    │
│         │  │ Storage (S3)    │  │        │  Queries Supabase directly│    │
│         │  │ books/covers/   │  │        │  Uses int_id for model    │    │
│         │  │ books/content/  │  │        └──────────────────────────────┘    │
│         │  └─────────────────┘  │                                           │
│         └───────────────────────┘                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │   GOOGLE GEMINI API           │
              │   model: gemini-3-flash       │
              │                               │
              │   POST :generateContent       │
              │   responseSchema → JSON       │
              │                               │
              │   Features:                   │
              │   ├── CEFR Classification     │
              │   ├── Quiz Generation         │
              │   ├── Word Definition         │
              │   └── Text Simplification     │
              └───────────────────────────────┘
```

---

## 6. Deployment Architecture

```
                        Docker Compose
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Frontend    │    │   Backend    │    │   Python     │  │
│  │  Nginx:8080  │───▶│  Express:5000│───▶│  FastAPI:8000│  │
│  │              │    │              │    │              │  │
│  │  Static SPA  │    │  TypeScript  │    │  SVD++ Model │  │
│  └──────────────┘    └──────┬───────┘    └──────────────┘  │
│                             │                               │
│                             ▼                               │
│                    ┌────────────────┐                       │
│                    │  Supabase      │                       │
│                    │  (Cloud)       │                       │
│                    │  DB + Auth     │                       │
│                    │  + Storage     │                       │
│                    └────────────────┘                       │
│                                                             │
│  docker-compose.yml (3 services, shared .env)               │
└─────────────────────────────────────────────────────────────┘
```

All three services share a single `.env` file at the project root. Docker Compose loads it with `env_file: .env`, ensuring consistent configuration across services.

---

## 7. Security Considerations

| Layer | Measure |
|---|---|
| **Authentication** | JWT with dual verification (local + Supabase), auto-refresh, refresh token rotation |
| **Authorization** | JWT middleware checks user identity; `requireAdmin` middleware checks `isAdmin` flag |
| **Input validation** | `validateQueryLength(1000)` prevents oversized requests; `sanitizeSQLPatterns` prevents SQL injection |
| **Database** | Service-role key only used server-side, never exposed to the client |
| **API keys** | `GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY` stored in `.env`, never committed |
| **CORS** | Restricted to `FRONTEND_URL` + localhost variants |
| **File uploads** | Type restrictions (images: jpg/png/webp/gif, content: pdf/epub), size limits (<10 MB) |

---

## 8. Summary of Key Trade-offs

| Decision | Chosen | Alternative | Rationale |
|---|---|---|---|
| Database type | PostgreSQL (Supabase) | MongoDB/Firebase | Relational queries needed; PostgreSQL skills are portable |
| Auth provider | Supabase Auth | Custom Passport.js | Eliminates password hashing, token rotation, email verification |
| AI (text) | Gemini via direct fetch | Python microservice | Gemini is a REST API; no Python dependencies needed |
| AI (recs) | Python microservice | Node.js native | SVD++ requires scikit-surprise/NumPy — no Node.js equivalent |
| Frontend state | Context + hooks | Redux/Zustand | State is simple enough; Context avoids indirection |
| Deployment | Docker Compose | Kubernetes | 3 services don't warrant Kubernetes complexity |
| Frontend framework | React + Vite | Next.js | SPA architecture; SSR isn't needed |

Every decision follows the principle: **choose the simplest solution that meets the requirements, with an eye toward the specific constraints of each subproblem.** The result is a pragmatic architecture that balances academic rigor (relational design, collaborative filtering) with practical deployment considerations (Docker Compose, free-tier services).
