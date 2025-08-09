'use client'

import { useEvents } from '@/contexts/EventsContext'
import { motion } from 'framer-motion'
import { Clock, MapPin, Users } from 'lucide-react'

const FeaturedEvents = () => {
  const { events, loading } = useEvents()

  // Get first 3 events as featured (or you can add a featured field to the database later)
  const featuredEvents = events.slice(0, 3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    }
  }

  const calculateProgress = (registered: number, capacity: number) => {
    return Math.min((registered / capacity) * 100, 100)
  }

  if (loading) {
    return (
      <section className="py-20 bg-bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Loading featured events...
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (featuredEvents.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Featured <span className="text-gradient">Events</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't miss these amazing opportunities handpicked for innovation enthusiasts
          </p>
        </motion.div>

        {/* Featured Events Grid */}
        {featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => {
              const dateInfo = formatDate(event.date)

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden relative"
                >
                  {/* Header */}
                  <div className="relative p-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                    <div className="absolute inset-0 bg-black/10" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 rounded-lg p-3 text-center min-w-[60px]">
                          <div className="text-2xl font-bold leading-none">{dateInfo.day}</div>
                          <div className="text-xs font-medium opacity-90">{dateInfo.month}</div>
                        </div>
                        
                        <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
                          {event.status}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-yellow-100 transition-colors duration-300">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-4 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-direction-column">
                    <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3 flex-1">
                      {event.description || 'No description available'}
                    </p>

                    {/* Capacity Progress */}
                    {event.max_participants && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Registration Progress</span>
                          <span>{event.current_participants}/{event.max_participants}</span>
                        </div>
                        <div className="w-full bg-glass-strong rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full relative"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${calculateProgress(event.current_participants, event.max_participants)}%` }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {event.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                        {event.tags.length > 3 && (
                          <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md border border-white/10">
                            +{event.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Users className="w-4 h-4" />
                        Register Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-3">No Featured Events</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Check back soon for exciting featured events and opportunities!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedEvents
