import { useEffect } from 'react'
import { getTeamMember } from '../data/teamMembers'
import '../styles/TeamMemberPortfolioPage.css'

const assets = import.meta.glob('../assets/*/*.png', { eager: true, import: 'default' })
const projectImage = (folder) => Object.entries(assets).find(([path]) => path.includes(`/assets/${folder}/HERO.`))?.[1] || Object.entries(assets).find(([path]) => path.includes(`/assets/${folder}/`))?.[1]

/**
 * Individual team-member portfolio view.
 * @param {{ slug: string, onNavigate: (target: string) => void }} props
 */
export default function TeamMemberPortfolioPage({ slug, onNavigate }) {
  const member = getTeamMember(slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!member) return <main className="team-portfolio team-portfolio--missing"><p>Profile not found.</p><a href="/about" onClick={(event) => { event.preventDefault(); onNavigate('/about') }}>Back to our team</a></main>

  return (
    <main className="team-portfolio" style={{ '--member-accent': member.theme }}>
      <section className="team-portfolio__hero">
        <button className="team-portfolio__back" type="button" onClick={() => onNavigate('/about')}>← Our team</button>
        <div className="team-portfolio__identity">
          <p>Algotrics / People <span>01</span></p>
          <h1>{member.name}</h1>
          <h2>{member.role}</h2>
          <p className="team-portfolio__intro">{member.intro}</p>
        </div>
        <div className="team-portfolio__portrait"><img src={member.portrait} alt={`${member.name}, ${member.role}`} /></div>
        <p className="team-portfolio__scroll">Scroll to explore <span>↓</span></p>
      </section>

      <section className="team-portfolio__about">
        <p className="team-portfolio__label">01 / About</p>
        <div><p className="team-portfolio__bio">{member.bio}</p><blockquote>“{member.statement}”</blockquote></div>
      </section>

      <section className="team-portfolio__details">
        <div><p className="team-portfolio__label">02 / Expertise</p><ul>{member.specialties.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div><p className="team-portfolio__label">03 / Focus</p><ul>{member.work.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="team-portfolio__selected-work">
        <div className="team-portfolio__section-intro"><p className="team-portfolio__label">04 / Selected work</p><h2>A point of view,<br /><em>put into practice.</em></h2></div>
        <div className="team-portfolio__project-grid">{member.projects.map(([folder, title, category, year], index) => <a className={`team-portfolio__project team-portfolio__project--${index + 1}`} href="/work" onClick={(event) => { event.preventDefault(); onNavigate('/work') }} key={title}><div><img src={projectImage(folder)} alt="" /><span>View work ↗</span></div><p>{year} / {category}</p><h3>{title}</h3></a>)}</div>
      </section>

      <section className="team-portfolio__experience">
        <p className="team-portfolio__label">05 / Experience</p>
        <div>{member.experience.map(([period, title, place]) => <article key={period}><p>{period}</p><h3>{title}</h3><span>{place}</span></article>)}</div>
      </section>

      <section className="team-portfolio__contact">
        <p>Have a useful problem to solve?</p>
        <a href="/contact" onClick={(event) => { event.preventDefault(); onNavigate('/contact') }}>Start a conversation <span>→</span></a>
      </section>
    </main>
  )
}
