import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import webMark from '../assets/algo.png'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import '../styles/AlgotricsLanding.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  ['01', 'Product thinking', 'Turn ambitious ideas into useful products people choose.'],
  ['02', 'Digital experiences', 'Make brands and interactions feel clear, quick, and human.'],
  ['03', 'Engineering systems', 'Build reliable digital foundations that are ready to scale.'],
]

const projects = [
  ['Northstar', 'A trading workspace made for sharper decisions.', 'green'],
  ['Medsy', 'A connected experience for better healthcare operations.', 'paper'],
  ['Oculus', 'A launch platform that makes complex data feel simple.', 'orange'],
]

/** A scroll-led public homepage for Algotrics. */
export default function AlgotricsLanding() {
  const pageRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 48)
    updateNavbar()
    window.addEventListener('scroll', updateNavbar, { passive: true })
    return () => window.removeEventListener('scroll', updateNavbar)
  }, [])

  useLayoutEffect(() => {
    const page = pageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reducedMotion
      ? null
      : new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false })
    let animationFrame

    const animateScroll = (time) => {
      lenis?.raf(time)
      animationFrame = requestAnimationFrame(animateScroll)
    }

    if (lenis) {
      animationFrame = requestAnimationFrame(animateScroll)
      lenis.on('scroll', ScrollTrigger.update)
    }

    const context = gsap.context(() => {
      if (reducedMotion) return

      const select = gsap.utils.selector(page)
      const introItems = select('.hero__eyebrow, .hero__headline span, .hero__headline em, .hero__copy, .hero__actions')

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(select('.nav'), { y: -24, autoAlpha: 0, duration: 0.65 })
        .from(introItems, { yPercent: 115, autoAlpha: 0, duration: 1, stagger: 0.11 }, '-=0.25')
        .from(select('.hero__visual'), { scale: 0.82, autoAlpha: 0, duration: 1.15 }, '-=0.9')

      gsap.to(select('.orbit--outer'), { rotation: 360, duration: 24, repeat: -1, ease: 'none' })
      gsap.to(select('.orbit--inner'), { rotation: -360, duration: 16, repeat: -1, ease: 'none' })
      gsap.to(select('.hero__visual'), {
        yPercent: -16,
        scrollTrigger: { trigger: select('.hero')[0], start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.from(select('.manifesto__copy > *'), {
        y: 72,
        autoAlpha: 0,
        stagger: 0.13,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.manifesto')[0], start: 'top 72%' },
      })

      if (window.innerWidth > 760) {
        const statementTrack = select('.statement__track')[0]
        gsap.to(statementTrack, {
          xPercent: -66.667,
          ease: 'none',
          scrollTrigger: {
            trigger: select('.statement')[0],
            start: 'top top',
            end: '+=210%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
      }

      gsap.from(select('.service-card'), {
        y: 72,
        autoAlpha: 0,
        stagger: 0.14,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.services__grid')[0], start: 'top 76%' },
      })

      select('.project').forEach((project) => {
        gsap.from(project, {
          y: 105,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: project, start: 'top 83%' },
        })
      })

      gsap.from(select('.closing__content > *'), {
        y: 58,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.closing')[0], start: 'top 70%' },
      })
    }, page)

    ScrollTrigger.refresh()

    return () => {
      context.revert()
      if (animationFrame) cancelAnimationFrame(animationFrame)
      lenis?.destroy()
    }
  }, [])

  return (
    <main className="algotrics-page" ref={pageRef}>
      <section className="hero" id="top">
        <div className="hero__grain" aria-hidden="true" />
        <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`} aria-label="Main navigation">
          <div className="nav__bar">
            <div className="nav__desktop-links nav__desktop-links--left"><a href="#services">Talents</a><a href="#work">Works</a></div>
          <a className="brand" href="#top" aria-label="Algotrics home"><img src={webMark} alt="Algotrics" /></a>
          <div className="nav__links"><a href="#work">Selected work</a><a href="#contact">Let&apos;s talk ↗</a></div>
            <div className="nav__status"><span>ALGO / 2026</span><span>INDIA — GLOBAL</span></div>
            <div className="nav__desktop-links nav__desktop-links--right"><a href="#services">About</a><a href="#contact">Contact</a></div>
            <button className="nav__toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen((isOpen) => !isOpen)}>
              <span className="nav__toggle-label">{menuOpen ? 'Close' : 'Menu'}</span><i /><i />
            </button>
            <a className="nav__mobile-contact" href="#contact">Contact</a>
          </div>
          <div className={`nav__panel ${menuOpen ? 'nav__panel--open' : ''}`} id="site-menu">
            <p>Explore Algotrics</p>
            <div className="nav__menu-links">
              <a href="#top" onClick={() => setMenuOpen(false)}>Home <span>01</span></a>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services <span>02</span></a>
              <a href="#work" onClick={() => setMenuOpen(false)}>Selected work <span>03</span></a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Start a project <span>04</span></a>
            </div>
            <a className="nav__email" href="mailto:hello@algotrics.com">hello@algotrics.com ↗</a>
          </div>
        </nav>

        <div className="hero__grid">
          <div className="hero__copywrap">
            <p className="hero__eyebrow"><i /> Digital engineering studio</p>
            <h1 className="hero__headline"><span>Ideas, engineered</span><em>to move forward.</em></h1>
            <p className="hero__copy">We turn ambitious business problems into sharp digital products, scalable platforms, and intelligent experiences.</p>
            <div className="hero__actions"><a className="button button--solid" href="#work">Explore our work ↓</a><a className="text-link" href="#contact">Start a project ↗</a></div>
            <p className="hero__scroll">Scroll to discover ↓</p>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="orbit orbit--outer"><i /><i /><i /></div>
            <div className="orbit orbit--inner"><i /><i /></div>
            <div className="hero__core"><img src={webMark} alt="" /></div>
            <div className="hero__signal" />
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="section-tag">01 — OUR POINT OF VIEW</div>
        <div className="manifesto__copy">
          <p>We pair the big picture with the tiny detail.</p>
          <h2>Strategy in the room.<br /><em>Technology in the details.</em></h2>
          <a className="text-link text-link--dark" href="#services">See how we work ↘</a>
        </div>
      </section>

      <section className="statement" aria-label="How Algotrics works">
        <div className="statement__track">
          <article className="statement__slide statement__slide--lime"><span>01 / DISCOVER</span><h2>Ask the questions that make the work matter.</h2><p>Insight before interface. Clarity before code.</p></article>
          <article className="statement__slide statement__slide--ink"><span>02 / CREATE</span><h2>Shape the answer into an experience people remember.</h2><p>Beautiful systems, made to work in the real world.</p></article>
          <article className="statement__slide statement__slide--paper"><span>03 / EVOLVE</span><h2>Keep moving with a platform built for what comes next.</h2><p>Because the best launch is only the beginning.</p></article>
        </div>
      </section>

      <section className="services" id="services">
        <div className="services__heading"><span className="section-tag">02 — WHAT WE DO</span><h2>One team.<br /><em>Every angle.</em></h2></div>
        <div className="services__grid">
          {services.map(([number, title, description]) => (
            <article className="service-card" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p><a href="#contact" aria-label={`Learn about ${title}`}>↗</a></div></article>
          ))}
        </div>
      </section>

      <section className="projects" id="work">
        <div className="projects__intro"><span className="section-tag">03 — SELECTED WORK</span><p>Built with equal parts curiosity, rigour, and momentum.</p></div>
        <div className="projects__list">
          {projects.map(([name, description, tone], index) => (
            <article className={`project project--${tone}`} key={name}>
              <div className="project__visual"><span className={`project__shape project__shape--${index + 1}`} /></div>
              <div className="project__meta"><span>0{index + 1}</span><h3>{name}</h3><p>{description}</p><a href="#contact">View case study ↗</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="closing" id="contact">
        <div className="closing__orb" aria-hidden="true" />
        <div className="closing__content"><span className="section-tag">04 — START SOMETHING</span><h2>Ready when<br /><em>you are.</em></h2><a className="button button--light" href="mailto:hello@algotrics.com">hello@algotrics.com ↗</a></div>
        <footer><a className="brand" href="#top" aria-label="Algotrics home"><img src={webMark} alt="Algotrics" /></a><span>© 2026 Algotrics</span><a href="#top">Back to top ↑</a></footer>
      </section>
    </main>
  )
}
