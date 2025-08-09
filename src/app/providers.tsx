'use client'

import { ReactNode } from 'react'
import { AdminProvider } from '@/contexts/AdminContext'

export default function Providers({ children }: { children: ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>
}