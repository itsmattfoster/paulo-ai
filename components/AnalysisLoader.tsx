'use client'

import { useEffect, useState } from 'react'
import { Loader2, CheckCircle2, Brain, Globe, Youtube } from 'lucide-react'

interface AnalysisLoaderProps {
  progress: string
}

const steps = [
  { id: 'website', label: 'Analyzing website', icon: Globe },
  { id: 'youtube', label: 'Processing YouTube content', icon: Youtube },
  { id: 'context', label: 'Building context profile', icon: Brain },
]

export default function AnalysisLoader({ progress }: AnalysisLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (progress.includes('website')) setCurrentStep(0)
    else if (progress.includes('youtube') || progress.includes('YouTube')) setCurrentStep(1)
    else if (progress.includes('context') || progress.includes('profile')) setCurrentStep(2)
  }, [progress])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 animate-pulse-slow">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Analyzing Your Content
            </h2>
            <p className="text-gray-600">
              This usually takes about a minute...
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep

              return (
                <div
                  key={step.id}
                  className={`flex items-center p-4 rounded-lg border transition-all duration-300 ${
                    isActive
                      ? 'border-blue-500 bg-blue-50'
                      : isCompleted
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-blue-500'
                        : isCompleted
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <Icon
                        className={`w-6 h-6 text-white ${
                          isActive ? 'animate-pulse' : ''
                        }`}
                      />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <p
                      className={`font-medium ${
                        isActive || isCompleted
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {isActive && (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Current Progress Text */}
          {progress && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 text-center">{progress}</p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

