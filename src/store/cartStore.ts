import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Product } from '../types'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 5

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => boolean
  removeItem: (productId: number) => void
  increaseQuantity: (productId: number) => boolean
  decreaseQuantity: (productId: number) => boolean
  clearCart: () => void
  getItemQuantity: (productId: number) => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Adds a product to cart. If already present, increases quantity up to MAX_QUANTITY (5).
       * Returns true if successfully added or incremented, false if already at max.
       */
      addItem: (product: Product) => {
        const { items } = get()
        const existingItem = items.find((item) => item.product.id === product.id)

        if (existingItem) {
          if (existingItem.quantity >= MAX_QUANTITY) {
            return false // Already reached max limit of 5
          }
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          })
          return true
        }

        // New item added with initial quantity of 1
        set({
          items: [...items, { product, quantity: 1 }],
        })
        return true
      },

      /**
       * Removes an item completely from cart
       */
      removeItem: (productId: number) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        })
      },

      /**
       * Increases item quantity up to maximum limit of 5
       */
      increaseQuantity: (productId: number) => {
        const { items } = get()
        const target = items.find((item) => item.product.id === productId)

        if (!target || target.quantity >= MAX_QUANTITY) {
          return false
        }

        set({
          items: items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })
        return true
      },

      /**
       * Decreases item quantity down to minimum limit of 1
       */
      decreaseQuantity: (productId: number) => {
        const { items } = get()
        const target = items.find((item) => item.product.id === productId)

        if (!target || target.quantity <= MIN_QUANTITY) {
          return false
        }

        set({
          items: items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })
        return true
      },

      /**
       * Clears all items from the cart
       */
      clearCart: () => {
        set({ items: [] })
      },

      /**
       * Gets current quantity of a specific product in the cart (0 if not in cart)
       */
      getItemQuantity: (productId: number) => {
        const item = get().items.find((item) => item.product.id === productId)
        return item ? item.quantity : 0
      },

      /**
       * Gets total sum of item quantities in the cart
       */
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'shopping-cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
