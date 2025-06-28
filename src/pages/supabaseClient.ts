import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qvnrpdeizutbammehcms.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2bnJwZGVpenV0YmFtbWVoY21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Njg3OTAsImV4cCI6MjA2NjU0NDc5MH0.YYLEXCbRs98rrfyyyN8ep-fdSKCl0QSDvsLrrCitzO4'

export const supabase = createClient(supabaseUrl, supabaseKey)
