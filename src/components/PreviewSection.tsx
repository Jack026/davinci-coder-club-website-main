'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code, Users, Trophy, Zap, BookOpen, Calendar, ExternalLink, MessageCircle } from 'lucide-react'

const PreviewSection = () => {
  const previews = [
    {
      icon: Calendar,
      title: 'Upcoming Events',
      description: 'Stay updated with workshops, hackathons, and tech talks happening at ADTU.',
      meta: [
        { icon: Users, text: '25+ Events' },
        { icon: Calendar, text: 'Monthly' }
      ],
      href: '/events'
    },
    {
      icon: Code,
      title: 'Student Projects',
      description: 'Explore innovative projects built by talented community members.',
      meta: [
        { icon: Trophy, text: '50+ Projects' },
        { icon: Users, text: '150+ Contributors' }
      ],
      href: '/projects'
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access curated tutorials, guides, and learning materials for developers.',
      meta: [
        { icon: BookOpen, text: '100+ Resources' },
        { icon: Code, text: 'All Levels' }
      ],
      href: '/resources'
    },
    {
      icon: Users,
      title: 'Meet the Team',
      description: 'Get to know the passionate individuals leading our coding community.',
      meta: [
        { icon: Users, text: '20+ Members' },
        { icon: Trophy, text: 'Expert Level' }
      ],
      href: '/team'
    }
  ]

  return (
    <section className="py-20 bg-bg-secondary relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white font-display">
            Explore Our <span className="text-gradient">Universe</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Discover the various facets of our community and find your perfect fit in our coding ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {previews.map((preview, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group"
            >
              <Link
                href={preview.href}
                className="block bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-8 transition-all duration-500">
                    <preview.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                    {preview.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {preview.description}
                  </p>
                  
                  <div className="flex gap-6 mb-6">
                    {preview.meta.map((meta, metaIndex) => (
                      <div key={metaIndex} className="flex items-center gap-2 text-sm text-gray-400">
                        <meta.icon className="w-4 h-4 text-primary-500" />
                        {meta.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-glass backdrop-blur-xl border border-white/10 rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
          
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-4xl font-bold text-white mb-4 font-display">
                Ready to Start Your Journey?
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join 150+ passionate developers at ADTU's premier coding community and transform your ideas into reality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                >
                  Join Our Community
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/20 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:bg-glass hover:border-primary-500 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 inline mr-2" />
                  Contact Us
                </motion.button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-4 text-4xl">
                {[Code, Users, Trophy, Zap, BookOpen, Calendar].map((Icon, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: index * 1
                    }}
                  >
                    <Icon className="text-primary-500 filter drop-shadow-lg" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PreviewSection
