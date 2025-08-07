'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import TeamHero from '@/components/team/TeamHero'
import TeamFilters from '@/components/team/TeamFilters'
import MemberSpotlight from '@/components/team/MemberSpotlight'
import LeadershipTeam from '@/components/team/LeadershipTeam'
import CoreTeam from '@/components/team/CoreTeam'
import AllMembers from '@/components/team/AllMembers'
import TeamStatistics from '@/components/team/TeamStatistics'
import JoinTeamCTA from '@/components/team/JoinTeamCTA'
import MemberModal from '@/components/team/MemberModal'
import { TeamProvider } from '@/contexts/TeamContext'

export const metadata: Metadata = {
  title: 'Meet Our Team - Da-Vinci Coder Club | The Minds Behind the Magic',
  description: 'Meet our incredible team of 150+ passionate developers, creative designers, and innovative thinkers working together to build the future of technology at ADTU. Welcome Jack026!',
  keywords: 'team members, developers, Jack026, ADTU team, da-vinci coder club, student developers, tech team',
  openGraph: {
    title: 'Meet Our Team - Da-Vinci Coder Club | 150+ Innovators',
    description: 'Discover the passionate minds behind Da-Vinci Coder Club, featuring Jack026 and our incredible team of developers.',
    url: 'https://davincicoders.club/team',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Our Amazing Team - Da-Vinci Coder Club',
    description: 'Meet Jack026 and 150+ passionate developers building the future of technology.',
  }
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <TeamProvider>
        <Navigation />
        <TeamHero />
        <TeamFilters />
        <MemberSpotlight />
        <LeadershipTeam />
        <CoreTeam />
        <AllMembers />
        <TeamStatistics />
        <JoinTeamCTA />
        <MemberModal />
        <Footer />
        <ScrollToTop />
      </TeamProvider>
    </main>
  )
}
