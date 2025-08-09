-- Add Sample Team Members for DaVinci Coder Club
-- Run this in your Supabase SQL Editor after setting up the database

-- Sample Team Members
INSERT INTO team_members (name, position, role, department, year, skills, projects, contributions, status, github, linkedin, email, bio) VALUES
(
  'John Doe',
  'Full Stack Developer',
  'president',
  'Computer Science',
  '2024',
  ARRAY['React', 'Node.js', 'Python', 'MongoDB'],
  15,
  45,
  'active',
  'https://github.com/johndoe',
  'https://linkedin.com/in/johndoe',
  'john.doe@example.com',
  'Passionate full-stack developer with expertise in modern web technologies. Leading the DaVinci Coder Club with innovative projects and mentorship.'
),
(
  'Jane Smith',
  'UI/UX Designer',
  'vice-president',
  'Design',
  '2024',
  ARRAY['Figma', 'Adobe XD', 'React', 'CSS'],
  12,
  38,
  'active',
  'https://github.com/janesmith',
  'https://linkedin.com/in/janesmith',
  'jane.smith@example.com',
  'Creative UI/UX designer focused on creating beautiful and functional user experiences. Specializes in design systems and user research.'
),
(
  'Mike Johnson',
  'Backend Developer',
  'tech-lead',
  'Information Technology',
  '2024',
  ARRAY['Python', 'Django', 'PostgreSQL', 'Docker'],
  20,
  52,
  'active',
  'https://github.com/mikejohnson',
  'https://linkedin.com/in/mikejohnson',
  'mike.johnson@example.com',
  'Backend specialist with deep knowledge of scalable architectures and database design. Loves solving complex technical challenges.'
),
(
  'Sarah Wilson',
  'Mobile Developer',
  'core',
  'Computer Science',
  '2024',
  ARRAY['Flutter', 'React Native', 'Firebase', 'Dart'],
  8,
  25,
  'active',
  'https://github.com/sarahwilson',
  'https://linkedin.com/in/sarahwilson',
  'sarah.wilson@example.com',
  'Mobile development enthusiast with experience in cross-platform development. Passionate about creating intuitive mobile experiences.'
),
(
  'Alex Chen',
  'Data Scientist',
  'member',
  'Computer Science',
  '2024',
  ARRAY['Python', 'TensorFlow', 'Pandas', 'Machine Learning'],
  6,
  18,
  'active',
  'https://github.com/alexchen',
  'https://linkedin.com/in/alexchen',
  'alex.chen@example.com',
  'Data science enthusiast working on AI and machine learning projects. Interested in applying ML to real-world problems.'
),
(
  'Emily Brown',
  'Frontend Developer',
  'member',
  'Information Technology',
  '2024',
  ARRAY['JavaScript', 'Vue.js', 'Tailwind CSS', 'TypeScript'],
  10,
  30,
  'active',
  'https://github.com/emilybrown',
  'https://linkedin.com/in/emilybrown',
  'emily.brown@example.com',
  'Frontend developer with a keen eye for detail and user experience. Loves creating responsive and accessible web applications.'
),
(
  'David Lee',
  'DevOps Engineer',
  'member',
  'Information Technology',
  '2024',
  ARRAY['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  7,
  22,
  'active',
  'https://github.com/davidlee',
  'https://linkedin.com/in/davidlee',
  'david.lee@example.com',
  'DevOps engineer focused on automation and infrastructure. Passionate about making development workflows more efficient.'
),
(
  'Lisa Wang',
  'Product Manager',
  'secretary',
  'Management',
  '2024',
  ARRAY['Product Strategy', 'Agile', 'User Research', 'Analytics'],
  5,
  15,
  'active',
  'https://github.com/lisawang',
  'https://linkedin.com/in/lisawang',
  'lisa.wang@example.com',
  'Product manager with experience in leading cross-functional teams. Focuses on user-centered design and data-driven decisions.'
);

-- Success message
SELECT 'Sample team members added successfully! 🎉' as status; 