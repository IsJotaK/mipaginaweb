import { useState } from 'react'
import { Menu, X, LogIn, UserPlus, Check, ChevronRight, Zap, Shield, BarChart3, Smartphone, Users, MessageCircle, Mail, Lock } from 'lucide-react'

const features = [
  { icon: Zap, title: 'Rápido', desc: 'Procesa cotizaciones en segundos, no en horas.' },
  { icon: Shield, title: 'Seguro', desc: 'Datos encriptados y respaldados automáticamente.' },
  { icon: BarChart3, title: 'Reportes', desc: 'Estadísticas en tiempo real para tu negocio.' },
  { icon: Smartphone, title: 'Multiplataforma', desc: 'Funciona en web, tablet y móvil.' },
  { icon: Users, title: 'Colaborativo', desc: 'Trabaja con tu equipo en tiempo real.' },
  { icon: MessageCircle, title: 'Soporte', desc: 'Ayuda disponible 24/7 vía chat y WhatsApp.' },
]

const plans = [
  { name: 'Básico', price: '0', desc: 'Para empezar', features: ['1 usuario', '10 cotizaciones/mes', 'Soporte email', 'Plantillas básicas'], popular: false },
  { name: 'Pro', price: '19.990', desc: 'Para crecer', features: ['5 usuarios', 'Cotizaciones ilimitadas', 'Soporte prioritario', 'API', 'Todos los reportes'], popular: true },
  { name: 'Enterprise', price: '49.990', desc: 'Para empresas', features: ['Usuarios ilimitados', 'API personalizada', 'Soporte dedicado 24/7', 'Onboarding', 'SLA garantizado'], popular: false },
]

const blogPosts = [
  { title: '10 consejos para mejorar tus cotizaciones', tag: 'Consejos', date: '12 May 2026', excerpt: 'Aprende a crear cotizaciones que convierten más clientes.' },
  { title: 'Cómo la digitalización ayuda a las pymes', tag: 'Tendencias', date: '8 May 2026', excerpt: 'Descubre por qué digitalizar tu negocio ya no es opcional.' },
  { title: 'Casos de éxito: De 10 a 200 cotizaciones', tag: 'Casos', date: '30 Abr 2026', excerpt: 'Conoce cómo esta empresa multiplicó sus ventas con nuestra plataforma.' },
]

export function SaasDemo({ template }) {
  const [page, setPage] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [demoMode, setDemoMode] = useState(false)
  const [dashboardPage, setDashboardPage] = useState('dashboard')

  const Nav = () => (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">M</div>
          {template.title}
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button onClick={() => setPage('inicio')} className={`hover:text-gray-900 ${page === 'inicio' ? 'text-blue-600' : ''}`}>Inicio</button>
          <button onClick={() => setPage('features')} className={`hover:text-gray-900 ${page === 'features' ? 'text-blue-600' : ''}`}>Features</button>
          <button onClick={() => setPage('precios')} className={`hover:text-gray-900 ${page === 'precios' ? 'text-blue-600' : ''}`}>Precios</button>
          <button onClick={() => setPage('blog')} className={`hover:text-gray-900 ${page === 'blog' ? 'text-blue-600' : ''}`}>Blog</button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setShowLogin(true); setAuthMode('login') }} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2"><LogIn className="w-4 h-4" /> Iniciar Sesión</button>
          <button onClick={() => setDemoMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200">Prueba Gratis</button>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2 text-sm font-medium">
          {['inicio','features','precios','blog'].map(p => (
            <button key={p} onClick={() => { setPage(p); setMenuOpen(false) }} className="block w-full text-left py-2 text-gray-600 capitalize">{p}</button>
          ))}
          <hr className="my-2" />
          <button onClick={() => { setShowLogin(true); setAuthMode('login'); setMenuOpen(false) }} className="block w-full text-left py-2 text-blue-600 font-medium">Iniciar Sesión</button>
        </div>
      )}
    </nav>
  )

  const LoginModal = () => (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowLogin(false)}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <button onClick={() => setShowLogin(false)}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert(authMode === 'login' ? '¡Inicio de sesión exitoso! (Demo)' : '¡Cuenta creada! (Demo)'); setShowLogin(false) }}>
          {authMode === 'register' && <input type="text" placeholder="Nombre completo" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="email" placeholder="Email" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="password" placeholder="Contraseña" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm" />
          </div>
          {authMode === 'login' && (
            <div className="text-right">
              <button className="text-xs text-blue-600 hover:underline">¿Olvidaste tu contraseña?</button>
            </div>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
            {authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta Gratis'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          {authMode === 'login' ? (
            <>¿No tienes cuenta? <button onClick={() => setAuthMode('register')} className="text-blue-600 font-medium hover:underline">Regístrate</button></>
          ) : (
            <>¿Ya tienes cuenta? <button onClick={() => setAuthMode('login')} className="text-blue-600 font-medium hover:underline">Inicia sesión</button></>
          )}
        </div>
      </div>
    </div>
  )

  const InicioPage = () => (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">🚀 SaaS</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">La herramienta que tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">negocio necesita</span></h1>
              <p className="mt-4 text-lg text-gray-600 max-w-lg">Prueba gratis por 14 días. Sin tarjeta de crédito. Cancela cuando quieras.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setDemoMode(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Probar App
                </button>
                <button onClick={() => setPage('features')} className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-gray-300">Conocer más</button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-8 h-80 flex items-center justify-center border border-blue-200/50">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center text-5xl mb-4 shadow-lg">📊</div>
                  <p className="text-gray-500 text-sm font-medium">Dashboard en vivo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: '+10.000', l: 'Usuarios Activos' },
              { n: '+50.000', l: 'Cotizaciones Creadas' },
              { n: '99.9%', l: 'Uptime' },
              { n: '4.9★', l: 'Valoración' },
            ].map(s => (
              <div key={s.l}>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{s.n}</p>
                <p className="text-sm text-gray-500 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )

  const FeaturesPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Todo lo que <span className="text-blue-600">necesitas</span></h2>
          <p className="mt-2 text-gray-600">Funcionalidades diseñadas para potenciar tu negocio</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const PreciosPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Precios <span className="text-blue-600">Simples</span></h2>
          <p className="mt-2 text-gray-600">Sin sorpresas. El plan que necesitas al precio justo.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map(plan => (
            <div key={plan.name} className={`p-6 rounded-2xl border-2 ${plan.popular ? 'border-blue-500 bg-white shadow-xl shadow-blue-200 relative' : 'border-gray-100 bg-white'}`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">Más popular</span>}
              <h3 className="font-semibold text-lg text-gray-900">{plan.name}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">${plan.price}<span className="text-sm font-normal text-gray-500">/mes</span></p>
              <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <button className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                {plan.name === 'Básico' ? 'Comenzar Gratis' : 'Elegir Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const BlogPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Blog</h2>
          <p className="mt-2 text-gray-600">Contenido de valor para tu negocio</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {blogPosts.map(post => (
            <article key={post.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              <div className="h-44 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-4xl">📝</div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">{post.tag}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
                <button className="text-sm text-blue-600 font-medium mt-3 hover:underline">Leer más →</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )

  const DashboardPage = () => (
    <div className="flex h-[calc(100vh-48px)] bg-gray-50">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 font-bold text-lg mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">M</div>
          MiCotizador
        </div>
        <nav className="flex-1 space-y-1">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: '📊' },
            { key: 'cotizaciones', label: 'Cotizaciones', icon: '📄' },
            { key: 'clientes', label: 'Clientes', icon: '👥' },
            { key: 'productos', label: 'Productos', icon: '📦' },
            { key: 'config', label: 'Configuración', icon: '⚙️' },
          ].map(item => (
            <button key={item.key} onClick={() => setDashboardPage(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${dashboardPage === item.key ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => setDemoMode(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 mt-4 border-t pt-4">
          ← Salir de demo
        </button>
      </aside>
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{dashboardPage}</h1>
              <p className="text-sm text-gray-500">Demo interactiva - Modo de prueba</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">Demo activa</span>
              <button onClick={() => setDemoMode(false)} className="lg:hidden text-sm text-gray-500 hover:text-gray-900">Salir</button>
            </div>
          </div>

          {dashboardPage === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Cotizaciones del mes', value: '47', change: '+12%', color: 'bg-blue-500' },
                  { label: 'Clientes activos', value: '23', change: '+3', color: 'bg-emerald-500' },
                  { label: 'Productos registrados', value: '156', change: '+8', color: 'bg-purple-500' },
                  { label: 'Tasa de conversión', value: '68%', change: '+5%', color: 'bg-amber-500' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{s.label}</span>
                      <div className={`w-2 h-2 rounded-full ${s.color}`} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{s.value}</p>
                    <p className="text-sm text-green-600 mt-1">{s.change}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Últimas Cotizaciones</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="text-left p-4 font-medium">Cliente</th>
                        <th className="text-left p-4 font-medium">Producto</th>
                        <th className="text-left p-4 font-medium">Monto</th>
                        <th className="text-left p-4 font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { client: 'Constructora del Sur', product: 'Contenedor 7m³', amount: '$450.000', status: 'Aprobada', color: 'text-green-700 bg-green-50' },
                        { client: 'Restaurante La Unión', product: 'Menú Digital', amount: '$250.000', status: 'Pendiente', color: 'text-amber-700 bg-amber-50' },
                        { client: 'Clínica DentalCare', product: 'Web Corporativa', amount: '$890.000', status: 'Borrador', color: 'text-gray-700 bg-gray-100' },
                        { client: 'FitClub Temuco', product: 'Landing Page', amount: '$180.000', status: 'Aprobada', color: 'text-green-700 bg-green-50' },
                      ].map(row => (
                        <tr key={row.client} className="hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">{row.client}</td>
                          <td className="p-4 text-gray-600">{row.product}</td>
                          <td className="p-4 text-gray-900">{row.amount}</td>
                          <td className="p-4"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${row.color}`}>{row.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {dashboardPage === 'cotizaciones' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <span className="text-5xl mb-4 block">📄</span>
              <h3 className="text-lg font-semibold text-gray-900">Gestión de Cotizaciones</h3>
              <p className="text-gray-500 text-sm mt-1">Crea, edita y envía cotizaciones profesionales.</p>
              <button className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700">Nueva Cotización</button>
            </div>
          )}

          {dashboardPage === 'clientes' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <span className="text-5xl mb-4 block">👥</span>
              <h3 className="text-lg font-semibold text-gray-900">Base de Clientes</h3>
              <p className="text-gray-500 text-sm mt-1">Administra tus clientes con historial de cotizaciones.</p>
              <button className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700">+ Nuevo Cliente</button>
            </div>
          )}

          {dashboardPage === 'productos' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <span className="text-5xl mb-4 block">📦</span>
              <h3 className="text-lg font-semibold text-gray-900">Catálogo de Productos</h3>
              <p className="text-gray-500 text-sm mt-1">Gestiona tu catálogo con precios y descripciones.</p>
              <button className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700">+ Agregar Producto</button>
            </div>
          )}

          {dashboardPage === 'config' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <span className="text-5xl mb-4 block">⚙️</span>
              <h3 className="text-lg font-semibold text-gray-900">Configuración</h3>
              <p className="text-gray-500 text-sm mt-1">Personaliza tu empresa, impuestos y plantillas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    if (demoMode) return <DashboardPage />
    switch (page) {
      case 'inicio': return <InicioPage />;
      case 'features': return <FeaturesPage />;
      case 'precios': return <PreciosPage />;
      case 'blog': return <BlogPage />;
      default: return <InicioPage />;
    }
  }

  return (
    <div className="text-gray-900 min-h-screen bg-white">
      <Nav />
      {renderPage()}
      {showLogin && <LoginModal />}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 text-center text-sm bg-gray-900 text-gray-400 border-t border-gray-800">
        <p>&copy; 2026 {template.title}. Demo interactiva de MiPaginaWeb.</p>
      </footer>
    </div>
  )
}
