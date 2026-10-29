import React from 'react'
import { Sparkles, ShieldCheck, Zap } from 'lucide-react'
import { Filters } from '../components/Filters'
import { ProductGrid } from '../components/ProductGrid'
import type { Product } from '../types'

interface HomePageProps {
  products: Product[]
  allProducts: Product[]
  categories: string[]
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  onRetry: () => void
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  minPrice: string
  onMinPriceChange: (val: string) => void
  maxPrice: string
  onMaxPriceChange: (val: string) => void
  onClearFilters: () => void
  isFiltered: boolean
  filteredCount: number
  totalCount: number
  onAddedToCart?: (product: Product) => void
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  selectedCategory,
  onSelectCategory,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  onClearFilters,
  isFiltered,
  filteredCount,
  totalCount,
  onAddedToCart,
}) => {
  return (
    <div className="space-y-6">
      {/* Modern Hero Banner */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background gradient circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-blue-200 border border-white/15 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Spring Collection • Fresh Deals Updated Daily</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white mb-4">
            Curated Essentials, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              Seamlessly Delivered.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
            Explore authentic products fetched live from DummyJSON, validated in real-time with Zod, and managed through global Zustand state.
          </p>

          {/* Value Props Pills */}
          <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>10% OFF orders over $100</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Standard 5% Tax Calculation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        minPrice={minPrice}
        onMinPriceChange={onMinPriceChange}
        maxPrice={maxPrice}
        onMaxPriceChange={onMaxPriceChange}
        onClearFilters={onClearFilters}
        isFiltered={isFiltered}
        filteredCount={filteredCount}
        totalCount={totalCount}
      />

      {/* Product Catalog Grid */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
        onRetry={onRetry}
        onClearFilters={onClearFilters}
        onAddedToCart={onAddedToCart}
      />
    </div>
  )
}
