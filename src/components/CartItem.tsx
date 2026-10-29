import React, { useState } from 'react'
import { Plus, Minus, Trash2 } from 'lucide-react'
import type { CartItem as CartItemType } from '../types'
import { useCartStore, MIN_QUANTITY, MAX_QUANTITY } from '../store/cartStore'
import { calculateItemTotal } from '../lib/cartCalculations'

interface CartItemProps {
  item: CartItemType
  readOnly?: boolean
}

export const CartItemRow: React.FC<CartItemProps> = ({ item, readOnly = false }) => {
  const [imageError, setImageError] = useState(false)

  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const { product, quantity } = item
  const itemTotal = calculateItemTotal(product.price, quantity)

  const isMinReached = quantity <= MIN_QUANTITY
  const isMaxReached = quantity >= MAX_QUANTITY

  const displayImage =
    imageError || !product.thumbnail
      ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'
      : product.thumbnail

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-4 sm:px-6 bg-white border border-gray-200 rounded-2xl shadow-2xs hover:border-gray-300 transition-colors">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center p-2">
          <img
            src={displayImage}
            alt={product.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block">
            {product.category}
          </span>
          <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate" title={product.title}>
            {product.title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            ${product.price.toFixed(2)} each
          </p>
        </div>
      </div>

      {/* Controls & Total */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        {/* Quantity Selector */}
        {!readOnly ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => decreaseQuantity(product.id)}
                disabled={isMinReached}
                className={`p-2 transition-colors cursor-pointer ${
                  isMinReached
                    ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
                title={isMinReached ? 'Minimum 1 required' : 'Decrease quantity'}
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <span className="w-10 text-center text-sm font-semibold text-gray-900 select-none">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => increaseQuantity(product.id)}
                disabled={isMaxReached}
                className={`p-2 transition-colors cursor-pointer ${
                  isMaxReached
                    ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
                title={isMaxReached ? 'Maximum 5 allowed per item' : 'Increase quantity'}
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {isMaxReached && (
              <span className="text-[10px] text-amber-600 font-medium mt-1">
                Max limit (5)
              </span>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            Qty: <strong className="text-gray-900">{quantity}</strong>
          </div>
        )}

        {/* Item Total */}
        <div className="text-right min-w-[80px]">
          <span className="text-xs text-gray-400 block font-medium sm:hidden">Total</span>
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ${itemTotal.toFixed(2)}
          </span>
        </div>

        {/* Remove Button */}
        {!readOnly && (
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            title="Remove item from cart"
            aria-label={`Remove ${product.title} from cart`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
