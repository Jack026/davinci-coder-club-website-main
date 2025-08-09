'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Resource {
  id: string
  title: string
  description: string
  category: 'tutorial' | 'documentation' | 'tool' | 'challenge' | 'download' | 'article'
  type: 'interactive' | 'video' | 'text' | 'code' | 'quiz' | 'project'
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  technologies: string[]
  tags: string[]
  url: string
  imageUrl?: string
  author: string
  rating: number
  reviewCount: number
  duration?: string // e.g., "30 mins", "2 hours"
  featured: boolean
  bookmark: boolean
  completed: boolean
  inProgress: boolean
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  prerequisites?: string[]
  objectives: string[]
  format: 'free' | 'premium' | 'subscription'
}

export interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  technologies: string[]
  resources: string[] // Resource IDs
  progress: number
  enrolled: boolean
  featured: boolean
  completedResources: string[]
  objectives: string[]
  prerequisites: string[]
  badge?: string
}

export interface FilterState {
  search: string
  category: string
  type: string
  difficulty: string
  technology: string
  format: string
  rating: string
  sortBy: 'title' | 'rating' | 'date' | 'difficulty' | 'views'
  sortOrder: 'asc' | 'desc'
  view: 'grid' | 'list'
}

interface ResourcesState {
  resources: Resource[]
  learningPaths: LearningPath[]
  filteredResources: Resource[]
  filters: FilterState
  loading: boolean
  userProgress: {
    completedResources: number
    bookmarkedResources: number
    currentStreak: number
    totalLearningHours: number
    skillLevel: string
  }
  personalizedRecommendations: Resource[]
}

type ResourcesAction = 
  | { type: 'SET_RESOURCES'; payload: Resource[] }
  | { type: 'SET_LEARNING_PATHS'; payload: LearningPath[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }
  | { type: 'TOGGLE_BOOKMARK'; payload: string }
  | { type: 'MARK_COMPLETED'; payload: string }
  | { type: 'MARK_IN_PROGRESS'; payload: string }
  | { type: 'UPDATE_USER_PROGRESS'; payload: Partial<ResourcesState['userProgress']> }
  | { type: 'SET_RECOMMENDATIONS'; payload: Resource[] }

const initialState: ResourcesState = {
  resources: [],
  learningPaths: [],
  filteredResources: [],
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    difficulty: 'all',
    technology: 'all',
    format: 'all',
    rating: 'all',
    sortBy: 'rating',
    sortOrder: 'desc',
    view: 'grid'
  },
  loading: true,
  userProgress: {
    completedResources: 0,
    bookmarkedResources: 0,
    currentStreak: 0,
    totalLearningHours: 0,
    skillLevel: 'Intermediate'
  },
  personalizedRecommendations: []
}

const ResourcesContext = createContext<{
  state: ResourcesState
  dispatch: React.Dispatch<ResourcesAction>
} | null>(null)

function resourcesReducer(state: ResourcesState, action: ResourcesAction): ResourcesState {
  switch (action.type) {
    case 'SET_RESOURCES':
      return {
        ...state,
        resources: action.payload,
        filteredResources: filterAndSortResources(action.payload, state.filters)
      }
    
    case 'SET_LEARNING_PATHS':
      return { ...state, learningPaths: action.payload }
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'UPDATE_FILTERS':
      const newFilters = { ...state.filters, ...action.payload }
      return {
        ...state,
        filters: newFilters,
        filteredResources: filterAndSortResources(state.resources, newFilters)
      }
    
    case 'TOGGLE_BOOKMARK':
      const updatedResources = state.resources.map(resource => 
        resource.id === action.payload 
          ? { ...resource, bookmark: !resource.bookmark }
          : resource
      )
      return {
        ...state,
        resources: updatedResources,
        filteredResources: filterAndSortResources(updatedResources, state.filters),
        userProgress: {
          ...state.userProgress,
          bookmarkedResources: updatedResources.filter(r => r.bookmark).length
        }
      }
    
    case 'MARK_COMPLETED':
      const completedResources = state.resources.map(resource => 
        resource.id === action.payload 
          ? { ...resource, completed: true, inProgress: false }
          : resource
      )
      return {
        ...state,
        resources: completedResources,
        filteredResources: filterAndSortResources(completedResources, state.filters),
        userProgress: {
          ...state.userProgress,
          completedResources: completedResources.filter(r => r.completed).length
        }
      }
    
    case 'MARK_IN_PROGRESS':
      const inProgressResources = state.resources.map(resource => 
        resource.id === action.payload 
          ? { ...resource, inProgress: true, completed: false }
          : resource
      )
      return {
        ...state,
        resources: inProgressResources,
        filteredResources: filterAndSortResources(inProgressResources, state.filters)
      }
    
    case 'UPDATE_USER_PROGRESS':
      return {
        ...state,
        userProgress: { ...state.userProgress, ...action.payload }
      }
    
    case 'SET_RECOMMENDATIONS':
      return { ...state, personalizedRecommendations: action.payload }
    
    default:
      return state
  }
}

function filterAndSortResources(resources: Resource[], filters: FilterState): Resource[] {
  let filtered = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         resource.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
    
    const matchesCategory = filters.category === 'all' || resource.category === filters.category
    const matchesType = filters.type === 'all' || resource.type === filters.type
    const matchesDifficulty = filters.difficulty === 'all' || resource.difficulty === filters.difficulty
    const matchesTechnology = filters.technology === 'all' || resource.technologies.includes(filters.technology)
    const matchesFormat = filters.format === 'all' || resource.format === filters.format
    const matchesRating = filters.rating === 'all' || resource.rating >= parseInt(filters.rating)
    
    return matchesSearch && matchesCategory && matchesType && matchesDifficulty && 
           matchesTechnology && matchesFormat && matchesRating
  })

  // Sort resources
  filtered.sort((a, b) => {
    let aValue: string | number = a[filters.sortBy as keyof Resource] as string | number
    let bValue: string | number = b[filters.sortBy as keyof Resource] as string | number
    
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

export function ResourcesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resourcesReducer, initialState)

  return (
    <ResourcesContext.Provider value={{ state, dispatch }}>
      {children}
    </ResourcesContext.Provider>
  )
}

export function useResources() {
  const context = useContext(ResourcesContext)
  if (!context) {
    throw new Error('useResources must be used within ResourcesProvider')
  }
  return context
}
