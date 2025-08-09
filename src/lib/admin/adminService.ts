import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// Test database connection
export const testDatabaseConnection = async () => {
  try {
    console.log('Testing database connection...')
    
    // Test if events table exists
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Database connection test failed:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return false
    }
    
    console.log('Database connection successful, events table accessible')
    return true
  } catch (error) {
    console.error('Database connection test error:', error)
    return false
  }
}

export interface TeamMember {
  id: string
  profile_id?: string
  name: string
  position?: string
  role: string
  department?: string
  year?: string
  skills: string[]
  projects: number
  contributions: number
  status: string
  github?: string
  linkedin?: string
  email?: string
  bio?: string
  image_url?: string
  resume_url?: string
  created_at: string
  updated_at: string
  profiles?: {
    id: string
    full_name?: string
    email?: string
    username?: string
    avatar_url?: string
    is_Jack026?: boolean
    github_url?: string
    linkedin_url?: string
    portfolio_url?: string
  }
}

export interface Event {
  id: string
  title: string
  description?: string
  date: string
  location?: string
  image_url?: string
  status: string
  max_participants?: number
  current_participants: number
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description?: string
  tech_stack: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  contributors: string[]
  status: string
  difficulty: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Resource {
  id: string
  title: string
  description?: string
  type: string
  url: string
  tags: string[]
  difficulty: string
  category?: string
  author?: string
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  status: string
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  name?: string
  status: string
  created_at: string
  updated_at: string
}

// Team Members
export const adminService = {
  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select(`
        *,
        profiles:profile_id (
          id,
          full_name,
          email,
          username,
          avatar_url,
          is_Jack026,
          github_url,
          linkedin_url,
          portfolio_url
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createTeamMember(member: Partial<TeamMember>): Promise<TeamMember> {
    const { data, error } = await supabase
      .from('team_members')
      .insert([member])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
    const { data, error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteTeamMember(id: string): Promise<void> {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Events
  async getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createEvent(event: Partial<Event>): Promise<Event> {
    console.log('Creating event with data:', event)
    
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single()

    if (error) {
      console.error('Supabase error creating event:', error)
      throw error
    }
    
    console.log('Event created successfully:', data)
    return data
  },

  async updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Resources
  async getResources(): Promise<Resource[]> {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createResource(resource: Partial<Resource>): Promise<Resource> {
    const { data, error } = await supabase
      .from('resources')
      .insert([resource])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateResource(id: string, updates: Partial<Resource>): Promise<Resource> {
    const { data, error } = await supabase
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteResource(id: string): Promise<void> {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async updateMessageStatus(id: string, status: string): Promise<ContactMessage> {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteMessage(id: string): Promise<void> {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Newsletter Subscribers
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async updateSubscriberStatus(id: string, status: string): Promise<NewsletterSubscriber> {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteSubscriber(id: string): Promise<void> {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // File Upload
  async uploadFile(file: File, field: string = 'image'): Promise<string> {
    // Determine bucket based on field type
    let bucket = 'avatars'
    if (field.includes('resume') || field.includes('cv') || field.includes('document')) {
      bucket = 'documents'
    } else if (field.includes('image') || field.includes('avatar') || field.includes('photo')) {
      bucket = 'avatars'
    } else {
      bucket = 'general'
    }

    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now()
    const fileName = `${field}_${timestamp}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  // Analytics
  async getAnalytics() {
    const [
      { count: teamCount },
      { count: eventsCount },
      { count: projectsCount },
      { count: resourcesCount },
      { count: messagesCount },
      { count: subscribersCount }
    ] = await Promise.all([
      supabase.from('team_members').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('resources').select('*', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true })
    ])

    return {
      teamCount: teamCount || 0,
      eventsCount: eventsCount || 0,
      projectsCount: projectsCount || 0,
      resourcesCount: resourcesCount || 0,
      messagesCount: messagesCount || 0,
      subscribersCount: subscribersCount || 0
    }
  }
} 