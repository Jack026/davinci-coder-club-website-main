'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import ScrollToTop from '@/components/ScrollToTop'
import ContactFAQ from '@/components/contact/ContactFAQ'
import ContactHero from '@/components/contact/ContactHero'
import ContactOptions from '@/components/contact/ContactOptions'
import ContactSuccess from '@/components/contact/ContactSuccess'
import InteractiveMap from '@/components/contact/InteractiveMap'
import MainContactSection from '@/components/contact/MainContactSection'
import QuickContactCTA from '@/components/contact/QuickContactCTA'
import { ContactProvider } from '@/contexts/ContactContext'

export default function ContactClient(){
    return (
        <main className="min-h-screen bg-bg-primary">
        <ContactProvider>
            <Navigation />
            <ScrollToTop />
            <ContactHero />
            <ContactOptions />
            <MainContactSection />
            <InteractiveMap />
            <ContactFAQ />
            <QuickContactCTA />
            <ContactSuccess />
            <Footer />
        </ContactProvider>
        </main>
    )
}