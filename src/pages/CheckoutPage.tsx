import React, { useState } from 'react'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { CartItemRow } from '../components/CartItem'
import { CartSummary } from '../components/CartSummary'
import { ShippingForm } from '../components/ShippingForm'
import { PaymentSummary } from '../components/PaymentSummary'
import { OrderSuccessModal } from '../components/OrderSuccessModal'
import { getCartTotals } from '../lib/cartCalculations'
import { validateShippingForm } from '../lib/validation'
import type { CheckoutStep, ShippingFormData, OrderDetails, PageView } from '../types'

interface CheckoutPageProps {
  onNavigate: (page: PageView) => void
}

const INITIAL_SHIPPING_FORM: ShippingFormData = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1)
  const [shippingData, setShippingData] = useState<ShippingFormData>(INITIAL_SHIPPING_FORM)
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const totals = getCartTotals(items)

  // Validation state check to enable navigation between steps
  const isShippingValid = validateShippingForm(shippingData).success

  const canGoToStep = (targetStep: CheckoutStep): boolean => {
    if (targetStep === 1) return true
    if (targetStep === 2) return totals.isCheckoutEligible
    if (targetStep === 3) return totals.isCheckoutEligible && isShippingValid
    return false
  }

  // Handle final order submission in Step 3
  const handlePlaceOrder = () => {
    setIsSubmitting(true)

    // Generate simulated order confirmation
    const order: OrderDetails = {
      orderId: `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...items],
      totals: { ...totals },
      shipping: { ...shippingData },
    }

    setTimeout(() => {
      // 1. Store completed order details for receipt display
      setCompletedOrder(order)

      // 2. Clear global Zustand cart state (which automatically updates localStorage through persist middleware)
      clearCart()

      setIsSubmitting(false)
    }, 600)
  }

  // If order was successfully placed, render OrderSuccessModal
  if (completedOrder) {
    return (
      <OrderSuccessModal
        order={completedOrder}
        onContinueShopping={() => {
          setCompletedOrder(null)
          setCurrentStep(1)
          setShippingData(INITIAL_SHIPPING_FORM)
          onNavigate('home')
        }}
      />
    )
  }

  // Empty cart fallback during checkout
  if (items.length === 0 && currentStep === 1) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-2xs my-8">
        <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
        <p className="text-sm text-gray-500 mb-6">
          Add items to your cart before proceeding with checkout.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Title & Back Button */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Complete your order in 3 straightforward steps
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('cart')}
          className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>
      </div>

      {/* 3-Step Progress Indicator */}
      <CheckoutSteps
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
        canGoToStep={canGoToStep}
      />

      {/* STEP 1: CART REVIEW */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-base font-bold text-gray-900">
                Step 1: Review Cart Items ({totals.itemCount})
              </h3>
              <span className="text-xs text-gray-500">
                Adjust quantities if needed (1 - 5)
              </span>
            </div>

            {items.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <CartSummary
              totals={totals}
              isCheckoutStep={true}
              onProceedToCheckout={() => {
                if (totals.isCheckoutEligible) {
                  setCurrentStep(2)
                }
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 2: SHIPPING FORM */}
      {currentStep === 2 && (
        <div className="max-w-2xl mx-auto">
          <ShippingForm
            initialValues={shippingData}
            onSubmit={(validData) => {
              setShippingData(validData)
              setCurrentStep(3)
            }}
            onBack={() => setCurrentStep(1)}
          />
        </div>
      )}

      {/* STEP 3: PAYMENT SUMMARY */}
      {currentStep === 3 && (
        <PaymentSummary
          items={items}
          totals={totals}
          shipping={shippingData}
          onBack={() => setCurrentStep(2)}
          onPlaceOrder={handlePlaceOrder}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
