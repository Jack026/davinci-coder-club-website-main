'use client'

import { useResources } from '@/contexts/ResourcesContext'
import { motion } from 'framer-motion'
import { Award, Bookmark, Clock, ExternalLink, Eye, Play, Star, Users } from 'lucide-react'
import { useEffect } from 'react'

const FeaturedResources = () => {
  const { state, dispatch } = useResources()

  // Mock featured resources data
  useEffect(() => {
    const mockResources = [
      {
        id: 'feat-1',
        title: 'Complete Web Development Bootcamp 2025',
        description: 'The only course you need to become a full-stack web developer. Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.',
        category: 'tutorial' as const,
        type: 'video' as const,
        difficulty: 'intermediate' as const,
        technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        tags: ['fullstack', 'bootcamp', 'portfolio', 'job-ready'],
        url: '/resources/web-dev-bootcamp-2025',
        imageUrl: '/api/placeholder/400/250',
        author: 'Angela Yu',
        rating: 4.9,
        reviewCount: 3250,
        duration: '65 hours',
        featured: true,
        bookmark: false,
        completed: false,
        inProgress: false,
        createdAt: '2024-01-01',
        updatedAt: '2025-08-01',
        views: 125000,
        likes: 8900,
        objectives: [
          'Build a complete e-commerce website',
          'Master React and Node.js',
          'Deploy applications to production',
          'Create professional portfolio'
        ],
        format: 'premium' as const
      },
      {
        id: 'feat-2',
        title: 'AI/ML Engineering Masterclass',
        description: 'Master machine learning engineering from basics to advanced deployment. Build real-world AI applications with Python, TensorFlow, and cloud platforms.',
        category: 'tutorial' as const,
        type: 'interactive' as const,
        difficulty: 'advanced' as const,
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Docker'],
        tags: ['ai', 'machine-learning', 'deep-learning', 'mlops'],
        url: '/resources/ai-ml-masterclass',
        imageUrl: '/api/placeholder/400/250',
        author: 'Andrew Ng',
        rating: 4.8,
        reviewCount: 2100,
        duration: '42 hours',
        featured: true,
        bookmark: true,
        completed: false,
        inProgress: true,
        createdAt: '2024-02-15',
        updatedAt: '2025-07-28',
        views: 89000,
        likes: 6750,
        objectives: [
          'Understand ML algorithms deeply',
          'Build neural networks from scratch',
          'Deploy models to production',
          'Master MLOps practices'
        ],
        format: 'premium' as const
      },
      {
        id: 'feat-3',
        title: 'Modern React with TypeScript',
        description: 'Learn React 18 with TypeScript, including hooks, context, testing, and performance optimization. Build scalable applications with best practices.',
        category: 'tutorial' as const,
        type: 'code' as const,
        difficulty: 'intermediate' as const,
        technologies: ['React', 'TypeScript', 'Jest', 'React Query', 'Zustand'],
        tags: ['react', 'typescript', 'hooks', 'testing', 'performance'],
        url: '/resources/react-typescript-2025',
        imageUrl: '/api/placeholder/400/250',
        author: 'Kent C. Dodds',
        rating: 4.9,
        reviewCount: 1890,
        duration: '28 hours',
        featured: true,
        bookmark: false,
        completed: true,
        inProgress: false,
        createdAt: '2024-03-10',
        updatedAt: '2025-08-02',
        views: 67000,
        likes: 5200,
        objectives: [
          'Master React 18 features',
          'Write type-safe components',
          'Test React applications',
          'Optimize performance'
        ],
        format: 'free' as const
      }
    ]

    dispatch({ type: 'SET_RESOURCES', payload: mockResources })
    dispatch({ type: 'SET_LOADING', payload: false })
  }, [dispatch])

  const featuredResources = state.resources.filter(resource => resource.featured)

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
      intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
      expert: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colors[difficulty as keyof typeof colors] || colors.intermediate
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      video: Play,
      interactive: Users,
      text: ExternalLink,
      code: ExternalLink,
      quiz: Award,
      project: ExternalLink
    }
    return icons[type as keyof typeof icons] || ExternalLink
  }

  const handleBookmark = (resourceId: string) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: resourceId })
  }

  const handleMarkComplete = (resourceId: string) => {
    dispatch({ type: 'MARK_COMPLETED', payload: resourceId })
  }

  const handleStartLearning = (resourceId: string) => {
    dispatch({ type: 'MARK_IN_PROGRESS', payload: resourceId })
  }

  if (state.loading) {
    return (
      <section className="py-20 bg-bg-tertiary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Loading featured resources...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-bg-tertiary">
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
            Featured <span className="text-gradient">Resources</span>
          </h2>
          <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 inline-block">
            <p className="text-xl text-gray-300">
              Handpicked content for accelerated learning, curated specifically for{' '}
              <span className="text-gradient font-bold">Jack026</span>
            </p>
          </div>
        </motion.div>

        {/* Featured Resources Grid */}
        {featuredResources.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.type)

              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className={`group bg-glass backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden relative cursor-pointer h-full flex flex-col ${
                    resource.bookmark ? 'border-yellow-500/30 bg-yellow-500/5' : ''
                  } ${
                    resource.completed ? 'border-green-500/30 bg-green-500/5' : ''
                  } ${
                    resource.inProgress ? 'border-blue-500/30 bg-blue-500/5' : ''
                  }`}
                >
                  {/* Status Badges */}
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    {resource.featured && (
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    {resource.format === 'premium' && (
                      <span className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Resource Header - Placeholder for image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="text-6xl opacity-80">
                      📚
                    </div>
                  </div>

                  {/* Resource Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category and Difficulty */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="w-4 h-4 text-primary-500" />
                        <span className="text-primary-400 font-medium text-sm capitalize">
                          {resource.type}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3 flex-1">
                      {resource.description}
                    </p>

                    {/* Author and Rating */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="text-gray-400">by {resource.author}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-400 font-medium">{resource.rating}</span>
                        <span className="text-gray-500">({formatNumber(resource.reviewCount)})</span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-glass-strong text-xs text-gray-400 rounded-md border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {resource.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-glass-strong text-xs text-primary-400 rounded-md border border-white/10">
                          +{resource.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Resource Stats */}
                    <div className="flex justify-between items-center mb-6 p-3 bg-glass-strong rounded-lg border border-white/10">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {resource.duration}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Eye className="w-3 h-3" />
                        {formatNumber(resource.views)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Users className="w-3 h-3" />
                        {formatNumber(resource.likes)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      {resource.completed ? (
                        <div className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold text-center flex items-center justify-center gap-2">
                          <Award className="w-4 h-4" />
                          Completed
                        </div>
                      ) : resource.inProgress ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMarkComplete(resource.id)}
                          className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Continue
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStartLearning(resource.id)}
                          className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Start Learning
                        </motion.button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBookmark(resource.id)}
                        className={`px-4 py-3 rounded-lg border transition-all duration-300 flex items-center justify-center ${
                          resource.bookmark
                            ? 'bg-yellow-500 border-yellow-500 text-white'
                            : 'bg-glass-strong border-white/10 text-gray-400 hover:bg-glass hover:text-white hover:border-primary-500'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">⭐</div>
            <h3 className="text-2xl font-bold text-white mb-3">No Featured Resources</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Check back soon for amazing featured resources curated just for you!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedResources
