'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, Zap, Award, Heart } from 'lucide-react'

const JoinCTA = () => {
  const ctaFeatures = [
    { icon: Users, text: '150+ Active Community' },
    { icon: Zap, text: 'Cutting-edge Projects' },
    { icon: Award, text: 'Industry Recognition' }
  ]

  const testimonial = {
    quote: "Da-Vinci Coder Club transformed my passion into profession. The mentorship, projects, and community here are unparalleled!",
    author: "Ankit Raj",
    role: "Alumni (Now at Google)",
    avatar: "A"
  }

  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/8 via-transparent to-secondary-500/6" />
        
        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              x: [-10, 30, -10],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
              Be part of something{' '}
              <span className="text-gradient">bigger</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Join Da-Vinci Coder Club and transform your ideas into reality while 
              building lifelong connections with fellow innovators at ADTU.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8 mb-12 flex-wrap"
          >
            {ctaFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-3 bg-glass backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300 hover:bg-glass-strong"
              >
                <feature.icon className="w-5 h-5 text-primary-500" />
                <span className="text-gray-300 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 px-10 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
            >
              Join Our Community
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white/20 px-10 py-4 rounded-xl text-white font-semibold text-lg hover:bg-glass hover:border-primary-500 transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              Contact Us
            </motion.button>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
            
            <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
              "{testimonial.quote}"
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {testimonial.avatar}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{testimonial.author}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm mt-8 flex items-center justify-center gap-2"
          >
            Built with <Heart className="w-4 h-4 text-red-500" /> by the Da-Vinci Community
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default JoinCTA
