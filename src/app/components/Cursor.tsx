'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// A soft follower dot that grows into a labelled disc over [data-cursor]
// targets (e.g. "View" on project images). Fine pointers only; the native
// cursor stays everywhere except on those targets.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = dot.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })
    let active: Element | null = null

    const move = (e: PointerEvent) => {
      x(e.clientX)
      y(e.clientY)
      el.classList.add('is-visible')
      const target = (e.target as Element | null)?.closest('[data-cursor]') ?? null
      if (target === active) return
      active = target
      if (target && label.current) {
        label.current.textContent = target.getAttribute('data-cursor') ?? ''
        el.classList.add('is-label')
      } else {
        el.classList.remove('is-label')
      }
      const link = (e.target as Element | null)?.closest('a, button')
      el.classList.toggle('is-link', !!link && !target)
    }
    const leave = () => el.classList.remove('is-visible')

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div ref={dot} className="cursor" aria-hidden="true">
      <span className="cursor-star">✦</span>
      <span ref={label} className="cursor-label" />
    </div>
  )
}
