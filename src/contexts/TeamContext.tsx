'use client'

import { createClient } from '@/lib/supabase/client'
import { createContext, useContext, useEffect, useState } from 'react'

interface Member {
  id: string
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
}

interface TeamContextType {
  members: Member[]
  loading: boolean
  error: string | null
  refreshMembers: () => Promise<void>
}

const TeamContext = createContext<TeamContextType | undefined>(undefined)

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching team members:', error)
        setError('Failed to load team members')
        return
      }

      // Transform the data to match the Member interface
      const transformedMembers: Member[] = (data || []).map((member: any) => ({
        id: member.id,
        name: member.name,
        position: member.position,
        role: member.role,
        department: member.department,
        year: member.year,
        skills: member.skills || [],
        projects: member.projects || 0,
        contributions: member.contributions || 0,
        status: member.status,
        github: member.github,
        linkedin: member.linkedin,
        email: member.email,
        bio: member.bio,
        image_url: member.image_url,
        resume_url: member.resume_url,
        created_at: member.created_at,
        updated_at: member.updated_at
      }))

      setMembers(transformedMembers)
    } catch (err) {
      console.error('Error fetching team members:', err)
      setError('Failed to load team members')
    } finally {
      setLoading(false)
    }
  }

  const refreshMembers = async () => {
    await fetchMembers()
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <TeamContext.Provider value={{ members, loading, error, refreshMembers }}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = useContext(TeamContext)
  if (context === undefined) {
    throw new Error('useTeam must be used within TeamProvider')
  }
  return context
}
