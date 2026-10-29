import React from 'react'
import { Check, ShoppingCart, Truck, CreditCard } from 'lucide-react'
import type { CheckoutStep } from '../types'

interface CheckoutStepsProps {
  currentStep: CheckoutStep
  onStepClick?: (step: CheckoutStep) => void
  canGoToStep?: (step: CheckoutStep) => boolean
}

const STEPS = [
  { step: 1 as CheckoutStep, label: 'Cart Review', icon: ShoppingCart },
  { step: 2 as CheckoutStep, label: 'Shipping Address', icon: Truck },
  { step: 3 as CheckoutStep, label: 'Payment Summary', icon: CreditCard },
]

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  currentStep,
  onStepClick,
  canGoToStep,
}) => {
  return (
    <nav aria-label="Checkout Progress" className="mb-8">
      <ol className="flex items-center justify-between max-w-2xl mx-auto relative">
        {/* Connecting progress line */}
        <div className="absolute left-6 right-6 top-5 -translate-y-1/2 h-0.5 bg-gray-200 z-0" />
        <div
          className="absolute left-6 top-5 -translate-y-1/2 h-0.5 bg-blue-600 transition-all duration-300 z-0"
          style={{
            width:
              currentStep === 1
                ? '0%'
                : currentStep === 2
                ? '50%'
                : 'calc(100% - 3rem)',
          }}
        />

        {STEPS.map(({ step, label, icon: Icon }) => {
          const isCompleted = currentStep > step
          const isCurrent = currentStep === step
          const isClickable = Boolean(onStepClick && canGoToStep && canGoToStep(step))

          return (
            <li key={step} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                disabled={!isClickable && !isCurrent}
                onClick={() => isClickable && onStepClick && onStepClick(step)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  isCompleted
                    ? 'bg-blue-600 text-white shadow-xs cursor-pointer'
                    : isCurrent
                    ? 'bg-gray-900 text-white ring-4 ring-blue-100 shadow-xs'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                } ${isClickable ? 'cursor-pointer hover:scale-105' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </button>

              <span
                className={`mt-2 text-xs font-semibold whitespace-nowrap ${
                  isCurrent
                    ? 'text-gray-900'
                    : isCompleted
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
