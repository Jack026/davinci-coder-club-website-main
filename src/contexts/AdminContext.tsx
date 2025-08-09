'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

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

  const openAdminPanel = useCallback(() => setIsAdminPanelOpen(true), [])
  const closeAdminPanel = useCallback(() => setIsAdminPanelOpen(false), [])
  const toggleAdminPanel = useCallback(() => {
    setIsAdminPanelOpen(prev => !prev)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = (event.key || '').toLowerCase()

      // Ctrl+S (Windows/Linux) or Cmd+S (macOS)
      if ((event.ctrlKey || event.metaKey) && key === 's') {
        event.preventDefault()
        toggleAdminPanel()
        return
      }

      // Escape closes if open
      if (key === 'escape') {
        setIsAdminPanelOpen(prev => (prev ? false : prev))
      }
    }

    // Attach to window so it fires even if focus is outside the document body
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleAdminPanel])

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