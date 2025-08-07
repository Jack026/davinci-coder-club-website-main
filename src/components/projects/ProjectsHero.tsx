'use client'

import { motion } from 'framer-motion'
import { Code, Star, Users, Download, Crown } from 'lucide-react'
import Link from 'next/link'

const ProjectsHero = () => {
  const heroStats = [
    { 
      number: '75+', 
      label: 'Projects', 
      description: 'Innovative Solutions',
      icon: Code,
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      number: '50+', 
      label: 'Technologies', 
      description: 'Cutting-edge Stack',
      icon: Star,
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      number: '150+', 
      label: 'Contributors', 
      description: 'Active Developers',
      icon: Users,
      gradient: 'from-green-500 to-emerald-600'
    },
    { 
      number: '10K+', 
      label: 'Downloads', 
      description: 'Global Impact',
      icon: Download,
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(244, 63, 94, 0.12) 50%, rgba(6, 182, 212, 0.08) 100%)',
              'linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(139, 92, 246, 0.08) 100%)',
              'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(139, 92, 246, 0.12) 50%, rgba(245, 158, 11, 0.15) 100%)',
            ]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2 bg-glass backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-sm text-gray-400">
            <Link href="/" className="text-primary-500 hover:text-primary-400 transition-colors">
              Home
            </Link>
            <span>›</span>
            <span>Projects</span>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight">
              <span className="text-white">Innovation in </span>
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Action
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-400 font-semibold">
              Discover cutting-edge projects created by{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent font-bold">
                Jack026
              </span>{' '}
              and our talented members
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto"
          >
            From AI-powered solutions to revolutionary web applications, explore our diverse portfolio 
            of projects that showcase the creativity and technical expertise of{' '}
            <strong className="text-primary-400">Da-Vinci Coder Club</strong> members.
          </motion.p>

          {/* Jack026 Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-glass backdrop-blur-xl border border-primary-500/30 bg-primary-500/5 rounded-2xl p-6 mb-12 inline-block relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-lg font-bold text-white relative">
                J
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              <div className="text-center sm:text-left">
                <p className="text-lg text-gray-300">
                  Hey{' '}
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent font-bold animate-pulse">
                    Jack026
                  </span>
                  ! Welcome to our innovation showcase.
                </p>
                <span className="block text-primary-400 mt-2 font-semibold">
                  Ready to explore amazing projects?
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {heroStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 relative overflow-hidden group hover:bg-glass-strong transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    
                    <motion.div 
                      className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-500 mb-2 font-display"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.number}
                    </motion.div>
                    
                    <div className="text-white font-semibold text-sm mb-1 uppercase tracking-wider text-center">
                      {stat.label}
                    </div>
                    
                    <div className="text-gray-400 text-xs text-center">
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsHero
