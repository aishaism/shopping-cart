import React from 'react'
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Package, CreditCard } from 'lucide-react'
import type { CartItem, CartTotals, ShippingFormData } from '../types'
import { calculateItemTotal } from '../lib/cartCalculations'

interface PaymentSummaryProps {
  items: CartItem[]
  totals: CartTotals
  shipping: ShippingFormData
  onBack: () => void
  onPlaceOrder: () => void
  isSubmitting?: boolean
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  items,
  totals,
  shipping,
  onBack,
  onPlaceOrder,
  isSubmitting = false,
}) => {
  const { subtotal, tax, discount, finalTotal, discountApplied } = totals

  return (
    <div className="space-y-6">
      {/* Informational Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <p className="font-bold">Final Review Before Submission</p>
          <p className="text-emerald-700 mt-0.5">
            This step is read-only. No payment gateway integration is required. Review your items and delivery destination before placing your order.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Shipping Destination & Items Review */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Details Card */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
              <MapPin className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Shipping Destination
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Recipient Name</span>
                <p className="font-semibold text-gray-900 mt-0.5">{shipping.fullName}</p>
              </div>

              <div>
                <span className="text-xs text-gray-400 block font-medium">Contact Phone</span>
                <p className="font-medium text-gray-800 mt-0.5">{shipping.phone}</p>
              </div>

              <div>
                <span className="text-xs text-gray-400 block font-medium">Email Address</span>
                <p className="font-medium text-gray-800 mt-0.5">{shipping.email}</p>
              </div>

              <div>
                <span className="text-xs text-gray-400 block font-medium">Delivery Address</span>
                <p className="font-medium text-gray-800 mt-0.5">
                  {shipping.address}, {shipping.city}, {shipping.postalCode}
                </p>
              </div>
            </div>
          </section>

          {/* Items Read-Only List */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
              <Package className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Order Items ({items.length})
              </h4>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.product.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1 border border-gray-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${item.product.price.toFixed(2)} × {item.quantity} unit{item.quantity > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-bold text-gray-900 shrink-0">
                    ${calculateItemTotal(item.product.price, item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 1 Col: Payment Method info & Final Total */}
        <div className="space-y-6">
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Payment Method
              </h4>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600 mb-5">
              <p className="font-semibold text-gray-900">Demo Checkout / Cash on Delivery</p>
              <p className="mt-1 text-gray-500">
                Payment simulation active. No actual transaction or card required.
              </p>
            </div>

            {/* Calculations Breakdown */}
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-gray-900">${subtotal.toFixed(2)}</dd>
              </div>

              <div className="flex justify-between text-gray-600">
                <dt>Tax (5%)</dt>
                <dd className="font-semibold text-gray-900">${tax.toFixed(2)}</dd>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <dt>Discount (10% OFF)</dt>
                  <dd className="font-bold">-${discount.toFixed(2)}</dd>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                <dt className="text-base font-bold text-gray-900">Total Due</dt>
                <dd className="text-2xl font-black text-gray-900">
                  ${finalTotal.toFixed(2)}
                </dd>
              </div>
            </dl>

            {/* Place Order CTA */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onPlaceOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{isSubmitting ? 'Processing Order...' : 'Place Order'}</span>
              </button>
            </div>
          </section>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-2.5 px-4 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Edit Shipping Information
          </button>
        </div>
      </div>
    </div>
  )
}
