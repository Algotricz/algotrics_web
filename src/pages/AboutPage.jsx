import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoMark from '../assets/algo.png'
import aboutStudio from '../assets/about-algotrics-studio.png'
import aaryaPortrait from '../assets/team-aarya-menon.png'
import rohanPortrait from '../assets/team-rohan-mehta.png'
import nilaPortrait from '../assets/team-nila-kapoor.png'
import arjunPortrait from '../assets/team-arjun-varma.png'
import '../styles/AboutPage.css'

gsap.registerPlugin(ScrollTrigger)

const principles = [
  ['01', 'Clarity first', 'We simplify the problem before we add design or technology. Every decision should make the next one easier.'],
  ['02', 'Craft with purpose', 'The details matter when they improve how something feels, works, and performs in the real world.'],
  ['03', 'Built to evolve', 'We create flexible systems that can grow with the business instead of becoming tomorrow\'s limitation.'],
]

const teamMembers = [
  ['Aarya Menon', 'Strategy Director', aaryaPortrait],
  ['Rohan Mehta', 'Creative Director', rohanPortrait],
  ['Nila Kapoor', 'Lead Engineer', nilaPortrait],
  ['Arjun Varma', 'Product Designer', arjunPortrait],
]

export default function AboutPage() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      const select = gsap.utils.selector(pageRef.current)

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(select('.about-page__eyebrow'), { y: 24, autoAlpha: 0, duration: 0.6 })
        .from(select('.about-page__hero h1 span'), { yPercent: 110, autoAlpha: 0, stagger: 0.12, duration: 0.95 }, '-=0.25')
        .from(select('.about-page__hero-copy, .about-page__scroll-cue'), { y: 28, autoAlpha: 0, stagger: 0.12, duration: 0.7 }, '-=0.55')
        .from(select('.about-page__symbol'), { scale: 0.72, rotation: -8, autoAlpha: 0, duration: 1 }, '-=0.9')

      gsap.to(select('.about-page__symbol-ring'), { rotation: 360, duration: 28, repeat: -1, ease: 'none' })

      select('[data-about-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 64,
          autoAlpha: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 82%', once: true },
        })
      })

      gsap.from(select('.about-page__principle'), {
        y: 52,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.about-page__principles-grid')[0], start: 'top 78%', once: true },
      })

      gsap.from(select('.about-page__team-card'), {
        y: 42,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.about-page__team-grid')[0], start: 'top 80%', once: true },
      })
    }, pageRef)

    ScrollTrigger.refresh()
    return () => context.revert()
  }, [])

  return (
    <main className="about-page" ref={pageRef}>
      <section className="about-page__hero">
        <div className="about-page__hero-inner">
          <div className="about-page__hero-content">
            <p className="about-page__eyebrow"><i /> Independent digital engineering studio</p>
            <h1><span>We make ambitious</span><span>ideas <em>useful.</em></span></h1>
            <p className="about-page__hero-copy">Algotrics brings strategy, design, and engineering together to create digital products that move businesses forward.</p>
          </div>
          <div className="about-page__symbol" aria-hidden="true">
            <div className="about-page__symbol-ring"><i /><i /><i /></div>
            <img src={logoMark} alt="" />
          </div>
          <a className="about-page__scroll-cue" href="#our-story">Our story <span>↓</span></a>
        </div>
      </section>

      <section className="about-page__story" id="our-story">
        <div className="about-page__story-media" data-about-reveal>
          <img src={aboutStudio} alt="Creative professional working in the Algotrics studio" />
          <span>Think / Make / Move</span>
        </div>
        <div className="about-page__story-copy" data-about-reveal>
          <p className="about-page__section-label">01 / Our studio</p>
          <h2>Built where strategy, design, and engineering meet.</h2>
          <p>Good digital work does more than look polished. It gives people clarity, removes friction, and creates momentum for the business behind it.</p>
          <p>That is why we work across disciplines from the start. The idea, the experience, and the technology are shaped together—not passed from one disconnected team to another.</p>
          <div className="about-page__disciplines" aria-label="Algotrics disciplines"><span>Strategy</span><span>Design</span><span>Engineering</span></div>
        </div>
      </section>

      <section className="about-page__principles">
        <div className="about-page__section-heading" data-about-reveal>
          <p className="about-page__section-label">02 / What guides us</p>
          <h2>Strong work starts with<br /><em>strong principles.</em></h2>
        </div>
        <div className="about-page__principles-grid">
          {principles.map(([number, title, description]) => (
            <article className="about-page__principle" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-page__team">
        <div className="about-page__section-heading about-page__section-heading--dark" data-about-reveal>
          <p className="about-page__section-label">03 / Our team</p>
          <h2>The people behind<br />the <em>work.</em></h2>
        </div>
        <div className="about-page__team-grid">
          {teamMembers.map(([name, role, portrait], index) => (
            <article className="about-page__team-card" key={name}>
              <div className="about-page__team-image"><img src={portrait} alt={`${name}, ${role}`} /></div>
              <div className="about-page__team-meta"><span>0{index + 1}</span><div><h3>{name}</h3><p>{role}</p></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-page__cta" data-about-reveal>
        <p className="about-page__section-label">04 / Start something</p>
        <h2>Have a useful problem<br />to <em>solve?</em></h2>
        <div><p>Bring us the challenge. We will help find the clearest way forward.</p><a href="/contact">Let&apos;s talk <span>→</span></a></div>
      </section>
    </main>
  )
}
