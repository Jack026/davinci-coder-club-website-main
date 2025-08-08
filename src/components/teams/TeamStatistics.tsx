'use client'

import { useTeam } from 'contexts/TeamContext'
import { motion } from 'framer-motion'
import { Award, Calendar, Code, MapPin, Star, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'

const TeamStatistics = () => {
  const { state } = useTeam()
  const [activeChart, setActiveChart] = useState('department')

  // Calculate statistics from team data
  const calculateStats = () => {
    const { members } = state
    
    // Department distribution
    const departmentStats = members.reduce((acc, member) => {
      acc[member.department] = (acc[member.department] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Year distribution
    const yearStats = members.reduce((acc, member) => {
      acc[member.year] = (acc[member.year] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Skill distribution
    const skillStats = members.reduce((acc, member) => {
      member.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)

    // Growth timeline (mock data)
    const growthStats = [
      { period: '2022-Q1', members: 15 },
      { period: '2022-Q2', members: 32 },
      { period: '2022-Q3', members: 58 },
      { period: '2022-Q4', members: 89 },
      { period: '2023-Q1', members: 112 },
      { period: '2023-Q2', members: 135 },
      { period: '2023-Q3', members: 150 }
    ]

    return {
      departments: Object.entries(departmentStats).map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      years: Object.entries(yearStats).map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      skills: Object.entries(skillStats).map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      growth: growthStats
    }
  }

  const stats = calculateStats()

  const chartData = {
    department: stats.departments,
    year: stats.years,
    skills: stats.skills,
    growth: stats.growth
  }

  const getMaxValue = (data: any[]) => {
    return Math.max(...data.map(item => item.count || item.members))
  }

  const getBarWidth = (value: number, maxValue: number) => {
    return Math.max((value / maxValue) * 100, 5) // Minimum 5% width
  }

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Computer Science': 'from-blue-500 to-cyan-600',
      'Information Technology': 'from-green-500 to-emerald-600',
      'Electronics': 'from-purple-500 to-pink-600',
      'Mechanical': 'from-orange-500 to-red-600',
      'Civil': 'from-indigo-500 to-purple-600',
      'Design': 'from-pink-500 to-rose-600',
      'Management': 'from-teal-500 to-cyan-600'
    }
    return colors[department as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const overallStats = [
    {
      title: 'Total Members',
      value: state.members.length.toString(),
      icon: Users,
      gradient: 'from-blue-500 to-cyan-600',
      description: 'Active team members'
    },
    {
      title: 'Departments',
      value: stats.departments.length.toString(),
      icon: MapPin,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Different specializations'
    },
    {
      title: 'Total Projects',
      value: state.members.reduce((sum, member) => sum + (member.projects || 0), 0).toString(),
      icon: Code,
      gradient: 'from-purple-500 to-pink-600',
      description: 'Completed projects'
    },
    {
      title: 'Combined Contributions',
      value: state.members.reduce((sum, member) => sum + (member.contributions || 0), 0).toString(),
      icon: Award,
      gradient: 'from-orange-500 to-red-600',
      description: 'Code contributions'
    }
  ]

  if (state.loading) {
    return (
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 text-primary-500 text-lg">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Analyzing team statistics for Jack026...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-bg-secondary">
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
            Team <span className="text-gradient">Statistics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights into our diverse and talented community, analyzed specially for{' '}
            <span className="text-gradient font-bold">Jack026</span>
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {overallStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              
              <div className="text-3xl font-bold text-primary-500 mb-2 font-display">
                {stat.value}
              </div>
              
              <div className="text-white font-semibold text-sm mb-1 uppercase tracking-wider">
                {stat.title}
              </div>
              
              <div className="text-gray-400 text-xs">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-2 flex gap-2">
            {[
              { key: 'department', label: 'Departments', icon: MapPin },
              { key: 'year', label: 'Year Levels', icon: Calendar },
              { key: 'skills', label: 'Top Skills', icon: Star },
              { key: 'growth', label: 'Growth', icon: TrendingUp }
            ].map((chart) => (
              <motion.button
                key={chart.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveChart(chart.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeChart === chart.key
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-glass-strong'
                }`}
              >
                <chart.icon className="w-4 h-4" />
                {chart.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Charts */}
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          {activeChart === 'department' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 font-display">
                Department Distribution
              </h3>
              <div className="space-y-4">
                {chartData.department.map((dept, index) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-glass-strong rounded-lg hover:bg-glass transition-all duration-300"
                  >
                    <div className="w-16 text-sm font-semibold text-white">
                      {dept.name.split(' ')[0]}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-glass-strong rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getDepartmentColor(dept.name)} rounded-full relative`}
                          initial={{ width: 0 }}
                          animate={{ width: `${getBarWidth(dept.count, getMaxValue(chartData.department))}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                    <div className="text-primary-500 font-bold text-lg font-display min-w-[40px] text-right">
                      {dept.count}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeChart === 'year' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 font-display">
                Year Level Distribution
              </h3>
              <div className="space-y-4">
                {chartData.year.map((year, index) => (
                  <motion.div
                    key={year.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-glass-strong rounded-lg hover:bg-glass transition-all duration-300"
                  >
                    <div className="w-20 text-sm font-semibold text-white capitalize">
                      {year.name}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-glass-strong rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${getBarWidth(year.count, getMaxValue(chartData.year))}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                    <div className="text-green-500 font-bold text-lg font-display min-w-[40px] text-right">
                      {year.count}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeChart === 'skills' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 font-display">
                Most Popular Skills
              </h3>
              <div className="space-y-4">
                {chartData.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-glass-strong rounded-lg hover:bg-glass transition-all duration-300"
                  >
                    <div className="w-24 text-sm font-semibold text-white">
                      {skill.name}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-glass-strong rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${getBarWidth(skill.count, getMaxValue(chartData.skills))}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                    <div className="text-purple-500 font-bold text-lg font-display min-w-[40px] text-right">
                      {skill.count}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeChart === 'growth' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 font-display">
                Team Growth Timeline
              </h3>
              <div className="space-y-4">
                {chartData.growth.map((period, index) => (
                  <motion.div
                    key={period.period}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-glass-strong rounded-lg hover:bg-glass transition-all duration-300"
                  >
                    <div className="w-20 text-sm font-semibold text-white">
                      {period.period}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-glass-strong rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${getBarWidth(period.members, getMaxValue(chartData.growth))}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                    <div className="text-orange-500 font-bold text-lg font-display min-w-[40px] text-right">
                      {period.members}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Jack026 Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-glass backdrop-blur-xl border border-primary-500/30 bg-primary-500/5 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 font-display flex items-center justify-center gap-3">
              <span className="text-2xl animate-bounce">👑</span>
              Jack026's Leadership Impact
            </h3>
            <p className="text-primary-400">Your contribution to our team's success</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2 font-display">
                #1
              </div>
              <div className="text-gray-400 text-sm">Team Rank</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2 font-display">
                50+
              </div>
              <div className="text-gray-400 text-sm">Mentored</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2 font-display">
                15+
              </div>
              <div className="text-gray-400 text-sm">Projects Led</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2 font-display">
                100%
              </div>
              <div className="text-gray-400 text-sm">Dedication</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamStatistics
