/* eslint-disable react/prop-types */
import { useState } from 'react'
import logoMark from '../assets/algo.png'
import './SiteNavbar.css'

/**
 * Shared primary navigation rendered by the app shell.
 * @param {{ onNavigate: (path: string) => void, path: string }} props Route callback and active pathname.
 */
export default function SiteNavbar({ onNavigate, path }) {
  const [open, setOpen] = useState(false)
  const go = (event, target) => {
    event.preventDefault()
    setOpen(false)
    onNavigate(target)
  }
  const links = [['Talents', '/#services'], ['Works', '/work'], ['About', '/#about'], ['Contact', '/#contact']]
  return <nav className="site-navbar" aria-label="Primary navigation"><div className="site-navbar__pill"><div className="site-navbar__links">{links.slice(0, 2).map(([label, target]) => <a className={path === target ? 'site-navbar__link site-navbar__link--active' : 'site-navbar__link'} href={target} onClick={(event) => go(event, target)} key={label}>{label}</a>)}</div><a className="site-navbar__logo" href="/" onClick={(event) => go(event, '/')} aria-label="Algotricz home"><img src={logoMark} alt="Algotricz" /></a><div className="site-navbar__links">{links.slice(2).map(([label, target]) => <a className={path === target ? 'site-navbar__link site-navbar__link--active' : 'site-navbar__link'} href={target} onClick={(event) => go(event, target)} key={label}>{label}</a>)}</div><button className="site-navbar__toggle" type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button></div><div className={open ? 'site-navbar__mobile site-navbar__mobile--open' : 'site-navbar__mobile'}>{links.map(([label, target]) => <a href={target} onClick={(event) => go(event, target)} key={label}>{label}</a>)}</div></nav>
}


