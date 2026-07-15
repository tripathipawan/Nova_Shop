# NovaShop 🛍️

A full-featured, production-style e-commerce storefront built with **React 19**, **React Router 7**, **Tailwind CSS 4**, and the **DummyJSON REST API**, with real authentication via **Clerk**. It covers the complete shopping flow — browse, filter, search, view product details, wishlist, add to cart, apply promo codes, fill in delivery details, and "place" an order — plus SEO metadata that updates per-page and a fully responsive dark/light UI.

---

## What This Project Does

NovaShop fetches its entire product catalog from the public **DummyJSON** API (`https://dummyjson.com/products`) and renders it across a homepage, a filterable product listing, category pages, and individual product pages. Authentication is handled by **Clerk** (`@clerk/clerk-react`) — visitors can browse freely, but the **Cart** route is wrapped in a `ProtectedRoute` component that requires sign-in. Cart state and wishlist state are kept client-side: the cart lives in React Context and is persisted to `localStorage` on every change, and the wishlist is stored directly in `localStorage` as an array of product IDs, so both survive page refreshes without any backend of their own.

Every page updates the document `<title>`, meta description, and JSON-LD structured data on the fly through a custom `useSEO` hook — so navigating from Home to a Product page changes the SEO metadata without a full reload, which matters for the site's real, deployed SEO setup (Open Graph tags, `Organization`/`WebSite`/`Store`/`Product` schema, `sitemap.xml`, `robots.txt`).

---

## Features

### 🏠 Homepage
Composed of seven independent sections rendered in `Home.jsx`:
- **Category strip** (`Category.jsx`) — a sticky, horizontally scrollable pill bar of every unique category pulled from the fetched product data, with an "All" option and active-state highlighting tied to the current URL.
- **Hero carousel banner** (`Carousel.jsx`) — a two-column hero with a gradient headline, "Shop Now"/"Explore Deals" CTAs, live store stats (10K+ products, 50K+ customers, 4.9★), and a featured banner image with floating "Fast Delivery" and rating badges.
- **Use-case section** (`UseCaseSection.jsx`) — four gradient cards ("For Gaming", "For Office", "For Students", "For Home") linking into the product catalog.
- **Today's Best Deals** (`Deals.jsx`) — dynamically computed from the fetched catalog: for the first six categories, it calculates the average discount, picks a random representative product image, and lists the brands available, so the deals grid regenerates from live data rather than hardcoded content.
- **Mid-page promotional banner** (`MidBanner.jsx`) — a "Smart Tech" callout banner linking to the product catalog.
- **Why Shop With Us** (`Features.jsx`) — four trust badges: Free Shipping, Secure Payment, Easy Returns, 24/7 Support.
- **Customer reviews** (`Review.jsx`) — six testimonial cards with star ratings, rendered with matching `Review`/`ItemList` JSON-LD schema injected directly into the page for search engines.

### 🛒 Product Catalog (`/products`)
- **Live filtering** by category (checkbox list), brand (dropdown, dynamically built from the fetched data), price range (slider, $0–$5000), and a **debounced search box** (300ms) that filters by product title.
- **Sorting** — Default, Price Low→High, Price High→Low, Top Rated, Best Discount.
- **Pagination** — 12 products per page with a smart page-number builder that collapses long page ranges into `1 … 4 5 6 … 20`-style ellipses.
- **Two filter UIs**: a persistent sidebar (`FilterSection.jsx`) on desktop/large screens, and a slide-in drawer (`MobileFilter.jsx`) triggered by a "Filters" button with an active-filter-count badge on mobile.
- **Empty state** — when no products match the active filters, a Lottie animation (`notfound.json`) plays instead of a blank grid, with a one-click "Clear filters" action.
- **"Showing X–Y of Z"** result counter and a one-click "Clear filters" chip whenever any filter is active.

### 🗂️ Category Pages (`/category/:category`)
A dedicated route that calls `GET https://dummyjson.com/products/category/{category}` directly and renders the results using `ProductListView.jsx` — a wider, Amazon-style horizontal row layout (image, title, price, delivery estimate, Add to Cart) rather than the grid cards used on `/products`.

### 🔎 Single Product Page (`/products/:id`)
- Fetches full product detail from `GET https://dummyjson.com/products/{id}`.
- Image gallery with a large preview, left/right arrow navigation, and clickable thumbnails.
- Price block with strikethrough original price and "Save X%" badge when a discount applies.
- Live stock status, a quantity stepper capped at available stock, and an **Add to Cart** button that's disabled when out of stock.
- Wishlist toggle and a **native Web Share** button (falls back to copying the URL to the clipboard via `navigator.clipboard` when the Share API isn't available).
- Tabbed content area — **Description**, **Reviews** (from the API's `reviews` array), and **Specs** (SKU, weight, dimensions, warranty, shipping info, return policy, minimum order quantity — only rendered when the API actually returns that field).
- Trust badges (Secure Payment, Fast Delivery, Easy Returns) and full breadcrumb navigation (`Breadcrums.jsx`).

### ❤️ Wishlist (`/wishlist`)
Wishlisting is done purely via `localStorage` (no login required) — clicking the heart icon on any `ProductCard` or the Single Product page stores the product ID locally. The Wishlist page then fetches the full product details for every stored ID in parallel (`Promise.all`), and lets the user remove individual items, clear the whole list, or add everything to the cart in one click. It also listens for the `storage` and `focus` browser events so the list stays in sync if the wishlist is changed in another tab.

### 🛍️ Shopping Cart (`/cart`) — Protected Route
- Requires Clerk sign-in; unauthenticated visitors see a "Sign In Required" screen with an inline Clerk sign-in modal trigger instead of being redirected away.
- Quantity increase/decrease per line item, item removal, and a live order summary (items subtotal, delivery charge — free above $100, otherwise $9.99 — handling fee, 10% tax, and any applied discount).
- **Promo code engine** — three working demo codes: `SAVE10` ($10 off), `SAVE20` ($20 off orders over $200), and `FIRST15` (15% off), all validated with proper error toasts for invalid codes or unmet minimums.
- **Delivery details form** — validates phone, address, city, and ZIP code, then saves the info to `localStorage` so it's remembered on return visits.
- A **10-minute countdown timer** creates checkout urgency once items are in the cart.
- **Checkout simulation** — clicking "Place Order" (only enabled once delivery info is saved) shows an animated order-confirmation screen and auto-redirects back to `/products` after 3 seconds. This is a front-end simulation; there is no real payment gateway wired in.
- A themed empty-cart state with its own illustration when the cart has nothing in it.

### 🔐 Authentication (Clerk)
- Sign in / sign up handled entirely by Clerk's prebuilt `SignInButton` modal and `UserButton` account menu — no custom auth forms.
- `ProtectedRoute.jsx` gates the `/cart` route specifically.
- An `AuthHandler` component quietly redirects a signed-in user back to `/` if they land on an invalid path, keeping deep links sane.
- The cart icon in the navbar shows a warning toast ("🔒 Please sign in to access your cart!") if a signed-out user clicks it.

### 🧭 Navigation & Layout
- Sticky, blurred header with an animated **active-route underline** that slides between nav items, a scroll-progress bar under the header, and a slide-in mobile sidebar menu with its own sign-in/dark-mode/cart/wishlist shortcuts.
- **Dark/Light mode toggle**, persisted in `localStorage` (`theme` key) and applied via a `dark` class on the document root — unlike a typical demo toggle, this one *does* survive a page refresh.
- Global **scroll-to-top button** (`react-scroll-to-top`) and automatic **scroll restoration** to the top of the page on every route change.
- Rich **footer** with company info, a customer-service link list, social links with follower-count stats, and a working newsletter-subscribe form (client-side only — shows a "Subscribed!" confirmation state).

### 📄 Additional Pages
- **About** (`/about`) — mission/vision statement, live-looking stats (10K+ products, 50K+ customers, 4.9 rating), and a "Why NovaShop" list.
- **Contact** (`/contact`) — a validated contact form (name, email, subject, message) that simulates a network call with a 1.5s delay before showing a success toast; also lists address, email, and phone.
- **PolicyHub** (`/policyHub`) — a single tabbed page covering Terms & Conditions, Privacy Policy, Shipping Policy, Return & Refund Policy, and FAQs, so legal content doesn't need five separate routes.
- **NotFound** (`*` catch-all) — a styled 404 page with "Go Home" and "Browse Products" actions.

### ⚙️ Performance & SEO Engineering
- **Route-level code splitting** — every page component is loaded with `React.lazy` + `Suspense`, so the initial bundle only ships the navbar/footer shell plus whichever page was requested.
- **Manual Vite chunk splitting** (`vite.config.js`) — React, icon libraries, Clerk, and misc utilities (toastify/lottie/axios) are each bundled into their own vendor chunk for better caching.
- **`useSEO` hook** — updates `<title>`, meta description, Open Graph tags, and injects/removes page-specific JSON-LD (`WebPage`, `Product`, `ItemList` schemas) on every route change, without a full reload.
- Root `index.html` ships **Organization**, **WebSite + SearchAction**, and **Store** JSON-LD, full Open Graph/Twitter Card tags, `preconnect`/`dns-prefetch` hints for the DummyJSON API, and a hero image `preload` for faster LCP.
- `public/robots.txt` and `public/Sitemap.xml` are already wired up, with `/cart` and `/wishlist` disallowed from indexing.
- `vercel.json` sets long-term immutable caching for static assets and a full set of security headers (`X-Frame-Options`, `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy`, etc.) for the Vercel deployment.

---

## How Data Flows

NovaShop has **two separate data-fetching patterns**, and it's worth knowing the difference:

1. **Global catalog (via Context)** — `DataContext.jsx` fetches the *entire* product catalog once (`GET /products?limit=0`) the first time any component calls `fetchAllProducts()`, then caches it in memory for the rest of the session (a `hasFetched` ref guard prevents duplicate fetches). This shared `data` array powers the Homepage's Category/Deals sections and the `/products` listing, filtering, and sorting — all done **client-side** against the already-fetched array via `useMemo`.
2. **Per-page direct fetches (via Axios)** — the Single Product page, Category pages, and Wishlist page each call the DummyJSON API directly with Axios for just the data they need (`/products/{id}`, `/products/category/{category}`, or one call per wishlisted ID), rather than going through the shared context.

```
GET https://dummyjson.com/products?limit=0        → Full catalog (DataContext, cached once)
GET https://dummyjson.com/products/{id}            → Single product detail
GET https://dummyjson.com/products/category/{cat}  → Products within one category
```

---

## State Management

No Redux, no Zustand — everything runs on the **React Context API** plus local `useState`/`useRef`, split by concern:

| Provider / State | Location | Purpose |
|---|---|---|
| `DataContext` | `src/context/DataContext.jsx` | Holds the full product catalog (`data`), `loading`/`error` flags, and memoized derived lists (`categoryOnlyData`, `brandOnlyData`) used to populate filters |
| `CartContext` | `src/context/CartContext.jsx` | Holds `cartItem` (array), plus `addToCart`, `updateQuantity`, and `deleteItem` — every mutation fires a `react-toastify` confirmation |
| Cart persistence | `App.jsx` | Two `useEffect`s hydrate `cartItem` from `localStorage` on mount and write it back on every change |
| `wishlist` | `localStorage` (no Context) | A plain array of product ID strings, read/written directly by `ProductCard`, `SingleProduct`, and `Wishlist` |
| `theme` | `localStorage`, read in `Navbar.jsx` | Drives the `dark` class on `<html>` for Tailwind's dark-mode variants |
| `deliveryInfo` | `localStorage`, read in `Cart.jsx` | Remembers the shopper's saved delivery form between visits |

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 19.2.4 | Component architecture, hooks, `lazy`/`Suspense` code splitting |
| React DOM | 19.2.4 | DOM rendering target |
| React Router DOM | 7.13.0 | Routing (`BrowserRouter`, nested `Routes`, `useParams`, `useSearchParams`, `useNavigate`) |
| Tailwind CSS | 4.1.18 | All utility-class styling, including dark-mode variants |
| @tailwindcss/vite | 4.1.18 | Zero-config Tailwind 4 build integration for Vite |
| @clerk/clerk-react | 5.60.0 | Authentication — sign-in/sign-up modal, user session, `useAuth`/`useUser` hooks |
| Axios | 1.13.5 | HTTP client for all DummyJSON API calls |
| React Toastify | 11.0.5 | Toast notifications for cart, wishlist, promo, and form actions |
| Framer Motion | 12.33.0 | Available for animation (entrance/interaction effects) |
| Lottie React | 2.4.1 | Renders the `notfound.json` animation on empty product-search results |
| lucide-react | 0.563.0 | Icon set used in Features, Cart, Single Product, and Policy pages |
| react-icons | 5.5.0 | Additional icon set (Io5, Fi, Fa, Bs, Hi, Bi, Gi, Md, Ai, Lu) used throughout the UI |
| react-scroll-to-top | 3.1.0 | Floating scroll-to-top button |
| react-slick + slick-carousel | 0.31.0 / 1.8.1 | Carousel dependency available for slide-based UI |
| Vite | 7.2.4 | Build tool and dev server, with manual vendor chunking configured |
| ESLint | 9.39.1 | Linting via `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` |
| DummyJSON REST API | — | Live product data source (no backend of NovaShop's own) |

---

## Project Structure

```
Nova_Shop/
├── index.html                     # Vite entry point — full SEO head: meta tags, Open Graph, Twitter Card,
│                                    JSON-LD (Organization/WebSite/Store), preconnect hints
├── package.json                   # Dependencies: react 19, react-router-dom 7, clerk, tailwindcss 4, axios, etc.
├── vite.config.js                 # Vite config — React + Tailwind plugins, manual chunk splitting for vendors
├── vercel.json                    # Vercel deploy config — SPA rewrites, cache headers, security headers
├── eslint.config.js               # ESLint flat config — react-hooks and react-refresh rules
├── .gitignore                     # node_modules, dist, .env excluded
├── public/
│   ├── robots.txt                  # Crawl rules — disallows /cart and /wishlist, points to sitemap
│   └── Sitemap.xml                 # XML sitemap for search engines
└── src/
    ├── main.jsx                    # Root render — wraps App in DataProvider → CartProvider → ClerkProvider,
    │                                mounts global ScrollToTop button and ToastContainer
    ├── App.jsx                     # BrowserRouter setup, lazy-loaded routes, ProtectedRoute for /cart,
    │                                cart localStorage hydration/persistence, scroll restoration, auth redirect guard
    ├── index.css                   # Tailwind 4 import
    ├── hooks/
    │   └── useSEO.js                # Custom hook — updates <title>, meta description, Open Graph tags,
    │                                and injects/removes page-level JSON-LD on every route change
    ├── context/
    │   ├── DataContext.jsx          # Fetches & caches the full product catalog; derives category/brand lists
    │   └── CartContext.jsx          # Cart state + addToCart / updateQuantity / deleteItem, with toast feedback
    ├── assets/                     # Banners, favicon, loading animations (webm/gif), empty-cart illustration,
    │                                notfound Lottie JSON
    ├── components/
    │   ├── Navbar.jsx                # Sticky header, active-route underline, dark mode toggle, mobile sidebar
    │   ├── Footer.jsx                 # Company info, customer service links, socials, newsletter form
    │   ├── ProductCard.jsx            # Grid product card — wishlist heart, discount badge, Add to Cart
    │   ├── ProductListView.jsx        # Horizontal row-style product card, used on Category pages
    │   ├── FilterSection.jsx          # Desktop sidebar filters — search, category, brand, price range
    │   ├── MobileFilter.jsx           # Slide-in drawer version of the same filters, for small screens
    │   ├── Pagination.jsx             # Smart page-number builder with ellipsis collapsing
    │   ├── Breadcrums.jsx             # Home / Products / current-product breadcrumb trail
    │   └── ProtectedRoute.jsx         # Gate component — requires Clerk sign-in, shown on the /cart route
    ├── components/Homepage_Components/
    │   ├── Carousel.jsx                # Hero banner section
    │   ├── Category.jsx                # Sticky scrollable category pill bar
    │   ├── Deals.jsx                    # Dynamically generated "Today's Best Deals" grid
    │   ├── MidBanner.jsx                # Promotional "Smart Tech" banner
    │   ├── Features.jsx                 # "Why Shop With Us" trust badges
    │   ├── Review.jsx                   # Customer testimonials + JSON-LD review schema
    │   └── UseCaseSection.jsx           # "Shop by Use Case" card grid
    └── pages/
        ├── Home.jsx                    # Composes all Homepage_Components sections
        ├── Products.jsx                 # Full product listing — filters, search, sort, pagination
        ├── SingleProduct.jsx             # Product detail — gallery, tabs, quantity, wishlist, share
        ├── CategoryProduct.jsx           # Products filtered by one category (list-view layout)
        ├── Wishlist.jsx                   # LocalStorage-backed saved-products page
        ├── Cart.jsx                       # Protected cart — promo codes, delivery form, checkout simulation
        ├── About.jsx                      # Mission, vision, stats
        ├── Contact.jsx                     # Validated contact form
        ├── PolicyHub.jsx                   # Tabbed Terms/Privacy/Shipping/Returns/FAQ content
        └── NotFound.jsx                     # 404 page
```

---

## How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/tripathipawan/Nova_Shop.git
   ```

2. Move into the project directory
   ```bash
   cd Nova_Shop
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Set up your environment variables — create a `.env` file in the project root with your Clerk publishable key:
   ```bash
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```
   > The app will throw `"Missing Publishable Key"` at startup if this is not set — get a free key from the [Clerk dashboard](https://dashboard.clerk.com).

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open `http://localhost:5173` in your browser. Sign in with Clerk to unlock the Cart, browse the product catalog, filter/search, and add items to your wishlist.

7. To lint the codebase:
   ```bash
   npm run lint
   ```

8. To build for production:
   ```bash
   npm run build
   ```
   The compiled output goes into the `dist/` folder. The included `vercel.json` is pre-configured for a Vercel deployment (SPA rewrites + caching + security headers) — connect the repo to Vercel and add `VITE_CLERK_PUBLISHABLE_KEY` as an environment variable there too.

9. To preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Notes & Limitations

- **No real backend or payment gateway** — the "Place Order" flow in the Cart page simulates a successful checkout (confirmation screen + redirect) but does not process any real payment or persist orders anywhere; there's no order-history page.
- **Wishlist and cart are per-browser** — since both are stored in `localStorage` rather than tied to the signed-in Clerk account, they won't follow a user across devices or browsers.
- **Product data is third-party** — all products, prices, images, and reviews come from the public DummyJSON API and are not NovaShop's own inventory.

---

## Repository

[https://github.com/tripathipawan/Nova_Shop](https://github.com/tripathipawan/Nova_Shop)
