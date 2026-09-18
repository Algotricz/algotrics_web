import { useEffect, useState } from 'react'
import ProjectDetail from '../components/ProjectDetail'
import '../styles/WorkPage.css'

const assetModules = import.meta.glob('../assets/*/*.png', { eager: true, import: 'default' })
const imagesFor = (folder) => Object.entries(assetModules).filter(([path]) => path.includes(`/assets/${folder}/`)).sort(([first], [second]) => first.localeCompare(second, undefined, { numeric: true })).map(([, image]) => image)

const projects = [
  { id: '01', folder: '09-tryon', title: 'TRYON', year: '2026', category: 'Ecommerce website', tagline: 'Commerce\nwith character.' },
  { id: '02', folder: '07-aharon-trading', title: 'Aharon Trading & Contracting', year: '2026', category: 'Business website', tagline: 'Made to\nmean business.' },
  { id: '03', folder: '05-breakoutlabs', title: 'Breakout Labs', year: '2026', category: 'Web development', tagline: 'Built to\nbreak through.' },
  { id: '04', folder: '04-yazhinitours', title: 'Yazhini Tours & Travels', year: '2026', category: 'Travel agency website', tagline: 'Journeys,\nreimagined.' },
  { id: '05', folder: '08-fskmrsas', title: 'FSKMRSAS Studio', year: '2025', category: 'Music studio', tagline: 'Sound with\na signature.' },
  { id: '06', folder: '02-najmethafeet', title: 'Najmet Hafeet Contracting', year: '2025', category: 'Construction website', tagline: 'Built for\nwhat lasts.' },
  { id: '07', folder: '06-algohealthplus', title: 'Algorithm Health', year: '2025', category: 'Static HTML', tagline: 'Care, made\nclear.' },
  { id: '08', folder: '01-linengineering', title: 'Lin Engineering', year: '2025', category: 'Air tank manufacturer', tagline: 'Precision\nthat performs.' },
  { id: '09', folder: '03-fabelfintech', title: 'Fabel Fintech', year: '2025', category: 'Financial services', tagline: 'Finance,\nmade human.' },
].map((project) => ({ ...project, images: imagesFor(project.folder) }))

export default function WorkPage() {
  const [active, setActive] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const project = projects[active]
  const move = (direction) => setActive((current) => (current + direction + projects.length) % projects.length)

  useEffect(() => {
    if (selectedProject || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => setActive((current) => (current + 1) % projects.length), 5000)
    return () => window.clearInterval(timer)
  }, [selectedProject])

  return <main className="work-page">
    <header className="work-nav"><a className="work-logo" href="/"><i />ALGO<span>TRICZ</span></a><p>Independent digital studio<br />India  Worldwide</p><a href="/contact">Let&apos;s talk <span></span></a></header>
    <section className="work-stage"><div className="work-stage__grain" aria-hidden="true" /><div className="work-stage__grid" aria-hidden="true" /><p className="work-stage__label">Selected projects / 2025  2026</p><div className="work-art" aria-hidden="true"><img src={project.images.find((image) => image.includes('/HERO.')) || project.images[0]} alt="" /></div><article className="work-project"><p>{project.title.toUpperCase()} / {project.category.toUpperCase()} / {project.year}</p><h1>{project.tagline.split('\n').map((line) => <span key={line}>{line}</span>)}</h1><button type="button" onClick={() => setSelectedProject(project)}>View case study <span></span></button></article><div className="work-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous project"></button><span><b>{project.id}</b> / {projects.length.toString().padStart(2, '0')}</span><button type="button" onClick={() => move(1)} aria-label="Next project"></button></div><p className="work-hint">Use the arrows to explore <span></span></p></section>
    <section className="work-gallery" aria-labelledby="work-gallery-title"><div className="work-gallery__intro"><p>2025  2026</p><h2 id="work-gallery-title">Extraordinary work,<br /><em>made to matter.</em></h2></div><div className="work-gallery__grid">{projects.map((item) => <article className="portfolio-item" key={item.id}><button type="button" onClick={() => setSelectedProject(item)}><div className="portfolio-item__art"><img src={item.images.find((image) => image.includes('/HERO.')) || item.images[0]} alt="" /></div><div className="portfolio-item__meta"><span>{item.year} / {item.category}</span><h3>{item.title}</h3><b></b></div></button></article>)}</div></section>
    <section className="work-footer"><p>From question to launch.<br /><span>Work that keeps moving.</span></p><a href="/">Back home </a></section>
    {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
  </main>
}
