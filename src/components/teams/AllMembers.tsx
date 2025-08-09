'use client'

import { useTeam } from '@/contexts/TeamContext'
import { createClient } from '@/lib/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Github, Linkedin, Mail, MapPin, Users } from 'lucide-react'
import { useEffect } from 'react'

const AllMembers = () => {
  const { members, loading, error, refreshMembers } = useTeam()
  const supabase = createClient()

  useEffect(() => {
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
          refreshMembers() // Refresh data
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [refreshMembers, supabase])

  const formatDate = (dateString?: string) => {
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
              Loading team members...
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="text-red-500 text-lg">
              Error loading team members: {error}
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
                {members.length}
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
          {members.length > 0 ? (
            <motion.div
              key="members-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {members.map((member: any, index: number) => {
                const departmentGradient = getDepartmentGradient(member.department || 'Unknown')

                return (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary-500/30 flex flex-col h-full"
                  >
                    {/* Header */}
                    <div className={`relative h-24 bg-gradient-to-br ${departmentGradient} flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-black/10" />
                      
                      {/* Avatar */}
                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110">
                          {(member.name || 'U').charAt(0).toUpperCase()}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-2 right-2">
                        <div className={`w-3 h-3 rounded-full ${
                          member.status === 'active' ? 'bg-green-500' : 
                          member.status === 'inactive' ? 'bg-gray-500' : 'bg-blue-500'
                        }`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Name and Role */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">
                          {member.name}
                        </h3>
                        <p className={`text-sm font-semibold ${getRoleColor(member.role)}`}>
                          {formatRole(member.role)}
                        </p>
                        {member.position && (
                          <p className="text-gray-400 text-sm mt-1">
                            {member.position}
                          </p>
                        )}
                      </div>

                      {/* Department and Year */}
                      <div className="mb-4 space-y-2">
                        {member.department && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{member.department}</span>
                          </div>
                        )}
                        {member.year && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>Year {member.year}</span>
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      {member.skills && member.skills.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {member.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-md"
                              >
                                {skill}
                              </span>
                            ))}
                            {member.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-md">
                                +{member.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <div className="flex justify-between text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{member.projects || 0} projects</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>⭐ {member.contributions || 0}</span>
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      {(member.github || member.linkedin || member.email) && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex gap-2">
                            {member.github && (
                              <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800/50 rounded-lg hover:bg-primary-500/20 transition-colors"
                              >
                                <Github className="w-4 h-4 text-gray-400 hover:text-primary-400" />
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800/50 rounded-lg hover:bg-primary-500/20 transition-colors"
                              >
                                <Linkedin className="w-4 h-4 text-gray-400 hover:text-primary-400" />
                              </a>
                            )}
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="p-2 bg-gray-800/50 rounded-lg hover:bg-primary-500/20 transition-colors"
                              >
                                <Mail className="w-4 h-4 text-gray-400 hover:text-primary-400" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 text-lg">
                No team members found. Add some members through the admin panel!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default AllMembers
