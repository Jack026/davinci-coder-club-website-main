'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle, Clock, MessageCircle, Phone, Crown, Zap } from 'lucide-react'

const ContactFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqData = [
    {
      id: 1,
      category: 'General',
      icon: HelpCircle,
      question: 'How quickly will Jack026 respond to my message?',
      answer: 'Jack026 personally reviews all messages and responds within 2 minutes during business hours (9 AM - 6 PM, Mon-Fri). For urgent matters, call the emergency hotline for immediate assistance. After hours, expect a response first thing the next business day.',
      featured: true
    },
    {
      id: 2,
      category: 'Technical',
      icon: Zap,
      question: 'What kind of technical support can Jack026 provide?',
      answer: 'Jack026 offers comprehensive technical support including code review, debugging assistance, architecture guidance, technology recommendations, project consultation, and mentoring. Whether you\'re stuck on a coding problem or planning a new project, Jack026 can help!'
    },
    {
      id: 3,
      category: 'Collaboration',
      icon: MessageCircle,
      question: 'How can I collaborate with Da-Vinci Coder Club?',
      answer: 'We offer various collaboration opportunities: project partnerships, open-source contributions, mentorship programs, workshop hosting, event speaking, and joint ventures. Contact Jack026 directly to discuss your ideas and find the perfect collaboration model.'
    },
    {
      id: 4,
      category: 'Joining',
      icon: Crown,
      question: 'What are the requirements to join the club?',
      answer: 'We welcome passionate learners of all levels! Requirements include: enthusiasm for technology, willingness to learn and collaborate, commitment to community values, and active participation. No specific technical skills required - Jack026 will help you grow!'
    },
    {
      id: 5,
      category: 'Emergency',
      icon: Phone,
      question: 'When should I use the emergency contact line?',
      answer: 'Use the 24/7 emergency line for: critical project issues affecting deadlines, server downtime requiring immediate attention, security incidents, or urgent technical problems that can\'t wait. Jack026 or a senior team member will respond immediately.'
    },
    {
      id: 6,
      category: 'Visit',
      icon: Clock,
      question: 'Can I visit Jack026 in person at ADTU campus?',
      answer: 'Absolutely! Jack026 welcomes in-person visits at Room CS-201, Academic Block A, ADTU. Office hours: Mon-Fri 9 AM-6 PM, Sat 10 AM-4 PM. For guaranteed availability, call ahead or schedule an appointment via email.'
    },
    {
      id: 7,
      category: 'Projects',
      icon: Zap,
      question: 'How can Jack026 help with my project?',
      answer: 'Jack026 provides end-to-end project support: initial consultation and planning, technology stack recommendations, code architecture design, development mentoring, code reviews and debugging, deployment assistance, and ongoing maintenance guidance.'
    },
    {
      id: 8,
      category: 'Community',
      icon: MessageCircle,
      question: 'What makes Da-Vinci Coder Club special?',
      answer: 'Our community stands out with personalized mentoring from Jack026, hands-on learning projects, industry connections and internship opportunities, regular workshops and events, collaborative learning environment, and a supportive network of 150+ passionate developers.'
    }
  ]

  const categories = ['All', 'General', 'Technical', 'Collaboration', 'Joining', 'Emergency', 'Visit', 'Projects', 'Community']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredFAQs = activeCategory === 'All' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory)

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      'General': HelpCircle,
      'Technical': Zap,
      'Collaboration': MessageCircle,
      'Joining': Crown,
      'Emergency': Phone,
      'Visit': Clock,
      'Projects': Zap,
      'Community': MessageCircle
    }
    return icons[category as keyof typeof icons] || HelpCircle
  }

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
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Quick answers to common questions about contacting{' '}
            <span className="text-primary-400 font-semibold">Jack026</span> and our services
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-glass-strong'
                }`}
              >
                {category !== 'All' && (
                  <div className="w-4 h-4">
                    {(() => {
                      const Icon = getCategoryIcon(category)
                      return <Icon className="w-4 h-4" />
                    })()}
                  </div>
                )}
                {category}
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {category === 'All' ? faqData.length : faqData.filter(faq => faq.category === category).length}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          layout
          className="max-w-4xl mx-auto space-y-4"
        >
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => {
              const Icon = faq.icon
              const isOpen = openFAQ === faq.id

              return (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className={`bg-glass backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${
                    faq.featured 
                      ? 'border-primary-500/30 bg-primary-500/5' 
                      : 'border-white/10 hover:border-primary-500/30'
                  }`}
                >
                  {faq.featured && (
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-2 flex items-center gap-2">
                      <Crown className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-semibold">Jack026's Priority Response</span>
                    </div>
                  )}

                  <motion.button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-glass-light transition-all duration-300"
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        faq.featured 
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500' 
                          : 'bg-glass-strong border border-white/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${faq.featured ? 'text-white' : 'text-primary-500'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1 font-display pr-4">
                          {faq.question}
                        </h4>
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${
                          faq.featured 
                            ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                            : 'bg-glass-strong text-gray-400 border border-white/10'
                        }`}>
                          <div className="w-2 h-2 bg-current rounded-full" />
                          {faq.category}
                        </span>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isOpen ? 'bg-primary-500' : 'bg-glass-strong border border-white/10'
                      }`}
                    >
                      <Plus className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-gray-400'}`} />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8">
                          <div className={`p-6 rounded-xl border ${
                            faq.featured 
                              ? 'bg-primary-500/10 border-primary-500/20' 
                              : 'bg-glass-strong border-white/10'
                          }`}>
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                            
                            {faq.featured && (
                              <div className="mt-4 p-4 bg-glass-strong border border-primary-500/20 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Crown className="w-4 h-4 text-yellow-500" />
                                  <span className="text-white font-semibold text-sm">Jack026's Promise</span>
                                </div>
                                <p className="text-primary-400 text-sm">
                                  I personally handle this type of inquiry and guarantee a response within 2 minutes during business hours.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 font-display">
              Still Have Questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Can't find what you're looking for? <span className="text-primary-400 font-semibold">Jack026</span> is 
              here to help with personalized answers to your specific questions.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Ask Jack026 Directly
              </motion.button>
              
              <motion.a
                href="tel:+918765432109"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white/20 text-white py-3 px-8 rounded-lg font-semibold hover:bg-glass hover:border-primary-500 transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call for Instant Help
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactFAQ
