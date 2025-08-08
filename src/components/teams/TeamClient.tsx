'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import TeamHero from '@/components/teams/TeamHero'
import MemberSpotlight from '@/components/teams/MemberSpotlight'
import LeadershipTeam from '@/components/teams/LeadershipTeam'
import CoreTeam from '@/components/teams/CoreTeam'
import AllMembers from '@/components/teams/AllMembers'
import TeamStatistics from '@/components/teams/TeamStatistics'
import JoinTeamCTA from '@/components/teams/JoinTeamCTA'
import MemberModal from '@/components/teams/MemberModal'
import { TeamProvider } from 'contexts/TeamContext'

export default function TeamClient() {
  return (
    <main className= "min-h-screen bg-bg-primary">
    <TeamProvider>
      <Navigation />
      <ScrollToTop />
      <TeamHero />
      <MemberSpotlight />
      <LeadershipTeam />
      <CoreTeam />
      <AllMembers />
      <TeamStatistics />
      <JoinTeamCTA />
      <MemberModal />
      <Footer />
    </TeamProvider>
    </main>
  )
}