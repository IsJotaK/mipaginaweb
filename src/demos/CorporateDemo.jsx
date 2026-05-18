import { useState } from 'react'
import { Menu, X, Send, CheckCircle, Phone, Mail, MapPin, Users, Shield, Briefcase, Award } from 'lucide-react'

const corporates = [
  { id: 4, title: 'Bufete Jurídico', tag: 'Estudio Jurídico', hero: 'Asesoría Legal de', highlight: 'Excelencia', desc: 'Más de 20 años protegiendo los intereses de nuestros clientes con profesionalismo y dedicación.', gradient: 'from-slate-800 to-blue-900', secondary: 'from-slate-900 to-slate-800' },
  { id: 7, title: 'Clínica Dental', tag: 'Salud Dental', hero: 'Tu Sonrisa es', highlight: 'Nuestra Prioridad', desc: 'Odontología de calidad con profesionales certificados y tecnología de punta.', gradient: 'from-cyan-700 to-sky-400', secondary: 'from-cyan-800 to-cyan-900' },
  { id: 11, title: 'Agencia Digital', tag: 'Marketing Digital', hero: 'Transformamos tu', highlight: 'Presencia Digital', desc: 'Estrategias digitales que conectan tu marca con las personas adecuadas.', gradient: 'from-indigo-700 to-purple-500', secondary: 'from-indigo-800 to-indigo-900' },
]

const teamMembers = [
  { name: 'Ana Martínez', role: 'CEO & Fundadora', initials: 'AM', color: 'bg-blue-600' },
  { name: 'Carlos Lagos', role: 'Director de Operaciones', initials: 'CL', color: 'bg-emerald-600' },
  { name: 'María Solar', role: 'Jefa de Proyectos', initials: 'MS', color: 'bg-purple-600' },
  { name: 'Pedro Rivas', role: 'Analista Senior', initials: 'PR', color: 'bg-amber-600' },
  { name: 'Laura Vega', role: 'Diseñadora UX', initials: 'LV', color: 'bg-rose-600' },
  { name: 'Diego Muñoz', role: 'Desarrollador Fullstack', initials: 'DM', color: 'bg-cyan-600' },
]

const servicesList = [
  { icon: '⚖️', title: 'Derecho Corporativo', desc: 'Asesoría integral para empresas en todas las áreas del derecho corporativo.' },
  { icon: '🛡️', title: 'Defensa Legal', desc: 'Representación en juicios civiles, laborales y comerciales.' },
  { icon: '📝', title: 'Consultoría', desc: 'Análisis y estrategia legal preventiva para tu negocio.' },
  { icon: '🤝', title: 'Mediación', desc: 'Resolución de conflictos extrajudicial con mediadores certificados.' },
]

const testimonials = [
  { text: 'Excelente servicio, resolvieron todo rápido y con mucha profesionalidad.', author: 'Sofía R.', role: 'Gerenta Comercial' },
  { text: 'Llevamos 5 años trabajando con ellos, nunca un problema. Altamente recomendados.', author: 'Miguel A.', role: 'CEO TechCorp' },
  { text: 'Nos ayudaron a navegar un proceso complejo con total éxito. Equipo de primer nivel.', author: 'Carolina M.', role: 'Directora RRHH' },
]

export function CorporateDemo({ template }) {
  const [page, setPage] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const demo = corporates.find(d => d.id === template.id) || corporates[0]

  const Nav = () => (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <span className="font-bold text-lg text-gray-900">{template.title}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button onClick={() => setPage('inicio')} className={`hover:text-gray-900 ${page === 'inicio' ? 'text-blue-600' : ''}`}>Inicio</button>
          <button onClick={() => setPage('nosotros')} className={`hover:text-gray-900 ${page === 'nosotros' ? 'text-blue-600' : ''}`}>Nosotros</button>
          <button onClick={() => setPage('servicios')} className={`hover:text-gray-900 ${page === 'servicios' ? 'text-blue-600' : ''}`}>Servicios</button>
          <button onClick={() => setPage('equipo')} className={`hover:text-gray-900 ${page === 'equipo' ? 'text-blue-600' : ''}`}>Equipo</button>
          <button onClick={() => setPage('contacto')} className={`hover:text-gray-900 ${page === 'contacto' ? 'text-blue-600' : ''}`}>Contacto</button>
        </div>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2 text-sm font-medium">
          {['inicio','nosotros','servicios','equipo','contacto'].map(p => (
            <button key={p} onClick={() => { setPage(p); setMenuOpen(false) }} className="block w-full text-left py-2 text-gray-600 capitalize">{p}</button>
          ))}
        </div>
      )}
    </nav>
  )

  const InicioPage = () => (
    <>
      <section className={`px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gradient-to-br ${demo.gradient} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4 backdrop-blur">{demo.tag}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">{demo.hero} <span className="text-blue-300">{demo.highlight}</span></h1>
            <p className="mt-4 text-lg text-white/80 max-w-lg">{demo.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg">Agenda una Cita</button>
              <button className="border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">Conócenos</button>
            </div>
          </div>
        </div>
      </section>
      <section className={`px-4 sm:px-6 lg:px-8 py-16 ${demo.secondary} text-white`}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-4 gap-8 text-center">
          {[{n:'+500',l:'Clientes Satisfechos'},{n:'+20',l:'Años de Experiencia'},{n:'98%',l:'Casos Exitosos'},{n:'+50',l:'Profesionales'}].map(s => (
            <div key={s.l}>
              <p className="text-3xl sm:text-4xl font-bold text-blue-400">{s.n}</p>
              <p className="text-gray-400 text-sm mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Lo que dicen <span className="text-blue-600">nuestros clientes</span></h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex gap-1 text-blue-500 text-sm mb-3">{'★★★★★'}</div>
                <p className="text-gray-600 text-sm italic">"{t.text}"</p>
                <div className="mt-4 border-t pt-3">
                  <p className="font-semibold text-sm text-gray-900">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )

  const NosotrosPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Sobre <span className="text-blue-600">Nosotros</span></h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">Somos una empresa con más de 20 años de trayectoria, dedicada a brindar servicios profesionales de excelencia. Nuestro compromiso es la satisfacción total de cada cliente.</p>
            <p className="text-gray-600 leading-relaxed">Contamos con un equipo multidisciplinario de profesionales altamente capacitados, comprometidos con la calidad y la innovación constante.</p>
            <div className="flex items-center gap-4 pt-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${demo.gradient} flex items-center justify-center text-white`}><Award className="w-8 h-8" /></div>
              <div><p className="font-semibold text-gray-900">Certificación ISO 9001</p><p className="text-sm text-gray-500">Gestión de calidad certificada</p></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: '+500 Clientes' },
              { icon: Shield, label: 'Certificados' },
              { icon: Briefcase, label: '+20 Años' },
              { icon: Award, label: 'Excelencia' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  const ServiciosPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Nuestros <span className="text-blue-600">Servicios</span></h2>
          <p className="mt-2 text-gray-600">Soluciones profesionales integrales</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {servicesList.map(s => (
            <div key={s.title} className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0">{s.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                <button className="text-sm text-blue-600 font-medium mt-2 hover:underline">Saber más →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const EquipoPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Nuestro <span className="text-blue-600">Equipo</span></h2>
          <p className="mt-2 text-gray-600">Profesionales comprometidos con tu éxito</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(m => (
            <div key={m.name} className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all">
              <div className={`w-20 h-20 mx-auto rounded-full ${m.color} flex items-center justify-center text-white text-xl font-bold mb-4`}>{m.initials}</div>
              <h3 className="font-semibold text-gray-900">{m.name}</h3>
              <p className="text-sm text-gray-500">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const ContactoPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Contácta <span className="text-blue-600">con Nosotros</span></h2>
          <p className="mt-2 text-gray-600">Estamos listos para ayudarte</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            {sent ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">¡Mensaje enviado!</h3>
                <p className="text-gray-500 mt-2">Te contactaremos en las próximas 24 horas.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-blue-600 text-sm hover:underline">Enviar otro</button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <input type="text" placeholder="Nombre" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                <input type="tel" placeholder="Teléfono" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                <textarea rows={4} placeholder="Mensaje" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Enviar Mensaje</button>
              </form>
            )}
          </div>
          <div className="space-y-6">
            {[
              { icon: Phone, label: 'Teléfono', value: '+56 9 8661 8409' },
              { icon: Mail, label: 'Email', value: 'contacto@ejemplo.cl' },
              { icon: MapPin, label: 'Dirección', value: 'Av. Principal 123, Temuco' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><item.icon className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.label}</h4>
                  <p className="text-sm text-gray-500">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  const renderPage = () => {
    switch (page) {
      case 'inicio': return <InicioPage />;
      case 'nosotros': return <NosotrosPage />;
      case 'servicios': return <ServiciosPage />;
      case 'equipo': return <EquipoPage />;
      case 'contacto': return <ContactoPage />;
      default: return <InicioPage />;
    }
  }

  return (
    <div className="text-gray-900 min-h-screen bg-white">
      <Nav />
      {renderPage()}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 text-center text-sm bg-gray-900 text-gray-400 border-t border-gray-800">
        <p>&copy; 2026 {template.title}. Demo interactiva de MiPaginaWeb.</p>
      </footer>
    </div>
  )
}
