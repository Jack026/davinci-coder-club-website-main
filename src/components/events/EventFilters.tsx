'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, SortAsc, Grid3x3, List, X, ChevronDown } from 'lucide-react'
import { useEvents } from 'contexts/EventsContext'

const EventFilters = () => {
  const { state, dispatch } = useEvents()
  const { filters, filteredEvents } = state
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'competition', label: 'Competitions' },
    { value: 'tech-talk', label: 'Tech Talks' },
    { value: 'networking', label: 'Networking' }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' }
  ]

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Title' },
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
      difficulty: 'all'
    })
  }

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'sortBy' && key !== 'sortOrder' && key !== 'view' && value !== 'all' && value !== ''
  ).length

  return (
    <section className="sticky top-20 z-40 bg-bg-secondary/95 backdrop-blur-xl border-b border-white/10 py-6">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Filter Bar */}
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[280px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-glass backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
            />
          </div>

          {/* Quick Filters Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 ${
              showFilters 
                ? 'bg-primary-500 border-primary-500 text-white' 
                : 'bg-glass border-white/10 text-gray-300 hover:bg-glass-strong'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* View Toggle */}
          <div className="flex bg-glass border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => updateFilters({ view: 'grid' })}
              className={`px-4 py-3 transition-all duration-300 ${
                filters.view === 'grid' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-glass-strong'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateFilters({ view: 'list' })}
              className={`px-4 py-3 transition-all duration-300 ${
                filters.view === 'list' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-glass-strong'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
              className="px-4 py-3 bg-glass border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value} className="bg-bg-secondary">
                  {option.label}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                filters.sortOrder === 'asc' 
                  ? 'bg-primary-500 border-primary-500 text-white' 
                  : 'bg-glass border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <SortAsc className={`w-4 h-4 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-sm text-gray-400 mb-4">
          Showing <span className="text-primary-500 font-semibold">{filteredEvents.length}</span> events
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-glass rounded-lg border border-white/10 backdrop-blur-xl">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilters({ category: e.target.value })}
                    className="w-full px-4 py-2 bg-glass-strong border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value} className="bg-bg-tertiary">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => updateFilters({ status: e.target.value })}
                    className="w-full px-4 py-2 bg-glass-strong border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  >
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value} className="bg-bg-tertiary">
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Difficulty</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => updateFilters({ difficulty: e.target.value })}
                    className="w-full px-4 py-2 bg-glass-strong border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  >
                    {difficultyOptions.map(diff => (
                      <option key={diff.value} value={diff.value} className="bg-bg-tertiary">
                        {diff.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters & Clear */}
              {activeFiltersCount > 0 && (
                <div className="flex items-center justify-between mt-4 p-4 bg-glass-strong rounded-lg border border-white/10">
                  <span className="text-sm text-gray-400">
                    {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 bg-danger-500 hover:bg-danger-600 text-white rounded-lg transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
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

export default EventFilters
