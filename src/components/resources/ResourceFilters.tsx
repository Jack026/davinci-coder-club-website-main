'use client'

import { useResources } from '@/contexts/ResourcesContext'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Clock, Filter, Grid3x3, List, Search, SortAsc, Star, TrendingUp, X } from 'lucide-react'
import { useState } from 'react'

const ResourceFilters = () => {
  const { state, dispatch } = useResources()
  const { filters, filteredResources } = state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const categories = [
    { value: 'all', label: 'All Categories', icon: '🎯' },
    { value: 'tutorial', label: 'Interactive Tutorials', icon: '📚' },
    { value: 'documentation', label: 'Documentation Hub', icon: '📖' },
    { value: 'tool', label: 'Developer Tools', icon: '🔧' },
    { value: 'challenge', label: 'Coding Challenges', icon: '🏆' },
    { value: 'download', label: 'Resource Downloads', icon: '📦' },
    { value: 'article', label: 'Tech Articles', icon: '📰' }
  ]

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'interactive', label: 'Interactive' },
    { value: 'video', label: 'Video' },
    { value: 'text', label: 'Text' },
    { value: 'code', label: 'Code' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'project', label: 'Project' }
  ]

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ]

  const technologies = [
    { value: 'all', label: 'All Technologies' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Vue.js', label: 'Vue.js' },
    { value: 'Angular', label: 'Angular' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Java', label: 'Java' }
  ]

  const formats = [
    { value: 'all', label: 'All Formats' },
    { value: 'free', label: 'Free' },
    { value: 'premium', label: 'Premium' },
    { value: 'subscription', label: 'Subscription' }
  ]

  const ratings = [
    { value: 'all', label: 'All Ratings' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' }
  ]

  const sortOptions = [
    { value: 'rating', label: 'Rating', icon: Star },
    { value: 'date', label: 'Date Updated', icon: Clock },
    { value: 'views', label: 'Most Viewed', icon: TrendingUp },
    { value: 'title', label: 'Title A-Z', icon: null },
    { value: 'difficulty', label: 'Difficulty', icon: null }
  ]

  const updateFilters = (updates: Partial<typeof filters>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: updates })
  }

  const clearFilters = () => {
    updateFilters({
      search: '',
      category: 'all',
      type: 'all',
      difficulty: 'all',
      technology: 'all',
      format: 'all',
      rating: 'all'
    })
  }

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'sortBy' && key !== 'sortOrder' && key !== 'view' && value !== 'all' && value !== ''
  ).length

  const quickFilters = [
    { key: 'bookmark', label: 'Bookmarked', icon: '🔖' },
    { key: 'completed', label: 'Completed', icon: '✅' },
    { key: 'in-progress', label: 'In Progress', icon: '📖' },
    { key: 'featured', label: 'Featured', icon: '⭐' }
  ]

  return (
    <section className="sticky top-20 z-40 bg-bg-secondary/95 backdrop-blur-xl border-b border-white/10 py-6">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Filter Bar */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[320px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources, tutorials, documentation..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-glass backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white hover:bg-primary-600 transition-colors duration-200"
            >
              <Search className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Quick Category Filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.slice(1, 5).map((category) => (
              <motion.button
                key={category.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateFilters({ category: category.value })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium ${
                  filters.category === category.value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-glass border-white/10 text-gray-300 hover:bg-glass-strong'
                }`}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.label.split(' ')[0]}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="text-sm font-semibold text-gray-400">Quick Filters:</span>
          {quickFilters.map((filter) => (
            <motion.button
              key={filter.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-glass border border-white/10 rounded-full text-sm text-gray-300 hover:bg-glass-strong hover:border-primary-500/50 transition-all duration-300"
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Advanced Filters Toggle & Controls */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                showAdvancedFilters 
                  ? 'bg-primary-500 border-primary-500 text-white' 
                  : 'bg-glass border-white/10 text-gray-300 hover:bg-glass-strong'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium">Advanced Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
            </motion.button>

            <div className="text-sm text-gray-400">
              Showing <span className="text-primary-500 font-semibold">{filteredResources.length}</span> resources for <span className="text-primary-400 font-semibold">Jack026</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                className="px-3 py-2 bg-glass border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-bg-secondary">
                    {option.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  filters.sortOrder === 'asc' 
                    ? 'bg-primary-500 border-primary-500 text-white' 
                    : 'bg-glass border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <SortAsc className={`w-4 h-4 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex bg-glass border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => updateFilters({ view: 'grid' })}
                className={`px-3 py-2 transition-all duration-300 ${
                  filters.view === 'grid' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-glass-strong'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateFilters({ view: 'list' })}
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

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-6 bg-glass rounded-lg border border-white/10 backdrop-blur-xl mb-4">
                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => updateFilters({ type: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {types.map(type => (
                      <option key={type.value} value={type.value} className="bg-bg-tertiary">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Difficulty</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => updateFilters({ difficulty: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {difficulties.map(diff => (
                      <option key={diff.value} value={diff.value} className="bg-bg-tertiary">
                        {diff.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Technology */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Technology</label>
                  <select
                    value={filters.technology}
                    onChange={(e) => updateFilters({ technology: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {technologies.map(tech => (
                      <option key={tech.value} value={tech.value} className="bg-bg-tertiary">
                        {tech.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Format */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Format</label>
                  <select
                    value={filters.format}
                    onChange={(e) => updateFilters({ format: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {formats.map(format => (
                      <option key={format.value} value={format.value} className="bg-bg-tertiary">
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => updateFilters({ rating: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {ratings.map(rating => (
                      <option key={rating.value} value={rating.value} className="bg-bg-tertiary">
                        {rating.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    disabled={activeFiltersCount === 0}
                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-400">Active Filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (key !== 'sortBy' && key !== 'sortOrder' && key !== 'view' && value !== 'all' && value !== '') {
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-medium"
                  >
                    <span>{key}: {value}</span>
                    <button
                      onClick={() => updateFilters({ [key]: key === 'search' ? '' : 'all' })}
                      className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                )
              }
              return null
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default ResourceFilters
