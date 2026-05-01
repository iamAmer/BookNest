# BookNest Database Contract

## Overview
This document outlines the database structure and integration rules for the BookNest platform using Supabase. The schema is designed to support adaptive reading, vocabulary management, and progress tracking with a focus on security and scalability.

## 1. Authentication & User Management
BookNest leverages **Supabase Auth** for identity management.

- **Internal Table**: `auth.users` (managed by Supabase)
- **Public Extension**: `public.profiles`
    - Automatically created upon user signup via a database trigger.
    - Stores CEFR level, full name, and avatar.
    - **Trigger**: `on_auth_user_created` calls `handle_new_user()`.

## 2. Core Data Models

### Library System
- **`categories`**: Defines the genres and reading levels available (e.g., Fiction, History, Kids).
- **`books`**: Stores the metadata for reading material, including difficulty (CEFR), content references, and ratings.

### User Interaction
- **`user_progress`**: Real-time tracking of reading sessions. Stores `current_page`, `time_spent`, and completion status.
- **`vocabulary`**: A personal word bank for each user. Includes `mastery_level` and `last_reviewed` for future spaced-repetition implementation.
- **`notes`**: User-generated annotations and highlights linked to specific books and pages.

### Assessment & Gamification
- **`quiz_results`**: Historical record of comprehension assessments, storing JSON-formatted answers and percentage scores.
- **`achievements`**: System-defined milestones (e.g., "First Book Read").
- **`user_achievements`**: Mapping of users to their earned badges.

## 3. Security & Access Control (RLS)
Row Level Security is enabled on all tables to ensure data privacy.

| Table | Policy | Access Level |
|-------|--------|--------------|
| `profiles` | `Public Read` | Everyone can see names; only owners can update. |
| `books` | `Public Read` | All users can browse the library. |
| `categories` | `Public Read` | All users can see categories. |
| `user_progress` | `Private` | Users can only see/edit their own progress. |
| `vocabulary` | `Private` | Users can only see/edit their own word bank. |
| `notes` | `Private` | Users can only see/edit their own annotations. |
| `quiz_results` | `Private` | Users can only see their own scores. |
| `achievements`| `Public Read` | Everyone can see available achievements. |

## 4. Automation & Triggers
To maintain data integrity and reduce backend logic complexity, the following automations are implemented at the database level:

1. **`handle_new_user()`**: syncs `auth.users` metadata into the `profiles` table.
2. **`handle_updated_at()`**: automatically updates the `updated_at` timestamp on record modification for `profiles`, `books`, `notes`, and `progress`.

## 5. Maintenance Guidelines
- **Migrations**: Always use the provided `supabase_schema.sql` as the source of truth for new environments.
- **Indices**: Performance indices are placed on `user_id`, `book_id`, and `category` to ensure fast retrieval during high-traffic sessions.
- **JSON Fields**: The `answers` and `criteria_json` fields are stored as `jsonb` to allow for schema flexibility as quiz formats evolve.
