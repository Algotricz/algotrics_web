import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/Global.css'

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
const navigationEntry = window.performance.getEntriesByType('navigation')[0]
const isPageReload = navigationEntry?.type === 'reload' || window.performance.navigation?.type === 1
const scrollToHero = () => {
  window.scrollTo(0, 0)
  requestAnimationFrame(() => window.scrollTo(0, 0))
}

if (isPageReload) {
  window.history.replaceState({}, '', '/')
  scrollToHero()
}
else if (window.location.hash) window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}`)
window.scrollTo(0, 0)
window.addEventListener('load', () => {
  scrollToHero()
}, { once: true })
window.addEventListener('pageshow', () => {
  if (!isPageReload) return
  window.history.replaceState({}, '', '/')
  scrollToHero()
}, { once: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
