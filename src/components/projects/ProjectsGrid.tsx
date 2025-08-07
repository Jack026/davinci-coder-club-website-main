'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Github, ExternalLink, Users, Download, Eye, Calendar, Tag } from 'lucide-react'
import { useProjects } from 'contexts/ProjectsContext'

const ProjectsGrid = () => {
  const { state, dispatch } = useProjects()
  const { filteredProjects, filters, loading } = state

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
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

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'text-green-400 bg-green-500/20',
      intermediate: 'text-yellow-400 bg-yellow-500/20',
      advanced: 'text-red-400 bg-red-500/20'
    }
    return colors[difficulty as keyof typeof colors] || colors.beginner
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

  const getCategoryGradient = (category: string) => {
    const gradients = {
      web: 'from-blue-500 to-cyan-600',
      mobile: 'from-purple-500 to-pink-600',
      'ai-ml': 'from-green-500 to-emerald-600',
      blockchain: 'from-orange-500 to-yellow-600',
      desktop: 'from-indigo-500 to-blue-600',
      iot: 'from-teal-500 to-cyan-600',
      'game-dev': 'from-red-500 to-pink-600'
    }
    return gradients[category as keyof typeof gradients] || 'from-gray-500 to-gray-600'
  }

  if (loading) {
    return (
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Loading amazing projects...
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
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3 font-display">
              All Projects
            </h2>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>Showing</span>
              <span className="bg-primary-500/20 text-primary-500 px-2 py-1 rounded-md font-semibold">
                {filteredProjects.length}
              </span>
              <span>of {state.projects.length} innovative projects</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              View as Jack026 👨‍💻
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${
                filters.view === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                  : 'flex flex-col gap-6'
              }`}
            >
              {filteredProjects.map((project, index) => {
                const isGridView = filters.view === 'grid'
                const categoryGradient = getCategoryGradient(project.category)

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: isGridView ? -12 : -5, scale: isGridView ? 1.02 : 1.01 }}
                    className={`group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 cursor-pointer ${
                      isGridView ? 'flex flex-col h-full' : 'flex flex-row items-center p-6'
                    }`}
                    onClick={() => dispatch({ type: 'SET_SELECTED_PROJECT', payload: project })}
                  >
                    {isGridView ? (
                      <>
                        {/* Grid View */}
                        {/* Header */}
                        <div className={`relative h-48 bg-gradient-to-br ${categoryGradient} flex items-center justify-center overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                          
                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>

                          {/* Featured Badge */}
                          {project.featured && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </div>
                          )}

                          {/* Category Icon */}
                          <div className="text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300">
                            {getCategoryIcon(project.category)}
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">{getCategoryIcon(project.category)}</span>
                            <span className="bg-glass-strong px-3 py-1 rounded-full text-sm font-medium text-primary-400 capitalize">
                              {project.category.replace('-', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                              {project.difficulty}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300">
                            {project.title}
                          </h3>

                          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md border border-white/10 hover:border-primary-500/50 transition-colors duration-200"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 3 && (
                              <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md border border-white/10">
                                +{project.techStack.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Stats */}
                          <div className="flex justify-between items-center mb-4 p-3 bg-glass-strong rounded-lg border border-white/10">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Star className="w-3 h-3 text-yellow-500" />
                              {formatNumber(project.stars)}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Users className="w-3 h-3 text-blue-500" />
                              {project.contributors.length}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Download className="w-3 h-3 text-green-500" />
                              {formatNumber(project.downloads)}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Calendar className="w-3 h-3 text-purple-500" />
                              {formatDate(project.updatedAt)}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 mt-auto">
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </motion.a>

                            {project.demo && (
                              <motion.a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => e.stopPropagation()}
                                className="px-4 py-2.5 bg-glass-strong border border-white/10 text-gray-400 rounded-lg hover:text-white hover:border-primary-500 transition-all duration-300 flex items-center justify-center"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </motion.a>
                            )}

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                dispatch({ type: 'SET_SELECTED_PROJECT', payload: project })
                              }}
                              className="px-4 py-2.5 bg-glass-strong border border-white/10 text-gray-400 rounded-lg hover:text-white hover:border-primary-500 transition-all duration-300 flex items-center justify-center"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <div className={`w-24 h-16 bg-gradient-to-br ${categoryGradient} rounded-lg flex items-center justify-center text-2xl mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          {getCategoryIcon(project.category)}
                        </div>

                        <div className="flex-1 mr-6">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                              {project.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ').toUpperCase()}
                            </span>
                            {project.featured && (
                              <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                          </div>

                          <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              {formatNumber(project.stars)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-blue-500" />
                              {project.contributors.length}
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4 text-green-500" />
                              {formatNumber(project.downloads)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Tag className="w-4 h-4 text-primary-500" />
                              {project.category.replace('-', ' ')}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[140px]">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </motion.a>
                          <div className="flex gap-2">
                            {project.demo && (
                              <button className="flex-1 bg-glass-strong border border-white/10 text-gray-400 py-2 px-3 rounded-lg hover:text-white hover:border-primary-500 transition-all duration-300 flex items-center justify-center">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            )}
                            <button className="flex-1 bg-glass-strong border border-white/10 text-gray-400 py-2 px-3 rounded-lg hover:text-white hover:border-primary-500 transition-all duration-300 flex items-center justify-center">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-8xl mb-6 opacity-50">🔍</div>
              <h3 className="text-3xl font-bold text-white mb-4">No Projects Found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
                Try adjusting your filters or search terms to discover amazing projects.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'UPDATE_FILTERS', payload: { 
                  search: '', 
                  category: 'all', 
                  status: 'all', 
                  difficulty: 'all',
                  techStack: 'all'
                }})}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ProjectsGrid
