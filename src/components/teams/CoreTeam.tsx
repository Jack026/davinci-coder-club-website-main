'use client'

import { useTeam } from '@/contexts/TeamContext'
import { motion } from 'framer-motion'
import { Award, Code, Github, Linkedin, Mail, Star, Users, Zap } from 'lucide-react'

const CoreTeam = () => {
  const { members, loading } = useTeam()

  const coreTeamMembers = members.filter(member => 
    member.role === 'core' || member.role === 'design-lead'
  )

  const getDepartmentGradient = (department: string) => {
    const gradients = {
      'Computer Science': 'from-blue-500 to-cyan-600',
      'Information Technology': 'from-green-500 to-emerald-600',
      'Electronics': 'from-purple-500 to-pink-600',
      'Mechanical': 'from-orange-500 to-red-600',
      'Civil': 'from-indigo-500 to-purple-600',
      'Design': 'from-pink-500 to-rose-600',
      'Management': 'from-teal-500 to-cyan-600'
    }
    return gradients[department as keyof typeof gradients] || 'from-gray-500 to-gray-600'
  }

  const getSpecializationIcon = (specialization: string[]) => {
    if (specialization.includes('Frontend Development') || specialization.includes('UI/UX Design')) return Code
    if (specialization.includes('Backend Development') || specialization.includes('System Architecture')) return Zap
    if (specialization.includes('Full Stack Development')) return Star
    if (specialization.includes('DevOps') || specialization.includes('Cloud Architecture')) return Award
    return Users
  }

  if (loading) {
    return (
      <section className="py-20 bg-bg-tertiary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Loading core team...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-bg-tertiary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Core <span className="text-gradient">Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The backbone of our operations and innovation, driving excellence across all domains
          </p>
        </motion.div>

        {/* Core Team Grid */}
        {coreTeamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {coreTeamMembers.map((member, index) => {
              const departmentGradient = getDepartmentGradient(member.department)
              const SpecializationIcon = getSpecializationIcon(member.specialization || [])
              const isJack026 = member.isJack026

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  onClick={() => {}} // Removed dispatch for now
                  className={`group bg-glass backdrop-blur-xl border rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300 ${
                    isJack026 
                      ? 'border-primary-500/40 bg-primary-500/5 hover:border-primary-500' 
                      : 'border-white/10 hover:border-primary-500/30'
                  }`}
                >
                  {/* Jack026 Special Effects */}
                  {isJack026 && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/5"
                        animate={{
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </>
                  )}

                  {/* Header */}
                  <div className={`relative h-32 bg-gradient-to-br ${departmentGradient} flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/10" />
                    
                    {/* Member Avatar */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
                        {member.name.charAt(0)}
                      </div>
                      
                      {/* Jack026 Crown */}
                      {isJack026 && (
                        <motion.div
                          className="absolute -top-1 -right-1 text-lg"
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          👑
                        </motion.div>
                      )}
                    </div>

                    {/* Role Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <SpecializationIcon className="w-3 h-3" />
                        Core
                      </div>
                    </div>

                    {/* Jack026 Special Badge */}
                    {isJack026 && (
                      <div className="absolute top-3 left-3">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          You
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    <h4 className="text-lg font-bold text-white mb-2 font-display group-hover:text-primary-400 transition-colors duration-300">
                      {member.name}
                      {isJack026 && <span className="ml-2 text-sm">🌟</span>}
                    </h4>
                    
                    <p className="text-primary-400 mb-1 font-semibold text-sm">
                      {member.position}
                    </p>
                    
                    <p className="text-gray-400 text-sm mb-4">
                      {member.department}
                    </p>

                    {/* Skills Preview */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-2 bg-glass-strong rounded-lg">
                        <div className="text-sm font-bold text-primary-500">{member.projects || 0}</div>
                        <div className="text-xs text-gray-400">Projects</div>
                      </div>
                      <div className="text-center p-2 bg-glass-strong rounded-lg">
                        <div className="text-sm font-bold text-green-500">{member.contributions || 0}</div>
                        <div className="text-xs text-gray-400">Commits</div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-2 mb-4">
                      {member.github && (
                        <motion.a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300"
                        >
                          <Github className="w-3 h-3" />
                        </motion.a>
                      )}
                      
                      {member.linkedin && (
                        <motion.a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                        >
                          <Linkedin className="w-3 h-3" />
                        </motion.a>
                      )}
                      
                      {member.email && (
                        <motion.a
                          href={`mailto:${member.email}`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                        >
                          <Mail className="w-3 h-3" />
                        </motion.a>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 mt-auto ${
                        isJack026
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/25'
                          : 'bg-glass-strong border border-white/10 text-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-500'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      {isJack026 ? 'Your Profile' : 'View Profile'}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">⭐</div>
            <h3 className="text-2xl font-bold text-white mb-3">No Core Team Members</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Core team members will be displayed here as they join our amazing community.
            </p>
          </div>
        )}

        {/* Core Team Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center font-display">
            Core Team Impact
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-500 mb-2 font-display">
                {coreTeamMembers.reduce((sum, member) => sum + (member.projects || 0), 0)}
              </div>
              <div className="text-gray-400 text-sm">Projects Delivered</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-500 mb-2 font-display">
                {coreTeamMembers.reduce((sum, member) => sum + (member.contributions || 0), 0)}
              </div>
              <div className="text-gray-400 text-sm">Code Contributions</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-500 mb-2 font-display">
                {coreTeamMembers.reduce((sum, member) => sum + (member.achievements?.length || 0), 0)}
              </div>
              <div className="text-gray-400 text-sm">Achievements</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-500 mb-2 font-display">
                {coreTeamMembers.length}
              </div>
              <div className="text-gray-400 text-sm">Core Members</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CoreTeam
