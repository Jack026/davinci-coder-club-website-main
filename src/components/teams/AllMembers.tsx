'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Star, Users, Calendar, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useTeam } from 'contexts/TeamContext'

// Define the Profile interface
interface Profile {
  id: string;
  full_name?: string;
  email?: string;
  username?: string;
  avatar_url?: string;
  is_jack026?: boolean;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
}

// Define the Member interface with profiles property
interface TeamMember {
  id: string;
  name?: string;
  position: string;
  department: string;
  role: string;
  year?: string; // Make this optional instead of required
  skills?: string[];
  projects?: number;
  contributions?: number;
  status: string;
  joinDate?: string;
  created_at: string;
  github?: string;
  linkedin?: string;
  email?: string;
  profile_id?: string;
  profiles?: Profile; // This fixes the TypeScript error
}

const AllMembers = () => {
  const { state, dispatch } = useTeam()
  const { filteredMembers, filters, loading } = state
  const supabase = createClient()

  // Move fetchMembers outside useEffect and make it a useCallback
  const fetchMembers = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          *,
          profiles:profile_id (
            id,
            full_name,
            email,
            username,
            avatar_url,
            is_jack026,
            github_url,
            linkedin_url,
            portfolio_url
          )
        `)
        .eq('status', 'active')
        .order('is_jack026', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      dispatch({ type: 'SET_MEMBERS', payload: data || [] })
    } catch (error) {
      console.error('Error fetching members:', error)
      // Handle error by setting empty members array instead of dispatching SET_ERROR
      dispatch({ type: 'SET_MEMBERS', payload: [] })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [supabase, dispatch])////////

  useEffect(() => {
    // Fetch initial data
    fetchMembers()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('team_members_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_members'
        },
        (payload) => {
          console.log('Real-time update:', payload)
          fetchMembers() // Refresh data
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchMembers, supabase]) // Fixed: Now properly includes dependencies

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  const getRoleColor = (role: string) => {
    const colors = {
      'president': 'text-yellow-500',
      'vice-president': 'text-purple-500',
      'secretary': 'text-blue-500',
      'treasurer': 'text-green-500',
      'tech-lead': 'text-red-500',
      'design-lead': 'text-pink-500',
      'core': 'text-orange-500',
      'member': 'text-gray-400'
    }
    return colors[role as keyof typeof colors] || colors.member
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

  const formatRole = (role: string) => {
    return role.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  if (loading) {
    return (
      <section className="py-20 bg-bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Loading team members for Jack026...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3 font-display">
              All Team Members
            </h2>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>Showing</span>
              <span className="bg-primary-500/20 text-primary-500 px-3 py-1 rounded-md font-semibold">
                {filteredMembers.length}
              </span>
              <span>amazing developers</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              Welcome <span className="text-primary-400 font-semibold">Jack026</span> 👋
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredMembers.length > 0 ? (
            <motion.div
              key="members-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${
                filters.view === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                  : 'flex flex-col gap-4'
              }`}
            >
              {filteredMembers.map((member: TeamMember, index: number) => {
                const isGridView = filters.view === 'grid'
                const departmentGradient = getDepartmentGradient(member.department || 'Unknown')
                // Fix: Access is_jack026 from profiles with optional chaining
                const isJack026 = member.profiles?.is_jack026 || false

                return (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: isGridView ? -8 : -3, scale: isGridView ? 1.02 : 1.01 }}
                    onClick={() => dispatch({ type: 'SET_SELECTED_MEMBER', payload: member })}
                    className={`group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary-500/30 ${
                      isGridView ? 'flex flex-col h-full' : 'flex flex-row items-center p-4'
                    } ${
                      isJack026 ? 'border-primary-500/40 bg-primary-500/5' : ''
                    }`}
                  >
                    {isGridView ? (
                      <>
                        {/* Grid View */}
                        {/* Header */}
                        <div className={`relative h-24 bg-gradient-to-br ${departmentGradient} flex items-center justify-center`}>
                          <div className="absolute inset-0 bg-black/10" />
                          
                          {/* Avatar */}
                          <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110">
                              {(member.profiles?.full_name || member.name || 'U').charAt(0).toUpperCase()}
                            </div>
                            
                            {isJack026 && (
                              <motion.div
                                className="absolute -top-1 -right-1 text-sm"
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

                          {/* Status Badge */}
                          <div className="absolute top-2 right-2">
                            <div className={`w-3 h-3 rounded-full ${
                              member.status === 'active' ? 'bg-green-500' : 
                              member.status === 'inactive' ? 'bg-gray-500' : 'bg-blue-500'
                            }`} />
                          </div>

                          {/* Jack026 Badge */}
                          {isJack026 && (
                            <div className="absolute top-2 left-2">
                              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                You
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Body */}
                        <div className="p-4 flex-1 flex flex-col">
                          <h4 className="text-base font-bold text-white mb-1 font-display group-hover:text-primary-400 transition-colors duration-300 line-clamp-1">
                            {member.profiles?.full_name || member.name || 'Unknown'}
                            {isJack026 && <span className="ml-1 text-sm">🌟</span>}
                          </h4>
                          
                          <p className="text-primary-400 mb-1 font-semibold text-sm line-clamp-1">
                            {member.position || 'Member'}
                          </p>
                          
                          <p className="text-gray-400 text-xs mb-3 line-clamp-1">
                            {member.department || 'Unknown Department'}
                          </p>

                          {/* Role */}
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs font-semibold ${getRoleColor(member.role || 'member')}`}>
                              {formatRole(member.role || 'member')}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(member.joinDate || member.created_at)}
                            </span>
                          </div>

                          {/* Skills Preview */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(member.skills || []).slice(0, 2).map((skill: string, skillIndex: number) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md"
                              >
                                {skill}
                              </span>
                            ))}
                            {(member.skills || []).length > 2 && (
                              <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md">
                                +{(member.skills || []).length - 2}
                              </span>
                            )}
                          </div>

                          {/* Quick Stats */}
                          <div className="flex justify-between text-xs text-gray-400 mb-3">
                            <span>Projects: {member.projects || 0}</span>
                            <span>Contributions: {member.contributions || 0}</span>
                          </div>

                          {/* Social Links */}
                          <div className="flex justify-center gap-2 mt-auto">
                            {(member.profiles?.github_url || member.github) && (
                              <motion.a
                                href={member.profiles?.github_url || member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-6 h-6 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500 transition-all duration-300"
                              >
                                <Github className="w-3 h-3" />
                              </motion.a>
                            )}
                            
                            {(member.profiles?.linkedin_url || member.linkedin) && (
                              <motion.a
                                href={member.profiles?.linkedin_url || member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-6 h-6 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
                              >
                                <Linkedin className="w-3 h-3" />
                              </motion.a>
                            )}
                            
                            {(member.profiles?.email || member.email) && (
                              <motion.a
                                href={`mailto:${member.profiles?.email || member.email}`}
                                whileHover={{ scale: 1.1 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-6 h-6 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-300"
                              >
                                <Mail className="w-3 h-3" />
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <div className={`w-16 h-16 bg-gradient-to-br ${departmentGradient} rounded-lg flex items-center justify-center text-lg font-bold text-white mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 relative`}>
                          {(member.profiles?.full_name || member.name || 'U').charAt(0).toUpperCase()}
                          
                          {isJack026 && (
                            <motion.div
                              className="absolute -top-1 -right-1 text-xs"
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

                        <div className="flex-1 mr-4">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                              {member.profiles?.full_name || member.name || 'Unknown'}
                              {isJack026 && <span className="ml-2 text-sm">🌟</span>}
                            </h4>
                            <span className={`text-sm font-semibold ${getRoleColor(member.role || 'member')}`}>
                              {formatRole(member.role || 'member')}
                            </span>
                            {isJack026 && (
                              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                You
                              </span>
                            )}
                          </div>

                          <p className="text-primary-400 text-sm mb-1 font-semibold">
                            {member.position || 'Member'}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {member.department || 'Unknown Department'}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Joined {formatDate(member.joinDate || member.created_at)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {member.projects || 0} projects
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {(member.skills || []).slice(0, 4).map((skill: string, skillIndex: number) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md"
                              >
                                {skill}
                              </span>
                            ))}
                            {(member.skills || []).length > 4 && (
                              <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md">
                                +{(member.skills || []).length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {(member.profiles?.github_url || member.github) && (
                            <motion.a
                              href={member.profiles?.github_url || member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              onClick={(e) => e.stopPropagation()}
                              className="w-8 h-8 bg-glass border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500 transition-all duration-300"
                            >
                              <Github className="w-4 h-4" />
                            </motion.a>
                          )}
                          
                          <div className={`w-3 h-3 rounded-full ${
                            member.status === 'active' ? 'bg-green-500' : 
                            member.status === 'inactive' ? 'bg-gray-500' : 'bg-blue-500'
                          }`} />
                        </div>
                      </>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="no-members"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-8xl mb-6 opacity-50">👥</div>
              <h3 className="text-3xl font-bold text-white mb-4">No Members Found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
                Try adjusting your filters to discover more amazing team members, Jack026.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'UPDATE_FILTERS', payload: { 
                  search: '', 
                  department: 'all', 
                  year: 'all', 
                  role: 'all',
                  skill: 'all',
                  status: 'active'
                }})}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More / Pagination */}
        {filteredMembers.length > 0 && filteredMembers.length < state.members.length && (
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
              Load More Members
            </motion.button>
            <p className="text-sm text-gray-400 mt-4">
              Showing {filteredMembers.length} of {state.members.length} members
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default AllMembers
