'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, Mail, Phone, MessageSquare, Clock, Crown } from 'lucide-react'
import { useContact } from 'contexts/ContactContext'

const ContactSuccess = () => {
  const { state, dispatch } = useContact()
  const { notifications } = state

  useEffect(() => {
    // Auto-remove notifications after 5 seconds
    notifications.forEach(notification => {
      if (notification.autoClose) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })
        }, 5000)
      }
    })
  }, [notifications, dispatch])

  const getNotificationIcon = (type: string) => {
    const icons = {
      success: CheckCircle,
      error: X,
      info: Mail,
      warning: Clock
    }
    return icons[type as keyof typeof icons] || CheckCircle
  }

  const getNotificationColor = (type: string) => {
    const colors = {
      success: 'from-green-500 to-emerald-600',
      error: 'from-red-500 to-red-600',
      info: 'from-blue-500 to-blue-600',
      warning: 'from-yellow-500 to-orange-600'
    }
    return colors[type as keyof typeof colors] || colors.success
  }

  const nextSteps = [
    {
      step: 1,
      title: 'Message Received',
      description: 'Jack026 has received your message',
      icon: Mail,
      status: 'completed',
      time: 'Just now'
    },
    {
      step: 2,
      title: 'Under Review',
      description: 'Jack026 is reviewing your inquiry',
      icon: Crown,
      status: 'in-progress',
      time: 'Within 2 minutes'
    },
    {
      step: 3,
      title: 'Personal Response',
      description: 'You\'ll receive a personalized reply',
      icon: MessageSquare,
      status: 'upcoming',
      time: 'Very soon'
    }
  ]

  return (
    <>
      {/* Toast Notifications */}
      <div className="fixed top-24 right-6 z-50 space-y-4 max-w-sm w-full">
        <AnimatePresence>
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type)
            const gradient = getNotificationColor(notification.type)

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 300, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 300, scale: 0.9 }}
                className={`bg-glass backdrop-blur-xl border rounded-2xl p-6 shadow-2xl relative overflow-hidden ${
                  notification.type === 'success' 
                    ? 'border-green-500/30 bg-green-500/5' 
                    : 'border-white/10'
                }`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`} />
                
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-bold mb-2">
                      {notification.type === 'success' ? 'Message Sent Successfully!' : 'Notification'}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {notification.message}
                    </p>
                    
                    {notification.type === 'success' && (
                      <div className="mt-4 p-3 bg-glass-strong border border-white/10 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-primary-400 mb-2">
                          <Crown className="w-4 h-4" />
                          <span className="font-semibold">Jack026's Commitment</span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Personal response within 2 minutes during business hours
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })}
                    className="w-6 h-6 bg-glass-strong hover:bg-glass rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar for Auto-Close */}
                {notification.autoClose && (
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient}`}
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Success Modal Overlay (when showing success state) */}
      <AnimatePresence>
        {state.showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-glass backdrop-blur-xl border border-green-500/30 bg-green-500/5 rounded-3xl p-10 max-w-2xl w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
              
              {/* Celebration Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [-20, -60, -20],
                      rotate: [0, 360, 0],
                      scale: [0, 1.2, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  >
                    {['🎉', '✨', '🚀', '👏', '💫', '⭐', '🌟', '💪'][i]}
                  </motion.div>
                ))}
              </div>

              <div className="text-center relative z-10">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-4 font-display">
                  Message Delivered Successfully! 🎉
                </h3>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Your message has been sent directly to{' '}
                  <span className="text-primary-400 font-bold">Jack026</span>. 
                  Get ready for a personalized response!
                </p>

                {/* Next Steps Timeline */}
                <div className="mb-10">
                  <h4 className="text-xl font-bold text-white mb-6 font-display">
                    What Happens Next?
                  </h4>
                  
                  <div className="space-y-4">
                    {nextSteps.map((step, index) => (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.2 }}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                          step.status === 'completed' ? 'bg-green-500/10 border border-green-500/20' :
                          step.status === 'in-progress' ? 'bg-blue-500/10 border border-blue-500/20' :
                          'bg-glass-strong border border-white/10'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-500' :
                          step.status === 'in-progress' ? 'bg-blue-500 animate-pulse' :
                          'bg-gray-500'
                        }`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <h5 className="text-white font-semibold">{step.title}</h5>
                          <p className="text-gray-400 text-sm">{step.description}</p>
                        </div>
                        
                        <div className="text-right">
                          <span className={`text-sm font-medium ${
                            step.status === 'completed' ? 'text-green-400' :
                            step.status === 'in-progress' ? 'text-blue-400' :
                            'text-gray-400'
                          }`}>
                            {step.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Jack026 Promise */}
                <div className="bg-glass-strong border border-primary-500/20 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-lg font-bold text-white">
                      J
                    </div>
                    <div>
                      <h5 className="text-white font-bold flex items-center gap-2">
                        Jack026's Promise
                        <Crown className="w-4 h-4 text-yellow-500" />
                      </h5>
                      <p className="text-primary-400 text-sm">Lead Developer Commitment</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "I personally read every message and commit to responding within 2 minutes during 
                    business hours. Your inquiry is important to me, and I'll make sure you get the 
                    help you need!"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch({ type: 'SHOW_SUCCESS', payload: false })}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Perfect! Close This
                  </motion.button>
                  
                  <motion.a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold text-center hover:bg-green-600 transition-colors duration-300 flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat on WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ContactSuccess
