import React from 'react'
import { CheckCircle2, PackageCheck, ShoppingBag, ArrowRight } from 'lucide-react'
import type { OrderDetails } from '../types'

interface OrderSuccessModalProps {
  order: OrderDetails
  onContinueShopping: () => void
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onContinueShopping,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-sm my-6 text-center">
      {/* Success Badge */}
      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 ring-8 ring-emerald-50/50">
        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
        Order Confirmed
      </span>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
        Thank You For Your Order!
      </h2>

      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
        Your order has been placed successfully and your cart has been reset. We’ve sent a confirmation email to{' '}
        <strong className="text-gray-800">{order.shipping.email}</strong>.
      </p>

      {/* Order Meta Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 my-6 text-left space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-2">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Order Number</span>
            <span className="text-sm font-bold text-gray-900 font-mono">
              {order.orderId}
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 block font-medium">Order Date</span>
            <span className="text-sm font-medium text-gray-700">{order.date}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 block font-medium">Payment Total</span>
            <span className="text-base font-extrabold text-gray-900">
              ${order.totals.finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="text-xs sm:text-sm text-gray-600">
          <span className="font-semibold text-gray-900 block mb-1">Delivering to:</span>
          <p>{order.shipping.fullName}</p>
          <p>{order.shipping.address}, {order.shipping.city}, {order.shipping.postalCode}</p>
          <p className="text-gray-500 mt-0.5">Phone: {order.shipping.phone}</p>
        </div>

        {/* Items Summary preview */}
        <div className="pt-3 border-t border-gray-200">
          <span className="text-xs font-semibold text-gray-900 block mb-2">
            Items Ordered ({order.items.length}):
          </span>
          <ul className="text-xs text-gray-600 space-y-1.5 max-h-36 overflow-y-auto pr-2">
            {order.items.map((item) => (
              <li key={item.product.id} className="flex justify-between items-center">
                <span className="truncate max-w-[70%]">
                  • {item.product.title} <strong className="text-gray-800">× {item.quantity}</strong>
                </span>
                <span className="font-semibold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onContinueShopping}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-xs transition-all cursor-pointer active:scale-98"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Continue Shopping</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>

      <div className="mt-4 text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
        <PackageCheck className="w-3.5 h-3.5" />
        <span>Cart state cleared from local storage & Zustand memory.</span>
      </div>
    </div>
  )
}
