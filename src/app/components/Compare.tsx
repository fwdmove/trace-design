'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/lib/motion'

/*
 * One made-up bakery, built twice: the template version sits on top and is
 * clipped to the left of the handle, the studio version shows through on the
 * right. Drag anywhere on the panel, or focus the handle and use the arrows.
 */
export default function Compare() {
  const panel = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)

  // Once, when the panel first comes into view, sweep the handle so it's
  // obvious the panel moves. Any touch from the visitor cancels it.
  useEffect(() => {
    const el = panel.current
    if (!el || prefersReducedMotion()) return
    const state = { p: 50 }
    let tl: gsap.core.Timeline | undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        tl = gsap.timeline({ delay: 0.4, onUpdate: () => setPos(state.p) })
          .to(state, { p: 18, duration: 1.1, ease: 'power3.inOut' })
          .to(state, { p: 76, duration: 1.5, ease: 'power3.inOut' })
          .to(state, { p: 50, duration: 1.1, ease: 'power3.inOut' })
      },
      { threshold: 0.55 },
    )
    io.observe(el)
    const stop = () => tl?.kill()
    el.addEventListener('pointerdown', stop)
    el.addEventListener('keydown', stop)
    return () => {
      io.disconnect()
      tl?.kill()
      el.removeEventListener('pointerdown', stop)
      el.removeEventListener('keydown', stop)
    }
  }, [])

  const moveTo = (clientX: number) => {
    const r = panel.current!.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <>
    <div
      ref={panel}
      className="compare"
      style={{ '--pos': `${pos}%` } as React.CSSProperties}
      onPointerDown={(e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        moveTo(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className="cmp-layer cmp-trace" aria-hidden="true">
        <TraceMock />
      </div>
      <div className="cmp-layer cmp-template" aria-hidden="true">
        <TemplateMock />
      </div>

      <div
        className="cmp-handle"
        role="slider"
        tabIndex={0}
        aria-label="Compare the template version with the Trace version"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
          if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
        }}
      >
        <span className="cmp-knob">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
    <div className="cmp-caption" aria-hidden="true">
      <span className="mono">← Template</span>
      <span className="mono">Trace →</span>
    </div>
    </>
  )
}

function TemplateMock() {
  return (
    <div className="tpl">
      <div className="tpl-nav">
        <span className="tpl-logo">Marlow Bakery</span>
        <span className="tpl-links">
          <i>Home</i><i>About</i><i>Menu</i><i>Contact</i>
        </span>
      </div>
      <div className="tpl-hero">
        <p className="tpl-h1">Welcome to Marlow Bakery</p>
        <p className="tpl-sub">Fresh bread and pastries, baked daily.</p>
        <span className="tpl-btn">Learn More</span>
      </div>
      <div className="tpl-cards">
        {['Quality', 'Fresh', 'Local'].map((t) => (
          <div className="tpl-card" key={t}>
            <span className="tpl-icon" />
            <p className="tpl-card-title">{t}</p>
            <p className="tpl-card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const bake = [
  ['Country sourdough', '7:00'],
  ['Rye & caraway', '7:30'],
  ['Morning buns', '8:00'],
  ['Cardamom knots', '9:30'],
]

function TraceMock() {
  return (
    <div className="mb">
      <div className="mb-nav">
        <span className="mb-logo">Marlow</span>
        <span className="mb-links"><i>Bread</i><i>Pastry</i><i>Visit</i></span>
        <span className="mb-pill">Order for Saturday</span>
      </div>
      <div className="mb-body">
        <p className="mb-h1">
          Bread worth<br />getting up<br /><span>early</span> for.
        </p>
        <div className="mb-card">
          <div className="mb-seal">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path id="mb-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text><textPath href="#mb-ring">Open Tue to Sun · from seven ·</textPath></text>
            </svg>
            <span>M</span>
          </div>
          <p className="mb-card-label">Out of the oven today</p>
          <ul>
            {bake.map(([name, time]) => (
              <li key={name}><span>{name}</span><b>{time}</b></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-foot">
        <span>12 Quay Street</span>
        <span>Baked overnight, gone by two</span>
      </div>
    </div>
  )
}
