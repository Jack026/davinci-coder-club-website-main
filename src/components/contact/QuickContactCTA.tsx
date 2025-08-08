'use client'

import { motion } from 'framer-motion'
import { Clock, Crown, ExternalLink, Mail, MessageSquare, Phone, Users, Zap } from 'lucide-react'

const QuickContactCTA = () => {
  const quickActions = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Jack026',
      description: 'Get instant responses on WhatsApp',
      icon: MessageSquare,
      gradient: 'from-green-400 to-green-600',
      action: 'https://wa.me/919876543210?text=Hi%20Jack026!%20I%20found%20you%20through%20the%20Da-Vinci%20website.',
      stats: { time: '< 1 min', availability: '8AM - 10PM' },
      featured: true
    },
    {
      id: 'call',
      title: 'Call Direct Line',
      description: 'Speak with Jack026 immediately',
      icon: Phone,
      gradient: 'from-blue-500 to-blue-700',
      action: 'tel:+918765432109',
      stats: { time: 'Immediate', availability: '9AM - 6PM' },
      featured: false
    },
    {
      id: 'email',
      title: 'Priority Email',
      description: 'Send detailed inquiries via email',
      icon: Mail,
      gradient: 'from-purple-500 to-purple-700',
      action: 'mailto:Jack026@davincicoders.club?subject=Priority%20Inquiry&body=Hi%20Jack026,%0A%0AI%20would%20like%20to%20discuss:',
      stats: { time: '2 minutes', availability: '24/7' },
      featured: false
    },
    {
      id: 'discord',
      title: 'Join Discord',
      description: 'Connect with the community',
      icon: Users,
      gradient: 'from-indigo-500 to-indigo-700',
      action: 'https://discord.gg/davincicoders',
      stats: { time: 'Real-time', availability: '24/7' },
      featured: false
    }
  ]

  const emergencyContact = {
    title: '🚨 Emergency Support',
    description: 'Critical issues requiring immediate attention',
    phone: '+91 76543 21098',
    availability: '24/7',
    responseTime: 'Immediate'
  }

  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/3" />
        
        {/* Floating Contact Elements */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20 pointer-events-none select-none"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              x: [-15, 30, -15],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            {['📞', '💬', '📧', '🚀', '⚡', '👥', '🎯', '✨'][i]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Quick <span className="text-gradient">Contact</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Need immediate assistance? Choose your preferred way to reach{' '}
            <span className="text-primary-400 font-semibold">Jack026</span> and get instant support
          </p>
        </motion.div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.id}
              href={action.action}
              target={action.action.startsWith('http') ? '_blank' : '_self'}
              rel={action.action.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`group bg-glass backdrop-blur-xl border rounded-3xl p-8 relative overflow-hidden cursor-pointer h-full flex flex-col hover:bg-glass-strong transition-all duration-300 ${
                action.featured 
                  ? 'border-primary-500/40 bg-primary-500/5' 
                  : 'border-white/10 hover:border-primary-500/30'
              }`}
            >
              {action.featured && (
                <>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
                  <div className="absolute top-3 right-3">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Recommended
                    </div>
                  </div>
                </>
              )}

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-8 transition-all duration-300`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-primary-400 transition-colors duration-300">
                  {action.title}
                </h3>

                <p className="text-gray-300 mb-6 flex-1 leading-relaxed">
                  {action.description}
                </p>

                {/* Stats */}
                <div className="bg-glass-strong border border-white/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      Response Time
                    </div>
                    <span className={`text-xs font-semibold ${action.featured ? 'text-primary-400' : 'text-green-400'}`}>
                      {action.stats.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Zap className="w-3 h-3" />
                      Available
                    </div>
                    <span className="text-xs font-semibold text-gray-300">
                      {action.stats.availability}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-2 font-semibold py-3 px-6 rounded-lg transition-all duration-300 mt-auto justify-center ${
                    action.featured
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/25'
                      : `bg-gradient-to-r ${action.gradient} text-white hover:shadow-lg`
                  }`}
                >
                  <span>Connect Now</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Emergency Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500/10 via-red-500/5 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 animate-pulse" />
          
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="text-3xl"
                >
                  🚨
                </motion.div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">
                  {emergencyContact.title}
                </h3>
                <p className="text-gray-300 mb-3">
                  {emergencyContact.description}
                </p>
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-1 text-red-400">
                    <Phone className="w-4 h-4" />
                    <span className="font-mono font-semibold">{emergencyContact.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <Clock className="w-4 h-4" />
                    <span>{emergencyContact.availability}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-400">
                    <Zap className="w-4 h-4" />
                    <span>{emergencyContact.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <motion.a
              href={`tel:${emergencyContact.phone.replace(/\s/g, '')}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Emergency Call
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.div>
            </motion.a>
          </div>
        </motion.div>

        {/* Jack026 Personal Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-glass backdrop-blur-xl border border-primary-500/30 bg-primary-500/5 rounded-2xl p-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-2xl font-bold text-white relative">
              J
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-500"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white font-display flex items-center gap-2">
                A Message from Jack026
                <Crown className="w-6 h-6 text-yellow-500 animate-bounce" />
              </h3>
              <p className="text-primary-400 font-semibold">Lead Developer & Your Direct Contact</p>
            </div>
          </div>

          <blockquote className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto italic">
            "I'm personally committed to helping every member of our community succeed. Whether you need 
            technical guidance, want to collaborate on a project, or just want to chat about technology - 
            don't hesitate to reach out. I read every message personally and promise you'll get the support you need!"
          </blockquote>

          <div className="flex justify-center gap-4 mt-8">
            <motion.a
              href="mailto:Jack026@davincicoders.club"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email Jack026
            </motion.a>
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuickContactCTA
