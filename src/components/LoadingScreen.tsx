'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing')
  const [isComplete, setIsComplete] = useState(false)

  const loadingStates = [
    'Initializing',
    'Connecting',
    'Loading Resources',
    'Almost Ready',
    'Complete'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 6 + 2 // Random increment between 2-8%
        const newProgress = Math.min(prev + increment, 100)
        
        // Update loading text based on progress thresholds
        if (newProgress < 20) setLoadingText(loadingStates[0])
        else if (newProgress < 40) setLoadingText(loadingStates[1])
        else if (newProgress < 60) setLoadingText(loadingStates[2])
        else if (newProgress < 90) setLoadingText(loadingStates[3])
        else {
          setLoadingText(loadingStates[4])
          setIsComplete(true)
        }
        
        if (newProgress >= 100) {
          clearInterval(interval)
        }
        
        return newProgress
      })
    }, 180) // Every 180ms as specified

    return () => clearInterval(interval)
  }, [])

  // Letter-by-letter reveal animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1 + (i * 0.1), // Start at 1s delay, then 0.1s between letters
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black to-gray-900/20" />
      
      {/* Ultra-fine grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-gray-700" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-gray-700" />

      {/* Main content container */}
      <div className="text-center relative z-10 max-w-2xl mx-auto px-8">
        
        {/* ADTU - Small text at top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <span 
            className="text-gray-500 font-mono tracking-[0.2em] uppercase"
            style={{ fontSize: '11px' }}
          >
            ADTU
          </span>
        </motion.div>

        {/* Main hero text - CODER CLUB */}
        <div className="mb-16 overflow-hidden">
          {['CODER', 'CLUB'].map((word, wordIndex) => (
            <div key={word} className="overflow-hidden">
              <div className="flex justify-center">
                {word.split('').map((letter, letterIndex) => {
                  const globalIndex = wordIndex === 0 ? letterIndex : 5 + letterIndex
                  return (
                    <motion.span
                      key={`${word}-${letterIndex}`}
                      custom={globalIndex}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block text-white"
                      style={{
                        fontSize: 'clamp(48px, 12vw, 70px)',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        lineHeight: '0.9'
                      }}
                    >
                      {letter}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Progress section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-8 max-w-md mx-auto"
        >
          {/* Progress bar */}
          <div className="relative">
            <div className="w-full h-[1px] bg-gray-800 overflow-hidden">
              <motion.div 
                className="h-full bg-white relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white blur-[1px] opacity-50" />
              </motion.div>
            </div>
            
            {/* Progress percentage display */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-400 font-mono text-xs tabular-nums">
                {Math.round(progress).toString().padStart(3, '0')}%
              </span>
              <span className="text-gray-600 font-mono text-xs">
                100%
              </span>
            </div>
          </div>

          {/* Loading status text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={loadingText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-gray-400 font-mono text-sm tracking-wide">
                {loadingText}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Loading dots */}
          {!isComplete && (
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[1px] h-[1px] bg-gray-600 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Bottom signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <p className="text-gray-700 font-mono text-[10px] tracking-widest uppercase">
            Est. {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingScreen
