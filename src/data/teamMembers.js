import aaryaPortrait from '../assets/team-aarya-menon.png'
import rohanPortrait from '../assets/team-rohan-mehta.png'
import nilaPortrait from '../assets/team-nila-kapoor.png'
import arjunPortrait from '../assets/team-arjun-varma.png'

/** Static team profiles shown on the About page and individual portfolio pages. */
export const teamMembers = [
  {
    slug: 'aarya-menon', name: 'Aarya Menon', role: 'Strategy Director', portrait: aaryaPortrait,
    intro: 'Turning ambitious ideas into clear, useful direction.',
    statement: 'The best strategy does not make more work. It creates the confidence to make the right work.',
    theme: '#B9DAD5',
    bio: 'Aarya works with founders and teams to find the real opportunity inside a complex problem. Her practice brings product strategy, customer insight, and business priorities into one focused path forward.',
    specialties: ['Product strategy', 'Research synthesis', 'Digital roadmaps'],
    work: ['Platform positioning', 'Service design', 'Growth systems'],
    experience: [['2023 — Now', 'Strategy Director', 'Algotrics'], ['2020 — 2023', 'Independent Product Strategist', 'Mumbai'], ['2017 — 2020', 'Brand & Innovation Lead', 'New Delhi']],
    projects: [['09-tryon', 'TRYON', 'Commerce experience', '2026'], ['03-fabelfintech', 'Fabel Fintech', 'Digital product strategy', '2025']],
  },
  {
    slug: 'rohan-mehta', name: 'Rohan Mehta', role: 'Creative Director', portrait: rohanPortrait,
    intro: 'Building identities and experiences people remember.',
    statement: 'Good creative direction gives an idea its own gravity — so people are drawn to it before they can explain why.',
    theme: '#70B9B2',
    bio: 'Rohan leads the creative direction behind Algotrics projects, shaping brands and digital products with equal parts imagination and intention. He believes the strongest visual systems make every interaction feel inevitable.',
    specialties: ['Creative direction', 'Brand identity', 'Experience design'],
    work: ['Visual systems', 'Campaign worlds', 'Product storytelling'],
    experience: [['2022 — Now', 'Creative Director', 'Algotrics'], ['2019 — 2022', 'Design Director', 'Independent studio'], ['2015 — 2019', 'Senior Art Director', 'Mumbai']],
    projects: [['05-breakoutlabs', 'Breakout Labs', 'Brand & digital experience', '2026'], ['08-fskmrsas', 'FSKMRSAS Studio', 'Creative identity', '2025']],
  },
  {
    slug: 'nila-kapoor', name: 'Nila Kapoor', role: 'Lead Engineer', portrait: nilaPortrait,
    intro: 'Engineering robust, human-centred digital products.',
    statement: 'Technology earns its place when it makes a complex thing feel remarkably simple.',
    theme: '#4AA7A4',
    bio: 'Nila connects ambitious product ideas to dependable technical delivery. She guides engineering teams through complex systems while keeping the experience fast, accessible, and ready to evolve.',
    specialties: ['Technical strategy', 'Web applications', 'System architecture'],
    work: ['Design systems', 'Platform builds', 'Performance engineering'],
    experience: [['2021 — Now', 'Lead Engineer', 'Algotrics'], ['2018 — 2021', 'Senior Front-end Engineer', 'Product consultancy'], ['2015 — 2018', 'Software Engineer', 'Bengaluru']],
    projects: [['06-algohealthplus', 'Algorithm Health', 'Digital healthcare platform', '2025'], ['01-linengineering', 'Lin Engineering', 'Technical web platform', '2025']],
  },
  {
    slug: 'arjun-varma', name: 'Arjun Varma', role: 'Product Designer', portrait: arjunPortrait,
    intro: 'Designing digital products that make work feel easier.',
    statement: 'A product feels effortless when every detail respects the person on the other side of the screen.',
    theme: '#149A98',
    bio: 'Arjun designs thoughtful digital experiences from first flow to final detail. His work combines curiosity about people with a sharp eye for interaction, creating products that are clear, confident, and a pleasure to use.',
    specialties: ['Product design', 'UX systems', 'Prototyping'],
    work: ['User journeys', 'Interface design', 'Interaction patterns'],
    experience: [['2022 — Now', 'Product Designer', 'Algotrics'], ['2019 — 2022', 'Experience Designer', 'Digital products studio'], ['2017 — 2019', 'UI Designer', 'Bengaluru']],
    projects: [['04-yazhinitours', 'Yazhini Tours', 'Travel booking experience', '2026'], ['07-aharon-trading', 'Aharon Trading', 'Business web experience', '2026']],
  },
]

export const getTeamMember = (slug) => teamMembers.find((member) => member.slug === slug)
