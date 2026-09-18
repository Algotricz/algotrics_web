import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import webMark from '../assets/algo.png'
import aboutStudio from '../assets/about-algotrics-studio.png'
import '../styles/AlgotricsLanding.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  ['01', 'Product thinking', 'Turn ambitious ideas into useful products people choose.'],
  ['02', 'Digital experiences', 'Make brands and interactions feel clear, quick, and human.'],
  ['03', 'Engineering systems', 'Build reliable digital foundations that are ready to scale.'],
]

export default function AlgotricsLanding() {
  const pageRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const openPage = (event, target) => {
    event.preventDefault()
    window.history.pushState({}, '', target)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 48)
    updateNavbar()
    window.addEventListener('scroll', updateNavbar, { passive: true })
    return () => window.removeEventListener('scroll', updateNavbar)
  }, [])

  useLayoutEffect(() => {
    const page = pageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

      gsap.from(select('.what-we-do__intro, .what-we-do > h2'), {
        y: 80,
        autoAlpha: 0,
        stagger: 0.16,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.what-we-do')[0], start: 'top 76%', once: true },
      })

      const serviceSlides = select('.what-we-do__list article')
      const statementSlides = select('.statement__slide')

      if (window.innerWidth > 760) {
        page.classList.add('algotrics-page--scroll-scenes')
        gsap.set(serviceSlides.slice(1), { yPercent: 100 })

        const serviceSwipe = gsap.timeline({
          scrollTrigger: {
            trigger: select('.what-we-do__list')[0],
            start: 'top top+=132',
            end: '+=155%',
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        serviceSwipe
          .to(serviceSlides[0], { autoAlpha: 0, yPercent: -18, ease: 'none', duration: 1 }, 0.45)
          .to(serviceSlides[1], { yPercent: 0, ease: 'none', duration: 1 }, 0.45)
          .to(serviceSlides[1], { autoAlpha: 0, yPercent: -18, ease: 'none', duration: 1 }, 1.45)
          .to(serviceSlides[2], { yPercent: 0, ease: 'none', duration: 1 }, 1.45)

        gsap.to(select('.statement__track')[0], {
          xPercent: -66.667,
          ease: 'none',
          scrollTrigger: {
            trigger: select('.statement')[0],
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      } else {
        [...serviceSlides, ...statementSlides].forEach((section) => {
          gsap.from(section, {
            y: 56,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 82%', once: true },
          })
        })
      }

      gsap.from(select('.services__heading > *'), {
        y: 64,
        autoAlpha: 0,
        stagger: 0.14,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.services__heading')[0], start: 'top 78%', once: true },
      })

      gsap.from(select('.service-card'), {
        y: 72,
        autoAlpha: 0,
        stagger: 0.14,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.services__grid')[0], start: 'top 78%', once: true },
      })

      gsap.from(select('.about-showcase__media, .about-showcase__content > *'), {
        y: 54,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.about-showcase')[0], start: 'top 78%', once: true },
      })

      gsap.from(select('.closing__content > *'), {
        y: 58,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: select('.closing')[0], start: 'top 76%', once: true },
      })
    }, page)

    ScrollTrigger.refresh()

    return () => {
      context.revert()
      page.classList.remove('algotrics-page--scroll-scenes')
    }
  }, [])

  return (
    <main className="algotrics-page" ref={pageRef}>
      <section className="hero" id="top">
        <div className="hero__grain" aria-hidden="true" />
        <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`} aria-label="Main navigation">
          <div className="nav__bar">
            <div className="nav__desktop-links nav__desktop-links--left"><a href="#services">Talents</a><a href="/work" onClick={(event) => openPage(event, '/work')}>Works</a></div>
          <a className="brand" href="#top" aria-label="Algotrics home"><img src={webMark} alt="Algotrics" /></a>
          <div className="nav__links"><a href="/work" onClick={(event) => openPage(event, '/work')}>Selected work</a><a href="/contact" onClick={(event) => openPage(event, '/contact')}>Let&apos;s talk </a></div>
            <div className="nav__status"><span>ALGO / 2026</span><span>INDIA  GLOBAL</span></div>
            <div className="nav__desktop-links nav__desktop-links--right"><a href="/about" onClick={(event) => openPage(event, '/about')}>About</a><a href="/contact" onClick={(event) => openPage(event, '/contact')}>Contact</a></div>
            <button className="nav__toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen((isOpen) => !isOpen)}>
              <span className="nav__toggle-label">{menuOpen ? 'Close' : 'Menu'}</span><i /><i />
            </button>
            <a className="nav__mobile-contact" href="/contact" onClick={(event) => openPage(event, '/contact')}>Contact</a>
          </div>
          <div className={`nav__panel ${menuOpen ? 'nav__panel--open' : ''}`} id="site-menu">
            <p>Explore Algotrics</p>
            <div className="nav__menu-links">
              <a href="#top" onClick={() => setMenuOpen(false)}>Home <span>01</span></a>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services <span>02</span></a>
              <a href="/work" onClick={(event) => openPage(event, '/work')}>Selected work <span>03</span></a>
              <a href="/about" onClick={(event) => openPage(event, '/about')}>About <span>04</span></a>
              <a href="/contact" onClick={(event) => openPage(event, '/contact')}>Start a project <span>05</span></a>
            </div>
            <a className="nav__email" href="mailto:hello@algotrics.com">hello@algotrics.com </a>
          </div>
        </nav>

        <div className="hero__grid">
          <div className="hero__copywrap">
            <p className="hero__eyebrow"><i /> Digital engineering studio</p>
            <h1 className="hero__headline"><span>Ideas, engineered</span><em>to move forward.</em></h1>
            <p className="hero__copy">We turn ambitious business problems into sharp digital products, scalable platforms, and intelligent experiences.</p>
            <div className="hero__actions"><a className="button button--solid" href="/work">Explore our work </a><a className="text-link" href="/contact" onClick={(event) => openPage(event, '/contact')}>Start a project </a></div>
            <p className="hero__scroll">Scroll to discover </p>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="orbit orbit--outer"><i /><i /><i /></div>
            <div className="orbit orbit--inner"><i /><i /></div>
            <div className="hero__core"><img src={webMark} alt="" /></div>
            <div className="hero__signal" />
          </div>
        </div>
      </section>

      <section className="what-we-do" id="what-we-do">
        <div className="what-we-do__intro"><span>01  WHAT WE DO</span></div>
        <h2>From the first spark<br />to the <em>full launch.</em></h2>
        <div className="what-we-do__list">
          <div className="what-we-do__track">
            <article><span>01</span><div><h3>Brand &amp; digital design</h3><p>Clear identities, high-converting websites, and design systems that make a lasting impression.</p></div></article>
            <article><span>02</span><div><h3>Web development</h3><p>Fast, responsive websites and product experiences engineered to work beautifully everywhere.</p></div></article>
            <article><span>03</span><div><h3>AI &amp; full-stack systems</h3><p>Practical automation, connected tools, and scalable applications built around your business.</p></div></article>
          </div>
        </div>
        <a className="what-we-do__cta" href="#services">Explore our services <span></span></a>
      </section>

      <section className="about-showcase" id="about" aria-labelledby="about-showcase-title">
        <div className="about-showcase__inner">
          <div className="about-showcase__media"><img src={aboutStudio} alt="Creative professional working in a studio" /></div>
          <div className="about-showcase__content">
            <span className="about-showcase__eyebrow"><i /> About Algotricz</span>
            <h2 id="about-showcase-title">Building stronger brands.<br /><em>Creating impressions.</em></h2>
            <p>We create purposeful digital experiences with clarity, craft, and a relentless focus on the people who use them.</p>
            <ul><li>Clear strategy from the first conversation.</li><li>Built to convert, scale, and stay memorable.</li></ul>
            <div className="about-showcase__actions"><a href="/about" onClick={(event) => openPage(event, '/about')} className="about-showcase__button">Meet Algotricz <span>→</span></a><div className="about-showcase__rating" aria-label="Rated five stars by clients"><b>★★★★★</b><span>Trusted by ambitious teams</span></div></div>
          </div>
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
        <div className="services__heading"><span className="section-tag">02  WHAT WE DO</span><h2>One team.<br /><em>Every angle.</em></h2></div>
        <div className="services__grid">
          {services.map(([number, title, description]) => (
            <article className="service-card" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p><a href="/contact" onClick={(event) => openPage(event, '/contact')} aria-label={`Start a project for ${title}`}></a></div></article>
          ))}
        </div>
      </section>

      <section className="closing" id="contact">
        <div className="closing__orb" aria-hidden="true" />
        <div className="closing__content"><span className="section-tag">04  START SOMETHING</span><h2>Ready when<br /><em>you are.</em></h2></div>
        <footer><a className="brand" href="#top" aria-label="Algotrics home"><img src={webMark} alt="Algotrics" /></a><span> 2026 Algotrics</span><a href="#top">Back to top </a></footer>
      </section>
    </main>
  )
}



