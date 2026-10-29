export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage?: number
  rating: number
  stock: number
  brand?: string
  thumbnail: string
  images: string[]
}

export interface ProductsApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartTotals {
  itemCount: number
  subtotal: number
  tax: number
  discount: number
  finalTotal: number
  discountApplied: boolean
  isCheckoutEligible: boolean
  minCheckoutRequired: number
}

export interface ShippingFormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}

export type ShippingFormErrors = Partial<Record<keyof ShippingFormData, string>>

export interface OrderDetails {
  orderId: string
  date: string
  items: CartItem[]
  totals: CartTotals
  shipping: ShippingFormData
}

export type PageView = 'home' | 'cart' | 'checkout'
export type CheckoutStep = 1 | 2 | 3
