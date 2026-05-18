import { useState } from 'react'
import { Menu, X, ChevronRight, Send, CheckCircle, Phone, Mail, MapPin } from 'lucide-react'

const demos = [
  { id: 1, title: 'Rizoma Space', tag: 'Servicios Industriales', hero: 'Soluciones en Gestión de Residuos', highlight: 'No Peligrosos', subtitle: 'Servicio certificado con Resolución Sanitaria para tu empresa o proyecto.', primary: 'Cotizar Ahora', secondary: 'Ver Servicios', gradient: 'from-emerald-900 to-green-600' },
  { id: 5, title: 'Restaurante', tag: 'Gastronomía', hero: 'Sabores que', highlight: 'Enamoran', subtitle: 'Descubre nuestra carta con ingredientes frescos y locales. Reserva tu mesa online.', primary: 'Ver Menú', secondary: 'Reservar Mesa', gradient: 'from-amber-800 to-orange-500' },
  { id: 8, title: 'Constructora', tag: 'Construcción', hero: 'Construimos tus', highlight: 'Proyectos', subtitle: 'Más de 15 años construyendo hogares y edificios con calidad y confianza.', primary: 'Ver Proyectos', secondary: 'Cotizar Obra', gradient: 'from-stone-800 to-yellow-700' },
  { id: 10, title: 'FitClub', tag: 'Fitness', hero: 'Transforma tu', highlight: 'Cuerpo', subtitle: 'Entrenadores certificados, equipamiento moderno y planes para todos los niveles.', primary: 'Plan Ahora', secondary: 'Conoce el Club', gradient: 'from-red-800 to-orange-500' },
]

const projects = [
  { name: 'Edificio Torres del Parque', desc: 'Proyecto residencial de 12 pisos', img: '🏗️' },
  { name: 'Remodelación Centro Comercial', desc: 'Remodelación completa 5.000 m²', img: '🏪' },
  { name: 'Casa Familiar Labranza', desc: 'Vivienda unifamiliar sostenible', img: '🏠' },
  { name: 'Oficinas Corporativas', desc: 'Edificio corporativo clase A', img: '🏢' },
]

const menuItems = [
  { name: 'Entrada Capresse', desc: 'Tomate, mozzarella y albahaca fresca', price: '$8.900', tag: 'Popular' },
  { name: 'Pasta Carbonara', desc: 'Pasta artesanal con crema y panceta', price: '$12.900', tag: 'Chef' },
  { name: 'Salmón Glaseado', desc: 'Salmón noruego con salsa de maracuyá', price: '$18.900', tag: 'Recomendado' },
  { name: 'Tiramisú', desc: 'Postre italiano tradicional', price: '$6.900', tag: 'Postre' },
  { name: 'Pizza Margherita', desc: 'Masa madre, tomate san marzano', price: '$11.900', tag: 'Clásico' },
  { name: 'Mariscos del Día', desc: 'Selección fresca del mercado', price: '$15.900', tag: 'Del día' },
]

export function LandingDemo({ template }) {
  const [page, setPage] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const demo = demos.find(d => d.id === template.id) || demos[0]
  const isConstructora = template.id === 8
  const isRestaurante = template.id === 5
  const isFitclub = template.id === 10
  const isRizoma = template.id === 1

  const navLinks = isRestaurante
    ? [{ key: 'inicio', label: 'Inicio' }, { key: 'menu', label: 'Menú' }, { key: 'galeria', label: 'Galería' }, { key: 'reservas', label: 'Reservas' }, { key: 'contacto', label: 'Contacto' }]
    : [{ key: 'inicio', label: 'Inicio' }, { key: 'servicios', label: 'Servicios' }, { key: 'galeria', label: 'Galería' }, { key: 'contacto', label: 'Contacto' }]

  const Nav = () => (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <span className="font-bold text-lg text-gray-900">{template.title}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map(l => (
            <button key={l.key} onClick={() => setPage(l.key)} className={`hover:text-gray-900 transition-colors ${page === l.key ? 'text-blue-600' : ''}`}>{l.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2 text-sm font-medium">
          {navLinks.map(l => (
            <button key={l.key} onClick={() => { setPage(l.key); setMenuOpen(false) }} className="block w-full text-left py-2 text-gray-600">{l.label}</button>
          ))}
        </div>
      )}
    </nav>
  )

  const HeroPage = () => (
    <section className={`px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gradient-to-br ${demo.gradient} text-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4 backdrop-blur">{demo.tag}</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">{demo.hero} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/50">{demo.highlight}</span></h1>
          <p className="mt-4 text-lg text-white/80 max-w-lg">{demo.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2">{demo.primary} <ChevronRight className="w-4 h-4" /></button>
            <button className="border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">{demo.secondary}</button>
          </div>
        </div>
      </div>
    </section>
  )

  const ServicesPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Nuestros <span className="text-blue-600">Servicios</span></h2>
          <p className="mt-2 text-gray-600">Soluciones profesionales para tu negocio</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🔧', title: 'Servicio Técnico', desc: 'Profesionales certificados con amplia experiencia en el rubro.' },
            { icon: '⭐', title: 'Calidad Garantizada', desc: 'Estándares de calidad certificados en cada proyecto.' },
            { icon: '🚚', title: 'Entrega Express', desc: 'Respuesta garantizada en menos de 24 horas hábiles.' },
            { icon: '📋', title: 'Asesoría Personalizada', desc: 'Te guiamos en cada paso del proceso.' },
            { icon: '🔒', title: 'Certificación', desc: isRizoma ? 'Resolución Sanitaria vigente' : 'Todos los permisos al día.' },
            { icon: '💬', title: 'Soporte 24/7', desc: 'WhatsApp y teléfono disponibles siempre.' },
          ].map(s => (
            <div key={s.title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 text-blue-600 text-xl">{s.icon}</div>
              <h3 className="font-semibold mb-2 text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const GalleryPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Galería de <span className="text-blue-400">Proyectos</span></h2>
          <p className="mt-2 text-gray-400">Conoce nuestros trabajos realizados</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <div key={i} className="aspect-video rounded-xl bg-gray-800 flex flex-col items-center justify-center gap-1 hover:bg-gray-700 transition-all cursor-pointer">
              <span className="text-3xl">{p.img}</span>
              <span className="text-sm text-gray-300 font-medium">{p.name}</span>
              <span className="text-xs text-gray-500">{p.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const MenuPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-4">🍽️ Carta</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Nuestro <span className="text-amber-600">Menú</span></h2>
          <p className="mt-2 text-gray-600">Platos preparados con los ingredientes más frescos</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {menuItems.map(item => (
            <div key={item.name} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-xl bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0">🍽️</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <span className="font-bold text-amber-700">{item.price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const ReservasPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Reserva tu <span className="text-amber-600">Mesa</span></h2>
          <p className="text-gray-600 mt-2">Te esperamos de lunes a sábado</p>
        </div>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('¡Reserva confirmada! Te contactaremos para confirmar.') }}>
          <input type="text" placeholder="Nombre completo" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <input type="tel" placeholder="Teléfono" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
            <input type="time" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          </div>
          <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm">
            <option>2 personas</option>
            <option>3 personas</option>
            <option>4 personas</option>
            <option>6+ personas</option>
          </select>
          <button type="submit" className="w-full bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition-all">Reservar</button>
        </form>
      </div>
    </section>
  )

  const ContactPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Contácta <span className="text-blue-600">con Nosotros</span></h2>
          <p className="mt-2 text-gray-600">Estamos listos para ayudarte</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            {sent ? (
              <div className="text-center py-16">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">¡Mensaje enviado!</h3>
                <p className="text-gray-500 mt-2">Te responderemos en las próximas horas.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-blue-600 text-sm hover:underline">Enviar otro</button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <input type="text" placeholder="Nombre" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                <textarea rows={4} placeholder="Mensaje" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Enviar Mensaje</button>
              </form>
            )}
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><Phone className="w-5 h-5" /></div>
              <div><h4 className="font-semibold text-gray-900">Teléfono</h4><p className="text-sm text-gray-500">+56 9 XXXX XXXX</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><Mail className="w-5 h-5" /></div>
              <div><h4 className="font-semibold text-gray-900">Email</h4><p className="text-sm text-gray-500">contacto@ejemplo.cl</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><MapPin className="w-5 h-5" /></div>
              <div><h4 className="font-semibold text-gray-900">Ubicación</h4><p className="text-sm text-gray-500">Temuco, Región de La Araucanía</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const renderPage = () => {
    switch (page) {
      case 'inicio': return <HeroPage />;
      case 'servicios': return <ServicesPage />;
      case 'galeria': return <GalleryPage />;
      case 'menu': return <MenuPage />;
      case 'reservas': return <ReservasPage />;
      case 'contacto': return <ContactPage />;
      default: return <HeroPage />;
    }
  }

  return (
    <div className="text-gray-900 min-h-screen bg-white">
      <Nav />
      {renderPage()}
      {page !== 'contacto' && <ContactPage />}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 text-center text-sm bg-gray-50 text-gray-500 border-t border-gray-100">
        <p>&copy; 2026 {template.title}. Demo interactiva de MiPaginaWeb.</p>
      </footer>
    </div>
  )
}
