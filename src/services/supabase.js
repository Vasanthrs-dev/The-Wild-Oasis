import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://wvkahthxmzljtxlvzety.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2a2FodGh4bXpsanR4bHZ6ZXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDk2MjksImV4cCI6MjA0ODcyNTYyOX0.eyoaGP1VPPmd_kbKzH8-Hzfo-YGHIbWUzzdyyP69zsY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
