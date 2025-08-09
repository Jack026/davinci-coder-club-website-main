'use client'

import { adminService, testDatabaseConnection } from '@/lib/admin/adminService'
import { createClient } from '@/lib/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import {
    BarChart3,
    BookOpen,
    Calendar,
    Download,
    Edit,
    Eye,
    FolderOpen,
    Github,
    Linkedin,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    Settings,
    Shield,
    Trash2,
    Upload,
    User,
    Users,
    X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { AdminForm } from './AdminForms'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'moderator'
  permissions: string[]
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
    testDatabaseConnection()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('profile_id', user.id)
          .single()

        if (adminData) {
          setAdminUser({
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.full_name || 'Admin',
            role: adminData.role as 'admin' | 'moderator',
            permissions: adminData.permissions || []
          })
          setIsAuthenticated(true)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  }

  const handleLogin = async () => {
    const email = prompt('Enter admin email:')
    const password = prompt('Enter admin password:')
    
    if (email && password) {
      try {
        // Check for hardcoded admin credentials
        if (email === 'sjs@10' && password === 'sourav') {
          // Create a mock admin user
          setAdminUser({
            id: 'admin-user-id',
            email: 'sjs@10',
            name: 'Admin',
            role: 'admin',
            permissions: ['manage_team', 'manage_events', 'manage_projects', 'manage_resources', 'view_analytics', 'manage_admins']
          })
          setIsAuthenticated(true)
          return
        }
        
        // Try Supabase auth as fallback
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        
        await checkAuth()
      } catch (error) {
        alert('Login failed. Please check your credentials.')
        console.error('Login error:', error)
      }
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setAdminUser(null)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-display">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-400">
                  DaVinci Coder Club Management
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {isAuthenticated && adminUser && (
                <div className="text-right">
                  <p className="text-sm text-white font-semibold">{adminUser.name}</p>
                  <p className="text-xs text-gray-400">{adminUser.role}</p>
                </div>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 bg-glass-strong border-r border-white/10 p-4">
              {!isAuthenticated ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Admin Access Required</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Please login to access the admin panel
                  </p>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Login as Admin
                  </button>
                </div>
              ) : (
                <>
                  <nav className="space-y-2">
                    {[
                      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                      { id: 'team', label: 'Team Members', icon: Users },
                      { id: 'events', label: 'Events', icon: Calendar },
                      { id: 'projects', label: 'Projects', icon: FolderOpen },
                      { id: 'resources', label: 'Resources', icon: BookOpen },
                      { id: 'messages', label: 'Messages', icon: MessageSquare },
                      { id: 'settings', label: 'Settings', icon: Settings }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                          activeTab === item.id
                            ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-glass'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-auto pt-4 border-t border-white/10">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-400 hover:text-white hover:bg-glass transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
              {!isAuthenticated ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-6 opacity-50">🔒</div>
                  <h2 className="text-3xl font-bold text-white mb-4">Authentication Required</h2>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Please login with your admin credentials to access the management panel.
                  </p>
                </div>
              ) : (
                <AdminContent activeTab={activeTab} adminUser={adminUser} />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const AdminContent = ({ activeTab, adminUser }: { activeTab: string; adminUser: AdminUser | null }) => {
  switch (activeTab) {
    case 'dashboard':
      return <DashboardTab />
    case 'team':
      return <TeamTab />
    case 'events':
      return <EventsTab />
    case 'projects':
      return <ProjectsTab />
    case 'resources':
      return <ResourcesTab />
    case 'messages':
      return <MessagesTab />
    case 'settings':
      return <SettingsTab adminUser={adminUser} />
    default:
      return <DashboardTab />
  }
}

const DashboardTab = () => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Total Members', value: '24', icon: Users, color: 'from-blue-500 to-cyan-500' },
        { label: 'Active Events', value: '3', icon: Calendar, color: 'from-green-500 to-emerald-500' },
        { label: 'Projects', value: '12', icon: FolderOpen, color: 'from-purple-500 to-pink-500' },
        { label: 'Resources', value: '45', icon: BookOpen, color: 'from-orange-500 to-red-500' }
      ].map((stat) => (
        <div key={stat.label} className="bg-glass border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-glass border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New member joined', time: '2 hours ago', user: 'John Doe' },
            { action: 'Event created', time: '4 hours ago', user: 'Admin' },
            { action: 'Project updated', time: '6 hours ago', user: 'Jane Smith' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-glass-strong rounded-lg">
              <div className="w-2 h-2 bg-primary-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-gray-400">by {activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-glass border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Add Member', icon: Plus, color: 'from-blue-500 to-cyan-500' },
            { label: 'Create Event', icon: Calendar, color: 'from-green-500 to-emerald-500' },
            { label: 'Upload Resource', icon: Upload, color: 'from-purple-500 to-pink-500' },
            { label: 'View Messages', icon: MessageSquare, color: 'from-orange-500 to-red-500' }
          ].map((action) => (
            <button
              key={action.label}
              className="p-4 bg-glass-strong border border-white/10 rounded-lg hover:bg-glass transition-all duration-300 text-left"
            >
              <div className={`w-8 h-8 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm text-white font-semibold">{action.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const TeamTab = () => {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)
  const [selectedMember, setSelectedMember] = useState<any>(null)

  useEffect(() => {
    fetchMembers()
  }, [])

  // Make fetchMembers async and always get fresh data
  const fetchMembers = async () => {
    try {
      setLoading(true)
      const data = await adminService.getTeamMembers()
      console.log('Fresh team members:', data) // Debug: See what you get
      setMembers(data)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setShowForm(true)
  }

  const handleEditMember = (member: any) => {
    setEditingMember(member)
    setShowForm(true)
  }

  const handleDeleteMember = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        await adminService.deleteTeamMember(id)
        await fetchMembers()
      } catch (error) {
        console.error('Error deleting member:', error)
        alert('Error deleting member')
      }
    }
  }

  // PATCH: Make sure we await fetchMembers before closing the modal.
  const handleFormSuccess = async () => {
    await fetchMembers()
    setShowForm(false)
    setEditingMember(null)
  }

  const handleViewMember = (member: any) => {
    setSelectedMember(member)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Team Members</h2>
        <button 
          onClick={handleAddMember}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading team members...</p>
        </div>
      ) : (
        <div className="bg-glass border border-white/10 rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-400 border-b border-white/10 pb-3">
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Actions</div>
            </div>
            
            <div className="space-y-3 mt-4">
              {members.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No team members found</p>
                </div>
              ) : (
                members.map((member) => (
                  <div key={member.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-white/5">
                    <div className="col-span-3">
                      <p className="text-white font-semibold">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.email}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded-md text-xs">
                        {member.role}
                      </span>
                    </div>
                    <div className="col-span-2 text-gray-400">{member.department || 'N/A'}</div>
                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-md text-xs ${
                        member.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      <button 
                        onClick={() => handleViewMember(member)}
                        className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditMember(member)}
                        className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300"
                        title="Edit Member"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteMember(member.id)}
                        className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300"
                        title="Delete Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Team Member Form */}
      {showForm && (
        <AdminForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
          editData={editingMember}
          type="team"
        />
      )}

      {/* Member Details Modal */}
      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  )
}

const EventsTab = () => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const data = await adminService.getEvents()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvent = () => {
    setEditingEvent(null)
    setShowForm(true)
  }

  const handleEditEvent = (event: any) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const handleDeleteEvent = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await adminService.deleteEvent(id)
        await fetchEvents()
      } catch (error) {
        console.error('Error deleting event:', error)
        alert('Error deleting event')
      }
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingEvent(null)
    fetchEvents()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Events</h2>
        <div className="flex gap-2">
          <button 
            onClick={async () => {
              try {
                console.log('Testing database connection...')
                const { data, error } = await supabase
                  .from('events')
                  .select('*')
                  .limit(1)
                
                if (error) {
                  console.error('Database test failed:', error)
                  alert(`Database test failed: ${error.message}`)
                } else {
                  console.log('Database test successful:', data)
                  alert('Database connection successful!')
                }
              } catch (err) {
                console.error('Database test error:', err)
                alert(`Database test error: ${err}`)
              }
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
          >
            Test DB
          </button>
          <button 
            onClick={handleAddEvent}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading events...</p>
        </div>
      ) : (
        <div className="bg-glass border border-white/10 rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-400 border-b border-white/10 pb-3">
              <div className="col-span-4">Title</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Actions</div>
            </div>
            
            <div className="space-y-3 mt-4">
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No events found</p>
                </div>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-white/5">
                    <div className="col-span-4">
                      <p className="text-white font-semibold">{event.title}</p>
                      <p className="text-xs text-gray-400">{event.description?.substring(0, 50)}...</p>
                    </div>
                    <div className="col-span-2 text-gray-400">{formatDate(event.date)}</div>
                    <div className="col-span-2 text-gray-400">{event.location || 'N/A'}</div>
                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-md text-xs ${
                        event.status === 'upcoming' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : event.status === 'ongoing'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <button 
                        onClick={() => handleEditEvent(event)}
                        className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300"
                        title="Edit Event"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Event Form */}
      {showForm && (
        <AdminForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
          editData={editingEvent}
          type="event"
        />
      )}
    </div>
  )
}

const ProjectsTab = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-white">Projects</h2>
      <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
    
    <div className="bg-glass border border-white/10 rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-400 border-b border-white/10 pb-3">
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Tech Stack</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Contributors</div>
          <div className="col-span-2">Actions</div>
        </div>
        
        <div className="space-y-3 mt-4">
          {[
            { title: 'E-Learning Platform', techStack: 'React, Node.js', status: 'Active', contributors: '5' },
            { title: 'Mobile App', techStack: 'Flutter', status: 'Active', contributors: '3' },
            { title: 'AI Chatbot', techStack: 'Python, TensorFlow', status: 'Completed', contributors: '2' }
          ].map((project, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-white/5">
              <div className="col-span-4">
                <p className="text-white font-semibold">{project.title}</p>
              </div>
              <div className="col-span-2 text-gray-400">{project.techStack}</div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-md text-xs ${
                  project.status === 'Active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="col-span-2 text-gray-400">{project.contributors}</div>
              <div className="col-span-2 flex items-center gap-2">
                <button className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const ResourcesTab = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-white">Resources</h2>
      <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Resource
      </button>
    </div>
    
    <div className="bg-glass border border-white/10 rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-400 border-b border-white/10 pb-3">
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Difficulty</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Actions</div>
        </div>
        
        <div className="space-y-3 mt-4">
          {[
            { title: 'React Fundamentals', type: 'Tutorial', difficulty: 'Beginner', category: 'Frontend' },
            { title: 'Node.js API Guide', type: 'Article', difficulty: 'Intermediate', category: 'Backend' },
            { title: 'Machine Learning Basics', type: 'Video', difficulty: 'Advanced', category: 'AI/ML' }
          ].map((resource, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-white/5">
              <div className="col-span-4">
                <p className="text-white font-semibold">{resource.title}</p>
              </div>
              <div className="col-span-2 text-gray-400">{resource.type}</div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-md text-xs ${
                  resource.difficulty === 'Beginner' 
                    ? 'bg-green-500/20 text-green-400'
                    : resource.difficulty === 'Intermediate'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {resource.difficulty}
                </span>
              </div>
              <div className="col-span-2 text-gray-400">{resource.category}</div>
              <div className="col-span-2 flex items-center gap-2">
                <button className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const MessagesTab = () => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6">Contact Messages</h2>
    
    <div className="bg-glass border border-white/10 rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-400 border-b border-white/10 pb-3">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-3">Subject</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Actions</div>
        </div>
        
        <div className="space-y-3 mt-4">
          {[
            { name: 'John Doe', email: 'john@example.com', subject: 'General Inquiry', status: 'Unread' },
            { name: 'Jane Smith', email: 'jane@example.com', subject: 'Event Question', status: 'Read' },
            { name: 'Bob Wilson', email: 'bob@example.com', subject: 'Membership', status: 'Replied' }
          ].map((message, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-white/5">
              <div className="col-span-3">
                <p className="text-white font-semibold">{message.name}</p>
              </div>
              <div className="col-span-3 text-gray-400">{message.email}</div>
              <div className="col-span-3 text-gray-400">{message.subject}</div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-md text-xs ${
                  message.status === 'Unread' 
                    ? 'bg-red-500/20 text-red-400'
                    : message.status === 'Read'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {message.status}
                </span>
              </div>
              <div className="col-span-1 flex items-center gap-2">
                <button className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const SettingsTab = ({ adminUser }: { adminUser: AdminUser | null }) => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-glass border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Admin Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Name</label>
            <input
              type="text"
              defaultValue={adminUser?.name}
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              defaultValue={adminUser?.email}
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Role</label>
            <input
              type="text"
              defaultValue={adminUser?.role}
              disabled
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-glass border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Permissions</h3>
        <div className="space-y-3">
          {adminUser?.permissions.map((permission, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-white capitalize">{permission.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-glass border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Export</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 bg-glass-strong border border-white/10 rounded-lg hover:bg-glass transition-all duration-300">
            <Download className="w-5 h-5 text-gray-400" />
            <span className="text-white">Export Team Data</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 bg-glass-strong border border-white/10 rounded-lg hover:bg-glass transition-all duration-300">
            <Download className="w-5 h-5 text-gray-400" />
            <span className="text-white">Export Events Data</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 bg-glass-strong border border-white/10 rounded-lg hover:bg-glass transition-all duration-300">
            <Download className="w-5 h-5 text-gray-400" />
            <span className="text-white">Export Projects Data</span>
          </button>
        </div>
      </div>
      
      <div className="bg-glass border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Info</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Version:</span>
            <span className="text-white">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Database:</span>
            <span className="text-white">Supabase</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Last Updated:</span>
            <span className="text-white">2024-03-01</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Member Details Modal Component
const MemberDetailsModal = ({ member, onClose }: { member: any; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white font-display">Member Details</h2>
            <p className="text-sm text-gray-400">View complete member information</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <p className="text-white font-semibold">{member.name}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <p className="text-white">{member.email || 'N/A'}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Position</label>
                <p className="text-white">{member.position || 'N/A'}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Role</label>
                <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded-md text-xs">
                  {member.role}
                </span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Department</label>
                <p className="text-white">{member.department || 'N/A'}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Year</label>
                <p className="text-white">{member.year || 'N/A'}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Status</label>
                <span className={`px-2 py-1 rounded-md text-xs ${
                  member.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {member.status}
                </span>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Projects</label>
                <p className="text-white">{member.projects || 0}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          {member.skills && member.skills.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-glass-strong text-sm text-gray-400 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          {member.bio && (
            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">Bio</label>
              <p className="text-white text-sm leading-relaxed">{member.bio}</p>
            </div>
          )}

          {/* Social Links */}
          <div className="mt-6">
            <label className="block text-sm text-gray-400 mb-3">Social Links</label>
            <div className="flex gap-3">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-glass border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
              
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-glass border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 px-3 py-2 bg-glass border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Email</span>
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-glass border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FolderOpen className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-gray-400">Projects</span>
              </div>
              <p className="text-2xl font-bold text-white">{member.projects || 0}</p>
            </div>
            
            <div className="bg-glass border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-gray-400">Contributions</span>
              </div>
              <p className="text-2xl font-bold text-white">{member.contributions || 0}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdminPanel 