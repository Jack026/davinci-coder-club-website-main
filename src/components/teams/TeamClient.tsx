'use client'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import ScrollToTop from '@/components/ScrollToTop'
import AllMembers from '@/components/teams/AllMembers'
import CoreTeam from '@/components/teams/CoreTeam'
import JoinTeamCTA from '@/components/teams/JoinTeamCTA'
import LeadershipTeam from '@/components/teams/LeadershipTeam'
import MemberModal from '@/components/teams/MemberModal'
import MemberSpotlight from '@/components/teams/MemberSpotlight'
import TeamHero from '@/components/teams/TeamHero'
import TeamStatistics from '@/components/teams/TeamStatistics'
import { TeamProvider } from '@/contexts/TeamContext'

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