import type { Metadata, Viewport } from 'next'
import { Inter_Tight, Instrument_Serif, Geist_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'
import PageMotion from './components/PageMotion'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Footer from './components/Footer'

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const siteUrl = 'https://www.tracedesign.co'
const description =
  'Trace Design is an independent web studio. We design and build custom websites and landing pages, end to end.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Trace Design | Independent web studio',
    template: '%s | Trace Design',
  },
  description,
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Trace Design',
    title: 'Trace Design | Websites that don’t blend in',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trace Design | Websites that don’t blend in',
    description,
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0f0e',
}

// Runs before paint: marks JS + motion support so content can start hidden
// for its entrance animation, and skips the preloader after the first visit.
const bootScript = `try{var d=document.documentElement,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(r){d.classList.add('seen','reduced')}else{d.classList.add('js');if(sessionStorage.getItem('trace-seen'))d.classList.add('seen')}}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Preloader />
        <SmoothScroll />
        <PageMotion />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
