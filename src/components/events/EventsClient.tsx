// src/app/events/EventsClient.tsx (Client Component)
'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import EventsHero from '@/components/events/EventsHero'
import FeaturedEvents from '@/components/events/FeaturedEvents'
import EventsGrid from '@/components/events/EventsGrid'
import EventCalendar from '@/components/events/EventCalendar'
import NewsletterSignup from '@/components/events/NewsletterSignup'
import { EventsProvider } from 'contexts/EventsContext'

export default function EventsClient() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <EventsProvider>
        <Navigation />
        <EventsHero />
        <FeaturedEvents />
        <EventsGrid />
        <EventCalendar />
        <NewsletterSignup />
        <Footer />
        <ScrollToTop />
      </EventsProvider>
    </main>
  )
}
