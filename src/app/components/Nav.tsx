'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { getLenis } from '@/lib/motion'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#studio', label: 'Studio' },
  { href: '#contact', label: 'Contact' },
]

// Hover flashes cycle through these.
const flashes = ['#d7ff1f', '#2b2bff', '#ff3d1f', '#0a0a0a']

function useClock() {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-GB', { hour12: false })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const time = useClock()

  // Full-screen menu: lock scroll, slam the rows in, close on Escape.
  useEffect(() => {
    const el = menu.current
    if (!el) return
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(el.querySelectorAll('.menu-link'), { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: 'steps(5)', stagger: 0.05 })
      el.querySelector<HTMLElement>('.menu-link')?.focus()
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
          toggle.current?.focus()
        }
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
    lenis?.start()
    document.body.style.overflow = ''
    gsap.set(el, { display: 'none' })
  }, [open])

  const flash = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    let i = 0
    const id = setInterval(() => {
      el.style.background = flashes[i % flashes.length]
      el.style.color = i % flashes.length === 0 ? '#0a0a0a' : '#f2f1ec'
      if (++i > 5) {
        clearInterval(id)
        el.style.background = ''
        el.style.color = ''
      }
    }, 55)
  }

  return (
    <>
      <header className="nav">
        <Link href="/" className="nav-cell nav-mark" aria-label="Trace Design, home">
          TRACE<sup>®</sup>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.slice(0, 3).map((l) => (
            <Link key={l.href} href={l.href} className="nav-cell" onPointerEnter={flash}>
              {l.label}
            </Link>
          ))}
        </nav>
        <span className="nav-cell nav-clock" aria-hidden="true">
          LOCAL {time}
        </span>
        <Link href="#contact" className="nav-cell nav-cta">
          <span data-scramble>Start a project</span> →
        </Link>
        <button
          ref={toggle}
          type="button"
          className="nav-cell menu-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '[ Close ]' : '[ Menu ]'}
        </button>
      </header>

      <div
        ref={menu}
        id="site-menu"
        className="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        style={{ display: 'none' }}
      >
        <nav className="menu-links" aria-label="Menu">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} className="menu-link" onClick={() => setOpen(false)}>
              <span className="tag">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
