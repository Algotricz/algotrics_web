import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/UpcomingPage.css'

gsap.registerPlugin(ScrollTrigger)

const upcomingProjects = [
  ['01', 'Project N', 'Project in development', 'Details will be revealed when the work is ready.', 'Coming soon', 'indigo'],
]

export default function UpcomingPage({ onNavigate }) {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.upcoming-page__eyebrow', { autoAlpha: 0, y: 18, duration: .55 })
        .from('.upcoming-page__hero h1 span', { autoAlpha: 0, duration: .9, stagger: .1, yPercent: 110 }, '-=.15')
        .from('.upcoming-page__hero-copy, .upcoming-page__hero-status', { autoAlpha: 0, duration: .65, stagger: .1, y: 24 }, '-=.45')
      gsap.from('.upcoming-page__project', { autoAlpha: 0, duration: .7, stagger: .11, y: 44, scrollTrigger: { trigger: '.upcoming-page__list', start: 'top 78%', once: true } })
    }, pageRef)
    ScrollTrigger.refresh()
    return () => context.revert()
  }, [])

  return <main className="upcoming-page" ref={pageRef}>
    <section className="upcoming-page__hero">
      <div className="upcoming-page__orb upcoming-page__orb--one" aria-hidden="true" /><div className="upcoming-page__orb upcoming-page__orb--two" aria-hidden="true" />
      <p className="upcoming-page__eyebrow"><i /> In the studio now</p>
      <h1><span>Next up:</span><span>ideas in <em>motion.</em></span></h1>
      <div className="upcoming-page__hero-bottom"><p className="upcoming-page__hero-copy">A first look at the products, identities, and digital experiences currently taking shape at Algotrics.</p><p className="upcoming-page__hero-status"><i /> 01 project in progress</p></div>
    </section>

    <section className="upcoming-page__list">
      <header><p>01 / Project pipeline</p><h2>Coming soon,<br /><em>made with care.</em></h2></header>
      <div className="upcoming-page__project-list">{upcomingProjects.map(([number, title, category, summary, launch, colour]) => <article className="upcoming-page__project" key={number}><div className={`upcoming-page__art upcoming-page__art--${colour}`} aria-hidden="true"><span>{number}</span><i /><b /></div><div className="upcoming-page__project-info"><p>{category}</p><h3>{title}</h3><span>{summary}</span></div><div className="upcoming-page__launch"><p>Expected</p><strong>{launch}</strong></div></article>)}</div>
    </section>

    <section className="upcoming-page__cta"><p>02 / Make the next thing</p><h2>Have a project<br />waiting to <em>move?</em></h2><div><p>We partner with teams at the beginning â€” when the right question can change everything that follows.</p><a href="/contact" onClick={(event) => { event.preventDefault(); onNavigate('/contact') }}>Let&apos;s talk <span>â†’</span></a></div></section>
  </main>
}
