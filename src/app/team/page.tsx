import TeamClient from '@/components/teams/TeamClient'
import { Metadata } from 'next'

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
  return <TeamClient/>
}
