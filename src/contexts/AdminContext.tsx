'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AdminContextType {
  isAdminPanelOpen: boolean
  openAdminPanel: () => void
  closeAdminPanel: () => void
  toggleAdminPanel: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

interface AdminProviderProps {
  children: ReactNode
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)

  const openAdminPanel = () => setIsAdminPanelOpen(true)
  const closeAdminPanel = () => setIsAdminPanelOpen(false)
  const toggleAdminPanel = () => setIsAdminPanelOpen(!isAdminPanelOpen)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+S or Cmd+S to toggle admin panel
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        toggleAdminPanel()
      }
      
      // Close with Escape key
      if (event.key === 'Escape' && isAdminPanelOpen) {
        closeAdminPanel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isAdminPanelOpen])

  const value = {
    isAdminPanelOpen,
    openAdminPanel,
    closeAdminPanel,
    toggleAdminPanel
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}