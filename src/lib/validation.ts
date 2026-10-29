import { z } from 'zod'
import type { ShippingFormData, ShippingFormErrors } from '../types'

/**
 * Zod schema for checkout shipping address validation
 */
export const shippingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(60, 'Full name cannot exceed 60 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address (e.g. name@example.com)'),
  phone: z
    .string()
    .trim()
    .min(7, 'Phone number must be at least 7 digits')
    .regex(/^[+0-9\s\-()]+$/, 'Please enter a valid phone number format'),
  address: z
    .string()
    .trim()
    .min(5, 'Street address must be at least 5 characters'),
  city: z
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters'),
  postalCode: z
    .string()
    .trim()
    .min(3, 'Postal code must be at least 3 characters')
    .max(12, 'Postal code cannot exceed 12 characters'),
})

/**
 * Validates shipping form data against Zod schema and returns field-level error messages
 */
export function validateShippingForm(data: ShippingFormData): {
  success: boolean
  errors: ShippingFormErrors
} {
  const result = shippingSchema.safeParse(data)

  if (result.success) {
    return { success: true, errors: {} }
  }

  const errors: ShippingFormErrors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ShippingFormData
    if (field && !errors[field]) {
      errors[field] = issue.message
    }
  }

  return { success: false, errors }
}
