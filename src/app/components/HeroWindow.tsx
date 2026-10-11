'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

// The hero's one orchestrated moment: a website gets traced as a wireframe,
// designed, built and launched inside a browser window, in about five seconds.
// The SVG's resting state is the finished page, so reduced motion and no-JS
// visitors see the end result.

type Block = { x: number; y: number; w: number; h: number; r?: number; kind: 'ink' | 'soft' | 'accent' | 'image' | 'card' | 'line' }

const blocks: Block[] = [
  // nav
  { x: 56, y: 40, w: 86, h: 18, r: 9, kind: 'ink' },
  { x: 560, y: 44, w: 54, h: 10, r: 5, kind: 'soft' },
  { x: 634, y: 44, w: 54, h: 10, r: 5, kind: 'soft' },
  { x: 708, y: 44, w: 54, h: 10, r: 5, kind: 'soft' },
  { x: 832, y: 34, w: 112, h: 30, r: 15, kind: 'ink' },
  // hero copy
  { x: 56, y: 128, w: 430, h: 40, r: 10, kind: 'ink' },
  { x: 56, y: 180, w: 330, h: 40, r: 10, kind: 'ink' },
  { x: 56, y: 244, w: 380, h: 12, r: 6, kind: 'line' },
  { x: 56, y: 266, w: 320, h: 12, r: 6, kind: 'line' },
  { x: 56, y: 310, w: 150, h: 42, r: 21, kind: 'accent' },
  { x: 218, y: 310, w: 120, h: 42, r: 21, kind: 'soft' },
  // hero image
  { x: 540, y: 104, w: 404, h: 264, r: 18, kind: 'image' },
  // cards
  { x: 56, y: 404, w: 276, h: 150, r: 16, kind: 'card' },
  { x: 362, y: 404, w: 276, h: 150, r: 16, kind: 'card' },
  { x: 668, y: 404, w: 276, h: 150, r: 16, kind: 'card' },
]

const stages = ['Tracing the layout', 'Designing', 'Building', 'Live']

export default function HeroWindow() {
  const scene = useRef<HTMLDivElement>(null)
  const tilt = useRef<HTMLDivElement>(null)
  const win = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = win.current
    if (!root || prefersReducedMotion()) return
    const q = gsap.utils.selector(root)
    const status = root.querySelector<HTMLElement>('[data-status]')
    const url = root.querySelector<HTMLElement>('[data-url]')
    const setStage = (i: number) => () => {
      if (status) status.textContent = stages[i]
      root.dataset.stage = String(i)
    }
    const typeUrl = (text: string) => {
      const state = { n: 0 }
      return gsap.to(state, {
        n: text.length,
        duration: 0.9,
        ease: 'none',
        onUpdate: () => { if (url) url.textContent = text.slice(0, Math.round(state.n)) },
      })
    }

    const ctx = gsap.context(() => {
      gsap.set(q('[data-wire]'), { strokeDashoffset: 1, opacity: 1 })
      gsap.set(q('[data-fill]'), { opacity: 0, scale: 0.96, transformOrigin: '50% 50%' })
      gsap.set(q('[data-float]'), { autoAlpha: 0, y: 24 })
      gsap.set(q('[data-cursor]'), { autoAlpha: 0, x: 760, y: 560 })
      if (url) url.textContent = ''
      setStage(0)()

      const tl = gsap.timeline({ delay: 0.3, scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      tl.add(setStage(0))
        .add(typeUrl('yourbusiness.com'), 0)
        .to(q('[data-wire]'), { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.05 }, 0.1)
        .add(setStage(1), 1.7)
        .to(q('[data-fill]:not([data-kind="card"])'), { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out', stagger: 0.035 }, 1.7)
        .to(q('[data-wire]'), { opacity: 0, duration: 0.6 }, 2.1)
        .to(q('[data-float="type"]'), { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 2.0)
        .add(setStage(2), 2.9)
        .to(q('[data-cursor]'), { autoAlpha: 1, duration: 0.2 }, 2.9)
        .to(q('[data-cursor]'), { x: 150, y: 338, duration: 0.9, ease: 'power3.inOut' }, 2.9)
        .to(q('[data-fill][data-kind="accent"]'), { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, 3.8)
        .to(q('[data-fill][data-kind="card"]'), { opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out', stagger: 0.1 }, 3.9)
        .to(q('[data-float="phone"]'), { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 4.0)
        .to(q('[data-cursor]'), { x: 900, y: 600, autoAlpha: 0, duration: 0.8, ease: 'power2.in' }, 4.3)
        .add(setStage(3), 4.6)
    }, root)

    // Pointer tilt and a scroll-driven settle, on separate layers so they compose.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const rx = tilt.current ? gsap.quickTo(tilt.current, 'rotationX', { duration: 0.9, ease: 'power3' }) : null
    const ry = tilt.current ? gsap.quickTo(tilt.current, 'rotationY', { duration: 0.9, ease: 'power3' }) : null
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      rx?.(ny * -5)
      ry?.(nx * 7)
    }
    if (fine) window.addEventListener('pointermove', onMove)

    const settle = scene.current
      ? gsap.fromTo(
          scene.current,
          { rotationX: 16, scale: 0.94, y: 0 },
          {
            rotationX: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: scene.current, start: 'top 85%', end: 'top 15%', scrub: 0.6 },
          },
        )
      : null

    return () => {
      ctx.revert()
      settle?.scrollTrigger?.kill()
      settle?.kill()
      if (fine) window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="hw-scene" ref={scene}>
      <div className="hw-tilt" ref={tilt}>
        <div className="hw" ref={win} data-stage="3" role="img" aria-label="A website being traced, designed, built and launched inside a browser window">
          <div className="hw-bar">
            <span className="hw-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="hw-url">
              <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 5V3.8a2.5 2.5 0 0 1 5 0V5M2.5 5h7v5h-7z" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
              <span data-url>yourbusiness.com</span>
            </span>
            <span className="hw-status"><span className="hw-status-dot" /><span data-status>Live</span></span>
          </div>

          <div className="hw-canvas">
            <svg viewBox="0 0 1000 600" className="hw-svg" aria-hidden="true">
              <defs>
                <linearGradient id="hw-img" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#c9c4ff" />
                  <stop offset="0.55" stopColor="#b9dcff" />
                  <stop offset="1" stopColor="#d4f3e6" />
                </linearGradient>
                <radialGradient id="hw-orb" cx="0.7" cy="0.35" r="0.5">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {blocks.map((b, i) => (
                <g key={i}>
                  <rect
                    data-fill
                    data-kind={b.kind}
                    className={`hw-fill hw-${b.kind}`}
                    x={b.x} y={b.y} width={b.w} height={b.h} rx={b.r ?? 8}
                    fill={b.kind === 'image' ? 'url(#hw-img)' : undefined}
                  />
                  {b.kind === 'image' && (
                    <circle data-fill data-kind="image" className="hw-orb" cx={b.x + b.w * 0.68} cy={b.y + b.h * 0.42} r={b.h * 0.42} fill="url(#hw-orb)" />
                  )}
                  {b.kind === 'card' && (
                    <g data-fill data-kind="card" className="hw-card-inner">
                      <rect x={b.x + 20} y={b.y + 20} width={36} height={36} rx={10} className="hw-chip" />
                      <rect x={b.x + 20} y={b.y + 76} width={b.w * 0.6} height={12} rx={6} className="hw-line-dark" />
                      <rect x={b.x + 20} y={b.y + 100} width={b.w * 0.8} height={9} rx={4.5} className="hw-line" />
                      <rect x={b.x + 20} y={b.y + 117} width={b.w * 0.5} height={9} rx={4.5} className="hw-line" />
                    </g>
                  )}
                  <rect
                    data-wire
                    className="hw-wire"
                    pathLength={1}
                    x={b.x} y={b.y} width={b.w} height={b.h} rx={b.r ?? 8}
                  />
                </g>
              ))}

              <g data-cursor className="hw-cursor" transform="translate(150 338)">
                <path d="M0 0 L0 22 L6 16 L10 26 L14 24 L10 14 L18 14 Z" />
              </g>
            </svg>
          </div>
        </div>

        <div className="hw-float hw-float-type" data-float="type" aria-hidden="true">
          <span className="hw-float-aa">Aa</span>
          <span className="hw-float-meta">
            <span>Type set</span>
            <span className="hw-swatches"><i /><i /><i /><i /></span>
          </span>
        </div>

        <div className="hw-float hw-float-phone" data-float="phone" aria-hidden="true">
          <span className="hw-phone">
            <i className="hw-phone-a" /><i className="hw-phone-b" /><i className="hw-phone-c" /><i className="hw-phone-d" />
          </span>
          <span className="hw-float-meta"><span>Mobile ready</span></span>
        </div>
      </div>
    </div>
  )
}
