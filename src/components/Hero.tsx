'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  
  const fullText = 'Da-Vinci'
  
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 120)

    return () => clearInterval(typingInterval)
  }, [])

  // Generate optimized falling stars
  const generateStars = () => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 95 + 2.5,
      size: Math.random() * 1.5 + 1,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 25,
      blinkDuration: Math.random() * 2 + 1.5,
    }))
  }

  const stars = generateStars()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-gray-950 via-black to-gray-900">
      
      {/* Ultra-Dark Background with Spear */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Glowing Spear Shape at Back */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Spear Body - Vertical Line */}
          <motion.div
            className="absolute w-1 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent blur-sm"
            style={{ height: '80%' }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Spear Tip - Top */}
          <motion.div
            className="absolute -top-10"
            animate={{
              opacity: [0.4, 1, 0.4],
              y: [0, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="40" height="120" viewBox="0 0 40 120" className="text-purple-400/60">
              <path
                d="M20 0 L30 30 L25 40 L20 35 L15 40 L10 30 Z"
                fill="url(#spearTipGradient)"
                className="drop-shadow-2xl"
              />
              <defs>
                <linearGradient id="spearTipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
                  <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0.4)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Spear Base - Bottom */}
          <motion.div
            className="absolute -bottom-10"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              y: [0, 10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <svg width="30" height="80" viewBox="0 0 30 80" className="text-purple-400/40">
              <path
                d="M15 80 L20 70 L18 60 L15 65 L12 60 L10 70 Z"
                fill="url(#spearBaseGradient)"
                className="drop-shadow-xl"
              />
              <defs>
                <linearGradient id="spearBaseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(147, 51, 234, 0.6)" />
                  <stop offset="100%" stopColor="rgba(79, 70, 229, 0.3)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Glowing Aura around Spear */}
          <motion.div
            className="absolute w-32 h-full bg-gradient-to-b from-purple-500/10 via-pink-500/20 to-purple-500/10 blur-3xl"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleX: [0.8, 1.5, 0.8],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Energy Particles around Spear */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`spear-particle-${i}`}
              className="absolute w-2 h-2 bg-purple-400/60 rounded-full"
              style={{
                left: `${48 + Math.cos(i * 45 * Math.PI / 180) * 60}%`,
                top: `${48 + Math.sin(i * 45 * Math.PI / 180) * 60}%`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 0.9, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Ultra-Dark Curves */}
        <motion.div
          className="absolute top-0 left-0 w-full h-32 opacity-15"
          animate={{
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full">
            <path
              fill="url(#ultraDarkGradient1)"
              d="M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,112C840,96,960,96,1080,112C1200,128,1320,160,1380,176L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
            <defs>
              <linearGradient id="ultraDarkGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(79, 70, 229, 0.15)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.1)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.15)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 opacity-15"
          animate={{
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full">
            <path
              fill="url(#ultraDarkGradient2)"
              d="M0,224L60,208C120,192,240,160,360,160C480,160,600,192,720,208C840,224,960,224,1080,208C1200,192,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
            <defs>
              <linearGradient id="ultraDarkGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.1)" />
                <stop offset="50%" stopColor="rgba(79, 70, 229, 0.15)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Falling Stars - Darker Theme */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-gray-300 shadow-sm"
            style={{
              left: `${star.left}%`,
              top: '-20px',
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              y: [0, window.innerHeight + 50],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.2, 0.6, 0.6, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="w-full h-full rounded-full bg-gray-200"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: star.blinkDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content - Enhanced for Dark Theme */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center space-y-6 md:space-y-8">
          
          {/* Main Heading - Ultra-Dark Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="font-bold leading-tight tracking-tight">
              <motion.span 
                className="block text-gray-100 font-display text-2xl md:text-3xl lg:text-5xl mb-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Welcome to the
              </motion.span>
              
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 font-display text-3xl md:text-4xl lg:text-6xl mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {displayText}
                <motion.span
                  className="inline-block w-1 h-8 md:h-12 lg:h-16 bg-purple-400 ml-2"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.span>
              
              <motion.span 
                className="block text-gray-100 font-display text-2xl md:text-3xl lg:text-5xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Coder Club
              </motion.span>
            </h1>
            
            <motion.div
              className="w-12 md:w-20 lg:w-24 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
          </motion.div>

          {/* Enhanced Tagline for Dark Theme */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-3 md:space-y-4"
          >
            <p className="text-lg md:text-xl lg:text-2xl font-bold">
              <span className="text-purple-300">Art</span>
              <span className="text-gray-200 mx-3">meets</span>
              <span className="text-pink-300">Code</span>
            </p>
            
            <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
              The most <span className="text-purple-300 font-semibold">innovative</span> and 
              <span className="text-pink-300 font-semibold"> creative</span> coding community. 
              Join <span className="text-blue-300 font-semibold">150+ visionaries</span> building tomorrow's digital masterpieces.
            </p>
          </motion.div>

          {/* Dark Theme Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full sm:w-auto px-6 md:px-8 py-3 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 rounded-xl text-gray-100 font-bold text-sm md:text-base overflow-hidden shadow-2xl border border-purple-500/20"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join the Revolution
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 md:px-8 py-3 border-2 border-purple-400/50 rounded-xl text-purple-300 font-bold text-sm md:text-base hover:text-gray-100 hover:bg-purple-500/20 transition-all duration-300 backdrop-blur-xl"
            >
              Explore Magic
            </motion.button>
          </motion.div>

          {/* Dark Theme Social Links */}
          <motion.div
            className="flex items-center justify-center gap-3 md:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#', label: 'Email' }
            ].map((social, index) => {
              const IconComponent = social.icon
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 md:w-12 md:h-12 bg-gray-800/50 backdrop-blur-xl border border-gray-700/30 rounded-xl flex items-center justify-center text-gray-300 hover:text-purple-300 hover:border-purple-500/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Ultra-Dark Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-16"
          >
            {[
              { number: '150+', label: 'Visionaries', gradient: 'from-purple-300 to-pink-400' },
              { number: '75+', label: 'Masterpieces', gradient: 'from-pink-300 to-red-400' },
              { number: '25+', label: 'Victories', gradient: 'from-blue-300 to-purple-400' },
              { number: '∞', label: 'Possibilities', gradient: 'from-green-300 to-blue-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -3 }}
                className="relative bg-gray-900/30 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-3 md:p-4 text-center hover:bg-gray-800/40 hover:border-purple-500/20 transition-all duration-300 group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                />
                
                <motion.div 
                  className={`text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1 font-display relative z-10`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-gray-400 font-semibold uppercase tracking-wider text-xs md:text-sm lg:text-base relative z-10">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Extra Space Gap */}
          <div className="h-16 md:h-20 lg:h-24" />
        </div>
      </div>
    </section>
  )
}

export default Hero
