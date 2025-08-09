-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  is_Jack026 BOOLEAN DEFAULT FALSE,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  position TEXT,
  role TEXT DEFAULT 'member',
  department TEXT,
  year TEXT,
  skills TEXT[] DEFAULT '{}',
  projects INTEGER DEFAULT 0,
  contributions INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  github TEXT,
  linkedin TEXT,
  email TEXT,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'upcoming',
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  contributors TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active',
  difficulty TEXT DEFAULT 'intermediate',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'tutorial',
  url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  difficulty TEXT DEFAULT 'beginner',
  category TEXT,
  author TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin',
  permissions TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Team members policies
CREATE POLICY "Team members are viewable by everyone" ON team_members
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage team members" ON team_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE profile_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Events policies
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE profile_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Projects policies
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE profile_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Resources policies
CREATE POLICY "Resources are viewable by everyone" ON resources
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage resources" ON resources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE profile_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Contact messages policies
CREATE POLICY "Admins can view contact messages" ON contact_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE profile_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Newsletter subscribers policies
CREATE POLICY "Admins can view newsletter subscribers" ON newsletter_subscribers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE profile_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can insert newsletter subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Admin users policies
CREATE POLICY "Admins can view admin users" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE profile_id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Super admins can manage admin users" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE profile_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Create functions for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (Jack026)
INSERT INTO profiles (id, full_name, email, username, is_Jack026, github_url, linkedin_url, portfolio_url, bio)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Jack026',
  'admin@davinci-coder-club.com',
  'jack026',
  TRUE,
  'https://github.com/jack026',
  'https://linkedin.com/in/jack026',
  'https://jack026.dev',
  'Founder and Lead Developer of DaVinci Coder Club'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO admin_users (profile_id, role, permissions)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin',
  ARRAY['manage_team', 'manage_events', 'manage_projects', 'manage_resources', 'view_analytics', 'manage_admins']
) ON CONFLICT DO NOTHING; 