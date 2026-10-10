'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { markReady } from '@/lib/motion'

const lines = ['> TRACE DESIGN // BOOT', '> LOADING TYPE ....... OK', '> LOADING WORK ....... OK', '> NO TEMPLATES FOUND . OK']

// First-visit intro: terminal lines type out, a block bar fills, then the
// screen cuts away. Skipped (via the boot script's `seen` class) on repeat
// visits and for reduced motion; either way it fires the ready signal.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const html = document.documentElement
    const el = root.current
    if (!el || html.classList.contains('seen') || !html.classList.contains('js')) {
      markReady()
      return
    }

    const state = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem('trace-seen', '1') } catch {}
        html.classList.add('seen')
      },
    })

    tl.from('.preloader-line', { autoAlpha: 0, duration: 0.01, stagger: 0.28 })
      .to(state, {
        v: 20,
        duration: 1.3,
        ease: 'steps(20)',
        onUpdate: () => {
          if (bar.current) {
            const n = Math.round(state.v)
            bar.current.textContent = '█'.repeat(n) + '░'.repeat(20 - n) + ` ${String(n * 5).padStart(3, '0')}%`
          }
        },
      }, 0.1)
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.5, ease: 'steps(6)' }, '+=0.15')
      .add(markReady, '-=0.3')

    return () => { tl.kill() }
  }, [])

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader-lines">
        {lines.map((l) => <p className="preloader-line" key={l}>{l}</p>)}
        <p className="preloader-bar"><span ref={bar}>░░░░░░░░░░░░░░░░░░░░ 000%</span></p>
      </div>
    </div>
  )
}
