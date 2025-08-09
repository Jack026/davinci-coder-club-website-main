'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Filter, Grid3x3, List, Search, SortAsc, X } from 'lucide-react'

const TeamFilters = () => {
  // For now, return null since filtering is not implemented in the simple context
  // This can be implemented later with a simpler state management
  return null

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Civil', label: 'Civil' },
    { value: 'Design', label: 'Design' },
    { value: 'Management', label: 'Management' }
  ]

  const years = [
    { value: 'all', label: 'All Years' },
    { value: 'freshman', label: 'Freshman' },
    { value: 'sophomore', label: 'Sophomore' },
    { value: 'junior', label: 'Junior' },
    { value: 'senior', label: 'Senior' },
    { value: 'graduate', label: 'Graduate' }
  ]

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'president', label: 'President' },
    { value: 'vice-president', label: 'Vice President' },
    { value: 'secretary', label: 'Secretary' },
    { value: 'treasurer', label: 'Treasurer' },
    { value: 'tech-lead', label: 'Tech Lead' },
    { value: 'design-lead', label: 'Design Lead' },
    { value: 'core', label: 'Core Team' },
    { value: 'member', label: 'Member' }
  ]

  const skills = [
    { value: 'all', label: 'All Skills' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'UI/UX Design', label: 'UI/UX Design' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Machine Learning', label: 'Machine Learning' }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'alumni', label: 'Alumni' }
  ]

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'joinDate', label: 'Join Date' },
    { value: 'contributions', label: 'Contributions' },
    { value: 'department', label: 'Department' }
  ]

  const updateFilters = (updates: Partial<typeof filters>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: updates })
  }

  const clearFilters = () => {
    updateFilters({
      search: '',
      department: 'all',
      year: 'all',
      role: 'all',
      skill: 'all',
      status: 'active'
    })
  }

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'sortBy' && key !== 'sortOrder' && key !== 'view' && value !== 'all' && value !== '' && value !== 'active'
  ).length

  const quickFilters = [
    { key: 'leadership', label: 'Leadership', value: 'president,vice-president,secretary,treasurer', icon: '👑' },
    { key: 'tech-leads', label: 'Tech Leads', value: 'tech-lead,design-lead', icon: '🚀' },
    { key: 'core-team', label: 'Core Team', value: 'core', icon: '⭐' },
    { key: 'Jack026', label: 'Jack026', value: 'Jack026', icon: '🔥' }
  ]

  const handleQuickFilter = (filterKey: string, filterValue: string) => {
    if (filterKey === 'Jack026') {
      // Special handling for Jack026 filter
      updateFilters({ search: 'Jack026' })
    } else {
      const roles = filterValue.split(',')
      if (roles.length === 1) {
        updateFilters({ role: roles[0] })
      } else {
        // For multiple roles, we'll set the first one for now
        // In a real app, you might want to support multi-select
        updateFilters({ role: roles[0] })
      }
    }
  }

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
              placeholder="Search members by name, position, skills..."
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

          {/* Quick Department Filters */}
          <div className="flex gap-2 flex-wrap">
            {departments.slice(1, 4).map((dept) => (
              <motion.button
                key={dept.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateFilters({ department: dept.value })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium ${
                  filters.department === dept.value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-glass border-white/10 text-gray-300 hover:bg-glass-strong'
                }`}
              >
                <span>{dept.label.split(' ')[0]}</span>
              </motion.button>
            ))}
          </div>

          {/* Jack026 Special Filter */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickFilter('Jack026', 'Jack026')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium ${
              filters.search.toLowerCase().includes('Jack026')
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-500 text-white'
                : 'bg-glass border-white/10 text-gray-300 hover:bg-glass-strong'
            }`}
          >
            <span>👑</span>
            <span>Jack026</span>
          </motion.button>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="text-sm font-semibold text-gray-400">Quick Filters:</span>
          {quickFilters.map((filter) => (
            <motion.button
              key={filter.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickFilter(filter.key, filter.value)}
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
              Showing <span className="text-primary-500 font-semibold">{filteredMembers.length}</span> team members
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-6 bg-glass rounded-lg border border-white/10 backdrop-blur-xl mb-4">
                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Department</label>
                  <select
                    value={filters.department}
                    onChange={(e) => updateFilters({ department: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value} className="bg-bg-tertiary">
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Year</label>
                  <select
                    value={filters.year}
                    onChange={(e) => updateFilters({ year: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {years.map(year => (
                      <option key={year.value} value={year.value} className="bg-bg-tertiary">
                        {year.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Role</label>
                  <select
                    value={filters.role}
                    onChange={(e) => updateFilters({ role: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value} className="bg-bg-tertiary">
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skill */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Skill</label>
                  <select
                    value={filters.skill}
                    onChange={(e) => updateFilters({ skill: e.target.value })}
                    className="w-full px-3 py-2 bg-glass-strong border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    {skills.map(skill => (
                      <option key={skill.value} value={skill.value} className="bg-bg-tertiary">
                        {skill.label}
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

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-400">Active Filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (key !== 'sortBy' && key !== 'sortOrder' && key !== 'view' && value !== 'all' && value !== '' && value !== 'active') {
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

export default TeamFilters
