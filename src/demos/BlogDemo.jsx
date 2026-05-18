import { useState } from 'react'
import { Menu, X, Search, ChevronRight, Heart, Share2, Clock, User, Tag, ArrowLeft, Calendar } from 'lucide-react'

const allPosts = [
  { id: 1, title: 'Guía completa para empezar tu negocio online', tag: 'Tutorial', date: '12 May 2026', readTime: '8 min', excerpt: 'Todo lo que necesitas saber para lanzar tu negocio en internet con éxito.', content: 'Emprender online nunca fue tan accesible. En esta guía completa te mostraremos paso a paso cómo crear tu negocio digital desde cero, eligiendo el nicho correcto, registrando tu dominio, creando tu sitio web y comenzando a vender. Aprenderás sobre las plataformas más recomendadas, estrategias de marketing digital y cómo evitar los errores más comunes que cometen los emprendedores primerizos.', author: 'María Solar', authorRole: 'Emprendedora' },
  { id: 2, title: 'Tendencias digitales que marcarán 2026', tag: 'Tendencias', date: '8 May 2026', readTime: '6 min', excerpt: 'Descubre las tendencias que transformarán la forma de hacer negocios este año.', content: 'La inteligencia artificial, la automatización y la personalización masiva están redefiniendo la experiencia del cliente. En este artículo analizamos las principales tendencias digitales que todo negocio debe considerar para mantenerse competitivo: desde chatbots con IA hasta estrategias de contenido generativo y comercio conversacional.', author: 'Carlos Lagos', authorRole: 'Analista Digital' },
  { id: 3, title: '10 consejos para aumentar tus ventas online', tag: 'Consejos', date: '30 Abr 2026', readTime: '5 min', excerpt: 'Estrategias probadas para convertir más visitantes en clientes.', content: 'Aumentar la tasa de conversión es el objetivo de todo negocio online. Compartimos 10 tácticas que puedes implementar hoy mismo: optimización de fichas de producto, pruebas sociales, urgencia bien utilizada, simplificación del checkout, email marketing segmentado y más. Cada consejo incluye ejemplos prácticos y herramientas recomendadas.', author: 'Laura Vega', authorRole: 'Marketing Manager' },
  { id: 4, title: 'Casos de éxito: de 0 a 100 clientes en 3 meses', tag: 'Casos', date: '22 Abr 2026', readTime: '10 min', excerpt: 'Historias reales de negocios que lograron un crecimiento acelerado.', content: 'Conoce la historia de tres emprendedores que partieron desde cero y lograron construir una base sólida de clientes en menos de un trimestre. Analizamos sus estrategias, los canales que utilizaron, los obstáculos que enfrentaron y las lecciones que cualquier negocio puede aplicar.', author: 'Pedro Rivas', authorRole: 'Consultor' },
  { id: 5, title: 'Herramientas esenciales para tu negocio', tag: 'Herramientas', date: '15 Abr 2026', readTime: '7 min', excerpt: 'Las herramientas que no pueden faltar en tu día a día como emprendedor.', content: 'Seleccionamos las mejores herramientas para gestionar tu negocio: desde CRM y plataformas de email marketing hasta herramientas de diseño, gestión de proyectos y analítica web. Todas con versiones gratuitas o trials para que puedas probarlas antes de invertir.', author: 'Diego Muñoz', authorRole: 'Desarrollador' },
  { id: 6, title: 'Mitos y verdades del marketing digital', tag: 'Educación', date: '5 Abr 2026', readTime: '6 min', excerpt: 'Separamos los mitos de las verdades en el mundo del marketing digital.', content: '¿El SEO está muerto? ¿Las redes sociales son gratis? ¿Más seguidores = más ventas? En este artículo desmentimos los mitos más comunes del marketing digital y te contamos lo que realmente funciona basado en datos y experiencia real.', author: 'Ana Martínez', authorRole: 'Directora Creativa' },
]

const categories = ['Todos', 'Tutorial', 'Tendencias', 'Consejos', 'Casos', 'Herramientas', 'Educación']

export function BlogDemo({ template }) {
  const [page, setPage] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = allPosts.filter(p => {
    const matchCat = activeCategory === 'Todos' || p.tag === activeCategory
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = allPosts[0]

  const Nav = () => (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <span className="font-bold text-lg text-gray-900">{template.title}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button onClick={() => setPage('inicio')} className={`hover:text-gray-900 ${page === 'inicio' ? 'text-teal-600' : ''}`}>Inicio</button>
          <button onClick={() => setPage('blog')} className={`hover:text-gray-900 ${page === 'blog' ? 'text-teal-600' : ''}`}>Blog</button>
          <button onClick={() => setPage('categorias')} className={`hover:text-gray-900 ${page === 'categorias' ? 'text-teal-600' : ''}`}>Categorías</button>
          <button onClick={() => setPage('contacto')} className={`hover:text-gray-900 ${page === 'contacto' ? 'text-teal-600' : ''}`}>Contacto</button>
        </div>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2 text-sm font-medium">
          {['inicio','blog','categorias','contacto'].map(p => (
            <button key={p} onClick={() => { setPage(p); setMenuOpen(false) }} className="block w-full text-left py-2 text-gray-600 capitalize">{p}</button>
          ))}
        </div>
      )}
    </nav>
  )

  const InicioPage = () => (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gradient-to-br from-teal-800 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4 backdrop-blur">📖 Blog</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">Lee, aprende <span className="text-emerald-200">y crece</span></h1>
          <p className="mt-4 text-lg text-white/80 max-w-lg mx-auto">Artículos semanales con contenido de valor para tu negocio. Escritos por expertos.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => setPage('blog')} className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 shadow-lg flex items-center gap-2">Ver Artículos <ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Artículo <span className="text-teal-600">Destacado</span></h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer" onClick={() => { setSelectedPost(featured); setPage('blog') }}>
            <div className="h-64 lg:h-auto bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-6xl">📝</div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-medium">{featured.tag}</span>
                <span className="text-xs text-gray-400"><Calendar className="w-3 h-3 inline mr-1" />{featured.date}</span>
                <span className="text-xs text-gray-400"><Clock className="w-3 h-3 inline mr-1" />{featured.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 hover:text-teal-600 transition-colors">{featured.title}</h3>
              <p className="text-gray-600 mt-3">{featured.excerpt}</p>
              <button className="mt-4 text-teal-600 font-medium text-sm hover:underline flex items-center gap-1">Leer artículo <ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>
    </>
  )

  const BlogPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Últimos <span className="text-teal-600">Artículos</span></h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === c ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >{c}</button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No encontramos artículos</p>
            <button onClick={() => { setActiveCategory('Todos'); setSearchTerm('') }} className="mt-2 text-teal-600 hover:underline text-sm">Limpiar filtros</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <article key={post.id} onClick={() => setSelectedPost(post)} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer">
                <div className="h-44 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-4xl">📝</div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-medium">{post.tag}</span>
                    <span className="text-xs text-gray-400"><Calendar className="w-3 h-3 inline mr-1" />{post.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 hover:text-teal-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <button className="text-sm text-teal-600 font-medium hover:underline">Leer →</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )

  const PostPage = () => {
    if (!selectedPost) return null
    const related = allPosts.filter(p => p.id !== selectedPost.id && p.tag === selectedPost.tag).slice(0, 3)
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4" /> Volver al blog
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-medium">{selectedPost.tag}</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{selectedPost.date}</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{selectedPost.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{selectedPost.title}</h1>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold">{selectedPost.author[0]}</div>
              <div>
                <p className="font-semibold text-sm text-gray-900">{selectedPost.author}</p>
                <p className="text-xs text-gray-500">{selectedPost.authorRole}</p>
              </div>
            </div>
          </div>
          <div className="prose prose-gray max-w-none">
            <div className="h-64 rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-6xl mb-8">📝</div>
            <p className="text-lg text-gray-700 leading-relaxed">{selectedPost.content}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">Continuar leyendo... Este es un artículo de demostración que muestra cómo se vería el contenido completo en un blog real. Los lectores pueden navegar, compartir y comentar cada publicación.</p>
          </div>
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"><Heart className="w-4 h-4" /> Me gusta</button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"><Share2 className="w-4 h-4" /> Compartir</button>
          </div>
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Artículos relacionados</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map(p => (
                  <div key={p.id} onClick={() => setSelectedPost(p)} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer hover:shadow-md transition-all">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-medium">{p.tag}</span>
                    <h4 className="font-semibold text-sm text-gray-900 mt-2">{p.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{p.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  const CategoriasPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Categorías</h2>
          <p className="mt-2 text-gray-600">Explora contenido por tema</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {['Tutorial', 'Tendencias', 'Consejos', 'Casos', 'Herramientas', 'Educación'].map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setPage('blog') }}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg hover:border-teal-200 transition-all text-center">
              <span className="font-semibold text-gray-900">{cat}</span>
              <p className="text-xs text-gray-500 mt-1">{allPosts.filter(p => p.tag === cat).length} artículos</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )

  const ContactoPage = () => (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Contacto</h2>
        <p className="text-gray-600 text-center mb-8">¿Tienes alguna sugerencia o quieres escribir para el blog?</p>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('¡Mensaje enviado! Te contactaremos pronto.'); }}>
          <input type="text" placeholder="Nombre" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <textarea rows={4} placeholder="Mensaje" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all">Enviar</button>
        </form>
      </div>
    </section>
  )

  const renderPage = () => {
    if (selectedPost && page === 'blog') return <PostPage />
    switch (page) {
      case 'inicio': return <InicioPage />;
      case 'blog': return <BlogPage />;
      case 'categorias': return <CategoriasPage />;
      case 'contacto': return <ContactoPage />;
      default: return <InicioPage />;
    }
  }

  return (
    <div className="text-gray-900 min-h-screen bg-white">
      <Nav />
      {renderPage()}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 text-center text-sm bg-gray-900 text-gray-400">
        <p>&copy; 2026 {template.title}. Demo interactiva de MiPaginaWeb.</p>
      </footer>
    </div>
  )
}
