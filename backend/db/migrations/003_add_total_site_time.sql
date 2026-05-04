-- Migration: Add total site time tracking to profiles table
-- Tracks total time user spends on the website

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS total_site_time_seconds INTEGER DEFAULT 0;

COMMENT ON COLUMN profiles.total_site_time_seconds IS 'Total time spent on website in seconds (accumulated)';
