import { useEffect } from 'react'
import { getProject } from '../data/projects'
import '../styles/ProjectCaseStudyPage.css'

/** Full project case-study route. @param {{ slug: string, onNavigate: (target: string) => void }} props */
export default function ProjectCaseStudyPage({ slug, onNavigate }) {
  const project = getProject(slug)
  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  if (!project) return <main className="case-study case-study--missing"><p>Project not found.</p><button type="button" onClick={() => onNavigate('/work')}>Back to work</button></main>
  const heroImage = project.images.find((image) => image.includes('/HERO.')) || project.images[0]
  const gallery = project.images.filter((image) => image !== heroImage).slice(0, 2)

  return <main className="case-study">
    <header className="case-study__header"><button type="button" onClick={() => onNavigate('/work')}>← All work</button><p>{project.id} / {project.year}</p><a href={project.liveUrl}>Visit live site ↗</a></header>
    <section className="case-study__hero"><div className="case-study__hero-copy"><p>{project.category}</p><h1>{project.title}</h1><span>{project.stack}</span></div><div className="case-study__hero-art">{project.video ? <video autoPlay loop muted playsInline poster={heroImage} src={project.video} /> : <img src={heroImage} alt={`${project.title} website`} />}</div></section>
    <section className="case-study__overview"><p>01 / Overview</p><h2>{project.description}</h2><a href={project.liveUrl}><span>Open the live experience</span><b>↗</b></a></section>
    <section className="case-study__details"><p>02 / Project details</p><div><article><span>Industry</span><strong>{project.category}</strong></article><article><span>Built with</span><strong>{project.stack}</strong></article><article><span>Launched</span><strong>{project.year}</strong></article></div></section>
    <section className="case-study__gallery">{gallery.map((image, index) => <img src={image} alt={`${project.title} interface ${index + 1}`} key={image} />)}</section>
    <footer className="case-study__footer"><p>See it in the real world.</p><a href={project.liveUrl}>Visit {project.title} <span>↗</span></a></footer>
  </main>
}
