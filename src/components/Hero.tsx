'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [isTypingDone, setIsTypingDone] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const fullText = 'Da-Vinci'

  // Enhanced typing effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let i = 0
    
    const type = () => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i))
        i++
        const delay = i < 3 ? 80 : i > fullText.length - 2 ? 150 : 100
        timeoutId = setTimeout(type, delay)
      } else {
        setIsTypingDone(true)
      }
    }
    
    timeoutId = setTimeout(type, 200)
    return () => clearTimeout(timeoutId)
  }, [])

  // Enhanced mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 25, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 25, damping: 25 })

  const containerRef = useRef<HTMLDivElement | null>(null)
  
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (prefersReducedMotion) return
    
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x * 0.3)
    mouseY.set(y * 0.3)
  }, [mouseX, mouseY, prefersReducedMotion])

  // Enhanced massive star field
  const stars = useMemo(() => {
    if (prefersReducedMotion) return []
    
    const width = typeof window !== 'undefined' ? window.innerWidth : 1440
    const height = typeof window !== 'undefined' ? window.innerHeight : 1000
    const count = Math.min(400, Math.max(200, Math.floor(width / 5)))
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 99 + 0.5,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 35 + 20,
      delay: 0,
      initialY: -(Math.random() * height * 3),
      blinkDuration: Math.random() * 4 + 1.5,
      drift: Math.random() * 20 - 10,
      isShootingStar: Math.random() < 0.08,
      brightness: Math.random() * 0.9 + 0.3,
    }))
  }, [prefersReducedMotion])

  // Tech stack names for random placement
  const techStacks = useMemo(() => {
    if (prefersReducedMotion) return []
    
    const stacks = ['React', 'TypeScript', 'Node.js', 'Python', 'JavaScript', 'CSS', 'HTML', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'Vue', 'Angular', 'Next.js', 'Express', 'GraphQL', 'Redux', 'Tailwind', 'Webpack']
    
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      top: Math.random() * 80 + 10,
      stack: stacks[Math.floor(Math.random() * stacks.length)],
      duration: Math.random() * 20 + 25,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.2 + 0.05,
      size: Math.random() * 4 + 8,
    }))
  }, [prefersReducedMotion])

  // MASSIVE SCATTERED PNG LOGOS - Everywhere on screen
  const scatteredLogos = useMemo(() => {
    if (prefersReducedMotion) return []
    
    const techIcons = [
      { name: 'React', icon: '/react.png' },
      { name: 'TypeScript', icon: '/visual-studio-code.png' },
      { name: 'Node.js', icon: '/nodejs.png' },
      { name: 'Python', icon: '/python.png' },
      { name: 'JavaScript', icon: '/javascript.png' },
      { name: 'CSS', icon: '/css.png' },
      { name: 'HTML', icon: '/html.png' },
      { name: 'Docker', icon: '/docker.png' },
      { name: 'Git', icon: '/git.png' },
      { name: 'Flutter', icon: '/flutter.png' },
    ]
    
    // Generate 40+ scattered logos all over the screen
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100% across entire screen width
      top: Math.random() * 100,  // 0-100% across entire screen height
      ...techIcons[i % techIcons.length], // Cycle through tech icons
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 15,
      size: Math.random() * 20 + 15, // Variable sizes
      opacity: Math.random() * 0.4 + 0.15,
      rotation: Math.random() * 360,
    }))
  }, [prefersReducedMotion])

  const parallaxX = useTransform(springX, v => v * 12)
  const parallaxY = useTransform(springY, v => v * 6)

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden 
                 pt-12 sm:pt-16 md:pt-20 lg:pt-16 
                 px-3 sm:px-4 md:px-6 lg:px-8
                 bg-black font-mono"
      onMouseMove={onMouseMove}
      style={{
        background: `
          radial-gradient(ellipse at top, #0f0f23 0%, #000000 50%),
          radial-gradient(ellipse at bottom, #1a0033 0%, #000000 70%)
        `,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, 'Cascadia Code', monospace",
      }}
    >
      {/* Enhanced Deep Space Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(2400px 1600px at 25% 15%, rgba(75,0,130,0.18), transparent 45%),
              radial-gradient(2000px 1200px at 85% 85%, rgba(25,25,112,0.15), transparent 55%),
              radial-gradient(1800px 1000px at 60% 40%, rgba(138,43,226,0.12), transparent 60%),
              radial-gradient(1600px 900px at 15% 75%, rgba(72,61,139,0.1), transparent 50%),
              radial-gradient(2200px 1400px at 90% 20%, rgba(0,0,139,0.08), transparent 65%)
            `,
          }}
        />

        {/* Enhanced matrix grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Improved noise texture */}
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix in='turbulence' type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.7'/></svg>")`,
          }}
        />
      </div>

      {/* Random Tech Stacks - Mobile Responsive */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {techStacks.map((tech) => (
            <motion.div
              key={tech.id}
              className="absolute font-mono text-xs sm:text-sm select-none"
              style={{
                left: `${tech.left}%`,
                top: `${tech.top}%`,
                opacity: tech.opacity,
                fontSize: `${Math.max(tech.size, 6)}px`, // Minimum 6px for mobile
                color: '#666',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(tech.id) * 15, 0],
                opacity: [tech.opacity * 0.5, tech.opacity, tech.opacity * 0.5],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: tech.duration,
                delay: tech.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {tech.stack}
            </motion.div>
          ))}
        </div>
      )}

      {/* MASSIVE SCATTERED PNG LOGOS - ALL OVER SCREEN */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {scatteredLogos.map((logo) => (
            <motion.div
              key={logo.id}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${logo.left}%`,
                top: `${logo.top}%`,
                width: `${Math.max(logo.size, 12)}px`, // Minimum 12px for mobile
                height: `${Math.max(logo.size, 12)}px`,
                opacity: logo.opacity,
                filter: 'drop-shadow(0 0 8px rgba(0,255,255,0.2))',
                transform: `rotate(${logo.rotation}deg)`,
              }}
              animate={{
                y: [-20, -60, -20],
                x: [-15, 30, -15],
                rotate: [logo.rotation, logo.rotation + 180, logo.rotation + 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [logo.opacity * 0.3, logo.opacity, logo.opacity * 0.3],
              }}
              transition={{
                duration: logo.duration,
                repeat: Infinity,
                delay: logo.delay,
                ease: "easeInOut"
              }}
            >
              <Image 
                src={logo.icon} 
                alt={logo.name}
                width={Math.max(logo.size, 12)} // Responsive width
                height={Math.max(logo.size, 12)} // Responsive height
                className="w-full h-full object-contain"
                style={{
                  filter: 'brightness(0.7) contrast(1.1) saturate(1.2)',
                  maxWidth: '40px', // Max size for larger screens
                  maxHeight: '40px',
                }}
                sizes="(max-width: 640px) 12px, (max-width: 768px) 16px, 24px"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Enhanced Deep Space Foundation */}
      <div className="absolute bottom-0 left-0 right-0 h-[35vh] sm:h-[40vh] md:h-[45vh] pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(0deg, 
                rgba(0,0,0,0.95) 0%,
                rgba(25,25,112,0.2) 15%,
                rgba(75,0,130,0.12) 30%,
                rgba(138,43,226,0.08) 50%,
                rgba(72,61,139,0.05) 70%,
                transparent 100%
              )
            `,
          }}
        />
      </div>

      {/* Mobile Responsive Spear */}
      <motion.div 
        className="absolute inset-0 overflow-hidden" 
        style={{ 
          x: !prefersReducedMotion ? parallaxX : 0,
          y: !prefersReducedMotion ? parallaxY : 0,
          willChange: 'transform',
        }}
        initial={{ opacity: 0.9, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          
          {/* Responsive energy field */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute w-24 h-[60%] sm:w-32 sm:h-[70%] md:w-36 md:h-[75%] rounded-full"
              style={{
                background: `linear-gradient(0deg, 
                  transparent 0%, 
                  rgba(138,43,226,0.06) 30%,
                  rgba(0,255,255,0.04) 50%, 
                  rgba(138,43,226,0.06) 70%,
                  transparent 100%
                )`,
                filter: 'blur(3px)',
              }}
              animate={{
                scaleX: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          {/* Mobile Responsive Spear Base */}
          <motion.div
            className="absolute -bottom-6 sm:-bottom-8 md:-bottom-12"
            animate={!prefersReducedMotion ? { 
              opacity: [0.7, 0.9, 0.7], 
              y: [0, 8, 0],
            } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >
            <svg className="w-6 h-10 sm:w-8 sm:h-14 md:w-10 md:h-20" viewBox="0 0 30 80">
              <defs>
                <linearGradient id="ultraSpearBase" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0,255,255,0.9)" />
                  <stop offset="40%" stopColor="rgba(138,43,226,0.8)" />
                  <stop offset="100%" stopColor="rgba(75,0,130,0.6)" />
                </linearGradient>
              </defs>
              <path d="M15 80 L20 68 L18 58 L15 62 L12 58 L10 68 Z" fill="url(#ultraSpearBase)" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced White Star Field */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.left}%`,
              top: `${star.initialY}px`,
              width: star.isShootingStar ? `${star.size * 0.8}px` : `${star.size}px`,
              height: star.isShootingStar ? `${star.size * 4}px` : `${star.size}px`,
              background: star.isShootingStar 
                ? 'linear-gradient(180deg, white 0%, rgba(255,255,255,0.8) 20%, transparent 100%)'
                : 'radial-gradient(circle, white, transparent)',
              boxShadow: star.isShootingStar 
                ? '0 0 8px white, 0 0 16px rgba(255,255,255,0.6)'
                : '0 0 4px rgba(255,255,255,0.5)',
              borderRadius: star.isShootingStar ? '50% 50% 50% 50% / 20% 20% 80% 80%' : '50%',
              willChange: 'transform',
              transform: 'translate3d(0,0,0)',
            }}
            animate={{
              y: [
                star.initialY, 
                (typeof window !== 'undefined' ? window.innerHeight : 1000) + 120
              ],
              x: [0, star.drift],
              opacity: star.isShootingStar 
                ? [0, 1, 1, 0.8, 0] 
                : [0, star.brightness, star.brightness, 0],
            }}
            transition={{
              duration: star.duration,
              delay: 0,
              repeat: Infinity,
              ease: star.isShootingStar ? 'easeIn' : 'linear',
            }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                background: star.isShootingStar 
                  ? 'linear-gradient(180deg, white 0%, rgba(255,255,255,0.6) 30%, transparent 100%)'
                  : 'radial-gradient(circle, white, transparent)',
                borderRadius: star.isShootingStar ? '50% 50% 50% 50% / 20% 20% 80% 80%' : '50%',
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: star.isShootingStar ? [0.8, 1.2, 0.8] : [0.8, 1.4, 0.8],
              }}
              transition={{ 
                duration: star.blinkDuration, 
                repeat: Infinity, 
                ease: 'easeInOut',
              }}
            />
            
            {star.isShootingStar && (
              <motion.div
                className="absolute w-px h-16 sm:h-20 opacity-80"
                style={{
                  background: 'linear-gradient(0deg, transparent, white, transparent)',
                  left: '50%',
                  top: '-60px',
                  transform: 'translateX(-50%)',
                  filter: 'blur(0.5px)',
                }}
                animate={{
                  scaleY: [0, 2, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Random Tack Stacks - Mobile Responsive */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => { // Reduced for mobile
            const left = Math.random() * 100
            const top = Math.random() * 100
            const rotation = Math.random() * 360
            const size = Math.random() * 6 + 4 // Smaller for mobile
            const opacity = Math.random() * 0.3 + 0.1
            return (
              <motion.div
                key={`tack-stack-${i}`} 
                className="absolute text-white select-none"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  fontSize: `${size}px`,
                  opacity,
                  transform: `rotate(${rotation}deg)`,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  fontWeight: 'bold',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                animate={{
                  rotate: [rotation, rotation + 360],
                  opacity: [opacity * 0.5, opacity, opacity * 0.5],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                +
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Mobile Responsive Main Content */}
      <motion.div 
        ref={containerRef} 
        className="container mx-auto relative z-10 max-w-7xl w-full"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
          
          {/* Mobile Responsive Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6"
          >
            <h1 className="font-bold leading-tight tracking-tight">
              <motion.span
                className="block text-cyan-100 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-1 sm:mb-2 md:mb-3 lg:mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  fontWeight: 400,
                  textShadow: '0 0 12px rgba(0,255,255,0.4)',
                }}
              >
                &gt; Welcome to the
              </motion.span>

              <motion.span
                className="relative inline-block text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl mb-1 sm:mb-2 md:mb-3 lg:mb-4 font-bold"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}
              >
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-purple-300 to-blue-200"
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(0,255,255,0.5))',
                  }}
                >
                  {displayText}
                </span>
                
                <motion.span
                  className="inline-block align-middle ml-1 sm:ml-2 md:ml-3"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <span 
                    className="block w-[1px] sm:w-[2px] md:w-[3px] h-[0.8em] sm:h-[1em] md:h-[1.2em] bg-cyan-400 rounded-full"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(0,255,255,1))',
                    }}
                  />
                </motion.span>

                {/* Mobile Responsive shimmer effect */}
                {isTypingDone && !prefersReducedMotion && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 rounded-lg"
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '120%', opacity: [0, 0.6, 0] }}
                    transition={{ duration: 3, delay: 0.5 }}
                    style={{
                      background: `linear-gradient(120deg, 
                        transparent 0%, 
                        rgba(0,255,255,0.2) 50%,
                        transparent 100%
                      )`,
                    }}
                  />
                )}
              </motion.span>

              <motion.span
                className="block text-cyan-100 text-base sm:text-lg md:text-xl lg:text-3xl xl:text-5xl font-medium"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  fontWeight: 500,
                  textShadow: '0 0 8px rgba(0,255,255,0.3)',
                }}
              >
                Coder Club
              </motion.span>
            </h1>
          </motion.div>

          {/* Mobile Responsive Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-2 sm:space-y-3 md:space-y-4"
          >
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold"
              style={{ 
                fontFamily: "'JetBrains Mono', monospace", 
                fontWeight: 600,
                textShadow: '0 0 10px rgba(138,43,226,0.4)',
              }}
            >
              <span className="text-cyan-300">Art</span>
              <span className="text-gray-200 mx-1 sm:mx-2 md:mx-3 lg:mx-4">.meets(</span>
              <span className="text-purple-300">Code</span>
              <span className="text-gray-200">)</span>
            </p>

            <p 
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium px-2 sm:px-0"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 }}
            >
              The most <span className="text-cyan-300 font-semibold">innovative</span> and{' '}
              <span className="text-purple-300 font-semibold">creative</span> coding community.
              <br className="hidden sm:block" />
              Join <span className="text-blue-300 font-semibold">150+ visionaries</span> building tomorrow's digital masterpieces.
            </p>
          </motion.div>

          {/* Mobile Responsive Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2 sm:px-0"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 rounded-lg text-black font-semibold text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden border-2 border-cyan-400/50"
              style={{
                background: `linear-gradient(135deg, rgba(0,255,255,0.95), rgba(138,43,226,0.85), rgba(75,0,130,0.9))`,
                backdropFilter: 'blur(10px)',
                willChange: 'transform',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                boxShadow: '0 0 25px rgba(0,255,255,0.4)',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                ./join_revolution
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 rounded-lg text-cyan-300 font-semibold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 border-2 border-cyan-400/50"
              style={{
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(12px)',
                willChange: 'transform',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                boxShadow: '0 0 20px rgba(138,43,226,0.2)',
              }}
            >
              explore --magic
            </motion.button>
          </motion.div>

          {/* Mobile Responsive Social Links */}
          <motion.div
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#', label: 'Email' },
            ].map((social, index) => {
              const IconComponent = social.icon
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-black/80 backdrop-blur-xl border-2 border-cyan-400/40 rounded-lg flex items-center justify-center text-gray-300 hover:text-cyan-300 transition-all duration-300"
                  style={{ 
                    willChange: 'transform',
                    boxShadow: '0 0 20px rgba(0,0,0,0.6)',
                  }}
                  aria-label={social.label}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Mobile Responsive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-6xl mx-auto px-2 sm:px-0"
          >
            {[
              { number: '150+', label: 'Visionaries', gradient: 'from-cyan-300 to-purple-400' },
              { number: '75+', label: 'Masterpieces', gradient: 'from-purple-300 to-pink-400' },
              { number: '25+', label: 'Victories', gradient: 'from-blue-300 to-cyan-400' },
              { number: '∞', label: 'Possibilities', gradient: 'from-green-300 to-blue-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative bg-black/70 backdrop-blur-xl border-2 border-cyan-400/30 rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 text-center hover:bg-black/80 transition-all duration-300"
                style={{ 
                  willChange: 'transform',
                  boxShadow: '0 0 25px rgba(0,0,0,0.6)',
                }}
              >
                <motion.div
                  className={`text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1 sm:mb-2`}
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}
                  animate={!prefersReducedMotion ? { y: [0, -2, 0] } : {}}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    delay: index * 0.7, 
                    ease: 'easeInOut' 
                  }}
                >
                  {stat.number}
                </motion.div>
                
                <div 
                  className="text-gray-400 font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="h-8 sm:h-12 md:h-16 lg:h-20 xl:h-24" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
