import { createClient } from '@supabase/supabase-js';

// Using placeholder values if env vars are missing to prevent build errors
// Actual functionality requires these to be set in Vercel project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials missing. Verification portal will not function correctly.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
