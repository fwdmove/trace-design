'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { Project } from '@/content/work'
import RollText from './RollText'

// A short list of project names. On fine pointers the hovered project's
// screenshot follows the cursor; on touch screens each row shows a small thumbnail.
export default function WorkList({ projects }: { projects: Project[] }) {
  const list = useRef<HTMLUListElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const el = preview.current
    const area = list.current
    if (!el || !area || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
    const move = (e: PointerEvent) => {
      // Stay clear of the project names on the left.
      x(Math.max(e.clientX + 48, window.innerWidth * 0.5))
      y(e.clientY - el.offsetHeight / 2)
    }
    area.addEventListener('pointermove', move)
    return () => area.removeEventListener('pointermove', move)
  }, [])

  return (
    <div className="work-list-wrap">
      <ul className="work-list" ref={list} onPointerLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className={`work-row${active === i ? ' is-active' : ''}${active !== null && active !== i ? ' is-dim' : ''}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className="work-thumb" aria-hidden="true">
                <Image src={p.image} alt="" fill sizes="120px" />
              </span>
              <span className="mono work-index">{p.index}</span>
              <span className="work-name">{p.name}</span>
              <span className="mono work-type">{p.type}</span>
              <span className="work-visit">
                <RollText>Visit</RollText>
                <span aria-hidden="true">↗</span>
              </span>
              <span className="sr-only"> (opens the live site in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>

      <div className={`work-preview${active !== null ? ' is-on' : ''}`} ref={preview} aria-hidden="true">
        {projects.map((p, i) => (
          <div className={`work-preview-shot${active === i ? ' is-on' : ''}`} key={p.slug} style={{ background: p.tone }}>
            <Image src={p.image} alt="" fill sizes="440px" />
          </div>
        ))}
      </div>
    </div>
  )
}
