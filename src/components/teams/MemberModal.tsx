'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, Linkedin, Mail, ExternalLink, Crown, Star, Users, Code, Trophy, Calendar, MapPin, Award } from 'lucide-react'
import { useTeam } from 'contexts/TeamContext'

const MemberModal = () => {
  const { state, dispatch } = useTeam()
  const { selectedMember, modalOpen } = state

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [modalOpen])

  const closeModal = () => {
    dispatch({ type: 'SET_MODAL_OPEN', payload: false })
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatRole = (role: string) => {
    return role.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

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

  if (!selectedMember) return null

  const isJack026 = selectedMember.isJack026
  const departmentGradient = getDepartmentGradient(selectedMember.department)

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className={`relative bg-bg-secondary border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
              isJack026 
                ? 'border-primary-500/40 bg-primary-500/5' 
                : 'border-white/10'
            }`}
          >
            {/* Jack026 Special Effects */}
            {isJack026 && (
              <>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/5 rounded-3xl"
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
            <div className={`sticky top-0 bg-gradient-to-r ${departmentGradient} p-6 flex items-center justify-between border-b border-white/10 rounded-t-3xl relative z-10`}>
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {selectedMember.name.charAt(0)}
                  
                  {/* Jack026 Crown */}
                  {isJack026 && (
                    <motion.div
                      className="absolute -top-2 -right-2 text-xl"
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
                <div>
                  <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
                    {selectedMember.name}
                    {isJack026 && <span className="text-xl">🌟</span>}
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/80 font-semibold">
                      {selectedMember.position}
                    </span>
                    {isJack026 && (
                      <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold">
                        That's You!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-200 relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 relative z-10">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-6 mb-6 flex-wrap">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedMember.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="capitalize">{formatRole(selectedMember.role)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDate(selectedMember.joinDate)}</span>
                    </div>
                  </div>

                  {selectedMember.bio && (
                    <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-bold text-white mb-3 font-display">About</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedMember.bio}
                      </p>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
                    <Code className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-500 font-display">
                      {selectedMember.projects || 0}
                    </div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>

                  <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
                    <Star className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-500 font-display">
                      {selectedMember.contributions || 0}
                    </div>
                    <div className="text-sm text-gray-400">Contributions</div>
                  </div>

                  <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
                    <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-500 font-display">
                      {selectedMember.achievements?.length || 0}
                    </div>
                    <div className="text-sm text-gray-400">Achievements</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 font-display flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-500" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedMember.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border ${
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

              {/* Specializations */}
              {selectedMember.specialization && selectedMember.specialization.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 font-display">
                    Specializations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedMember.specialization.map((spec, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-glass-strong rounded-lg border border-white/10"
                      >
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        <span className="text-gray-300">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {selectedMember.achievements && selectedMember.achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 font-display">
                    Recent Achievements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedMember.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-4 rounded-lg border ${
                          isJack026
                            ? 'bg-primary-500/10 border-primary-500/20'
                            : 'bg-glass-strong border-white/10'
                        }`}
                      >
                        <Award className={`w-5 h-5 flex-shrink-0 ${
                          isJack026 ? 'text-primary-500' : 'text-accent-500'
                        }`} />
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="flex justify-center gap-4 mb-8">
                {selectedMember.github && (
                  <motion.a
                    href={selectedMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                )}
                
                {selectedMember.linkedin && (
                  <motion.a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                )}
                
                {selectedMember.email && (
                  <motion.a
                    href={`mailto:${selectedMember.email}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                )}

                {selectedMember.portfolio && (
                  <motion.a
                    href={selectedMember.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                {isJack026 ? (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold flex items-center gap-2"
                  >
                    <Crown className="w-5 h-5" />
                    Your Amazing Profile!
                  </motion.div>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      Connect
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeModal}
                      className="px-8 py-3 bg-glass border border-white/10 text-gray-300 rounded-xl font-semibold hover:bg-glass-strong hover:text-white hover:border-primary-500 transition-all duration-300"
                    >
                      Close
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MemberModal
