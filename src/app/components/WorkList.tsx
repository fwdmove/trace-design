'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { Project } from '@/content/work'

// Projects as a plain index. Hovering a row floats a small preview of the
// site next to the pointer; on touch screens each row carries a thumbnail.
export default function WorkList({ projects }: { projects: Project[] }) {
  const list = useRef<HTMLDivElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const el = list.current
    const card = preview.current
    if (!el || !card || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const x = gsap.quickTo(card, 'x', { duration: 0.7, ease: 'power3' })
    const y = gsap.quickTo(card, 'y', { duration: 0.7, ease: 'power3' })
    const rot = gsap.quickTo(card, 'rotation', { duration: 0.9, ease: 'power3' })
    let lastX = 0
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      x(e.clientX - r.left)
      y(e.clientY - r.top)
      rot(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6))
      lastX = e.clientX
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [])

  return (
    <div className="work-list" ref={list} onPointerLeave={() => setActive(null)}>
      <ul>
      {projects.map((p, i) => (
        <li key={p.slug} className="work-row-wrap" data-fade>
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className={`work-row ${active === i ? 'is-active' : ''}`}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <span className="mono work-index">{p.index}</span>
            <span className="work-name">{p.name}</span>
            <span className="mono work-type">{p.type}</span>
            <span className="mono work-year">{p.year}</span>
            <span className="work-arrow" aria-hidden="true">↗</span>
            <span className="work-thumb" aria-hidden="true">
              <Image src={p.image} alt="" fill sizes="120px" />
            </span>
            <span className="sr-only"> (opens the live site in a new tab)</span>
          </a>
        </li>
      ))}
      </ul>
      <div className={`work-preview ${active !== null ? 'is-on' : ''}`} ref={preview} aria-hidden="true">
        {projects.map((p, i) => (
          <div key={p.slug} className={`work-preview-img ${active === i ? 'is-current' : ''}`}>
            <Image src={p.image} alt="" fill sizes="360px" />
          </div>
        ))}
      </div>
    </div>
  )
}
