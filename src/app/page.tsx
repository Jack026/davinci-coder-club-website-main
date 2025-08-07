'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FeaturesOverview from '@/components/FeaturesOverview'
import PreviewSection from '@/components/PreviewSection'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollToTop from '@/components/ScrollToTop'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      <Navigation />
      <Hero />
      <FeaturesOverview />
      <PreviewSection />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
