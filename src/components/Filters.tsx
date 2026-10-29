import React from 'react'
import { Filter, RotateCcw, DollarSign } from 'lucide-react'

interface FiltersProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  minPrice: string
  onMinPriceChange: (val: string) => void
  maxPrice: string
  onMaxPriceChange: (val: string) => void
  onClearFilters: () => void
  isFiltered: boolean
  filteredCount: number
  totalCount: number
}

export const Filters: React.FC<FiltersProps> = ({
  categories,
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
}) => {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Header & Status */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 leading-none">Filters</h2>
              <p className="text-xs text-gray-500 mt-1">
                Showing <strong className="text-gray-900">{filteredCount}</strong> of {totalCount} products
              </p>
            </div>
          </div>

          {/* Mobile Clear Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onClearFilters}
              className="lg:hidden text-xs text-red-600 font-medium hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:items-center gap-3">
          {/* Category Dropdown */}
          <div className="w-full sm:w-auto min-w-[180px]">
            <label htmlFor="category-select" className="block text-xs font-medium text-gray-500 mb-1">
              Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              className="w-full py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 capitalize transition-all cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div className="w-full sm:w-auto min-w-[120px]">
            <label htmlFor="min-price-input" className="block text-xs font-medium text-gray-500 mb-1">
              Min Price
            </label>
            <div className="relative">
              <DollarSign className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                id="min-price-input"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* Max Price */}
          <div className="w-full sm:w-auto min-w-[120px]">
            <label htmlFor="max-price-input" className="block text-xs font-medium text-gray-500 mb-1">
              Max Price
            </label>
            <div className="relative">
              <DollarSign className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                id="max-price-input"
                type="number"
                min="0"
                step="1"
                placeholder="500"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* Desktop Clear Filters Button */}
          {isFiltered && (
            <div className="hidden lg:flex items-end self-end">
              <button
                type="button"
                onClick={onClearFilters}
                className="py-2 px-3 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset all filters to default"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
