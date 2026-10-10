'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { MODES } from './Field'

const FREQS = [0, 432, 0, 864, 0]

// Readouts pinned to the screen corners: which figure the field is holding,
// and how far down the page you are. Also binds the 3D tilt + spotlight on
// [data-tilt] cards, since both follow the pointer.
export default function Hud() {
  const [mode, setMode] = useState(0)
  const progress = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onMode = (e: Event) => setMode((e as CustomEvent<number>).detail)
    window.addEventListener('trace:mode', onMode)

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (progress.current) progress.current.textContent = String(Math.round(p * 100)).padStart(3, '0')
      if (bar.current) bar.current.style.transform = `scaleY(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const cleanups: (() => void)[] = []
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (fine && !reduced) {
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' })
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' })
        gsap.set(el, { transformPerspective: 1400 })
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width
          const y = (e.clientY - r.top) / r.height
          ry((x - 0.5) * 8)
          rx((0.5 - y) * 6)
          el.style.setProperty('--mx', `${x * 100}%`)
          el.style.setProperty('--my', `${y * 100}%`)
        }
        const leave = () => { rx(0); ry(0) }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        })
      })
    }

    return () => {
      window.removeEventListener('trace:mode', onMode)
      window.removeEventListener('scroll', onScroll)
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <div className="hud" aria-hidden="true">
      <div className="hud-corner hud-bl">
        <span className="hud-dot" />
        <span>Field</span>
        <span className="hud-mode" key={mode}>
          {String(mode + 1).padStart(2, '0')} / {MODES[mode]}
        </span>
        {FREQS[mode] > 0 && <span className="hud-dim">{FREQS[mode]} Hz</span>}
      </div>
      <div className="hud-corner hud-br">
        <span className="hud-dim">Scroll</span>
        <span ref={progress}>000</span>
      </div>
      <div className="hud-rail"><span ref={bar} /></div>
    </div>
  )
}
