'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone, Clock, Users, Zap, Crown } from 'lucide-react'
import Link from 'next/link'
import { useContact } from 'contexts/ContactContext'

const ContactHero = () => {
  const { state } = useContact()
  const { userStatus } = state
  
  const liveStats = [
    { 
      label: 'Response Time', 
      value: '2 min', 
      status: 'online',
      icon: Clock,
      description: 'Average response'
    },
    { 
      label: 'Support Status', 
      value: 'Online', 
      status: 'active',
      icon: Users,
      description: 'Jack026 & team available'
    },
    { 
      label: 'Contact Methods', 
      value: '6+', 
      status: 'available',
      icon: MessageCircle,
      description: 'Ways to reach us'
    },
    { 
      label: 'Emergency Line', 
      value: '24/7', 
      status: 'always',
      icon: Phone,
      description: 'Always accessible'
    }
  ]

  // Enhanced communication waves and particles
  const communicationElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-3xl opacity-30 pointer-events-none select-none"
      style={{
        left: `${15 + Math.random() * 70}%`,
        top: `${20 + Math.random() * 60}%`,
      }}
      animate={{
        y: [-30, -80, -30],
        x: [-25, 45, -25],
        rotate: [0, 180, 360],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration: 25 + Math.random() * 15,
        repeat: Infinity,
        delay: Math.random() * 10,
        ease: "easeInOut"
      }}
    >
      {['📞', '💬', '📧', '📱', '💻', '🤝'][i]}
    </motion.div>
  ))

  return (
    <section className="relative min-h-[75vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary" />
        
        {/* Communication Waves Animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 25% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 45%), radial-gradient(circle at 75% 70%, rgba(244, 63, 94, 0.12) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 35%)',
              'radial-gradient(circle at 80% 20%, rgba(244, 63, 94, 0.15) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 45%), radial-gradient(circle at 60% 40%, rgba(99, 102, 241, 0.08) 0%, transparent 35%)',
              'radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 45%), radial-gradient(circle at 60% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 45%), radial-gradient(circle at 30% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 35%)',
              'radial-gradient(circle at 25% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 45%), radial-gradient(circle at 75% 70%, rgba(244, 63, 94, 0.12) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 35%)'
            ]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Communication Elements */}
        <div className="absolute inset-0">
          {communicationElements}
        </div>

        {/* Communication Pulse Rings */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-80 h-80 border-2 border-primary-500/20 rounded-full"
              style={{
                left: `${30 + i * 20}%`,
                top: `${25 + i * 15}%`,
              }}
              animate={{
                scale: [0.8, 1.4, 0.8],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: "easeInOut"
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
            <li>Contact Us</li>
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
              <span className="text-white">Get In </span>
              <span className="text-gradient">Touch</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-400 font-semibold">
              Let's Build Something Amazing Together
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-16 max-w-5xl mx-auto"
          >
            Hey there! Whether you want to join our community, collaborate on projects, or just say hello to{' '}
            <strong className="text-primary-400">Jack026</strong> and the team - we'd love to hear from you!
          </motion.p>


          {/* Live Status Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {liveStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-glass-strong transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative">
                    <stat.icon className="w-7 h-7 text-white" />
                    
                    {/* Live Indicator */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-bg-primary"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  <div className="text-2xl lg:text-3xl font-bold text-primary-500 mb-2 font-display">
                    {stat.value}
                  </div>
                  
                  <div className="text-white font-semibold text-sm mb-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  
                  <div className="text-gray-400 text-xs text-center">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center gap-6 mt-12 flex-wrap"
          >
            <motion.a
              href="tel:+919876543210"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Jack026
            </motion.a>
            
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 to-green-600 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-lg transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white/20 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:bg-glass hover:border-primary-500 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chat
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero
