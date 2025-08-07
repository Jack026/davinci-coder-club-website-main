// src/app/events/page.tsx (Server Component - NO 'use client')
import { Metadata } from 'next'
import EventsClient from '@/components/events/EventsClient'

export const metadata: Metadata = {
  title: 'Events - Da-Vinci Coder Club | Innovation Adventures Await',
  description: 'Discover cutting-edge workshops, thrilling hackathons, inspiring competitions, and transformative tech talks with 150+ fellow innovators at ADTU.',
  keywords: 'coding events, hackathons, tech workshops, ADTU events, programming competitions, da-vinci coder club',
  openGraph: {
    title: 'Events - Da-Vinci Coder Club | Join Our Innovation Adventures',
    description: 'Participate in workshops, hackathons, and tech talks with 150+ developers at ADTU.',
    url: 'https://davincicoders.club/events',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Da-Vinci Coder Club Events',
    description: 'Join our workshops, hackathons, and tech talks at ADTU.',
  }
}

export default function EventsPage() {
  return <EventsClient />
}
