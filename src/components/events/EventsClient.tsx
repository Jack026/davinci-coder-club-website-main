// src/app/events/EventsClient.tsx (Client Component)
'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import ScrollToTop from '@/components/ScrollToTop'
import EventCalendar from '@/components/events/EventCalendar'
import EventsGrid from '@/components/events/EventsGrid'
import EventsHero from '@/components/events/EventsHero'
import FeaturedEvents from '@/components/events/FeaturedEvents'
import NewsletterSignup from '@/components/events/NewsletterSignup'
import { EventsProvider } from '@/contexts/EventsContext'

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
