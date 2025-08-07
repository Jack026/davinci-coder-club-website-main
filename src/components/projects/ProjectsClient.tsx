'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ProjectsHero from '@/components/projects/ProjectsHero'
import FeaturedProjects from '@/components/projects/FeaturedProjects'
import AllProjects from '@/components/projects/AllProjects'
import TechStack from '@/components/projects/TechStack'
import ContributionCTA from '@/components/projects/ContributionCTA'

export default function ProjectsClient() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navigation />
      <ProjectsHero />
      <FeaturedProjects />
      <AllProjects />
      <TechStack />
      <ContributionCTA />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
