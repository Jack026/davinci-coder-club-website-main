'use client'

import { useResources } from '@/contexts/ResourcesContext'
import { motion } from 'framer-motion'
import { BookOpen, Code, Star, TrendingUp, Users, Zap } from 'lucide-react'
import Link from 'next/link'

const ResourcesHero = () => {
  const { state } = useResources()
  const { userProgress } = state
  
  const heroStats = [
    { 
      number: '500+', 
      label: 'Resources', 
      description: 'Curated Content',
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      number: '50+', 
      label: 'Technologies', 
      description: 'Cutting-edge Stack',
      icon: Code,
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      number: '150+', 
      label: 'Contributors', 
      description: 'Expert Authors',
      icon: Users,
      gradient: 'from-green-500 to-emerald-600'
    },
    { 
      number: '24/7', 
      label: 'Access', 
      description: 'Always Available',
      icon: Zap,
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  // Enhanced floating tech icons
  const techIcons = ['📚', '🔧', '💻', '🤖', '⚡', '🎯', '🚀', '💡']
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
      {techIcons[i]}
    </motion.div>
  ))

  return (
    <section className="relative min-h-[80vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary" />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 25% 30%, rgba(99, 102, 241, 0.12) 0%, transparent 45%), radial-gradient(circle at 75% 70%, rgba(244, 63, 94, 0.10) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 35%)',
              'radial-gradient(circle at 70% 20%, rgba(244, 63, 94, 0.12) 0%, transparent 45%), radial-gradient(circle at 30% 80%, rgba(6, 182, 212, 0.10) 0%, transparent 45%), radial-gradient(circle at 60% 40%, rgba(99, 102, 241, 0.08) 0%, transparent 35%)',
              'radial-gradient(circle at 80% 60%, rgba(6, 182, 212, 0.12) 0%, transparent 45%), radial-gradient(circle at 20% 40%, rgba(99, 102, 241, 0.10) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgba(244, 63, 94, 0.08) 0%, transparent 35%)',
              'radial-gradient(circle at 25% 30%, rgba(99, 102, 241, 0.12) 0%, transparent 45%), radial-gradient(circle at 75% 70%, rgba(244, 63, 94, 0.10) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 35%)'
            ]
          }}
          transition={{
            duration: 30,
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
                duration: 15 + Math.random() * 10,
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
            <li>Learning Resources</li>
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
              <span className="text-white">Your Gateway to </span>
              <span className="text-gradient">Tech Mastery</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-400 font-semibold">
              Welcome <span className="text-gradient animate-pulse font-bold">Jack026</span>! Explore our comprehensive collection
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-16 max-w-5xl mx-auto"
          >
            Discover <strong className="text-primary-400">500+ tutorials, documentation, tools, and guides</strong> curated 
            to accelerate your coding journey and master cutting-edge technologies. From beginner-friendly tutorials to 
            advanced techniques, find everything you need to level up your skills.
          </motion.p>

          {/* User Progress Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-16 inline-block relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
            
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500 font-display">
                    {userProgress.currentStreak} Days
                  </div>
                  <div className="text-sm text-gray-400">Learning Streak</div>
                </div>
              </div>

              <div className="w-px h-12 bg-white/20" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500 font-display">
                    {userProgress.skillLevel}
                  </div>
                  <div className="text-sm text-gray-400">Current Level</div>
                </div>
              </div>

              <div className="w-px h-12 bg-white/20" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500 font-display">
                    {userProgress.completedResources}
                  </div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-300 mt-6">
              Ready to continue your learning journey? Let's explore new resources tailored for you!
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

export default ResourcesHero
