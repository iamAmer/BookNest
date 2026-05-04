-- Migration: Add reading goal fields to profiles table
-- This allows users to set a yearly reading goal

-- Add reading goal column (number of books to read this year)
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS reading_goal INTEGER DEFAULT 12,
ADD COLUMN IF NOT EXISTS reading_goal_year INTEGER DEFAULT EXTRACT(YEAR FROM NOW());

-- Add comments for documentation
COMMENT ON COLUMN profiles.reading_goal IS 'Number of books user aims to read this year';
COMMENT ON COLUMN profiles.reading_goal_year IS 'Year this reading goal applies to';

-- Add constraint to ensure reasonable goals (with existence check)
DO $$
BEGIN
  -- Check and add positive goal constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'check_reading_goal_positive' 
    AND conrelid = 'profiles'::regclass
  ) THEN
    ALTER TABLE profiles 
    ADD CONSTRAINT check_reading_goal_positive 
    CHECK (reading_goal IS NULL OR reading_goal > 0);
  END IF;

  -- Check and add reasonable goal constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'check_reading_goal_reasonable' 
    AND conrelid = 'profiles'::regclass
  ) THEN
    ALTER TABLE profiles 
    ADD CONSTRAINT check_reading_goal_reasonable 
    CHECK (reading_goal IS NULL OR reading_goal <= 365);
  END IF;
END
$$;
