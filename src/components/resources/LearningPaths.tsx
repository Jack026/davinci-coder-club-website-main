'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, Star, Award, Play, ArrowRight, Target, TrendingUp } from 'lucide-react'
import { useResources } from 'contexts/ResourcesContext'

const LearningPaths = () => {
  const { dispatch } = useResources()

  // Move mock data BEFORE useState
  const mockPaths = [
    {
      id: 'path-1',
      title: 'Full Stack Web Development',
      description: 'Complete journey from frontend to backend development with modern frameworks, databases, and deployment strategies.',
      category: 'web-development',
      difficulty: 'intermediate' as const,
      duration: '12 weeks',
      technologies: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
      resources: ['res1', 'res2', 'res3'],
      progress: 45,
      enrolled: true,
      featured: true,
      completedResources: ['res1'],
      objectives: [
        'Build responsive web applications',
        'Master frontend and backend integration',
        'Deploy applications to production',
        'Understand database design'
      ],
      prerequisites: ['Basic HTML/CSS knowledge', 'JavaScript fundamentals'],
      badge: '🌟'
    },
    {
      id: 'path-2',
      title: 'AI & Machine Learning Engineering',
      description: 'Master artificial intelligence, machine learning algorithms, deep learning, and MLOps practices for production systems.',
      category: 'artificial-intelligence',
      difficulty: 'advanced' as const,
      duration: '16 weeks',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Docker', 'Kubernetes'],
      resources: ['res4', 'res5', 'res6'],
      progress: 23,
      enrolled: false,
      featured: true,
      completedResources: [],
      objectives: [
        'Understand ML algorithms deeply',
        'Build neural networks from scratch',
        'Deploy models to production',
        'Master MLOps workflows'
      ],
      prerequisites: ['Python programming', 'Statistics & Mathematics', 'Linear Algebra'],
      badge: '🤖'
    },
    {
      id: 'path-3',
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile applications using React Native, Flutter, and native development approaches.',
      category: 'mobile-development',
      difficulty: 'intermediate' as const,
      duration: '10 weeks',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      resources: ['res7', 'res8', 'res9'],
      progress: 0,
      enrolled: false,
      featured: true,
      completedResources: [],
      objectives: [
        'Master cross-platform development',
        'Build native mobile features',
        'Integrate with backend APIs',
        'Publish apps to app stores'
      ],
      prerequisites: ['JavaScript or Dart knowledge', 'Basic mobile design principles'],
      badge: '📱'
    },
    {
      id: 'path-4',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn security principles, ethical hacking, penetration testing, and how to protect digital assets.',
      category: 'cybersecurity',
      difficulty: 'beginner' as const,
      duration: '8 weeks',
      technologies: ['Kali Linux', 'Python', 'Wireshark', 'Metasploit', 'NMAP'],
      resources: ['res10', 'res11', 'res12'],
      progress: 78,
      enrolled: true,
      featured: false,
      completedResources: ['res10', 'res11'],
      objectives: [
        'Understand security fundamentals',
        'Learn ethical hacking techniques',
        'Master vulnerability assessment',
        'Implement security best practices'
      ],
      prerequisites: ['Basic networking knowledge', 'Command line familiarity'],
      badge: '🛡️'
    }
  ]

  // Initialize useState with mockPaths directly
  const [learningPaths] = useState(mockPaths)

  // Use useEffect only for dispatch (since it depends on external dispatch function)
  useEffect(() => {
    dispatch({ type: 'SET_LEARNING_PATHS', payload: mockPaths })
  }, [dispatch])

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
      intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
      expert: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colors[difficulty as keyof typeof colors] || colors.intermediate
  }

  const getCategoryGradient = (category: string) => {
    const gradients = {
      'web-development': 'from-blue-500 to-cyan-600',
      'artificial-intelligence': 'from-purple-500 to-pink-600',
      'mobile-development': 'from-green-500 to-emerald-600',
      'cybersecurity': 'from-red-500 to-orange-600',
      'data-science': 'from-indigo-500 to-purple-600',
      'devops': 'from-teal-500 to-cyan-600'
    }
    return gradients[category as keyof typeof gradients] || 'from-gray-500 to-gray-600'
  }

  const handleEnrollPath = (pathId: string) => {
    // Update enrollment status
    console.log('Enrolling in path:', pathId)
  }

  const handleContinuePath = (pathId: string) => {
    // Navigate to path progress
    console.log('Continuing path:', pathId)
  }

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Structured Learning <span className="text-gradient">Paths</span>
          </h2>
          <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 inline-block">
            <p className="text-xl text-gray-300">
              Carefully crafted learning journeys for different career tracks, designed for{' '}
              <span className="text-gradient font-bold">Jack026</span>
            </p>
          </div>
        </motion.div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {learningPaths.map((path, index) => {
            const categoryGradient = getCategoryGradient(path.category)
            
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.02 }}
                className={`group bg-glass backdrop-blur-xl border border-white/10 rounded-3xl p-10 relative overflow-hidden h-full flex flex-col ${
                  path.enrolled ? 'border-primary-500/30 bg-primary-500/5' : ''
                }`}
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${categoryGradient} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-8 transition-all duration-300`}>
                    {path.badge}
                  </div>
                  
                  <div className="flex gap-2">
                    {path.featured && (
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(path.difficulty)}`}>
                      {path.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <h4 className="text-2xl font-bold text-white mb-4 font-display group-hover:text-primary-400 transition-colors duration-300">
                    {path.title}
                  </h4>

                  <p className="text-gray-300 leading-relaxed mb-6 flex-1">
                    {path.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-glass-strong rounded-lg border border-white/10">
                      <Clock className="w-4 h-4 text-primary-500" />
                      <span className="text-gray-300 font-medium text-sm">{path.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-glass-strong rounded-lg border border-white/10">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-300 font-medium text-sm">{path.resources.length} Resources</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {path.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-glass-strong text-xs text-gray-400 rounded-md border border-white/10 hover:bg-primary-500 hover:text-white transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {path.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-glass-strong text-xs text-primary-400 rounded-md border border-white/10">
                        +{path.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Progress */}
                  {path.enrolled && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Your Progress</span>
                        <span>{path.progress}% Complete</span>
                      </div>
                      <div className="w-full bg-glass-strong rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full relative"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${path.progress}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Objectives Preview */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary-500" />
                      Learning Objectives
                    </h5>
                    <ul className="space-y-2">
                      {path.objectives.slice(0, 3).map((objective, objIndex) => (
                        <li key={objIndex} className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                      {path.objectives.length > 3 && (
                        <li className="text-sm text-primary-400 pl-4">
                          +{path.objectives.length - 3} more objectives
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    {path.enrolled ? (
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleContinuePath(path.id)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Continue Learning
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEnrollPath(path.id)}
                        className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        Enroll Now
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-glass-strong border border-white/10 text-gray-300 rounded-lg hover:bg-glass hover:text-white hover:border-primary-500 transition-all duration-300 flex items-center justify-center"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Custom Path CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-glass backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4 font-display">
              Create Your Custom Learning Path
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-width-2xl mx-auto">
              Can't find the perfect path? Let <span className="text-gradient font-bold">Jack026</span> create 
              a personalized learning journey based on your goals and interests.
            </p>
            
            <div className="flex justify-center gap-6 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center gap-2"
              >
                <Target className="w-5 h-5" />
                Create Custom Path
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-glass-strong border border-white/10 text-white py-4 px-8 rounded-xl font-semibold hover:bg-glass hover:border-primary-500 transition-all duration-300 flex items-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Browse All Paths
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LearningPaths
