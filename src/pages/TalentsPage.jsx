import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/TalentsPage.css'

gsap.registerPlugin(ScrollTrigger)

const opportunities = [
  ['01', 'Product designer', 'Design', 'Remote / India', 'Shape clear, expressive digital products from first concept through final interaction.'],
  ['02', 'Frontend engineer', 'Engineering', 'Remote / India', 'Build responsive React experiences with thoughtful motion, strong performance, and precise craft.'],
  ['03', 'Creative developer', 'Design + Code', 'Remote / India', 'Turn ambitious visual ideas into memorable, technically polished experiences.'],
]

const values = [
  ['Stay curious', 'Ask better questions, explore the edges, and keep learning through the work.'],
  ['Own the outcome', 'Take responsibility beyond your task and help the whole product become stronger.'],
  ['Make it useful', 'Balance beauty with clarity, performance, and real value for the people using it.'],
]

export default function TalentsPage() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.talents-page__eyebrow', { y: 20, autoAlpha: 0, duration: 0.55 })
        .from('.talents-page__hero h1 span', { yPercent: 110, autoAlpha: 0, stagger: 0.12, duration: 0.9 }, '-=0.2')
        .from('.talents-page__intro, .talents-page__availability', { y: 24, autoAlpha: 0, stagger: 0.12, duration: 0.65 }, '-=0.5')
      gsap.utils.toArray('[data-talent-reveal]').forEach((element) => gsap.from(element, { y: 52, autoAlpha: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } }))
    }, pageRef)
    ScrollTrigger.refresh()
    return () => context.revert()
  }, [])

  return <main className="talents-page" ref={pageRef}>
    <section className="talents-page__hero">
      <p className="talents-page__eyebrow"><i /> Careers at Algotrics</p>
      <h1><span>Do your best work.</span><span>Make it <em>matter.</em></span></h1>
      <div className="talents-page__hero-bottom"><p className="talents-page__intro">Join a small, ambitious team where strategy, design, and engineering work side by side.</p><p className="talents-page__availability"><i /> Open to exceptional people</p></div>
    </section>

    <section className="talents-page__values" data-talent-reveal>
      <header><p>01 / How we work</p><h2>High standards.<br /><em>Low ego.</em></h2></header>
      <div className="talents-page__value-grid">{values.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="talents-page__roles" data-talent-reveal>
      <header><p>02 / Open roles</p><h2>Find your place<br />in the <em>team.</em></h2></header>
      <div className="talents-page__role-list">{opportunities.map(([number, title, discipline, location, description]) => <article key={number}><span>{number}</span><div><p>{discipline}</p><h3>{title}</h3></div><p>{description}</p><div><small>{location}</small><a href={`mailto:hello@algotrics.com?subject=${encodeURIComponent(`Application: ${title}`)}`}>Apply <b>â†—</b></a></div></article>)}</div>
    </section>

    <section className="talents-page__cta" data-talent-reveal><p>03 / Introduce yourself</p><h2>Do not see your role?<br /><em>We still want to hear from you.</em></h2><div><p>Send us your portfolio, your story, and the kind of work you want to make next.</p><a href="mailto:hello@algotrics.com?subject=Talent%20application">hello@algotrics.com <span>â†—</span></a></div></section>
  </main>
}
