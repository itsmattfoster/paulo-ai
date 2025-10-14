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
  { id: 'general', label: 'General', icon: MessageSquare, color: 'blue' },
  { id: 'ads', label: 'Ads', icon: Megaphone, color: 'red' },
  { id: 'vsl', label: 'VSL', icon: Video, color: 'purple' },
  { id: 'emails', label: 'Emails', icon: Mail, color: 'green' },
  { id: 'webinar', label: 'Webinar', icon: Users, color: 'indigo' },
  { id: 'shortform', label: 'Short-form', icon: Zap, color: 'yellow' },
  { id: 'longform', label: 'Long-form', icon: FileText, color: 'orange' },
  { id: 'social', label: 'Social', icon: Share2, color: 'pink' },
] as const

export default function ModeSelector() {
  const { currentMode, setCurrentMode } = useStore()

  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode) => {
        const Icon = mode.icon
        const isActive = currentMode === mode.id
        
        return (
          <button
            key={mode.id}
            onClick={() => setCurrentMode(mode.id as ContentMode)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive
                ? `bg-${mode.color}-500 text-white shadow-lg scale-105`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={
              isActive
                ? {
                    backgroundColor: `var(--${mode.color}-500, #3B82F6)`,
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

