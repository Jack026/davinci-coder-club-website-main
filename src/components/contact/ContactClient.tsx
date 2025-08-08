'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ContactHero from '@/components/contact/ContactHero'
import ContactOptions from '@/components/contact/ContactOptions'
import MainContactSection from '@/components/contact/MainContactSection'
import InteractiveMap from '@/components/contact/InteractiveMap'
import ContactFAQ from '@/components/contact/ContactFAQ'
import QuickContactCTA from '@/components/contact/QuickContactCTA'
import ContactSuccess from '@/components/contact/ContactSuccess'
import { ContactProvider } from 'contexts/ContactContext'

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