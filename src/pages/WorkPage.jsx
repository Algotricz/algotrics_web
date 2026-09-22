import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import '../styles/WorkPage.css'

gsap.registerPlugin(ScrollTrigger)

export default function WorkPage({ onNavigate }) {
  const [active, setActive] = useState(0)
  const pageRef = useRef(null)
  const project = projects[active]
  const move = (direction) => setActive((current) => (current + direction + projects.length) % projects.length)
  const playPreview = (event) => event.currentTarget.querySelector('video')?.play().catch(() => {})
  const stopPreview = (event) => {
    const video = event.currentTarget.querySelector('video')
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.work-stage__label', { y: 30, autoAlpha: 0, duration: 0.7 })
        .from('.work-project > *', { y: 46, autoAlpha: 0, stagger: 0.12, duration: 0.8 }, '-=0.4')
        .from('.work-controls, .work-hint', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.6')
        .from('.work-art', { scale: 1.04, autoAlpha: 0, duration: 1.15 }, '-=1')

      gsap.from('.work-gallery__intro > *', {
        y: 48,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.work-gallery', start: 'top 80%', once: true },
      })

      gsap.from('.portfolio-item', {
        y: 70,
        autoAlpha: 0,
        stagger: 0.09,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.work-gallery__grid', start: 'top 82%', once: true },
      })

      gsap.from('.work-footer > *', {
        y: 46,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.work-footer', start: 'top 85%', once: true },
      })
    }, pageRef)

    ScrollTrigger.refresh()
    return () => context.revert()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % projects.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  return <main className="work-page" ref={pageRef}>
    <header className="work-nav"><a className="work-logo" href="/"><i />ALGO<span>TRICZ</span></a><p>Independent digital studio<br />India  Worldwide</p><a href="/contact">Let&apos;s talk <span></span></a></header>
    <section className="work-stage"><div className="work-stage__grain" aria-hidden="true" /><div className="work-stage__grid" aria-hidden="true" /><p className="work-stage__label">Selected projects / 2025  2026</p><div className="work-art" aria-hidden="true"><img src={project.images.find((image) => image.includes('/HERO.')) || project.images[0]} alt="" /></div><article className="work-project"><p>{project.title.toUpperCase()} / {project.category.toUpperCase()} / {project.year}</p><h1>{project.tagline.split('\n').map((line) => <span key={line}>{line}</span>)}</h1><button type="button" onClick={() => onNavigate(`/work/${project.slug}`)}>View case study <span></span></button></article><div className="work-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous project"></button><span><b>{project.id}</b> / {projects.length.toString().padStart(2, '0')}</span><button type="button" onClick={() => move(1)} aria-label="Next project"></button></div><p className="work-hint">Use the arrows to explore <span></span></p></section>
    <section className="work-gallery" aria-labelledby="work-gallery-title"><div className="work-gallery__intro"><p>2025  2026</p><h2 id="work-gallery-title">Extraordinary work,<br /><em>made to matter.</em></h2></div><div className="work-gallery__grid">{projects.map((item) => <article className="portfolio-item" key={item.id}><button type="button" onBlur={stopPreview} onClick={() => onNavigate(`/work/${item.slug}`)} onFocus={playPreview} onMouseEnter={playPreview} onMouseLeave={stopPreview}><div className={item.video ? 'portfolio-item__art portfolio-item__art--video' : 'portfolio-item__art'}>{item.video && <video className="portfolio-item__preview" loop muted playsInline preload="metadata" src={item.video} />}{item.logo ? <span className="portfolio-item__brand"><img src={item.logo} alt={`${item.title} logo`} /></span> : <span className="portfolio-item__brand portfolio-item__brand-initial" aria-label={`${item.title} initial`}>{item.title.charAt(0)}</span>}</div><div className="portfolio-item__meta"><span>{item.year} / {item.category}</span><h3>{item.title}</h3><b></b></div></button></article>)}</div></section>
    <section className="work-footer"><p>From question to launch.<br /><span>Work that keeps moving.</span></p><a href="/">Back home </a></section>
  </main>
}
