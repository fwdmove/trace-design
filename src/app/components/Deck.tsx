'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '@/content/work'

const INTERVAL = 4200
const LEAVE_MS = 650
// Each card behind the front one sits a touch off square, like a real stack.
const TILT = [0, -1.4, 1.2, -0.8]

// A stack of live sites, fanned like cards on a desk. The front card links
// out; the stack deals itself forward on a timer, tilts toward the pointer,
// and pauses while hovered or focused.
export default function Deck() {
  const [order, setOrder] = useState(() => projects.map((_, i) => i))
  const [leaving, setLeaving] = useState<number | null>(null)
  const [returning, setReturning] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const busy = useRef(false)

  const next = useCallback(() => {
    if (busy.current) return
    busy.current = true
    setLeaving(order[0])
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]])
      setReturning(order[0])
      setLeaving(null)
      window.setTimeout(() => setReturning(null), 700)
      busy.current = false
    }, LEAVE_MS)
  }, [order])

  const goTo = useCallback((i: number) => {
    if (busy.current) return
    setOrder((o) => {
      const at = o.indexOf(i)
      return [...o.slice(at), ...o.slice(0, at)]
    })
  }, [])

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(next, INTERVAL)
    return () => window.clearInterval(id)
  }, [paused, next])

  // Gentle 3D tilt toward the pointer (fine pointers only).
  useEffect(() => {
    const el = root.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const scope = el.closest('[data-hero]') ?? el
    const move = (e: Event) => {
      const p = e as PointerEvent
      const r = el.getBoundingClientRect()
      const x = (p.clientX - (r.left + r.width / 2)) / window.innerWidth
      const y = (p.clientY - (r.top + r.height / 2)) / window.innerHeight
      el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`)
    }
    const leave = () => {
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
    }
    scope.addEventListener('pointermove', move)
    scope.addEventListener('pointerleave', leave)
    return () => {
      scope.removeEventListener('pointermove', move)
      scope.removeEventListener('pointerleave', leave)
    }
  }, [])

  const front = projects[order[0]]

  return (
    <div className="deck" ref={root}>
      <div
        className="deck-stage"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {projects.map((p, i) => {
          const depth = order.indexOf(i)
          const isFront = depth === 0
          return (
            <a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className={`deck-card${isFront ? '' : ' is-back'}${leaving === i ? ' is-leaving' : ''}${returning === i ? ' is-returning' : ''}`}
              style={{ '--d': depth, '--rot': `${TILT[depth]}deg`, zIndex: projects.length - depth } as React.CSSProperties}
              tabIndex={isFront ? 0 : -1}
              aria-hidden={!isFront}
              data-cursor="Visit"
            >
              <span className="deck-bar" aria-hidden="true">
                <span className="deck-dots"><i /><i /><i /></span>
                <span className="deck-url">{new URL(p.url).host.replace(/^www\./, '')}</span>
              </span>
              <span className="deck-shot" style={{ background: p.tone }}>
                <Image src={p.image} alt={p.alt} fill sizes="(max-width: 900px) 92vw, 46vw" priority={i === 0} />
              </span>
              <span className="sr-only"> (opens the live site in a new tab)</span>
            </a>
          )
        })}
      </div>

      <div className="deck-caption">
        <div className="deck-meta" aria-live="polite">
          <span className="mono deck-index">{front.index} / {String(projects.length).padStart(2, '0')}</span>
          <span className="deck-name">{front.name}</span>
          <span className="mono deck-type">{front.type}</span>
        </div>
        <div className="deck-nav" role="group" aria-label="Choose a site">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              className={`deck-pip${order[0] === i ? ' is-active' : ''}`}
              aria-label={`Show ${p.name}`}
              aria-pressed={order[0] === i}
              onClick={() => goTo(i)}
            >
              <span />
            </button>
          ))}
          <button type="button" className="deck-next" onClick={next} aria-label="Next site">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
