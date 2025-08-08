'use client'

import { useResources } from 'contexts/ResourcesContext'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Crown, Download, FileText, Newspaper, TrendingUp, Trophy, Wrench, Zap } from 'lucide-react'

const ResourceCategories = () => {
  const { dispatch } = useResources()

  const categories = [
    {
      id: 'tutorial',
      title: 'Interactive Tutorials',
      description: 'Step-by-step guides with hands-on exercises and video walkthroughs for immersive learning.',
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-500/10 to-cyan-600/5',
      count: 180,
      progress: 65,
      features: ['Video Walkthrough', 'Code Examples', 'Practice Exercises', 'Quizzes'],
      trending: true
    },
    {
      id: 'documentation',
      title: 'Documentation Hub',
      description: 'Comprehensive docs, API references, and technical specifications for all frameworks.',
      icon: FileText,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-600/5',
      count: 120,
      progress: 45,
      features: ['API Reference', 'Code Samples', 'Best Practices', 'Migration Guides'],
      trending: false
    },
    {
      id: 'tool',
      title: 'Developer Tools',
      description: 'Essential development tools, utilities, and productivity enhancers to streamline workflow.',
      icon: Wrench,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-500/10 to-pink-600/5',
      count: 85,
      progress: 80,
      features: ['VS Code Extensions', 'CLI Tools', 'Online Utilities', 'Productivity Apps'],
      trending: true
    },
    {
      id: 'challenge',
      title: 'Coding Challenges',
      description: 'Practice problems, contests, and skill-building exercises to sharpen programming abilities.',
      icon: Trophy,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/10 to-red-600/5',
      count: 95,
      progress: 30,
      features: ['Algorithm Practice', 'Data Structures', 'System Design', 'Interview Prep'],
      trending: false
    },
    {
      id: 'download',
      title: 'Resource Downloads',
      description: 'Templates, boilerplates, assets, and downloadable resources to kickstart projects.',
      icon: Download,
      gradient: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-500/10 to-purple-600/5',
      count: 65,
      progress: 55,
      features: ['Project Templates', 'UI Components', 'Design Assets', 'Code Snippets'],
      trending: false
    },
    {
      id: 'article',
      title: 'Tech Articles & Blogs',
      description: 'In-depth articles, tech insights, and industry best practices from leading developers.',
      icon: Newspaper,
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-500/10 to-cyan-600/5',
      count: 150,
      progress: 40,
      features: ['Industry Insights', 'Tech Trends', 'Career Advice', 'Case Studies'],
      trending: true
    }
  ]

  const handleCategoryClick = (categoryId: string) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: { category: categoryId } })
    const resourcesSection = document.querySelector('.all-resources')
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="py-16 md:py-20 bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/3" />
        
        {/* Floating Elements */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl opacity-10 pointer-events-none"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              x: [-10, 20, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          >
            {['📚', '🛠️', '🏆', '📱', '💻', '🚀'][i]}
          </motion.div>
        ))}
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
          <div className="inline-flex items-center gap-3 bg-glass backdrop-blur-xl border border-primary-500/30 bg-primary-500/5 rounded-full px-6 py-3 mb-6">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span className="text-primary-400 font-semibold">Curated by Jack026</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Organized Learning{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover resources tailored to your learning style and skill level, organized for maximum efficiency
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleCategoryClick(category.id)}
              className="group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer h-full transition-all duration-300 hover:bg-glass-strong hover:border-primary-500/30"
            >
              {/* Card Header */}
              <div className={`relative p-6 bg-gradient-to-br ${category.bgGradient}`}>
                {/* Trending Badge */}
                {category.trending && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  </div>
                )}

                {/* Progress Ring */}
                <div className="absolute top-4 left-4">
                  <div className="relative w-8 h-8">
                    <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                      <circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <motion.circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        className="text-primary-500"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: category.progress / 100 }}
                        transition={{ duration: 2, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        strokeDasharray="75.4"
                        strokeDashoffset={75.4 * (1 - category.progress / 100)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary-500">
                        {category.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category Icon */}
                <div className="flex justify-center mt-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-display group-hover:text-primary-400 transition-colors duration-300">
                  {category.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary-500" />
                    <span className="text-primary-400 font-semibold">
                      {category.count} Resources
                    </span>
                  </div>
                  <div className="text-gray-400">
                    {category.progress}% Complete
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {category.features.slice(0, 4).map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-xs text-gray-400 bg-glass-light px-2 py-1 rounded-md border border-white/5"
                    >
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-glass-light rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${category.gradient} rounded-full relative`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.progress}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-8"
                        animate={{ x: [-32, 200] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Explore Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-primary-500 hover:text-primary-400 font-semibold text-sm transition-colors duration-300 w-full justify-center py-2 bg-primary-500/10 rounded-lg hover:bg-primary-500/20 border border-primary-500/20"
                >
                  <span>Explore Category</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16"
        >
          <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/3 to-accent-500/5" />
            
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center font-display flex items-center justify-center gap-3">
                <Crown className="w-6 h-6 text-yellow-500" />
                Your Learning Dashboard
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { value: '695', label: 'Total Resources', color: 'text-green-500', icon: '📚' },
                  { value: '52%', label: 'Avg Progress', color: 'text-blue-500', icon: '📊' },
                  { value: '6', label: 'Categories', color: 'text-purple-500', icon: '🎯' },
                  { value: '24/7', label: 'Access', color: 'text-orange-500', icon: '⚡' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-glass-light rounded-xl border border-white/5 hover:bg-glass-strong transition-all duration-300"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <motion.div 
                      className={`text-2xl md:text-3xl font-bold mb-2 font-display ${stat.color}`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Jack026 Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-6 text-center p-4 bg-glass-strong rounded-xl border border-primary-500/20"
              >
                <p className="text-gray-300 text-sm">
                  "Every resource here is carefully curated to accelerate your learning journey" -{' '}
                  <span className="text-primary-400 font-semibold">Jack026</span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ResourceCategories
