'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Star, Users, Download, Calendar, Tag, Code, Award } from 'lucide-react'
import { useProjects } from 'contexts/ProjectsContext'

const ProjectModal = () => {
  const { state, dispatch } = useProjects()
  const { selectedProject, modalOpen } = state

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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-500/20 text-green-500 border-green-500/30',
      'in-progress': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      beta: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
      archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
    return colors[status as keyof typeof colors] || colors.completed
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      web: '🌐',
      mobile: '📱',
      'ai-ml': '🤖',
      blockchain: '⛓️',
      desktop: '💻',
      iot: '🔗',
      'game-dev': '🎮'
    }
    return icons[category as keyof typeof icons] || '💻'
  }

  if (!selectedProject) return null

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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-bg-secondary border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-secondary-500 p-6 flex items-center justify-between border-b border-white/10 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{getCategoryIcon(selectedProject.category)}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">
                    {selectedProject.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/80 capitalize">
                      {selectedProject.category.replace('-', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status.replace('-', ' ').toUpperCase()}
                    </span>
                    {selectedProject.featured && (
                      <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <button
                onClick={closeModal}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Project Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary-500 font-display">
                    {formatNumber(selectedProject.stars)}
                  </div>
                  <div className="text-sm text-gray-400">Stars</div>
                </div>
                <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary-500 font-display">
                    {selectedProject.contributors.length}
                  </div>
                  <div className="text-sm text-gray-400">Contributors</div>
                </div>
                <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center">
                  <Download className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary-500 font-display">
                    {formatNumber(selectedProject.downloads)}
                  </div>
                  <div className="text-sm text-gray-400">Downloads</div>
                </div>
                <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center">
                  <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white">
                    {formatDate(selectedProject.updatedAt)}
                  </div>
                  <div className="text-sm text-gray-400">Last Updated</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 font-display flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary-500" />
                  Description
                </h3>
                <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 font-display flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary-500" />
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-glass backdrop-blur-xl border border-white/10 rounded-lg text-gray-300 font-medium hover:bg-glass-strong hover:border-primary-500/50 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              {selectedProject.features && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 font-display flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-500" />
                    Key Features
                  </h3>
                  <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-6">
                    <ul className="space-y-3">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Contributors */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 font-display flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-500" />
                  Contributors
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.contributors.map((contributor, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-glass backdrop-blur-xl border border-white/10 rounded-lg px-4 py-2"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {contributor.charAt(0)}
                      </div>
                      <span className="text-gray-300 font-medium">{contributor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 flex-wrap">
                <motion.a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </motion.a>

                {selectedProject.demo && (
                  <motion.a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-glass backdrop-blur-xl border border-white/10 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-glass-strong hover:border-primary-500 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </motion.a>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch({ type: 'STAR_PROJECT', payload: selectedProject.id })}
                  className="px-6 py-4 bg-glass backdrop-blur-xl border border-white/10 text-yellow-400 rounded-xl font-semibold hover:bg-glass-strong hover:border-yellow-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Star className="w-5 h-5" />
                  Star
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
