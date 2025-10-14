'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, RotateCcw } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { generateId } from '@/lib/utils'
import ModeSelector from './ModeSelector'
import MessageList from './MessageList'

export default function ChatInterface() {
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    addMessage,
    clearMessages,
    currentMode,
    contextProfile,
    isGenerating,
    setIsGenerating,
  } = useStore()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [input])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const userMessage = {
      id: generateId(),
      role: 'user' as const,
      content: input.trim(),
      timestamp: Date.now(),
    }

    addMessage(userMessage)
    setInput('')
    setIsGenerating(true)
    setIsStreaming(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          mode: currentMode,
          contextProfile,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      const assistantMessage = {
        id: generateId(),
        role: 'assistant' as const,
        content: '',
        timestamp: Date.now(),
      }

      addMessage(assistantMessage)

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') {
              break
            }
            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                assistantContent += parsed.content
                // Update the last message
                const currentMessages = useStore.getState().messages
                const lastMessage = currentMessages[currentMessages.length - 1]
                if (lastMessage && lastMessage.role === 'assistant') {
                  lastMessage.content = assistantContent
                  useStore.setState({ messages: [...currentMessages] })
                }
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      addMessage({
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      })
    } finally {
      setIsGenerating(false)
      setIsStreaming(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to clear the conversation?')) {
      clearMessages()
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Content AI</h1>
                <p className="text-sm text-gray-500">AI-powered content creation</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
          <ModeSelector />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <MessageList messages={messages} isStreaming={isStreaming} />
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Shift+Enter for new line)"
                className="w-full px-4 py-3 bg-transparent outline-none resize-none max-h-32"
                rows={1}
                disabled={isGenerating}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

