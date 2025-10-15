'use client'

import { Message } from '@/store/useStore'
import { User, Loader2 } from 'lucide-react'
import Logo from './Logo'

interface MessageListProps {
  messages: Message[]
  isStreaming: boolean
}

export default function MessageList({ messages, isStreaming }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <div className="mb-6">
          <Logo size="xl" showText={false} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#FF6B45' }}>
          Ready to Create Amazing Content
        </h2>
        <p className="text-gray-600 max-w-md">
          I've analyzed your brand. Ask me to create ads, VSLs, emails, scripts, or any content you need!
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div className="p-4 bg-white rounded-xl border border-orange-200 text-left hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer">
            <p className="text-sm text-gray-700 font-medium">
              "Create a Facebook ad for my latest product"
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-orange-200 text-left hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer">
            <p className="text-sm text-gray-700 font-medium">
              "Write a VSL script for my webinar"
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-orange-200 text-left hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer">
            <p className="text-sm text-gray-700 font-medium">
              "Generate an email sequence for new subscribers"
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-orange-200 text-left hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer">
            <p className="text-sm text-gray-700 font-medium">
              "Create a short-form script for TikTok"
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start space-x-3 ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0">
              <Logo size="sm" showText={false} />
            </div>
          )}
          
          <div
            className={`max-w-3xl px-5 py-3.5 rounded-2xl shadow-sm ${
              message.role === 'user'
                ? 'paulo-gradient text-white shadow-orange-200'
                : 'bg-white border border-orange-100 text-gray-900'
            }`}
          >
            <div className="whitespace-pre-wrap break-words">
              {message.content || (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
            </div>
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      ))}
      
      {isStreaming && messages[messages.length - 1]?.role === 'assistant' && (
        <div className="flex items-center space-x-2 text-gray-500 text-sm ml-12">
          <Loader2 className="w-3 h-3 animate-spin" style={{ color: '#FF6B45' }} />
          <span>Generating content...</span>
        </div>
      )}
    </div>
  )
}

