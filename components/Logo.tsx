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
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Orange gradient circle background */}
        <div className="w-full h-full paulo-gradient rounded-full flex items-center justify-center">
          {/* Pen stroke icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-3/4 h-3/4 text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Flowing signature stroke - cursive W */}
            <path
              d="M4 17C4 17 6 13 12 13C18 13 20 17 20 17"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Pen positioned diagonally above and to the right */}
            <path
              d="M17 9L20 6L23 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M20 6V3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pen tip detail */}
            <circle cx="20" cy="9" r="1.2" fill="currentColor" />
            {/* Pen body detail line */}
            <path
              d="M20 6L20 9"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      
      {/* Text */}
      {showText && (
        <span className={`font-semibold text-gray-900 ${textSizes[size]}`}>
          Paulo AI
        </span>
      )}
    </div>
  )
}
