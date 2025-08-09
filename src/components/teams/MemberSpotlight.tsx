'use client'

import { useTeam } from '@/contexts/TeamContext'
import { motion } from 'framer-motion'
import { Code, Crown, Github, Linkedin, Mail, Star, Trophy, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const MemberSpotlight = () => {
  const { members, loading } = useTeam() // Changed from state destructuring
  const [currentIndex, setCurrentIndex] = useState(0)

  // Get featured members (first 3 members or all if less than 3)
  const spotlightMembers = members.slice(0, 3)

  // Auto-rotate spotlight every 10 seconds
  useEffect(() => {
    if (spotlightMembers.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightMembers.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [spotlightMembers.length])

  if (loading || spotlightMembers.length === 0) {
    return null
  }

  const spotlightMember = spotlightMembers[currentIndex]
  const isJack026 = spotlightMember.name === 'Jack026'

  return (
    <section className="py-20 bg-bg-primary">
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
            Member <span className="text-gradient">Spotlight</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Featuring our exceptional contributors who drive innovation and excellence
          </p>
        </motion.div>

        {/* Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className={`max-w-4xl mx-auto bg-glass backdrop-blur-xl border rounded-3xl p-12 relative overflow-hidden ${
            isJack026 
              ? 'border-primary-500/40 bg-primary-500/5' 
              : 'border-white/10'
          }`}
        >
          {/* Special Jack026 Effects */}
          {isJack026 && (
            <>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
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

          {/* Leadership Badge */}
          {isJack026 && (
            <div className="absolute top-6 right-6 z-10">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/20">
                <Crown className="w-4 h-4 animate-bounce" />
                Leadership
              </div>
            </div>
          )}

          <div className="relative z-10">
            {/* Member Avatar and Ring */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-2 relative">
                  {spotlightMember.name.charAt(0)}
                  
                  {/* Animated Ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 border-dashed ${
                      isJack026 ? 'border-yellow-500' : 'border-accent-500'
                    }`}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Online Status */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-3 border-bg-primary rounded-full">
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
                    className="text-2xl absolute -top-2 -right-2"
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
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-white mb-3 font-display">
                {spotlightMember.name}
                {isJack026 && (
                  <span className="ml-3 text-2xl animate-pulse">🌟</span>
                )}
              </h3>
              
              <p className="text-xl text-primary-400 mb-2 font-semibold">
                {spotlightMember.position}
              </p>
              
              <p className="text-lg text-gray-300 mb-6">
                {spotlightMember.department} • {spotlightMember.year ? spotlightMember.year.charAt(0).toUpperCase() + spotlightMember.year.slice(1) : 'N/A'}
              </p>

              {spotlightMember.bio && (
                <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  {spotlightMember.bio}
                </p>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-glass-strong rounded-xl border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-primary-500 mb-1 font-display">
                  {spotlightMember.projects}
                </div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>

              <div className="text-center p-4 bg-glass-strong rounded-xl border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-500 mb-1 font-display">
                  {spotlightMember.contributions}
                </div>
                <div className="text-sm text-gray-400">Contributions</div>
              </div>

              <div className="text-center p-4 bg-glass-strong rounded-xl border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-500 mb-1 font-display">
                  {spotlightMember.projects || 0}
                </div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>

              <div className="text-center p-4 bg-glass-strong rounded-xl border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-orange-500 mb-1 font-display">
                  {spotlightMember.skills.length}
                </div>
                <div className="text-sm text-gray-400">Skills</div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4 text-center">Core Skills</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {spotlightMember.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${
                      isJack026
                        ? 'bg-primary-500/20 text-primary-400 border-primary-500/30 hover:bg-primary-500 hover:text-white'
                        : 'bg-glass-strong text-gray-300 border-white/10 hover:bg-primary-500 hover:text-white hover:border-primary-500'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Skills Summary */}
            {spotlightMember.skills && spotlightMember.skills.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 text-center">Top Skills</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {spotlightMember.skills.slice(0, 4).map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        isJack026
                          ? 'bg-primary-500/10 border-primary-500/20'
                          : 'bg-glass-strong border-white/10'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        isJack026 ? 'bg-primary-500' : 'bg-accent-500'
                      }`} />
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              {spotlightMember.github && (
                <motion.a
                  href={spotlightMember.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
              
              {spotlightMember.linkedin && (
                <motion.a
                  href={spotlightMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              )}
              
              {spotlightMember.email && (
                <motion.a
                  href={`mailto:${spotlightMember.email}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              )}

              {/* Portfolio link removed since it's not in the Member interface */}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                                  onClick={() => {}} // Removed dispatch for now
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isJack026
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/25'
                    : 'bg-gradient-to-r from-accent-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-accent-500/25'
                }`}
              >
                <Users className="w-4 h-4" />
                View Full Profile
              </motion.button>

              {isJack026 && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold flex items-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  That's You! 👋
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Rotation Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MemberSpotlight
