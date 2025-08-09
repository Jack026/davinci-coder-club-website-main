'use client'

import { useEvents } from '@/contexts/EventsContext'
import { motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useMemo, useState } from 'react'

const EventCalendar = () => {
  const { events } = useEvents()
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Generate calendar data
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const firstDayWeekday = firstDay.getDay()
    const daysInMonth = lastDay.getDate()

    const days = []
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i)
      })
    }

    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      days.push({
        date,
        isCurrentMonth: true,
        fullDate: new Date(year, month, date)
      })
    }

    // Next month days
    const remainingDays = 42 - days.length
    for (let date = 1; date <= remainingDays; date++) {
      days.push({
        date,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, date)
      })
    }

    return days
  }, [currentDate])

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateString)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  return (
    <section className="py-20 bg-bg-tertiary">
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
            Event <span className="text-gradient">Calendar</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            View all events in calendar format for better planning
          </p>
        </motion.div>

        {/* Calendar Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateMonth('prev')}
              className="p-3 bg-glass-strong border border-white/10 rounded-lg text-white hover:bg-primary-500 hover:border-primary-500 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-white font-display">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToToday}
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Today
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateMonth('next')}
                className="p-3 bg-glass-strong border border-white/10 rounded-lg text-white hover:bg-primary-500 hover:border-primary-500 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekdays.map((day) => (
              <div key={day} className="text-center text-gray-400 font-semibold py-3 text-sm uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarData.map((day, index) => {
              const dayEvents = getEventsForDate(day.fullDate)
              const hasEvents = dayEvents.length > 0
              const hasFeaturedEvents = dayEvents.some(event => event.featured)

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`
                    aspect-square border border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative min-h-[50px] lg:min-h-[60px]
                    ${day.isCurrentMonth 
                      ? 'text-white hover:bg-glass-strong hover:border-primary-500' 
                      : 'text-gray-500 opacity-50'
                    }
                    ${isToday(day.fullDate) 
                      ? 'bg-primary-500 text-white font-bold border-primary-500' 
                      : 'hover:bg-glass'
                    }
                    ${hasEvents && !isToday(day.fullDate)
                      ? 'border-green-500/50 bg-green-500/10' 
                      : ''
                    }
                  `}
                >
                  <span className="text-sm lg:text-base font-medium">
                    {day.date}
                  </span>
                  
                  {hasEvents && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {hasFeaturedEvents && (
                        <Star className="w-2.5 h-2.5 text-yellow-500" />
                      )}
                      {dayEvents.length > 1 && (
                        <span className="text-xs text-gray-400">
                          +{dayEvents.length - 1}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Event Tooltip */}
                  {hasEvents && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-bg-secondary border border-white/20 rounded-lg p-3 min-w-[200px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-10">
                      {dayEvents.slice(0, 3).map((event, eventIndex) => (
                        <div key={eventIndex} className="flex items-center gap-2 text-sm text-white mb-1 last:mb-0">
                          <div className={`w-2 h-2 rounded-full ${
                            event.status === 'upcoming' ? 'bg-green-500' : 
                            event.status === 'ongoing' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`} />
                          <span className="truncate">{event.title}</span>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-400 mt-2">
                          +{dayEvents.length - 3} more events
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-white font-semibold text-center mb-4">Legend:</h4>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>Upcoming Events</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span>Ongoing Events</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-3 h-3 bg-gray-500 rounded-full" />
                <span>Completed Events</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>Featured Events</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EventCalendar
