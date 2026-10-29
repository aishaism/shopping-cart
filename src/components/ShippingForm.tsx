import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, User, Mail, Phone, Home, Building2, MapPin, AlertCircle } from 'lucide-react'
import type { ShippingFormData, ShippingFormErrors } from '../types'
import { validateShippingForm } from '../lib/validation'

interface ShippingFormProps {
  initialValues: ShippingFormData
  onSubmit: (data: ShippingFormData) => void
  onBack: () => void
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  initialValues,
  onSubmit,
  onBack,
}) => {
  // Pure React useState to manage form values (no external form library)
  const [formData, setFormData] = useState<ShippingFormData>(initialValues)
  const [errors, setErrors] = useState<ShippingFormErrors>({})
  const [touched, setTouched] = useState<Record<keyof ShippingFormData, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    postalCode: false,
  })

  // Handle single field change
  const handleChange = (field: keyof ShippingFormData, value: string) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)

    // Validate on change if already touched
    if (touched[field]) {
      const validation = validateShippingForm(updated)
      setErrors((prev) => ({
        ...prev,
        [field]: validation.errors[field] || undefined,
      }))
    }
  }

  // Handle field blur
  const handleBlur = (field: keyof ShippingFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const validation = validateShippingForm(formData)
    setErrors((prev) => ({
      ...prev,
      [field]: validation.errors[field] || undefined,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      postalCode: true,
    })

    const validation = validateShippingForm(formData)
    if (!validation.success) {
      setErrors(validation.errors)
      return
    }

    setErrors({})
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
      <div className="mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Shipping Details</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Please enter your delivery address. All fields are required.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="e.g. Jane Doe"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border focus:bg-white focus:outline-none transition-all ${
                errors.fullName
                  ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500 text-red-900 bg-red-50/20'
                  : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border focus:bg-white focus:outline-none transition-all ${
                  errors.email
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500 text-red-900 bg-red-50/20'
                    : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border focus:bg-white focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500 text-red-900 bg-red-50/20'
                    : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Street Address */}
        <div>
          <label htmlFor="address" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Street Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Home className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="address"
              name="address"
              type="text"
              placeholder="123 Market St, Suite 4B"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              onBlur={() => handleBlur('address')}
              className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border focus:bg-white focus:outline-none transition-all ${
                errors.address
                  ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500 text-red-900 bg-red-50/20'
                  : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
              }`}
            />
          </div>
          {errors.address && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.address}</span>
            </p>
          )}
        </div>

        {/* City & Postal Code Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="city"
                name="city"
                type="text"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                onBlur={() => handleBlur('city')}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border focus:bg-white focus:outline-none transition-all ${
                  errors.city
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500 text-red-900 bg-red-50/20'
                    : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                }`}
              />
            </div>
            {errors.city && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label htmlFor="postalCode" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Postal / ZIP Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                placeholder="10001"
                value={formData.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value)}
                onBlur={() => handleBlur('postalCode')}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border focus:bg-white focus:outline-none transition-all ${
                  errors.postalCode
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500 text-red-900 bg-red-50/20'
                    : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                }`}
              />
            </div>
            {errors.postalCode && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.postalCode}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart Review
        </button>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-blue-600 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <span>Continue to Payment Summary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}
