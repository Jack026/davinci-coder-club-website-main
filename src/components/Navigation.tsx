'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeHover, setActiveHover] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events'},
    { href: '/projects', label: 'Projects'},
    { href: '/resources', label: 'Resources'},
    { href: '/team', label: 'Team'},
    { href: '/contact', label: 'Contact'},
  ]

  return (
    <header className="relative z-50">
      {/* Premium Navigation Background */}
      <nav className={`fixed top-0 left-0 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-gray-950/95 backdrop-blur-2xl border-b border-purple-500/20 py-2 shadow-lg shadow-purple-500/10' 
          : 'bg-gray-950/90 backdrop-blur-xl py-3'
      }`}>
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(168, 85, 247, 0.1) 100%)',
              'linear-gradient(90deg, rgba(236, 72, 153, 0.05) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)',
              'linear-gradient(90deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(147, 51, 234, 0.1) 100%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* DESKTOP Layout */}
          <div className="hidden md:flex items-center justify-between">
            
            {/* FIXED Club Logo - Better Visibility */}
            <Link href="/" className="flex items-center gap-4 z-50 relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                className="relative"
              >
                {/* ENHANCED Club Logo Container for Better Visibility */}
                <div className="w-14 h-14 bg-white rounded-xl p-2 shadow-xl border-2 border-gray-200/50">
                  <Image
                    src="/club.png"
                    alt="Da-Vinci Coder Club"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain rounded-lg"
                    priority
                    style={{
                      filter: 'contrast(1.1) brightness(1.05)',
                    }}
                  />
                </div>
                {/* Enhanced glow effect for visibility */}
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm animate-pulse opacity-50" />
              </motion.div>
              
              <div className="flex flex-col">
                <motion.span 
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 leading-tight"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.3))',
                  }}
                >
                  Da-Vinci Coder Club
                </motion.span>
                <span className="text-xs text-purple-400 font-medium tracking-wider">
                  Innovation • Creativity • Excellence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    className="relative"
                    onHoverStart={() => setActiveHover(link.href)}
                    onHoverEnd={() => setActiveHover(null)}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                        isActive 
                          ? 'text-white bg-purple-600/20 border border-purple-500/30' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <span>{link.label}</span>
                      
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg"
                          initial={false}
                          transition={{ type: "spring", duration: 0.4 }}
                        />
                      )}
                      
                      <AnimatePresence>
                        {activeHover === link.href && !isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gray-800/30 rounded-lg"
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* FIXED ADTU Logo - NO BACKGROUND BORDER */}
            <Link href="/" className="group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center px-6 py-3 rounded-2xl transition-all duration-300"
                // REMOVED: bg-gray-800/20 backdrop-blur-xl - No background border
              >
                {/* Clean ADTU logo - No Background Border */}
                <div className="h-14 w-auto bg-white rounded-xl p-2 flex items-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/adtu_updated_logo.png"
                    alt="Assam Down Town University - Go Home"
                    width={160}
                    height={56}
                    className="h-full w-auto object-contain"
                    style={{ maxHeight: '52px' }}
                  />
                </div>
              </motion.div>
            </Link>
          </div>

          {/* MOBILE Layout */}
          <div className="flex md:hidden items-center justify-between w-full relative">
            
            {/* FIXED Mobile Club Logo - Better Visibility */}
            <Link href="/" className="flex items-center gap-2 z-50 relative group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                className="relative"
              >
                {/* ENHANCED Mobile Club Logo for Better Visibility */}
                <div className="w-12 h-12 bg-white rounded-xl p-1.5 shadow-lg border border-gray-200/30">
                  <Image
                    src="/club.png"
                    alt="Da-Vinci Coder Club"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain rounded-lg"
                    priority
                    style={{
                      filter: 'contrast(1.15) brightness(1.1)',
                    }}
                  />
                </div>
                {/* Visibility enhancement glow */}
                <div className="absolute inset-0 bg-white/15 rounded-xl blur-sm animate-pulse opacity-40" />
              </motion.div>
            </Link>

            {/* FIXED Mobile ADTU Logo - NO BACKGROUND BORDER */}
            <Link 
              href="/" 
              className="absolute left-1/2 transform -translate-x-1/2 group"
              style={{ zIndex: 10 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 rounded-xl transition-all duration-300"
                // REMOVED: bg-gray-800/25 backdrop-blur-xl - No background border
              >
                {/* Clean Mobile ADTU Logo - No Background Border */}
                <div className="h-12 w-auto bg-white rounded-lg p-1.5 flex items-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/adtu_updated_logo.png"
                    alt="ADTU - Go Home"
                    width={130}
                    height={48}
                    className="h-full w-auto object-contain"
                    style={{ maxHeight: '42px' }}
                  />
                </div>
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 flex-shrink-0 z-20"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-950/98 backdrop-blur-2xl border-t border-gray-800/50"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                            isActive 
                              ? 'text-white bg-purple-600/20 border border-purple-500/30' 
                              : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="font-medium">{link.label}</span>
                          
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                  
                  {/* FIXED Mobile Menu ADTU Logo - Clean Design */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                    className="mt-3"
                  >
                    <Link 
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block p-4 rounded-xl transition-all duration-300 group hover:bg-gray-800/20"
                      // REMOVED: bg-gray-800/30 border border-gray-700/30 - Clean design
                    >
                      <div className="flex items-center justify-center">
                        {/* Clean Mobile Menu ADTU Logo */}
                        <div className="h-14 w-auto bg-white rounded-xl p-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <Image
                            src="/adtu_updated_logo.png"
                            alt="Assam Down Town University - Go Home"
                            width={150}
                            height={56}
                            className="h-full w-auto object-contain"
                          />
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-xs text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                          Click to go home
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navigation
