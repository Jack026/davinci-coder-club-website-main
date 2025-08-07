import ResourcesClient from '@/components/resources/ResourcesClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Resources - Da-Vinci Coder Club | Your Gateway to Tech Mastery',
  description: 'Explore 500+ comprehensive tutorials, documentation, tools, and guides curated for Jack026. Accelerate your coding journey with interactive learning paths and expert resources.',
  keywords: 'coding resources, programming tutorials, developer tools, tech documentation, learning paths, Jack026, da-vinci coder club',
  openGraph: {
    title: 'Learning Resources - Gateway to Tech Mastery for Jack026',
    description: 'Discover 500+ curated resources designed to accelerate your coding journey at Da-Vinci Coder Club.',
    url: 'https://davincicoders.club/resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learning Resources - Tech Mastery Hub',
    description: 'Explore comprehensive learning resources curated for developers.',
  }
}

export default function ResourcesPage() {
  return <ResourcesClient/>
}
