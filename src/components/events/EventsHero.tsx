'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'
import { useEvents } from 'contexts/EventsContext'

const EventsHero = () => {
  const { state } = useEvents()
  
  const heroStats = [
    { number: '25+', label: 'Events Organized', icon: Calendar },
    { number: '1500+', label: 'Total Participants', icon: Users },
    { number: state.filteredEvents.filter(e => e.status === 'upcoming').length.toString(), label: 'Upcoming Events', icon: Trophy },
    { number: '100%', label: 'Innovation Rate', icon: Zap }
  ]

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-4xl opacity-30 pointer-events-none select-none"
      style={{
        left: `${15 + Math.random() * 70}%`,
        top: `${20 + Math.random() * 60}%`,
      }}
      animate={{
        y: [-20, -60, -20],
        x: [-10, 30, -10],
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        delay: Math.random() * 5,
      }}
    >
      {['📅', '🚀', '💡', '🏆', '🎯', '⚡'][i]}
    </motion.div>
  ))

  return (
    <section className="relative min-h-[70vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary" />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(244, 63, 94, 0.05) 50%, rgba(6, 182, 212, 0.03) 100%)',
              'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(6, 182, 212, 0.06) 50%, rgba(99, 102, 241, 0.04) 100%)',
              'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(245, 158, 11, 0.04) 100%)',
              'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(244, 63, 94, 0.05) 50%, rgba(6, 182, 212, 0.03) 100%)'
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {floatingElements}
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <ol className="flex items-center gap-2 bg-glass backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-sm text-gray-400">
            <li>
              <Link href="/" className="text-primary-500 hover:text-primary-400 transition-colors">
                Home
              </Link>
            </li>
            <li>›</li>
            <li>Upcoming Events</li>
          </ol>
        </motion.nav>

        {/* Main Content */}
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight">
              <span className="text-gradient">Innovation</span>
              <br />
              <span className="text-white">Adventures</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-400 font-semibold">
              Join Our Innovation Adventures
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto"
          >
            Discover cutting-edge workshops, thrilling hackathons, inspiring competitions, 
            and transformative tech talks that will accelerate your coding journey with{' '}
            <strong className="text-primary-400">150+ fellow innovators</strong>.
          </motion.p>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-glass-strong transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2 font-display">
                    {stat.number}
                  </div>
                  
                  <div className="text-gray-400 font-medium text-sm text-center">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EventsHero
