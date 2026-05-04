-- Simple migration script for Supabase SQL Editor
-- Run this in Supabase Dashboard → SQL Editor

-- Add total_site_time_seconds column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS total_site_time_seconds INTEGER DEFAULT 0;

-- Add comment for documentation
COMMENT ON COLUMN profiles.total_site_time_seconds IS 'Total time spent on website in seconds (accumulated)';
