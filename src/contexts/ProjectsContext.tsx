'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  category: 'web' | 'mobile' | 'ai-ml' | 'blockchain' | 'desktop' | 'iot' | 'game-dev'
  status: 'completed' | 'in-progress' | 'archived' | 'beta'
  featured: boolean
  techStack: string[]
  github: string
  demo?: string
  images: string[]
  contributors: string[]
  stars: number
  forks: number
  downloads: number
  createdAt: string
  updatedAt: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  license: string
  requirements?: string[]
  features?: string[]
}

export interface FilterState {
  search: string
  category: string
  status: string
  difficulty: string
  techStack: string
  sortBy: 'title' | 'date' | 'stars' | 'category'
  sortOrder: 'asc' | 'desc'
  view: 'grid' | 'list'
}

interface ProjectsState {
  projects: Project[]
  filteredProjects: Project[]
  filters: FilterState
  loading: boolean
  selectedProject: Project | null
  modalOpen: boolean
}

type ProjectsAction =
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_SELECTED_PROJECT'; payload: Project | null }
  | { type: 'SET_MODAL_OPEN'; payload: boolean }
  | { type: 'STAR_PROJECT'; payload: string }

const initialState: ProjectsState = {
  projects: [],
  filteredProjects: [],
  filters: {
    search: '',
    category: 'all',
    status: 'all',
    difficulty: 'all',
    techStack: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
    view: 'grid',
  },
  loading: true,
  selectedProject: null,
  modalOpen: false,
}

const ProjectsContext = createContext<{
  state: ProjectsState
  dispatch: React.Dispatch<ProjectsAction>
} | null>(null)

function filterAndSortProjects(projects: Project[], filters: FilterState): Project[] {
  let filtered = projects.filter((project) => {
    const searchLower = filters.search.toLowerCase()
    const matchesSearch =
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchLower))

    const matchesCategory = filters.category === 'all' || project.category === filters.category
    const matchesStatus = filters.status === 'all' || project.status === filters.status
    const matchesDifficulty = filters.difficulty === 'all' || project.difficulty === filters.difficulty
    const matchesTechStack = filters.techStack === 'all' || project.techStack.includes(filters.techStack)

    return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty && matchesTechStack
  })

  filtered.sort((a, b) => {
    let aValue: string | number = a[filters.sortBy as keyof Project] as string | number
    let bValue: string | number = b[filters.sortBy as keyof Project] as string | number

    if (filters.sortBy === 'date') {
      aValue = new Date(a.updatedAt).getTime()
      bValue = new Date(b.updatedAt).getTime()
    }

    if (filters.sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return filtered
}

function projectsReducer(state: ProjectsState, action: ProjectsAction): ProjectsState {
  switch (action.type) {
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        filteredProjects: filterAndSortProjects(action.payload, state.filters),
      }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'UPDATE_FILTERS': {
      const newFilters = { ...state.filters, ...action.payload }
      return {
        ...state,
        filters: newFilters,
        filteredProjects: filterAndSortProjects(state.projects, newFilters),
      }
    }

    case 'SET_SELECTED_PROJECT':
      return {
        ...state,
        selectedProject: action.payload,
        modalOpen: !!action.payload,
      }

    case 'SET_MODAL_OPEN':
      return {
        ...state,
        modalOpen: action.payload,
        selectedProject: action.payload ? state.selectedProject : null,
      }

    case 'STAR_PROJECT': {
      const updatedProjects = state.projects.map((project) =>
        project.id === action.payload ? { ...project, stars: project.stars + 1 } : project
      )
      return {
        ...state,
        projects: updatedProjects,
        filteredProjects: filterAndSortProjects(updatedProjects, state.filters),
      }
    }

    default:
      return state
  }
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(projectsReducer, initialState)

  return (
    <ProjectsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider')
  }
  return context
}
