'use client'

import { useState } from 'react'
import { Sparkles, Globe, Youtube } from 'lucide-react'
import { isValidUrl, normalizeUrl } from '@/lib/utils'

interface LandingPageProps {
  onAnalyze: (websiteUrl: string, youtubeUrl: string) => void
  isLoading: boolean
}

export default function LandingPage({ onAnalyze, isLoading }: LandingPageProps) {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [errors, setErrors] = useState<{ website?: string; youtube?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { website?: string; youtube?: string } = {}
    
    if (!websiteUrl && !youtubeUrl) {
      newErrors.website = 'Please provide at least one URL'
      newErrors.youtube = 'Please provide at least one URL'
    } else {
      if (websiteUrl && !isValidUrl(websiteUrl)) {
        newErrors.website = 'Please enter a valid URL'
      }
      if (youtubeUrl && !isValidUrl(youtubeUrl)) {
        newErrors.youtube = 'Please enter a valid YouTube URL'
      }
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      // Normalize URLs before passing them on
      const normalizedWebsiteUrl = websiteUrl ? normalizeUrl(websiteUrl) : ''
      const normalizedYoutubeUrl = youtubeUrl ? normalizeUrl(youtubeUrl) : ''
      onAnalyze(normalizedWebsiteUrl, normalizedYoutubeUrl)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Content AI
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your AI-Powered Content Creation Assistant
          </p>
          <p className="text-gray-500">
            Analyze your brand and create personalized content in seconds
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Website URL */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 mr-2 text-blue-500" />
                Website URL
              </label>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.website ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                disabled={isLoading}
              />
              {errors.website && (
                <p className="mt-1 text-sm text-red-600">{errors.website}</p>
              )}
            </div>

            {/* YouTube URL */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Youtube className="w-4 h-4 mr-2 text-red-500" />
                YouTube Channel or Video URL
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.youtube ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition`}
                disabled={isLoading}
              />
              {errors.youtube && (
                <p className="mt-1 text-sm text-red-600">{errors.youtube}</p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">💡 Tip:</span> Provide at least one URL. 
                The AI will analyze your content to understand your brand voice and create 
                personalized content.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Your Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze & Continue
                </>
              )}
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">AI-Powered</h3>
            <p className="text-sm text-gray-600">Advanced AI analyzes your brand</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Multiple Modes</h3>
            <p className="text-sm text-gray-600">Ads, VSLs, emails, and more</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Youtube className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Brand Voice</h3>
            <p className="text-sm text-gray-600">Content that matches your style</p>
          </div>
        </div>
      </div>
    </div>
  )
}

