import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

// Get environment variables or use the fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://llupvsfyzmuknstajibw.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdXB2c2Z5em11a25zdGFqaWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTc5NzgsImV4cCI6MjA1ODk5Mzk3OH0.M94YgQK15aeuxGat1sx7GylSko_oNXDZ9dW-Gi8K9Ew";

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Test connection
supabase.from('products').select('count').limit(1).then(({ data, error }) => {
  if (error) {
    console.error('Error connecting to Supabase:', error);
  } else {
    console.log('Successfully connected to Supabase');
  }
});

console.log('Supabase client initialized with URL:', supabaseUrl);