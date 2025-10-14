'use client'

import { Message } from '@/store/useStore'
import { User, Bot, Loader2 } from 'lucide-react'

interface MessageListProps {
  messages: Message[]
  isStreaming: boolean
}

export default function MessageList({ messages, isStreaming }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Create Amazing Content
        </h2>
        <p className="text-gray-600 max-w-md">
          I've analyzed your brand. Ask me to create ads, VSLs, emails, scripts, or any content you need!
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div className="p-4 bg-white rounded-lg border border-gray-200 text-left">
            <p className="text-sm text-gray-700">
              "Create a Facebook ad for my latest product"
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200 text-left">
            <p className="text-sm text-gray-700">
              "Write a VSL script for my webinar"
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200 text-left">
            <p className="text-sm text-gray-700">
              "Generate an email sequence for new subscribers"
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200 text-left">
            <p className="text-sm text-gray-700">
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
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
          )}
          
          <div
            className={`max-w-3xl px-4 py-3 rounded-2xl ${
              message.role === 'user'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-white border border-gray-200 text-gray-900'
            }`}
          >
            <div className="whitespace-pre-wrap break-words">
              {message.content || (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
            </div>
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-gray-700" />
            </div>
          )}
        </div>
      ))}
      
      {isStreaming && messages[messages.length - 1]?.role === 'assistant' && (
        <div className="flex items-center space-x-2 text-gray-500 text-sm ml-11">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Generating...</span>
        </div>
      )}
    </div>
  )
}

