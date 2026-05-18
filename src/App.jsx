import { useState } from 'react'
import { Search, ChevronDown, Star, ExternalLink } from 'lucide-react'

const templates = [
  { id: 'contenedores', title: 'ContainerPro', category: 'landing', tags: ['Servicios', 'Contenedores'], img: '/screenshots/rizoma-space.jpg', desc: 'Landing page para empresa de servicios con galería, certificaciones y cotizador WhatsApp.' },
  { id: 2, title: 'MiCotizador', category: 'saas', tags: ['Herramienta', 'Cotizaciones'], img: '/screenshots/micotizador.jpg', desc: 'SaaS para generar cotizaciones con autenticación, clientes y productos.' },
  { id: 3, title: 'Tienda Online', category: 'ecommerce', tags: ['E-commerce', 'Catálogo'], img: '/screenshots/tienda-online.jpg', desc: 'Tienda virtual con carrito de compras, pasarela de pago y panel de administración.' },
  { id: 4, title: 'Bufete Jurídico', category: 'corporativa', tags: ['Profesional', 'Servicios'], img: '/screenshots/bufete-juridico.jpg', desc: 'Web corporativa para estudios jurídicos con perfiles de abogados y blog.' },
  { id: 5, title: 'Restaurante', category: 'landing', tags: ['Gastronomía', 'Menú'], img: '/screenshots/restaurante.jpg', desc: 'Landing con menú digital, galería de platos y reservas online.' },
  { id: 6, title: 'Blog Personal', category: 'blog', tags: ['Contenido', 'Blog'], img: '/screenshots/blog-personal.jpg', desc: 'Blog moderno con sistema de artículos, categorías y newsletter.' },
  { id: 7, title: 'Clínica Dental', category: 'corporativa', tags: ['Salud', 'Reservas'], img: '/screenshots/clinica-dental.jpg', desc: 'Web para clínicas con agenda online y perfiles de doctores.' },
  { id: 8, title: 'Constructora', category: 'landing', tags: ['Construcción', 'Portafolio'], img: '/screenshots/constructora.jpg', desc: 'Landing con portafolio de proyectos y calculadora de presupuestos.' },
  { id: 9, title: 'Marketplace', category: 'ecommerce', tags: ['Multi-vendedor'], img: '/screenshots/marketplace.jpg', desc: 'Marketplace completo con múltiples vendedores y dashboard.' },
  { id: 10, title: 'FitClub', category: 'landing', tags: ['Fitness', 'Planes'], img: '/screenshots/fitclub.jpg', desc: 'Landing para gimnasios con membresías, horarios y registro.' },
  { id: 11, title: 'Agencia Digital', category: 'corporativa', tags: ['Agencia', 'Portafolio'], img: '/screenshots/agencia-digital.jpg', desc: 'Web para agencias con portafolio interactivo y blog.' },
  { id: 12, title: 'Inmobiliaria', category: 'ecommerce', tags: ['Propiedades'], img: '/screenshots/inmobiliaria.jpg', desc: 'Catálogo de propiedades con filtros y tour virtual.' },
]

const categories = [
  { value: 'todas', label: 'Todas' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'corporativa', label: 'Corporativa' },
  { value: 'saas', label: 'SaaS / App' },
  { value: 'blog', label: 'Blog' },
]

function App() {
  const [filter, setFilter] = useState('todas')
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const filtered = templates.filter(t => {
    const matchCategory = filter === 'todas' || t.category === filter
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    return matchCategory && matchSearch
  })

  const openPreview = (id) => {
    window.open(`/preview/${id}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">M</div>
              <span className="font-semibold text-lg">Mi<span className="text-blue-600">Pagina</span>Web</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#galeria" className="hover:text-blue-600 transition-colors">Galería</a>
              <a href="#como-funciona" className="hover:text-blue-600 transition-colors">Cómo Funciona</a>
              <a href="#contacto" className="hover:text-blue-600 transition-colors">Contacto</a>
              <a href="#cotizar" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Cotizar</a>
            </nav>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 text-sm font-medium">
            <a href="#galeria" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-600">Galería</a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-600">Cómo Funciona</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-600">Contacto</a>
            <a href="#cotizar" onClick={() => setMenuOpen(false)} className="block py-2 text-blue-600 font-semibold">Cotizar</a>
          </div>
        )}
      </header>

      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-6">
            <Star className="w-3.5 h-3.5" /> +12 plantillas profesionales
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Tu página web en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">24 horas</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">
            Explora sitios web reales terminados. Elige el que más te guste y lo personalizamos para tu negocio.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#galeria" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
              Ver Galería <ChevronDown className="w-4 h-4" />
            </a>
            <a href="#como-funciona" className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 transition-all">
              Cómo Funciona
            </a>
          </div>
        </div>
      </section>

      <section id="galeria" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Galería de <span className="text-blue-600">Plantillas</span></h2>
          <p className="mt-2 text-gray-600">Haz click en cualquier plantilla para ver el sitio completo</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat.value} onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === cat.value
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >{cat.label}</button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar plantilla..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No encontramos plantillas con ese filtro</p>
            <button onClick={() => { setFilter('todas'); setSearch('') }} className="mt-3 text-blue-600 hover:underline text-sm">Limpiar filtros</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(t => (
              <article key={t.id} onClick={() => openPreview(t.id)}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="h-48 bg-gray-100 overflow-hidden relative">
                  <img src={t.img} alt={t.title} className="w-full h-full object-cover object-top" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <span className="text-white font-semibold flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <ExternalLink className="w-4 h-4" /> Ver Sitio
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 capitalize">{t.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{t.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {t.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="como-funciona" className="bg-white py-20 px-4 scroll-mt-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">¿Cómo <span className="text-blue-600">Funciona?</span></h2>
            <p className="mt-2 text-gray-600">Tres pasos para tener tu sitio web listo</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Elige tu Plantilla', desc: 'Revisa los sitios reales terminados y elige el diseño que más te guste.' },
              { num: '2', title: 'Personalizamos', desc: 'Te ajustamos colores, textos, logo e imágenes para que sea 100% tuyo.' },
              { num: '3', title: 'Publicamos', desc: 'Lo subimos a internet en 24 horas con tu dominio propio.' },
            ].map(step => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-lg shadow-blue-200">{step.num}</div>
                <h3 className="mt-4 font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">¿Listo para tu <span className="text-blue-600">página web?</span></h2>
          <p className="mt-2 text-gray-600">Cuéntanos qué necesitas y te cotizamos sin compromiso</p>
          <form className="mt-8 space-y-4 text-left" onSubmit={e => { e.preventDefault(); alert('¡Gracias! Te contactaremos pronto.') }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Tu nombre" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
              <input type="email" placeholder="Tu email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
              <option value="">Tipo de página que necesitas</option>
              <option value="landing">Landing Page</option>
              <option value="ecommerce">E-commerce</option>
              <option value="corporativa">Corporativa</option>
              <option value="saas">SaaS / App</option>
              <option value="blog">Blog</option>
            </select>
            <textarea rows={4} placeholder="Cuéntanos sobre tu proyecto..." className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Enviar Cotización</button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>&copy; 2026 MiPaginaWeb. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
