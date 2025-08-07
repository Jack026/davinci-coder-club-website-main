'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, SortAsc, Grid3x3, List, X, ChevronDown, Star } from 'lucide-react'
import { useProjects } from 'contexts/ProjectsContext'

const ProjectFilters = () => {
  const { state, dispatch } = useProjects()
  const { filters, filteredProjects } = state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const categories = [
    { value: 'all', label: 'All Categories', icon: '🎯' },
    { value: 'web', label: 'Web Applications', icon: '🌐' },
    { value: 'mobile', label: 'Mobile Apps', icon: '📱' },
    { value: 'ai-ml', label: 'AI/ML', icon: '🤖' },
    { value: 'blockchain', label: 'Blockchain', icon: '⛓️' },
    { value: 'desktop', label: 'Desktop Apps', icon: '💻' },
    { value: 'iot', label: 'IoT', icon: '🌐' },
    { value: 'game-dev', label: 'Game Development', icon: '🎮' }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'beta', label: 'Beta' },
    { value: 'archived', label: 'Archived' }
  ]

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const techStackOptions = [
    { value: 'all', label: 'All Technologies' },
    { value: 'React', label: 'React' },
    { value: 'Vue.js', label: 'Vue.js' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'Flutter', label: 'Flutter' },
    { value: 'React Native', label: 'React Native' }
  ]

  const sortOptions = [
    { value: 'date', label: 'Date Updated' },
    { value: 'title', label: 'Title' },
    { value: 'stars', label: 'Stars' },
    { value: 'category', label: 'Category' }
  ]

  const updateFilters = (updates: Partial<typeof filters>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: updates })
  }

  const clearFilters = () => {
    updateFilters({
      search: '',
      category: 'all',
      status: 'all',
      difficulty: 'all',
      techStack: 'all'
    })
  }

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'sortBy' && key !== 'sortOrder' && key !== 'view' && value !== 'all' && value !== ''
  ).length

  const toggleFeaturedOnly = () => {
    // This would be implemented with a featured filter
    console.log('Toggle featured projects')
  }

  return (
    <section className="sticky top-20 z-40 bg-bg-secondary/95 backdrop-blur-xl border-b border-white/10 py-6">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Filter Bar */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title, description, or tags..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-glass backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
            />
          </div>

          {/* Quick Category Filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.slice(0, 4).map((category) => (
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

          {/* Featured Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFeaturedOnly}
            className="flex items-center gap-2 px-4 py-3 rounded-lg border bg-glass border-white/10 text-gray-300 hover:bg-glass-strong hover:text-yellow-400 transition-all duration-300"
          >
            <Star className="w-4 h-4" />
            <span className="font-medium">Featured</span>
          </motion.button>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
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

          {/* View and Sort Controls */}
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

        {/* Results Counter */}
        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
          <span>
            Showing <span className="text-primary-500 font-semibold">{filteredProjects.length}</span> of {state.projects.length} projects
          </span>
          {activeFiltersCount > 0 && (
            <span>
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </span>
          )}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-glass rounded-lg border border-white/10 backdrop-blur-xl mb-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilters({ category: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value} className="bg-bg-tertiary">
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => updateFilters({ status: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value} className="bg-bg-tertiary">
                        {status.label}
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
                    {difficultyOptions.map(diff => (
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
                    value={filters.techStack}
                    onChange={(e) => updateFilters({ techStack: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {techStackOptions.map(tech => (
                      <option key={tech.value} value={tech.value} className="bg-bg-tertiary">
                        {tech.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex justify-center mb-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters ({activeFiltersCount})
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ProjectFilters
