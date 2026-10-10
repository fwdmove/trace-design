'use client'

import { useEffect, useRef } from 'react'

// Full-screen crosshair with a live X/Y readout; over [data-cursor] targets
// the readout swaps to that label (e.g. "Visit"). Fine pointers only.
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const readout = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const move = (e: PointerEvent) => {
      el.style.setProperty('--x', `${e.clientX}px`)
      el.style.setProperty('--y', `${e.clientY}px`)
      el.classList.add('is-visible')
      const target = (e.target as Element | null)?.closest('[data-cursor]')
      el.classList.toggle('is-label', !!target)
      if (readout.current) {
        readout.current.textContent = target
          ? `${target.getAttribute('data-cursor')} ↗`
          : `X${String(e.clientX).padStart(4, '0')} Y${String(e.clientY).padStart(4, '0')}`
      }
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
    <div ref={root} className="cursor" aria-hidden="true">
      <i className="cursor-h" />
      <i className="cursor-v" />
      <span ref={readout} className="cursor-readout" />
    </div>
  )
}
