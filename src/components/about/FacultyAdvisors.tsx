'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, BookOpen, Users } from 'lucide-react'

const FacultyAdvisors = () => {
  const advisors = [
    {
      name: 'Dr. Priya Sharma',
      title: 'Head of Department, Computer Science',
      qualification: 'Ph.D. in Computer Science, IIT Guwahati',
      expertise: 'AI/ML, Data Science, Research Methodology',
      quote: 'Innovation happens when passion meets purpose. Da-Vinci embodies this perfectly.',
      avatar: 'P',
      gradient: 'from-primary-500 to-purple-600',
      badge: GraduationCap
    },
    {
      name: 'Prof. Rajesh Kumar',
      title: 'Associate Professor, Information Technology',
      qualification: 'M.Tech in Software Engineering, NIT Silchar',
      expertise: 'Software Development, Web Technologies, Project Management',
      quote: 'Students here don\'t just learn to code; they learn to think, create, and lead.',
      avatar: 'R',
      gradient: 'from-secondary-500 to-pink-600',
      badge: Award
    }
  ]

  const achievements = [
    { label: 'Research Papers', value: '50+' },
    { label: 'Industry Experience', value: '15+ Years' },
    { label: 'Students Mentored', value: '500+' },
    { label: 'Awards Received', value: '20+' }
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
            Guiding lights in our{' '}
            <span className="text-gradient">academic journey</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our distinguished faculty advisors bring years of experience, wisdom, 
            and industry insights to guide our community toward excellence.
          </p>
        </motion.div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          {advisors.map((advisor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className={`w-24 h-24 bg-gradient-to-r ${advisor.gradient} rounded-full flex items-center justify-center text-3xl font-bold text-white group-hover:scale-110 transition-all duration-300`}>
                      {advisor.avatar}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-accent-500 to-cyan-600 rounded-full flex items-center justify-center">
                      <advisor.badge className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-2 font-display group-hover:text-primary-400 transition-colors duration-300">
                    {advisor.name}
                  </h4>
                  
                  <p className="text-primary-400 font-semibold mb-3 text-lg">
                    {advisor.title}
                  </p>
                  
                  <p className="text-gray-300 mb-2 text-sm">
                    <strong>Qualification:</strong> {advisor.qualification}
                  </p>
                  
                  <p className="text-gray-300 mb-6 text-sm">
                    <strong>Specialization:</strong> {advisor.expertise}
                  </p>
                  
                  {/* Quote */}
                  <blockquote className="bg-glass-strong border border-white/10 rounded-xl p-6 border-l-4 border-l-primary-500">
                    <p className="text-gray-300 italic leading-relaxed">
                      "{advisor.quote}"
                    </p>
                  </blockquote>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Faculty Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
          
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl font-bold text-primary-500 mb-2 font-display group-hover:scale-110 transition-transform duration-300">
                {achievement.value}
              </div>
              <div className="text-gray-400 font-medium text-sm">
                {achievement.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FacultyAdvisors
