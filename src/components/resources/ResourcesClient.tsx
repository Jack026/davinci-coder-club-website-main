'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ResourcesHero from '@/components/resources/ResourcesHero'
import ResourceCategories from '@/components/resources/ResourceCategories'
import PersonalizedDashboard from '@/components/resources/PersonalizedDashboard'
import FeaturedResources from '@/components/resources/FeaturedResources'
import AllResources from '@/components/resources/AllResources'
import LearningPaths from '@/components/resources/LearningPaths'
import ResourceContribution from '@/components/resources/ResourceContribution'
import { ResourcesProvider } from 'contexts/ResourcesContext'

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