'use client'

import { adminService } from '@/lib/admin/adminService'
import { motion } from 'framer-motion'
import { FileText, Save, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'

interface FormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  editData?: any
  type: 'team' | 'event' | 'project' | 'resource'
}

type FormData = {
  [key: string]: any
}

export const AdminForm = ({ isOpen, onClose, onSuccess, editData, type }: FormProps) => {
  const getDefaultFormData = (formType: string) => {
    switch (formType) {
      case 'team':
        return {
          name: '',
          position: '',
          role: 'member',
          department: '',
          year: '',
          skills: [],
          projects: 0,
          contributions: 0,
          status: 'active',
          github: '',
          linkedin: '',
          email: '',
          bio: '',
          image_url: '',
          resume_url: ''
        }
      case 'event':
        return {
          title: '',
          description: '',
          date: '',
          location: '',
          image_url: '',
          status: 'upcoming',
          event_type: 'workshop',
          max_participants: 0,
          current_participants: 0,
          tags: []
        }
      case 'project':
        return {
          title: '',
          description: '',
          tech_stack: [],
          github_url: '',
          live_url: '',
          image_url: '',
          contributors: [],
          status: 'active',
          difficulty: 'intermediate',
          tags: []
        }
      case 'resource':
        return {
          title: '',
          description: '',
          type: 'tutorial',
          url: '',
          tags: [],
          difficulty: 'beginner',
          category: '',
          author: ''
        }
      default:
        return {}
    }
  }

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>(editData || getDefaultFormData(type))
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Prepare data for submission
      const submitData = { ...formData }
      
      // Clean up data - remove undefined/null values and ensure proper types
      Object.keys(submitData).forEach(key => {
        if (submitData[key] === undefined || submitData[key] === null || submitData[key] === '') {
          delete submitData[key]
        }
      })
      
      console.log('Cleaned submit data:', submitData)
      
      // Ensure numeric fields are numbers
      if (type === 'event' && submitData.max_participants) {
        submitData.max_participants = parseInt(submitData.max_participants) || 0
      }
      if (type === 'event' && submitData.current_participants) {
        submitData.current_participants = parseInt(submitData.current_participants) || 0
      }
      if (type === 'team' && submitData.projects) {
        submitData.projects = parseInt(submitData.projects) || 0
      }
      if (type === 'team' && submitData.contributions) {
        submitData.contributions = parseInt(submitData.contributions) || 0
      }
      
      // Ensure date is in proper format for events
      if (type === 'event' && submitData.date) {
        // Convert datetime-local input to ISO string
        const date = new Date(submitData.date)
        if (!isNaN(date.getTime())) {
          submitData.date = date.toISOString()
        }
      }
      
      // Ensure required fields are present
      if (type === 'team' && !submitData.name) {
        alert('Name is required')
        setLoading(false)
        return
      }
      
      if (type === 'event' && !submitData.title) {
        alert('Event title is required')
        setLoading(false)
        return
      }
      
      if (type === 'event' && !submitData.date) {
        alert('Event date is required')
        setLoading(false)
        return
      }
      
      if (type === 'project' && !submitData.title) {
        alert('Project title is required')
        setLoading(false)
        return
      }
      
      if (type === 'resource' && !submitData.title) {
        alert('Resource title is required')
        setLoading(false)
        return
      }
      
      if (type === 'resource' && !submitData.url) {
        alert('Resource URL is required')
        setLoading(false)
        return
      }

      // Convert skills string to array if needed
      if (type === 'team' && typeof submitData.skills === 'string') {
        submitData.skills = submitData.skills.split(',').map((skill: string) => skill.trim()).filter((skill: string) => skill)
      }

      // Ensure arrays are properly formatted
      if (type === 'team' && !Array.isArray(submitData.skills)) {
        submitData.skills = []
      }

      if (editData) {
        // Update existing
        switch (type) {
          case 'team':
            await adminService.updateTeamMember(editData.id, submitData)
            break
          case 'event':
            await adminService.updateEvent(editData.id, submitData)
            break
          case 'project':
            await adminService.updateProject(editData.id, submitData)
            break
          case 'resource':
            await adminService.updateResource(editData.id, submitData)
            break
        }
      } else {
        // Create new
        switch (type) {
          case 'team':
            await adminService.createTeamMember(submitData)
            break
          case 'event':
            await adminService.createEvent(submitData)
            break
          case 'project':
            await adminService.createProject(submitData)
            break
          case 'resource':
            await adminService.createResource(submitData)
            break
        }
      }
      
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Form submission error:', error)
      
      // Show more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('duplicate key')) {
          alert('This item already exists. Please use a different title or name.')
        } else if (error.message.includes('foreign key')) {
          alert('Invalid reference. Please check your data.')
        } else if (error.message.includes('not null')) {
          alert('Required field is missing. Please fill in all required fields.')
        } else {
          alert(`Error: ${error.message}`)
        }
      } else {
        alert('Error saving data. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleArrayInput = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item)
    setFormData((prev: FormData) => ({ ...prev, [field]: array }))
  }

  const handleFileUpload = async (file: File, field: string) => {
    if (!file) return

    setUploading(true)
    try {
      const uploadedUrl = await adminService.uploadFile(file, field)
      setUploadedFiles((prev: { [key: string]: string }) => ({ ...prev, [field]: uploadedUrl }))
      setFormData((prev: FormData) => ({ ...prev, [field]: uploadedUrl }))
    } catch (error) {
      console.error('File upload error:', error)
      alert('Error uploading file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file, field)
    }
  }

  const triggerFileUpload = (field: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.name = field
      fileInputRef.current.click()
    }
  }

  const removeFile = (field: string) => {
    setUploadedFiles((prev: { [key: string]: string }) => {
      const newFiles = { ...prev }
      delete newFiles[field]
      return newFiles
    })
    setFormData((prev: FormData) => ({ ...prev, [field]: '' }))
  }

  const FileUploadComponent = ({ field, label, accept = "image/*", type = "image" }: {
    field: string
    label: string
    accept?: string
    type?: "image" | "document"
  }) => {
    const hasFile = uploadedFiles[field] || formData[field]
    
    return (
      <div className="space-y-2">
        <label className="block text-sm text-gray-400 mb-2">{label}</label>
        
        {hasFile ? (
          <div className="relative">
            {type === "image" ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                <img
                  src={uploadedFiles[field] || formData[field]}
                  alt={label}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(field)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-glass-strong border border-white/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText size={16} className="text-primary-500" />
                  <span className="text-sm text-white">File uploaded</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(field)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => triggerFileUpload(field)}
            className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition-colors"
          >
            <Upload size={24} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-400 mb-1">Click to upload {label}</p>
            <p className="text-xs text-gray-500">or drag and drop</p>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => handleFileSelect(e, field)}
          className="hidden"
        />
        
        {uploading && (
          <div className="flex items-center space-x-2 text-sm text-primary-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
            <span>Uploading...</span>
          </div>
        )}
      </div>
    )
  }

  const renderTeamForm = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Name *</label>
                      <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev: FormData) => ({ ...prev, name: e.target.value }))}
            placeholder="Enter full name"
            className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            required
          />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, position: e.target.value }))}
              placeholder="e.g., Full Stack Developer"
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Year</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, year: e.target.value }))}
              placeholder="e.g., 2024"
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Role & Department */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Role & Department</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, role: e.target.value }))}
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
            >
              <option value="member">Member</option>
              <option value="president">President</option>
              <option value="vice-president">Vice President</option>
              <option value="secretary">Secretary</option>
              <option value="treasurer">Treasurer</option>
              <option value="tech-lead">Tech Lead</option>
              <option value="design-lead">Design Lead</option>
              <option value="core">Core Member</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, department: e.target.value }))}
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Skills & Expertise</h3>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Skills (comma-separated)</label>
          <input
            type="text"
            value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills || ''}
            onChange={(e) => handleArrayInput('skills', e.target.value)}
            placeholder="e.g., React, Node.js, Python, UI/UX Design"
            className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          />
          <p className="text-xs text-gray-500 mt-1">Separate multiple skills with commas</p>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, github: e.target.value }))}
              placeholder="https://github.com/username"
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, linkedin: e.target.value }))}
              placeholder="https://linkedin.com/in/username"
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Bio & Description</h3>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData((prev: FormData) => ({ ...prev, bio: e.target.value }))}
            rows={4}
            placeholder="Tell us about this team member's background, interests, and contributions..."
            className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Number of Projects</label>
            <input
              type="number"
              value={formData.projects}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, projects: parseInt(e.target.value) || 0 }))}
              min="0"
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Contributions</label>
            <input
              type="number"
              value={formData.contributions}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, contributions: parseInt(e.target.value) || 0 }))}
              min="0"
              className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* File Uploads */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Files & Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadComponent
            field="image_url"
            label="Profile Picture"
            accept="image/*"
            type="image"
          />
          
          <FileUploadComponent
            field="resume_url"
            label="Resume/CV"
            accept=".pdf,.doc,.docx"
            type="document"
          />
        </div>
      </div>
    </div>
  )

  const renderEventForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, title: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          required
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Date *</label>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, date: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, location: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Max Participants</label>
        <input
          type="number"
          value={formData.max_participants}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, max_participants: parseInt(e.target.value) || 0 }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, status: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
        >
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Event Type</label>
        <select
          value={formData.event_type}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, event_type: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
        >
          <option value="workshop">Workshop</option>
          <option value="hackathon">Hackathon</option>
          <option value="competition">Competition</option>
          <option value="tech-talk">Tech Talk</option>
          <option value="networking">Networking</option>
        </select>
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags.join(', ')}
          onChange={(e) => handleArrayInput('tags', e.target.value)}
          placeholder="e.g., hackathon, workshop, tech-talk"
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>

      {/* Event Media */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-4">Event Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadComponent
            field="image_url"
            label="Event Banner"
            accept="image/*"
            type="image"
          />
        </div>
      </div>
    </div>
  )

  const renderProjectForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, title: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          required
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
        <input
          type="url"
          value={formData.github_url}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, github_url: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Live URL</label>
        <input
          type="url"
          value={formData.live_url}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, live_url: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
        <select
          value={formData.difficulty}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, difficulty: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, status: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Tech Stack (comma-separated)</label>
        <input
          type="text"
          value={formData.tech_stack.join(', ')}
          onChange={(e) => handleArrayInput('tech_stack', e.target.value)}
          placeholder="e.g., React, Node.js, MongoDB"
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Contributors (comma-separated)</label>
        <input
          type="text"
          value={formData.contributors.join(', ')}
          onChange={(e) => handleArrayInput('contributors', e.target.value)}
          placeholder="e.g., John Doe, Jane Smith"
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags.join(', ')}
          onChange={(e) => handleArrayInput('tags', e.target.value)}
          placeholder="e.g., web-app, mobile, ai"
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
    </div>
  )

  const renderResourceForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, title: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          required
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, type: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
        >
          <option value="tutorial">Tutorial</option>
          <option value="video">Video</option>
          <option value="article">Article</option>
          <option value="tool">Tool</option>
          <option value="github">GitHub Repository</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">URL *</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, url: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
        <select
          value={formData.difficulty}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, difficulty: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, category: e.target.value }))}
          placeholder="e.g., Frontend, Backend, AI/ML"
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData((prev: FormData) => ({ ...prev, author: e.target.value }))}
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-400 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags.join(', ')}
          onChange={(e) => handleArrayInput('tags', e.target.value)}
          placeholder="e.g., react, javascript, web-development"
          className="w-full bg-glass-strong border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
    </div>
  )

  const renderFormContent = () => {
    switch (type) {
      case 'team':
        return renderTeamForm()
      case 'event':
        return renderEventForm()
      case 'project':
        return renderProjectForm()
      case 'resource':
        return renderResourceForm()
      default:
        return null
    }
  }

  if (!isOpen) return null

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
        className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white font-display">
              {editData ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
            <p className="text-sm text-gray-400">
              {editData ? 'Update the information below' : 'Fill in the information below'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-glass border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-glass-strong transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {renderFormContent()}
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-glass border border-white/10 rounded-lg text-white hover:bg-glass-strong transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {editData ? 'Update' : 'Create'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
} 