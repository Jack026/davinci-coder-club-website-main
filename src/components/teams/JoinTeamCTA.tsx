'use client'

import { motion } from 'framer-motion'
import { Users, Star, Code, Award, ArrowRight, Heart, Zap, Target } from 'lucide-react'

const JoinTeamCTA = () => {
  const benefits = [
    { 
      icon: Code, 
      title: 'Skill Development', 
      description: 'Level up your coding abilities',
      color: 'text-blue-500'
    },
    { 
      icon: Users, 
      title: 'Networking', 
      description: 'Connect with like-minded developers',
      color: 'text-green-500'
    },
    { 
      icon: Award, 
      title: 'Recognition', 
      description: 'Showcase your achievements',
      color: 'text-yellow-500'
    },
    { 
      icon: Zap, 
      title: 'Innovation', 
      description: 'Work on cutting-edge projects',
      color: 'text-purple-500'
    }
  ]

  const testimonial = {
    quote: "Joining Da-Vinci was the best decision of my college life. The mentorship and opportunities here are unparalleled!",
    author: "Alex Kumar",
    role: "Full Stack Developer (Now at Google)",
    avatar: "A"
  }

  // Enhanced floating elements
  const floatingElements = Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-2xl opacity-20 pointer-events-none select-none"
      style={{
        left: `${10 + Math.random() * 80}%`,
        top: `${15 + Math.random() * 70}%`,
      }}
      animate={{
        y: [-30, -80, -30],
        x: [-20, 40, -20],
        rotate: [0, 360, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 25 + Math.random() * 15,
        repeat: Infinity,
        delay: Math.random() * 10,
        ease: "easeInOut"
      }}
    >
      {['🚀', '💻', '⭐', '🎯', '🔥', '💡', '🌟', '⚡', '🏆', '👥', '💪', '🚀'][i]}
    </motion.div>
  ))

  return (
    <section className="py-24 bg-bg-tertiary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/8 via-transparent to-secondary-500/6" />
        
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 70%, rgba(244, 63, 94, 0.2) 0%, transparent 50%)
            `,
            backgroundSize: '100% 100%'
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {floatingElements}
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white font-display">
                Ready to Join Our <span className="text-gradient">Amazing Team?</span>
              </h2>
            </div>

            <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8 inline-block">
              <p className="text-xl text-gray-300 max-w-3xl">
                Hey there! We're always looking for passionate individuals who share our love for technology 
                and innovation. Join <span className="text-gradient font-bold animate-pulse">Jack026</span> and 
                our incredible team to be part of something extraordinary!
              </p>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center group hover:bg-glass-strong transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${benefit.color} bg-current/20`}>
                  <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                  {benefit.title}
                </h4>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* What We're Looking For */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-display text-center flex items-center justify-center gap-3">
              <Target className="w-6 h-6 text-primary-500" />
              What We're Looking For
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🔥</div>
                <h4 className="text-lg font-semibold text-white mb-2">Passion</h4>
                <p className="text-gray-400 text-sm">Genuine love for technology and continuous learning</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-lg font-semibold text-white mb-2">Collaboration</h4>
                <p className="text-gray-400 text-sm">Team players who enjoy working together</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">💡</div>
                <h4 className="text-lg font-semibold text-white mb-2">Innovation</h4>
                <p className="text-gray-400 text-sm">Creative thinkers who love solving problems</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 justify-center"
            >
              <Users className="w-5 h-5" />
              Join Our Team
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white/20 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:bg-glass hover:border-primary-500 transition-all duration-300 justify-center"
            >
              <Star className="w-5 h-5" />
              Learn More
            </motion.button>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden mb-12"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
            
            <div className="text-center">
              <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.avatar}
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">{testimonial.author}</div>
                  <div className="text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Jack026 Personal Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-primary-500/30 bg-primary-500/5 rounded-2xl p-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                J
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                A Message from Jack026
              </h3>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-width-2xl">
              "As someone who's experienced the incredible growth and opportunities this club provides, 
              I can't recommend it enough. Whether you're just starting your coding journey or you're 
              already an experienced developer, there's a place for you here. Join us and let's build 
              the future of technology together!"
            </p>
          </motion.div>

          {/* Bottom Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 text-sm mt-8 flex items-center justify-center gap-2"
          >
            Built with <Heart className="w-4 h-4 text-red-500" /> by the Da-Vinci Community
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default JoinTeamCTA
