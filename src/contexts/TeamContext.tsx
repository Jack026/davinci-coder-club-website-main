'use client'

import { createClient } from '@/lib/supabase/client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface Member {
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
  specialization?: string[]
  isJack026?: boolean
  lastSeen?: string
  achievements?: string[]
  joinDate?: string // Added for the modal
  portfolio?: string // Added for the modal
}

interface TeamContextType {
  members: Member[]
  loading: boolean
  error: string | null
  refreshMembers: () => Promise<void>
  
  // Modal state management
  modalOpen: boolean
  selectedMember: Member | null
  openModal: (member: Member) => void
  closeModal: () => void
}

const TeamContext = createContext<TeamContextType | undefined>(undefined)

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // Modal state
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  
  const supabase = createClient()

  const fetchMembers = useCallback(async () => {
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
        setMembers([])
        return
      }

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
        updated_at: member.updated_at,
        specialization: member.specialization || [],
        isJack026: member.isJack026 || false,
        lastSeen: member.lastSeen,
        achievements: member.achievements || [],
        joinDate: member.created_at, // Use created_at as joinDate
        portfolio: member.portfolio || member.resume_url // Portfolio URL
      }))

      setMembers(transformedMembers)
    } catch (err) {
      console.error('Error fetching team members:', err)
      setError('Failed to load team members')
      setMembers([])
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const refreshMembers = async () => {
    await fetchMembers()
  }

  // Modal functions
  const openModal = useCallback((member: Member) => {
    setSelectedMember(member)
    setModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setSelectedMember(null)
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset'
  }, [])

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalOpen) {
        closeModal()
      }
    }

    if (modalOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [modalOpen, closeModal])

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const value: TeamContextType = {
    members,
    loading,
    error,
    refreshMembers,
    modalOpen,
    selectedMember,
    openModal,
    closeModal
  }

  return (
    <TeamContext.Provider value={value}>
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

// Helper hooks for specific functionality
export function useTeamMembers() {
  const { members, loading, error, refreshMembers } = useTeam()
  return { members, loading, error, refreshMembers }
}

export function useTeamModal() {
  const { modalOpen, selectedMember, openModal, closeModal } = useTeam()
  return { modalOpen, selectedMember, openModal, closeModal }
}

// Utility functions
export const getTeamMembersByRole = (members: Member[], role: string) => {
  return members.filter(member => member.role === role)
}

export const getTeamMembersByDepartment = (members: Member[], department: string) => {
  return members.filter(member => member.department === department)
}

export const searchTeamMembers = (members: Member[], query: string) => {
  const lowerQuery = query.toLowerCase()
  return members.filter(member => 
    member.name.toLowerCase().includes(lowerQuery) ||
    member.position?.toLowerCase().includes(lowerQuery) ||
    member.department?.toLowerCase().includes(lowerQuery) ||
    member.skills.some(skill => skill.toLowerCase().includes(lowerQuery)) ||
    member.specialization?.some(spec => spec.toLowerCase().includes(lowerQuery))
  )
}

export const getTeamStatistics = (members: Member[]) => {
  return {
    totalMembers: members.length,
    totalProjects: members.reduce((sum, member) => sum + (member.projects || 0), 0),
    totalContributions: members.reduce((sum, member) => sum + (member.contributions || 0), 0),
    totalAchievements: members.reduce((sum, member) => sum + (member.achievements?.length || 0), 0),
    activemembers: members.filter(member => member.status === 'active').length,
    departments: Array.from(new Set(members.map(member => member.department).filter(Boolean))),
    roles: Array.from(new Set(members.map(member => member.role))),
  }
}
