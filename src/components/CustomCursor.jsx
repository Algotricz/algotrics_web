import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/CustomCursor.css'

export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    document.documentElement.classList.add('has-custom-cursor')
    let visible = false
    const ringX = gsap.quickTo(ring, 'x', { duration: .42, ease: 'power4.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: .42, ease: 'power4.out' })
    const dotX = gsap.quickTo(dot, 'x', { duration: .12, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: .12, ease: 'power2.out' })
    gsap.set([ring, dot], { autoAlpha: 0, xPercent: -50, yPercent: -50 })
    const move = (event) => {
      if (!visible) { visible = true; gsap.to([ring, dot], { autoAlpha: 1, duration: .28, ease: 'power2.out' }) }
      ringX(event.clientX); ringY(event.clientY); dotX(event.clientX); dotY(event.clientY)
    }
    const grow = (event) => {
      if (!event.target.closest('a, button, input, select, textarea, [role="button"]')) return
      gsap.to(ring, { duration: .38, ease: 'power4.out', scale: 1.9 }); gsap.to(dot, { duration: .34, ease: 'power4.out', scale: .55 })
    }
    const shrink = (event) => {
      const target = event.target.closest('a, button, input, select, textarea, [role="button"]')
      if (!target || target.contains(event.relatedTarget)) return
      gsap.to(ring, { duration: .38, ease: 'power4.out', scale: 1 }); gsap.to(dot, { duration: .34, ease: 'power4.out', scale: 1 })
    }
    const hide = () => { visible = false; gsap.to([ring, dot], { autoAlpha: 0, duration: .28, ease: 'power2.out' }) }
    window.addEventListener('pointermove', move); document.addEventListener('pointerover', grow); document.addEventListener('pointerout', shrink); document.addEventListener('pointerleave', hide)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', grow); document.removeEventListener('pointerout', shrink); document.removeEventListener('pointerleave', hide); document.documentElement.classList.remove('has-custom-cursor') }
  }, [])

  return <><div className="custom-cursor" ref={ringRef} aria-hidden="true" /><div className="custom-cursor__dot" ref={dotRef} aria-hidden="true" /></>
}
