'use client'

import { motion } from 'framer-motion'
import { Share, Users, Award, Heart, Github, ArrowRight, Star, Crown } from 'lucide-react'

const ResourceContribution = () => {
  const benefits = [
    { icon: Share, title: 'Share Knowledge', description: 'Help others learn' },
    { icon: Users, title: 'Build Community', description: 'Connect with developers' },
    { icon: Award, title: 'Gain Recognition', description: 'Showcase expertise' },
    { icon: Heart, title: 'Give Back', description: 'Support the ecosystem' }
  ]

  const topContributors = [
    { name: 'Jack026', avatar: 'J', count: 24, isLead: true },
    { name: 'Sarah C.', avatar: 'S', count: 18 },
    { name: 'Mike R.', avatar: 'M', count: 15 },
    { name: 'Emma W.', avatar: 'E', count: 12 }
  ]

  return (
    <section className="py-16 bg-bg-primary relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/8 via-transparent to-secondary-500/6" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <Share className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-display">
                Share Your Knowledge,{' '}
                <span className="text-gradient">Jack026</span>!
              </h2>
            </div>

            <div className="bg-glass backdrop-blur-xl border border-primary-500/30 bg-primary-500/5 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-primary-400 font-semibold text-sm">Special Invitation</span>
              </div>
              <p className="text-gray-300">
                Join our community! Share tutorials, tools, and documentation to help fellow developers grow.
              </p>
            </div>
          </motion.div>

          {/* Benefits */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center hover:bg-glass-strong transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-5 h-5 text-primary-400" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-2">{benefit.title}</h4>
                  <p className="text-gray-400 text-xs">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Contribution Ways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">Ways to Contribute</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { emoji: '📝', title: 'Write Tutorials', desc: 'Step-by-step guides' },
                { emoji: '🔧', title: 'Share Tools', desc: 'Useful utilities' },
                { emoji: '📚', title: 'Document APIs', desc: 'Reference materials' }
              ].map((item, index) => (
                <div key={index} className="text-center p-4">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 justify-center"
            >
              <Share className="w-4 h-4" />
              Submit Resource
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-glass transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Github className="w-4 h-4" />
              GitHub
            </motion.button>
          </motion.div>

          {/* Top Contributors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-bold text-white">Top Contributors</h3>
            </div>
            
            <div className="flex justify-center gap-4 flex-wrap">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-glass-strong rounded-lg">
                  <div className={`w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm relative ${
                    contributor.isLead ? 'ring-2 ring-yellow-500' : ''
                  }`}>
                    {contributor.avatar}
                    {contributor.isLead && (
                      <Crown className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{contributor.name}</div>
                    <div className="text-gray-400 text-xs">{contributor.count} resources</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 text-sm mt-6 flex items-center justify-center gap-2"
          >
            Built with <Heart className="w-4 h-4 text-red-500" /> by Da-Vinci Community
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default ResourceContribution
