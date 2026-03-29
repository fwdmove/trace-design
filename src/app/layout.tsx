import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Geist } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Trace Design — Web Design Studio',
  description:
    'Trace Design is a web design studio building sharp, high-performance websites and digital experiences for ambitious brands.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  )
}
