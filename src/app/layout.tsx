import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'
import PageMotion from './components/PageMotion'
import Nav from './components/Nav'
import Footer from './components/Footer'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
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
  themeColor: '#f7f5f1',
}

// Runs before paint: marks JS + motion support so content can start hidden
// for its entrance animation.
const bootScript = `try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('reduced')}else{d.classList.add('js')}}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
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
