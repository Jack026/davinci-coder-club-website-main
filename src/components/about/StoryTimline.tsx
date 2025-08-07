'use client'

import { motion } from 'framer-motion'
import { Rocket, Trophy, Users, Award, Zap } from 'lucide-react'

const StoryTimeline = () => {
  const timelineData = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Da-Vinci Coder Club was founded by 10 passionate CS students at ADTU with a vision to merge creativity and technology.',
      icon: Rocket,
      achievements: ['10 Founders', 'Vision Born', 'First Meeting'],
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      year: '2021',
      title: 'First Milestone',
      description: 'Our inaugural hackathon "CodeVinci 2021" with 50 participants marked our emergence as serious innovators.',
      icon: Users,
      achievements: ['50 Participants', 'First Hackathon', 'Innovation Focus'],
      gradient: 'from-pink-500 to-red-600'
    },
    {
      year: '2022',
      title: 'National Recognition',
      description: 'Won 5 national hackathons including Smart India Hackathon, putting ADTU on the tech innovation map.',
      icon: Trophy,
      achievements: ['5 Wins', 'National Level', 'ADTU Recognition'],
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      year: '2023',
      title: 'Industry Partnerships',
      description: 'Forged partnerships with Google, Microsoft, Amazon for internships and mentorship programs.',
      icon: Award,
      achievements: ['Tech Giants', 'Mentorship', 'Opportunities'],
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      year: '2024',
      title: 'Community Excellence',
      description: '150+ members strong with 75+ projects, recognized as Northeast India\'s premier student tech community.',
      icon: Zap,
      achievements: ['150+ Members', '75+ Projects', 'NE Premier Club'],
      gradient: 'from-orange-500 to-amber-600'
    }
  ]

  const journeyStats = [
    { number: '150+', label: 'Members' },
    { number: '75+', label: 'Projects' },
    { number: '25+', label: 'Events' },
    { number: '10+', label: 'Awards' }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-bg-secondary to-bg-tertiary relative overflow-hidden">
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
            From humble beginnings to{' '}
            <span className="text-gradient">technological excellence</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our journey of innovation, growth, and community building over the years.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-500 transform -translate-x-1/2 hidden lg:block" />

          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:gap-16 gap-8`}
              >
                {/* Year Badge */}
                <div className="absolute left-1/2 transform -translate-x-1/2 lg:block hidden z-20">
                  <div className={`bg-gradient-to-r ${item.gradient} text-white px-4 py-2 rounded-lg font-bold text-lg font-mono shadow-lg border-4 border-bg-secondary`}>
                    {item.year}
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex-1 max-w-md relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    {/* Mobile Year Badge */}
                    <div className="lg:hidden mb-4">
                      <div className={`bg-gradient-to-r ${item.gradient} text-white px-3 py-1 rounded-md font-bold text-sm font-mono inline-block`}>
                        {item.year}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-white font-display group-hover:text-primary-400 transition-colors duration-300">
                        {item.title}
                      </h4>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-6 text-justify">
                      {item.description}
                    </p>
                    
                    <div className="flex gap-2 flex-wrap">
                      {item.achievements.map((achievement, achIndex) => (
                        <span
                          key={achIndex}
                          className="px-3 py-1 bg-glass-strong border border-white/10 rounded-full text-xs text-gray-400 font-medium hover:bg-primary-500 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
          
          {journeyStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2 font-display group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StoryTimeline
