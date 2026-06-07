const SUPABASE_URL = 'https://enslcxlgzvziqfduimzh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuc2xjeGxnenZ6aXFmZHVpbXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3ODM2NDQsImV4cCI6MjA5NjM1OTY0NH0.pjxnUZfy2fkGtQ19YsGroxVT1dWZkq6iK3Zd94jVOH8'; // ← pega aquí la clave anon completa

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);