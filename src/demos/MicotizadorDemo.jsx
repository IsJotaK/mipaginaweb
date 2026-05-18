import { useState } from 'react'

const fmt = (n) => (n || 0).toLocaleString('es-CL')

const defaultProducts = [
  { id: 1, name: 'Split 9000 BTU', category: 'Equipos', price: 450000, unit: 'unidad' },
  { id: 2, name: 'Split 12000 BTU', category: 'Equipos', price: 550000, unit: 'unidad' },
  { id: 3, name: 'Split 18000 BTU', category: 'Equipos', price: 750000, unit: 'unidad' },
  { id: 4, name: 'Tubería cobre 1/4"', category: 'Materiales', price: 12000, unit: 'metro' },
  { id: 5, name: 'Tubería cobre 3/8"', category: 'Materiales', price: 15000, unit: 'metro' },
  { id: 6, name: 'Cable eléctrico 2x14', category: 'Materiales', price: 5000, unit: 'metro' },
  { id: 7, name: 'Instalación split básica', category: 'Servicios', price: 80000, unit: 'global' },
  { id: 8, name: 'Mano de obra adicional', category: 'Servicios', price: 40000, unit: 'hrs' },
]

const defaultClients = [
  { id: 1, name: 'Constructora del Sur Ltda.', rut: '76.123.456-7', giro: 'Construcción', address: 'Av. Alemania 1234', phone: '+56 9 6123 4567', email: 'contacto@constructorasur.cl' },
  { id: 2, name: 'Restaurante La Unión', rut: '77.234.567-8', giro: 'Gastronomía', address: 'Calle Principal 567', phone: '+56 9 7234 5678', email: 'info@restaurantelaunion.cl' },
  { id: 3, name: 'Clínica DentalCare', rut: '78.345.678-9', giro: 'Salud', address: 'Av. Los Lagos 890', phone: '+56 9 8345 6789', email: 'admin@clinicadentalcare.cl' },
]

const company = { name: 'MiNegocio SpA', rut: '76.123.456-7', phone: '+56 9 9123 4567', address: 'Av. Principal 123' }

const unitLabel = (u) => ({ unidad: 'Por unidad', metro: 'Por metro', m2: 'Por m²', kit: 'Por kit', global: 'Global', hrs: 'Por hora' }[u] || u)

export function MicotizadorDemo() {
  const [page, setPage] = useState('dashboard')
  const [products, setProducts] = useState(defaultProducts)
  const [clients, setClients] = useState(defaultClients)
  const [nextProductId, setNextProductId] = useState(9)
  const [nextClientId, setNextClientId] = useState(4)
  const [prodForm, setProdForm] = useState({ name: '', category: 'Equipos', price: '', unit: 'unidad' })
  const [clientForm, setClientForm] = useState({ name: '', rut: '', giro: '', address: '', phone: '', email: '' })
  const [search, setSearch] = useState('')
  const [quoteClient, setQuoteClient] = useState({ name: '', rut: '', giro: '', address: '', phone: '', email: '', project: '' })
  const [items, setItems] = useState([])

  const addProduct = () => {
    if (!prodForm.name || !prodForm.price) return
    setProducts([...products, { id: nextProductId, ...prodForm, price: parseInt(prodForm.price) }])
    setNextProductId(nextProductId + 1)
    setProdForm({ name: '', category: 'Equipos', price: '', unit: 'unidad' })
  }

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const editProduct = (p) => {
    const name = prompt('Nombre:', p.name)
    if (!name) return
    const price = parseInt(prompt('Precio:', p.price))
    if (!price) return
    const category = prompt('Categoría:', p.category) || p.category
    const unit = prompt('Unidad:', p.unit) || p.unit
    setProducts(products.map(x => x.id === p.id ? { ...x, name, price, category, unit } : x))
  }

  const addClient = () => {
    if (!clientForm.name) return
    setClients([...clients, { id: nextClientId, ...clientForm }])
    setNextClientId(nextClientId + 1)
    setClientForm({ name: '', rut: '', giro: '', address: '', phone: '', email: '' })
  }

  const deleteClient = (id) => {
    setClients(clients.filter(c => c.id !== id))
  }

  const cotizarClick = (c) => {
    setQuoteClient({ name: c.name, rut: c.rut, giro: c.giro, address: c.address, phone: c.phone, email: c.email, project: '' })
    setPage('new-quote')
  }

  const addItem = (product) => {
    const ex = items.find(i => i.product_id === product.id)
    if (ex) {
      setItems(items.map(i => i.product_id === product.id ? { ...i, qty: i.qty + 1 } : i))
    } else {
      setItems([...items, { product_id: product.id, name: product.name, qty: 1, price: product.price }])
    }
  }

  const changeQty = (productId, delta) => {
    const item = items.find(i => i.product_id === productId)
    if (!item) return
    const n = item.qty + delta
    if (n <= 0) {
      setItems(items.filter(i => i.product_id !== productId))
    } else {
      setItems(items.map(i => i.product_id === productId ? { ...i, qty: n } : i))
    }
  }

  const setQty = (productId, val) => {
    const n = parseInt(val)
    if (isNaN(n) || n <= 0) {
      setItems(items.filter(i => i.product_id !== productId))
    } else {
      setItems(items.map(i => i.product_id === productId ? { ...i, qty: n } : i))
    }
  }

  const removeItem = (productId) => setItems(items.filter(i => i.product_id !== productId))

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const iva = Math.round(subtotal * 0.19)
  const total = subtotal + iva

  const filteredProducts = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  )
  const grouped = {}
  filteredProducts.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = []
    grouped[p.category].push(p)
  })

  const nav = [
    { key: 'dashboard', label: 'Inicio', icon: '📊' },
    { key: 'new-quote', label: 'Nueva Cotización', icon: '➕' },
    { key: 'products', label: 'Productos', icon: '📦' },
    { key: 'clients', label: 'Clientes', icon: '👥' },
  ]

  const Sidebar = () => (
    <nav className="w-56 bg-white border-r border-gray-200 hidden lg:flex flex-col gap-1 p-3">
      {nav.map(({ key, label, icon }) => (
        <button key={key} onClick={() => setPage(key)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
            page === key ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-100'
          }`}>
          <span>{icon}</span> {label}
        </button>
      ))}
    </nav>
  )

  const DashboardPage = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Panel de Control</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Cotizaciones', value: '47' },
          { label: 'Productos', value: String(products.length) },
          { label: 'Clientes', value: String(clients.length) },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-2xl font-bold text-brand-600">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={() => setPage('new-quote')} className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-300 transition-colors text-left">
          <div className="text-lg font-semibold text-gray-900">Nueva Cotización</div>
          <p className="text-sm text-gray-500 mt-1">Crea una cotización al instante</p>
        </button>
        <button onClick={() => setPage('products')} className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-300 transition-colors text-left">
          <div className="text-lg font-semibold text-gray-900">Productos</div>
          <p className="text-sm text-gray-500 mt-1">Administra tu catálogo</p>
        </button>
        <button onClick={() => setPage('clients')} className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-300 transition-colors text-left">
          <div className="text-lg font-semibold text-gray-900">Clientes</div>
          <p className="text-sm text-gray-500 mt-1">Tus clientes frecuentes</p>
        </button>
      </div>
    </div>
  )

  const ProductsPage = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Productos</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
          <input placeholder="Nombre" value={prodForm.name} onChange={e => setProdForm({ ...prodForm, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400" />
          <select value={prodForm.category} onChange={e => setProdForm({ ...prodForm, category: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400 bg-white">
            {['Equipos', 'Materiales', 'Servicios'].map(c => <option key={c}>{c}</option>)}
          </select>
          <input type="number" placeholder="Precio" value={prodForm.price} onChange={e => setProdForm({ ...prodForm, price: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400" />
          <select value={prodForm.unit} onChange={e => setProdForm({ ...prodForm, unit: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400 bg-white">
            {['unidad', 'metro', 'm2', 'kit', 'global', 'hrs'].map(u => <option key={u} value={u}>{unitLabel(u)}</option>)}
          </select>
        </div>
        <button onClick={addProduct} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors border-none cursor-pointer">
          Agregar
        </button>
      </div>
      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{p.name}</div>
              <div className="text-xs text-gray-400">{p.category} · ${p.price.toLocaleString('es-CL')} · {unitLabel(p.unit)}</div>
            </div>
            <button onClick={() => editProduct(p)} className="text-xs text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer">✏️</button>
            <button onClick={() => deleteProduct(p.id)} className="text-xs text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer">🗑️</button>
          </div>
        ))}
        {products.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No hay productos</p>}
      </div>
    </div>
  )

  const ClientsPage = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Clientes Frecuentes</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input placeholder="Empresa / Nombre *" value={clientForm.name} onChange={e => setClientForm({ ...clientForm, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400" />
          <input placeholder="RUT" value={clientForm.rut} onChange={e => setClientForm({ ...clientForm, rut: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400" />
          <input placeholder="Giro" value={clientForm.giro} onChange={e => setClientForm({ ...clientForm, giro: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400" />
          <input placeholder="Dirección" value={clientForm.address} onChange={e => setClientForm({ ...clientForm, address: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400" />
          <input placeholder="Teléfono" value={clientForm.phone} onChange={e => setClientForm({ ...clientForm, phone: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400" />
          <input placeholder="Email" value={clientForm.email} onChange={e => setClientForm({ ...clientForm, email: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400" />
        </div>
        <button onClick={addClient} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors border-none cursor-pointer">
          Guardar Cliente
        </button>
      </div>
      <div className="space-y-2">
        {clients.map(c => (
          <div key={c.id} className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{c.name}</div>
              <div className="text-xs text-gray-400">{[c.rut, c.giro, c.phone, c.email].filter(Boolean).join(' · ')}</div>
            </div>
            <button onClick={() => cotizarClick(c)}
              className="text-xs px-3 py-1.5 bg-brand-50 text-brand-600 rounded-lg font-medium hover:bg-brand-100 transition-colors border-none cursor-pointer">
              Cotizar
            </button>
            <button onClick={() => deleteClient(c.id)} className="text-xs text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer">🗑️</button>
          </div>
        ))}
        {clients.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No hay clientes</p>}
      </div>
    </div>
  )

  const NewQuotePage = () => (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-4">Nueva Cotización</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">🏢</div>
            <div>
              <div className="font-bold text-sm">{company.name}</div>
              <div className="text-xs text-gray-400">{[company.rut, company.phone].filter(Boolean).join(' · ')}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-bold mb-3">Datos del Cliente</h3>
            {clients.length > 0 && (
              <select onChange={e => {
                const c = clients.find(x => x.id === parseInt(e.target.value))
                if (c) setQuoteClient({ name: c.name, rut: c.rut, giro: c.giro, address: c.address, phone: c.phone, email: c.email, project: quoteClient.project })
              }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400 bg-white mb-3">
                <option value="">— Cliente frecuente —</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[{ k: 'name', p: 'Nombre *' }, { k: 'rut', p: 'RUT' }, { k: 'giro', p: 'Giro' }, { k: 'address', p: 'Dirección' }, { k: 'phone', p: 'Teléfono' }, { k: 'email', p: 'Email *' }].map(f => (
                <input key={f.k} placeholder={f.p} value={quoteClient[f.k]} onChange={e => setQuoteClient({ ...quoteClient, [f.k]: e.target.value })}
                  className={`px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400 ${f.k === 'name' || f.k === 'address' ? 'sm:col-span-2' : ''}`} />
              ))}
              <input placeholder="Proyecto / Obra" value={quoteClient.project} onChange={e => setQuoteClient({ ...quoteClient, project: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400 sm:col-span-2" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-bold mb-3">Productos</h3>
            <input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-400 mb-3" />
            <div className="max-h-80 overflow-y-auto space-y-1">
              {Object.entries(grouped).map(([cat, prods]) => (
                <div key={cat}>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide px-1 py-1.5">{cat}</div>
                  {prods.map(p => (
                    <div key={p.id} onClick={() => addItem(p)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-brand-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.unit === 'unidad' ? '' : `(${p.unit})`}</div>
                      </div>
                      <div className="text-sm font-bold text-brand-600">${fmt(p.price)}</div>
                      <button onClick={(e) => { e.stopPropagation(); addItem(p) }}
                        className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 text-lg font-bold flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors border-none cursor-pointer">+</button>
                    </div>
                  ))}
                </div>
              ))}
              {Object.keys(grouped).length === 0 && <p className="text-sm text-gray-400 text-center py-6">Sin resultados</p>}
            </div>
          </div>
        </div>

        <div className="xl:sticky xl:top-6 self-start">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b-2 border-brand-500">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">🏢</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{company.name}</div>
                  <div className="text-xs text-gray-400">{company.rut || ''}</div>
                </div>
                <div className="text-xs text-gray-400 text-right whitespace-nowrap">COT-PREVIEW</div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <strong>Cliente:</strong> {quoteClient.name || '—'}{quoteClient.rut ? ` · ${quoteClient.rut}` : ''}
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-[1fr_70px_70px_70px] gap-1 text-xs font-bold text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-200">
                <span>Producto</span>
                <span className="text-right">Cant.</span>
                <span className="text-right">Precio</span>
                <span className="text-right">Total</span>
              </div>
              <div className="min-h-[80px]">
                {items.map(i => (
                  <div key={i.product_id} className="grid grid-cols-[1fr_70px_70px_70px] gap-1 py-2 border-b border-gray-100 text-sm items-center">
                    <span className="font-medium">{i.name}</span>
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => changeQty(i.product_id, -1)}
                        className="w-5 h-5 rounded-full border border-gray-200 text-xs font-bold bg-white flex items-center justify-center hover:border-brand-400 cursor-pointer leading-none">−</button>
                      <input type="number" min="1" value={i.qty} onChange={e => setQty(i.product_id, e.target.value)}
                        className="w-8 text-center border border-gray-200 rounded text-xs font-bold outline-none focus:border-brand-400" />
                      <button onClick={() => changeQty(i.product_id, 1)}
                        className="w-5 h-5 rounded-full border border-gray-200 text-xs font-bold bg-white flex items-center justify-center hover:border-brand-400 cursor-pointer leading-none">+</button>
                      <button onClick={() => removeItem(i.product_id)}
                        className="text-red-400 text-xs bg-transparent border-none cursor-pointer">✕</button>
                    </div>
                    <span className="text-right">${fmt(i.price)}</span>
                    <span className="text-right font-bold">${fmt(i.price * i.qty)}</span>
                  </div>
                ))}
                {items.length === 0 && <div className="text-center py-6 text-xs text-gray-400">Agrega productos desde la lista</div>}
              </div>
              <div className="border-t-2 border-gray-200 pt-2 mt-1 space-y-1">
                <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
                <div className="flex justify-between text-sm text-gray-500"><span>IVA 19%</span><span>${fmt(iva)}</span></div>
                <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2"><span>Total</span><span className="text-brand-600">${fmt(total)}</span></div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button onClick={() => alert('Esta función está disponible en la versión completa. ¡Adquiere esta plantilla para activarla! 💼')}
                className="w-full py-2.5 bg-brand-600 text-white rounded-lg text-sm font-bold hover:bg-brand-700 transition-colors border-none cursor-pointer">
                Generar Cotización
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">Demo — La generación y descarga están disponibles en la versión completa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <DashboardPage />
      case 'products': return <ProductsPage />
      case 'clients': return <ClientsPage />
      case 'new-quote': return <NewQuotePage />
      default: return <DashboardPage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans antialiased">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="text-lg font-bold text-brand-600">MiCotizador</div>
          <span className="text-xs px-2 py-1 rounded-full bg-brand-50 text-brand-600 font-medium">Demo interactiva</span>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 lg:p-6 pb-20 lg:pb-6">
          {renderPage()}
        </main>
      </div>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50">
        {nav.filter(n => n.key !== 'new-quote').map(({ key, label, icon }) => (
          <button key={key} onClick={() => setPage(key)}
            className={`flex-1 flex flex-col items-center py-2 text-xs ${page === key ? 'text-brand-600' : 'text-gray-400'}`}>
            <span className="text-lg">{icon}</span>
            <span className="mt-0.5">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}