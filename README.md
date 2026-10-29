# NovaCart — Modern Responsive Shopping Cart Application

A modern, responsive e-commerce shopping cart web application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **Zustand**, **TanStack Query (React Query)**, **Zod**, and **pnpm**.

Designed with a clean, high-contrast aesthetic (white backgrounds, subtle gray borders, rounded cards, and smooth micro-interactions), and architected for clarity and ease of explanation in technical interviews.

---

## 🚀 Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI components, hooks (`useState`, `useMemo`), and strict mode |
| **TypeScript** | Strict compile-time typing across all products, cart state, and forms |
| **Vite 8** | High-performance frontend dev server and production bundler |
| **Tailwind CSS v4** | Clean, responsive styling with utility classes and modern layout tokens |
| **Zustand 5** | Lightweight global state management for the shopping cart with `persist` middleware |
| **TanStack Query v5** | Server-state management: API fetching, caching, loading, error states, and refetching |
| **Zod 4** | Runtime schema validation for DummyJSON API payloads and checkout shipping forms |
| **Lucide React** | Clean, accessible SVG iconography |
| **pnpm** | Fast, disk space-efficient package manager |

---

## ✨ Features Implemented

### 1. Modern E-Commerce Design & Responsive Layout
- White background with subtle gray borders (`border-gray-200`) and rounded cards (`rounded-2xl`).
- Fully responsive on mobile, tablet, and desktop devices.
- Sticky navigation bar with store branding, quick search, and an animated cart badge showing total quantity.
- Toast notifications for real-time user feedback when items are added to the cart.

### 2. Product Listing & TanStack Query Integration
- Fetches 30 products from `https://dummyjson.com/products?limit=30`.
- **Runtime Zod Validation:** Validates the API response structure before displaying products.
- Displays product image (with automatic image fallback), title, category badge, price, star rating, and in-cart count.
- Handles all states: skeleton loading animation, error state with an interactive "Retry Request" button, and empty filter state.

### 3. Real-Time Search & Filtering (`useProducts` Hook)
- Search products by title (case-insensitive).
- Filter by category via dropdown (dynamically populated from API data).
- Filter by minimum and maximum price boundaries.
- "Clear Filters" button to reset all active filters with one click.
- Encapsulated inside a clean, reusable custom hook: `src/hooks/useProducts.ts`.

### 4. Global Shopping Cart (Zustand + Persistence)
- Global cart state managed with **Zustand**.
- Persisted to browser `localStorage` using Zustand's `persist` middleware (`shopping-cart-storage`).
- Add and remove items from anywhere in the app.
- **Strict Quantity Limits:**
  - Minimum quantity: **1** (cannot decrease below 1).
  - Maximum quantity: **5** (cannot exceed 5 units per product).
  - Increment/decrement buttons automatically disable with visual cues when limits are hit.
- Cart cleared automatically upon successful order completion or manually with the "Clear Cart" button.

### 5. Transparent Cart Summary & Calculations
Pure reusable functions in `src/lib/cartCalculations.ts`:
- **Subtotal:** Sum of individual item totals (`price * quantity`).
- **Tax (5%):** Transparent 5% sales tax calculation on the subtotal.
- **Discount (10%):** Unlocked automatically when subtotal exceeds **$100.00**.
- **Final Total Formula:**
  $$\text{Final Total} = \text{Subtotal} + \text{Tax} - \text{Discount}$$
- **Minimum Order Rule:** Checkout is disabled when subtotal is below **$10.00**, accompanied by an informative banner explaining the requirement.

### 6. Three-Step Checkout Flow
A clear step-by-step progress breadcrumb guides the user:
1. **Step 1: Cart Review:** Review item quantities, individual totals, subtotal, tax, discount, and total. Requires minimum checkout threshold ($10) to continue.
2. **Step 2: Shipping Form:**
   - Managed strictly with native React `useState` (no heavy third-party form libraries).
   - Fields: Full Name, Email, Phone Number, Street Address, City, Postal Code.
   - Validated against a strict **Zod schema** (`shippingSchema`).
   - Inline error messages appear next to/under each invalid field. The user cannot proceed until all fields pass validation.
3. **Step 3: Payment Summary & Confirmation:**
   - Read-only review showing the delivery address, item breakdown, and order totals.
   - "Place Order" button completes the purchase.
   - Generates a simulated Order ID (e.g. `ORD-XXXXXX-XXX`), shows delivery details, and automatically purges the cart from Zustand and `localStorage`.

---

## 📁 Project Structure

```
shopping_cart/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CartItem.tsx          # Single cart item row with quantity limits & remove button
│   │   ├── CartSummary.tsx       # Subtotal, tax, discount, total breakdown & minimum alert
│   │   ├── CheckoutSteps.tsx     # 3-step visual progress bar
│   │   ├── Filters.tsx           # Category dropdown, price inputs, & clear filters
│   │   ├── Navbar.tsx            # Sticky header, search bar, & cart counter badge
│   │   ├── OrderSuccessModal.tsx # Order confirmation receipt & summary card
│   │   ├── PaymentSummary.tsx    # Step 3 read-only review & Place Order button
│   │   ├── ProductCard.tsx       # Product card with price, rating, & Add to Cart
│   │   ├── ProductGrid.tsx       # Responsive grid with skeleton loading & error handling
│   │   ├── ShippingForm.tsx      # Step 2 shipping form with useState & Zod errors
│   │   └── Toast.tsx             # Floating notification when items are added to cart
│   ├── hooks/
│   │   └── useProducts.ts        # Custom hook for fetching, searching, and filtering
│   ├── lib/
│   │   ├── api.ts                # Fetch from DummyJSON with Zod response validation
│   │   ├── cartCalculations.ts   # Subtotal, 5% tax, 10% discount, & final total logic
│   │   └── validation.ts         # Zod schema & validator for shipping address
│   ├── pages/
│   │   ├── CartPage.tsx          # Full cart review page with empty state
│   │   ├── CheckoutPage.tsx      # Multi-step checkout orchestrator (Steps 1, 2, 3)
│   │   └── HomePage.tsx          # Product catalog page with hero and filters
│   ├── store/
│   │   └── cartStore.ts          # Zustand store with persist middleware & limits (1-5)
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces for products, cart, & forms
│   ├── App.tsx                   # Main application layout, routing state, & footer
│   ├── index.css                 # Base styling and Tailwind CSS setup
│   └── main.tsx                  # React 19 entry point and TanStack QueryClientProvider
├── package.json
├── tsconfig.json
├── vercel.json                   # Vercel SPA routing configuration
└── vite.config.ts                # Vite config with React and Tailwind CSS plugins
```

---

## 🛠️ Installation and Setup

### Prerequisites
- **Node.js**: v18 or higher (tested on Node v24)
- **pnpm**: v9 or higher (`npm install -g pnpm`)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd shopping_cart
```

### 2. Install dependencies
```bash
pnpm install
```

---

## 💻 Commands to Run the Project

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts the local development server at `http://localhost:5173/` |
| `pnpm build` | Compiles TypeScript with `tsc -b` and builds the production bundle with `vite build` |
| `pnpm preview` | Serves the production build locally to test performance |

---

## 🌐 API Used

- **Endpoint:** `https://dummyjson.com/products?limit=30`
- **Method:** `GET`
- **Response Format:** JSON containing `products`, `total`, `skip`, and `limit`.
- **Validation:** Every item is validated against `ProductSchema` via Zod in `src/lib/api.ts` before reaching the UI.

---

## ⚠️ Known Limitations

1. **Simulated Payment Gateway:** As per project specifications, no real payment gateway (Stripe/PayPal) is integrated. The checkout concludes with simulated order processing and receipt generation.
2. **Catalog Page Size:** Fetches 30 products (`limit=30`). Server-side pagination is omitted in favor of client-side caching and instantaneous filtering.
3. **Simulated Inventory:** Product quantities are capped between 1 and 5 per item according to application business rules rather than real-time backend warehouse stocks.

---

## 🎯 How to Explain This Project in an Interview

Here are the key architectural choices you can highlight during your assignment evaluation:

1. **Separation of Concerns:**
   - **Data Layer:** `src/lib/api.ts` fetches and validates incoming network payloads with Zod.
   - **Business Logic Layer:** `src/lib/cartCalculations.ts` contains pure functions with 0 side-effects for calculating subtotals, taxes, and discounts.
   - **Global State Layer:** `src/store/cartStore.ts` uses Zustand with `persist` middleware to ensure cart state survives page refreshes.
   - **UI Layer:** Components in `src/components/` and `src/pages/` focus strictly on rendering and user interaction.

2. **Why TanStack Query over `useEffect`?**
   - Automatically handles caching, request deduplication, background refetching, and built-in loading/error states without boilerplate `useEffect` code.

3. **Why Zustand over Redux or Context API?**
   - Minimal boilerplate: no reducers, dispatchers, or context provider wrappers.
   - Built-in selectors avoid unnecessary component re-renders.
   - Simple `persist` middleware makes `localStorage` syncing instantaneous.

4. **Why Native `useState` + Zod for Forms?**
   - Demonstrates deep understanding of React's controlled inputs without relying on heavy abstractions like Formik or React Hook Form.
   - Schema validation is declarative and reusable across backend and frontend environments.
