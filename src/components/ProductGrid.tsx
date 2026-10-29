import React from 'react'
import { AlertCircle, RefreshCw, SearchX, ShoppingBag } from 'lucide-react'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  onRetry: () => void
  onClearFilters?: () => void
  onAddedToCart?: (product: Product) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  onClearFilters,
  onAddedToCart,
}) => {
  // Loading State - Skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-4 animate-pulse shadow-2xs"
          >
            <div className="w-full aspect-square bg-gray-100 rounded-xl" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-100 rounded-md w-3/4" />
              <div className="h-3 bg-gray-100 rounded-md w-1/3" />
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="h-5 bg-gray-100 rounded-md w-16" />
              <div className="h-9 bg-gray-100 rounded-xl w-24" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Error State with Retry CTA
  if (isError) {
    return (
      <div className="bg-white border border-red-200 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs my-8">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Unable to Load Products</h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {errorMessage || 'There was an issue contacting the product catalog API. Please check your connection and try again.'}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Request
        </button>
      </div>
    )
  }

  // Empty Filter Results State
  if (products.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-2xs my-8">
        <div className="w-14 h-14 bg-gray-100 text-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No Matching Products Found</h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Try adjusting your search criteria, clearing price boundaries, or choosing a different category.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-semibold rounded-xl border border-blue-200 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            Show All Products
          </button>
        )}
      </div>
    )
  }

  // Success State - Product Grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddedToCart={onAddedToCart}
        />
      ))}
    </div>
  )
}
