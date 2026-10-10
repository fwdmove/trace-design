'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { markReady } from '@/lib/motion'

// First-visit intro: a soft orb blooms, the wordmark breathes in out of a
// blur, then the whole veil dissolves. Skipped (via the boot script's `seen`
// class) on repeat visits and for reduced motion; either way it fires the
// ready signal the page waits on.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const html = document.documentElement
    const el = root.current
    if (!el || html.classList.contains('seen') || !html.classList.contains('js')) {
      markReady()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem('trace-seen', '1') } catch {}
        html.classList.add('seen')
      },
    })

    tl.from('.preloader-orb', { scale: 0, duration: 1.8, ease: 'expo.out' })
      .from('.preloader-word span', {
        opacity: 0,
        filter: 'blur(14px)',
        yPercent: 30,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.07,
      }, 0.2)
      .to('.preloader-orb', { scale: 7, duration: 1.4, ease: 'power3.inOut' }, 1.5)
      .to('.preloader-word', { opacity: 0, filter: 'blur(10px)', duration: 0.8, ease: 'power2.in' }, 1.5)
      .to(el, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 2.2)
      .add(markReady, 2.3)

    return () => { tl.kill() }
  }, [])

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <span className="preloader-orb" />
      <div className="preloader-word">
        {'trace'.split('').map((c, i) => <span key={i}>{c}</span>)}
      </div>
    </div>
  )
}
