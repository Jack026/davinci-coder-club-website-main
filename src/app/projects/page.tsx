import ProjectsClient from '@/components/projects/ProjectsClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Da-Vinci Coder Club | Innovation in Action',
  description: 'Discover cutting-edge projects created by Jack026 and our talented members at ADTU. From AI-powered solutions to revolutionary web applications.',
  keywords: 'Jack026 projects, Da-Vinci Coder Club projects, ADTU student projects, innovative coding projects',
  openGraph: {
    title: 'Projects - Da-Vinci Coder Club | Innovation Showcase',
    description: 'Explore amazing projects built by Jack026 and 150+ developers at ADTU',
    url: 'https://davincicoders.club/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Da-Vinci Coder Club Projects',
    description: 'Innovation in Action - Discover our amazing projects',
  }
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
