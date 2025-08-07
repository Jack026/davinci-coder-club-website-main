'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: 'workshop' | 'hackathon' | 'competition' | 'tech-talk' | 'networking'
  status: 'upcoming' | 'ongoing' | 'completed'
  featured: boolean
  capacity: number
  registered: number
  organizer: string
  tags: string[]
  image?: string
  requirements?: string[]
  agenda?: string[]
  registrationUrl?: string
  price?: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface FilterState {
  search: string
  category: string
  status: string
  difficulty: string
  sortBy: 'date' | 'title' | 'category'
  sortOrder: 'asc' | 'desc'
  view: 'grid' | 'list'
}

interface EventsState {
  events: Event[]
  filteredEvents: Event[]
  filters: FilterState
  loading: boolean
  selectedEvent: Event | null
}

type EventsAction = 
  | { type: 'SET_EVENTS'; payload: Event[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_SELECTED_EVENT'; payload: Event | null }
  | { type: 'REGISTER_FOR_EVENT'; payload: { eventId: string; spots: number } }

const initialState: EventsState = {
  events: [],
  filteredEvents: [],
  filters: {
    search: '',
    category: 'all',
    status: 'all',
    difficulty: 'all',
    sortBy: 'date',
    sortOrder: 'asc',
    view: 'grid'
  },
  loading: true,
  selectedEvent: null
}

const EventsContext = createContext<{
  state: EventsState
  dispatch: React.Dispatch<EventsAction>
} | null>(null)

function eventsReducer(state: EventsState, action: EventsAction): EventsState {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload,
        filteredEvents: filterAndSortEvents(action.payload, state.filters)
      }
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'UPDATE_FILTERS':
      const newFilters = { ...state.filters, ...action.payload }
      return {
        ...state,
        filters: newFilters,
        filteredEvents: filterAndSortEvents(state.events, newFilters)
      }
    
    case 'SET_SELECTED_EVENT':
      return { ...state, selectedEvent: action.payload }
    
    case 'REGISTER_FOR_EVENT':
      const updatedEvents = state.events.map(event => 
        event.id === action.payload.eventId 
          ? { ...event, registered: event.registered + action.payload.spots }
          : event
      )
      return {
        ...state,
        events: updatedEvents,
        filteredEvents: filterAndSortEvents(updatedEvents, state.filters)
      }
    
    default:
      return state
  }
}

function filterAndSortEvents(events: Event[], filters: FilterState): Event[] {
  let filtered = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         event.description.toLowerCase().includes(filters.search.toLowerCase())
    const matchesCategory = filters.category === 'all' || event.category === filters.category
    const matchesStatus = filters.status === 'all' || event.status === filters.status
    const matchesDifficulty = filters.difficulty === 'all' || event.difficulty === filters.difficulty
    
    return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty
  })

  // Sort events
  filtered.sort((a, b) => {
    let aValue: string | number = a[filters.sortBy]
    let bValue: string | number = b[filters.sortBy]
    
    if (filters.sortBy === 'date') {
      aValue = new Date(a.date).getTime()
      bValue = new Date(b.date).getTime()
    }
    
    if (filters.sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return filtered
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(eventsReducer, initialState)

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (!context) {
    throw new Error('useEvents must be used within EventsProvider')
  }
  return context
}
