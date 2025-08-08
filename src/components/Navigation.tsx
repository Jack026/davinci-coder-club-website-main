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
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/projects', label: 'Projects' },
    { href: '/resources', label: 'Resources' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="relative z-50">
      <nav className={`fixed top-0 left-0 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-950/98 backdrop-blur-lg border-b border-purple-500/20 py-1' 
          : 'bg-gray-950/95 backdrop-blur-md py-2'
      }`}>
        {/* Subtle Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              'linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
              'linear-gradient(90deg, rgba(236, 72, 153, 0.05) 0%, rgba(168, 85, 247, 0.1) 100%)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between h-16">
            
            {/* Club Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-md">
                  <Image
                    src="/club.png"
                    alt="Da-Vinci Coder Club"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain rounded"
                    priority
                  />
                </div>
              </motion.div>
              
              <div className="flex flex-col">
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 leading-tight">
                  Da-Vinci Coder Club
                </span>
                <span className="text-xs text-purple-400/80 font-medium tracking-wide">
                  Innovation • Excellence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-1">
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
                      className={`relative px-3 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                        isActive 
                          ? 'text-white bg-purple-600/20 border border-purple-500/30' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
                      }`}
                    >
                      {link.label}
                      
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-md"
                          initial={false}
                          transition={{ type: "spring", duration: 0.3 }}
                        />
                      )}
                      
                      <AnimatePresence>
                        {activeHover === link.href && !isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gray-800/20 rounded-md"
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* ADTU Logo */}
            <Link href="/" className="group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="transition-all duration-200"
              >
                <div className="h-10 w-auto bg-white rounded-lg p-1.5 shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <Image
                    src="/adtu_updated_logo.png"
                    alt="Assam Down Town University"
                    width={120}
                    height={40}
                    className="h-full w-auto object-contain"
                  />
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between h-14 relative">
            
            {/* Mobile Club Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-9 h-9 bg-white rounded-lg p-1 shadow-md">
                  <Image
                    src="/club.png"
                    alt="Da-Vinci Coder Club"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain rounded"
                    priority
                  />
                </div>
              </motion.div>
              <div>
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  Da-Vinci
                </span>
              </div>
            </Link>

            {/* Mobile ADTU Logo (Centered) */}
            <Link 
              href="/" 
              className="absolute left-1/2 transform -translate-x-1/2 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="h-9 w-auto bg-white rounded-lg p-1 shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <Image
                    src="/adtu_updated_logo.png"
                    alt="ADTU"
                    width={100}
                    height={36}
                    className="h-full w-auto object-contain"
                  />
                </div>
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200 flex-shrink-0 z-20"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Mobile Menu Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu Content */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 w-full bg-gray-950/98 backdrop-blur-lg border-b border-gray-800/50 shadow-xl z-50"
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
                          transition={{ delay: index * 0.03, duration: 0.15 }}
                        >
                          <Link
                            href={link.href}
                            className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-200 ${
                              isActive 
                                ? 'text-white bg-purple-600/20 border border-purple-500/30' 
                                : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="font-medium">{link.label}</span>
                            {isActive && (
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                            )}
                          </Link>
                        </motion.div>
                      )
                    })}
                    
                    {/* Mobile Menu Footer */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navLinks.length * 0.03 + 0.1 }}
                      className="mt-4 pt-4 border-t border-gray-800/50"
                    >
                      <Link 
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block p-3 rounded-lg hover:bg-gray-800/20 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-center mb-2">
                          <div className="h-12 w-auto bg-white rounded-lg p-2 shadow-md">
                            <Image
                              src="/adtu_updated_logo.png"
                              alt="Assam Down Town University"
                              width={120}
                              height={48}
                              className="h-full w-auto object-contain"
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-xs text-gray-400 font-medium">
                            Tap to go home
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navigation