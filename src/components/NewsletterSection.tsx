'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle, Send, Shield } from 'lucide-react'

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setMessage('Successfully subscribed! Welcome to the Da-Vinci community.')
      setEmail('')
    }, 2000)
  }

  const benefits = [
    { icon: CheckCircle, text: 'Weekly Updates' },
    { icon: CheckCircle, text: 'Event Notifications' },
    { icon: CheckCircle, text: 'Exclusive Content' }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-bg-tertiary to-bg-quaternary relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
              Stay in the <span className="text-gradient">Loop</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get the latest updates on events, workshops, and exciting opportunities 
              directly in your inbox. Join 500+ subscribers!
            </p>
            
            <div className="flex gap-6 flex-wrap">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400">
                  <benefit.icon className="w-5 h-5 text-success-500" />
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-glass-strong border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status !== 'loading' ? 1.05 : 1 }}
                  whileTap={{ scale: status !== 'loading' ? 0.95 : 1 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Subscribe
                    </>
                  )}
                </motion.button>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 text-sm ${
                    status === 'success' ? 'text-success-500' : 'text-red-500'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {message}
                </motion.div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-400 pt-2">
                <Shield className="w-4 h-4" />
                <span>
                  We respect your privacy. Unsubscribe at any time.{' '}
                  <a href="/privacy" className="text-primary-500 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
