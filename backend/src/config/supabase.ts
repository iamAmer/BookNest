import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Use service role key for backend operations if available (for RLS bypass), otherwise use anon key
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Prefer service role key for backend operations, fall back to anon key
const supabaseKey = supabaseServiceRoleKey || supabaseAnonKey;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or key is missing. Supabase client may not function correctly.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
