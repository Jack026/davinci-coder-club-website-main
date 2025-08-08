'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react'
import { useEvents } from 'contexts/EventsContext'

const FeaturedEvents = () => {
  const { state, dispatch } = useEvents()

  // Mock featured events data - In real app, fetch from Supabase
  useEffect(() => {
    const mockEvents = [
      {
        id: '1',
        title: 'AI/ML Workshop: Building Smart Applications',
        description: 'Dive deep into artificial intelligence and machine learning with hands-on projects. Learn to build intelligent applications using Python, TensorFlow, and modern ML frameworks.',
        date: '2025-08-15',
        time: '10:00 AM',
        location: 'ADTU Innovation Lab',
        category: 'workshop' as const,
        status: 'upcoming' as const,
        featured: true,
        capacity: 50,
        registered: 35,
        organizer: 'Da-Vinci AI Team',
        tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow'],
        difficulty: 'intermediate' as const,
        price: 0,
        requirements: ['Basic Python knowledge', 'Laptop required', 'Jupyter Notebook'],
        agenda: ['Introduction to AI/ML', 'Hands-on TensorFlow', 'Building a Smart App', 'Q&A Session']
      },
      {
        id: '2',
        title: 'CodeVinci 2025: 48-Hour Hackathon',
        description: 'Our flagship hackathon returns! Build innovative solutions to real-world problems. Amazing prizes, mentorship from industry experts, and networking opportunities await.',
        date: '2025-08-20',
        time: '6:00 PM',
        location: 'ADTU Campus',
        category: 'hackathon' as const,
        status: 'upcoming' as const,
        featured: true,
        capacity: 200,
        registered: 150,
        organizer: 'Da-Vinci Core Team',
        tags: ['Hackathon', 'Innovation', 'Prizes', 'Networking'],
        difficulty: 'advanced' as const,
        price: 500,
        requirements: ['Team of 2-4 members', 'Laptop required', 'Problem-solving mindset'],
        agenda: ['Opening Ceremony', 'Team Formation', '48-Hour Coding', 'Pitch Presentations', 'Awards Ceremony']
      },
      {
        id: '3',
        title: 'Tech Talk: Future of Web Development',
        description: 'Industry expert discussion on the latest trends in web development, including Web3, AI integration, and the future of frontend frameworks.',
        date: '2025-08-25',
        time: '4:00 PM',
        location: 'ADTU Auditorium',
        category: 'tech-talk' as const,
        status: 'upcoming' as const,
        featured: true,
        capacity: 100,
        registered: 65,
        organizer: 'Industry Partners',
        tags: ['Web Development', 'Future Tech', 'Industry Insights'],
        difficulty: 'beginner' as const,
        price: 0,
        requirements: ['Interest in web development', 'Notebook for notes'],
        agenda: ['Current Web Trends', 'Emerging Technologies', 'Career Opportunities', 'Interactive Q&A']
      }
    ]

    dispatch({ type: 'SET_EVENTS', payload: mockEvents })
    dispatch({ type: 'SET_LOADING', payload: false })
  }, [dispatch])

  const featuredEvents = state.events.filter(event => event.featured)

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

  const getCategoryColor = (category: string) => {
    const colors = {
      workshop: 'from-blue-500 to-cyan-600',
      hackathon: 'from-purple-500 to-pink-600',
      'tech-talk': 'from-green-500 to-emerald-600',
      competition: 'from-orange-500 to-red-600',
      networking: 'from-indigo-500 to-purple-600'
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  if (state.loading) {
    return (
      <section className="py-16 bg-bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Loading featured events...
            </div>
          </div>
        </div>
      </section>
    )
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
              const progress = calculateProgress(event.registered, event.capacity)
              const categoryGradient = getCategoryColor(event.category)

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
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>

                  {/* Header */}
                  <div className={`relative p-6 bg-gradient-to-r ${categoryGradient} text-white`}>
                    <div className="absolute inset-0 bg-black/10" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 rounded-lg p-3 text-center min-w-[60px]">
                          <div className="text-2xl font-bold leading-none">{dateInfo.day}</div>
                          <div className="text-xs font-medium opacity-90">{dateInfo.month}</div>
                        </div>
                        
                        <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium capitalize">
                          {event.category.replace('-', ' ')}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-yellow-100 transition-colors duration-300">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-4 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-direction-column">
                    <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3 flex-1">
                      {event.description}
                    </p>

                    {/* Capacity Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Registration Progress</span>
                        <span>{event.registered}/{event.capacity}</span>
                      </div>
                      <div className="w-full bg-glass-strong rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full relative"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Tags */}
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

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => dispatch({ type: 'SET_SELECTED_EVENT', payload: event })}
                        className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Users className="w-4 h-4" />
                        {(event.price ?? 0) > 0 ? `₹${event.price}` : 'Register Free'}
                        </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-3 bg-glass-strong border border-white/10 text-gray-300 rounded-lg hover:bg-glass hover:text-white hover:border-primary-500 transition-all duration-300 flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4" />
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
