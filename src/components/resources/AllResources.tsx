'use client'

import { useResources } from '@/contexts/ResourcesContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Bookmark, Clock, ExternalLink, Eye, Filter, Grid3x3, List, Play, Star, Users } from 'lucide-react'

const AllResources = () => {
  const { state, dispatch } = useResources()
  const { filteredResources, filters, loading } = state

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
      intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
      expert: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colors[difficulty as keyof typeof colors] || colors.intermediate
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      tutorial: 'from-blue-500 to-cyan-600',
      documentation: 'from-green-500 to-emerald-600',
      tool: 'from-purple-500 to-pink-600',
      challenge: 'from-orange-500 to-red-600',
      download: 'from-indigo-500 to-purple-600',
      article: 'from-teal-500 to-cyan-600'
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      tutorial: '📚',
      documentation: '📖',
      tool: '🔧',
      challenge: '🏆',
      download: '📦',
      article: '📰'
    }
    return icons[category as keyof typeof icons] || '📄'
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      video: Play,
      interactive: Users,
      text: ExternalLink,
      code: ExternalLink,
      quiz: Award,
      project: ExternalLink
    }
    return icons[type as keyof typeof icons] || ExternalLink
  }

  const handleBookmark = (resourceId: string) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: resourceId })
  }

  const handleMarkComplete = (resourceId: string) => {
    dispatch({ type: 'MARK_COMPLETED', payload: resourceId })
  }

  const handleStartLearning = (resourceId: string) => {
    dispatch({ type: 'MARK_IN_PROGRESS', payload: resourceId })
  }

  if (loading) {
    return (
      <section className="py-20 bg-bg-primary all-resources">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Loading amazing resources for Jack026...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-bg-primary all-resources">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3 font-display">
              All Resources
            </h2>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>Showing</span>
              <span className="bg-primary-500/20 text-primary-500 px-3 py-1 rounded-md font-semibold">
                {filteredResources.length}
              </span>
              <span>curated resources for</span>
              <span className="text-gradient font-semibold">Jack026</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Filter className="w-4 h-4" />
              <span>{Object.entries(filters).filter(([key, value]) => 
                key !== 'sortBy' && key !== 'sortOrder' && key !== 'view' && value !== 'all' && value !== ''
              ).length} filters active</span>
            </div>
            
            <div className="flex bg-glass border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => dispatch({ type: 'UPDATE_FILTERS', payload: { view: 'grid' } })}
                className={`px-3 py-2 transition-all duration-300 ${
                  filters.view === 'grid' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-glass-strong'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch({ type: 'UPDATE_FILTERS', payload: { view: 'list' } })}
                className={`px-3 py-2 transition-all duration-300 ${
                  filters.view === 'list' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-glass-strong'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredResources.length > 0 ? (
            <motion.div
              key="resources-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${
                filters.view === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                  : 'flex flex-col gap-6'
              }`}
            >
              {filteredResources.map((resource, index) => {
                const isGridView = filters.view === 'grid'
                const categoryGradient = getCategoryColor(resource.category)
                const TypeIcon = getTypeIcon(resource.type)

                return (
                  <motion.div
                    key={resource.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: isGridView ? -10 : -3, scale: isGridView ? 1.02 : 1.01 }}
                    className={`group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 cursor-pointer ${
                      isGridView ? 'flex flex-col h-full' : 'flex flex-row items-center p-6'
                    } ${
                      resource.bookmark ? 'border-yellow-500/30 bg-yellow-500/5' : ''
                    } ${
                      resource.completed ? 'border-green-500/30 bg-green-500/5' : ''
                    } ${
                      resource.inProgress ? 'border-blue-500/30 bg-blue-500/5' : ''
                    }`}
                  >
                    {isGridView ? (
                      <>
                        {/* Grid View */}
                        {/* Header with status badges */}
                        <div className={`relative h-48 bg-gradient-to-br ${categoryGradient} flex items-center justify-center overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                          
                          {/* Status Badges */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(resource.difficulty)}`}>
                              {resource.difficulty}
                            </span>
                            {resource.format === 'premium' && (
                              <span className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-xs font-bold">
                                Premium
                              </span>
                            )}
                          </div>

                          {/* Resource status indicators */}
                          {resource.bookmark && (
                            <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Bookmark className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {resource.completed && (
                            <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Completed
                            </div>
                          )}
                          {resource.inProgress && (
                            <div className="absolute bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <Play className="w-3 h-3" />
                              In Progress
                            </div>
                          )}

                          {/* Category Icon */}
                          <div className="text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300">
                            {getCategoryIcon(resource.category)}
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <TypeIcon className="w-4 h-4 text-primary-500" />
                              <span className="text-primary-400 font-medium text-sm capitalize">
                                {resource.category.replace('-', ' ')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-yellow-400 font-medium">{resource.rating}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300">
                            {resource.title}
                          </h3>

                          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                            {resource.description}
                          </p>

                          <div className="text-sm text-gray-400 mb-4">
                            by <span className="text-primary-400 font-medium">{resource.author}</span>
                          </div>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {resource.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md border border-white/10 hover:border-primary-500/50 transition-colors duration-200"
                              >
                                {tech}
                              </span>
                            ))}
                            {resource.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md border border-white/10">
                                +{resource.technologies.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Stats */}
                          <div className="flex justify-between items-center mb-6 p-3 bg-glass-strong rounded-lg border border-white/10">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              {resource.duration}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Eye className="w-3 h-3" />
                              {formatNumber(resource.views)}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Users className="w-3 h-3" />
                              {formatNumber(resource.reviewCount)}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 mt-auto">
                            {resource.completed ? (
                              <div className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold text-center flex items-center justify-center gap-2">
                                <Award className="w-4 h-4" />
                                Completed
                              </div>
                            ) : resource.inProgress ? (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMarkComplete(resource.id)}
                                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
                              >
                                <Play className="w-4 h-4" />
                                Continue
                              </motion.button>
                            ) : (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleStartLearning(resource.id)}
                                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                              >
                                <Play className="w-4 h-4" />
                                Start
                              </motion.button>
                            )}
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleBookmark(resource.id)}
                              className={`px-4 py-3 rounded-lg border transition-all duration-300 flex items-center justify-center ${
                                resource.bookmark
                                  ? 'bg-yellow-500 border-yellow-500 text-white'
                                  : 'bg-glass-strong border-white/10 text-gray-400 hover:bg-glass hover:text-white hover:border-primary-500'
                              }`}
                            >
                              <Bookmark className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <div className={`w-20 h-16 bg-gradient-to-br ${categoryGradient} rounded-lg flex items-center justify-center text-2xl mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          {getCategoryIcon(resource.category)}
                        </div>

                        <div className="flex-1 mr-6">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                              {resource.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(resource.difficulty)}`}>
                              {resource.difficulty}
                            </span>
                            {resource.bookmark && (
                              <span className="text-yellow-500">
                                <Bookmark className="w-4 h-4" />
                              </span>
                            )}
                            {resource.completed && (
                              <span className="text-green-500">
                                <Award className="w-4 h-4" />
                              </span>
                            )}
                          </div>

                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                            {resource.description}
                          </p>

                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              {resource.rating} ({formatNumber(resource.reviewCount)})
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-primary-500" />
                              {resource.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-blue-500" />
                              {formatNumber(resource.views)}
                            </div>
                            <span className="text-primary-400 font-medium">by {resource.author}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[160px]">
                          {resource.completed ? (
                            <div className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold text-center flex items-center justify-center gap-2">
                              <Award className="w-4 h-4" />
                              Completed
                            </div>
                          ) : resource.inProgress ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleMarkComplete(resource.id)}
                              className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                              <Play className="w-4 h-4" />
                              Continue
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleStartLearning(resource.id)}
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <Play className="w-4 h-4" />
                              Start
                            </motion.button>
                          )}
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleBookmark(resource.id)}
                              className={`flex-1 py-2 px-3 rounded-lg transition-all duration-300 ${
                                resource.bookmark
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-glass-strong border border-white/10 text-gray-400 hover:text-white hover:border-primary-500'
                              }`}
                            >
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="flex-1 bg-glass-strong border border-white/10 text-gray-400 py-2 px-3 rounded-lg hover:text-white hover:border-primary-500 transition-all duration-300">
                              <ExternalLink className="w-4 h-4" />
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
              key="no-resources"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-8xl mb-6 opacity-50">🔍</div>
              <h3 className="text-3xl font-bold text-white mb-4">No Resources Found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
                Try adjusting your filters or search terms to discover amazing resources, Jack026.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'UPDATE_FILTERS', payload: { 
                  search: '', 
                  category: 'all', 
                  type: 'all', 
                  difficulty: 'all',
                  technology: 'all',
                  format: 'all',
                  rating: 'all'
                }})}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More / Pagination */}
        {filteredResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-glass backdrop-blur-xl border border-white/10 text-white py-4 px-8 rounded-xl font-semibold hover:bg-glass-strong hover:border-primary-500 transition-all duration-300"
            >
              Load More Resources
            </motion.button>
            <p className="text-sm text-gray-400 mt-4">
              Showing {filteredResources.length} of {state.resources.length} resources
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default AllResources
