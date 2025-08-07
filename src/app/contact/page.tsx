'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ContactHero from '@/components/contact/ContactHero'
import ContactOptions from '@/components/contact/ContactOptions'
import MainContactSection from '@/components/contact/MainContactSection'
import InteractiveMap from '@/components/contact/InteractiveMap'
import ContactFAQ from '@/components/contact/ContactFAQ'
import QuickContactCTA from '@/components/contact/QuickContactCTA'
import LiveChatWidget from '@/components/contact/LiveChatWidget'
import ContactSuccess from '@/components/contact/ContactSuccess'
import { ContactProvider } from '@/contexts/ContactContext'

export const metadata: Metadata = {
  title: 'Contact Us - Da-Vinci Coder Club | Connect with Jack026 & Our Team',
  description: 'Get in touch with Jack026 and the Da-Vinci Coder Club team. Fast response times, multiple contact methods, and 24/7 support for urgent matters at ADTU.',
  keywords: 'contact Jack026, da-vinci coder club contact, ADTU contact, technical support, join club, partnerships',
  openGraph: {
    title: 'Contact Jack026 & Da-Vinci Coder Club - Multiple Ways to Connect',
    description: 'Reach out to Jack026 and our amazing team. Fast responses, technical support, and collaboration opportunities.',
    url: 'https://davincicoders.club/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Da-Vinci Coder Club - Connect with Jack026',
    description: 'Multiple ways to reach Jack026 and our team for support, collaborations, and joining our community.',
  }
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <ContactProvider>
        <Navigation />
        <ContactHero />
        <ContactOptions />
        <MainContactSection />
        <InteractiveMap />
        <ContactFAQ />
        <QuickContactCTA />
        <LiveChatWidget />
        <ContactSuccess />
        <Footer />
        <ScrollToTop />
      </ContactProvider>
    </main>
  )
}
