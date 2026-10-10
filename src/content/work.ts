// The project screenshots are not in the repo yet; until they are committed to
// public/website-screenshots, they load from the live site. Set
// NEXT_PUBLIC_SHOT_ORIGIN="" to serve them locally once they land.
const SHOT_ORIGIN = process.env.NEXT_PUBLIC_SHOT_ORIGIN ?? 'https://www.tracedesign.co'
const shot = (file: string) => `${SHOT_ORIGIN}/website-screenshots/${file}`

export interface Project {
  slug: string
  index: string
  name: string
  type: string
  year: string
  url: string
  image: string
  alt: string
  tone: string
  summary: string
  overview: string
  scope: string[]
}

export const projects: Project[] = [
  {
    slug: 'wolf-river-woodworks',
    index: '01',
    name: 'Wolf River Woodworks',
    type: 'Full site build',
    year: '2026',
    url: 'https://wr-woodworks.vercel.app',
    image: shot('woodwork.png'),
    alt: 'Wolf River Woodworks website homepage',
    tone: '#2a2118',
    summary: 'A custom site for a Memphis woodworking studio.',
    overview:
      'A Memphis woodworking studio needed a site that feels as considered as the work itself: warm materials, generous imagery and a clear path from browsing to getting in touch.',
    scope: ['Visual direction', 'Web design', 'Development', 'Launch'],
  },
  {
    slug: 'get-build-leads',
    index: '02',
    name: 'Get Build Leads',
    type: 'Landing page',
    year: '2026',
    url: 'https://www.getbuildleads.com',
    image: shot('getbuilds.png'),
    alt: 'Get Build Leads website homepage',
    tone: '#141826',
    summary: 'A lead-generation page for contractor marketing.',
    overview:
      'Get Build Leads markets contractors. One page carries the whole pitch, so every section is built to move a visitor one step closer to reaching out.',
    scope: ['Conversion strategy', 'Copy direction', 'Design', 'Build'],
  },
  {
    slug: 'tea-room-charm',
    index: '03',
    name: 'Tea Room Charm',
    type: 'Web design',
    year: '2026',
    url: 'https://tea-room-charm.vercel.app',
    image: shot('tea-room.png'),
    alt: 'Tea Room Charm website homepage',
    tone: '#2b1a12',
    summary: 'A warm hospitality site for a tea room concept.',
    overview:
      'Tea Room Charm is a hospitality concept. The design leans into soft color, editorial type and an unhurried pace that matches the room.',
    scope: ['Art direction', 'Web design', 'Development'],
  },
  {
    slug: 'wash-works-usa',
    index: '04',
    name: 'Wash Works USA',
    type: 'Business website',
    year: '2026',
    url: 'https://www.washworksusa.com',
    image: shot('washworks.png'),
    alt: 'Wash Works USA website homepage',
    tone: '#121314',
    summary: 'A service-business site for a car wash brand.',
    overview:
      'Wash Works USA needed a service-business site that explains what they offer at a glance: bold type, clear structure and fast pages on every phone.',
    scope: ['Web design', 'Development', 'Performance', 'Launch'],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
