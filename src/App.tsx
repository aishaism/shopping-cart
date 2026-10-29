import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { Toast } from './components/Toast'
import { useProducts } from './hooks/useProducts'
import type { PageView, Product } from './types'
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react'

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home')
  const [toastMessage, setToastMessage] = useState<string>('')
  const [toastVisible, setToastVisible] = useState(false)

  // Use custom hook for products fetching, searching, and filtering
  const {
    products,
    allProducts,
    categories,
    isLoading,
    isError,
    error,
    refetch,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    clearFilters,
    isFiltered,
    filteredCount,
    totalCount,
  } = useProducts()

  const handleAddedToCart = (product: Product) => {
    setToastMessage(`Added "${product.title}" to cart!`)
    setToastVisible(true)
  }

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        searchValue={search}
        onSearchChange={setSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            allProducts={allProducts}
            categories={categories}
            isLoading={isLoading}
            isError={isError}
            errorMessage={error?.message}
            onRetry={() => refetch()}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            onClearFilters={clearFilters}
            isFiltered={isFiltered}
            filteredCount={filteredCount}
            totalCount={totalCount}
            onAddedToCart={handleAddedToCart}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
        onViewCart={() => {
          setToastVisible(false)
          handleNavigate('cart')
        }}
      />

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-gray-100 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Fast Standard Shipping</p>
                <p className="text-gray-500">Tracked delivery on all orders</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Zod-Validated Checkout</p>
                <p className="text-gray-500">Schema enforced input integrity</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Persistent Local Cart</p>
                <p className="text-gray-500">Synced seamlessly with Zustand</p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-gray-900">NovaCart Shopping Application</span>
              <span>— React 19, TypeScript, Tailwind CSS, TanStack Query, Zustand, Zod</span>
            </div>

            <p className="flex items-center gap-1 text-gray-400">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for technical interview evaluation
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
