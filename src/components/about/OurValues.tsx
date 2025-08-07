'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Users, TrendingUp, Heart, Zap, Star } from 'lucide-react'

const OurValues = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We encourage creative thinking and innovative solutions to complex problems, pushing boundaries and exploring new possibilities.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and collective intelligence, fostering an environment where diverse perspectives thrive.'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Continuous learning and skill development are at the core of our mission, adapting to evolving technologies and methodologies.'
    },
    {
      icon: Heart,
      title: 'Inclusivity',
      description: 'We welcome students from all backgrounds and skill levels, creating an inclusive environment where everyone can succeed.'
    },
    {
      icon: Zap,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code quality and project delivery to event organization and community building.'
    },
    {
      icon: Star,
      title: 'Passion',
      description: 'Our love for technology and coding drives us to achieve great things and inspire others to discover their potential.'
    }
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
            The principles that guide{' '}
            <span className="text-gradient">everything we do</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our core values shape our culture, drive our decisions, and define 
            our commitment to excellence and innovation.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              
              <h4 className="text-xl font-bold text-white mb-4 font-display group-hover:text-primary-400 transition-colors duration-300">
                {value.title}
              </h4>
              
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurValues
