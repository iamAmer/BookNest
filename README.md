# Book Nest

An adaptive reading platform for Arabic native English learners. Book Nest helps users understand real English content by simplifying difficult text, explaining vocabulary in context with Arabic support, and saving words automatically for later review.

## Architecture

This is a monorepo with three services:

- **frontend/** — TanStack Start (React + Vite + SSR) with TanStack Router, Query, AI, and Form
- **backend/** — Bun service with ElysiaJS for API, auth, and database operations (Eden treaty for end-to-end type safety)
- **ai-service/** — Python FastAPI service for AI/ML tasks (sentence simplification, CEFR classification, quiz generation)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | TanStack Start, React, Vite, Tailwind CSS |
| Backend | Bun, ElysiaJS, TypeScript |
| AI Service | Python, FastAPI, uv |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI Models | GPT-OSS via Azure, or free-tier alternatives (Groq, Gemini, OpenRouter) |

## Getting Started

### Prerequisites

- Bun (for frontend and backend)
- Python 3.12+ with uv (for AI service)
- Supabase project (for database and auth)

### Frontend

```bash
cd frontend
bun install
bun dev
```

### Backend

```bash
cd backend
bun install
bun dev
```

### AI Service

```bash
cd ai-service
uv sync
uv run uvicorn app.main:app --reload
```

## Project Structure

```
BookNest/
├── frontend/          # TanStack Start application
│   └── src/
├── backend/           # Bun/Hono API service
│   └── src/
│       ├── db/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       ├── types/
│       └── utils/
├── ai-service/        # Python FastAPI AI service
│   └── app/
│       ├── providers/
│       ├── services/
│       └── utils/
└── docs/
    └── PRD.md
```

## Team

- Amina Saeed — Frontend Developer
- Yasmina Mohamed — Frontend Developer
- Abdulrahman Atef — AI & ML Engineer
- Ahmed Nabil — AI & ML Engineer
- Shawkat Elgrwany — UI/UX Designer

## License

This is a graduation project for EELU (The Egyptian E-Learning University), Academic Year 2025–2026.
