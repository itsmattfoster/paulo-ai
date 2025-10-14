import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ContextProfile {
  websiteUrl: string
  youtubeUrl: string
  websiteContent: string
  youtubeTranscripts: string
  analyzedAt: string
  summary: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export type ContentMode = 
  | 'general'
  | 'ads'
  | 'vsl'
  | 'emails'
  | 'webinar'
  | 'shortform'
  | 'longform'
  | 'social'

interface AppState {
  // Context Profile
  contextProfile: ContextProfile | null
  setContextProfile: (profile: ContextProfile) => void
  
  // Analysis State
  isAnalyzing: boolean
  setIsAnalyzing: (status: boolean) => void
  analysisProgress: string
  setAnalysisProgress: (progress: string) => void
  
  // Chat State
  messages: Message[]
  addMessage: (message: Message) => void
  clearMessages: () => void
  
  // Content Mode
  currentMode: ContentMode
  setCurrentMode: (mode: ContentMode) => void
  
  // Loading States
  isGenerating: boolean
  setIsGenerating: (status: boolean) => void
  
  // Reset
  reset: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Context Profile
      contextProfile: null,
      setContextProfile: (profile) => set({ contextProfile: profile }),
      
      // Analysis State
      isAnalyzing: false,
      setIsAnalyzing: (status) => set({ isAnalyzing: status }),
      analysisProgress: '',
      setAnalysisProgress: (progress) => set({ analysisProgress: progress }),
      
      // Chat State
      messages: [],
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      clearMessages: () => set({ messages: [] }),
      
      // Content Mode
      currentMode: 'general',
      setCurrentMode: (mode) => set({ currentMode: mode }),
      
      // Loading States
      isGenerating: false,
      setIsGenerating: (status) => set({ isGenerating: status }),
      
      // Reset
      reset: () => set({
        contextProfile: null,
        messages: [],
        currentMode: 'general',
        isAnalyzing: false,
        analysisProgress: '',
        isGenerating: false,
      }),
    }),
    {
      name: 'content-ai-storage',
      partialize: (state) => ({
        contextProfile: state.contextProfile,
        messages: state.messages,
        currentMode: state.currentMode,
      }),
    }
  )
)

