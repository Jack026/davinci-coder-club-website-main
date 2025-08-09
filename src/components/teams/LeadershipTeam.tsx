'use client'

import { useTeam } from '@/contexts/TeamContext'
import { motion } from 'framer-motion'
import { Award, Crown, Github, Linkedin, Mail, Star, TrendingUp, Users } from 'lucide-react'

const LeadershipTeam = () => {
  const { members, loading } = useTeam()

  const leadershipMembers = members.filter(member => 
    ['president', 'vice-president', 'secretary', 'treasurer', 'tech-lead'].includes(member.role)
  )

  const getRoleIcon = (role: string) => {
    const icons = {
      'president': Crown,
      'vice-president': Star,
      'secretary': Users,
      'treasurer': TrendingUp,
      'tech-lead': Award
    }
    return icons[role as keyof typeof icons] || Award
  }

  const getRoleGradient = (role: string) => {
    const gradients = {
      'president': 'from-yellow-500 to-orange-600',
      'vice-president': 'from-purple-500 to-pink-600',
      'secretary': 'from-blue-500 to-cyan-600',
      'treasurer': 'from-green-500 to-emerald-600',
      'tech-lead': 'from-red-500 to-pink-600'
    }
    return gradients[role as keyof typeof gradients] || 'from-gray-500 to-gray-600'
  }

  const formatRole = (role: string) => {
    return role.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  if (loading) {
    return (
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Loading leadership team...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-bg-secondary">
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
            Leadership <span className="text-gradient">Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Visionary leaders guiding our club towards excellence and innovation
          </p>
        </motion.div>

        {/* Leadership Grid */}
        {leadershipMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipMembers.map((leader, index) => {
              const RoleIcon = getRoleIcon(leader.role)
              const roleGradient = getRoleGradient(leader.role)
              const isJack026 = leader.isJack026

              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  onClick={() => {}} // Removed dispatch for now
                  className={`group bg-glass backdrop-blur-xl border rounded-3xl p-8 relative overflow-hidden cursor-pointer h-full flex flex-col ${
                    isJack026 
                      ? 'border-primary-500/40 bg-primary-500/5' 
                      : 'border-white/10 hover:border-primary-500/30'
                  }`}
                >
                  {/* Special Jack026 Effects */}
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

                  {/* Role Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`bg-gradient-to-r ${roleGradient} text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-white/20`}>
                      <RoleIcon className="w-3 h-3" />
                      {leader.role === 'tech-lead' ? 'Tech Lead' : formatRole(leader.role)}
                    </div>
                  </div>

                  {/* Jack026 Special Badge */}
                  {isJack026 && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-white/20">
                        <Crown className="w-3 h-3 animate-bounce" />
                        You
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Avatar */}
                    <div className="text-center mb-6">
                      <div className="relative inline-block">
                        <div className={`w-24 h-24 bg-gradient-to-r ${roleGradient} rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto transition-transform duration-300 group-hover:scale-110`}>
                          {leader.name.charAt(0)}
                          
                          {/* Online Status */}
                          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-3 border-bg-secondary rounded-full">
                            <motion.div
                              className="w-full h-full bg-green-500 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </div>
                        </div>

                        {isJack026 && (
                          <motion.div
                            className="text-xl absolute -top-1 -right-1"
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
                    </div>

                    {/* Member Info */}
                    <div className="text-center mb-6 flex-1">
                      <h4 className="text-xl font-bold text-white mb-2 font-display group-hover:text-primary-400 transition-colors duration-300">
                        {leader.name}
                        {isJack026 && <span className="ml-2 text-lg">🌟</span>}
                      </h4>
                      
                      <p className="text-primary-400 mb-2 font-semibold">
                        {leader.position}
                      </p>
                      
                      <p className="text-gray-400 text-sm mb-4">
                        {leader.department} • {leader.year.charAt(0).toUpperCase() + leader.year.slice(1)}
                      </p>

                      {leader.bio && (
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {leader.bio}
                        </p>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-glass-strong rounded-lg border border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary-500 font-display">
                          {leader.projects || 0}
                        </div>
                        <div className="text-xs text-gray-400">Projects</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-500 font-display">
                          {leader.contributions || 0}
                        </div>
                        <div className="text-xs text-gray-400">Contributions</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-500 font-display">
                          {leader.achievements?.length || 0}
                        </div>
                        <div className="text-xs text-gray-400">Awards</div>
                      </div>
                    </div>

                    {/* Skills Preview */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {leader.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                        {leader.skills.length > 3 && (
                          <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md border border-white/10">
                            +{leader.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 mb-6">
                      {leader.github && (
                        <motion.a
                          href={leader.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      )}
                      
                      {leader.linkedin && (
                        <motion.a
                          href={leader.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                        >
                          <Linkedin className="w-4 h-4" />
                        </motion.a>
                      )}
                      
                      {leader.email && (
                        <motion.a
                          href={`mailto:${leader.email}`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                        >
                          <Mail className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-auto ${
                        isJack026
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/25'
                          : `bg-gradient-to-r ${roleGradient} text-white hover:shadow-lg`
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      {isJack026 ? 'View Your Profile' : 'View Profile'}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">👥</div>
            <h3 className="text-2xl font-bold text-white mb-3">No Leadership Members</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Leadership positions will be displayed here as they are filled.
            </p>
          </div>
        )}

        {/* Leadership Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center font-display">
            Leadership Impact
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2 font-display">
                {leadershipMembers.reduce((sum, leader) => sum + (leader.projects || 0), 0)}
              </div>
              <div className="text-gray-400 text-sm">Total Projects Led</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2 font-display">
                {leadershipMembers.reduce((sum, leader) => sum + (leader.contributions || 0), 0)}
              </div>
              <div className="text-gray-400 text-sm">Combined Contributions</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2 font-display">
                {leadershipMembers.reduce((sum, leader) => sum + (leader.achievements?.length || 0), 0)}
              </div>
              <div className="text-gray-400 text-sm">Achievements Earned</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2 font-display">
                {leadershipMembers.length}
              </div>
              <div className="text-gray-400 text-sm">Leadership Positions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LeadershipTeam
