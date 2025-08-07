'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink, Github, Eye, Code, Calendar } from 'lucide-react'

const AllProjects = () => {
  const [projects] = useState([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI and payment integration.',
      category: 'Web Development',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'completed',
      stars: 234,
      views: 1200,
      githubUrl: '#',
      liveUrl: '#',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates and team features.',
      category: 'Mobile Development',
      technologies: ['Flutter', 'Firebase', 'Dart'],
      status: 'in-progress',
      stars: 89,
      views: 890,
      githubUrl: '#',
      liveUrl: '#',
      date: '2024-02-20'
    },
    {
      id: '3',
      title: 'Weather Prediction ML',
      description: 'Machine learning model for weather prediction with 95% accuracy.',
      category: 'Machine Learning',
      technologies: ['Python', 'Scikit-learn', 'Pandas'],
      status: 'completed',
      stars: 456,
      views: 2300,
      githubUrl: '#',
      liveUrl: '#',
      date: '2024-03-10'
    },
    {
      id: '4',
      title: 'Blockchain Voting System',
      description: 'Secure voting system built on blockchain technology for transparency.',
      category: 'Blockchain',
      technologies: ['Solidity', 'Web3.js', 'React'],
      status: 'beta',
      stars: 178,
      views: 1500,
      githubUrl: '#',
      liveUrl: '#',
      date: '2024-01-05'
    },
    {
      id: '5',
      title: 'IoT Smart Home',
      description: 'Complete IoT solution for smart home automation and monitoring.',
      category: 'IoT',
      technologies: ['Arduino', 'Raspberry Pi', 'Python'],
      status: 'completed',
      stars: 312,
      views: 1800,
      githubUrl: '#',
      liveUrl: '#',
      date: '2024-02-28'
    },
    {
      id: '6',
      title: 'Game Development Engine',
      description: '2D game engine with physics simulation and visual scripting.',
      category: 'Game Development',
      technologies: ['C++', 'OpenGL', 'SDL'],
      status: 'in-progress',
      stars: 567,
      views: 3200,
      githubUrl: '#',
      liveUrl: '#',
      date: '2024-03-15'
    }
  ])

  return (
    <section className="py-16 md:py-24 bg-bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
            All <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our complete collection of innovative projects across various technologies
          </p>
          
          <div className="mt-6 inline-flex items-center gap-2 bg-glass backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            <Code className="w-4 h-4 text-primary-500" />
            <span className="text-gray-300 font-medium">
              <span className="text-primary-400 font-bold">{projects.length}</span> projects found
            </span>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 group cursor-pointer"
            >
              {/* Project Header */}
              <div className="relative h-32 md:h-40 bg-gradient-to-br from-primary-500/20 via-secondary-500/15 to-accent-500/10 flex items-center justify-center overflow-hidden">
                <div className="text-3xl md:text-4xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                  {project.category === 'Web Development' ? '🌐' :
                   project.category === 'Mobile Development' ? '📱' :
                   project.category === 'Machine Learning' ? '🤖' :
                   project.category === 'Blockchain' ? '⛓️' :
                   project.category === 'IoT' ? '🏠' : '🎮'}
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'completed' ? 'bg-green-500/90 text-white' :
                    project.status === 'in-progress' ? 'bg-yellow-500/90 text-white' :
                    'bg-purple-500/90 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category */}
                <div className="mb-3">
                  <span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full text-xs font-semibold border border-primary-500/30">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-display group-hover:text-primary-400 transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {project.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-blue-500" />
                    {project.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-green-500" />
                    {new Date(project.date).getFullYear()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 bg-glass-strong border border-white/10 text-gray-300 rounded-lg hover:bg-glass hover:text-white hover:border-primary-500 transition-all duration-300"
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

export default AllProjects
