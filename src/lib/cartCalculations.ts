import type { CartItem, CartTotals } from '../types'

export const TAX_RATE = 0.05 // 5% tax
export const DISCOUNT_RATE = 0.10 // 10% discount
export const DISCOUNT_THRESHOLD = 100 // Applies when subtotal > $100
export const MIN_CHECKOUT_SUBTOTAL = 10 // Minimum $10 subtotal required to checkout

/**
 * Calculates total price for a single cart item (unit price * quantity)
 */
export function calculateItemTotal(price: number, quantity: number): number {
  return Number((price * quantity).toFixed(2))
}

/**
 * Calculates sum of all item subtotals
 */
export function calculateSubtotal(items: CartItem[]): number {
  const sum = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity
  }, 0)
  return Number(sum.toFixed(2))
}

/**
 * Calculates 5% tax on the subtotal
 */
export function calculateTax(subtotal: number): number {
  return Number((subtotal * TAX_RATE).toFixed(2))
}

/**
 * Calculates 10% discount when subtotal is strictly greater than $100
 */
export function calculateDiscount(subtotal: number): number {
  if (subtotal > DISCOUNT_THRESHOLD) {
    return Number((subtotal * DISCOUNT_RATE).toFixed(2))
  }
  return 0
}

/**
 * Calculates final total: Subtotal + Tax - Discount
 */
export function calculateFinalTotal(subtotal: number, tax: number, discount: number): number {
  const total = subtotal + tax - discount
  return Number(Math.max(0, total).toFixed(2))
}

/**
 * Checks if the subtotal meets the minimum checkout threshold ($10)
 */
export function isEligibleForCheckout(subtotal: number): boolean {
  return subtotal >= MIN_CHECKOUT_SUBTOTAL
}

/**
 * Returns comprehensive breakdown of cart totals
 */
export function getCartTotals(items: CartItem[]): CartTotals {
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = calculateSubtotal(items)
  const tax = calculateTax(subtotal)
  const discount = calculateDiscount(subtotal)
  const finalTotal = calculateFinalTotal(subtotal, tax, discount)
  const discountApplied = discount > 0
  const isCheckoutEligible = items.length > 0 && isEligibleForCheckout(subtotal)

  return {
    itemCount,
    subtotal,
    tax,
    discount,
    finalTotal,
    discountApplied,
    isCheckoutEligible,
    minCheckoutRequired: MIN_CHECKOUT_SUBTOTAL,
  }
}
