'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink, Github, Eye, Code, Trophy, Crown, Zap } from 'lucide-react'

const FeaturedProjects = () => {
  // Move sampleFeaturedProjects BEFORE useState
  const sampleFeaturedProjects = [
    {
      id: 'featured-1',
      title: 'AI-Powered Code Assistant',
      description: 'Revolutionary AI tool that helps developers write better code faster with intelligent suggestions.',
      category: 'AI/ML',
      status: 'completed',
      difficulty: 'advanced',
      technologies: ['Python', 'TensorFlow', 'React', 'Node.js'],
      githubUrl: 'https://github.com/jack026/ai-code-assistant',
      liveUrl: 'https://ai-assistant.davincicoders.club',
      creator: 'Jack026',
      isJack026Project: true,
      stats: { stars: 2847, views: 15623, downloads: 8934 },
      features: ['Smart code completion', 'Bug detection & fixes', 'Code optimization'],
    },
    {
      id: 'featured-2',
      title: 'Real-time Collaboration Platform',
      description: 'A comprehensive platform for team collaboration with real-time editing and video calls.',
      category: 'Web App',
      status: 'beta',
      difficulty: 'intermediate',
      technologies: ['Next.js', 'Socket.io', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/davincicoders/collab-platform',
      liveUrl: 'https://collab.davincicoders.club',
      creator: 'Da-Vinci Team',
      isJack026Project: true,
      stats: { stars: 1256, views: 8947, downloads: 3421 },
      features: ['Real-time document editing', 'Video conferencing', 'Task management'],
    },
    {
      id: 'featured-3',
      title: 'Smart Campus Management System',
      description: 'Complete campus management solution for ADTU with student portal and admin tools.',
      category: 'System',
      status: 'in-progress',
      difficulty: 'advanced',
      technologies: ['React', 'Express.js', 'MongoDB', 'Redis'],
      githubUrl: 'https://github.com/adtu/campus-management',
      liveUrl: 'https://campus.adtu.ac.in',
      creator: 'Jack026',
      isJack026Project: true,
      stats: { stars: 892, views: 5642, downloads: 2108 },
      features: ['Student information system', 'Course management', 'Attendance tracking'],
    }
  ]

  // Now initialize useState with the data (no useEffect needed)
  const [featuredProjects] = useState(sampleFeaturedProjects)

  return (
    <section className="py-16 md:py-24 bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/8 via-transparent to-secondary-500/6" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our most innovative and impactful projects led by{' '}
            <span className="text-primary-400 font-semibold">Jack026</span>
          </p>

          {/* Jack026 Special Badge */}
          <div className="mt-8 inline-flex items-center gap-3 bg-glass backdrop-blur-xl border border-primary-500/30 bg-primary-500/5 rounded-2xl px-6 py-3">
            <Crown className="w-5 h-5 text-yellow-500 animate-bounce" />
            <span className="text-primary-400 font-semibold">
              Projects led by Jack026
            </span>
          </div>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group bg-glass backdrop-blur-xl border rounded-3xl overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300 hover:bg-glass-strong ${
                project.isJack026Project 
                  ? 'border-primary-500/40 bg-primary-500/5 hover:border-primary-500' 
                  : 'border-white/10 hover:border-primary-500/30'
              }`}
            >
              {/* Jack026 Special Effects */}
              {project.isJack026Project && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
              )}

              {/* Project Header */}
              <div className="relative h-40 md:h-48 bg-gradient-to-br from-primary-500 to-secondary-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                
                {/* Project Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl md:text-6xl text-white/80">
                    {project.category === 'AI/ML' ? '🤖' : 
                     project.category === 'Web App' ? '🌐' : '⚙️'}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    project.status === 'completed' ? 'bg-green-500/90 text-white' :
                    project.status === 'beta' ? 'bg-purple-500/90 text-white' :
                    'bg-yellow-500/90 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Jack026 Badge */}
                {project.isJack026Project && (
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Jack026 Project
                    </div>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm font-semibold border border-primary-500/30">
                    {project.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    project.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    project.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-display group-hover:text-primary-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6 flex-1 text-sm md:text-base">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Key Features:</h4>
                  <div className="space-y-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <Zap className="w-3 h-3 text-primary-500 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-glass-strong p-3 rounded-lg text-center border border-white/10">
                    <div className="flex items-center justify-center gap-1 text-sm font-bold text-yellow-500">
                      <Star className="w-4 h-4" />
                      {project.stats.stars.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Stars</div>
                  </div>
                  <div className="bg-glass-strong p-3 rounded-lg text-center border border-white/10">
                    <div className="flex items-center justify-center gap-1 text-sm font-bold text-blue-500">
                      <Eye className="w-4 h-4" />
                      {project.stats.views.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Views</div>
                  </div>
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-3 mb-6 p-3 bg-glass-strong rounded-lg border border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                    {project.creator === 'Jack026' ? 'J' : 'T'}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm flex items-center gap-1">
                      {project.creator}
                      {project.isJack026Project && <Crown className="w-3 h-3 text-yellow-500" />}
                    </div>
                    <div className="text-gray-400 text-xs">Project Lead</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      project.isJack026Project
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/25'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                  
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-glass-strong border border-white/10 text-gray-300 rounded-lg hover:bg-glass hover:text-white hover:border-primary-500 transition-all duration-300 flex items-center justify-center"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
