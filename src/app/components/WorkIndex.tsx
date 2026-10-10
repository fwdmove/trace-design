'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { Project } from '@/content/work'

// Index-style project list. On fine pointers a preview of the hovered
// project follows the cursor; on touch, each row shows its own thumbnail.
export default function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null)
  const preview = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = preview.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
    const move = (e: PointerEvent) => { x(e.clientX); y(e.clientY) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div className="index" onPointerLeave={() => setActive(null)}>
      <div className="index-head label" aria-hidden="true">
        <span>No.</span><span>Client</span><span>Scope</span><span>Year</span><span />
      </div>
      <ul>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className={`index-row ${active === i ? 'is-active' : ''}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className="index-num">{p.index}</span>
              <span className="index-name">{p.name}</span>
              <span className="index-type">{p.type}</span>
              <span className="index-year">{p.year}</span>
              <span className="index-arrow" aria-hidden="true">↗</span>
              <span className="index-thumb">
                <Image src={p.image} alt={p.alt} fill sizes="90vw" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div ref={preview} className={`index-preview ${active !== null ? 'is-on' : ''}`} aria-hidden="true">
        {projects.map((p, i) => (
          <div key={p.slug} className={`index-preview-img ${active === i ? 'is-on' : ''}`}>
            <Image src={p.image} alt="" fill sizes="480px" />
          </div>
        ))}
      </div>
    </div>
  )
}
