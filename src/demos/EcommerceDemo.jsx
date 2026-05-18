import { useState } from 'react'
import { ShoppingCart, User, Menu, X, Search, ChevronRight, Heart, Minus, Plus, Trash2 } from 'lucide-react'

const products = [
  { id: 1, name: 'Auriculares Pro X', price: 89.990, tag: 'Nuevo', img: '🎧', category: 'Electrónica' },
  { id: 2, name: 'Zapatillas Urban', price: 65.990, tag: 'Oferta', img: '👟', category: 'Deportes' },
  { id: 3, name: 'Mochila Ejecutiva', price: 45.990, tag: 'Popular', img: '🎒', category: 'Accesorios' },
  { id: 4, name: 'Reloj Deportivo', price: 129.990, tag: 'Premium', img: '⌚', category: 'Electrónica' },
  { id: 5, name: 'Set de Maquillaje', price: 35.990, tag: 'Más vendido', img: '💄', category: 'Belleza' },
  { id: 6, name: 'Cámara Digital', price: 249.990, tag: 'Premium', img: '📷', category: 'Electrónica' },
  { id: 7, name: 'Polerón Oversize', price: 32.990, tag: 'Nueva colección', img: '👕', category: 'Ropa' },
  { id: 8, name: 'Kit Jardinería', price: 28.990, tag: 'Oferta', img: '🪴', category: 'Hogar' },
]

const categories = ['Todas', 'Electrónica', 'Ropa', 'Deportes', 'Accesorios', 'Belleza', 'Hogar']

const relatedProducts = [
  { name: 'Bolso Bandolera', price: 39.990, img: '👛' },
  { name: 'Gafas Polarizadas', price: 25.990, img: '🕶️' },
  { name: 'Cargador Inalámbrico', price: 19.990, img: '🔋' },
]

export function EcommerceDemo({ template }) {
  const [page, setPage] = useState('tienda')
  const [category, setCategory] = useState('Todas')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id !== id) return item
      const newQty = item.qty + delta
      return newQty <= 0 ? null : { ...item, qty: newQty }
    }).filter(Boolean))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const filtered = products.filter(p => {
    const matchCat = category === 'Todas' || p.category === category
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCat && matchSearch
  })

  const Nav = () => (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <span className="font-bold text-lg text-gray-900">{template.title}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button onClick={() => setPage('tienda')} className={`hover:text-gray-900 ${page === 'tienda' ? 'text-blue-600' : ''}`}>Tienda</button>
          <button onClick={() => setPage('categorias')} className={`hover:text-gray-900 ${page === 'categorias' ? 'text-blue-600' : ''}`}>Categorías</button>
          <button onClick={() => setPage('ofertas')} className={`hover:text-gray-900 ${page === 'ofertas' ? 'text-blue-600' : ''}`}>Ofertas</button>
          <button onClick={() => setPage('contacto')} className={`hover:text-gray-900 ${page === 'contacto' ? 'text-blue-600' : ''}`}>Contacto</button>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </button>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2 text-sm font-medium">
          <button onClick={() => { setPage('tienda'); setMenuOpen(false) }} className="block w-full text-left py-2 text-gray-600">Tienda</button>
          <button onClick={() => { setPage('categorias'); setMenuOpen(false) }} className="block w-full text-left py-2 text-gray-600">Categorías</button>
          <button onClick={() => { setPage('ofertas'); setMenuOpen(false) }} className="block w-full text-left py-2 text-gray-600">Ofertas</button>
          <button onClick={() => { setPage('contacto'); setMenuOpen(false) }} className="block w-full text-left py-2 text-gray-600">Contacto</button>
        </div>
      )}
    </nav>
  )

  const CartSidebar = () => (
    <div className={`fixed inset-0 z-50 ${cartOpen ? 'visible' : 'invisible'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Carrito ({cartCount})</h2>
            <button onClick={() => setCartOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
          </div>
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
              <ShoppingCart className="w-16 h-16" />
              <p className="text-lg">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-gray-50">
                    <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">{item.img}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-sm text-gray-900">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)}><Trash2 className="w-4 h-4 text-red-400" /></button>
                      </div>
                      <p className="text-sm text-blue-600 font-bold">${(item.price * item.qty).toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <button onClick={() => { setShowCheckout(true); setCartOpen(false) }} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                  Ir a Pagar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )

  const CheckoutPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
          <p className="text-gray-600 mt-2">Completa tus datos para finalizar la compra</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm py-2">
              <span>{item.name} x{item.qty}</span>
              <span className="font-semibold">${(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span className="text-blue-600">${cartTotal.toLocaleString()}</span>
          </div>
        </div>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('¡Compra simulada exitosa! 🎉 Nos pondremos en contacto para coordinar el pago.'); setCart([]); setShowCheckout(false) }}>
          <input type="text" placeholder="Nombre completo" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <input type="tel" placeholder="Teléfono" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <input type="text" placeholder="Dirección de envío" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm">
            <option>Transferencia Bancaria</option>
            <option>Tarjeta de Crédito</option>
            <option>Tarjeta de Débito</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">Confirmar Compra</button>
          <button type="button" onClick={() => setShowCheckout(false)} className="w-full text-gray-500 text-sm py-2">Volver a la tienda</button>
        </form>
      </div>
    </section>
  )

  const TiendaPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >{c}</button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative cursor-pointer" onClick={() => setSelectedProduct(p)}>
                <span className="text-5xl group-hover:scale-110 transition-transform">{p.img}</span>
                <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold">{p.tag}</span>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white"><Heart className="w-4 h-4 text-gray-600" /></button>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400">{p.category}</p>
                <h3 className="font-semibold text-gray-900 mt-0.5 cursor-pointer hover:text-blue-600" onClick={() => setSelectedProduct(p)}>{p.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-blue-600">${p.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(p)} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all">Comprar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const ProductDetail = () => {
    if (!selectedProduct) return null
    const p = selectedProduct
    return (
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
        <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="h-64 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-7xl">{p.img}</div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400">{p.category}</p>
                <h2 className="text-2xl font-bold text-gray-900">{p.name}</h2>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">{p.tag}</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">${p.price.toLocaleString()}</span>
            </div>
            <p className="text-gray-600 text-sm">Producto de alta calidad, ideal para tu día a día. Disponible en múltiples colores y tallas. Envío gratis a todo Chile por compras sobre $50.000.</p>
            <div className="flex gap-3">
              <button onClick={() => { addToCart(p); setSelectedProduct(null) }} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">Agregar al Carrito</button>
              <button onClick={() => setSelectedProduct(null)} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const CategoriasPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Categorías</h2>
          <p className="text-gray-600 mt-2">Explora por categoría</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Electrónica', 'Ropa', 'Deportes', 'Belleza', 'Hogar', 'Accesorios'].map(cat => (
            <button key={cat} onClick={() => { setCategory(cat); setPage('tienda') }}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all text-center">
              <span className="text-3xl">{['📱', '👕', '⚽', '💄', '🪴', '🎒'][['Electrónica', 'Ropa', 'Deportes', 'Belleza', 'Hogar', 'Accesorios'].indexOf(cat)]}</span>
              <p className="mt-2 font-semibold text-sm text-gray-900">{cat}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )

  const OfertasPage = () => {
    const ofertas = products.filter(p => p.tag === 'Oferta' || p.tag === 'Más vendido')
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold mb-4">🔥 Ofertas</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Aprovecha estas <span className="text-red-500">Ofertas</span></h2>
            <p className="mt-2 text-gray-600">Precios especiales por tiempo limitado</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ofertas.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-red-200 overflow-hidden hover:shadow-xl transition-all">
                <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center text-5xl">{p.img}</div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-red-500">${p.price.toLocaleString()}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">{p.tag}</span>
                  </div>
                  <button onClick={() => addToCart(p)} className="mt-3 w-full bg-red-500 text-white py-2 rounded-xl text-sm font-semibold hover:bg-red-600">Aprovechar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const ContactoPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Contacto</h2>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('¡Mensaje enviado! Te contactaremos pronto.'); }}>
          <input type="text" placeholder="Nombre" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <textarea rows={4} placeholder="Mensaje" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">Enviar</button>
        </form>
      </div>
    </section>
  )

  const renderPage = () => {
    switch (page) {
      case 'tienda': return <TiendaPage />;
      case 'categorias': return <CategoriasPage />;
      case 'ofertas': return <OfertasPage />;
      case 'contacto': return <ContactoPage />;
      default: return <TiendaPage />;
    }
  }

  if (showCheckout) return (
    <div>
      <div className="sticky top-0 z-30 bg-white border-b px-4 py-3">
        <button onClick={() => setShowCheckout(false)} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">← Volver a la tienda</button>
      </div>
      <CheckoutPage />
    </div>
  )

  return (
    <div className="text-gray-900 min-h-screen bg-white">
      <Nav />
      {renderPage()}
      <CartSidebar />
      {selectedProduct && <ProductDetail />}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 text-center text-sm bg-gray-50 text-gray-500 border-t border-gray-100">
        <p>&copy; 2026 {template.title}. Demo interactiva de MiPaginaWeb.</p>
      </footer>
    </div>
  )
}
