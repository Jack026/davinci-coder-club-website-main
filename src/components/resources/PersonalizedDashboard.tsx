'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BookOpen, Bookmark, Star, Clock, Target, Award, Zap, ChevronRight } from 'lucide-react'
import { useResources } from 'contexts/ResourcesContext'

const PersonalizedDashboard = () => {
  const { state, dispatch } = useResources()
  const { userProgress, personalizedRecommendations } = state

  // Mock user data and recommendations
  useEffect(() => {
    const mockRecommendations = [
      {
        id: 'rec-1',
        title: 'Advanced React Patterns',
        description: 'Master compound components, render props, and hooks patterns',
        category: 'tutorial' as const,
        type: 'interactive' as const,
        difficulty: 'advanced' as const,
        technologies: ['React', 'JavaScript', 'TypeScript'],
        tags: ['patterns', 'advanced', 'hooks'],
        url: '/resources/advanced-react-patterns',
        author: 'Kent C. Dodds',
        rating: 4.9,
        reviewCount: 1250,
        duration: '3 hours',
        featured: true,
        bookmark: false,
        completed: false,
        inProgress: false,
        createdAt: '2024-12-15',
        updatedAt: '2025-08-01',
        views: 15420,
        likes: 2840,
        objectives: [
          'Master compound component patterns',
          'Understand render props pattern',
          'Build custom hooks',
          'Implement context patterns'
        ],
        format: 'premium' as const
      },
      {
        id: 'rec-2',
        title: 'TypeScript Design Patterns',
        description: 'Learn common design patterns implemented in TypeScript',
        category: 'tutorial' as const,
        type: 'text' as const,
        difficulty: 'intermediate' as const,
        technologies: ['TypeScript', 'Design Patterns'],
        tags: ['typescript', 'patterns', 'oop'],
        url: '/resources/typescript-design-patterns',
        author: 'Basarat Ali Syed',
        rating: 4.7,
        reviewCount: 890,
        duration: '2.5 hours',
        featured: false,
        bookmark: true,
        completed: false,
        inProgress: true,
        createdAt: '2024-11-20',
        updatedAt: '2025-07-28',
        views: 8950,
        likes: 1560,
        objectives: [
          'Understand SOLID principles',
          'Implement common patterns',
          'Type-safe implementations',
          'Best practices'
        ],
        format: 'free' as const
      }
    ]

    dispatch({ type: 'SET_RECOMMENDATIONS', payload: mockRecommendations })
    dispatch({ type: 'UPDATE_USER_PROGRESS', payload: {
      completedResources: 47,
      bookmarkedResources: 23,
      currentStreak: 12,
      totalLearningHours: 156,
      skillLevel: 'Advanced Intermediate'
    }})
  }, [dispatch])

  const currentLearning = [
    {
      title: 'Next.js 14 Complete Guide',
      progress: 68,
      timeRemaining: '2.5 hours left'
    },
    {
      title: 'GraphQL with Apollo',
      progress: 34,
      timeRemaining: '4 hours left'
    },
    {
      title: 'Docker for Developers',
      progress: 89,
      timeRemaining: '30 mins left'
    }
  ]

  const recentBookmarks = [
    'Advanced JavaScript Concepts',
    'CSS Grid Layout Masterclass',
    'API Design Best Practices',
    'Performance Optimization Guide'
  ]

  const achievements = [
    { title: 'Fast Learner', description: 'Completed 10 resources in a week', icon: Zap },
    { title: 'Consistency King', description: '30-day learning streak', icon: Target },
    { title: 'Knowledge Sharer', description: 'Contributed 5 resources', icon: Award }
  ]

  return (
    <section className="py-20 bg-bg-secondary border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Your Learning <span className="text-gradient">Dashboard</span>
          </h2>
          <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 inline-block">
            <p className="text-xl text-gray-300">
              Welcome back, <span className="text-gradient font-bold animate-pulse">Jack026</span>! 
              Ready to continue your learning journey?
            </p>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Learning Streak */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-glass-strong transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Learning Streak</h3>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2 font-display">
                {userProgress.currentStreak}
              </div>
              <div className="text-sm text-gray-400">Days in a row</div>
              <div className="text-xs text-orange-400 mt-2">🔥 Keep it up!</div>
            </div>
          </motion.div>

          {/* Total Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-glass-strong transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Completed</h3>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2 font-display">
                {userProgress.completedResources}
              </div>
              <div className="text-sm text-gray-400">Resources finished</div>
              <div className="text-xs text-green-400 mt-2">💪 Great progress!</div>
            </div>
          </motion.div>

          {/* Bookmarks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-glass-strong transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Bookmark className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Bookmarks</h3>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2 font-display">
                {userProgress.bookmarkedResources}
              </div>
              <div className="text-sm text-gray-400">Saved for later</div>
              <div className="text-xs text-blue-400 mt-2">📚 Good collection!</div>
            </div>
          </motion.div>

          {/* Skill Level */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-glass-strong transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Level</h3>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-purple-500 mb-2 font-display leading-tight">
                {userProgress.skillLevel}
              </div>
              <div className="text-sm text-gray-400">Current level</div>
              <div className="text-xs text-purple-400 mt-2">🌟 Level up!</div>
            </div>
          </motion.div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Learning */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-display flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary-500" />
              Continue Learning
            </h3>

            <div className="space-y-6">
              {currentLearning.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-glass-strong rounded-lg border border-white/10 hover:bg-glass cursor-pointer transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                    <div className="w-full bg-glass-strong rounded-full h-2 mb-2">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{item.progress}% complete</span>
                      <span>{item.timeRemaining}</span>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300">
              View All Progress
            </button>
          </motion.div>

          {/* Recent Bookmarks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-display flex items-center gap-3">
              <Bookmark className="w-6 h-6 text-blue-500" />
              Recent Bookmarks
            </h3>

            <div className="space-y-4">
              {recentBookmarks.map((bookmark, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 bg-glass-strong rounded-lg border border-white/10 hover:bg-glass cursor-pointer transition-all duration-300"
                >
                  <Bookmark className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-300 hover:text-white transition-colors duration-200">
                    {bookmark}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-6 bg-glass-strong border border-white/10 text-gray-300 py-3 px-4 rounded-lg font-semibold hover:bg-glass hover:text-white hover:border-primary-500 transition-all duration-300">
              View All Bookmarks
            </button>
          </motion.div>

          {/* Personalized Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-display flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-500" />
              Recommended for You
            </h3>

            <div className="space-y-6">
              {personalizedRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="p-4 bg-glass-strong rounded-lg border border-white/10 hover:bg-glass cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">{rec.title}</h4>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {rec.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{rec.difficulty} • {rec.duration}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{rec.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300">
              Explore More Recommendations
            </button>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 font-display text-center">
            Recent Achievements 🏆
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-glass-strong rounded-xl border border-white/10 hover:bg-glass cursor-pointer transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{achievement.title}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PersonalizedDashboard
