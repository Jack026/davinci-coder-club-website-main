-- Test database tables and permissions
-- Run this in Supabase SQL Editor to check if everything is set up correctly

-- Check if tables exist
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('events', 'team_members', 'projects', 'resources', 'contact_messages', 'newsletter_subscribers', 'admin_users', 'profiles')
ORDER BY table_name;

-- Check table structure for events
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'events' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN ('events', 'team_members', 'projects', 'resources')
ORDER BY tablename, policyname;

-- Test inserting a simple event (this should work if RLS is disabled)
INSERT INTO events (title, date, status, current_participants, tags) 
VALUES ('Test Event', NOW(), 'upcoming', 0, ARRAY['test'])
ON CONFLICT DO NOTHING;

-- Check if the test event was inserted
SELECT * FROM events WHERE title = 'Test Event';

-- Clean up test data
DELETE FROM events WHERE title = 'Test Event'; 