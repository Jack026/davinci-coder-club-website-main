'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram, 
  Twitter,
  Heart,
  MessageCircle,
  Facebook,
  Sparkles,
  Zap,
  Star
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Projects', href: '/projects' },
    { label: 'Our Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
    { label: 'Join Us', href: '/join' }
  ]

  const eventCategories = [
    { label: 'Workshops', href: '/events?category=Workshop' },
    { label: 'Hackathons', href: '/events?category=Hackathon' },
    { label: 'Seminars', href: '/events?category=Seminar' },
    { label: 'Competitions', href: '/events?category=Competition' },
    { label: 'Meetups', href: '/events?category=Meetup' },
    { label: 'Tech Talks', href: '/events?category=TechTalk' }
  ]

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/davinci-coder-club', 
      label: 'GitHub',
      color: 'hover:bg-gray-600 hover:text-white',
      bgColor: 'from-gray-700 to-gray-900'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/davinci-coder-club', 
      label: 'LinkedIn',
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'from-blue-600 to-blue-800'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/davinci_coder_club', 
      label: 'Instagram',
      color: 'hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white',
      bgColor: 'from-pink-500 to-purple-600'
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/davinci_coders', 
      label: 'Twitter',
      color: 'hover:bg-sky-500 hover:text-white',
      bgColor: 'from-sky-400 to-sky-600'
    },
    { 
      icon: MessageCircle, 
      href: 'https://wa.me/919876543210', 
      label: 'WhatsApp',
      color: 'hover:bg-green-500 hover:text-white',
      bgColor: 'from-green-500 to-green-600'
    },
    { 
      icon: Facebook, 
      href: 'https://facebook.com/davinci.coder.club', 
      label: 'Facebook',
      color: 'hover:bg-blue-500 hover:text-white',
      bgColor: 'from-blue-500 to-blue-700'
    }
  ]

  // Custom Discord icon component
  const DiscordIcon = () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
    </svg>
  )

  // Add Discord to social links
  const allSocialLinks = [
    ...socialLinks,
    { 
      icon: DiscordIcon, 
      href: 'https://discord.gg/davinci-coders', 
      label: 'Discord',
      color: 'hover:bg-indigo-500 hover:text-white',
      bgColor: 'from-indigo-500 to-indigo-700'
    }
  ]

  return (
    <footer className="bg-bg-tertiary border-t border-white/10 relative overflow-hidden" role="contentinfo">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Enhanced Gradient Mesh */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(244, 63, 94, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(244, 63, 94, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.10) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Premium Floating Elements */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20 pointer-events-none select-none"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              fontSize: `${8 + Math.random() * 4}px`
            }}
            animate={{
              y: [-20, -60, -20],
              x: [-15, 25, -15],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          >
            {['<>', '{}', '[]', '/>', '()', '=>', '&&', '||', '<html>', '</div>', 'fn()', 'var x'][i]}
          </motion.div>
        ))}

        {/* Premium Sparkles */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-primary-400/30"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Main Section - With Smaller "Connect with us" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="relative"
                >
                  {/* Premium Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-lg blur-lg opacity-40 animate-pulse" />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  {/* Rotating Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-dashed border-primary-400/40"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
                <div>
                  <span className="text-lg md:text-xl font-bold text-white font-display">
                    Da-Vinci Coder Club
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-primary-400 font-medium">Premium Tech Community</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Empowering the next generation of innovators at Assam Downtown University through creativity, 
                collaboration, and cutting-edge technology. Join 150+ members in shaping the future.
              </p>
              
              {/* SMALLER Connect With Us Section */}
              <div className="mb-3">
                <div className="flex items-center gap-1 mb-2">
                  <Zap className="w-3 h-3 text-primary-500" />
                  <h5 className="text-white font-medium text-xs">Connect</h5>
                </div>
                {/* Compact Single Row of Social Icons */}
                <div className="flex items-center gap-1 max-w-fit">
                  {allSocialLinks.slice(0, 7).map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`group relative w-6 h-6 bg-glass backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 hover:border-transparent ${social.color}`}
                        aria-label={`Follow us on ${social.label}`}
                      >
                        {/* Premium Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.bgColor} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        
                        <IconComponent className="w-3 h-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        
                        {/* Compact Tooltip */}
                        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                          {social.label}
                        </div>
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Compact Quick Contact */}
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 bg-glass-light px-2 py-1 rounded-md border border-white/5">
                <MessageCircle className="w-2.5 h-2.5 text-green-500" />
                <span>WhatsApp chat</span>
              </div>
            </motion.div>

            {/* Quick Links - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-white mb-4 font-display flex items-center gap-2">
                Quick Links
                <motion.div 
                  className="w-2 h-2 bg-primary-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-all duration-300 text-sm flex items-center gap-2 group py-1 relative"
                    >
                      <motion.div 
                        className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-500 transition-colors duration-300"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                      <div className="absolute bottom-0 left-4 w-0 h-0.5 bg-primary-500/50 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Event Categories - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-white mb-4 font-display flex items-center gap-2">
                Event Categories
                <motion.div 
                  className="w-2 h-2 bg-secondary-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </h4>
              <ul className="space-y-2">
                {eventCategories.map((category, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={category.href}
                      className="text-gray-400 hover:text-primary-400 transition-all duration-300 text-sm flex items-center gap-2 group py-1 relative"
                    >
                      <motion.div 
                        className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-secondary-500 transition-colors duration-300"
                        whileHover={{ scale: 1.5 }}
                      />
                      {category.label}
                      <div className="absolute bottom-0 left-4 w-0 h-0.5 bg-secondary-500/50 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info - Premium Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-white mb-4 font-display flex items-center gap-2">
                Contact Info
                <motion.div 
                  className="w-2 h-2 bg-accent-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </h4>
              <div className="space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-3 p-3 bg-glass backdrop-blur-xl border border-white/10 rounded-xl hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 group"
                >
                  <Mail className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a
                    href="mailto:events@davincicoders.adtu.ac.in"
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm break-all"
                  >
                    events@davincicoders.adtu.ac.in
                  </a>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-3 p-3 bg-glass backdrop-blur-xl border border-white/10 rounded-xl hover:bg-glass-strong hover:border-green-500/30 transition-all duration-300 group"
                >
                  <Phone className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:+919876543210"
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
                    >
                      +91 98765 43210
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      className="text-green-500 hover:text-green-400 transition-colors duration-300 text-xs flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3 animate-pulse" />
                      WhatsApp
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-3 p-3 bg-glass backdrop-blur-xl border border-white/10 rounded-xl hover:bg-glass-strong hover:border-red-500/30 transition-all duration-300 group"
                >
                  <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-400 text-sm leading-relaxed">
                    Assam Downtown University<br />
                    Panikhaiti, Guwahati - 781026
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Premium Footer Bottom */}
        <div className="border-t border-white/10 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-4"
          >
            {/* Premium Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm mb-2">
                © {currentYear} Da-Vinci Coder Club, Assam Downtown University. All rights reserved.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>Built with</span>
                  <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                  <span>by</span>
                  <div className="flex items-center gap-1 bg-glass backdrop-blur-xl px-3 py-1 rounded-full border border-primary-500/30">
                    <Sparkles className="w-3 h-3 text-primary-400" />
                    <span className="text-primary-400 font-bold">Jack026</span>
                  </div>
                </div>
                <span className="hidden sm:inline text-gray-600">|</span>
                <time dateTime="2025-08-06T11:27:18Z" className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  Updated: Aug 6, 2025
                </time>
                <span className="hidden sm:inline text-gray-600">|</span>
                <a
                  href="https://github.com/davinci-coder-club/website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors duration-300"
                >
                  <Github className="w-3 h-3" />
                  Open Source
                </a>
              </div>
            </div>

            {/* Premium Legal Links */}
            <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-end">
              {[
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Conduct', href: '/conduct' },
                { label: 'Accessibility', href: '/accessibility' },
                { label: 'Sitemap', href: '/sitemap' }
              ].map((link, index) => (
                <motion.div key={index} whileHover={{ y: -1 }}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-primary-400 transition-all duration-300 text-xs relative group"
                  >
                    {link.label}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
