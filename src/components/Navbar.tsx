import React from 'react'
import { ShoppingBag, ShoppingCart, Search, X } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import type { PageView } from '../types'

interface NavbarProps {
  currentPage: PageView
  onNavigate: (page: PageView) => void
  searchValue: string
  onSearchChange: (value: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  searchValue,
  onSearchChange,
}) => {
  const itemCount = useCartStore((state) => state.getItemCount())

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo / Brand Name */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                NovaCart
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Store
              </span>
            </div>
          </button>

          {/* Search Bar (Visible on mid/large screens) */}
          <div className="flex-1 max-w-md mx-2 relative">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products by title..."
                value={searchValue}
                onChange={(e) => {
                  onSearchChange(e.target.value)
                  if (currentPage !== 'home') {
                    onNavigate('home')
                  }
                }}
                className="w-full pl-10 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links & Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Catalog
            </button>

            {/* Cart Icon Button with Count Badge */}
            <button
              type="button"
              onClick={() => onNavigate('cart')}
              className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                currentPage === 'cart'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-gray-900'
              }`}
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold leading-none text-white bg-blue-600 rounded-full animate-in fade-in">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
