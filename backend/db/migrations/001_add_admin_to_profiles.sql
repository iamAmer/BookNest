-- Migration: Add is_admin and email to profiles table
-- Run this in Supabase SQL Editor

-- Add is_admin column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Add email column to profiles (if not exists)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Optional: Populate email from Supabase Auth for existing users
-- Note: This requires a Supabase Edge Function or manual update
-- since we can't directly join with auth.users from SQL Editor

-- To make a specific user admin, run:
-- UPDATE profiles SET is_admin = true WHERE email = 'admin@booknest.com';
