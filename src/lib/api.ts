import { z } from 'zod'
import type { Product, ProductsApiResponse } from '../types'

/**
 * Zod schema for individual Product validation
 */
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number().optional(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string().optional(),
  thumbnail: z.string().url(),
  images: z.array(z.string()),
})

/**
 * Zod schema for DummyJSON products API response
 */
export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

const API_URL = 'https://dummyjson.com/products?limit=30'

/**
 * Fetches products from DummyJSON and validates response with Zod
 */
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`)
  }

  const rawData: unknown = await response.json()

  // Validate the incoming API payload using Zod
  const parsedData: ProductsApiResponse = ProductsResponseSchema.parse(rawData)

  return parsedData.products
}
