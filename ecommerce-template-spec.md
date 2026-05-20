# PRD: E-commerce Online Store Template

**Project**: MiPaginaWeb Template Gallery
**Template ID**: `tienda-online`
**Status**: Draft
**Author**: Alex (PM)
**Last Updated**: 2026-05-19
**Version**: 1.0

---

## 1. Problem Statement

MiPaginaWeb's gallery currently has placeholder entries for e-commerce templates (#3 "Tienda Online", #9 "Marketplace", #12 "Inmobiliaria"), but only one partial React demo exists. Customers browsing the gallery need to see a fully interactive, realistic e-commerce experience — not just a static mockup — to evaluate whether the template fits their business needs.

Without a complete e-commerce demo, potential customers cannot visualize their own online store running on the platform, reducing conversion from gallery browse to purchase.

**Evidence:**
- Existing EcommerceDemo.jsx is functional but limited (8 products, no images, emoji placeholders, no product detail page with gallery, no persistent cart)
- The `Tienda Online` entry in the gallery is the #3 most-clicked preview based on nav order — demand is high
- No standalone e-commerce template exists in the `public/templates/` directory (only `rizoma-space/` is there)
- Competitor galleries show multi-page e-commerce experiences with real-looking products

---

## 2. Template Architecture Decision

### Two-Mode Delivery

This template will be built in **two forms** to support both current and future needs:

| Mode | Location | Technology | When Used |
|------|----------|-----------|-----------|
| **Standalone HTML** | `public/templates/tienda-online/index.html` | Vanilla HTML/CSS/JS (SPA-style) | Iframe preview from gallery |
| **React Demo** | `src/demos/EcommerceDemo.jsx` (enhanced) | React + Tailwind | Inline preview for gallery |

For v1, we build the **standalone HTML** template first. The React demo will be updated separately to match.

### Standalone Template File Structure

```
public/templates/tienda-online/
├── index.html          # Main entry — all HTML + inlined CSS/JS
├── styles.css          # All styles (separated for maintainability)
└── script.js           # All JavaScript (SPA routing, cart, interactions)
```

All three files are served from the same directory. The iframe in PreviewPage.jsx loads `/templates/tienda-online/index.html`. The `<base href="/templates/tienda-online/">` tag ensures relative asset paths resolve correctly.

---

## 3. Pages & Sections

The template is a single-page application (SPA) using hash-based routing in vanilla JS. Every page is a section shown/hidden via a simple router.

### Page 1: Home (`#home`)

| Element | Description |
|---------|-------------|
| **Header** | Logo ("Shopify" - generic), nav links (Home, Catalog, Categories, Contact), cart icon with badge, mobile hamburger menu |
| **Hero Banner** | Full-width promotional banner with CTA: "Descuentos de hasta 40% en toda la tienda" → "Comprar Ahora" button |
| **Category Cards** | 6 category cards in a responsive grid (3-col desktop, 2-col tablet, 1-col mobile). Each card: category icon/illustration, name, product count |
| **Featured Products** | Horizontal scroll or grid of 4 featured/trending product cards with "Agregar" button |
| **Benefits Bar** | 3-column row: Envío Gratis (over $50k) · Devoluciones Fáciles (30 days) · Pago Seguro |
| **Newsletter** | Email input + "Suscribirse" button. Shows confirmation toast on submit. |
| **Footer** | Store name, social icons, "Demo — Tienda de ejemplo MiPaginaWeb" |

### Page 2: Product Catalog (`#catalog`)

| Element | Description |
|---------|-------------|
| **Breadcrumb** | Inicio > Catálogo |
| **Page Title** | "Catálogo de Productos" with result count |
| **Active Filters Bar** | Shows active category + search term. Clear filter button. |
| **Search Bar** | Text input with search icon. Filters products in real-time as user types. |
| **Category Filter Pills** | Horizontal scrollable row of pill buttons: Todas | Electrónica | Ropa | Hogar | Deportes | Libros | Belleza. Active pill is highlighted. |
| **Sort Dropdown** | Sort by: Precio: menor a mayor | Precio: mayor a menor | Nombre A-Z | Nombre Z-A |
| **Product Grid** | Responsive grid (4-col desktop, 2-col tablet, 1-col mobile). Each card: |
| | — Product image (placeholder image, 4:3 aspect ratio, object-fit cover) |
| | — Category label (small, muted) |
| | — Product name (link to detail) |
| | — Price (bold, accent color) |
| | — "Agregar al Carrito" button (primary CTA) |
| | — Badge if on sale ("Oferta", "Nuevo") |
| **Empty State** | If no products match filters: illustration, "No encontramos productos", "Limpiar filtros" button |

### Page 3: Product Detail (`#product-{id}`)

| Element | Description |
|---------|-------------|
| **Breadcrumb** | Inicio > Catálogo > [Category] > [Product Name] |
| **Image Gallery** | Main large product image (placeholder). Thumbnail strip below (3-4 thumbnails for same product with different angles/colors). Click thumbnail to swap main image. |
| **Product Info** | — Product name (h1) |
| | — Rating stars (static visual, 4.5/5) |
| | — Price (large, bold) |
| | — Original price with strikethrough + discount badge (if on sale) |
| | — Short description (2-3 sentences) |
| | — "Disponible en stock" indicator (green dot + text) |
| **Variant Selector** | If product has variants: color swatches (4 circles) and/or size selector (S/M/L/XL buttons). Selecting a variant changes the main image. |
| **Quantity Selector** | - [number] + with min=1, max=10 |
| **Add to Cart Button** | Large primary button: "Agregar al Carrito". Shows brief "✓ Agregado" state for 1.5s after click. |
| **Product Details Accordion** | Collapsible sections: |
| | — Descripción (full description) |
| | — Características (bullet list of features) |
| | — Envío y Devoluciones (shipping/return policy text) |
| **Related Products** | Horizontal row of 4 related products from the same category |

### Page 4: Shopping Cart (`#cart`)

| Element | Description |
|---------|-------------|
| **Page Title** | "Carrito de Compras" with item count |
| **Back Button** | ← Seguir Comprando (goes to catalog) |
| **Empty State** | Illustration, "Tu carrito está vacío", "Explorar Productos" CTA button |
| **Cart Items List** | Each item row: |
| | — Small product image (thumbnail) |
| | — Product name + variant info (color/size if applicable) |
| | — Unit price |
| | — Quantity controls: - [number] + (min 1, remove at 0) |
| | — Line total |
| | — Remove button (trash icon, with confirmation if desired) |
| **Order Summary Sidebar** (below cart on mobile) |
| | — Subtotal |
| | — Shipping (calculated: Free over $50,000 CLP, otherwise $4,990 CLP) |
| | — Estimated Tax (19% IVA for demo) |
| | — **Total** (bold, large) |
| | — "Proceder al Pago" button (primary CTA, goes to checkout) |

### Page 5: Checkout (`#checkout`)

| Element | Description |
|---------|-------------|
| **Step Indicator** | 3 visual steps: 1. Envío → 2. Pago → 3. Confirmación. Current step highlighted. |
| **Layout** | Two-column on desktop: form (left) + order summary (right). Single column on mobile. |
| **Step 1: Shipping Information** |
| | — Full Name (required) |
| | — Email (required, email validation) |
| | — Phone (required) |
| | — Address (required) |
| | — City (required) |
| | — Region/State (dropdown) |
| | — ZIP/Postal Code |
| | — Shipping Method: Standard (5-7 días, free) / Express (2-3 días, $3,990 CLP) |
| | — "Continuar al Pago" button |
| **Step 2: Payment Method** |
| | — Payment options (radio cards): |
| | — Tarjeta de Crédito / Débito (demo — shows masked card fields) |
| | — Transferencia Bancaria (demo — shows account info) |
| | — PayPal (demo — shows PayPal logo) |
| | — **Demo disclaimer banner**: "🔒 Esta es una demostración. No se procesarán pagos reales." (prominent, yellow/amber background) |
| | — If Credit Card selected: Card number, Expiry, CVC, Name on card (all masked, non-functional) |
| | — "Revisar Pedido" button |
| **Step 3: Order Review** |
| | — Summary: Shipping address, shipping method, payment method (masked) |
| | — Item list with quantities and prices |
| | — Order total breakdown |
| | — "Confirmar Pedido" button |
| | — Small text below: "Al confirmar, aceptas nuestros Términos y Condiciones." |
| **Back Button** | ← Volver (goes to previous step) |

### Page 6: Order Confirmation (`#confirmation`)

| Element | Description |
|---------|-------------|
| **Success Icon** | Green checkmark animation |
| **Title** | "¡Pedido Confirmado!" |
| **Demo Notice** | **Prominent banner**: "🚀 Esta es una demostración interactiva. No se ha realizado ningún cobro real. En MiPaginaWeb creamos tu tienda online real con pasarela de pago integrada." |
| **Order Number** | Auto-generated: #MPW-{random 6 digits} |
| **Order Summary** | Items, quantities, totals |
| **Shipping Info** | Name, address, method |
| **CTA Buttons** | "Seguir Comprando" (primary) · "Ver MiPaginaWeb" (secondary link to main site) |

### Global Elements

| Element | Behavior |
|---------|----------|
| **Header** | Sticky top. Logo left, nav center, cart icon right. Cart badge shows item count. On scroll, subtle shadow appears. Mobile: hamburger icon toggles slide-down nav. |
| **Cart Badge** | Shows total number of items in cart. Pulsing animation briefly when item added. |
| **Cart Drawer** | Slide-in panel from right (mobile-friendly overlay). Shows cart items, total, and "Ver Carrito" link. Toggled by cart icon. |
| **Footer** | Copyright, "Demo — Tienda de ejemplo", link to mipaginaweb. Minimal, does not distract from demo. |
| **Toast Notifications** | Bottom-right toasts for: "Producto agregado al carrito", "Producto eliminado", "Pedido confirmado". Auto-dismiss after 3s. |

---

## 4. Products & Catalog Data

### Categories

| ID | Name | Icon | Slug | Product Count |
|----|------|------|------|---------------|
| 1 | Electrónica | `fa-solid fa-headphones` | electronica | 6 |
| 2 | Ropa y Moda | `fa-solid fa-shirt` | ropa | 6 |
| 3 | Hogar y Jardín | `fa-solid fa-house-chimney` | hogar | 6 |
| 4 | Deportes | `fa-solid fa-dumbbell` | deportes | 6 |
| 5 | Libros y Media | `fa-solid fa-book` | libros | 6 |
| 6 | Belleza y Salud | `fa-solid fa-spa` | belleza | 6 |

### Product Data Schema

```javascript
{
  id: 101,
  name: "Auriculares Bluetooth Pro",
  slug: "auriculares-bluetooth-pro",
  category: "Electrónica",
  categoryId: 1,
  price: 45990,
  originalPrice: 59990,    // null if not on sale
  badge: "Oferta",          // "Oferta" | "Nuevo" | "Más Vendido" | null
  rating: 4.5,
  description: "Auriculares inalámbricos con cancelación de ruido activa, 30 horas de batería y sonido de alta fidelidad. Cómodos diademas ajustables y micrófono incorporado.",
  features: [
    "Cancelación de ruido activa (ANC)",
    "30 horas de reproducción",
    "Bluetooth 5.3",
    "Micrófono con reducción de ruido",
    "Plegables y portátiles"
  ],
  images: [    // All using picsum.photos or placeholder services
    "https://picsum.photos/seed/headphones1/600/600",
    "https://picsum.photos/seed/headphones2/600/600",
    "https://picsum.photos/seed/headphones3/600/600",
    "https://picsum.photos/seed/headphones4/600/600"
  ],
  colors: ["Negro", "Blanco", "Azul"],
  sizes: null,
  shippingInfo: "Envío estándar: 5-7 días hábiles. Devoluciones gratuitas dentro de 30 días.",
  stock: true
}
```

### Full Product List (36 products, 6 per category)

#### Electrónica
| ID | Name | Price | Original | Badge |
|----|------|-------|----------|-------|
| 101 | Auriculares Bluetooth Pro | $45,990 | $59,990 | Oferta |
| 102 | Parlante Portátil Resistente | $32,990 | — | Nuevo |
| 103 | Reloj Inteligente Deportivo | $89,990 | — | Más Vendido |
| 104 | Hub USB-C Multipuerto | $24,990 | — | — |
| 105 | Cargador Inalámbrico Rápido | $19,990 | — | — |
| 106 | Cámara Digital Compacta | $159,990 | $189,990 | Oferta |

#### Ropa y Moda
| ID | Name | Price | Original | Badge |
|----|------|-------|----------|-------|
| 201 | Polerón Oversize Premium | $34,990 | — | Nuevo |
| 202 | Zapatillas Urbanas Clásicas | $59,990 | — | Más Vendido |
| 203 | Chaqueta Impermeable | $79,990 | — | — |
| 204 | Mochila Ejecutiva Cuero | $49,990 | $65,990 | Oferta |
| 205 | Camiseta Algodón Orgánico | $14,990 | — | — |
| 206 | Vestido Verano Floral | $29,990 | — | Nuevo |

#### Hogar y Jardín
| ID | Name | Price | Original | Badge |
|----|------|-------|----------|-------|
| 301 | Set Macetas Decorativas (3) | $24,990 | — | — |
| 302 | Vela Aromática Premium | $12,990 | — | Más Vendido |
| 303 | Cojín Decorativo Grande | $18,990 | — | — |
| 304 | Set Tazas Artesanales (4) | $22,990 | $29,990 | Oferta |
| 305 | Guirnalda LED 10m | $15,990 | — | — |
| 306 | Estante Flotante Madera | $34,990 | — | Nuevo |

#### Deportes y Aire Libre
| ID | Name | Price | Original | Badge |
|----|------|-------|----------|-------|
| 401 | Esterilla Yoga Premium | $29,990 | — | — |
| 402 | Set Bandas Resistencia (5) | $14,990 | — | — |
| 403 | Botella Térmica Acero 1L | $19,990 | — | Más Vendido |
| 404 | Cuerda Saltar Profesional | $9,990 | — | — |
| 405 | Bolso Deportivo Impermeable | $39,990 | $49,990 | Oferta |
| 406 | Rodillo Espuma Recuperación | $21,990 | — | Nuevo |

#### Libros y Media
| ID | Name | Price | Original | Badge |
|----|------|-------|----------|-------|
| 501 | Libro: Cocina Saludable | $18,990 | — | Más Vendido |
| 502 | Libro: Saga Fantástica (3 tomos) | $35,990 | $42,990 | Oferta |
| 503 | Libreta Piel Reciclada | $12,990 | — | — |
| 504 | Set Acuarelas Profesional (24) | $24,990 | — | Nuevo |
| 505 | Guía de Viajes: Europa | $15,990 | — | — |
| 506 | Mapa Mundi Pared Decorativo | $28,990 | — | — |

#### Belleza y Salud
| ID | Name | Price | Original | Badge |
|----|------|-------|----------|-------|
| 601 | Set Serum Facial + Crema | $32,990 | $42,990 | Oferta |
| 602 | Difusor Aromaterapia | $25,990 | — | — |
| 603 | Set Jabones Artesanales (6) | $16,990 | — | Nuevo |
| 604 | Aceite Esencial Lavanda | $11,990 | — | Más Vendido |
| 605 | Cepillo Secado Rápido | $19,990 | — | — |
| 606 | Set Bombas Baño (5) | $14,990 | — | — |

**Price format**: All prices in CLP (Chilean Pesos), formatted with `$XX.XXX` (dot as thousands separator). This gives a realistic local e-commerce feel.

---

## 5. User Flows

### Primary Flow: Browse → Purchase

```
Home Page
  │
  ├─ Click category card → Catalog (filtered to that category)
  │     │
  │     ├─ Click product card → Product Detail
  │     │     │
  │     │     └─ Click "Agregar al Carrito"
  │     │           │
  │     │           ├─ Toast: "✓ Producto agregado"
  │     │           ├─ Cart badge increments (+1)
  │     │           └─ Cart drawer slides in (optional immediate feedback)
  │     │
  │     └─ Click "Agregar al Carrito" directly on card → same feedback
  │
  ├─ Click product in Featured → Product Detail
  │
  └─ Click "Comprar Ahora" in Hero → Catalog (all products)
```

### Secondary Flow: Direct Cart → Checkout

```
Header Cart Icon → Cart Drawer
  │
  ├─ "Ver Carrito" link → Cart Page
  │     │
  │     ├─ Adjust quantities
  │     ├─ Remove items
  │     └─ "Proceder al Pago" → Checkout
  │
  └─ "Proceder al Pago" (in drawer) → Checkout
```

### Checkout Flow

```
Checkout Step 1: Shipping Info
  │
  ├─ Fill form fields
  ├─ Select shipping method
  └─ "Continuar al Pago" → Step 2 (with validation)

Checkout Step 2: Payment Method
  │
  ├─ Select payment method (radio cards)
  ├─ If Credit Card: fill masked fields
  ├─ See demo disclaimer banner
  └─ "Revisar Pedido" → Step 3

Checkout Step 3: Review & Confirm
  │
  ├─ Review all information
  ├─ Edit links to go back to previous steps
  └─ "Confirmar Pedido" → Order Confirmation
       │
       ├─ Green checkmark animation
       ├─ Demo disclaimer
       ├─ Order number
       ├─ Cart is cleared
       └─ "Seguir Comprando" → back to catalog
```

---

## 6. Interactive Features — Detailed Spec

### 6.1 Navigation & Routing

```
┌──────────────────────────────────────────────┐
│  Hash-based SPA Router                        │
│                                               │
│  #home          → Home page                   │
│  #catalog       → Catalog (all products)      │
│  #catalog?cat=2 → Catalog filtered by cat ID  │
│  #catalog?q=    → Catalog with search term    │
│  #product-{id}  → Product detail page         │
│  #cart           → Cart page                  │
│  #checkout      → Checkout page               │
│  #confirmation  → Order confirmation          │
└──────────────────────────────────────────────┘
```

- URL updates on every navigation (pushState or hashchange)
- Browser back/forward buttons work correctly
- Page title updates per section

### 6.2 Search

- Input with debounce (300ms) on `#catalog` page
- Filters products array by name match (case-insensitive)
- Category filter and search can be active simultaneously
- Results update in real-time (no page reload)
- Clear search with "X" button in search field

### 6.3 Category Filtering

- Pill-style buttons in catalog page
- Clicking a pill adds `?cat={id}` to the URL hash
- Active pill has distinct visual state (filled background)
- "Todas" resets the filter
- Clicking a category on the Home page navigates to `#catalog?cat={id}`

### 6.4 Sorting

- Dropdown with 4 options
- Sort is applied client-side on the filtered product array
- Default sort: featured (by ID order)
- Other options: price ascending, price descending, name A-Z, name Z-A

### 6.5 Product Detail Variants

- Products with `colors` array show circular color swatches
- Products with `sizes` array show size buttons
- Selecting a variant should, at minimum, visually indicate selection
- If product has variant images (future enhancement), swapping variant could swap main image

### 6.6 Add to Cart

- Click product card "Agregar" button or detail page button
- Button shows brief success state: "✓ Agregado" (green) for 1.5 seconds, then reverts
- Toast notification: "Producto agregado al carrito"
- Cart badge increments with animation (pulse scale)
- Cart drawer opens automatically (optional, desktop only)

### 6.7 Cart Drawer (Slide-in Panel)

- Triggered by cart icon in header
- Smooth slide-in from right (CSS transition, 300ms)
- Overlay backdrop (semi-transparent black)
- Shows cart items in compact format (image, name, qty × price, total)
- Quantity +/- controls inline
- Remove button per item
- Subtotal at bottom
- "Ver Carrito Completo" link → `#cart`
- "Proceder al Pago" button → `#checkout`
- Close button and click-outside-to-close

### 6.8 Cart Page (Full View)

- All items listed with full details
- Quantity controls (min 1, remove if decremented below 1)
- Remove button with optional "¿Eliminar?" confirmation
- Order summary sidebar with subtotal, shipping, tax, total
- Shipping calculation:
  - If subtotal ≥ $50,000 CLP → Free
  - If subtotal < $50,000 CLP → $4,990 CLP
- Tax: 19% IVA on subtotal
- Empty state with illustration

### 6.9 Checkout Multi-Step

- Form validation:
  - Required fields marked with `*`
  - Email format validation (regex)
  - ZIP code optional but format-checked if entered
  - Step 1 → Step 2 blocked if required fields are empty
- Shipping method affects total (standard free, express +$3,990)
- Payment method selection is visual only — no real processing
- Demo disclaimer is prominent and visible in the payment step
- Edit links in Step 3 navigate back to the appropriate step with data preserved

### 6.10 Order Confirmation

- Animated checkmark (CSS animation, scale-in + rotate)
- Clear cart from localStorage after confirmation
- Display random order number: `#MPW-{random 100000-999999}`
- Demo disclaimer with link to mipaginaweb
- "Seguir Comprando" button navigates to catalog

### 6.11 Toast Notifications

- Fixed position bottom-right
- Styled container for toasts
- Types: success (green), info (blue), error (red)
- Auto-dismiss after 3 seconds
- Max 3 visible toasts stacked
- Manual dismiss via close button
- Events: add to cart, remove from cart, order confirmed

---

## 7. Cart Implementation: localStorage

### Data Structure

```javascript
// Key in localStorage: 'tienda_cart'

// Value: JSON array of cart items
[
  {
    id: 101,
    name: "Auriculares Bluetooth Pro",
    price: 45990,
    image: "https://picsum.photos/seed/headphones1/100/100",
    quantity: 2,
    color: "Negro",     // null if no variant selected
    size: null           // null if no variant selected
  }
]
```

### Cart API (JavaScript Module)

```javascript
// cart.js — Global cart management

const CART_KEY = 'tienda_cart'

function getCart()                      // Returns array of items ([] if empty)
function addToCart(product, qty, color, size)  // Adds or increments. Returns updated cart.
function removeFromCart(productId)       // Removes item entirely.
function updateQuantity(productId, qty)  // Sets exact quantity. Removes if qty ≤ 0.
function clearCart()                     // Empties cart.
function getCartCount()                  // Returns total item count.
function getCartSubtotal()              // Returns sum of price × qty.
function getCartShipping(subtotal)      // Returns shipping cost based on subtotal threshold.
function getCartTax(subtotal)           // Returns 19% of subtotal.
function getCartTotal()                  // Returns subtotal + shipping + tax.
```

### Events & Syncing

```javascript
// Dispatch custom events for UI reactivity

function addToCart(product) {
  // ... update localStorage
  window.dispatchEvent(new CustomEvent('cart:updated', {
    detail: { action: 'add', productId: product.id }
  }))
}

// Listeners in header (badge), cart drawer, cart page
document.addEventListener('cart:updated', updateUI)
```

### Storage Management

- **Initialization**: On page load, check if `tienda_cart` exists and is valid JSON. If not, initialize to `[]`.
- **Validation**: On reads, validate JSON parse. If corrupted, reset to `[]`.
- **Cross-tab sync**: Listen for `storage` event to sync cart if user opens multiple tabs.
- **No migration needed**: v1 only. Future versions can add version key if needed.

### Why localStorage Over Alternatives

| Approach | Decision | Rationale |
|----------|----------|-----------|
| **localStorage** | ✅ **Selected** | Persists across page refreshes and within-session navigation. Survives iframe reloads. Simple API with no dependencies. Enough capacity for 36 products. |
| In-memory (JS object) | ❌ Rejected | Lost on page refresh. Since we use hash-based routing with full page simulation, user might refresh and lose cart. |
| sessionStorage | ❌ Rejected | Lost when tab closes. Less intuitive than localStorage for this use case. |
| IndexedDB | ❌ Rejected | Overkill for 36 products. Too complex for a template demo. |

---

## 8. Visual Design & Layout

### Design Direction

- **Vibe**: Modern, clean, trustworthy e-commerce. Similar to Mercado Libre / Falabella aesthetic — familiar to Latin American users.
- **Color Palette**: 
  - Primary: Blue-600 (`#2563eb`) — buttons, links, accents
  - Primary hover: Blue-700 (`#1d4ed8`)
  - Secondary: Orange-500 (`#f97316`) — sale badges, promotions
  - Background: White (`#ffffff`) — page background
  - Surface: Gray-50 (`#f9fafb`) — card backgrounds
  - Text: Gray-900 (`#111827`) — headings
  - Text muted: Gray-500 (`#6b7280`) — body, labels
  - Success: Green-500 (`#22c55e`) — confirmation, stock available
  - Error: Red-500 (`#ef4444`) — validation, out of stock
- **Typography**: Inter (Google Font) — body and headings
- **Border Radius**: `12px` (cards), `8px` (buttons), `9999px` (pills/badges)
- **Shadows**: Subtle (`0 1px 3px rgba(0,0,0,0.08)`) for cards, elevated (`0 10px 25px rgba(0,0,0,0.12)`) for modals/drawers
- **Icons**: Font Awesome 6 (free) for all icons

### Layout Breakpoints

| Breakpoint | Device | Grid Columns |
|-----------|--------|-------------|
| < 640px | Mobile | 1 col |
| 640–1023px | Tablet | 2 cols |
| 1024px+ | Desktop | 4 cols (catalog), 2 cols (checkout) |

### Product Images

Use `https://picsum.photos/seed/{seed}/{width}/{height}` for consistent, reproducible placeholder images. Each product gets a unique seed string based on its slug.

Example:
- `https://picsum.photos/seed/auriculares-bluetooth-pro/600/600` — main image
- `https://picsum.photos/seed/auriculares-bluetooth-pro-2/600/600` — thumbnail 2
- `https://picsum.photos/seed/auriculares-bluetooth-pro-3/600/600` — thumbnail 3

For thumbnails in cart, use `100/100`.

---

## 9. Technical Constraints

### SEO / Meta (for iframe context)
- `<meta name="robots" content="noindex, nofollow">` — template is a demo, not public content
- `<base href="/templates/tienda-online/">` — so relative paths work in iframe context

### Performance
- No external dependencies beyond Font Awesome and Google Fonts
- All JS vanilla — no frameworks or build steps
- CSS should be efficient — no preprocessors
- Product data defined as a JavaScript array — no fetch needed

### Browser Support
- Modern browsers only (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Uses CSS Grid, Flexbox, CSS Custom Properties, `localStorage`

### Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<button>`, etc.)
- `aria-label` on icon buttons
- Focus management on cart drawer open/close
- Skip-to-content link (optional but nice)
- Form inputs have associated `<label>` elements (not just placeholders)

---

## 10. Launch Plan

| Phase | Date | Scope |
|-------|------|-------|
| Build standalone HTML template | Sprint 1 | All pages, products, cart, checkout |
| QA pass | Sprint 1 + 2 days | Test all flows, edge cases, mobile |
| Add to preview system | Sprint 1 + 1 day | Register in PreviewPage.jsx + App.jsx |
| Update screenshot | Sprint 1 + 2 days | Capture screenshots for gallery card |
| Gallery deploy | Sprint 2 | Deploy to Vercel with new template |

### Registration in Gallery

**App.jsx changes**: Update the `Tienda Online` template entry to point to the standalone iframe:

```javascript
// In templateLookup in PreviewPage.jsx — already points to EcommerceDemo
// Add to standaloneTemplates:
const standaloneTemplates = {
  'contenedores': '/templates/rizoma-space/index.html',
  'tienda-online': '/templates/tienda-online/index.html',  // NEW
}
```

Update template id:3 in App.jsx to reference `tienda-online` slug and improve its screenshot.

### In PreviewPage.jsx routing

```javascript
const standaloneTemplates = {
  'contenedores': '/templates/rizoma-space/index.html',
  'tienda-online': '/templates/tienda-online/index.html',
}
```

And map template id 3 to 'tienda-online' slug.

---

## 11. Out of Scope (v1)

| Feature | Reason | Future Consideration |
|---------|--------|---------------------|
| Real payment gateway | Template expects demo mode only | Could add Stripe test mode for v2 |
| User accounts / login | Adds auth complexity unnecessary for demo | Could add for v2 with saved addresses |
| Product reviews from users | Static ratings are sufficient for demo | Could make interactive for v2 |
| Wishlist / favorites | Nice-to-have, adds scope | v2 or separate React enhancement |
| Admin dashboard | Entirely separate product | Not part of template scope |
| Multi-language | Spanish-only for v1 | Could add i18n for v2 |
| Dark mode | One theme is sufficient for template demo | Could add toggle |
| Infinite scroll / pagination | 36 products fits on one scroll | Add if product count grows |
| Image zoom on product detail | Nice-to-have visual enhancement | Add if time permits |
| Advanced filtering (price range, ratings) | Category + search covers demo needs | Add for v2 |

---

## 12. Open Questions

| Question | Owner | Deadline | Resolution |
|----------|-------|----------|-----------|
| Should the React EcommerceDemo be updated to match this spec's design? | PM + Dev | Sprint 2 | Yes — after standalone template is complete |
| What is the preferred placeholder image service reliability? | Dev | Sprint 1 | Use picsum.photos with seed for consistency |
| Do we need the cart drawer AND cart page, or just one? | PM | Sprint 1 | Both — drawer for quick access, page for full management |
| Should checkout form data persist if user navigates away? | PM | Sprint 1 | No — session-level only. Cleared on confirmation. |

---

## 13. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Gallery click-through rate | 15% of visitors click "Tienda Online" preview | Vercel analytics |
| Time spent in iframe preview | > 60s average | Iframe interaction tracking |
| Template completeness score | 100% of flows work end-to-end | Manual QA checklist |
| Bug count at launch | 0 P0, < 3 total | QA pass before deploy |

---

## Appendix A: Product Data (JSON)

<details>
<summary>Full product data array (36 items)</summary>

```javascript
const products = [
  // ── Electrónica ──
  { id: 101, name: "Auriculares Bluetooth Pro", slug: "auriculares-bluetooth-pro", category: "Electrónica", categoryId: 1, price: 45990, originalPrice: 59990, badge: "Oferta", rating: 4.5, description: "Auriculares inalámbricos con cancelación de ruido activa...", features: ["Cancelación de ruido activa", "30h de batería", "Bluetooth 5.3", "Micrófono integrado", "Plegables"], images: ["headphones1","headphones2","headphones3","headphones4"], colors: ["Negro","Blanco","Azul"], sizes: null, stock: true },
  { id: 102, name: "Parlante Portátil Resistente", slug: "parlante-portatil-resistente", category: "Electrónica", categoryId: 1, price: 32990, originalPrice: null, badge: "Nuevo", rating: 4.3, description: "Parlante bluetooth portátil con resistencia al agua IP67...", features: ["Resistente al agua IP67", "20h de batería", "Sonido 360°", "Conexión multipunto"], images: ["speaker1","speaker2","speaker3"], colors: ["Negro","Verde","Naranja"], sizes: null, stock: true },
  { id: 103, name: "Reloj Inteligente Deportivo", slug: "reloj-inteligente-deportivo", category: "Electrónica", categoryId: 1, price: 89990, originalPrice: null, badge: "Más Vendido", rating: 4.7, description: "Smartwatch con GPS, monitor cardíaco y 50 modos deportivos...", features: ["GPS integrado", "Monitor cardíaco", "50 modos deportivos", "7 días batería", "Notificaciones"], images: ["watch1","watch2","watch3"], colors: ["Negro","Plata","Oro"], sizes: null, stock: true },
  { id: 104, name: "Hub USB-C Multipuerto", slug: "hub-usb-c-multipuerto", category: "Electrónica", categoryId: 1, price: 24990, originalPrice: null, badge: null, rating: 4.2, description: "Hub USB-C con 7 puertos: HDMI 4K, USB 3.0 x3, SD/TF, PD 100W...", features: ["HDMI 4K 60Hz", "USB 3.0 x3", "Lector SD/TF", "Carga PD 100W", "Aluminio"], images: ["hub1","hub2","hub3"], colors: ["Gris","Plateado"], sizes: null, stock: true },
  { id: 105, name: "Cargador Inalámbrico Rápido", slug: "cargador-inalambrico-rapido", category: "Electrónica", categoryId: 1, price: 19990, originalPrice: null, badge: null, rating: 4.1, description: "Cargador inalámbrico Qi de 15W con carga rápida...", features: ["Carga rápida 15W", "Compatible Qi", "Base antideslizante", "Protección sobrecarga"], images: ["charger1","charger2","charger3"], colors: ["Negro","Blanco"], sizes: null, stock: true },
  { id: 106, name: "Cámara Digital Compacta", slug: "camara-digital-compacta", category: "Electrónica", categoryId: 1, price: 159990, originalPrice: 189990, badge: "Oferta", rating: 4.6, description: "Cámara compacta con sensor de 24MP y zoom óptico 10x...", features: ["Sensor 24MP", "Zoom óptico 10x", "Grabación 4K", "WiFi integrado", "Pantalla táctil"], images: ["camera1","camera2","camera3","camera4"], colors: ["Negro","Plateado"], sizes: null, stock: true },

  // ── Ropa y Moda ──
  { id: 201, name: "Polerón Oversize Premium", slug: "poleron-oversize-premium", category: "Ropa y Moda", categoryId: 2, price: 34990, originalPrice: null, badge: "Nuevo", rating: 4.4, description: "Polerón oversize de algodón premium con capucha y bolsillo canguro...", features: ["Algodón premium 380g", "Capucha ajustable", "Bolsillo canguro", "Puños elastizados"], images: ["hoodie1","hoodie2","hoodie3"], colors: ["Negro","Gris","Verde Oliva","Mostaza"], sizes: ["S","M","L","XL"], stock: true },
  { id: 202, name: "Zapatillas Urbanas Clásicas", slug: "zapatillas-urbanas-clasicas", category: "Ropa y Moda", categoryId: 2, price: 59990, originalPrice: null, badge: "Más Vendido", rating: 4.8, description: "Zapatillas urbanas con diseño clásico y suela amortiguada...", features: ["Suela amortiguada", "Cuero sintético", "Plantilla removible", "Cordones clásicos"], images: ["shoes1","shoes2","shoes3","shoes4"], colors: ["Blanco","Negro","Rojo"], sizes: ["38","39","40","41","42","43","44"], stock: true },
  { id: 203, name: "Chaqueta Impermeable", slug: "chaqueta-impermeable", category: "Ropa y Moda", categoryId: 2, price: 79990, originalPrice: null, badge: null, rating: 4.3, description: "Chaqueta impermeable y cortaviento para actividades al aire libre...", features: ["Impermeable 10.000mm", "Costuras selladas", "Capucha desmontable", "Bolsa de transporte"], images: ["jacket1","jacket2","jacket3"], colors: ["Negro","Azul","Rojo"], sizes: ["S","M","L","XL","XXL"], stock: true },
  { id: 204, name: "Mochila Ejecutiva Cuero", slug: "mochila-ejecutiva-cuero", category: "Ropa y Moda", categoryId: 2, price: 49990, originalPrice: 65990, badge: "Oferta", rating: 4.5, description: "Mochila ejecutiva de cuero genuino con compartimiento para laptop...", features: ["Cuero genuino", "Compartimiento laptop 15\"", "Bolsillo antirobo", "Carga USB externa"], images: ["bag1","bag2","bag3"], colors: ["Café","Negro"], sizes: null, stock: true },
  { id: 205, name: "Camiseta Algodón Orgánico", slug: "camiseta-algodon-organico", category: "Ropa y Moda", categoryId: 2, price: 14990, originalPrice: null, badge: null, rating: 4.2, description: "Camiseta de algodón orgánico 100% certificado, corte regular...", features: ["Algodón orgánico certificado", "Corte regular", "Cuello redondo", "Lavado a máquina"], images: ["tshirt1","tshirt2","tshirt3"], colors: ["Blanco","Negro","Celeste","Gris"], sizes: ["S","M","L","XL"], stock: true },
  { id: 206, name: "Vestido Verano Floral", slug: "vestido-verano-floral", category: "Ropa y Moda", categoryId: 2, price: 29990, originalPrice: null, badge: "Nuevo", rating: 4.0, description: "Vestido ligero con estampado floral, ideal para días cálidos...", features: ["Tela ligera", "Estampado floral", "Manga corta", "Largo rodilla"], images: ["dress1","dress2","dress3"], colors: ["Azul","Rojo","Amarillo"], sizes: ["S","M","L","XL"], stock: true },

  // ── Hogar y Jardín ──
  { id: 301, name: "Set Macetas Decorativas (3)", slug: "set-macetas-decorativas", category: "Hogar y Jardín", categoryId: 3, price: 24990, originalPrice: null, badge: null, rating: 4.6, description: "Set de 3 macetas decorativas de cerámica con diseños únicos...", features: ["Cerámica esmaltada", "3 tamaños", "Orificio drenaje", "Base incluida"], images: ["pots1","pots2","pots3"], colors: ["Blanco","Terracota","Menta"], sizes: null, stock: true },
  { id: 302, name: "Vela Aromática Premium", slug: "vela-aromatica-premium", category: "Hogar y Jardín", categoryId: 3, price: 12990, originalPrice: null, badge: "Más Vendido", rating: 4.7, description: "Vela aromática artesanal con cera de soya y aceites esenciales...", features: ["Cera de soya natural", "40 horas duración", "Aceites esenciales", "Frasco de vidrio"], images: ["candle1","candle2","candle3"], colors: ["Vainilla","Lavanda","Eucalipto","Canela"], sizes: null, stock: true },
  { id: 303, name: "Cojín Decorativo Grande", slug: "cojin-decorativo-grande", category: "Hogar y Jardín", categoryId: 3, price: 18990, originalPrice: null, badge: null, rating: 4.1, description: "Cojín decorativo de 50x50cm con funda removible y textura suave...", features: ["50x50cm", "Funda removible", "Relleno hipoalergénico", "Textura suave"], images: ["cushion1","cushion2","cushion3"], colors: ["Gris","Beige","Azul Marino","Terracota"], sizes: null, stock: true },
  { id: 304, name: "Set Tazas Artesanales (4)", slug: "set-tazas-artesanales", category: "Hogar y Jardín", categoryId: 3, price: 22990, originalPrice: 29990, badge: "Oferta", rating: 4.4, description: "Set de 4 tazas artesanales hechas a mano con esmalte brillante...", features: ["Hechas a mano", "Esmalte brillante", "4 diseños únicos", "300ml capacidad"], images: ["mugs1","mugs2","mugs3"], colors: ["Multicolor"], sizes: null, stock: true },
  { id: 305, name: "Guirnalda LED 10m", slug: "guirnalda-led-10m", category: "Hogar y Jardín", categoryId: 3, price: 15990, originalPrice: null, badge: null, rating: 4.3, description: "Guirnalda LED de 10 metros con 100 luces cálidas...", features: ["10m de largo", "100 luces LED", "8 modos de luz", "Bajo consumo"], images: ["lights1","lights2","lights3"], colors: ["Cálida","Multicolor"], sizes: null, stock: true },
  { id: 306, name: "Estante Flotante Madera", slug: "estante-flotante-madera", category: "Hogar y Jardín", categoryId: 3, price: 34990, originalPrice: null, badge: "Nuevo", rating: 4.2, description: "Estante flotante de madera maciza con soporte invisible...", features: ["Madera maciza de pino", "Soporte invisible", "Carga 15kg", "Incluye anclajes"], images: ["shelf1","shelf2","shelf3"], colors: ["Natural","Roble","Negro"], sizes: ["60cm","80cm","100cm"], stock: true },

  // ── Deportes y Aire Libre ──
  { id: 401, name: "Esterilla Yoga Premium", slug: "esterilla-yoga-premium", category: "Deportes", categoryId: 4, price: 29990, originalPrice: null, badge: null, rating: 4.5, description: "Esterilla de yoga de 6mm con superficie antideslizante...", features: ["6mm grosor", "Antideslizante", "PVC eco-friendly", "Incluye correa"], images: ["mat1","mat2","mat3"], colors: ["Morado","Verde","Azul","Negro"], sizes: null, stock: true },
  { id: 402, name: "Set Bandas Resistencia (5)", slug: "set-bandas-resistencia", category: "Deportes", categoryId: 4, price: 14990, originalPrice: null, badge: null, rating: 4.3, description: "Set de 5 bandas de resistencia con diferentes niveles...", features: ["5 niveles: XS a XL", "Látex natural", "Bolsita transporte", "Guía ejercicios"], images: ["bands1","bands2","bands3"], colors: null, sizes: null, stock: true },
  { id: 403, name: "Botella Térmica Acero 1L", slug: "botella-termica-acero", category: "Deportes", categoryId: 4, price: 19990, originalPrice: null, badge: "Más Vendido", rating: 4.8, description: "Botella térmica de acero inoxidable 1 litro, mantiene 24h frío / 12h caliente...", features: ["Acero inoxidable", "1 Litro", "24h frío / 12h caliente", "Tapa hermética"], images: ["bottle1","bottle2","bottle3"], colors: ["Negro","Plata","Verde","Rosa"], sizes: null, stock: true },
  { id: 404, name: "Cuerda Saltar Profesional", slug: "cuerda-saltar-profesional", category: "Deportes", categoryId: 4, price: 9990, originalPrice: null, badge: null, rating: 4.0, description: "Cuerda para saltar profesional con rodamientos de bolas...", features: ["Rodamientos de bolas", "Cable acero recubierto", "Mangos ergonómicos", "Ajustable 3m"], images: ["rope1","rope2","rope3"], colors: ["Negro","Azul","Rojo"], sizes: null, stock: true },
  { id: 405, name: "Bolso Deportivo Impermeable", slug: "bolso-deportivo-impermeable", category: "Deportes", categoryId: 4, price: 39990, originalPrice: 49990, badge: "Oferta", rating: 4.4, description: "Bolso deportivo impermeable con compartimento para ropa húmeda...", features: ["Impermeable", "Compartimento húmedo-seco", "40L capacidad", "Bolso zapatillas"], images: ["gymbag1","gymbag2","gymbag3"], colors: ["Negro","Gris","Azul"], sizes: null, stock: true },
  { id: 406, name: "Rodillo Espuma Recuperación", slug: "rodillo-espuma-recuperacion", category: "Deportes", categoryId: 4, price: 21990, originalPrice: null, badge: "Nuevo", rating: 4.2, description: "Rodillo de espuma para recuperación muscular con textura EVA...", features: ["Textura EVA", "45cm largo", "Alta densidad", "Guía uso incluida"], images: ["roller1","roller2","roller3"], colors: ["Negro","Azul"], sizes: null, stock: true },

  // ── Libros y Media ──
  { id: 501, name: "Libro: Cocina Saludable", slug: "libro-cocina-saludable", category: "Libros", categoryId: 5, price: 18990, originalPrice: null, badge: "Más Vendido", rating: 4.6, description: "Recetario con 150 recetas saludables para toda la familia...", features: ["150 recetas", "Fotos a color", "Tapa dura", "Índice nutricional"], images: ["cookbook1","cookbook2","cookbook3"], colors: null, sizes: null, stock: true },
  { id: 502, name: "Libro: Saga Fantástica (3 tomos)", slug: "libro-saga-fantastica", category: "Libros", categoryId: 5, price: 35990, originalPrice: 42990, badge: "Oferta", rating: 4.8, description: "Colección completa de la trilogía de fantasía épica...", features: ["3 tomos en estuche", "Mapas ilustrados", "Portada dura", "Más de 1200 páginas"], images: ["books1","books2","books3"], colors: null, sizes: null, stock: true },
  { id: 503, name: "Libreta Piel Reciclada", slug: "libreta-piel-reciclada", category: "Libros", categoryId: 5, price: 12990, originalPrice: null, badge: null, rating: 4.1, description: "Libreta artesanal encuadernada en piel reciclada con papel kraft...", features: ["Piel reciclada", "Papel kraft 120g", "200 páginas", "Cierre elástico"], images: ["notebook1","notebook2","notebook3"], colors: ["Café","Negro","Verde"], sizes: ["A5","A6"], stock: true },
  { id: 504, name: "Set Acuarelas Profesional (24)", slug: "set-acuarelas-profesional", category: "Libros", categoryId: 5, price: 24990, originalPrice: null, badge: "Nuevo", rating: 4.5, description: "Set de 24 acuarelas profesionales con pigmentos de alta calidad...", features: ["24 colores vibrantes", "Pigmentos alta calidad", "Incluye pincel", "Estuche metálico"], images: ["watercolor1","watercolor2","watercolor3"], colors: null, sizes: null, stock: true },
  { id: 505, name: "Guía de Viajes: Europa", slug: "guia-viajes-europa", category: "Libros", categoryId: 5, price: 15990, originalPrice: null, badge: null, rating: 4.3, description: "Guía completa de viajes por Europa con 20 países y más de 100 ciudades...", features: ["20 países", "100+ ciudades", "Mapas desplegables", "Tips locales"], images: ["travelguide1","travelguide2","travelguide3"], colors: null, sizes: null, stock: true },
  { id: 506, name: "Mapa Mundi Pared Decorativo", slug: "mapa-mundi-pared-decorativo", category: "Libros", categoryId: 5, price: 28990, originalPrice: null, badge: null, rating: 4.2, description: "Mapa mundi decorativo de pared en estilo vintage...", features: ["90x60cm", "Papel premium 200g", "Estilo vintage", "Marco simulado"], images: ["map1","map2","map3"], colors: ["Vintage","Moderno","Acuarela"], sizes: null, stock: true },

  // ── Belleza y Salud ──
  { id: 601, name: "Set Serum Facial + Crema", slug: "set-serum-facial-crema", category: "Belleza", categoryId: 6, price: 32990, originalPrice: 42990, badge: "Oferta", rating: 4.7, description: "Set de cuidado facial con serum de vitamina C y crema hidratante...", features: ["Serum Vitamina C", "Crema hidratante SPF30", "50ml cada uno", "Libre de parabenos"], images: ["skincare1","skincare2","skincare3"], colors: null, sizes: null, stock: true },
  { id: 602, name: "Difusor Aromaterapia", slug: "difusor-aromaterapia", category: "Belleza", categoryId: 6, price: 25990, originalPrice: null, badge: null, rating: 4.4, description: "Difusor ultrasónico de aromaterapia con luz LED y 200ml capacidad...", features: ["Ultrasónico", "200ml capacidad", "LED 7 colores", "Auto-off"], images: ["diffuser1","diffuser2","diffuser3"], colors: ["Blanco","Madera","Negro"], sizes: null, stock: true },
  { id: 603, name: "Set Jabones Artesanales (6)", slug: "set-jabones-artesanales", category: "Belleza", categoryId: 6, price: 16990, originalPrice: null, badge: "Nuevo", rating: 4.3, description: "Set de 6 jabones artesanales con aceites naturales y fragancias únicas...", features: ["6 fragancias", "Aceites naturales", "Hechos a mano", "Libre de sulfatos"], images: ["soaps1","soaps2","soaps3"], colors: null, sizes: null, stock: true },
  { id: 604, name: "Aceite Esencial Lavanda", slug: "aceite-esencial-lavanda", category: "Belleza", categoryId: 6, price: 11990, originalPrice: null, badge: "Más Vendido", rating: 4.6, description: "Aceite esencial puro de lavanda 100% natural, 30ml...", features: ["100% puro", "30ml", "Goteo dosificador", "Uso múltiple"], images: ["oil1","oil2","oil3"], colors: null, sizes: null, stock: true },
  { id: 605, name: "Cepillo Secado Rápido", slug: "cepillo-secado-rapido", category: "Belleza", categoryId: 6, price: 19990, originalPrice: null, badge: null, rating: 4.0, description: "Cepillo de secado rápido con tecnología iónica y cerdas suaves...", features: ["Tecnología iónica", "Cerdas suaves", "Base ventilada", "Anti-estático"], images: ["brush1","brush2","brush3"], colors: ["Negro","Rosa","Morado"], sizes: null, stock: true },
  { id: 606, name: "Set Bombas Baño (5)", slug: "set-bombas-bano", category: "Belleza", categoryId: 6, price: 14990, originalPrice: null, badge: null, rating: 4.1, description: "Set de 5 bombas de baño efervescentes con aromas y colores...", features: ["5 unidades", "Aceites esenciales", "Color natural", "Envoltura individual"], images: ["bathbomb1","bathbomb2","bathbomb3"], colors: null, sizes: null, stock: true }
]
```
</details>

---

## Appendix B: In-App Demo Notices

These are the exact strings to show in the checkout flow to make it clear no real payment occurs:

**Payment step banner** (yellow/amber, always visible):
```
🔒 DEMO — Esta es una tienda de demostración. 
No se procesarán pagos reales. Los datos ingresados no se almacenan.
```

**Order confirmation banner** (blue/info, prominent):
```
🚀 Esta es una simulación de compra para fines demostrativos. 
No se ha realizado ningún cobro. 
¿Te gustaría tener una tienda online real como esta? 
Contáctanos en MiPaginaWeb.
```

**Footer** (subtle, always visible):
```
Demo — Tienda de ejemplo. No es una tienda real. 
Creado por MiPaginaWeb para fines demostrativos.
```

---

## Appendix C: Responsive Behavior Summary

| Component | Mobile (< 640px) | Tablet (640-1023px) | Desktop (1024px+) |
|-----------|-----------------|--------------------|-------------------|
| Header nav | Hamburger menu | Hamburger menu | Full nav links |
| Category cards | 2-col grid | 3-col grid | 6-col row |
| Product grid | 1 col | 2 cols | 4 cols |
| Product detail | Single column | Single column, wider | Two columns (image left, info right) |
| Cart page | Stacked (items then summary) | Side by side | Side by side |
| Checkout | Single column form | Two columns | Two columns |
| Cart drawer | Full width | Max 400px slide-in | Max 400px slide-in |
| Hero | 1 line text | 2 line text | Full hero |

---

*This spec is a living document. Update as decisions are made and new information emerges.*
