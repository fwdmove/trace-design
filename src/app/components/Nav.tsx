'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import RollText from './RollText'

const links = [
  { href: '#studio', label: 'Studio' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
]

// Slim top bar that tucks away on scroll down and returns on scroll up.
// On small screens the links drop into a sheet under it.
export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const sheet = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 320 && y > last)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const el = sheet.current
    if (!el) return
    if (open) {
      gsap.fromTo(el, { autoAlpha: 0, y: -8, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'expo.out' })
      gsap.fromTo(el.querySelectorAll('a'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.04, delay: 0.05 })
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
          toggle.current?.focus()
        }
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
    gsap.to(el, { autoAlpha: 0, y: -8, duration: 0.25, ease: 'power2.in' })
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-bar">
        <Link href="/" className="nav-mark" aria-label="Trace Design, home">
          <span>Trace</span>
          <span className="nav-dot" aria-hidden="true" />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              <RollText>{l.label}</RollText>
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link href="#contact" className="btn btn-primary btn-small nav-cta">
            <RollText>Start a project</RollText>
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-toggle-icon" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>

      <div ref={sheet} id="site-menu" className="nav-sheet" inert={!open} style={{ visibility: 'hidden' }}>
        {[...links, { href: '#contact', label: 'Contact' }].map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
      </div>
    </header>
  )
}
