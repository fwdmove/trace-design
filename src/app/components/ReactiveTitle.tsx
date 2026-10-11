'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion, whenReady } from '@/lib/motion'

// The hero headline. Letters rise in on load, then thicken as the pointer
// passes near them: the variable font's weight follows the cursor.
export default function ReactiveTitle({ lines, label }: { lines: string[]; label: string }) {
  const root = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const chars = gsap.utils.toArray<HTMLElement>('.rt-char', el)
    let cancelled = false
    let intro: gsap.core.Tween | undefined

    whenReady().then(() => {
      if (cancelled) return
      gsap.set(el, { visibility: 'visible' })
      intro = gsap.from(chars, {
        yPercent: 110,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.025,
      })
    })

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return () => { cancelled = true; intro?.kill() }
    }

    const setters = chars.map((c) => gsap.quickTo(c, '--w', { duration: 0.6, ease: 'power3' }))
    const move = (e: PointerEvent) => {
      chars.forEach((c, i) => {
        const r = c.getBoundingClientRect()
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2))
        const reach = Math.max(r.height * 1.4, 160)
        setters[i](900 - Math.min(d / reach, 1) * 400)
      })
    }
    const leave = () => setters.forEach((s) => s(500))
    const zone = el.closest<HTMLElement>('[data-hero]') ?? el
    zone.addEventListener('pointermove', move)
    zone.addEventListener('pointerleave', leave)
    return () => {
      cancelled = true
      intro?.kill()
      zone.removeEventListener('pointermove', move)
      zone.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <h1 ref={root} className="hero-title" aria-label={label}>
      {lines.map((line, li) => (
        <span className="rt-line" key={li} aria-hidden="true">
          {line.split('').map((ch, i) => (
            <span className="rt-char" key={i}>{ch === ' ' ? ' ' : ch}</span>
          ))}
        </span>
      ))}
    </h1>
  )
}
