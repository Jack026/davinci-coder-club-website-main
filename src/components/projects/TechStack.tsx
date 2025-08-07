'use client'

import { motion } from 'framer-motion'
import { Code, Database, Smartphone, Brain, Blocks, Gamepad2 } from 'lucide-react'

const TechStack = () => {
  const techCategories = [
    {
      title: 'Frontend',
      icon: Code,
      gradient: 'from-blue-500 to-cyan-600',
      technologies: ['React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'Next.js']
    },
    {
      title: 'Backend',
      icon: Database,
      gradient: 'from-green-500 to-emerald-600',
      technologies: ['Node.js', 'Python', 'Java', 'Express.js', 'Django', 'Spring Boot']
    },
    {
      title: 'Mobile',
      icon: Smartphone,
      gradient: 'from-purple-500 to-pink-600',
      technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Dart', 'Xamarin']
    },
    {
      title: 'AI/ML',
      icon: Brain,
      gradient: 'from-orange-500 to-red-600',
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy']
    },
    {
      title: 'Blockchain',
      icon: Blocks,
      gradient: 'from-yellow-500 to-orange-600',
      technologies: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'DApps', 'NFTs']
    },
    {
      title: 'Game Dev',
      icon: Gamepad2,
      gradient: 'from-indigo-500 to-purple-600',
      technologies: ['Unity', 'Unreal Engine', 'C#', 'C++', 'OpenGL', 'SDL']
    }
  ]

  const techStats = [
    { number: '50+', label: 'Technologies', icon: Code },
    { number: '100+', label: 'Projects Built', icon: Blocks },
    { number: '150+', label: 'Developers', icon: Brain },
    { number: '25K+', label: 'GitHub Stars', icon: Database }
  ]

  return (
    <section className="py-16 md:py-24 bg-bg-tertiary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-secondary-500/5" />
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
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
            Technologies We <span className="text-gradient">Master</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Our diverse and cutting-edge technology stack powering innovation across all domains
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-8 transition-all duration-300`}>
                  <category.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                  {category.title}
                </h3>
              </div>

              {/* Technologies List */}
              <div className="grid grid-cols-2 gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: techIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 p-2 bg-glass-light rounded-lg border border-white/5 hover:bg-glass-strong hover:border-primary-500/20 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                    <span className="text-sm text-gray-300 font-medium">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {techStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <motion.div 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-500 mb-2 font-display"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm md:text-base text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack
