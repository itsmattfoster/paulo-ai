'use client'

import { useState } from 'react'
import { Globe, Youtube, Zap, Target, Sparkles, Play, ArrowRight, CheckCircle, Star, Users, Clock, Brain, FileText, Mail, MessageSquare, Video, Twitter, Linkedin, Github, ExternalLink } from 'lucide-react'
import { isValidUrl, normalizeUrl } from '@/lib/utils'
import Logo from './Logo'

interface LandingPageProps {
  onAnalyze: (websiteUrl: string, youtubeUrl: string) => void
  isLoading: boolean
}

export default function LandingPage({ onAnalyze, isLoading }: LandingPageProps) {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [errors, setErrors] = useState<{ website?: string; youtube?: string }>({})
  const [showDemo, setShowDemo] = useState(false)

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
      const normalizedWebsiteUrl = websiteUrl ? normalizeUrl(websiteUrl) : ''
      const normalizedYoutubeUrl = youtubeUrl ? normalizeUrl(youtubeUrl) : ''
      onAnalyze(normalizedWebsiteUrl, normalizedYoutubeUrl)
    }
  }

  return (
    <div className="min-h-screen bg-white">
        {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo size="md" />
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</button>
              <button className="px-4 py-2 paulo-gradient text-white rounded-lg hover:shadow-lg transition-all">
                Try Paulo AI
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Brand.<br />
              <span className="paulo-text-gradient">Automated.</span>
          </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The AI that learns your voice, your offers, and your story — so every piece of copy feels handcrafted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 paulo-gradient text-white text-lg font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
              >
                Try Paulo AI
              </button>
              <button 
                onClick={() => setShowDemo(!showDemo)}
                className="flex items-center space-x-2 px-8 py-4 border-2 border-gray-200 text-gray-900 text-lg font-semibold rounded-xl hover:border-gray-300 transition-all"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="text-sm text-gray-500 mb-8">
              Trusted by 500+ brands worldwide
            </div>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">Stripe</div>
              <div className="text-2xl font-bold text-gray-400">Notion</div>
              <div className="text-2xl font-bold text-gray-400">Vercel</div>
              <div className="text-2xl font-bold text-gray-400">Linear</div>
              <div className="text-2xl font-bold text-gray-400">Figma</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section id="demo-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              From analysis to on-brand output in 60 seconds
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how Paulo AI transforms your brand assets into intelligent, personalized content
            </p>
        </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Step 1: Input */}
            <div className="text-center">
              <div className="w-16 h-16 paulo-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Paste YouTube & Website</h3>
              <p className="text-gray-600">Simply paste your links and Paulo analyzes your brand voice, offers, and messaging</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex justify-center">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>

            {/* Step 2: Analysis */}
            <div className="text-center">
              <div className="w-16 h-16 paulo-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate Context Profile</h3>
              <p className="text-gray-600">AI extracts your unique tone, value props, and brand personality from your content</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex justify-center">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>

            {/* Step 3: Output */}
            <div className="text-center">
              <div className="w-16 h-16 paulo-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Chat Interface</h3>
              <p className="text-gray-600">Generate any type of content that sounds exactly like you in seconds</p>
            </div>
          </div>

          {/* Interactive Demo Form */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Try it yourself</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Globe className="w-4 h-4 mr-2 paulo-text-gradient" />
                Website URL
              </label>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="yourwebsite.com"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.website ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400'
                } focus:border-transparent outline-none transition-all`}
                disabled={isLoading}
              />
              {errors.website && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                  {errors.website}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Youtube className="w-4 h-4 mr-2 text-red-600" />
                YouTube Video URL
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="youtube.com/watch?v=..."
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.youtube ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400'
                } focus:border-transparent outline-none transition-all`}
                disabled={isLoading}
              />
              {errors.youtube && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                  {errors.youtube}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
                  className="w-full paulo-gradient text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                      Building your brand profile...
                </>
                  ) : (
                    <>
                      <Logo size="sm" showText={false} />
                      <span className="ml-2">Build My Brand Profile</span>
                    </>
                  )}
            </button>
          </form>
        </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your brand into an AI-powered content machine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 paulo-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 paulo-shadow">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl font-bold paulo-text-gradient mb-4">1</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Plug in your links</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Paulo builds your context profile by analyzing your website content and YouTube videos to understand your unique voice and messaging.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 paulo-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 paulo-shadow">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl font-bold paulo-text-gradient mb-4">2</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Select a mode</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Choose from specialized content modes: Ads, VSLs, Emails, Shortform, Longform, and more. Each optimized for your specific use case.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 paulo-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 paulo-shadow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl font-bold paulo-text-gradient mb-4">3</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get perfect copy</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Receive publish-ready content that sounds exactly like you. Every piece maintains your brand voice and messaging consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 paulo-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Paulo AI?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for modern content teams who need speed without sacrificing quality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 paulo-gradient rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Consistent messaging</h3>
              <p className="text-gray-600 leading-relaxed">
                Never sound off-brand again. Every piece of content maintains your unique voice and brand personality across all channels.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 paulo-gradient rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Faster creation</h3>
              <p className="text-gray-600 leading-relaxed">
                Go from idea to script in minutes, not hours. Generate high-quality content at scale while maintaining your brand standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 paulo-gradient rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Smarter insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Your content gets sharper over time. Paulo learns from your preferences and continuously improves your brand's content quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Modes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Content modes for every need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized AI modes optimized for different content types and marketing objectives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Ads', description: 'High-converting ad copy' },
              { icon: Video, title: 'VSLs', description: 'Video sales letters' },
              { icon: Mail, title: 'Emails', description: 'Email campaigns' },
              { icon: MessageSquare, title: 'Shortform', description: 'Social media content' },
              { icon: FileText, title: 'Longform', description: 'Blog posts & articles' },
              { icon: Users, title: 'Sales', description: 'Sales scripts & pitches' },
              { icon: Zap, title: 'Landing Pages', description: 'Conversion-focused copy' },
              { icon: Sparkles, title: 'Product Descriptions', description: 'E-commerce copy' }
            ].map((mode, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 paulo-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <mode.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{mode.title}</h3>
                <p className="text-gray-600 text-sm">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by content creators</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our users are saying about Paulo AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Paulo AI saved me 10+ hours a week writing. Finally an AI that gets my brand voice and creates content that actually converts.",
                author: "Sarah Chen",
                role: "Marketing Director",
                company: "TechStart"
              },
              {
                quote: "The quality of copy Paulo generates is incredible. It sounds exactly like me and my team, but creates it in seconds instead of hours.",
                author: "Marcus Rodriguez",
                role: "Founder",
                company: "GrowthCo"
              },
              {
                quote: "Finally an AI that understands context. Paulo doesn't just write generic content - it writes MY content, in MY voice.",
                author: "Emily Watson",
                role: "Content Manager",
                company: "BrandStudio"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 paulo-gradient rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Seamlessly fits into your workflow</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with the tools you already use and love
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[
              { name: 'YouTube', icon: Youtube, color: 'text-red-600' },
              { name: 'Notion', icon: FileText, color: 'text-gray-700' },
              { name: 'Google Docs', icon: FileText, color: 'text-blue-600' },
              { name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
              { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
              { name: 'GitHub', icon: Github, color: 'text-gray-800' }
            ].map((integration, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors">
                  <integration.icon className={`w-8 h-8 ${integration.color}`} />
                </div>
                <span className="text-sm text-gray-600 font-medium">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your content creation needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$29',
                period: '/month',
                description: 'Perfect for solo creators and small teams',
                features: [
                  '5 brand profiles',
                  '1,000 content generations',
                  'All content modes',
                  'Basic integrations',
                  'Email support'
                ],
                cta: 'Start Free Trial',
                popular: false
              },
              {
                name: 'Pro',
                price: '$99',
                period: '/month',
                description: 'Ideal for growing businesses and agencies',
                features: [
                  'Unlimited brand profiles',
                  '10,000 content generations',
                  'All content modes',
                  'Advanced integrations',
                  'Priority support',
                  'Team collaboration',
                  'Custom templates'
                ],
                cta: 'Start Free Trial',
                popular: true
              },
              {
                name: 'Teams',
                price: 'Custom',
                period: '',
                description: 'For large organizations with custom needs',
                features: [
                  'Everything in Pro',
                  'Unlimited generations',
                  'Custom AI training',
                  'Dedicated support',
                  'SSO integration',
                  'Custom integrations',
                  'Advanced analytics'
                ],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 relative ${plan.popular ? 'ring-2 ring-orange-500 paulo-shadow-lg' : 'shadow-lg'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.popular 
                    ? 'paulo-gradient text-white hover:shadow-lg' 
                    : 'border-2 border-gray-200 text-gray-900 hover:border-gray-300'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to automate your brand?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 500+ brands already using Paulo AI to create consistent, high-quality content at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 paulo-gradient text-white text-lg font-semibold rounded-xl hover:shadow-lg transition-all">
              Get Early Access
            </button>
            <button className="px-8 py-4 border-2 border-gray-200 text-gray-900 text-lg font-semibold rounded-xl hover:border-gray-300 transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <Logo size="lg" />
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                The AI that learns your voice, your offers, and your story — so every piece of copy feels handcrafted.
              </p>
              <div className="flex space-x-4">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <Github className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Integrations</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2025 Paulo AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}