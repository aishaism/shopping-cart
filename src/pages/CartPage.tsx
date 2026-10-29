import React from 'react'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { CartItemRow } from '../components/CartItem'
import { CartSummary } from '../components/CartSummary'
import { getCartTotals } from '../lib/cartCalculations'
import type { PageView } from '../types'

interface CartPageProps {
  onNavigate: (page: PageView) => void
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const totals = getCartTotals(items)

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-16 text-center max-w-lg mx-auto shadow-2xs my-8">
        <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
          Looks like you haven't added any products to your shopping cart yet. Browse our catalog and discover great essentials.
        </p>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Product Catalog</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review your selected items ({totals.itemCount} item{totals.itemCount > 1 ? 's' : ''})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Cart
          </button>
        </div>
      </div>

      {/* Main Grid: Items List + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Cart Item Rows */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}

          <div className="pt-4 flex justify-between items-center text-xs text-gray-500">
            <span>• Minimum quantity is 1. Maximum limit is 5 units per product.</span>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-blue-600 hover:underline font-medium"
            >
              Add more items +
            </button>
          </div>
        </div>

        {/* Right 1 Col: Order Summary & Checkout CTA */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          <CartSummary
            totals={totals}
            onProceedToCheckout={() => onNavigate('checkout')}
          />

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-500 space-y-2">
            <p className="font-semibold text-gray-700">Checkout Policy Notice:</p>
            <p>
              • <strong>$10.00 Minimum:</strong> Orders below $10.00 cannot proceed to checkout.
            </p>
            <p>
              • <strong>10% Discount:</strong> Automatically applied to orders with subtotal above $100.00.
            </p>
            <p>
              • <strong>5% Tax:</strong> Calculated transparently on subtotal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
