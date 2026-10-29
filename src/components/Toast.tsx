import React from 'react'
import { CheckCircle2, ShoppingCart, X } from 'lucide-react'

interface ToastProps {
  message: string
  visible: boolean
  onClose: () => void
  onViewCart?: () => void
}

export const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  onClose,
  onViewCart,
}) => {
  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-800 max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-xs sm:text-sm font-medium leading-snug truncate flex-1">
          {message}
        </span>
        {onViewCart && (
          <button
            type="button"
            onClick={onViewCart}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-2 shrink-0 cursor-pointer flex items-center gap-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Cart
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
