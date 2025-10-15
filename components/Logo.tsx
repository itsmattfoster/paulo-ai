'use client'

import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icon - Using centralized brand logo SVG */}
      <div className={`${sizeClasses[size]} relative`}>
        <img
          src="/brand/paulo-logo.svg"
          alt="Paulo AI Logo"
          className="w-full h-full"
        />
      </div>
      
      {/* Text */}
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizes[size]}`}>
          Paulo AI
        </span>
      )}
    </div>
  )
}
