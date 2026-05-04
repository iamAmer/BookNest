-- Simple migration script for Supabase SQL Editor
-- Run this in Supabase Dashboard → SQL Editor

-- Add reading goal column (number of books to read this year)
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS reading_goal INTEGER DEFAULT 12,
ADD COLUMN IF NOT EXISTS reading_goal_year INTEGER DEFAULT EXTRACT(YEAR FROM NOW());

-- Add comments for documentation
COMMENT ON COLUMN profiles.reading_goal IS 'Number of books user aims to read this year';
COMMENT ON COLUMN profiles.reading_goal_year IS 'Year this reading goal applies to';

-- Try to add constraints (will fail silently if they already exist)
DO $$
BEGIN
  -- Add positive goal constraint
  BEGIN
    ALTER TABLE profiles 
    ADD CONSTRAINT check_reading_goal_positive 
    CHECK (reading_goal IS NULL OR reading_goal > 0);
  EXCEPTION WHEN others THEN
    NULL; -- Constraint already exists, ignore
  END;
  
  -- Add reasonable goal constraint  
  BEGIN
    ALTER TABLE profiles 
    ADD CONSTRAINT check_reading_goal_reasonable 
    CHECK (reading_goal IS NULL OR reading_goal <= 365);
  EXCEPTION WHEN others THEN
    NULL; -- Constraint already exists, ignore
  END;
END
$$;
