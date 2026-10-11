import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'
import PageMotion from './components/PageMotion'
import Nav from './components/Nav'
import Footer from './components/Footer'

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
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
    title: 'Trace Design | Websites built like great products',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trace Design | Websites built like great products',
    description,
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f5f8',
}

// Runs before paint: marks JS + motion support so content can start hidden
// for its entrance animation.
const bootScript = `try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('reduced')}else{d.classList.add('js')}}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SmoothScroll />
        <PageMotion />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
