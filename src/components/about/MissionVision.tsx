'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Lightbulb, Rocket } from 'lucide-react'

const MissionVision = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const missionHighlights = [
    'Innovation Hub',
    'Creative Thinking',
    'Digital Artisans',
    'Problem Solving'
  ]

  const visionHighlights = [
    'Premier Tech Hub',
    'Real-world Solutions',
    'Industry Bridge',
    'Social Impact'
  ]

  return (
    <section className="py-24 bg-bg-secondary relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white font-display">
            The principles that drive our{' '}
            <span className="text-gradient">innovation</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our mission and vision guide everything we do, from fostering creativity 
            to building the next generation of digital innovators.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Mission Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.02 }}
            className="group bg-glass backdrop-blur-xl border border-white/10 rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-8 transition-all duration-300">
                <Target className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-6 text-center font-display group-hover:text-primary-400 transition-colors duration-300">
                Our Mission
              </h3>
              
              <p className="text-gray-300 leading-relaxed text-lg text-center mb-8">
                To cultivate a vibrant ecosystem of student innovators who seamlessly blend 
                creativity with technology, fostering the next generation of digital artisans 
                and ethical problem solvers who will shape tomorrow's technological landscape.
              </p>
              
              <div className="flex justify-center gap-3 flex-wrap">
                {missionHighlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-glass-strong border border-white/10 rounded-full text-sm text-primary-400 font-medium hover:bg-primary-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.02 }}
            className="group bg-glass backdrop-blur-xl border border-white/10 rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 via-transparent to-accent-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-8 transition-all duration-300">
                <Eye className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-6 text-center font-display group-hover:text-secondary-400 transition-colors duration-300">
                Our Vision
              </h3>
              
              <p className="text-gray-300 leading-relaxed text-lg text-center mb-8">
                To be the premier student-led technology hub that bridges the gap between 
                theoretical knowledge and practical innovation, inspiring students to create 
                meaningful digital solutions that address real-world challenges and benefit society.
              </p>
              
              <div className="flex justify-center gap-3 flex-wrap">
                {visionHighlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-glass-strong border border-white/10 rounded-full text-sm text-secondary-400 font-medium hover:bg-secondary-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MissionVision
