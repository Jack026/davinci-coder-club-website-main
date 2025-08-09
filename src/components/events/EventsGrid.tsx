'use client'

import { useEvents } from '@/contexts/EventsContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, MapPin, Users } from 'lucide-react'

const EventsGrid = () => {
  const { events, loading } = useEvents()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: date.getFullYear(),
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: 'bg-green-500/20 text-green-500 border-green-500/30',
      ongoing: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      completed: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
    return colors[status as keyof typeof colors] || colors.upcoming
  }

  if (loading) {
    return (
      <section className="py-16 bg-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Loading events...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 font-display">
              All Events
            </h2>
            <div className="text-sm text-gray-400">
              Showing <span className="text-primary-500 font-semibold">{events.length}</span> events
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {events.length > 0 ? (
            <motion.div
              key="events-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {events.map((event, index) => {
                const dateInfo = formatDate(event.date)

                return (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 flex flex-col"
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-3 text-white text-center min-w-[60px]">
                          <div className="text-xl font-bold">{dateInfo.day}</div>
                          <div className="text-xs opacity-90">{dateInfo.month}</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300">
                        {event.title}
                      </h3>

                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {event.description || 'No description available'}
                      </p>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4 text-primary-500" />
                          {dateInfo.full}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4 text-primary-500" />
                            {event.location}
                          </div>
                        )}
                        {event.max_participants && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Users className="w-4 h-4 text-primary-500" />
                            {event.current_participants}/{event.max_participants} registered
                          </div>
                        )}
                      </div>

                      {event.tags && event.tags.length > 0 && (
                        <div className="flex gap-2 mb-6 flex-wrap">
                          {event.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3 mt-auto">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                        >
                          Register Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 text-lg mb-4">No events found</div>
              <p className="text-gray-500">Check back later for upcoming events!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default EventsGrid
