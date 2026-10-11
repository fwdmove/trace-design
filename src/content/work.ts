const shot = (file: string) => `/website-screenshots/${file}`

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
}

export const projects: Project[] = [
  {
    slug: 'wolf-river-woodworks',
    index: '01',
    name: 'Wolf River Woodworks',
    type: 'Full site build',
    year: '2026',
    url: 'https://wr-woodworks.vercel.app',
    image: shot('woodwork.jpg'),
    alt: 'Wolf River Woodworks website homepage',
    tone: '#2a2118',
    summary: 'A custom site for a Memphis woodworking studio.',
  },
  {
    slug: 'get-build-leads',
    index: '02',
    name: 'Get Build Leads',
    type: 'Concept landing page',
    year: '2026',
    url: 'https://www.getbuildleads.com',
    image: shot('getbuilds.jpg'),
    alt: 'Get Build Leads website homepage',
    tone: '#141826',
    summary: 'A self-initiated concept: a lead-generation page for contractor marketing.',
  },
  {
    slug: 'tea-room-charm',
    index: '03',
    name: 'Tea Room Charm',
    type: 'Web design',
    year: '2026',
    url: 'https://tea-room-charm.vercel.app',
    image: shot('tea-room.jpg'),
    alt: 'Tea Room Charm website homepage',
    tone: '#2b1a12',
    summary: 'A warm hospitality site for a tea room concept.',
  },
  {
    slug: 'wash-works-usa',
    index: '04',
    name: 'Wash Works USA',
    type: 'Business website',
    year: '2026',
    url: 'https://www.washworksusa.com',
    image: shot('washworks.jpg'),
    alt: 'Wash Works USA website homepage',
    tone: '#121314',
    summary: 'A service-business site for a car wash brand.',
  },
]

