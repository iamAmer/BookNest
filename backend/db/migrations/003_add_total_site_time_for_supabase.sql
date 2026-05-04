-- Run this in Supabase Dashboard → SQL Editor
-- This adds website time tracking to profiles table

-- Add the column (safe to run multiple times)
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS total_site_time_seconds INTEGER DEFAULT 0;

-- Add comment for documentation
COMMENT ON COLUMN profiles.total_site_time_seconds IS 'Total time spent on website in seconds (accumulated)';

-- Verify the column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'total_site_time_seconds';
