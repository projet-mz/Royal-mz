import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yjpgggnltnomvvvugoni.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcGdnZ25sdG5vbXZ2dnVnb25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODk3OTMsImV4cCI6MjA2MzM2NTc5M30.ObQvX1RHa31OvxinqkWFmduuv_uo4UgPntjmeZx-I5M';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://yjpgggnltnomvvvugoni.supabase.co",
    },
  },
});
