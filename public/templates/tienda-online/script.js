// Products data
const CATEGORIES = [
  { id: 'electronica', name: 'Electrónica', icon: '🖥️' },
  { id: 'ropa', name: 'Ropa y Moda', icon: '👕' },
  { id: 'hogar', name: 'Hogar y Jardín', icon: '🏡' },
  { id: 'deportes', name: 'Deportes', icon: '⚽' },
  { id: 'libros', name: 'Libros y Educación', icon: '📚' },
  { id: 'belleza', name: 'Belleza y Cuidado', icon: '💄' },
]

const PRODUCTS = [
  { id: 'elec-1', cat: 'electronica', name: 'Audífonos Bluetooth Pro', price: 34990 },
  { id: 'elec-2', cat: 'electronica', name: 'Cargador Inalámbrico', price: 15990 },
  { id: 'elec-3', cat: 'electronica', name: 'Parlante Portátil', price: 24990 },
  { id: 'elec-4', cat: 'electronica', name: 'Mouse Ergonómico', price: 18990 },
  { id: 'elec-5', cat: 'electronica', name: 'Teclado Mecánico RGB', price: 45990 },
  { id: 'elec-6', cat: 'electronica', name: 'Hub USB-C 7 puertos', price: 21990 },
  { id: 'ropa-1', cat: 'ropa', name: 'Polera Algodón Premium', price: 14990 },
  { id: 'ropa-2', cat: 'ropa', name: 'Jeans Clásico', price: 29990 },
  { id: 'ropa-3', cat: 'ropa', name: 'Chaqueta Impermeable', price: 54990 },
  { id: 'ropa-4', cat: 'ropa', name: 'Zapatillas Urbanas', price: 39990 },
  { id: 'ropa-5', cat: 'ropa', name: 'Bufanda de Lana', price: 9990 },
  { id: 'ropa-6', cat: 'ropa', name: 'Gorro Invierno', price: 7990 },
  { id: 'hogar-1', cat: 'hogar', name: 'Lámpara LED Inteligente', price: 22990 },
  { id: 'hogar-2', cat: 'hogar', name: 'Macetero Decorativo', price: 12990 },
  { id: 'hogar-3', cat: 'hogar', name: 'Set Sábanas 300 hilos', price: 34990 },
  { id: 'hogar-4', cat: 'hogar', name: 'Organizador Escritorio', price: 9990 },
  { id: 'hogar-5', cat: 'hogar', name: 'Cojín Decorativo', price: 8990 },
  { id: 'hogar-6', cat: 'hogar', name: 'Difusor Aromático', price: 15990 },
  { id: 'dep-1', cat: 'deportes', name: 'Botella Deportiva 1L', price: 7990 },
  { id: 'dep-2', cat: 'deportes', name: 'Esterilla Yoga', price: 18990 },
  { id: 'dep-3', cat: 'deportes', name: 'Cuerda Saltar Ajustable', price: 6990 },
  { id: 'dep-4', cat: 'deportes', name: 'Mochila Deportiva', price: 24990 },
  { id: 'dep-5', cat: 'deportes', name: 'Set Pesas 2x3kg', price: 29990 },
  { id: 'dep-6', cat: 'deportes', name: 'Rodillo Masaje Muscular', price: 12990 },
  { id: 'libros-1', cat: 'libros', name: 'Cuaderno Oficio 100 hojas', price: 3990 },
  { id: 'libros-2', cat: 'libros', name: 'Set Bolígrafos Metal', price: 6990 },
  { id: 'libros-3', cat: 'libros', name: 'Agenda 2027 Anillada', price: 12990 },
  { id: 'libros-4', cat: 'libros', name: 'Mochila Ejecutiva', price: 34990 },
  { id: 'libros-5', cat: 'libros', name: 'Lámpara Lectura LED', price: 15990 },
  { id: 'libros-6', cat: 'libros', name: 'Set Post-it Colores', price: 4990 },
  { id: 'bell-1', cat: 'belleza', name: 'Set Cepillos Profesional', price: 18990 },
  { id: 'bell-2', cat: 'belleza', name: 'Espejo LED Doble Cara', price: 22990 },
  { id: 'bell-3', cat: 'belleza', name: 'Kit Manicura 12 piezas', price: 14990 },
  { id: 'bell-4', cat: 'belleza', name: 'Corta Cabello Eléctrico', price: 39990 },
  { id: 'bell-5', cat: 'belleza', name: 'Secador Pelo Iónico', price: 29990 },
  { id: 'bell-6', cat: 'belleza', name: 'Organizador Maquillaje', price: 9990 },
]

const fmt = (n) => '$' + (n || 0).toLocaleString('es-CL')

// Hero carousel
const HERO_SLIDES = [
  { id: 'elec-1', title: 'Audífonos Bluetooth Pro', cat: 'Electrónica', desc: 'Sonido envolvente, cancelación de ruido activa y 40 horas de batería para tu día a día.', icon: '🖥️', gradient: 'linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)' },
  { id: 'ropa-3', title: 'Chaqueta Impermeable', cat: 'Ropa y Moda', desc: 'Diseño minimalista, tejido waterproof y forro térmico. Perfecta para la ciudad y la montaña.', icon: '👕', gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' },
  { id: 'hogar-1', title: 'Lámpara LED Inteligente', cat: 'Hogar y Jardín', desc: '16 millones de colores, control por app y compatible con Alexa. Ilumina tu hogar con estilo.', icon: '🏡', gradient: 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)' },
  { id: 'dep-4', title: 'Mochila Deportiva 35L', cat: 'Deportes', desc: 'Compartimentos inteligentes, tejido antiadherente y espalda acolchada. Tu mejor compañera de entrenamiento.', icon: '⚽', gradient: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)' },
]

let heroIndex = 0

function renderHero() {
  const s = HERO_SLIDES[heroIndex]
  const slides = document.getElementById('heroSlides')
  slides.innerHTML = HERO_SLIDES.map((slide, i) =>
    `<div class="hero__slide${i === heroIndex ? ' active' : ''}" style="background:${slide.gradient}">
      <div class="hero__slide-icon">${slide.icon}</div>
    </div>`
  ).join('')

  document.getElementById('heroBadge').textContent = s.cat
  document.getElementById('heroTitle').textContent = s.title
  document.getElementById('heroDesc').textContent = s.desc
  document.getElementById('heroIcon').textContent = s.icon

  document.getElementById('heroDots').innerHTML = HERO_SLIDES.map((_, i) =>
    `<button class="hero__dot${i === heroIndex ? ' active' : ''}" onclick="heroGo(${i})" aria-label="Slide ${i + 1}"></button>`
  ).join('')
}

function heroNext() { heroIndex = (heroIndex + 1) % HERO_SLIDES.length; renderHero() }
function heroPrev() { heroIndex = (heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length; renderHero() }
function heroGo(i) { heroIndex = i; renderHero() }

let heroTimer
function startHero() { heroTimer = setInterval(heroNext, 5000) }
function restartHero() { clearInterval(heroTimer); startHero() }

document.addEventListener('click', (e) => {
  if (e.target.closest('.hero__controls')) { clearInterval(heroTimer); setTimeout(startHero, 8000) }
})

// State
let cart = []
let currentFilter = 'todas'
let searchQuery = ''

// Load cart from localStorage
function loadCart() {
  try {
    const raw = localStorage.getItem('ns_cart')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(item =>
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.price === 'number' && item.price >= 0 &&
      typeof item.qty === 'number' && item.qty > 0 && item.qty <= 999
    )
  } catch { return [] }
}

function saveCart() { localStorage.setItem('ns_cart', JSON.stringify(cart)) }

// Get product by id
function getProduct(id) { return PRODUCTS.find(p => p.id === id) }

// Render functions
function renderCategories() {
  const grid = document.getElementById('categoriesGrid')
  grid.innerHTML = CATEGORIES.map(c =>
    `<div class="category-card" onclick="filterByCategory('${c.id}')">
      <div class="category-card__icon">${c.icon}</div>
      <div class="category-card__name">${c.name}</div>
    </div>`
  ).join('')
}

function renderPills() {
  const container = document.getElementById('pillsContainer')
  const all = `<button class="pill${currentFilter === 'todas' ? ' active' : ''}" onclick="filterByCategory('todas')">Todas</button>`
  container.innerHTML = all + CATEGORIES.map(c =>
    `<button class="pill${currentFilter === c.id ? ' active' : ''}" onclick="filterByCategory('${c.id}')">${c.name}</button>`
  ).join('')
}

function getCategoryIcon(catId) {
  const c = CATEGORIES.find(x => x.id === catId)
  return c ? c.icon : '📦'
}

function renderProducts() {
  const grid = document.getElementById('productsGrid')
  let filtered = PRODUCTS

  if (currentFilter !== 'todas') {
    filtered = filtered.filter(p => p.cat === currentFilter)
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      CATEGORIES.find(c => c.id === p.cat)?.name.toLowerCase().includes(q)
    )
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px 0;color:var(--n-500)">No encontramos productos con ese filtro. <button onclick="filterByCategory('todas');document.getElementById('searchInput').value='';document.getElementById('mobileSearch').value='';searchQuery='';renderProducts()" style="color:var(--p-500);background:none;border:none;font-weight:600;text-decoration:underline">Limpiar</button></div>`
    return
  }

  grid.innerHTML = filtered.map(p => {
    const inCart = cart.find(i => i.id === p.id)
    return `<div class="product-card">
      <div class="product-card__image">${getCategoryIcon(p.cat)}</div>
      <div class="product-card__body">
        <div class="product-card__category">${CATEGORIES.find(c => c.id === p.cat)?.name || ''}</div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__price">${fmt(p.price)}</div>
        <div class="product-card__footer">
          <button class="product-card__add${inCart ? ' added' : ''}" onclick="addToCart('${p.id}')">${inCart ? '✓ Agregado' : 'Agregar'}</button>
        </div>
      </div>
    </div>`
  }).join('')
}

// Cart functions
function addToCart(id) {
  const ex = cart.find(i => i.id === id)
  if (ex) {
    ex.qty += 1
  } else {
    const p = getProduct(id)
    if (!p) return
    cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 })
  }
  saveCart()
  renderCartBadge()
  renderProducts()
  renderCartSidebar()
  showToast('Producto agregado al carrito')
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id)
  if (!item) return
  const n = item.qty + delta
  if (n <= 0) {
    cart = cart.filter(i => i.id !== id)
  } else {
    item.qty = n
  }
  saveCart()
  renderCartBadge()
  renderCartSidebar()
  renderProducts()
  updateCheckoutSummary()
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id)
  saveCart()
  renderCartBadge()
  renderCartSidebar()
  renderProducts()
  updateCheckoutSummary()
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0)
}

function getShipping() {
  const subtotal = getCartTotal()
  return subtotal >= 50000 ? 0 : 4990
}

function renderCartBadge() {
  const badge = document.getElementById('cartBadge')
  const count = cart.reduce((s, i) => s + i.qty, 0)
  badge.textContent = count
  badge.style.display = count > 0 ? 'flex' : 'none'
  if (count > 0) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump') }
}

function renderCartSidebar() {
  const body = document.getElementById('cartBody')
  const footer = document.getElementById('cartFooter')
  const total = getCartTotal()
  const count = cart.reduce((s, i) => s + i.qty, 0)

  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-sidebar__empty">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
      <p>Tu carrito está vacío</p>
    </div>`
    footer.style.display = 'none'
    return
  }

  footer.style.display = 'block'
  body.innerHTML = cart.map(i => {
    const p = getProduct(i.id)
    return `<div class="cart-item">
      <div class="cart-item__image">${p ? getCategoryIcon(p.cat) : '📦'}</div>
      <div class="cart-item__info">
        <div class="cart-item__name">${i.name}</div>
        <div class="cart-item__price">${fmt(i.price)}</div>
        <div class="cart-item__qty">
          <button onclick="changeQty('${i.id}',-1)">−</button>
          <span>${i.qty}</span>
          <button onclick="changeQty('${i.id}',1)">+</button>
        </div>
      </div>
      <button class="cart-item__remove" onclick="removeFromCart('${i.id}')">&times;</button>
    </div>`
  }).join('')
  document.getElementById('cartTotal').textContent = fmt(total)
}

// Cart sidebar
function openCart() {
  renderCartSidebar()
  document.getElementById('cartOverlay').classList.add('open')
  document.getElementById('cartSidebar').classList.add('open')
}
function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open')
  document.getElementById('cartSidebar').classList.remove('open')
}

function openCheckout() {
  if (cart.length === 0) { showToast('Agrega productos al carrito'); return }
  closeCart()
  document.getElementById('successBanner').style.display = 'none'
  document.getElementById('checkoutContent').style.display = 'grid'
  document.getElementById('confirmation').style.display = 'none'
  updateCheckoutSummary()
  document.getElementById('checkoutOverlay').classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('open')
  document.body.style.overflow = ''
}

function updateCheckoutSummary() {
  const container = document.getElementById('checkoutItems')
  const subtotal = getCartTotal()
  const shipping = getShipping()
  const iva = Math.round(subtotal * 0.19)
  const total = subtotal + shipping

  container.innerHTML = cart.map(i =>
    `<div class="summary-item"><span>${i.name} × ${i.qty}</span><span>${fmt(i.price * i.qty)}</span></div>`
  ).join('')
  document.getElementById('coSubtotal').textContent = fmt(subtotal)
  document.getElementById('coShipping').textContent = shipping === 0 ? 'Gratis' : fmt(shipping)
  document.getElementById('coTotal').textContent = fmt(total)
}

function placeOrder() {
  const name = document.getElementById('cf_name').value.trim()
  const email = document.getElementById('cf_email').value.trim()
  const phone = document.getElementById('cf_phone').value.trim()
  const address = document.getElementById('cf_address').value.trim()
  const city = document.getElementById('cf_city').value.trim()
  const region = document.getElementById('cf_region').value.trim()

  if (!name || !email || !phone || !address || !city || !region) {
    showToast('Completa todos los campos del formulario')
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Ingresa un email válido')
    return
  }

  const orderNum = 'DEMO-' + Date.now().toString(36).toUpperCase() + '-' + String(Math.floor(Math.random() * 9999)).padStart(4, '0')

  document.getElementById('checkoutContent').style.display = 'none'
  document.getElementById('successBanner').style.display = 'flex'

  const confirmation = document.getElementById('confirmation')
  confirmation.style.display = 'block'
  confirmation.innerHTML = `
    <div class="confirmation__icon"><svg width="36" height="36" fill="none" stroke="#065f46" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg></div>
    <h1>¡Pedido recibido!</h1>
    <p>Gracias por probar nuestra demo, <strong>${name}</strong>.</p>
    <div class="confirmation__number">N° ${orderNum}</div>
    <p>Te hemos enviado un resumen a <strong>${email}</strong> (simulado).</p>
    <div class="confirmation__disclaimer">
      <strong>🧾 Demo</strong> — Esta es una simulación. No se realizó ningún cobro ni se envió ningún pedido real. Los datos ingresados no fueron almacenados ni transmitidos.
    </div>
    <button class="btn btn--solid" onclick="resetStore()">Volver a la Tienda</button>
  `

  cart = []
  saveCart()
  renderCartBadge()
  renderProducts()
}

function resetStore() {
  closeCheckout()
  currentFilter = 'todas'
  searchQuery = ''
  document.getElementById('searchInput').value = ''
  document.getElementById('mobileSearch').value = ''
  renderPills()
  renderProducts()
}

function filterByCategory(cat) {
  currentFilter = cat
  document.getElementById('searchInput').value = ''
  document.getElementById('mobileSearch').value = ''
  searchQuery = ''
  renderPills()
  renderProducts()
  const sec = document.getElementById('productos')
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function filterProducts() {
  searchQuery = document.getElementById('searchInput').value || document.getElementById('mobileSearch').value || ''
  document.getElementById('searchInput').value = searchQuery
  document.getElementById('mobileSearch').value = searchQuery
  renderProducts()
}

function showToast(msg) {
  const t = document.getElementById('toast')
  t.textContent = msg
  t.classList.add('show')
  clearTimeout(t._timeout)
  t._timeout = setTimeout(() => t.classList.remove('show'), 2500)
}

// Init
function init() {
  cart = loadCart()
  renderHero()
  renderCategories()
  renderPills()
  renderProducts()
  renderCartBadge()
  renderCartSidebar()
  startHero()
}

document.addEventListener('DOMContentLoaded', init)
