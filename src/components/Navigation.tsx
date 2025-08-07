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
          <div className="flex items-center justify-between">
            
            {/* Da-Vinci Coder Club Logo as Home Button */}
            <Link href="/" className="flex items-center gap-4 z-50 relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                className="relative"
              >
                {/* Using actual Coder Club logo */}
                <div className="w-12 h-12 bg-white rounded-xl p-1 shadow-lg">
                  <Image
                    src="/CODER CLUB.png"
                    alt="Da-Vinci Coder Club"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain rounded-lg"
                    priority
                  />
                </div>
              </motion.div>
              
              <div className="hidden sm:flex flex-col">
                <motion.span 
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 leading-tight"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  Da-Vinci Coder Club
                </motion.span>
                <span className="text-xs text-purple-400 font-medium tracking-wider">
                  Innovation • Creativity • Excellence
                </span>
              </div>
            </Link>

            {/* Clean Desktop Navigation */}
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
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg"
                          initial={false}
                          transition={{ type: "spring", duration: 0.4 }}
                        />
                      )}
                      
                      {/* Hover effect */}
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

            {/* ADTU University Logo - Bigger & Cleaner Border */}
<div className="flex items-center gap-3">
  <motion.div
    whileHover={{ scale: 1.06 }}
    className="flex items-center bg-gray-800/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-gray-500/20 hover:border-purple-500/30 transition-all duration-300"
  >
    {/* Larger ADTU logo */}
    <div className="h-12 w-auto bg-white rounded-lg p-2 flex items-center">
      <Image
        src="/adtu_updated_logo.png"
        alt="Assam Down Town University"
        width={130} // Bigger width
        height={48} // Bigger height
        className="h-full w-auto object-contain"
        style={{ maxHeight: '44px' }} // Taller for visibility
      />
    </div>
  </motion.div>

  {/* Mobile Menu Button */}
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className="md:hidden p-3 text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300"
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
        </div>

        {/* Clean Mobile Menu */}
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
                            <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full" />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                  
                  {/* Mobile University Logo - Properly sized */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                    className="mt-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30"
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-10 w-auto bg-white rounded-lg p-1">
                        <Image
                          src="/adtu_updated_logo.jpg"
                          alt="Assam Down Town University"
                          width={120}
                          height={40}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    </div>
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
