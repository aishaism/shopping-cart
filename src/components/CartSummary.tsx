import React from 'react'
import { ArrowRight, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react'
import type { CartTotals } from '../types'
import { DISCOUNT_THRESHOLD } from '../lib/cartCalculations'

interface CartSummaryProps {
  totals: CartTotals
  onProceedToCheckout?: () => void
  isCheckoutStep?: boolean
  hideCheckoutButton?: boolean
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totals,
  onProceedToCheckout,
  isCheckoutStep = false,
  hideCheckoutButton = false,
}) => {
  const {
    itemCount,
    subtotal,
    tax,
    discount,
    finalTotal,
    discountApplied,
    isCheckoutEligible,
    minCheckoutRequired,
  } = totals

  const amountNeededForDiscount = Math.max(0, DISCOUNT_THRESHOLD - subtotal)

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs">
      <h3 className="text-base font-bold text-gray-900 pb-4 border-b border-gray-100 flex items-center justify-between">
        <span>Order Summary</span>
        <span className="text-xs font-normal text-gray-500">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </h3>

      {/* Discount Perk Banner / Progress */}
      {subtotal > 0 && (
        <div className="mt-4 mb-5">
          {discountApplied ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>10% Discount Unlocked!</strong> You saved <strong>${discount.toFixed(2)}</strong> on your order over ${DISCOUNT_THRESHOLD}.
              </span>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-xl p-3 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                Add <strong>${amountNeededForDiscount.toFixed(2)}</strong> more to unlock a <strong>10% discount</strong>!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Calculations Breakdown */}
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-gray-900">${subtotal.toFixed(2)}</dd>
        </div>

        <div className="flex justify-between text-gray-600">
          <dt className="flex items-center gap-1.5">
            <span>Estimated Tax</span>
            <span className="text-[11px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">5%</span>
          </dt>
          <dd className="font-semibold text-gray-900">${tax.toFixed(2)}</dd>
        </div>

        {discountApplied && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <dt className="flex items-center gap-1.5">
              <span>Discount</span>
              <span className="text-[11px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">10% OFF</span>
            </dt>
            <dd className="font-bold">-${discount.toFixed(2)}</dd>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
          <dt className="text-base font-bold text-gray-900">Final Total</dt>
          <dd className="text-2xl font-black text-gray-900 tracking-tight">
            ${finalTotal.toFixed(2)}
          </dd>
        </div>
      </dl>

      {/* Minimum Checkout Warning */}
      {!isCheckoutEligible && itemCount > 0 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Minimum Checkout Requirement</p>
            <p className="mt-0.5 text-amber-700">
              Orders must have a subtotal of at least <strong>${minCheckoutRequired.toFixed(2)}</strong>. Please add more items to reach the minimum threshold. Current: ${subtotal.toFixed(2)}.
            </p>
          </div>
        </div>
      )}

      {/* Checkout Action Button */}
      {!hideCheckoutButton && onProceedToCheckout && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onProceedToCheckout}
            disabled={!isCheckoutEligible}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isCheckoutEligible
                ? 'bg-gray-900 hover:bg-blue-600 text-white shadow-xs active:scale-98'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            <span>{isCheckoutStep ? 'Continue to Shipping' : 'Proceed to Checkout'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
