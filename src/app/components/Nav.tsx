'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { getLenis } from '@/lib/motion'
import RollText from './RollText'

const links = [
  { href: '#services', label: 'What we do' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 240 && y > last)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // Full-screen menu: lock scroll, animate links, close on Escape.
  useEffect(() => {
    const el = menu.current
    if (!el) return
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
      gsap.fromTo(el.querySelectorAll('.menu-link span'), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.3 })
      gsap.fromTo(el.querySelectorAll('.menu-foot > *'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.06, delay: 0.5 })
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
    gsap.to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'expo.inOut' })
  }, [open])

  return (
    <>
      <header className={`nav ${hidden && !open ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <Link href="/" className="nav-mark" aria-label="Trace Design, home">
          <span className="nav-mark-word">Trace</span>
          <span className="nav-mark-sub">Design</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              <RollText>{l.label}</RollText>
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link href="#contact" className="btn btn-small nav-cta" data-magnetic="0.25">
            <RollText>Start a project</RollText>
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-toggle-label">{open ? 'Close' : 'Menu'}</span>
            <span className="menu-toggle-icon" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>

      <div
        ref={menu}
        id="site-menu"
        className="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        <nav className="menu-links" aria-label="Menu">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} className="menu-link" onClick={() => setOpen(false)}>
              <span>
                <sup className="mono">0{i + 1}</sup>
                {l.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="menu-foot">
          <p className="mono">Independent web studio, est. 2019</p>
          <p className="mono">Working worldwide</p>
        </div>
      </div>
    </>
  )
}
