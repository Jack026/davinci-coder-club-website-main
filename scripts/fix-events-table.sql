-- Fix events table structure
-- Run this in Supabase SQL Editor

-- First, let's see the current events table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'events' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Add event_type column if it doesn't exist, or make it nullable
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS event_type TEXT DEFAULT 'workshop';

-- If event_type already exists but is NOT NULL, make it nullable or add default
ALTER TABLE events 
ALTER COLUMN event_type SET DEFAULT 'workshop',
ALTER COLUMN event_type DROP NOT NULL;

-- Add any other missing columns
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS max_participants INTEGER,
ADD COLUMN IF NOT EXISTS current_participants INTEGER DEFAULT 0;

-- Test inserting an event with all required fields
INSERT INTO events (
  title, 
  date, 
  status, 
  current_participants, 
  tags,
  event_type
) VALUES (
  'Test Event', 
  NOW(), 
  'upcoming', 
  0, 
  ARRAY['test'],
  'workshop'
) ON CONFLICT DO NOTHING;

-- Verify the test event was created
SELECT * FROM events WHERE title = 'Test Event';

-- Clean up test data
DELETE FROM events WHERE title = 'Test Event';

-- Show final table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'events' 
  AND table_schema = 'public'
ORDER BY ordinal_position; 