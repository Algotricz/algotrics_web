import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import paperRocket from '../assets/rocket/realistic-paper-rocket.png'
import './PaperRocketFlight.css'

const flightPath = [
  { x: 0.09, y: 0.12 },
  { x: 0.7, y: 0.13 },
  { x: 0.83, y: 0.48 },
  { x: 0.16, y: 0.72 },
  { x: 0.75, y: 0.36 },
  { x: 0.82, y: 0.78 },
  { x: 0.32, y: 0.83 },
]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const DASH_COUNT = 10

const getCurvePoint = (start, control, end, progress) => {
  const inverse = 1 - progress
  return {
    x: inverse * inverse * start.x + 2 * inverse * progress * control.x + progress * progress * end.x,
    y: inverse * inverse * start.y + 2 * inverse * progress * control.y + progress * progress * end.y,
  }
}

const createFlightPath = (width, height) => {
  const points = flightPath.map(({ x, y }) => ({ x: x * width, y: y * height }))

  return points.slice(0, -1).reduce((path, point, index) => {
    const previous = points[index - 1] || point
    const next = points[index + 1]
    const afterNext = points[index + 2] || next
    const controlOne = { x: point.x + (next.x - previous.x) / 6, y: point.y + (next.y - previous.y) / 6 }
    const controlTwo = { x: next.x - (afterNext.x - point.x) / 6, y: next.y - (afterNext.y - point.y) / 6 }
    return `${path} C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, ${next.x} ${next.y}`
  }, `M ${points[0].x} ${points[0].y}`)
}

/**
 * Decorative, non-interactive paper rocket that maps the page scroll position
 * to a single reversible flight path. It intentionally receives no props so it
 * cannot affect page content, navigation, or any interactive control.
 */
export default function PaperRocketFlight() {
  const rocketRef = useRef(null)
  const artworkRef = useRef(null)
  const flightPathRef = useRef(null)
  const dashRefs = useRef([])

  useLayoutEffect(() => {
    const rocket = rocketRef.current
    const artwork = artworkRef.current
    const route = flightPathRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let isEntering = !reducedMotion
    let frameId = 0
    let autoFrameId = 0
    let routeLength = 0
    let lastScrollPosition = window.scrollY
    let scrollDirection = 1
    const autoFlightStart = window.performance.now()
    const setArtworkRotation = gsap.quickTo(artwork, 'rotation', { duration: 0.58, ease: 'power2.out' })

    const updateRoute = () => {
      route.setAttribute('d', createFlightPath(window.innerWidth, window.innerHeight))
      routeLength = route.getTotalLength()
    }

    const positionRocket = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const hasScrollablePage = maxScroll > 1
      const elapsed = (window.performance.now() - autoFlightStart) / 1000
      const autoOrbit = elapsed * 0.42
      const autoPoint = (offset = 0) => ({
        x: window.innerWidth * (0.5 + Math.sin(autoOrbit + offset) * 0.33),
        y: window.innerHeight * (0.48 + Math.sin((autoOrbit + offset) * 2) * 0.16),
      })
      const progress = hasScrollablePage ? clamp(window.scrollY / maxScroll, 0, 1) : elapsed
      const routePoint = hasScrollablePage ? route.getPointAtLength(routeLength * progress) : autoPoint()
      const pointAhead = hasScrollablePage ? route.getPointAtLength(Math.min(routeLength, routeLength * progress + 2)) : autoPoint(0.012)
      const pointBehind = hasScrollablePage ? route.getPointAtLength(Math.max(0, routeLength * progress - 2)) : autoPoint(-0.012)
      const angle = Math.atan2(pointAhead.y - pointBehind.y, pointAhead.x - pointBehind.x) * (180 / Math.PI)
      const angleInRadians = angle * (Math.PI / 180)
      const wind = Math.sin(progress * 17.4) * 10 + Math.sin(progress * 41.2) * 3
      const point = {
        x: routePoint.x - Math.sin(angleInRadians) * wind,
        y: routePoint.y + Math.cos(angleInRadians) * wind,
      }
      const left = clamp(point.x - rocket.offsetWidth / 2, 14, window.innerWidth - rocket.offsetWidth - 14)
      const top = clamp(point.y - rocket.offsetHeight / 2, 14, window.innerHeight - rocket.offsetHeight - 14)

      gsap.set(rocket, { x: left, y: top })
      const travelAngle = hasScrollablePage && scrollDirection < 0 ? angle + 180 : angle
      const visualAngle = travelAngle
      const visualAngleInRadians = visualAngle * (Math.PI / 180)
      const forward = { x: Math.cos(visualAngleInRadians), y: Math.sin(visualAngleInRadians) }
      const curveSide = { x: -Math.sin(visualAngleInRadians), y: Math.cos(visualAngleInRadians) }
      setArtworkRotation(visualAngle)
      const trailStart = {
        x: point.x - forward.x * rocket.offsetWidth * 0.4 + curveSide.x * rocket.offsetHeight * 0.05,
        y: point.y - forward.y * rocket.offsetWidth * 0.4 + curveSide.y * rocket.offsetHeight * 0.05,
      }
      const trailControl = {
        x: trailStart.x - forward.x * 74 + curveSide.x * 42,
        y: trailStart.y - forward.y * 74 + curveSide.y * 42,
      }
      const trailEnd = {
        x: trailStart.x - forward.x * 194 + curveSide.x * 46,
        y: trailStart.y - forward.y * 194 + curveSide.y * 46,
      }

      dashRefs.current.forEach((dash, index) => {
        const dashStart = index / DASH_COUNT
        const dashEnd = dashStart + 0.047
        const startPoint = getCurvePoint(trailStart, trailControl, trailEnd, dashStart)
        const endPoint = getCurvePoint(trailStart, trailControl, trailEnd, dashEnd)
        dash.setAttribute('d', `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`)
      })
    }

    const schedulePosition = () => {
      if (isEntering || frameId) return
      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        positionRocket()
      })
    }
    const handleScroll = () => {
      const nextScrollPosition = window.scrollY
      if (nextScrollPosition !== lastScrollPosition) {
        scrollDirection = nextScrollPosition > lastScrollPosition ? 1 : -1
        lastScrollPosition = nextScrollPosition
      }
      schedulePosition()
    }
    const runAutoFlight = () => {
      if (isEntering || document.documentElement.scrollHeight - window.innerHeight > 1) {
        autoFrameId = 0
        return
      }
      positionRocket()
      autoFrameId = window.requestAnimationFrame(runAutoFlight)
    }
    const handleResize = () => {
      updateRoute()
      schedulePosition()
      if (!autoFrameId && document.documentElement.scrollHeight - window.innerHeight <= 1) runAutoFlight()
    }

    updateRoute()

    if (reducedMotion) return undefined

    positionRocket()

    const enterAnimation = gsap.fromTo(
      rocket,
      { autoAlpha: 0, x: -180, y: 18, rotation: -8 },
      {
        autoAlpha: 1,
        duration: 0.55,
        ease: 'power3.out',
        onComplete: () => {
          isEntering = false
          gsap.set(rocket, { rotation: 0 })
          positionRocket()
          if (document.documentElement.scrollHeight - window.innerHeight <= 1) runAutoFlight()
        },
      },
    )

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      enterAnimation.kill()
      setArtworkRotation.tween?.kill()
      window.cancelAnimationFrame(frameId)
      window.cancelAnimationFrame(autoFrameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <><svg className="paper-rocket-route" aria-hidden="true"><path className="paper-rocket-route__guide" ref={flightPathRef} />{Array.from({ length: DASH_COUNT }, (_, index) => <path className="paper-rocket-route__dash" key={index} ref={(element) => { dashRefs.current[index] = element }} style={{ animationDelay: `${index * 120}ms` }} />)}</svg><div className="paper-rocket-flight" ref={rocketRef} aria-hidden="true"><div className="paper-rocket-flight__glide"><img ref={artworkRef} src={paperRocket} alt="" /></div></div></>
}
