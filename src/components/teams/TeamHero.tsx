'use client'

import { motion } from 'framer-motion'
import { Users, Star, Code, Trophy, TrendingUp, Crown } from 'lucide-react'
import Link from 'next/link'
import { useTeam } from '@/contexts/TeamContext'

const TeamHero = () => {
  const { state } = useTeam()
  
  const heroStats = [
    { 
      number: '150+', 
      label: 'Team Members', 
      description: 'Passionate Innovators',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      number: '25+', 
      label: 'Departments', 
      description: 'Diverse Expertise',
      icon: Star,
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      number: '300+', 
      label: 'Projects Built', 
      description: 'Collaborative Work',
      icon: Code,
      gradient: 'from-green-500 to-emerald-600'
    },
    { 
      number: '50+', 
      label: 'Awards Won', 
      description: 'Excellence Achieved',
      icon: Trophy,
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  // Enhanced team constellation animation
  const teamIcons = ['👥', '💻', '🚀', '💡', '⭐', '🎯', '🔥', '🌟']
  const floatingElements = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-3xl opacity-30 pointer-events-none select-none"
      style={{
        left: `${10 + Math.random() * 80}%`,
        top: `${15 + Math.random() * 70}%`,
      }}
      animate={{
        y: [-30, -80, -30],
        x: [-20, 40, -20],
        rotate: [0, 180, 360],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 20 + Math.random() * 15,
        repeat: Infinity,
        delay: Math.random() * 10,
        ease: "easeInOut"
      }}
    >
      {teamIcons[i]}
    </motion.div>
  ))

  return (
    <section className="relative min-h-[75vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary" />
        
        {/* Team Constellation Animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 45%), radial-gradient(circle at 70% 75%, rgba(244, 63, 94, 0.12) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 35%)',
              'radial-gradient(circle at 80% 30%, rgba(244, 63, 94, 0.15) 0%, transparent 45%), radial-gradient(circle at 20% 70%, rgba(6, 182, 212, 0.12) 0%, transparent 45%), radial-gradient(circle at 60% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 35%)',
              'radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 45%), radial-gradient(circle at 60% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 45%), radial-gradient(circle at 20% 60%, rgba(244, 63, 94, 0.08) 0%, transparent 35%)',
              'radial-gradient(circle at 30% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 45%), radial-gradient(circle at 70% 75%, rgba(244, 63, 94, 0.12) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 35%)'
            ]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {floatingElements}
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-500 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-50, -150, -50],
                x: [-20, 20, -20],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
            />
          ))}
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
            <li>Meet Our Team</li>
          </ol>
        </motion.nav>

        {/* Main Content */}
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight">
              <span className="text-white">The Minds Behind the </span>
              <span className="text-gradient">Magic</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-400 font-semibold">
              Welcome <span className="text-gradient animate-pulse font-bold">Jack026</span>! 
              Meet our incredible team
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-16 max-w-5xl mx-auto"
          >
            Meet our incredible team of <strong className="text-primary-400">150+ passionate developers</strong>, 
            creative designers, and innovative thinkers working together to build the future of technology at ADTU. 
            From seasoned leaders to rising stars, every member contributes to our collective success.
          </motion.p>

          {/* Jack026 Special Welcome */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-glass backdrop-blur-xl border border-primary-500/30 rounded-2xl p-8 mb-16 inline-block relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
            
            {/* Crown Icon for Jack026 */}
            <div className="absolute top-4 right-4">
              <Crown className="w-8 h-8 text-yellow-500 animate-bounce" />
            </div>
            
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  J
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white font-display">
                    Hey Jack026! 👋
                  </h3>
                  <p className="text-primary-400 font-semibold">
                    Lead Developer & Innovation Architect
                  </p>
                </div>
              </div>

              <div className="w-px h-12 bg-white/20 hidden sm:block" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500 font-display">
                    Leader
                  </div>
                  <div className="text-sm text-gray-400">Your Role</div>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-300 mt-6">
              You're at the heart of our innovation! Explore your team and discover the amazing minds you're working with.
            </p>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -12, scale: 1.05 }}
                className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:bg-glass-strong transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-4xl lg:text-5xl font-bold text-primary-500 mb-2 font-display">
                    {stat.number}
                  </div>
                  
                  <div className="text-white font-semibold text-lg mb-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  
                  <div className="text-gray-400 text-sm text-center">
                    {stat.description}
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

export default TeamHero
