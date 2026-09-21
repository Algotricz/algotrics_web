import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../styles/ContactPage.css'

const projectTypes = ['Brand & digital design', 'Web development', 'AI & full-stack systems', 'Something else']

export default function ContactPage() {
  const pageRef = useRef(null)
  const [status, setStatus] = useState('')

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
    const form = new FormData(event.currentTarget)
    const name = form.get('name')
    const email = form.get('email')
    const company = form.get('company') || 'Not provided'
    const projectType = form.get('projectType')
    const message = form.get('message')
    const subject = encodeURIComponent(`Project enquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\nProject type: ${projectType}\n\nProject details:\n${message}`)

    setStatus('Opening your email app…')
    window.location.href = `mailto:hello@algotrics.com?subject=${subject}&body=${body}`
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

        <form className="contact-form" onSubmit={handleSubmit}>
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
      </section>
    </main>
  )
}
