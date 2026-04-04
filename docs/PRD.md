# Product Requirements Document (PRD) — Adaptive Reading Platform

## 0) Project Context

* **Institution:** EELU (The Egyptian E-Learning University)
* **Academic Year:** 2025–2026
* **Supervisors:** Dr. Amany Magdy Samy, TA. Maryam Mohamed Atef
* **Team Members:**
  * Amina Saeed — Frontend Developer
  * Yasmina Mohamed — Frontend Developer
  * Abdulrahman Atef — AI & ML Engineer
  * Ahmed Nabil — AI & ML Engineer
  * Shawkat Elgrwany — UI/UX Designer
* **Gap:** No dedicated backend engineer. One AI engineer must take on full-stack responsibilities (API, database, auth, deployment), or a backend role must be added.

---

## 1) Product Name

**Book Nest**
A smart reading platform for Arabic native speakers learning English as a second language.

## 2) Product Vision

Help users read real English content without getting stuck, by turning difficult text into understandable, interactive reading experiences that adapt to their level.

## 3) Problem Statement

Arabic learners often face three main problems:

* English content is too hard, so they stop reading.
* Dictionary lookup breaks reading flow.
* Existing apps are either too childish, too academic, or too generic.

Additional pain points addressed:

* Old teaching methods make learning boring.
* "Choice overload" — too many books, no guidance on what to read next.

## 4) Core Idea

The product is no longer a basic book-reading app. It is an **Adaptive Reading Engine** that:

* lets users upload text or choose content from a marketplace,
* displays the text inside the app as interactive content,
* simplifies difficult sentences based on the user's level,
* explains hard words in context,
* saves vocabulary automatically,
* reviews learned words later,
* recommends books based on user behavior and level.

## 5) Target Users

Primary users:

* Arabic native English learners
* Students stuck between beginner apps and real English content
* University students and professionals who need English for work/study

Secondary users:

* Teachers
* Language centers
* Content curators

Future users (post-MVP):

* Children learning English through reading
* Parents looking for guided reading tools

## 6) Product Goals

* Make real English reading easier and less frustrating.
* Help users learn vocabulary from context.
* Improve comprehension without forcing users to leave the page.
* Support both self-learning and guided learning.
* Create a strong differentiator through adaptive reading, not generic reading.
* Teach English naturally through reading rather than traditional methods.
* Prevent "brain rot" by keeping users engaged with meaningful content.

## 7) Non-Goals

The product will not focus on:

* being a general social reading app,
* copying traditional ebook platforms,
* being a quiz-only language app,
* long form PDFs as the main experience,
* endless gamification that does not support learning.

## 8) Core User Journey

1. User signs up and selects or is assessed for English level.
2. User uploads or pastes text to read.
3. Text loads inside the app in a reactive reading view.
4. User reads normally.
5. User taps a sentence or word they do not understand.
6. The app shows:

   * simplified sentence,
   * short explanation,
   * Arabic meaning if needed,
   * related vocabulary.
7. Important words are saved automatically.
8. The app later asks review questions based on saved vocabulary.
9. After finishing a book or reading session, the user can take a comprehension quiz.
10. The user's level, vocabulary, and recommendations improve over time.

## 9) Main Product Features

### A. Content Sources (MVP)

Users can get reading material from:

* **Upload content**: paste text or upload a document (TXT, PDF, DOCX).
* **Starter library**: a small curated set of public domain texts organized by CEFR level and topic.

### B. Reactive Reading View

Text is not treated like a static PDF viewer. It is loaded into the app as readable, interactive content with:

* sentence-level interaction,
* word-level interaction,
* clean reading layout,
* easy highlighting,
* adaptive display for simplification and annotations,
* adjustable fonts and background colors (light/dark modes),
* note-taking support.

### C. Adaptive Text Simplification

When a sentence is difficult:

* the user can tap it,
* the app generates a simpler version matched to the user's level,
* the original text remains available.

Example:

* Original: "The rapid advancement of artificial intelligence has significantly transformed various industries."
* Simple: "AI has changed many industries a lot."

### D. Word Explanation

When a user taps a word:

* the app shows a short meaning,
* gives Arabic support when useful,
* shows the word in context,
* optionally shows an example sentence.

### E. Vocabulary Capture

Any word the user interacts with can be:

* saved automatically,
* grouped into a personal vocabulary list,
* tagged by reading source and difficulty.

### F. Review System

Saved words are revisited later through:

* short meaning checks,
* multiple-choice review,
* contextual recall,
* spaced repetition style review.

### G. Level Adaptation

The system adjusts content and simplification based on the user's estimated English level using the **CEFR scale**:

* A1 (Beginner)
* A2 (Elementary)
* B1 (Intermediate)
* B2 (Upper Intermediate)
* C1 (Advanced)
* C2 (Proficient)

### H. Marketplace (Future Scope)

A curated content space where users can:

* discover texts by topic and level,
* open selected readings,
* continue previously started content,
* save items for later,
* receive AI-driven personalized book recommendations based on reading history, behavior, and ratings.

**Note:** Deferred to post-MVP pending content licensing strategy.

### I. Progress Tracking

The platform tracks:

* reading sessions,
* words learned,
* reviewed vocabulary,
* comprehension progress,
* level improvement over time,
* reading streaks and hours,
* unlockable achievement badges (e.g., Mastery Seal, Knowledge Seeker).

### J. Kids Mode (Future Scope)

A simplified mode for younger users with:

* easier text,
* more visual structure,
* safer and shorter reading content,
* more guided interaction,
* age-group categorization:
  * Little Readers (3–5 years),
  * Growing Readers (6–8 years),
  * Big Readers (9–11 years).

**Note:** Deferred to post-MVP. Requires separate UX, content curation, and child safety compliance.

### K. Post-Reading Comprehension Quizzes

After finishing a book or reading session:

* AI-generated multiple-choice and true/false questions based on the content,
* immediate score feedback,
* promotes active learning and ensures comprehension.

### L. AI Book Discovery Chatbot (Future Scope)

An integrated AI assistant that helps users:

* find books naturally through conversation,
* get recommendations based on preferences and level,
* explore genres and topics.

**Note:** Deferred to post-MVP. MVP uses filter-based book discovery (by level, topic, length) instead.

## 10) AI Capabilities

Book Nest uses AI in three main areas:

### Automatic Content Level Classification

* Analyzes uploaded or marketplace content and assigns a CEFR level (A1–C2).
* Ensures users are matched with appropriate difficulty.

### Comprehension Quiz Generation

* Creates multiple-choice and true/false questions from recently read content.
* Validates understanding after each reading session.

### Interactive Reading Assistance

During reading, AI also:

* simplifies difficult sentences to the user's level,
* explains words in context with Arabic support,
* identifies likely hard vocabulary for saving,
* supports level-aware reading guidance.

### AI should not:

* replace the whole learning flow,
* act like a random chatbot,
* generate unnecessary features,
* distract from reading.

### AI Cost Awareness

Each AI call (simplification, explanation, quiz) incurs API costs. The system must:

* cache word explanations for common words (never hit API twice for the same word),
* pre-compute simplifications for starter library content at multiple CEFR levels,
* rate-limit free-tier usage,
* use smaller/cheaper models for simple tasks (word definitions) and stronger models for complex tasks (sentence simplification).

### Model Options

For development and MVP, the team can leverage free or low-cost model options:

* **GPT-OSS 120B via Azure Student Plan** — Free access through Microsoft Azure's student credits. Provides a capable open-weight model suitable for simplification, explanation, and quiz generation.
* **Other free API-based models** — OpenRouter free tier, Groq (Llama 3, Mixtral), Google AI Studio (Gemini free tier), or Hugging Face Inference API. These provide zero-cost access during development and early testing.
* **Fallback strategy** — If free tiers hit rate limits, switch between providers. The system should abstract the model layer so swapping providers requires only a config change, not code changes.

**Note:** Free tiers are sufficient for development, testing, and early MVP launches. At scale (1,000+ active users), paid API or self-hosted models become necessary.

## 11) Content Rules

Content must be:

* suitable for English learners,
* short and readable enough for the target level,
* organized by difficulty and topic,
* clear in quality and source.

### Licensing (MVP)

* MVP supports **user-uploaded content only** — users bring their own text.
* Starter library uses **public domain texts only** (e.g., Project Gutenberg, OpenStax).
* Marketplace with licensed content requires a **separate licensing strategy** defined before implementation.
* User-uploaded content must include a copyright acknowledgment step.

## 13) Competitive Advantage

Compared to existing language learning reading platforms:

| Feature | Book Nest | LingQ | Readlang | Beelinguapp |
|---|---|---|---|---|
| Click-to-translate words | Yes | Yes | Yes | Partial |
| Vocabulary tracking | Yes | Yes | Yes | No |
| AI sentence simplification | Yes | No | No | No |
| Arabic-specific support | Yes | No | No | Limited |
| CEFR level adaptation | Yes | Partial | No | No |
| Auto vocabulary saving | Yes | Manual | Yes | No |
| Post-reading quizzes | Yes | No | No | No |
| Free tier | Yes | Limited | Yes | Limited |

**Real differentiator:** Book Nest is the only platform built specifically for Arabic native speakers learning English, with AI-powered sentence simplification and Arabic-contextual word explanations. Competitors are generic — they do not account for Arabic→English learner-specific challenges (false friends, grammar transfer, common mistakes).

**Moat strategy:** Build a simplification quality feedback loop (user 👍/👎 ratings) to create a proprietary dataset that improves simplification quality over time for Arabic learners specifically.

## 13.5) Monetization

### Business Model: Freemium

**Free tier:**
* Unlimited text upload and reading
* 10 sentence simplifications per day
* 5 word explanations per day
* 3 post-reading quizzes per day
* Basic vocabulary saving

**Premium tier ($2–3/month MENA, $5–7/month international):**
* Unlimited AI features (simplifications, explanations, quizzes)
* Advanced spaced repetition review system
* Detailed progress analytics
* Priority access to new features

### B2B (Phase 2 — post product-market fit)
* Bulk licenses for language centers and schools
* Teacher dashboards with student progress tracking
* Custom content curation for institutions

### Cost Control
* AI costs are the primary variable expense. Target: AI cost per active user < 40% of subscription revenue.
* Aggressive caching, pre-computation, and model tiering are mandatory, not optional.

## 13.6) AI Cost Management

### Caching Strategy
* **Word explanations (frontend):** TanStack AI handles streaming responses. Common words can be pre-cached in the frontend to avoid repeated API calls.
* **Sentence simplifications (Python service):** Cache per CEFR level on the backend. If User A (B1) simplifies a sentence, User B (B1) gets the cached version.
* **Quiz answers (Python service):** Cache quiz questions for identical content to avoid regeneration.

### Rate Limiting
* Free tier: hard daily limits on AI calls (10 simplifications, 5 explanations, 3 quizzes).
* Premium tier: soft limits with abuse detection.
* Per-user daily cap to prevent runaway costs.
* **Frontend API keys must be protected** — use environment variables and provider-level rate limiting, not client-side secrets.

### Model Tiering
* **Tier 1 (cheap):** Word explanations, CEFR classification — use smaller models (GPT-4o-mini, Haiku).
* **Tier 2 (moderate):** Sentence simplification, quiz generation — use mid-tier models.
* **Tier 3 (expensive, rare):** Edge cases only — escalate to stronger models when user flags a poor simplification.

### Pre-computation
* Starter library content: pre-simplify all sentences at all 6 CEFR levels at ingest time. Zero runtime cost for curated content.

## 13.6) Technical Architecture

### Three-Tier Architecture

The system is split into three layers based on responsibility:

* **Frontend (TanStack Start)** — React-based full-stack application. Handles UI, routing, data fetching (TanStack Query), and **direct AI streaming calls** via TanStack AI for lightweight text features (word explanations, real-time text display).
* **Bun Service (Core Backend)** — Handles authentication, user management, reading sessions, vocabulary storage, progress tracking, quiz scoring, and all CRUD operations. Built with ElysiaJS on Bun. Elysia provides ergonomic, type-safe routing with Eden treaty for end-to-end type safety, plus native TypeScript execution without transpilation.
* **Python Service (AI/ML Backend)** — Handles complex AI tasks: sentence simplification, CEFR classification, and quiz generation. Built with FastAPI. Exposes REST endpoints that the Bun service calls. Managed with `uv` for fast dependency resolution and environment management.

### AI Call Routing

Not all AI calls go through the same path:

| Feature | Where It Runs | How |
|---|---|---|
| **Word explanation** | Frontend (TanStack AI) | Direct LLM API call with streaming response |
| **Sentence simplification** | Python service | Bun → FastAPI → LLM → structured JSON response |
| **CEFR classification** | Python service | Bun → FastAPI → LLM (on content upload) |
| **Quiz generation** | Python service | Bun → FastAPI → LLM (after reading session) |

**Why word explanations run in the frontend:** TanStack AI provides built-in streaming hooks (`useChat`, `useCompletion`) that render LLM responses token-by-token in real time. For word explanations, this gives instant, smooth UX without an extra backend hop. The frontend calls the LLM provider directly using TanStack AI's adapter system.

### Communication Flow

* **Frontend → LLM Provider:** TanStack AI calls LLM APIs directly for streaming text features (word explanations)
* **Frontend → Bun:** Standard REST API calls for data operations (auth, vocabulary, progress)
* **Bun → Python:** Internal HTTP requests for complex AI tasks (simplification, classification, quizzes)
* **Bun → Supabase:** Direct database operations via Supabase client or Bun's built-in database drivers

### Type Safety

* **Eden Treaty** — ElysiaJS provides Eden treaty for end-to-end type safety between frontend and backend
* Frontend can import the backend's API types directly, ensuring type-safe API calls without manual type definitions
* Changes to backend routes automatically propagate type updates to the frontend

### Database

* **Supabase (PostgreSQL)** — Single database for all application data
* Managed by the Bun service using Bun's built-in PostgreSQL driver or Supabase client
* Tables: users, reading_sessions, vocabulary, reviews, quizzes, content, progress
* Supabase provides auth, REST API, and real-time capabilities out of the box

### Frontend Stack

* **Framework:** TanStack Start (React + Vite + SSR)
* **Routing:** TanStack Router (type-safe, file-based)
* **Data Fetching:** TanStack Query (caching, background refetch)
* **AI Integration:** TanStack AI (streaming LLM responses, provider adapters, isomorphic tool definitions)
* **Forms:** TanStack Form
* **Styling:** (Team's choice — Tailwind CSS recommended)

**Framework-first principle:** The frontend should maximize use of TanStack's built-in capabilities before reaching for external libraries. TanStack Start already provides SSR, routing, data fetching, AI streaming, and form management as a cohesive ecosystem. External dependencies should only be added when TanStack does not provide an equivalent solution. This reduces bundle size, avoids version conflicts, and keeps the codebase consistent with a single design philosophy.

### Backend Stack (Bun)

* **Runtime:** Bun — native TypeScript execution, built-in PostgreSQL/Redis/SQLite drivers
* **Framework:** ElysiaJS — ergonomic, type-safe routing with Eden treaty for end-to-end type safety
* **Package Manager:** Bun (built-in, replaces npm/yarn/pnpm)
* **Key advantages:** No transpilation step, faster dev cycle, Eden treaty provides automatic type inference from backend routes to frontend

### Python Stack (uv)

* **Runtime:** Python 3.12+
* **Framework:** FastAPI
* **Package/Environment Manager:** `uv` — ultra-fast dependency resolution and environment management (replaces pip/venv/poetry)
* **Key advantages:** 10-100x faster than pip, single binary, lockfile support, workspace support

### AI Layer

* **Model Options:** GPT-OSS 120B via Azure Student Plan, or other free API-based models (Groq, Gemini free tier, OpenRouter free tier)
* TanStack AI provides adapter-based provider abstraction — swap models via config without code changes
* Fallback between providers if free tier rate limits are hit
* Streaming responses for word explanations via TanStack AI hooks

### Scope Note

This is a graduation project — it will not go to production. Architecture decisions prioritize developer experience and learning over production-scale concerns. Caching, task queues, and horizontal scaling are excluded unless proven necessary during development.

### Project Structure

* **Monorepo** — Single repository with three packages:
  * `frontend/` — TanStack Start application
  * `backend/` — Bun service (TypeScript)
  * `ai-service/` — Python FastAPI service
* Shared configuration at root level (CI, linting, environment templates)

### Authentication Flow

* **Supabase Auth** manages user authentication end-to-end
* Frontend authenticates users via Supabase SDK and receives a JWT
* JWT is passed to Bun in the `Authorization` header for all API requests
* Bun validates the JWT via Supabase before processing any request
* Python AI service receives no auth tokens — it only receives user context (user ID, CEFR level) from Bun when called internally
* No custom auth logic needed in any service

### Text Parsing

* **Frontend-based parsing** — Raw text is split into interactive sentence/word tokens on the client side
* Uses a JavaScript NLP library (e.g., `compromise` or `sbd`) for sentence boundary detection
* Handles edge cases: abbreviations, quotes, hyphenation
* No backend hop needed for rendering — text becomes interactive immediately after upload

### Type Sharing

* **Bun backend is the source of truth** — All shared types (User, ReadingSession, Vocabulary, etc.) are defined in the Bun service
* **Frontend imports directly** — Since both are TypeScript in the same monorepo, the frontend imports types from the backend package with no build step needed
* **Python gets Pydantic models only for cross-service types** — Types that cross the Bun ↔ Python boundary (request/response shapes for simplification, classification, quiz generation) are auto-generated into Python Pydantic models using `datamodel-code-generator`
* Python does **not** need types for auth, progress tracking, or frontend-specific shapes — only what it directly receives or returns
* Ensures API contracts between Bun ↔ Python stay in sync
* Changes to cross-service types trigger regeneration of Python models

### AI Error Handling

* **Graceful fallback strategy** for all AI features:
  * **Word explanation:** If AI call fails or times out, show a basic dictionary definition or Arabic translation from a fallback source. Retry once automatically.
  * **Sentence simplification:** If AI fails, show the original sentence with a message: "Simplification unavailable — try again." Retry once.
  * **Quiz generation:** If AI fails, skip the quiz for this session and allow the user to retry later.
* All AI errors are logged for debugging
* User-facing messages are friendly and non-technical

## 14) Functional Requirements

The system must support (MVP):

* user registration and login,
* level selection or assessment,
* text upload (paste or file),
* reading inside the app with interactive sentence/word tokens,
* sentence simplification on demand (level-aware),
* word explanation with Arabic support,
* automatic vocabulary saving,
* vocabulary review flow (spaced repetition),
* post-reading comprehension quizzes,
* basic progress tracking (sessions, words learned, streaks),
* content filtering by CEFR level,
* simplification quality feedback (👍/👎).

## 15) Non-Functional Requirements

* **Performance:** Fast loading and responsive interactions.
* **Availability:** Reliable uptime for reading sessions.
* **Security:** Secure authentication and data protection.
* **Reliability:** Consistent behavior across sessions.
* **Scalability:** Ability to handle growing users and content.
* **Usability:** Clean, intuitive interface for Arabic native users.

## 16) User Experience Requirements

The reading experience must be:

* fast,
* clean,
* distraction-free,
* easy for Arabic native users,
* interactive without breaking reading flow,
* readable on mobile and desktop.

## 17) Success Metrics

The product is successful if:

* **Engagement:** 60% of users complete at least 3 reading sessions per week.
* **Vocabulary:** Average user saves 15+ words per session and reviews 50%+ of saved words within 7 days.
* **Comprehension:** 70%+ pass rate on post-reading quizzes (indicates content is challenging but achievable).
* **Retention:** 40% of users return within 7 days of their first session.
* **Quality:** 80%+ positive rating (👍) on sentence simplifications.
* **Improvement:** Users who read 20+ sessions show measurable CEFR level improvement (validated by reassessment).

## 18) Key Differentiator

The main differentiator is not "books."
It is:
**read any content, tap anything difficult, and instantly get a simpler, level-aware learning experience without leaving the page.**

## 19) Main Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Simplification quality is poor | Critical | User feedback loop (👍/👎), prompt engineering iterations, fallback to Arabic translation if simplification fails |
| AI costs exceed revenue | High | Aggressive caching, rate limits, pre-computation, model tiering, hard daily caps |
| Vocabulary saving becomes noise | Medium | Smart word selection (only save words above user's level), let users unsave easily |
| No backend engineer on team | Critical | Reassign one AI engineer to full-stack, or recruit a backend developer immediately |
| Content licensing blocks marketplace | High | MVP uses user uploads + public domain only. Licensing strategy defined before marketplace launch |
| Scope creep delays graduation deadline | Critical | Strict MVP scope (5 features). Everything else is explicitly marked Future Scope |
| Users prefer existing tools (LingQ, etc.) | Medium | Double down on Arabic-specific features. No competitor targets Arabic→English specifically |
| Product becomes a generic reader with badges | Medium | Keep focus on adaptive reading. Defer gamification. Measure simplification quality as north-star KPI |

## 20) MVP Scope

The first version includes **only** these features:

1. **Account creation + level assessment** — sign up, select or test into CEFR level.
2. **Text upload + interactive reading view** — paste or upload text, render as interactive sentence/word tokens.
3. **Sentence simplification** — tap a sentence, get a level-aware simpler version. Original text preserved.
4. **Word explanation + auto vocabulary saving** — tap a word, get definition + Arabic support. Important words saved automatically.
5. **Basic progress tracking** — reading sessions, words learned, streaks.

**Supporting (required for MVP):**
* Vocabulary review flow (spaced repetition)
* Post-reading comprehension quizzes
* Simplification quality feedback (👍/👎)
* Starter library (public domain texts, pre-simplified)

## 21) Future Scope

Post-MVP features (prioritized):

**Phase 2 (next after MVP):**
* Marketplace with licensed content (requires licensing strategy)
* AI-driven book recommendations
* Filter-based book discovery (by level, topic, length)
* Offline reading for downloaded content
* Advanced spaced repetition with FSRS algorithm

**Phase 3:**
* AI book discovery chatbot
* Kids Mode (separate UX, content, safety compliance)
* Teacher dashboards
* School / language center B2B features
* Voice reading support
* Pronunciation feedback
* Smarter level adaptation (dynamic, not just initial assessment)
* Broader content library
* Arabic→English learner-specific features (false friends database, common mistake patterns)

## 22) Final Product Definition

Book Nest is an adaptive reading platform for Arabic native English learners that helps users understand real English content by simplifying difficult text, explaining vocabulary in context with Arabic support, and saving words automatically for later review — all inside a reactive reading experience. Powered by AI for sentence simplification, word explanation, CEFR classification, and comprehension assessment, Book Nest's core differentiator is its Arabic-specific focus: no other reading platform is built specifically for the challenges Arabic speakers face when learning English.
