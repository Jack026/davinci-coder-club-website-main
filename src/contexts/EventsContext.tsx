'use client'

import { adminService } from '@/lib/admin/adminService'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

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
  featured?: boolean // <-- from the EventCalendar issue

}

interface EventsContextType {
  events: Event[]
  loading: boolean
  error: string | null
  refreshEvents: () => Promise<void>
}

const EventsContext = createContext<EventsContextType | null>(null)

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await adminService.getEvents()
      setEvents(data)
    } catch (err) {
      console.error('Error fetching events:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const refreshEvents = async () => {
    await fetchEvents()
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <EventsContext.Provider value={{ events, loading, error, refreshEvents }}>
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
