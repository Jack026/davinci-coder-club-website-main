'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import ScrollToTop from '@/components/ScrollToTop'
import AllResources from '@/components/resources/AllResources'
import FeaturedResources from '@/components/resources/FeaturedResources'
import LearningPaths from '@/components/resources/LearningPaths'
import PersonalizedDashboard from '@/components/resources/PersonalizedDashboard'
import ResourceCategories from '@/components/resources/ResourceCategories'
import ResourceContribution from '@/components/resources/ResourceContribution'
import ResourcesHero from '@/components/resources/ResourcesHero'
import { ResourcesProvider } from '@/contexts/ResourcesContext'

export default function ResourceClient(){
return (
<main className="min-h-screen bg-bg-primary">
<ResourcesProvider>
  <Navigation />
  <ResourcesHero />
  <ResourceCategories />
  <PersonalizedDashboard />
  <FeaturedResources />
  <AllResources />
  <LearningPaths />
  <ResourceContribution />
  <Footer />
  <ScrollToTop />
</ResourcesProvider>
</main>
)
}