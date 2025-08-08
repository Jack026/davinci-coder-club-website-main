'use client'

import { useContact } from 'contexts/ContactContext'
import { motion } from 'framer-motion'
import { Award, Clock, Heart, Star, Users, Zap } from 'lucide-react'

const ContactOptions = () => {
  const { state, dispatch } = useContact()

  const contactOptions = [
    {
      id: 'instant-support',
      title: 'Instant Support',
      description: 'Get immediate help from Jack026 and our support team for technical issues, urgent queries, and real-time assistance.',
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-600',
      features: ['Real-time chat', '2-min response', '24/7 emergency line', 'Screen sharing'],
      stats: { icon: Clock, label: 'Avg Response', value: '90 seconds' },
      action: () => dispatch({ type: 'TOGGLE_CHAT' })
    },
    {
      id: 'collaboration',
      title: 'Project Collaboration',
      description: 'Partner with us on exciting projects, contribute to open-source initiatives, or start a new venture together.',
      icon: Users,
      gradient: 'from-green-500 to-emerald-600',
      features: ['Project partnerships', 'Open source contributions', 'Mentorship programs', 'Joint ventures'],
      stats: { icon: Star, label: 'Success Rate', value: '95%' },
      action: () => console.log('Collaboration')
    },
    {
      id: 'join-community',
      title: 'Join Our Community',
      description: 'Become part of our 150+ member community and connect with passionate developers, designers, and innovators.',
      icon: Heart,
      gradient: 'from-purple-500 to-pink-600',
      features: ['Community access', 'Exclusive events', 'Learning resources', 'Networking opportunities'],
      stats: { icon: Users, label: 'Active Members', value: '150+' },
      action: () => console.log('Join Community')
    },
    {
      id: 'technical-support',
      title: 'Technical Support',
      description: 'Get expert help with coding problems, debugging, architecture decisions, and technology consultations.',
      icon: Award,
      gradient: 'from-orange-500 to-red-600',
      features: ['Code review', 'Debugging help', 'Architecture advice', 'Best practices'],
      stats: { icon: Star, label: 'Satisfaction', value: '98%' },
      action: () => console.log('Technical Support')
    }
  ]

  return (
    <section className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Let's Start a <span className="text-gradient">Conversation</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're here to help and answer any questions you might have. 
            <span className="text-primary-400 font-semibold"> Jack026</span> and our team look forward to hearing from you!
          </p>
        </motion.div>

        {/* Contact Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              onClick={option.action}
              className="group bg-glass backdrop-blur-xl border border-white/10 rounded-3xl p-10 relative overflow-hidden cursor-pointer h-full flex flex-col hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-8 transition-all duration-300`}>
                  <option.icon className="w-10 h-10 text-white" />
                </div>
                
                {/* Stats Badge */}
                <div className="flex items-center gap-2 bg-glass-strong px-4 py-2 rounded-lg border border-white/10">
                  <option.stats.icon className="w-4 h-4 text-primary-500" />
                  <div className="text-sm">
                    <div className="text-primary-500 font-bold">{option.stats.value}</div>
                    <div className="text-gray-400 text-xs">{option.stats.label}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 font-display group-hover:text-primary-400 transition-colors duration-300">
                  {option.title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6 flex-1">
                  {option.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {option.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm text-gray-400 bg-glass-strong px-3 py-2 rounded-md border border-white/10 hover:bg-glass hover:text-gray-300 transition-all duration-200"
                    >
                      <div className="w-2 h-2 bg-success-500 rounded-full flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-2 text-white font-semibold py-3 px-6 rounded-lg bg-gradient-to-r ${option.gradient} hover:shadow-lg transition-all duration-300 mt-auto justify-center`}
                >
                  <span>Get Started</span>
                  <motion.div
                    className="w-4 h-4"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    →
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Contact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center font-display">
            Why Choose Our Support?
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2 font-display">2min</div>
              <div className="text-gray-400 text-sm">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2 font-display">24/7</div>
              <div className="text-gray-400 text-sm">Emergency Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2 font-display">98%</div>
              <div className="text-gray-400 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2 font-display">150+</div>
              <div className="text-gray-400 text-sm">Happy Members</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactOptions
