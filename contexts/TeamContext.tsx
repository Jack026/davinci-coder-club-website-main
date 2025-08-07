'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Member {
  id: string
  name: string
  position: string
  department: string
  year: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate'
  role: 'president' | 'vice-president' | 'secretary' | 'treasurer' | 'tech-lead' | 'design-lead' | 'core' | 'member'
  skills: string[]
  bio?: string
  email?: string
  github?: string
  linkedin?: string
  portfolio?: string
  joinDate: string
  avatar?: string
  status: 'active' | 'inactive' | 'alumni'
  achievements?: string[]
  projects?: number
  contributions?: number
  specialization?: string[]
  isJack026?: boolean
  featured?: boolean
}

export interface FilterState {
  search: string
  department: string
  year: string
  role: string
  skill: string
  status: string
  sortBy: 'name' | 'joinDate' | 'contributions' | 'department'
  sortOrder: 'asc' | 'desc'
  view: 'grid' | 'list'
}

interface TeamState {
  members: Member[]
  filteredMembers: Member[]
  filters: FilterState
  loading: boolean
  selectedMember: Member | null
  modalOpen: boolean
  spotlightMember: Member | null
}

type TeamAction = 
  | { type: 'SET_MEMBERS'; payload: Member[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_SELECTED_MEMBER'; payload: Member | null }
  | { type: 'SET_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_SPOTLIGHT_MEMBER'; payload: Member | null }

const initialState: TeamState = {
  members: [],
  filteredMembers: [],
  filters: {
    search: '',
    department: 'all',
    year: 'all',
    role: 'all',
    skill: 'all',
    status: 'active',
    sortBy: 'name',
    sortOrder: 'asc',
    view: 'grid'
  },
  loading: true,
  selectedMember: null,
  modalOpen: false,
  spotlightMember: null
}

const TeamContext = createContext<{
  state: TeamState
  dispatch: React.Dispatch<TeamAction>
} | null>(null)

function teamReducer(state: TeamState, action: TeamAction): TeamState {
  switch (action.type) {
    case 'SET_MEMBERS':
      return {
        ...state,
        members: action.payload,
        filteredMembers: filterAndSortMembers(action.payload, state.filters),
        spotlightMember: action.payload.find(m => m.isJack026) || action.payload.find(m => m.featured) || action.payload[0]
      }
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'UPDATE_FILTERS':
      const newFilters = { ...state.filters, ...action.payload }
      return {
        ...state,
        filters: newFilters,
        filteredMembers: filterAndSortMembers(state.members, newFilters)
      }
    
    case 'SET_SELECTED_MEMBER':
      return { 
        ...state, 
        selectedMember: action.payload,
        modalOpen: !!action.payload
      }
    
    case 'SET_MODAL_OPEN':
      return { 
        ...state, 
        modalOpen: action.payload,
        selectedMember: action.payload ? state.selectedMember : null
      }
    
    case 'SET_SPOTLIGHT_MEMBER':
      return { ...state, spotlightMember: action.payload }
    
    default:
      return state
  }
}

function filterAndSortMembers(members: Member[], filters: FilterState): Member[] {
  let filtered = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         member.position.toLowerCase().includes(filters.search.toLowerCase()) ||
                         member.department.toLowerCase().includes(filters.search.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
    
    const matchesDepartment = filters.department === 'all' || member.department === filters.department
    const matchesYear = filters.year === 'all' || member.year === filters.year
    const matchesRole = filters.role === 'all' || member.role === filters.role
    const matchesSkill = filters.skill === 'all' || member.skills.includes(filters.skill)
    const matchesStatus = filters.status === 'all' || member.status === filters.status
    
    return matchesSearch && matchesDepartment && matchesYear && matchesRole && matchesSkill && matchesStatus
  })

  // Sort members
  filtered.sort((a, b) => {
    let aValue: string | number = a[filters.sortBy as keyof Member] as string | number
    let bValue: string | number = b[filters.sortBy as keyof Member] as string | number
    
    // Handle special cases
    if (filters.sortBy === 'joinDate') {
      aValue = new Date(a.joinDate).getTime()
      bValue = new Date(b.joinDate).getTime()
    } else if (filters.sortBy === 'contributions') {
      aValue = a.contributions || 0
      bValue = b.contributions || 0
    }
    
    if (filters.sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  // Always put Jack026 first if present
  const jack026Index = filtered.findIndex(member => member.isJack026)
  if (jack026Index > 0) {
    const jack026 = filtered.splice(jack026Index, 1)[0]
    filtered.unshift(jack026)
  }

  return filtered
}

export function TeamProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(teamReducer, initialState)

  return (
    <TeamContext.Provider value={{ state, dispatch }}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error('useTeam must be used within TeamProvider')
  }
  return context
}
