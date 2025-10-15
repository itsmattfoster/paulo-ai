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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 paulo-gradient rounded-2xl mb-4 shadow-xl shadow-orange-200 animate-pulse-slow">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#FF6B45' }}>
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
                  className={`flex items-center p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'border-orange-400 bg-gradient-to-r from-orange-50 to-red-50 shadow-md'
                      : isCompleted
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${
                      isActive
                        ? 'paulo-gradient shadow-orange-300'
                        : isCompleted
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-green-300'
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
                      className={`font-semibold ${
                        isActive || isCompleted
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {isActive && (
                    <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#FF6B45' }} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Current Progress Text */}
          {progress && (
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <p className="text-sm text-gray-700 text-center font-medium">{progress}</p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full paulo-gradient transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

