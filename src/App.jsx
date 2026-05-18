import { useState } from 'react'
import { Search, ExternalLink, ChevronDown, Star, X, ArrowLeft, ShoppingCart, Menu, User, LogIn, Home, ChevronRight, Heart, Share2, Phone, Mail, MapPin, Clock } from 'lucide-react'

const templates = [
  { id: 1, title: 'Rizoma Space', category: 'landing', tags: ['Servicios', 'Contenedores'], color: 'from-emerald-800 to-green-500', desc: 'Landing page para empresa de servicios con galería, certificaciones y cotizador WhatsApp.' },
  { id: 2, title: 'MiCotizador', category: 'saas', tags: ['Herramienta', 'Cotizaciones'], color: 'from-blue-700 to-cyan-400', desc: 'SaaS para generar cotizaciones con autenticación, clientes y productos. Ideal para pymes.' },
  { id: 3, title: 'Tienda Online', category: 'ecommerce', tags: ['E-commerce', 'Catálogo'], color: 'from-violet-700 to-pink-500', desc: 'Tienda virtual con carrito de compras, pasarela de pago y panel de administración.' },
  { id: 4, title: 'Bufete Jurídico', category: 'corporativa', tags: ['Profesional', 'Servicios'], color: 'from-slate-800 to-blue-900', desc: 'Web corporativa para estudios jurídicos con perfiles de abogados y blog de artículos.' },
  { id: 5, title: 'Restaurante', category: 'landing', tags: ['Gastronomía', 'Menú'], color: 'from-amber-700 to-orange-400', desc: 'Landing con menú digital, galería de platos y reservas online.' },
  { id: 6, title: 'Blog Personal', category: 'blog', tags: ['Contenido', 'Blog'], color: 'from-teal-700 to-emerald-400', desc: 'Blog moderno con sistema de artículos, categorías y newsletter integrado.' },
  { id: 7, title: 'Clínica Dental', category: 'corporativa', tags: ['Salud', 'Reservas'], color: 'from-cyan-700 to-sky-400', desc: 'Web para clínicas con agenda online, perfiles de doctores y fichas de tratamientos.' },
  { id: 8, title: 'Constructoras', category: 'landing', tags: ['Construcción', 'Portafolio'], color: 'from-stone-700 to-yellow-700', desc: 'Landing para constructoras con portafolio de proyectos y calculadora de presupuestos.' },
  { id: 9, title: 'Marketplace', category: 'ecommerce', tags: ['Multi-vendedor', 'E-commerce'], color: 'from-fuchsia-700 to-rose-500', desc: 'Marketplace completo con múltiples vendedores, comisiones y dashboard.' },
  { id: 10, title: 'Gimnasio', category: 'landing', tags: ['Fitness', 'Planes'], color: 'from-red-700 to-orange-500', desc: 'Landing para gimnasios con planes de membresía, horarios y registro de alumnos.' },
  { id: 11, title: 'Agencia Digital', category: 'corporativa', tags: ['Agencia', 'Portafolio'], color: 'from-indigo-700 to-purple-500', desc: 'Web corporativa para agencias con portafolio interactivo y blog de servicios.' },
  { id: 12, title: 'Inmobiliaria', category: 'ecommerce', tags: ['Propiedades', 'Catálogo'], color: 'from-green-800 to-lime-500', desc: 'Catálogo de propiedades con filtros, mapa interactivo y tour virtual 360°.' },
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
  const [preview, setPreview] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const filtered = templates.filter(t => {
    const matchCategory = filter === 'todas' || t.category === filter
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    return matchCategory && matchSearch
  })

  if (preview) {
    return <TemplatePreview template={preview} onBack={() => setPreview(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
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
            Explora nuestra galería de sitios web prediseñados. Elige el que más te guste y lo personalizamos para tu negocio.
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
          <p className="mt-2 text-gray-600">Haz click en cualquier plantilla para ver una demo interactiva</p>
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
              <article key={t.id} onClick={() => setPreview(t)}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className={`h-48 bg-gradient-to-br ${t.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative z-10 text-center p-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold mb-2">{t.title[0]}</div>
                    <p className="text-white/90 font-semibold text-sm">{t.title}</p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 flex items-center justify-center">
                    <span className="text-white font-semibold flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                      <ExternalLink className="w-4 h-4" /> Vista Previa
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
              { num: '1', title: 'Elige tu Plantilla', desc: 'Revisa la galería y selecciona el diseño que más vaya con tu negocio.' },
              { num: '2', title: 'Personalizamos', desc: 'Te ajustamos colores, textos, imágenes y dominio para que sea 100% tuyo.' },
              { num: '3', title: 'Publicamos', desc: 'Lo subimos a internet en 24 horas y te entregamos todo listo para funcionar.' },
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
          <form className="mt-8 space-y-4 text-left">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Tu nombre" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
              <input type="email" placeholder="Tu email" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
              <option value="">Tipo de página que necesitas</option>
              <option value="landing">Landing Page</option>
              <option value="ecommerce">E-commerce</option>
              <option value="corporativa">Corporativa</option>
              <option value="saas">SaaS / App</option>
              <option value="blog">Blog</option>
              <option value="otro">Otro</option>
            </select>
            <textarea rows={4} placeholder="Cuéntanos sobre tu proyecto..." className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
              Enviar Cotización
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>&copy; 2026 MiPaginaWeb. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

function TemplatePreview({ template, onBack }) {
  const [showCart, setShowCart] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const renderDemo = () => {
    switch (template.category) {
      case 'landing': return <LandingDemo template={template} />
      case 'ecommerce': return <EcommerceDemo template={template} cartCount={cartCount} setCartCount={setCartCount} showCart={showCart} setShowCart={setShowCart} />
      case 'corporativa': return <CorporateDemo template={template} />
      case 'saas': return <SaasDemo template={template} />
      case 'blog': return <BlogDemo template={template} />
      default: return <LandingDemo template={template} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver a la galería
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 capitalize font-medium">{template.category}</span>
          <span className="text-sm font-semibold text-gray-900 hidden sm:inline">{template.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="#contacto" className="text-xs sm:text-sm bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-blue-700 transition-all">
            Quiero esta plantilla
          </a>
        </div>
      </div>
      <div className="min-h-[calc(100vh-48px)]">
        {renderDemo()}
      </div>
    </div>
  )
}

function NavBar({ brand, links, ctas, dark, transparent }) {
  return (
    <nav className={`px-4 sm:px-6 lg:px-8 ${transparent ? 'absolute top-0 left-0 right-0 z-30' : ''} ${dark ? 'bg-gray-900 text-white' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-2 font-bold text-lg">{brand}</div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map(l => <a key={l.label} href="#" className={dark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>{l.label}</a>)}
          {ctas?.map(cta => (
            <a key={cta.label} href="#" className={`px-4 py-2 rounded-lg text-sm font-semibold ${cta.primary ? 'bg-blue-600 text-white hover:bg-blue-700' : dark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function HeroSection({ badge, title, highlight, subtitle, cta1, cta2, gradient, image }) {
  return (
    <section className={`px-4 sm:px-6 lg:px-8 py-16 sm:py-24 ${gradient || 'bg-gradient-to-br from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {badge && <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">{badge}</span>}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900">
              {title} {highlight && <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">{highlight}</span>}
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {cta1 && <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200">{cta1}</a>}
              {cta2 && <a href="#" className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-gray-300">{cta2}</a>}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-8 flex items-center justify-center h-80">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-white/60 backdrop-blur flex items-center justify-center text-3xl font-bold text-blue-600 mb-3">{image || '📱'}</div>
                <p className="text-gray-500 text-sm">Vista previa del diseño</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Section({ id, title, highlight, subtitle, dark, children, className }) {
  return (
    <section id={id} className={`px-4 sm:px-6 lg:px-8 py-16 ${dark ? 'bg-gray-900 text-white' : 'bg-white'} ${className || ''}`}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl sm:text-4xl font-bold">{title} {highlight && <span className="text-blue-600">{highlight}</span>}</h2>}
            {subtitle && <p className={`mt-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

function Card({ icon, title, desc, dark }) {
  return (
    <div className={`p-6 rounded-2xl ${dark ? 'bg-gray-800' : 'bg-gray-50 border border-gray-100'} hover:shadow-lg transition-all`}>
      {icon && <div className={`w-12 h-12 rounded-xl ${dark ? 'bg-gray-700' : 'bg-blue-100'} flex items-center justify-center mb-4 text-blue-600`}>{icon}</div>}
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
    </div>
  )
}

function Footer({ dark, brand }) {
  return (
    <footer className={`px-4 sm:px-6 lg:px-8 py-8 text-center text-sm ${dark ? 'bg-gray-950 text-gray-500' : 'bg-gray-50 text-gray-500 border-t border-gray-100'}`}>
      <p>&copy; 2026 {brand}. Demo interactiva.</p>
    </footer>
  )
}

function LandingDemo({ template }) {
  const services = [
    { icon: '🔧', title: 'Servicio Técnico', desc: 'Profesionales certificados para tu proyecto' },
    { icon: '⭐', title: 'Calidad Garantizada', desc: 'Materiales y procesos de primera calidad' },
    { icon: '🚚', title: 'Entrega Rápida', desc: 'Respuesta en menos de 24 horas' },
  ]
  const gallery = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4', 'Proyecto 5', 'Proyecto 6']
  return (
    <div className="text-gray-900">
      <NavBar brand={template.title} links={[{label:'Inicio'},{label:'Servicios'},{label:'Galería'},{label:'Contacto'}]} ctas={[{label:'Cotizar', primary:true}]} />
      <HeroSection badge={template.tags[0]} title={template.title} subtitle={template.desc} cta1="Cotiza Ahora" cta2="Ver Servicios" />
      <Section id="services" title="Nuestros" highlight="Servicios" subtitle="Todo lo que necesitas en un solo lugar">
        <div className="grid sm:grid-cols-3 gap-6">{services.map(s => <Card key={s.title} icon={<span className="text-xl">{s.icon}</span>} title={s.title} desc={s.desc} />)}</div>
      </Section>
      <Section id="gallery" title="Galería de" highlight="Proyectos" subtitle="Conoce nuestros trabajos realizados" dark>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {gallery.map((g, i) => (
            <div key={i} className="aspect-video rounded-xl bg-gray-800 flex items-center justify-center text-gray-500 text-sm hover:bg-gray-700 transition-colors cursor-pointer">
              {g}
            </div>
          ))}
        </div>
      </Section>
      <Section id="contact" title="Contácta" highlight="con Nosotros">
        <div className="max-w-lg mx-auto space-y-4">
          <input placeholder="Nombre" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <input placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <textarea placeholder="Mensaje" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <a href="#" className="block text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">Enviar Mensaje</a>
        </div>
      </Section>
      <Footer brand={template.title} />
    </div>
  )
}

function EcommerceDemo({ template, cartCount, setCartCount, showCart, setShowCart }) {
  const products = [
    { name: 'Producto Premium', price: '$45.990', tag: 'Nuevo' },
    { name: 'Oferta Especial', price: '$29.990', tag: 'Oferta' },
    { name: 'Edición Limitada', price: '$89.990', tag: 'Exclusivo' },
    { name: 'Pack Ahorro', price: '$59.990', tag: 'Popular' },
    { name: 'Artículo Top', price: '$35.990', tag: 'Más vendido' },
    { name: 'Kit Completo', price: '$120.990', tag: 'Set' },
  ]
  return (
    <div className="text-gray-900">
      <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <span className="font-bold text-lg">{template.title}</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-gray-900">Inicio</a>
            <a href="#" className="hover:text-gray-900">Tienda</a>
            <a href="#" className="hover:text-gray-900">Categorías</a>
            <a href="#" className="hover:text-gray-900">Ofertas</a>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-600 cursor-pointer" />
            <div className="relative cursor-pointer" onClick={() => setShowCart(!showCart)}>
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </div>
          </div>
        </div>
      </nav>
      {showCart && (
        <div className="fixed right-4 top-20 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-80">
          <h3 className="font-semibold mb-4">Carrito ({cartCount})</h3>
          {cartCount === 0 ? <p className="text-sm text-gray-500">Carrito vacío</p> : <p className="text-sm">{cartCount} producto(s) agregado(s)</p>}
          <button onClick={() => setShowCart(false)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-semibold">Cerrar</button>
        </div>
      )}
      <HeroSection badge="Tienda Online" title="Descubre nuestra" highlight="colección" subtitle="Los mejores productos con envío a todo Chile" cta1="Ver Tienda" cta2="Explorar" />
      <Section title="Productos" highlight="Destacados" subtitle="Lo más vendido de la temporada">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div key={i} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <span className="text-4xl">📦</span>
                {p.tag && <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold">{p.tag}</span>}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <p className="text-lg font-bold text-blue-600 mt-1">{p.price}</p>
                <button onClick={() => setCartCount(c => c + 1)} className="mt-3 w-full bg-gray-900 text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Por qué" highlight="elegirnos" subtitle="Tienda 100% chilena" dark>
        <div className="grid sm:grid-cols-3 gap-6">
          <Card icon={<Truck className="w-6 h-6" />} title="Envío Rápido" desc="Entregas en 2-5 días hábiles" dark />
          <Card icon={<Shield className="w-6 h-6" />} title="Pago Seguro" desc="Transferencia, débito y crédito" dark />
          <Card icon={<Headphones className="w-6 h-6" />} title="Soporte 24/7" desc="WhatsApp y chat en vivo" dark />
        </div>
      </Section>
      <Footer brand={template.title} />
    </div>
  )
}

function CorporateDemo({ template }) {
  const team = ['Ana Martínez', 'Carlos Lagos', 'María Solar', 'Pedro Rivas']
  const colors = ['bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-amber-600']
  return (
    <div className="text-gray-900">
      <NavBar brand={template.title} links={[{label:'Inicio'},{label:'Nosotros'},{label:'Servicios'},{label:'Equipo'},{label:'Contacto'}]} ctas={[{label:'Contáctanos', primary:true}]} />
      <HeroSection badge="Profesional" title="Soluciones" highlight="Profesionales" subtitle="Más de 10 años de experiencia brindando servicios de excelencia" cta1="Agenda una Cita" cta2="Conócenos" gradient="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" />
      <div className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-16 -mt-1">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-4 gap-8 text-center">
          {[{n:'+500',l:'Clientes'},{n:'+10',l:'Años'},{n:'98%',l:'Satisfacción'},{n:'+50',l:'Profesionales'}].map(s => (
            <div key={s.l}><p className="text-3xl font-bold text-blue-400">{s.n}</p><p className="text-gray-400 text-sm mt-1">{s.l}</p></div>
          ))}
        </div>
      </div>
      <Section title="Nuestros" highlight="Servicios" subtitle="Soluciones integrales para tu negocio">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Consultoría', 'Gestión Legal', 'Auditoría', 'Capacitación'].map(s => (
            <Card key={s} icon={<span className="text-xl">📋</span>} title={s} desc={`Servicio profesional de ${s.toLowerCase()} con los más altos estándares de calidad.`} />
          ))}
        </div>
      </Section>
      <Section title="Nuestro" highlight="Equipo" subtitle="Profesionales comprometidos con tu éxito" dark>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((name, i) => (
            <div key={name} className="text-center">
              <div className={`w-24 h-24 mx-auto rounded-full ${colors[i]} flex items-center justify-center text-white text-2xl font-bold mb-4`}>{name[0]}</div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-gray-400">Profesional</p>
            </div>
          ))}
        </div>
      </Section>
      <Footer brand={template.title} />
    </div>
  )
}

function SaasDemo({ template }) {
  const features = [
    { icon: '⚡', title: 'Rápido', desc: 'Procesa cotizaciones en segundos' },
    { icon: '🔒', title: 'Seguro', desc: 'Datos protegidos con encriptación' },
    { icon: '📊', title: 'Reportes', desc: 'Estadísticas en tiempo real' },
    { icon: '📱', title: 'Multiplataforma', desc: 'Funciona en cualquier dispositivo' },
    { icon: '🤝', title: 'Colaborativo', desc: 'Trabaja con tu equipo' },
    { icon: '💬', title: 'Soporte', desc: 'Ayuda disponible 24/7' },
  ]
  return (
    <div className="text-gray-900">
      <NavBar brand={
        <><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">M</div><span className="ml-2">{template.title}</span></>
      } links={[{label:'Features'},{label:'Precios'},{label:'Blog'}]} ctas={[{label:'Iniciar Sesión'},{label:'Prueba Gratis', primary:true}]} />
      <HeroSection badge="SaaS" title="La herramienta que tu" highlight="negocio necesita" subtitle="Prueba gratis por 14 días. Sin tarjeta de crédito." cta1="Comenzar Gratis" cta2="Ver Demo" />
      <Section title="Todo lo que" highlight="necesitas" subtitle="Funcionalidades diseñadas para potenciar tu negocio" dark>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => <Card key={f.title} icon={<span className="text-2xl">{f.icon}</span>} title={f.title} desc={f.desc} dark />)}
        </div>
      </Section>
      <Section title="Precios" highlight="Simples" subtitle="Sin sorpresas. El plan que necesitas al precio justo.">
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: 'Básico', price: '$0', desc: 'Para empezar', features: ['1 usuario', '10 cotizaciones/mes', 'Soporte email'] },
            { name: 'Pro', price: '$19.990', desc: 'Para crecer', popular: true, features: ['5 usuarios', 'Ilimitado', 'Soporte prioritario'] },
            { name: 'Enterprise', price: '$49.990', desc: 'Para empresas', features: ['Usuarios ilimitados', 'API', 'Soporte dedicado 24/7'] },
          ].map(plan => (
            <div key={plan.name} className={`p-6 rounded-2xl border ${plan.popular ? 'border-blue-500 bg-blue-50 shadow-xl shadow-blue-200 relative' : 'border-gray-200'}`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">Más popular</span>}
              <h3 className="font-semibold text-lg">{plan.name}</h3>
              <p className="text-3xl font-bold mt-2">{plan.price}<span className="text-sm font-normal text-gray-500">/mes</span></p>
              <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map(f => <li key={f} className="flex items-center gap-2"><span className="text-blue-600">✓</span> {f}</li>)}
              </ul>
              <a href="#" className={`mt-6 block text-center py-2.5 rounded-xl font-semibold ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                {plan.name === 'Básico' ? 'Comenzar' : 'Elegir Plan'}
              </a>
            </div>
          ))}
        </div>
      </Section>
      <Footer brand={template.title} />
    </div>
  )
}

function BlogDemo({ template }) {
  const posts = [
    { title: 'Guía completa para empezar', date: '12 May 2026', tag: 'Tutorial', excerpt: 'Todo lo que necesitas saber para comenzar tu proyecto con éxito.' },
    { title: 'Tendencias 2026', date: '8 May 2026', tag: 'Tendencias', excerpt: 'Descubre las últimas tendencias y novedades del mercado.' },
    { title: 'Consejos de expertos', date: '30 Abr 2026', tag: 'Consejos', excerpt: 'Aprende de los mejores con estos consejos prácticos y aplicables.' },
    { title: 'Casos de éxito', date: '22 Abr 2026', tag: 'Casos', excerpt: 'Historias reales de personas que transformaron su negocio.' },
    { title: 'Herramientas esenciales', date: '15 Abr 2026', tag: 'Herramientas', excerpt: 'Las herramientas que no pueden faltar en tu día a día.' },
    { title: 'Mitos y verdades', date: '5 Abr 2026', tag: 'Educación', excerpt: 'Separamos los mitos de las verdades en esta industria.' },
  ]
  const categories = ['Todos', 'Tutoriales', 'Tendencias', 'Consejos', 'Herramientas', 'Casos de Éxito']
  return (
    <div className="text-gray-900">
      <NavBar brand={template.title} links={[{label:'Inicio'},{label:'Blog'},{label:'Categorías'},{label:'Contacto'}]} ctas={[{label:'Suscribirse', primary:true}]} />
      <HeroSection badge="Blog" title="Lee, aprende" highlight="y crece" subtitle="Artículos semanales con contenido de valor para tu negocio" />
      <Section title="Últimos" highlight="Artículos" subtitle="Contenido fresco cada semana">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(c => <button key={c} className={`px-4 py-1.5 rounded-full text-sm font-medium ${c === 'Todos' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>)}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article key={i} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer">
              <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl">📝</div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">{p.tag}</span>
                  <span className="text-xs text-gray-400">{p.date}</span>
                </div>
                <h3 className="font-semibold group-hover:text-blue-600 transition-colors">{p.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Newsletter" highlight="" subtitle="Recibe los mejores artículos directo en tu correo" dark>
        <div className="max-w-md mx-auto flex gap-3">
          <input placeholder="tu@email.com" className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500" />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">Suscribir</button>
        </div>
      </Section>
      <Footer brand={template.title} />
    </div>
  )
}

function Truck(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg> }
function Shield(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> }
function Headphones(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg> }

export default App
