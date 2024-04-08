import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://qxdajbzukrvnpwyapyfh.supabase.co';

const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4ZGFqYnp1a3J2bnB3eWFweWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTc1MzQsImV4cCI6MjAyODEzMzUzNH0.gcFrcI1q1gsiDBtnWlAh9tzEM0utB94zG01dOvubAXo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
