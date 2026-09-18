import { useEffect, useState } from 'react'
import AlgotricsLanding from './pages/AlgotricsLanding'
import WorkPage from './pages/WorkPage'
import FlyingRocketCursor from './components/FlyingRocketCursor'
import SiteNavbar from './components/SiteNavbar'
import PageLoader from './components/PageLoader'

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/+$/, ''))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname.replace(/\/+$/, ''))
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  useEffect(() => {
    const finishLoading = () => window.setTimeout(() => setIsLoading(false), 1150)
    if (document.readyState === 'complete') finishLoading()
    else window.addEventListener('load', finishLoading, { once: true })
    return () => window.removeEventListener('load', finishLoading)
  }, [])

  const isWorkPage = path === '/work'
  const navigate = (target) => {
    window.history.pushState({}, '', target)
    setPath(window.location.pathname.replace(/\/+$/, ''))
    if (target.startsWith('/#')) requestAnimationFrame(() => document.querySelector(target.slice(1))?.scrollIntoView({ behavior: 'smooth' }))
    else window.scrollTo(0, 0)
  }

  return <>{isLoading && <PageLoader />}<SiteNavbar path={path} onNavigate={navigate} />{isWorkPage ? <WorkPage /> : <AlgotricsLanding />}<FlyingRocketCursor /></>
}
