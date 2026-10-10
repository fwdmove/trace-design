import type { Metadata, Viewport } from 'next'
import { Anton, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'
import PageMotion from './components/PageMotion'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'

const display = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
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
  themeColor: '#0a0a0a',
}

// Runs before paint: marks JS + motion support so content can start hidden
// for its entrance animation, and skips the preloader after the first visit.
const bootScript = `try{var d=document.documentElement,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(r){d.classList.add('seen','reduced')}else{d.classList.add('js');if(sessionStorage.getItem('trace-seen'))d.classList.add('seen')}}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable}`}
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
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
