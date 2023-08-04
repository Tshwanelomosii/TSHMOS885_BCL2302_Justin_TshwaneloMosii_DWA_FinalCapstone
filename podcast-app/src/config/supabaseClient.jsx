import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yqewaikqkkuwylgkncjy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZXdhaWtxa2t1d3lsZ2tuY2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTExNTI0NjUsImV4cCI6MjAwNjcyODQ2NX0.8ftxZP1TusCRUv_y2nQ0uLJI09HPmyUe-s6AlGnLd3k'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase