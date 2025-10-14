'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/store/useStore'
import LandingPage from '@/components/LandingPage'
import AnalysisLoader from '@/components/AnalysisLoader'
import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  const {
    contextProfile,
    setContextProfile,
    isAnalyzing,
    setIsAnalyzing,
    analysisProgress,
    setAnalysisProgress,
  } = useStore()

  const [currentView, setCurrentView] = useState<'landing' | 'analyzing' | 'chat'>('landing')

  useEffect(() => {
    // Check if we already have a context profile
    if (contextProfile) {
      setCurrentView('chat')
    }
  }, [contextProfile])

  const handleAnalyze = async (websiteUrl: string, youtubeUrl: string) => {
    setIsAnalyzing(true)
    setCurrentView('analyzing')
    
    try {
      let websiteContent = ''
      let youtubeTranscript = ''
      const errors: string[] = []

      // Analyze website
      if (websiteUrl) {
        setAnalysisProgress('Analyzing website content...')
        try {
          const websiteResponse = await fetch('/api/analyze/website', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: websiteUrl }),
          })

          if (websiteResponse.ok) {
            const data = await websiteResponse.json()
            websiteContent = data.content
            console.log('Website content extracted successfully')
          } else {
            const error = await websiteResponse.json()
            console.error('Website analysis error:', error)
            errors.push(`Website: ${error.error || 'Failed to analyze website'}`)
          }
        } catch (error) {
          console.error('Website fetch error:', error)
          errors.push('Website: Network error or failed to fetch')
        }
      }

      // Analyze YouTube
      if (youtubeUrl) {
        setAnalysisProgress('Processing YouTube content...')
        try {
          const youtubeResponse = await fetch('/api/analyze/youtube', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: youtubeUrl }),
          })

          if (youtubeResponse.ok) {
            const data = await youtubeResponse.json()
            youtubeTranscript = data.transcript
            console.log('YouTube transcript extracted successfully')
          } else {
            const error = await youtubeResponse.json()
            console.error('YouTube analysis error:', error)
            errors.push(`YouTube: ${error.error || 'Failed to analyze YouTube content'}`)
          }
        } catch (error) {
          console.error('YouTube fetch error:', error)
          errors.push('YouTube: Network error or failed to fetch')
        }
      }

      // Generate context profile
      if (websiteContent || youtubeTranscript) {
        setAnalysisProgress('Building your context profile...')
        try {
          const contextResponse = await fetch('/api/analyze/context', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              websiteContent,
              youtubeTranscript,
            }),
          })

          if (contextResponse.ok) {
            const data = await contextResponse.json()
            
            if (!data.summary) {
              throw new Error('Context profile summary is empty')
            }
            
            const profile = {
              websiteUrl,
              youtubeUrl,
              websiteContent,
              youtubeTranscripts: youtubeTranscript,
              analyzedAt: new Date().toISOString(),
              summary: data.summary,
            }
            setContextProfile(profile)
            setAnalysisProgress('Analysis complete!')
            
            // Show any partial errors but still continue
            if (errors.length > 0) {
              console.warn('Some content could not be analyzed:', errors.join('; '))
            }
            
            // Wait a moment then switch to chat
            setTimeout(() => {
              setCurrentView('chat')
              setIsAnalyzing(false)
            }, 1000)
          } else {
            const error = await contextResponse.json()
            console.error('Context generation failed:', error)
            throw new Error(error.error || 'Failed to generate context profile')
          }
        } catch (error) {
          console.error('Context generation error:', error)
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          alert(`Failed to generate context profile: ${errorMessage}\n\nPlease ensure you have set your OPENAI_API_KEY environment variable and try again.`)
          setIsAnalyzing(false)
          setCurrentView('landing')
        }
      } else {
        const errorMessage = errors.length > 0 
          ? `Could not analyze any content:\n${errors.join('\n')}\n\nPlease check your URLs and try again.`
          : 'Could not analyze any content. Please check your URLs and try again.'
        alert(errorMessage)
        setIsAnalyzing(false)
        setCurrentView('landing')
      }
    } catch (error) {
      console.error('Analysis error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`An error occurred during analysis: ${errorMessage}`)
      setIsAnalyzing(false)
      setCurrentView('landing')
    }
  }

  if (currentView === 'landing') {
    return <LandingPage onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
  }

  if (currentView === 'analyzing') {
    return <AnalysisLoader progress={analysisProgress} />
  }

  return <ChatInterface />
}

