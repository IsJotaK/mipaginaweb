import { useParams, Link } from 'react-router-dom'
import { LandingDemo } from './demos/LandingDemo'
import { EcommerceDemo } from './demos/EcommerceDemo'
import { CorporateDemo } from './demos/CorporateDemo'
import { SaasDemo } from './demos/SaasDemo'
import { MicotizadorDemo } from './demos/MicotizadorDemo'
import { BlogDemo } from './demos/BlogDemo'

const templateLookup = {
  1: { category: 'landing', title: 'ContainerPro' },
  2: { category: 'saas', title: 'MiCotizador' },
  3: { category: 'ecommerce', title: 'Tienda Online' },
  4: { category: 'corporativa', title: 'Bufete Jurídico' },
  5: { category: 'landing', title: 'Restaurante' },
  6: { category: 'blog', title: 'Blog Personal' },
  7: { category: 'corporativa', title: 'Clínica Dental' },
  8: { category: 'landing', title: 'Constructora' },
  9: { category: 'ecommerce', title: 'Marketplace' },
  10: { category: 'landing', title: 'FitClub' },
  11: { category: 'corporativa', title: 'Agencia Digital' },
  12: { category: 'ecommerce', title: 'Inmobiliaria' },
}

const standaloneTemplates = {
  'contenedores': '/templates/rizoma-space/index.html',
}

export default function PreviewPage() {
  const { id } = useParams()

  const standaloneUrl = standaloneTemplates[id]
  if (standaloneUrl) {
    return (
      <iframe
        src={standaloneUrl}
        title={id}
        className="w-full h-screen border-0"
      />
    )
  }

  const info = templateLookup[id]
  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Plantilla no encontrada</h1>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">Volver a la galería</Link>
        </div>
      </div>
    )
  }
  const template = { id: Number(id), title: info.title, category: info.category, tags: [], img: '', desc: '' }

  const renderDemo = () => {
    switch (info.category) {
      case 'landing': return <LandingDemo template={template} />
      case 'ecommerce': return <EcommerceDemo template={template} />
      case 'corporativa': return <CorporateDemo template={template} />
      case 'saas': return <MicotizadorDemo />
      case 'blog': return <BlogDemo template={template} />
      default: return <LandingDemo template={template} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {renderDemo()}
    </div>
  )
}
