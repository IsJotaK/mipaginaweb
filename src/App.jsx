import { useState } from 'react'
import { Search, ExternalLink, ArrowRight, Check, Menu, X, Sparkles, Palette, Rocket } from 'lucide-react'

const templates = [
  { id: 'contenedores', title: 'ContainerPro', category: 'landing', tags: ['Servicios', 'Contenedores'], img: '/screenshots/rizoma-space.jpg', desc: 'Landing page para empresa de servicios con galería, certificaciones y cotizador WhatsApp.' },
  { id: 2, title: 'MiCotizador', category: 'saas', tags: ['Herramienta', 'Cotizaciones'], img: '/screenshots/micotizador.jpg', desc: 'App para generar cotizaciones con catálogo de productos, clientes y vista previa en vivo.' },
  { id: 'tienda-online', title: 'NovaStore', category: 'ecommerce', tags: ['E-commerce', 'Catálogo', 'Carrito'], img: '/screenshots/tienda-online.jpg', desc: 'Tienda virtual moderna con carrito de compras lateral, categorías y checkout simulado.' },
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

const steps = [
  { icon: Palette, title: 'Elige tu Plantilla', desc: 'Revisa sitios reales terminados y elige el diseño que más conecte con tu negocio.' },
  { icon: Sparkles, title: 'Personalizamos', desc: 'Ajustamos colores, textos, logo e imágenes. Queda 100% a tu medida.' },
  { icon: Rocket, title: 'Publicamos', desc: 'Subimos tu sitio a internet en 24 horas con dominio propio y todo listo.' },
]

function App() {
  const [filter, setFilter] = useState('todas')
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)

  const filtered = templates.filter(t => {
    const matchCategory = filter === 'todas' || t.category === filter
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-ui-50 text-ui-900 font-sans antialiased selection:bg-accent-500 selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-ui-200/80 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-xl sm:px-6">
            <a href="/" className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-ui-900 text-white text-sm font-bold">M</div>
              <span className="text-sm font-semibold tracking-tight">MiPaginaWeb</span>
            </a>
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-ui-500">
              {[
                { label: 'Galería', href: '#galeria' },
                { label: 'Cómo Funciona', href: '#como-funciona' },
                { label: 'Contacto', href: '#contacto' },
              ].map(link => (
                <a key={link.href} href={link.href} className="rounded-lg px-3 py-2 transition-colors hover:bg-ui-100 hover:text-ui-900">{link.label}</a>
              ))}
              <a href="#contacto" className="ml-2 rounded-xl bg-ui-900 px-4 py-2 text-white text-sm font-medium transition-all hover:bg-ui-800">Cotizar</a>
            </nav>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden rounded-lg p-2 text-ui-500 hover:bg-ui-100 transition-colors">
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-7xl px-4 sm:px-6 lg:px-8 md:hidden">
            <div className="rounded-2xl border border-ui-200/80 bg-white p-3 shadow-lg backdrop-blur-xl space-y-1 text-sm font-medium text-ui-600">
              <a href="#galeria" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 hover:bg-ui-100 hover:text-ui-900 transition-colors">Galería</a>
              <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 hover:bg-ui-100 hover:text-ui-900 transition-colors">Cómo Funciona</a>
              <a href="#contacto" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 hover:bg-ui-100 hover:text-ui-900 transition-colors">Contacto</a>
              <a href="#cotizar" onClick={() => setMenuOpen(false)} className="block rounded-lg bg-ui-900 px-3 py-2.5 text-white text-center mt-2">Cotizar</a>
            </div>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden pt-36 pb-20 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-50/50 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-ui-200 bg-white px-4 py-1.5 text-xs font-medium text-ui-500 mb-8 shadow-xs">
              <span className="flex size-2 rounded-full bg-accent-500" />
              +12 plantillas profesionales
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ui-900 leading-[1.08]">
              Tu página web en{' '}
              <span className="text-accent-500">24 horas</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ui-500 leading-relaxed max-w-lg mx-auto">
              Explora sitios web reales terminados. Elige el que más te guste y lo personalizamos para tu negocio.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#galeria" className="inline-flex items-center gap-2 rounded-xl bg-ui-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-ui-800 shadow-lg shadow-ui-900/10">
                Ver Galería <ArrowRight className="size-4" />
              </a>
              <a href="#como-funciona" className="inline-flex items-center gap-2 rounded-xl border border-ui-200 bg-white px-5 py-2.5 text-sm font-medium text-ui-700 transition-all hover:border-ui-300 hover:bg-ui-50">
                Cómo Funciona
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="galeria" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ui-900">Galería</h2>
          <p className="mt-3 text-ui-500 text-base max-w-md mx-auto">Haz clic en cualquier plantilla para ver el sitio completo</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button key={cat.value} onClick={() => setFilter(cat.value)}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                  filter === cat.value
                    ? 'bg-ui-900 text-white shadow-xs'
                    : 'text-ui-500 hover:text-ui-900 hover:bg-ui-100'
                }`}
              >{cat.label}</button>
            ))}
          </div>
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ui-400 pointer-events-none" />
            <input type="text" placeholder="Buscar plantilla..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-ui-200 bg-white py-2 pl-9 pr-4 text-sm placeholder:text-ui-400 focus:outline-none focus:ring-2 focus:ring-accent-500/15 focus:border-accent-500 transition-all" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-ui-500">
            <p className="text-base">No encontramos plantillas con ese filtro</p>
            <button onClick={() => { setFilter('todas'); setSearch('') }} className="mt-3 text-sm text-accent-500 hover:text-accent-600 font-medium cursor-pointer">Limpiar filtros</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(t => (
              <article key={t.id} onClick={() => window.open(`/preview/${t.id}`, '_blank')}
                className="group cursor-pointer rounded-2xl border border-ui-200/80 bg-white overflow-hidden transition-all duration-300 hover:border-ui-300 hover:shadow-lg hover:shadow-ui-900/5">
                <div className="aspect-[4/3] bg-ui-100 overflow-hidden relative">
                  <img src={t.img} alt={t.title} className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
                  <div className="absolute inset-0 bg-ui-900/0 group-hover:bg-ui-900/40 transition-all flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 backdrop-blur px-4 py-2 text-xs font-medium text-ui-900 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 shadow-lg">
                      <ExternalLink className="size-3.5" /> Ver Sitio
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-ui-100 text-ui-600 capitalize">{t.category}</span>
                  </div>
                  <h3 className="font-semibold text-ui-900 leading-snug">{t.title}</h3>
                  <p className="text-sm text-ui-500 mt-1.5 line-clamp-2 leading-relaxed">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {t.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-ui-50 text-ui-500 border border-ui-100">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="como-funciona" className="bg-white border-t border-ui-100 py-24 px-4 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ui-900">Cómo Funciona</h2>
            <p className="mt-3 text-ui-500 text-base">Tres pasos para tener tu sitio web listo</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-accent-50 text-accent-500 border border-accent-100/60 mb-5">
                  <step.icon className="size-6" />
                </div>
                <div className="inline-flex items-center justify-center size-7 rounded-full bg-accent-500 text-white text-xs font-bold mb-4 -mt-2">{i + 1}</div>
                <h3 className="font-semibold text-ui-900">{step.title}</h3>
                <p className="mt-2 text-sm text-ui-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 px-4 scroll-mt-24">
        <div className="mx-auto max-w-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ui-900">¿Listo para tu página web?</h2>
            <p className="mt-3 text-ui-500 text-base">Cuéntanos qué necesitas y te cotizamos sin compromiso</p>
          </div>
          {formSent ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center size-14 rounded-full bg-accent-50 text-accent-500 mb-5">
                <Check className="size-7" />
              </div>
              <p className="text-lg font-semibold text-ui-900">¡Recibimos tu mensaje!</p>
              <p className="text-sm text-ui-500 mt-1">Te contactaremos pronto.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); setFormSent(true) }}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Tu nombre" required
                  className="w-full rounded-xl border border-ui-200 bg-white px-4 py-2.5 text-sm placeholder:text-ui-400 focus:outline-none focus:ring-2 focus:ring-accent-500/15 focus:border-accent-500 transition-all" />
                <input type="email" placeholder="Tu email" required
                  className="w-full rounded-xl border border-ui-200 bg-white px-4 py-2.5 text-sm placeholder:text-ui-400 focus:outline-none focus:ring-2 focus:ring-accent-500/15 focus:border-accent-500 transition-all" />
              </div>
              <select required
                className="w-full rounded-xl border border-ui-200 bg-white px-4 py-2.5 text-sm text-ui-900 focus:outline-none focus:ring-2 focus:ring-accent-500/15 focus:border-accent-500 transition-all">
                <option value="">Tipo de página que necesitas</option>
                <option value="landing">Landing Page</option>
                <option value="ecommerce">E-commerce</option>
                <option value="corporativa">Corporativa</option>
                <option value="saas">SaaS / App</option>
                <option value="blog">Blog</option>
              </select>
              <textarea rows={4} placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full rounded-xl border border-ui-200 bg-white px-4 py-2.5 text-sm placeholder:text-ui-400 focus:outline-none focus:ring-2 focus:ring-accent-500/15 focus:border-accent-500 transition-all resize-none" />
              <button type="submit"
                className="w-full rounded-xl bg-ui-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-ui-800 shadow-lg shadow-ui-900/10 cursor-pointer">
                Enviar Cotización
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-ui-100 bg-white py-12 px-4">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ui-400">
          <p>© 2026 MiPaginaWeb. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="text-ui-300">Diseñado con precisión</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
