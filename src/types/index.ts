// Global types for the DaVinci Coder Club website

export interface Event {
    id: string
    title: string
    description: string
    date: string
    location: string
    image_url?: string
    created_at: string
    updated_at: string
  }
  
  export interface Project {
    id: string
    title: string
    description: string
    tech_stack: string[]
    github_url?: string
    live_url?: string
    image_url?: string
    contributors: string[]
    created_at: string
    updated_at: string
  }
  
  export interface TeamMember {
    id: string
    name: string
    role: string
    bio: string
    image_url?: string
    github_url?: string
    linkedin_url?: string
    portfolio_url?: string
    skills: string[]
    created_at: string
    updated_at: string
  }
  
  export interface Resource {
    id: string
    title: string
    description: string
    type: 'tutorial' | 'video' | 'article' | 'tool' | 'github'
    url: string
    tags: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    created_at: string
    updated_at: string
  }
  
  // Component Props Types
  export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'small' | 'medium' | 'large'
    children: React.ReactNode
    className?: string
    onClick?: () => void
    disabled?: boolean
    loading?: boolean
  }
  
  export interface CardProps {
    title: string
    description?: string
    children?: React.ReactNode
    className?: string
    href?: string
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    data: T | null
    error: string | null
    success: boolean
  }
  
  // Form Types
  export interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
  }
  
  export interface NewsletterFormData {
    email: string
    name?: string
  }
  
  // Admin Types
  export interface AdminUser {
    id: string
    email: string
    name: string
    role: 'admin' | 'moderator'
    permissions: string[]
  }