-- Add sample team members to test the functionality
-- Run this in your Supabase SQL Editor

INSERT INTO team_members (name, position, role, department, year, skills, projects, contributions, status, github, linkedin, email, bio, image_url) VALUES
('Jack026', 'Lead Developer', 'president', 'Computer Science', 'senior', ARRAY['React', 'Node.js', 'Python', 'AI/ML'], 25, 150, 'active', 'https://github.com/jack026', 'https://linkedin.com/in/jack026', 'jack026@davincicoders.adtu.ac.in', 'Lead developer and innovation architect. Passionate about building the future of technology.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'),
('Sarah Chen', 'Vice President', 'vice-president', 'Information Technology', 'senior', ARRAY['JavaScript', 'React', 'UI/UX'], 18, 120, 'active', 'https://github.com/sarahchen', 'https://linkedin.com/in/sarahchen', 'sarah.chen@davincicoders.adtu.ac.in', 'Creative problem solver with expertise in user experience design.', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'),
('Alex Kumar', 'Tech Lead', 'tech-lead', 'Computer Science', 'junior', ARRAY['Python', 'Django', 'AWS'], 12, 85, 'active', 'https://github.com/alexkumar', 'https://linkedin.com/in/alexkumar', 'alex.kumar@davincicoders.adtu.ac.in', 'Backend specialist with a passion for scalable architecture.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'),
('Emma Wilson', 'Design Lead', 'design-lead', 'Design', 'sophomore', ARRAY['Figma', 'Adobe Creative Suite', 'UI/UX'], 8, 65, 'active', 'https://github.com/emmawilson', 'https://linkedin.com/in/emmawilson', 'emma.wilson@davincicoders.adtu.ac.in', 'Creative designer focused on user-centered design solutions.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'),
('Mike Rodriguez', 'Core Member', 'core', 'Electronics', 'junior', ARRAY['Arduino', 'IoT', 'C++'], 10, 75, 'active', 'https://github.com/mikerodriguez', 'https://linkedin.com/in/mikerodriguez', 'mike.rodriguez@davincicoders.adtu.ac.in', 'Hardware enthusiast with expertise in embedded systems.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'),
('Priya Patel', 'Core Member', 'core', 'Computer Science', 'freshman', ARRAY['Java', 'Spring Boot', 'MySQL'], 6, 45, 'active', 'https://github.com/priyapatel', 'https://linkedin.com/in/priyapatel', 'priya.patel@davincicoders.adtu.ac.in', 'Full-stack developer with a love for clean code and efficient solutions.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'),
('David Kim', 'Member', 'member', 'Information Technology', 'sophomore', ARRAY['JavaScript', 'Vue.js', 'Firebase'], 4, 35, 'active', 'https://github.com/davidkim', 'https://linkedin.com/in/davidkim', 'david.kim@davincicoders.adtu.ac.in', 'Frontend developer passionate about modern web technologies.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'),
('Lisa Zhang', 'Member', 'member', 'Computer Science', 'freshman', ARRAY['Python', 'Data Science', 'Machine Learning'], 3, 25, 'active', 'https://github.com/lisazhang', 'https://linkedin.com/in/lisazhang', 'lisa.zhang@davincicoders.adtu.ac.in', 'Data science enthusiast exploring the world of AI and machine learning.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face');

-- Update profiles table to mark Jack026
INSERT INTO profiles (id, full_name, email, username, is_Jack026, github_url, linkedin_url) VALUES
(gen_random_uuid(), 'Jack026', 'jack026@davincicoders.adtu.ac.in', 'jack026', true, 'https://github.com/jack026', 'https://linkedin.com/in/jack026')
ON CONFLICT (email) DO UPDATE SET
  is_Jack026 = true,
  github_url = EXCLUDED.github_url,
  linkedin_url = EXCLUDED.linkedin_url;

-- Success message
SELECT 'Sample team members added successfully!' as status; 