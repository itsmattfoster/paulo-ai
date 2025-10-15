'use client'

import { useStore, ContentMode } from '@/store/useStore'
import { 
  MessageSquare, 
  Megaphone, 
  Video, 
  Mail, 
  Users, 
  Zap, 
  FileText,
  Share2 
} from 'lucide-react'

const modes = [
  { id: 'general', label: 'General', icon: MessageSquare, color: '#FF6B45' },
  { id: 'ads', label: 'Ads', icon: Megaphone, color: '#FF5935' },
  { id: 'vsl', label: 'VSL', icon: Video, color: '#FF8C6B' },
  { id: 'emails', label: 'Emails', icon: Mail, color: '#10B981' },
  { id: 'webinar', label: 'Webinar', icon: Users, color: '#8B5CF6' },
  { id: 'shortform', label: 'Short-form', icon: Zap, color: '#F59E0B' },
  { id: 'longform', label: 'Long-form', icon: FileText, color: '#EF4444' },
  { id: 'social', label: 'Social', icon: Share2, color: '#EC4899' },
] as const

export default function ModeSelector() {
  const { currentMode, setCurrentMode } = useStore()

  return (
    <div className="flex flex-wrap gap-2.5">
      {modes.map((mode) => {
        const Icon = mode.icon
        const isActive = currentMode === mode.id
        
        return (
          <button
            key={mode.id}
            onClick={() => setCurrentMode(mode.id as ContentMode)}
            className={`flex items-center px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
              isActive
                ? 'text-white shadow-lg shadow-orange-200 scale-105'
                : 'bg-orange-50 text-gray-700 hover:bg-orange-100 border border-orange-200 hover:border-orange-300'
            }`}
            style={
              isActive
                ? {
                    backgroundColor: mode.color,
                    color: 'white',
                  }
                : {}
            }
          >
            <Icon className="w-4 h-4 mr-2" />
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}

