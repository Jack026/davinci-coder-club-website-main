# 🧾 DaVinci Coder Club Website

**📌 Project Title:** DaVinci Coder Club – Official Website for ADTU  
**🧑‍💻 Author:** Sourav Jyoti Sahariah (Jack026)  
**🔧 Built With:** Next.js, TypeScript, Tailwind CSS, Supabase  
**📅 Phase 1 Completed:** 2025-01-07 13:23:14 UTC

## 🎯 Project Overview

The DaVinci Coder Club website is a modern, SEO-optimized, and mobile-responsive platform representing the student-led tech community at Assam down town University (ADTU). 

## ⚙️ Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables
- **Backend/Database:** Supabase
- **Icons:** Lucide React + React Icons + FontAwesome
- **Animations:** Framer Motion
- **Hosting:** Vercel (recommended)

## 🚀 Phase 1: Setup Complete ✅

### What's Included:
- ✅ Next.js 14 with TypeScript configuration
- ✅ Tailwind CSS with custom design system
- ✅ Supabase client setup and type definitions
- ✅ Project structure and routing
- ✅ Environment configuration
- ✅ ESLint and development tools
- ✅ Custom CSS variables and theme
- ✅ Utility functions and type definitions

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Quick Start

1. **Clone and Install**
```bash
git clone <repository-url>
cd davinci-coder-club-website
npm install
```

2. **Environment Setup**
```bash
cp .env.local.example .env.local
```

3. **Configure Supabase**
- Create a new project at [supabase.com](https://supabase.com)
- Copy your project URL and anon key to `.env.local`

4. **Run Development Server**
```bash
npm run dev
```

5. **Open Browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
davinci-coder-club-website/
├── app/                  # Next.js 14 App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # Reusable components (Phase 2+)
├── lib/                 # Utility functions
│   ├── supabase.ts     # Supabase client
│   └── utils.ts        # Helper functions
├── types/              # TypeScript definitions
│   └── index.ts        # Global types
├── public/             # Static assets
├── styles/             # Additional styles
└── README.md           # This file
```

## 🗃️ Database Schema (Supabase)

### Tables to be created in Phase 4+:

```sql
-- Events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table  
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  contributors TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  skills TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 📱 Development Phases

- [x] **Phase 1:** Project Setup & Configuration
- [ ] **Phase 2:** Home Page Development  
- [ ] **Phase 3:** About Page Development
- [ ] **Phase 4:** Events Page with Supabase Integration
- [ ] **Phase 5:** Projects Showcase
- [ ] **Phase 6:** Resources Page
- [ ] **Phase 7:** Team Members
- [ ] **Phase 8:** Contact Page
- [ ] **Phase 9:** Admin Dashboard
- [ ] **Phase 10:** 404 & Polish

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-500: #6366f1    /* Main brand color */
--secondary-500: #f43f5e  /* Accent color */
--accent-500: #06b6d4     /* Supporting color */

/* Background Colors */
--bg-primary: #0f0f23     /* Main dark background */
--bg-secondary: #161625   /* Card backgrounds */
--bg-glass: rgba(255, 255, 255, 0.05)  /* Glass morphism */
```

### Typography
- **Primary:** Inter (system font stack)
- **Monospace:** Fira Code
- **Display:** Inter

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 👤 Author Information

**Sourav Jyoti Sahariah (Jack026)**
- **GitHub:** [@jack026](https://github.com/jack026)
- **LinkedIn:** [sourav-jyoti-sahariah](https://linkedin.com/in/sourav-jyoti-sahariah)
- **Portfolio:** [souravjyotisahariah.site](https://souravjyotisahariah.site)

## 📄 License

This project is created for the DaVinci Coder Club at ADTU.

## 🙏 Acknowledgments

- DaVinci Coder Club Community
- Assam down town University (ADTU)
- Next.js Team
- Supabase Team
- Tailwind CSS Team

---

> **Note:** Phase 1 is complete! Ready to move to Phase 2 (Home Page Development).  
> "This website represents the spirit of DaVinci: creativity, logic, and curiosity." 🚀

