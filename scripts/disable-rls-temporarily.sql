-- Temporarily disable RLS for testing
-- Run this in Supabase SQL Editor if you're getting permission errors

-- Disable RLS on events table
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- Disable RLS on team_members table  
ALTER TABLE team_members DISABLE ROW LEVEL SECURITY;

-- Disable RLS on projects table
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Disable RLS on resources table
ALTER TABLE resources DISABLE ROW LEVEL SECURITY;

-- Disable RLS on contact_messages table
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Disable RLS on newsletter_subscribers table
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;

-- Disable RLS on admin_users table
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Disable RLS on profiles table
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- To re-enable RLS later, run:
-- ALTER TABLE events ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY; 