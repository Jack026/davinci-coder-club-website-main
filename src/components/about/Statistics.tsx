'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Code, Zap, BookOpen, Award, Target, TrendingUp } from 'lucide-react'

const Statistics = () => {
  const mainStats = [
    {
      icon: Users,
      number: '150+',
      label: 'Active Members',
      description: 'Passionate developers and innovators',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Code,
      number: '75+',
      label: 'Projects Built',
      description: 'Real-world solutions and applications',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Trophy,
      number: '25+',
      label: 'Events Hosted',
      description: 'Workshops, hackathons, and competitions',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Award,
      number: '10+',
      label: 'Awards Won',
      description: 'National and international recognition',
      color: 'from-orange-500 to-red-600'
    }
  ]

  const impactMetrics = [
    { label: 'Research Papers', value: '50+' },
    { label: 'Industry Experience', value: '15+ Years' },
    { label: 'Students Mentored', value: '500+' },
    { label: 'Awards Received', value: '20+' }
  ]

  const achievementStats = [
    {
      icon: Target,
      title: 'Innovation Rate',
      value: '100%',
      description: 'Every project brings something new'
    },
    {
      icon: TrendingUp,
      title: 'Skill Growth',
      value: '300%',
      description: 'Average skill improvement per member'
    },
    {
      icon: BookOpen,
      title: 'Learning Hours',
      value: '10,000+',
      description: 'Collective hours of learning and development'
    },
    {
      icon: Zap,
      title: 'Technologies',
      value: '50+',
      description: 'Different technologies mastered by our community'
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
            Measuring success through{' '}
            <span className="text-gradient">community growth</span> and achievements
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our numbers tell the story of a thriving community dedicated to excellence, 
            innovation, and continuous growth in the world of technology.
          </p>
        </motion.div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-120 group-hover:rotate-12 transition-all duration-300`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                
                <div className="text-4xl lg:text-5xl font-bold text-primary-500 mb-3 font-display group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3 font-display group-hover:text-primary-400 transition-colors duration-300">
                  {stat.label}
                </h4>
                
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {achievementStats.map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <achievement.icon className="w-8 h-8 text-primary-500 mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              
              <div className="text-2xl font-bold text-primary-500 mb-1 font-display">
                {achievement.value}
              </div>
              
              <div className="text-white font-semibold text-sm mb-2">
                {achievement.title}
              </div>
              
              <p className="text-gray-400 text-xs">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
          
          <h3 className="text-2xl font-bold text-white text-center mb-8 font-display">
            Faculty & Community Impact
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl font-bold text-primary-500 mb-2 font-display group-hover:scale-110 transition-transform duration-300">
                  {metric.value}
                </div>
                <div className="text-gray-400 font-medium text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics
