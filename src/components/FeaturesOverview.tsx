'use client'

import { motion } from 'framer-motion'
import { Code, Users, Trophy, Zap, Lightbulb, Rocket } from 'lucide-react'

const FeaturesOverview = () => {
  const features = [
    {
      icon: Code,
      title: 'Cutting-edge Technology',
      description: 'Master the latest frameworks and tools used by industry leaders.',
      highlights: ['Next.js & React', 'AI/ML Integration', 'Cloud Computing', 'DevOps Practices']
    },
    {
      icon: Users,
      title: 'Collaborative Community',
      description: 'Work alongside 150+ passionate developers and innovators.',
      highlights: ['Peer Learning', 'Team Projects', 'Mentorship', 'Knowledge Sharing']
    },
    {
      icon: Trophy,
      title: 'Competition Ready',
      description: 'Participate in hackathons, coding contests, and tech challenges.',
      highlights: ['Hackathons', 'Coding Contests', 'Tech Talks', 'Industry Events']
    },
    {
      icon: Zap,
      title: 'Rapid Skill Development',
      description: 'Fast-track your learning with hands-on projects and workshops.',
      highlights: ['Weekly Workshops', 'Live Coding', 'Project Building', 'Skill Assessment']
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Turn your creative ideas into real-world applications.',
      highlights: ['Idea Incubation', 'Prototype Development', 'Innovation Lab', 'Research Projects']
    },
    {
      icon: Rocket,
      title: 'Career Acceleration',
      description: 'Build a strong portfolio and network for your tech career.',
      highlights: ['Portfolio Building', 'Industry Connections', 'Internship Opportunities', 'Job Placement']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-bg-primary to-bg-secondary relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gradient font-display">
            Why Choose Da-Vinci?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Experience the perfect blend of innovation, community, and hands-on learning 
            that sets our club apart from traditional coding communities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-glass-strong hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-5 transition-all duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <ul className="space-y-3">
                  {feature.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-success-500 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesOverview
