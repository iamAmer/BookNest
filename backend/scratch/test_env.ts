import 'dotenv/config';
console.log('Node version:', process.version);
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Loaded' : 'Not Loaded');
