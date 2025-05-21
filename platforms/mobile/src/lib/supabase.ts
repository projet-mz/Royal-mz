import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yjpgggnltnomvvvugoni.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcGdnZ25sdG5vbXZ2dnVnb25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODk3OTMsImV4cCI6MjA2MzM2NTc5M30.ObQvX1RHa31OvxinqkWFmduuv_uo4UgPntjmeZx-I5M';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
