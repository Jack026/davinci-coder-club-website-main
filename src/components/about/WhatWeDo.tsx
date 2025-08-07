'use client'

import { motion } from 'framer-motion'
import { Code, Trophy, Users, BookOpen } from 'lucide-react'

const WhatWeDo = () => {
  const activities = [
    {
      icon: Code,
      title: 'Workshops & Learning',
      description: 'Comprehensive hands-on workshops covering cutting-edge technologies, from web development and mobile apps to AI/ML, blockchain, and emerging tech trends.',
      features: [
        'Weekly Workshops',
        'Live Coding Sessions',
        'Technology Trends',
        'Skill Development'
      ],
      stats: { events: '25+', participants: '150+' }
    },
    {
      icon: Trophy,
      title: 'Competitions & Hackathons',
      description: 'Active participation in national and international coding competitions, hackathons, and programming contests to showcase talent and win recognition.',
      features: [
        'National Hackathons',
        'Coding Contests',
        'Tech Challenges',
        'Award Winning'
      ],
      stats: { wins: '10+', contests: '25+' }
    },
    {
      icon: Users,
      title: 'Project Collaboration',
      description: 'Collaborative project development focusing on real-world problems, innovative solutions, and impactful applications that benefit society.',
      features: [
        'Team Projects',
        'Real Solutions',
        'Innovation Focus',
        'Impact Driven'
      ],
      stats: { projects: '75+', teams: '30+' }
    },
    {
      icon: BookOpen,
      title: 'Community Building',
      description: 'Foster a supportive, inclusive community where members can learn, grow, collaborate, and build lasting professional relationships.',
      features: [
        'Peer Learning',
        'Mentorship',
        'Networking',
        'Growth Focused'
      ],
      stats: { members: '150+', mentors: '20+' }
    }
  ]

  return (
    <section className="py-24 bg-bg-primary relative">
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
            Empowering students through{' '}
            <span className="text-gradient">diverse learning opportunities</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            From hands-on workshops to competitive programming, we offer comprehensive 
            experiences that shape the next generation of tech leaders.
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-8 transition-all duration-300 mx-auto">
                  <activity.icon className="w-10 h-10 text-white" />
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-6 text-center font-display group-hover:text-primary-400 transition-colors duration-300">
                  {activity.title}
                </h4>
                
                <p className="text-gray-300 leading-relaxed mb-8 text-center">
                  {activity.description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {activity.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      <div className="w-2 h-2 rounded-full bg-success-500 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Stats */}
                <div className="flex justify-center gap-6">
                  {Object.entries(activity.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-primary-500 font-display">
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo
