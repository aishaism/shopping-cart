import React, { useState } from 'react'
import { Star, Plus, Check, ShoppingCart } from 'lucide-react'
import type { Product } from '../types'
import { useCartStore, MAX_QUANTITY } from '../store/cartStore'

interface ProductCardProps {
  product: Product
  onAddedToCart?: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddedToCart }) => {
  const [imageError, setImageError] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const addItem = useCartStore((state) => state.addItem)
  const currentQuantity = useCartStore((state) => state.getItemQuantity(product.id))

  const isMaxReached = currentQuantity >= MAX_QUANTITY

  const handleAddToCart = () => {
    if (isMaxReached) return

    const success = addItem(product)
    if (success) {
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 1200)
      if (onAddedToCart) {
        onAddedToCart(product)
      }
    }
  }

  // Fallback image if remote url fails
  const displayImage =
    imageError || !product.thumbnail
      ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'
      : product.thumbnail

  return (
    <article className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden flex items-center justify-center p-4">
        <img
          src={displayImage}
          alt={product.title}
          loading="lazy"
          onError={() => setImageError(true)}
          className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Chip */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 capitalize">
          {product.category}
        </span>

        {/* In-Cart Badge Indicator */}
        {currentQuantity > 0 && (
          <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <ShoppingCart className="w-3 h-3" />
            {currentQuantity} in cart
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3
          className="font-semibold text-gray-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="ml-1 text-sm font-semibold text-gray-800">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 capitalize">{product.brand || 'Verified'}</span>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Price</span>
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isMaxReached}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              isMaxReached
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : justAdded
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-gray-900 text-white hover:bg-blue-600 shadow-xs active:scale-95'
            }`}
            title={isMaxReached ? 'Maximum 5 units allowed per item' : 'Add to shopping cart'}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : isMaxReached ? (
              <span>Max (5)</span>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
