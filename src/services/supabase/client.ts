import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fxqmssgttwngvywonene.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cW1zc2d0dHduZ3Z5d29uZW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNjQ2MTIsImV4cCI6MjA0ODg0MDYxMn0.sNAFJBMs4W-ivzn63deO0GHNHJ2A3zQQ0xVozjauZlU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 