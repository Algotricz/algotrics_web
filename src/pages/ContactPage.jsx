import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import paperRocket from '../assets/rocket/realistic-paper-rocket.png'
import '../styles/ContactPage.css'

const projectTypes = ['Brand & digital design', 'Web development', 'AI & full-stack systems', 'Something else']

export default function ContactPage() {
  const pageRef = useRef(null)
  const formRef = useRef(null)
  const rocketRef = useRef(null)
  const [status, setStatus] = useState('')
  const [isSending, setIsSending] = useState(false)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.contact-page__eyebrow', { y: 22, autoAlpha: 0, duration: 0.55 })
        .from('.contact-page__intro h1 span', { yPercent: 110, autoAlpha: 0, stagger: 0.12, duration: 0.9 }, '-=0.2')
        .from('.contact-page__intro > p, .contact-page__details > *', { y: 28, autoAlpha: 0, stagger: 0.08, duration: 0.65 }, '-=0.5')
        .from('.contact-form', { y: 54, autoAlpha: 0, duration: 0.85 }, '-=0.7')
    }, pageRef)

    return () => context.revert()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isSending) return
    const form = new FormData(event.currentTarget)
    const name = form.get('name')
    const email = form.get('email')
    const company = form.get('company') || 'Not provided'
    const projectType = form.get('projectType')
    const message = form.get('message')
    const whatsappMessage = encodeURIComponent(`*New Algotrics project enquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company}\n*Service:* ${projectType}\n\n*Project brief:*\n${message}`)
    const whatsappUrl = `https://wa.me/919443802105?text=${whatsappMessage}`
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const legacyEmailDisabled = true
    const subject = encodeURIComponent(`Project enquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\nProject type: ${projectType}\n\nProject details:\n${message}`)

    setStatus('Opening your email app…')
    if (!legacyEmailDisabled) window.location.href = `mailto:hello@algotrics.com?subject=${subject}&body=${body}`

    setIsSending(true)
    setStatus('Folding your enquiry into a paper rocket…')
    if (prefersReducedMotion) {
      window.location.assign(whatsappUrl)
      return
    }

    const card = formRef.current
    const rocket = rocketRef.current
    gsap.timeline({ onComplete: () => window.location.assign(whatsappUrl) })
      .set(rocket, { autoAlpha: 0, scale: 0.18, rotation: -18 })
      .to(card, { duration: 0.25, ease: 'power2.in', scaleY: 0.34, skewX: -5 })
      .to(card, { duration: 0.22, ease: 'power3.in', scaleX: 0.24, x: 72, y: -16, rotation: -14, autoAlpha: 0 }, '+=0.03')
      .to(rocket, { duration: 0.16, autoAlpha: 1, scale: 0.62, rotation: -20 }, '<')
      .to(rocket, { duration: 0.75, ease: 'power3.in', x: window.innerWidth * 0.62, y: -window.innerHeight * 0.72, scale: 0.28, rotation: -31, autoAlpha: 0 })
  }

  return (
    <main className="contact-page" ref={pageRef}>
      <section className="contact-page__shell">
        <div className="contact-page__intro">
          <p className="contact-page__eyebrow"><i /> Contact Algotrics</p>
          <h1><span>Let&apos;s make</span><span>something <em>useful.</em></span></h1>
          <p>Tell us what you are building, where you are stuck, or what you want to improve. We will get back with a clear next step.</p>
          <div className="contact-page__details">
            <div><span>Email</span><a href="mailto:hello@algotrics.com">hello@algotrics.com</a></div>
            <div><span>Based in</span><p>India · Working worldwide</p></div>
            <div><span>Response time</span><p>Usually within two business days</p></div>
          </div>
        </div>

        <form className={`contact-form${isSending ? ' is-sending' : ''}`} onSubmit={handleSubmit} ref={formRef}>
          <div className="contact-form__heading"><span>Start a conversation</span><b>01 / 01</b></div>
          <div className="contact-form__row">
            <label><span>Your name *</span><input name="name" type="text" placeholder="Jane Smith" autoComplete="name" required /></label>
            <label><span>Email address *</span><input name="email" type="email" placeholder="jane@company.com" autoComplete="email" required /></label>
          </div>
          <div className="contact-form__row">
            <label><span>Company</span><input name="company" type="text" placeholder="Company name" autoComplete="organization" /></label>
            <label><span>What can we help with? *</span><select name="projectType" defaultValue="" required><option value="" disabled>Select a service</option>{projectTypes.map((type) => <option value={type} key={type}>{type}</option>)}</select></label>
          </div>
          <label><span>Tell us about the project *</span><textarea name="message" placeholder="A little about your goals, timeline, and what success looks like…" rows="6" required /></label>
          <div className="contact-form__footer">
            <p>By sending this enquiry, you agree to be contacted about your project.</p>
            <button type="submit">Send enquiry <span>↗</span></button>
          </div>
          <p className="contact-form__status" aria-live="polite">{status}</p>
        </form>
        <img className="contact-page__send-rocket" ref={rocketRef} src={paperRocket} alt="" aria-hidden="true" />
      </section>
    </main>
  )
}
