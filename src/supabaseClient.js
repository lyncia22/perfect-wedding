import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gktfozlufwoglivxmjgm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdGZvemx1ZndvZ2xpdnhtamdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTMyMjksImV4cCI6MjA2OTI2OTIyOX0._KAmjGgBzaBvFmE34yFWhPmxW-Lv2wTxZMuZHdWgiJo';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
