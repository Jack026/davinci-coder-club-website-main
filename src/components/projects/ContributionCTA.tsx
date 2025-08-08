'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code, Crown, ExternalLink, Github, Star, Trophy, Users } from 'lucide-react'

const ContributionCTA = () => {
  const features = [
    {
      icon: Code,
      title: 'Open Source',
      description: 'All projects are open source and welcoming contributions',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Work with talented developers from around the world',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Trophy,
      title: 'Learning Focused',
      description: 'Grow your skills with mentorship and code reviews',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Star,
      title: 'Recognition',
      description: 'Get recognized for your contributions and achievements',
      gradient: 'from-yellow-500 to-orange-600'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(244, 63, 94, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-display flex items-center justify-center gap-3 flex-wrap">
              <span>Ready to Build Something</span>
              <span className="text-gradient">Amazing?</span>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🚀
              </motion.div>
            </h2>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Hey <span className="text-gradient font-bold">Jack026</span>! Join our open-source community and contribute to cutting-edge projects. 
              Whether you're a beginner or expert, we welcome all skill levels to collaborate and innovate together!
            </p>

            {/* Jack026 Special Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-glass backdrop-blur-xl border border-primary-500/30 bg-primary-500/5 rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-2xl font-bold text-white relative">
                  J
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <Crown className="w-6 h-6 text-yellow-500 animate-bounce" />
              </div>
              
              <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed italic text-center max-w-3xl mx-auto">
                "Contributing to Da-Vinci projects transformed my coding skills and opened doors to amazing opportunities. 
                The mentorship here is unparalleled!"
              </blockquote>
              
              <cite className="text-primary-400 font-semibold mt-4 block text-center">
                - Jack026, Lead Developer & Community Builder
              </cite>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 group text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-8 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 font-display">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <Github className="w-5 h-5" />
              Start Contributing
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-glass hover:border-primary-500 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <ExternalLink className="w-5 h-5" />
              View Guidelines
            </motion.button>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-8 bg-glass backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500 font-display">150+</div>
                <div className="text-gray-400 text-sm">Contributors</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500 font-display">75+</div>
                <div className="text-gray-400 text-sm">Active Projects</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 font-display">25K+</div>
                <div className="text-gray-400 text-sm">GitHub Stars</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContributionCTA
