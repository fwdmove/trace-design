'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/lib/motion'

// The soft backdrop behind every section: a few blurred colour blobs that
// wander and change shape on their own, lean gently toward the pointer, and
// a fine grain on top so the gradients feel like paper rather than screen.
export default function Ambient() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const blobs = gsap.utils.toArray<HTMLElement>('.ambient-blob', el)
    const tweens: gsap.core.Tween[] = []

    const wander = (b: HTMLElement) => {
      tweens.push(
        gsap.to(b, {
          xPercent: gsap.utils.random(-30, 30),
          yPercent: gsap.utils.random(-25, 25),
          scale: gsap.utils.random(0.85, 1.2),
          rotate: gsap.utils.random(-40, 40),
          borderRadius: `${gsap.utils.random(35, 65, 1)}% ${gsap.utils.random(35, 65, 1)}% ${gsap.utils.random(35, 65, 1)}% ${gsap.utils.random(35, 65, 1)}% / ${gsap.utils.random(35, 65, 1)}% ${gsap.utils.random(35, 65, 1)}% ${gsap.utils.random(35, 65, 1)}% ${gsap.utils.random(35, 65, 1)}%`,
          duration: gsap.utils.random(9, 15),
          ease: 'sine.inOut',
          onComplete: () => wander(b),
        }),
      )
    }
    blobs.forEach(wander)

    // Pointer lean: each blob drifts a different amount, which reads as depth.
    const layer = el.querySelector<HTMLElement>('.ambient-layer')
    const lx = layer ? gsap.quickTo(layer, 'x', { duration: 2.4, ease: 'power2.out' }) : null
    const ly = layer ? gsap.quickTo(layer, 'y', { duration: 2.4, ease: 'power2.out' }) : null
    const move = (e: PointerEvent) => {
      lx?.((e.clientX / window.innerWidth - 0.5) * 60)
      ly?.((e.clientY / window.innerHeight - 0.5) * 60)
    }
    window.addEventListener('pointermove', move, { passive: true })

    return () => {
      window.removeEventListener('pointermove', move)
      tweens.forEach((t) => t.kill())
      gsap.killTweensOf(blobs)
    }
  }, [])

  return (
    <div ref={root} className="ambient" aria-hidden="true">
      <div className="ambient-layer">
        <span className="ambient-blob ambient-sage" />
        <span className="ambient-blob ambient-clay" />
        <span className="ambient-blob ambient-sky" />
        <span className="ambient-blob ambient-butter" />
      </div>
      <svg className="ambient-grain" width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
