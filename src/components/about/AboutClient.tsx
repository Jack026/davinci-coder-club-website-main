// src/app/about/AboutClient.tsx (Client Component)
'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import AboutHero from '@/components/about/AboutHero'
import MissionVision from '@/components/about/MissionVision'
import StoryTimeline from '@/components/about/StoryTimline'
import WhatWeDo from '@/components/about/WhatWeDo'
import OurValues from '@/components/about/OurValues'
import FacultyAdvisors from '@/components/about/FacultyAdvisors'
import Statistics from '@/components/about/Statistics'
import JoinCTA from '@/components/about/JoinCTA'

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navigation />
      <AboutHero />
      <MissionVision />
      <StoryTimeline />
      <WhatWeDo />
      <OurValues />
      <FacultyAdvisors />
      <Statistics />
      <JoinCTA />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
