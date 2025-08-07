'use client'

import { motion } from 'framer-motion'
import { Star, Users, Code, Zap } from 'lucide-react'
import Link from 'next/link'

const AboutHero = () => {
  const heroStats = [
    { number: '150+', label: 'Active Members', icon: Users },
    { number: '75+', label: 'Projects Built', icon: Code },
    { number: '5+', label: 'Years Strong', icon: Star },
    { number: '100%', label: 'Innovation Rate', icon: Zap }
  ]

  const floatingParticles = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-60"
      style={{
        left: `${15 + Math.random() * 70}%`,
        top: `${20 + Math.random() * 60}%`,
      }}
      animate={{
        y: [-20, -100, -20],
        x: [-10, 30, -10],
        scale: [1, 1.2, 1],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        delay: Math.random() * 5,
      }}
    />
  ))

  return (
    <section className="relative min-h-[70vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary" />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(244, 63, 94, 0.05) 50%, rgba(6, 182, 212, 0.03) 100%)',
              'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(6, 182, 212, 0.06) 50%, rgba(99, 102, 241, 0.04) 100%)',
              'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(244, 63, 94, 0.04) 100%)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {floatingParticles}
        </div>

        {/* Code Background */}
        <div className="absolute inset-0 opacity-5 font-mono text-sm text-primary-500 overflow-hidden">
          <pre className="absolute top-20 left-10">
{`// About Da-Vinci Coder Club
class Innovation {
  constructor() {
    this.creativity = 100;
    this.community = "150+ members";
    this.mission = "Art meets Code";
  }
}`}
          </pre>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <ol className="flex items-center gap-2 bg-glass backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-sm text-gray-400">
            <li>
              <Link href="/" className="text-primary-500 hover:text-primary-400 transition-colors">
                Home
              </Link>
            </li>
            <li>›</li>
            <li>About Our Community</li>
          </ol>
        </motion.nav>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight">
              <span className="text-gradient">Where Art</span>
              <br />
              <span className="text-white">Meets Code</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-400 font-semibold italic">
              Inspired by Leonardo da Vinci's revolutionary blend of art and science
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            We foster creativity and innovation in the digital realm, empowering{' '}
            <strong className="text-primary-400">150+ students</strong> at{' '}
            <strong className="text-primary-400">Assam Downtown University</strong> to transform 
            ideas into reality through collaborative learning and cutting-edge technology.
          </motion.p>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-glass-strong transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2 font-display">
                    {stat.number}
                  </div>
                  
                  <div className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
