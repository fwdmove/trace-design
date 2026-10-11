'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { markReady } from '@/lib/motion'

// First-visit intro: the letters pump through the font's weight and width
// while a counter runs to 100, then the curtain lifts.
// Skipped (via the boot script's `seen` class) on repeat visits and for
// reduced motion; either way it fires the ready signal the page waits on.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const html = document.documentElement
    const el = root.current
    if (!el || html.classList.contains('seen') || !html.classList.contains('js')) {
      markReady()
      return
    }

    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem('trace-seen', '1') } catch {}
        html.classList.add('seen')
      },
    })

    const letters = '.preloader-word span'
    tl.fromTo(letters, { yPercent: 110, '--w': 100, '--x': 50 }, { yPercent: 0, '--w': 900, '--x': 150, duration: 0.9, ease: 'expo.out', stagger: 0.05 })
      .to(letters, {
        keyframes: { '--w': [900, 150, 900], '--x': [150, 50, 100] },
        duration: 1.1,
        ease: 'sine.inOut',
        stagger: { each: 0.07 },
      }, 0.5)
      .to(counter, {
        v: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      }, 0.1)
      .to('.preloader-bar', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.1)
      .to(letters, { yPercent: -110, duration: 0.6, ease: 'expo.in', stagger: 0.03 })
      .to(el, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.15')
      .add(markReady, '-=0.55')

    return () => { tl.kill() }
  }, [])

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader-word">
        {'TRACE'.split('').map((c, i) => <span key={i}>{c}</span>)}
      </div>
      <div className="preloader-foot">
        <span className="mono">Independent web studio</span>
        <span className="mono"><span ref={count}>000</span></span>
      </div>
      <div className="preloader-bar" />
    </div>
  )
}
