import { useEffect, useState } from 'react'
import AlgotricsLanding from './pages/AlgotricsLanding'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TalentsPage from './pages/TalentsPage'
import TeamMemberPortfolioPage from './pages/TeamMemberPortfolioPage'
import UpcomingPage from './pages/UpcomingPage'
import CustomCursor from './components/CustomCursor'
import ProjectCaseStudyPage from './pages/ProjectCaseStudyPage'
import PaperRocketFlight from './components/PaperRocketFlight'
import SiteNavbar from './components/SiteNavbar'
import PageLoader from './components/PageLoader'
import SmoothScroll from './components/SmoothScroll'
import { scrollToTarget, scrollToTop } from './lib/scroll'

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/+$/, ''))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const syncPath = () => {
      setPath(window.location.pathname.replace(/\/+$/, ''))
      if (window.location.hash) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          const element = document.querySelector(window.location.hash)
          if (element) scrollToTarget(element)
          else scrollToTop()
        }))
      } else {
        scrollToTop()
      }
    }
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  useEffect(() => {
    const finishLoading = () => window.setTimeout(() => setIsLoading(false), 1150)
    if (document.readyState === 'complete') finishLoading()
    else window.addEventListener('load', finishLoading, { once: true })
    return () => window.removeEventListener('load', finishLoading)
  }, [])

  const teamMemberSlug = path.match(/^\/team\/([^/]+)$/)?.[1]
  const projectSlug = path.match(/^\/work\/([^/]+)$/)?.[1]
  const CurrentPage = path === '/work' ? WorkPage : projectSlug ? ProjectCaseStudyPage : path === '/about' ? AboutPage : path === '/contact' ? ContactPage : path === '/talents' ? TalentsPage : path === '/upcoming' ? UpcomingPage : teamMemberSlug ? TeamMemberPortfolioPage : AlgotricsLanding
  const navigate = (target) => {
    window.history.pushState({}, '', target)
    setPath(window.location.pathname.replace(/\/+$/, ''))
    if (target.startsWith('/#')) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const element = document.querySelector(target.slice(1))
        if (element) scrollToTarget(element)
      }))
    } else {
      scrollToTop()
    }
  }

  return <>{isLoading && <PageLoader />}<SiteNavbar path={path} onNavigate={navigate} /><CurrentPage onNavigate={navigate} slug={projectSlug || teamMemberSlug} /><PaperRocketFlight /><CustomCursor /><SmoothScroll /></>
}
