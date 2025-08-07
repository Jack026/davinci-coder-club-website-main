'use client'

import { useEffect, useState } from 'react'
import { Code } from 'lucide-react'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [tipIndex, setTipIndex] = useState(0)

  const tips = [
    "💡 Did you know? Our club has 150+ active members!",
    "🚀 We host 25+ events every semester",
    "🏆 Our members have won 10+ hackathons",
    "🔥 Join our community and start building amazing projects!"
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(tipInterval)
    }
  }, [tips.length])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-bg-primary to-bg-secondary z-50 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-md mx-auto px-8 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-primary-500 text-5xl animate-pulse">
            <Code />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient">Da-Vinci</h1>
            <p className="text-lg text-gray-400">Coder Club</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-bg-secondary rounded-full h-2 mb-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300 relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-300 text-lg font-medium mb-6">
          {progress < 100 ? 'Initializing Innovation...' : 'Welcome to the Future!'}
        </p>

        {/* Tips */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-gray-400 text-sm mb-2 transition-all duration-500">
            {tips[tipIndex]}
          </p>
          <p className="text-xs font-mono text-gray-500">
            Built by Sourav.js • {new Date().toISOString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
