import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../lib/api'
import type { Product } from '../types'

export interface UseProductsOptions {
  initialSearch?: string
}

export function useProducts(options: UseProductsOptions = {}) {
  const [search, setSearch] = useState<string>(options.initialSearch || '')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')

  // Query products with TanStack Query
  const {
    data: allProducts = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 2,
  })

  // Derive unique list of categories from fetched products
  const categories = useMemo(() => {
    const unique = new Set<string>()
    allProducts.forEach((p) => {
      if (p.category) {
        unique.add(p.category)
      }
    })
    return Array.from(unique).sort()
  }, [allProducts])

  // Filter products by search query, category, and min/max price
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // 1. Title search filter (case-insensitive)
      if (search.trim()) {
        const matchesTitle = product.title
          .toLowerCase()
          .includes(search.trim().toLowerCase())
        if (!matchesTitle) return false
      }

      // 2. Category filter
      if (selectedCategory !== 'all') {
        if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false
        }
      }

      // 3. Minimum price filter
      const parsedMin = parseFloat(minPrice)
      if (!isNaN(parsedMin) && parsedMin >= 0) {
        if (product.price < parsedMin) {
          return false
        }
      }

      // 4. Maximum price filter
      const parsedMax = parseFloat(maxPrice)
      if (!isNaN(parsedMax) && parsedMax >= 0) {
        if (product.price > parsedMax) {
          return false
        }
      }

      return true
    })
  }, [allProducts, search, selectedCategory, minPrice, maxPrice])

  // Check if any filters are actively applied
  const isFiltered = Boolean(
    search.trim() ||
      selectedCategory !== 'all' ||
      minPrice.trim() ||
      maxPrice.trim(),
  )

  // Reset all filters to default state
  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('all')
    setMinPrice('')
    setMaxPrice('')
  }

  return {
    products: filteredProducts,
    allProducts,
    categories,
    isLoading,
    isFetching,
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
    totalCount: allProducts.length,
    filteredCount: filteredProducts.length,
  }
}
