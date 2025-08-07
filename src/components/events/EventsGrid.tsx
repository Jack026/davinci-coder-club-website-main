'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, ExternalLink, Filter } from 'lucide-react'
import { useEvents } from 'contexts/EventsContext'

const EventsGrid = () => {
  const { state, dispatch } = useEvents()
  const { filteredEvents, filters, loading } = state

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

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'text-green-400',
      intermediate: 'text-yellow-400',
      advanced: 'text-red-400'
    }
    return colors[difficulty as keyof typeof colors] || colors.beginner
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      workshop: '🔧',
      hackathon: '⚡',
      'tech-talk': '💬',
      competition: '🏆',
      networking: '🤝'
    }
    return icons[category as keyof typeof icons] || '📅'
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
              Showing <span className="text-primary-500 font-semibold">{filteredEvents.length}</span> of {state.events.length} events
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div
              key="events-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${
                filters.view === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'flex flex-col gap-4'
              }`}
            >
              {filteredEvents.map((event, index) => {
                const dateInfo = formatDate(event.date)
                const isGridView = filters.view === 'grid'

                return (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: isGridView ? 1.02 : 1.01 }}
                    className={`group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 ${
                      isGridView ? 'flex flex-col' : 'flex flex-row items-center p-6'
                    }`}
                  >
                    {isGridView ? (
                      <>
                        {/* Grid View */}
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
                              {event.featured && (
                                <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-2 py-1 rounded-full text-xs font-medium">
                                  ⭐ Featured
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">{getCategoryIcon(event.category)}</span>
                            <span className="bg-glass-strong px-3 py-1 rounded-full text-sm font-medium text-primary-400 capitalize">
                              {event.category.replace('-', ' ')}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300">
                            {event.title}
                          </h3>

                          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                            {event.description}
                          </p>

                          <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Clock className="w-4 h-4 text-primary-500" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <MapPin className="w-4 h-4 text-primary-500" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Users className="w-4 h-4 text-primary-500" />
                              {event.registered}/{event.capacity} registered
                            </div>
                          </div>

                          <div className="flex gap-2 mb-6 flex-wrap">
                            {event.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md">
                                {tag}
                              </span>
                            ))}
                            <span className={`px-2 py-1 text-xs font-medium ${getDifficultyColor(event.difficulty)}`}>
                              {event.difficulty}
                            </span>
                          </div>

                          <div className="flex gap-3 mt-auto">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => dispatch({ type: 'SET_SELECTED_EVENT', payload: event })}
                              className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                            >
                              {event.price > 0 ? `₹${event.price}` : 'Register Free'}
                            </motion.button>
                            <button className="px-4 py-2.5 bg-glass-strong border border-white/10 text-gray-400 rounded-lg hover:text-white hover:border-primary-500 transition-all duration-300">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-4 text-white text-center min-w-[80px] mr-6">
                          <div className="text-2xl font-bold">{dateInfo.day}</div>
                          <div className="text-sm opacity-90">{dateInfo.month}</div>
                        </div>

                        <div className="flex-1 mr-6">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl">{getCategoryIcon(event.category)}</span>
                            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                              {event.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>

                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                            {event.description}
                          </p>

                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-primary-500" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-primary-500" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-primary-500" />
                              {event.registered}/{event.capacity}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => dispatch({ type: 'SET_SELECTED_EVENT', payload: event })}
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                          >
                            Register
                          </motion.button>
                          <button className="bg-glass-strong border border-white/10 text-gray-400 py-2 px-4 rounded-lg hover:text-white hover:border-primary-500 transition-all duration-300">
                            Details
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="no-events"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4 opacity-50">
                <Filter className="w-16 h-16 mx-auto text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No Events Found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Try adjusting your filters or check back later for new events.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'UPDATE_FILTERS', payload: { 
                  search: '', 
                  category: 'all', 
                  status: 'all', 
                  difficulty: 'all' 
                }})}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default EventsGrid
