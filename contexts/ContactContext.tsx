'use client'

import { createContext, ReactNode, useContext, useReducer } from 'react'

export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  category: string
  message: string
  urgency: 'low' | 'normal' | 'high' | 'urgent'
  subscribe: boolean
  terms: boolean
}

export interface ContactMethod {
  id: string
  type: 'email' | 'phone' | 'whatsapp' | 'discord' | 'in-person'
  label: string
  value: string
  status: 'online' | 'offline' | 'busy'
  responseTime: string
  availability: string
  icon: string
}

export interface LiveChat {
  isOpen: boolean
  messages: ChatMessage[]
  isTyping: boolean
  unreadCount: number
}

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'support'
  timestamp: Date
  type: 'text' | 'system'
}

interface ContactState {
  form: ContactForm
  isSubmitting: boolean
  showSuccess: boolean
  contactMethods: ContactMethod[]
  liveChat: LiveChat
  userStatus: {
    isJack026: boolean
    lastSeen: string
    preferredContact: string
  }
  notifications: ContactNotification[]
}

export interface ContactNotification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  timestamp: Date
  autoClose: boolean
}

type ContactAction = 
  | { type: 'UPDATE_FORM'; payload: Partial<ContactForm> }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SHOW_SUCCESS'; payload: boolean }
  | { type: 'RESET_FORM' }
  | { type: 'TOGGLE_CHAT' }
  | { type: 'ADD_MESSAGE'; payload: Omit<ChatMessage, 'id' | 'timestamp'> }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'UPDATE_CONTACT_STATUS'; payload: { id: string; status: ContactMethod['status'] } }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<ContactNotification, 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  category: '',
  message: '',
  urgency: 'normal',
  subscribe: false,
  terms: false
}

const initialState: ContactState = {
  form: initialForm,
  isSubmitting: false,
  showSuccess: false,
  contactMethods: [
    {
      id: 'Jack026-direct',
      type: 'email',
      label: 'Jack026 Direct',
      value: 'Jack026@davincicoders.adtu.ac.in',
      status: 'online',
      responseTime: '2 minutes',
      availability: 'Mon-Fri 9AM-6PM',
      icon: '👨‍💻'
    },
    {
      id: 'emergency-hotline',
      type: 'phone',
      label: 'Emergency Hotline',
      value: '+91 76543 21098',
      status: 'online',
      responseTime: 'Immediate',
      availability: '24/7',
      icon: '🚨'
    },
    {
      id: 'whatsapp-support',
      type: 'whatsapp',
      label: 'WhatsApp Support',
      value: '+91 98765 43210',
      status: 'online',
      responseTime: '5 minutes',
      availability: 'Daily 8AM-10PM',
      icon: '💬'
    },
    {
      id: 'discord-community',
      type: 'discord',
      label: 'Discord Community',
      value: 'DaVinci Coder Club#1234',
      status: 'online',
      responseTime: 'Real-time',
      availability: '24/7',
      icon: '💬'
    }
  ],
  liveChat: {
    isOpen: false,
    messages: [],
    isTyping: false,
    unreadCount: 0
  },
  userStatus: {
    isJack026: true, // This would be determined by auth
    lastSeen: 'Active now',
    preferredContact: 'email'
  },
  notifications: []
}

const ContactContext = createContext<{
  state: ContactState
  dispatch: React.Dispatch<ContactAction>
} | null>(null)

function contactReducer(state: ContactState, action: ContactAction): ContactState {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        form: { ...state.form, ...action.payload }
      }
    
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload }
    
    case 'SHOW_SUCCESS':
      return { ...state, showSuccess: action.payload }
    
    case 'RESET_FORM':
      return { ...state, form: initialForm }
    
    case 'TOGGLE_CHAT':
      return {
        ...state,
        liveChat: {
          ...state.liveChat,
          isOpen: !state.liveChat.isOpen,
          unreadCount: state.liveChat.isOpen ? state.liveChat.unreadCount : 0
        }
      }
    
    case 'ADD_MESSAGE':
      const newMessage: ChatMessage = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date()
      }
      return {
        ...state,
        liveChat: {
          ...state.liveChat,
          messages: [...state.liveChat.messages, newMessage],
          unreadCount: action.payload.sender === 'support' && !state.liveChat.isOpen 
            ? state.liveChat.unreadCount + 1 
            : state.liveChat.unreadCount
        }
      }
    
    case 'SET_TYPING':
      return {
        ...state,
        liveChat: { ...state.liveChat, isTyping: action.payload }
      }
    
    case 'UPDATE_CONTACT_STATUS':
      return {
        ...state,
        contactMethods: state.contactMethods.map(method =>
          method.id === action.payload.id
            ? { ...method, status: action.payload.status }
            : method
        )
      }
    
    case 'ADD_NOTIFICATION':
      const notification: ContactNotification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date()
      }
      return {
        ...state,
        notifications: [...state.notifications, notification]
      }
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    
    default:
      return state
  }
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(contactReducer, initialState)

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  const context = useContext(ContactContext)
  if (!context) {
    throw new Error('useContact must be used within ContactProvider')
  }
  return context
}
