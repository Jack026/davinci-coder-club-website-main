'use client'

import { useRouter } from 'next/navigation'
import AdminPanel from '@/components/admin/AdminPanel'


export default function AdminPage() {
  const router = useRouter()
  return (
    <AdminPanel
      isOpen={true}
      onClose={() => {
        // Close the admin panel by navigating back
        if (typeof window !== 'undefined' && window.history.length > 1) {
          router.back()
        } else {
          router.push('/')
        }
      }}
    />
  )
}