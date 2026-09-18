/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import './ProjectDetail.css'

/**
 * Full-screen case-study overlay.
 * @param {{ project: { id: string, title: string, year: string, category: string, images: string[] }, onClose: () => void }} props Component data and close handler.
 */
export default function ProjectDetail({ project, onClose }) {
  useEffect(() => {
    document.body.classList.add('project-detail-open')
    return () => document.body.classList.remove('project-detail-open')
  }, [])

  return <section className="project-detail" aria-label={`${project.title} case study`}><header className="project-detail__nav"><button type="button" onClick={onClose}>← Back to work</button><span>{project.year} / {project.category}</span><strong>{project.images.length} visuals</strong></header><div className="project-detail__intro"><p>{project.id} / SELECTED WORK</p><h1>{project.title}</h1><span>{project.category}</span></div><div className="project-detail__images">{project.images.map((image, index) => <figure className={index === 0 || index === 1 ? 'project-detail__image project-detail__image--wide' : 'project-detail__image'} key={image}><img src={image} alt={`${project.title} visual ${index + 1}`} loading={index > 2 ? 'lazy' : 'eager'} /></figure>)}</div><footer className="project-detail__footer"><p>Ready to build something distinct?</p><a href="/#contact">Start a project ↗</a></footer></section>
}
