// src/app/about/page.tsx (Server Component - NO 'use client')
import { Metadata } from 'next'
import AboutClient from '@/components/about/AboutClient'

export const metadata: Metadata = {
  title: 'About Us - Da-Vinci Coder Club | Where Art Meets Code',
  description: 'Learn about Da-Vinci Coder Club at Assam Downtown University. Discover our mission, vision, and journey of empowering 150+ students through innovative technology education.',
  keywords: 'about da-vinci coder club, ADTU coding community, student developers, technology education, innovation hub',
  openGraph: {
    title: 'About Da-Vinci Coder Club - Premier Coding Community at ADTU',
    description: 'Discover how Da-Vinci Coder Club is transforming tech education at Assam Downtown University with 150+ members and 75+ projects.',
    url: 'https://davincicoders.club/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Da-Vinci Coder Club',
    description: 'Where art meets code - Learn about our innovative approach to tech education at ADTU.',
  }
}

export default function AboutPage() {
  return <AboutClient />
}
