'use client'

import { useAdmin } from '@/contexts/AdminContext'
import AdminPanel from './AdminPanel'

const AdminPanelWrapper = () => {
  const { isAdminPanelOpen, closeAdminPanel } = useAdmin()

  return (
    <AdminPanel 
      isOpen={isAdminPanelOpen} 
      onClose={closeAdminPanel} 
    />
  )
}

export default AdminPanelWrapper