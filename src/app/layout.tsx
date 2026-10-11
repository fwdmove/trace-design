import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Newsreader } from 'next/font/google'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'
import Motion from './components/Motion'
import Surface from './components/Surface'

const sans = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Newsreader({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['300', '400'],
  variable: '--font-serif',
  display: 'swap',
})

const siteUrl = 'https://www.tracedesign.co'
const description =
  'Trace Design is an independent web studio. We design and build custom websites and landing pages, start to finish.'

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
    title: 'Trace Design | Websites that leave a trace',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trace Design | Websites that leave a trace',
    description,
  },
}

export const viewport: Viewport = {
  themeColor: '#efede8',
}

// Runs before paint: marks JS + motion support so content can start hidden
// for its entrance animation.
const bootScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js')}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Surface />
        <SmoothScroll />
        <Motion />
        {children}
      </body>
    </html>
  )
}
