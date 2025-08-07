'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle, Bell, Shield } from 'lucide-react'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setMessage('Successfully subscribed! You\'ll receive event notifications.')
      setEmail('')
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }, 2000)
  }

  const benefits = [
    { icon: Bell, text: 'Event Notifications' },
    { icon: Mail, text: 'Weekly Updates' },
    { icon: CheckCircle, text: 'Exclusive Content' }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-bg-secondary to-bg-tertiary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              x: [-10, 10, -10],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              delay: i * 2
            }}
          >
            {['📧', '🔔', '📅', '🎯', '⚡', '🚀'][i]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white font-display">
                Stay <span className="text-gradient">Connected</span>
              </h2>
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Never miss an exciting event! Get the latest updates on workshops, hackathons, 
              and tech talks delivered directly to your inbox.
            </p>

            {/* Benefits */}
            <div className="flex gap-4 flex-wrap mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-glass border border-white/10 rounded-full text-gray-300 hover:bg-glass-strong hover:text-white transition-all duration-300"
                >
                  <benefit.icon className="w-4 h-4 text-primary-500" />
                  <span className="font-medium text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-sm text-gray-400">
              🎯 Join <strong className="text-primary-500">500+</strong> subscribers already getting event updates!
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Welcome Aboard! 🎉</h3>
                <p className="text-gray-300 mb-6">{message}</p>
                <div className="text-sm text-gray-400">
                  Check your email for a confirmation link
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">
                    Get Event Updates
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Subscribe to receive notifications about upcoming events
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-glass-strong border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                      disabled={status === 'loading'}
                    />
                  </div>

                  {message && status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {message}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'loading' || !email}
                    whileHover={{ scale: status !== 'loading' ? 1.02 : 1 }}
                    whileTap={{ scale: status !== 'loading' ? 0.98 : 1 }}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Subscribe to Updates
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 pt-2">
                  <Shield className="w-4 h-4" />
                  <span>
                    We respect your privacy. Unsubscribe anytime.{' '}
                    <a href="/privacy" className="text-primary-500 hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup
