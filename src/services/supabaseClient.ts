import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseUrl.endsWith('/rest/v1/')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
}
if (supabaseUrl && supabaseUrl.endsWith('/')) {
  supabaseUrl = supabaseUrl.slice(0, -1);
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
