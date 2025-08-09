

'use client'

import { useContact } from '@/contexts/ContactContext'
import { createClient } from '@/lib/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, Loader, Mail, MessageSquare, Phone, Send, User } from 'lucide-react'
import { useEffect, useState } from 'react'

const MainContactSection = () => {
  const supabase = createClient()
  const { state, dispatch } = useContact()
  const { form, isSubmitting, showSuccess, userStatus } = state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [charCount, setCharCount] = useState(0)

  const categories = [
    { value: '', label: 'Select a topic...', disabled: true },
    { value: 'general', label: '💬 General Inquiry' },
    { value: 'join-team', label: '🤝 Join Our Team' },
    { value: 'technical-support', label: '🔧 Technical Support' },
    { value: 'partnership', label: '🚀 Partnership & Collaboration' },
    { value: 'emergency', label: '🚨 Emergency Support' },
    { value: 'feedback', label: '⭐ Feedback & Suggestions' }
  ]

  const urgencyLevels = [
    { value: 'low', label: 'Low', description: 'Response within 24 hours', color: 'text-blue-500' },
    { value: 'normal', label: 'Normal', description: 'Response within 2 hours', color: 'text-green-500' },
    { value: 'high', label: 'High', description: 'Response within 30 minutes', color: 'text-yellow-500' },
    { value: 'urgent', label: 'Urgent', description: 'Immediate response', color: 'text-red-500' }
  ]

  useEffect(() => {
    setCharCount(form.message.length)
  }, [form.message])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (!form.category) newErrors.category = 'Please select a category'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    else if (form.message.length < 10) newErrors.message = 'Message must be at least 10 characters'
    if (!form.terms) newErrors.terms = 'Please accept the terms and conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    dispatch({ type: 'SET_SUBMITTING', payload: true })

    try {
      // Submit to Supabase
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          name: state.form.name,
          email: state.form.email,
          phone: state.form.phone,
          subject: state.form.subject,
          category: state.form.category,
          message: state.form.message,
          urgency: state.form.urgency
        }])
        .select()

      if (error) throw error

      // Success handling
      dispatch({ type: 'SHOW_SUCCESS', payload: true })
      dispatch({ 
        type: 'ADD_NOTIFICATION', 
        payload: { 
          type: 'success', 
          message: 'Message sent successfully! Jack026 will respond soon.', 
          autoClose: true 
        } 
      })

      // Send notification to Jack026 (Edge Function)
      await supabase.functions.invoke('notify-Jack026', {
        body: { messageId: data[0].id, urgency: state.form.urgency }
      })

    } catch (error) {
      console.error('Error submitting form:', error)
      dispatch({ 
        type: 'ADD_NOTIFICATION', 
        payload: { 
          type: 'error', 
          message: 'Failed to send message. Please try again.', 
          autoClose: true 
        } 
      })
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false })
    }
  }

  const handleInputChange = (field: keyof typeof form, value: string | boolean) => {
    dispatch({ type: 'UPDATE_FORM', payload: { [field]: value } })
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get comprehensive help via email',
      details: [
        { label: 'Response Time', value: '2 minutes avg' },
        { label: 'Availability', value: '24/7' },
        { label: 'Best For', value: 'Detailed inquiries' }
      ],
      contact: 'Jack026@davincicoders.club',
      status: 'online'
    },
    {
      icon: Phone,
      title: 'Direct Call',
      description: 'Speak directly with Jack026',
      details: [
        { label: 'Response Time', value: 'Immediate' },
        { label: 'Availability', value: 'Mon-Fri 9AM-6PM' },
        { label: 'Best For', value: 'Urgent matters' }
      ],
      contact: '+91 87654 32109',
      status: 'online'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Real-time chat with our team',
      details: [
        { label: 'Response Time', value: 'Instant' },
        { label: 'Availability', value: '24/7' },
        { label: 'Best For', value: 'Quick questions' }
      ],
      contact: 'Start Chat',
      status: 'online'
    }
  ]

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-white mb-4 font-display">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ready to start a conversation? We're here to help with anything you need, 
                from joining our community to technical support.
              </p>
            </div>

            {/* Jack026 Personal Contact Card */}
           

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-glass-strong transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white font-display">{method.title}</h4>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      method.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    } animate-pulse`} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {method.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">{detail.label}</div>
                        <div className="text-sm font-semibold text-gray-300">{detail.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <span className="text-primary-400 font-mono text-sm font-semibold">
                      {method.contact}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-glass backdrop-blur-xl border border-green-500/30 bg-green-500/5 rounded-3xl p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4 font-display">
                    Message Sent Successfully! 🎉
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Thanks for reaching out! <strong className="text-primary-400">Jack026</strong> has 
                    received your message and will respond within 2 minutes. Check your email for updates!
                  </p>

                  <div className="bg-glass-strong border border-white/10 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4">What happens next?</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">Jack026 reviews your message</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">You'll receive a personalized response</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">Follow-up assistance if needed</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => dispatch({ type: 'SHOW_SUCCESS', payload: false })}
                      className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300"
                    >
                      Send Another Message
                    </motion.button>
                    <motion.a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-green-600 transition-colors duration-300"
                    >
                      WhatsApp
                    </motion.a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-glass backdrop-blur-xl border border-white/10 rounded-3xl p-10 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
                  
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-white mb-3 font-display">
                      Send us a Message
                    </h3>
                    <p className="text-gray-300 mb-4">
                      <strong className="text-primary-400">Jack026</strong> will personally review 
                      your message and respond within 2 minutes
                    </p>
                    <div className="flex justify-center gap-4 text-sm text-gray-400">
                      <span>✓ 2-min response</span>
                      <span>✓ Personal attention</span>
                      <span>✓ 24/7 support</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <div className="relative">
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder=" "
                            className={`w-full px-4 py-4 bg-glass-light border rounded-lg text-white outline-none transition-all duration-300 peer ${
                              errors.name ? 'border-red-500' : 'border-white/10 focus:border-primary-500'
                            }`}
                          />
                          <label className="absolute left-4 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-bg-secondary peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-500 peer-[:not(:placeholder-shown)]:bg-bg-secondary peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded">
                            <User className="inline w-4 h-4 mr-1" />
                            Full Name
                          </label>
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                      </div>

                      <div className="form-group">
                        <div className="relative">
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder=" "
                            className={`w-full px-4 py-4 bg-glass-light border rounded-lg text-white outline-none transition-all duration-300 peer ${
                              errors.email ? 'border-red-500' : 'border-white/10 focus:border-primary-500'
                            }`}
                          />
                          <label className="absolute left-4 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-bg-secondary peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-500 peer-[:not(:placeholder-shown)]:bg-bg-secondary peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded">
                            <Mail className="inline w-4 h-4 mr-1" />
                            Email Address
                          </label>
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone and Subject Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <div className="relative">
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder=" "
                            className="w-full px-4 py-4 bg-glass-light border border-white/10 rounded-lg text-white outline-none transition-all duration-300 peer focus:border-primary-500"
                          />
                          <label className="absolute left-4 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-bg-secondary peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-500 peer-[:not(:placeholder-shown)]:bg-bg-secondary peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded">
                            <Phone className="inline w-4 h-4 mr-1" />
                            Phone (Optional)
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="relative">
                          <input
                            type="text"
                            value={form.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            placeholder=" "
                            className={`w-full px-4 py-4 bg-glass-light border rounded-lg text-white outline-none transition-all duration-300 peer ${
                              errors.subject ? 'border-red-500' : 'border-white/10 focus:border-primary-500'
                            }`}
                          />
                          <label className="absolute left-4 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-bg-secondary peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-500 peer-[:not(:placeholder-shown)]:bg-bg-secondary peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded">
                            Subject
                          </label>
                        </div>
                        {errors.subject && <p className="text-red-500 text-sm mt-2">{errors.subject}</p>}
                      </div>
                    </div>

                    {/* Category and Urgency Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <select
                          value={form.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className={`w-full px-4 py-4 bg-glass-light border rounded-lg text-white outline-none transition-all duration-300 ${
                            errors.category ? 'border-red-500' : 'border-white/10 focus:border-primary-500'
                          }`}
                        >
                          {categories.map(category => (
                            <option 
                              key={category.value} 
                              value={category.value} 
                              disabled={category.disabled}
                              className="bg-bg-tertiary text-white"
                            >
                              {category.label}
                            </option>
                          ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
                      </div>

                      <div className="form-group">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-300">Urgency Level</label>
                          <div className="grid grid-cols-2 gap-2">
                            {urgencyLevels.map(level => (
                              <label key={level.value} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="urgency"
                                  value={level.value}
                                  checked={form.urgency === level.value}
                                  onChange={(e) => handleInputChange('urgency', e.target.value as any)}
                                  className="text-primary-500"
                                />
                                <span className={`text-sm font-medium ${level.color}`}>
                                  {level.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <div className="relative">
                        <textarea
                          value={form.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder=" "
                          rows={6}
                          maxLength={1000}
                          className={`w-full px-4 py-4 bg-glass-light border rounded-lg text-white outline-none transition-all duration-300 peer resize-y ${
                            errors.message ? 'border-red-500' : 'border-white/10 focus:border-primary-500'
                          }`}
                        />
                        <label className="absolute left-4 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-bg-secondary peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-500 peer-[:not(:placeholder-shown)]:bg-bg-secondary peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded">
                          <MessageSquare className="inline w-4 h-4 mr-1" />
                          Your Message
                        </label>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        <div className="ml-auto text-xs text-gray-400">
                          {charCount}/1000 characters
                        </div>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.subscribe}
                          onChange={(e) => handleInputChange('subscribe', e.target.checked)}
                          className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-300 text-sm">
                          Subscribe to our newsletter for updates about events, workshops, and new resources
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.terms}
                          onChange={(e) => handleInputChange('terms', e.target.checked)}
                          className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-300 text-sm">
                          I agree to the{' '}
                          <a href="#" className="text-primary-500 hover:text-primary-400 transition-colors">
                            Terms and Conditions
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-primary-500 hover:text-primary-400 transition-colors">
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                      {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Sending to Jack026...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message to Jack026</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MainContactSection