
import { createClient } from '@supabase/supabase-js';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9remlneWJ4eXNicnBmdWtieXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNDgyMzUsImV4cCI6MjA1MDgyNDIzNX0.FprW0H7SjYJTNSoPHe17CwWGAAIwCu7n6wUSVV2xDEo';
const supabaseUrl = 'https://okzigybxysbrpfukbyyb.supabase.co';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export { supabaseUrl };