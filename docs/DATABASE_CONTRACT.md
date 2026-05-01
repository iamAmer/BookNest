# BookNest Database Contract

## Overview
This document outlines the database structure and integration rules for the BookNest platform using Supabase. The schema supports adaptive reading, vocabulary management, progress tracking, file storage for book covers and content, with a focus on security and scalability.

## 1. Authentication & User Management
BookNest uses **Supabase Auth** for identity management.

- **Internal Table**: `auth.users` (managed by Supabase)
- **Custom Table**: `auth_users` (email, password_hash, full_name, is_admin, is_active)
- **Public Extension**: `public.profiles`
    - Stores CEFR level, full name, email, avatar, bio, and admin status
    - **Columns**: `id`, `email`, `full_name`, `cefr_level`, `avatar_url`, `bio`, `is_admin`, `created_at`, `updated_at`
    - `is_admin` (BOOLEAN, default FALSE) — controls access to admin endpoints and UI

## 2. Core Data Models

### Library System
- **`categories`**: Defines genres and reading levels (Fiction, History, Kids, etc.)
- **`books`**: Stores reading material metadata
    - **Key columns**: `id`, `title`, `author`, `category`, `difficulty` (A1-C2), `description`, `content`, `content_url`, `cover_image_url`, `total_pages`, `rating`, `views`
    - `cover_image_url` — public URL to cover image in Supabase Storage (`books/covers/`)
    - `content_url` — public URL to book content in Supabase Storage (`books/content/`)

### Supabase Storage
- **Bucket**: `books` (public)
- **Folder structure**:
    - `covers/` — Book cover images (JPG, PNG, WebP, GIF)
    - `content/` — Book content files (PDF, EPUB, max 10MB)
- **RLS Policies** (defined in `backend/db/schema.sql`):
    - `Public read access` — anyone can SELECT
    - `Authenticated users can upload` — INSERT with auth
    - `Authenticated users can update` — UPDATE with auth
    - `Authenticated users can delete` — DELETE with auth

### User Interaction
- **`user_progress`**: Real-time reading session tracking (`current_page`, `time_spent`, completion status)
- **`vocabulary`**: Personal word bank with `mastery_level` and `last_reviewed` for spaced repetition
- **`notes`**: User annotations and highlights linked to books and pages

### Assessment & Gamification
- **`quiz_results`**: Historical quiz records with JSON answers and percentage scores
- **`achievements`**: System-defined milestones
- **`user_achievements`**: User-to-achievement mapping

## 3. Security & Access Control (RLS)

| Table | Policy | Access Level |
|-------|--------|--------------|
| `profiles` | `Public Read` | Everyone can see names; only owners/admins can update |
| `books` | `Public Read` | All users can browse the library |
| `categories` | `Public Read` | All users can see categories |
| `user_progress` | `Private` | Users can only see/edit their own progress |
| `vocabulary` | `Private` | Users can only see/edit their own word bank |
| `notes` | `Private` | Users can only see/edit their own annotations |
| `quiz_results` | `Private` | Users can only see their own scores |
| `achievements` | `Public Read` | Everyone can see available achievements |
| `storage.books` | `Public Read, Auth Write` | Anyone can view files; authenticated users can upload/delete |

## 4. Automation & Triggers

1. **`handle_new_user()`**: Syncs `auth.users` metadata into the `profiles` table
2. **`handle_updated_at()`**: Automatically updates `updated_at` on modification for `profiles`, `books`, `notes`, and `progress`

## 5. File Upload Flow

1. Admin creates book metadata via `POST /api/admin/books`
2. Backend creates record in `books` table, returns `id`
3. Admin uploads cover via `POST /api/books/:id/upload-cover`
   - Multer stores file in memory
   - Backend uploads to Supabase Storage at `covers/{id}.{ext}`
   - Storage returns public URL
   - DB `cover_image_url` column updated automatically
4. Admin uploads content via `POST /api/books/:id/upload-content`
   - Same flow, stored at `content/{id}.{ext}`
   - DB `content_url` column updated

## 6. Maintenance Guidelines

- **Migrations**: Always use `backend/db/schema.sql` as the source of truth. New migrations go in `backend/db/migrations/`
- **Indices**: Performance indices on `user_id`, `book_id`, `category`, `difficulty`, `email`
- **JSON Fields**: `answers` and `criteria_json` stored as `jsonb` for schema flexibility
- **Storage**: Use Supabase Storage for files, not local disk. All file URLs are public and stored in the DB
