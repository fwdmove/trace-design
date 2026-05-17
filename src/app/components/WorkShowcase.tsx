'use client'

import { useState } from 'react'

interface Project {
  id: string
  name: string
  type: string
  year: string
  color: string
  image: string
  alt: string
  url: string
  description?: string
}

interface Props {
  projects: Project[]
}

export default function WorkShowcase({ projects }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className="work-showcase reveal reveal-scale">
      {/* Typographic stage panel */}
      <div className="work-stage">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`work-stage-panel ${i === active ? 'is-active' : ''}`}
            style={{ background: p.color }}
          >
            <a href={p.url} target="_blank" rel="noreferrer" className="work-stage-link">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.alt} className="work-stage-image" />
            </a>
          </div>
        ))}
        <div className="work-stage-meta">
          <span className="work-stage-counter">
            <span className="work-stage-counter-current">{projects[active].id}</span>
            <span className="work-stage-counter-total">/ {String(projects.length).padStart(2, '0')}</span>
          </span>
          {projects[active].description && (
            <span className="work-stage-result">{projects[active].description}</span>
          )}
        </div>
      </div>

      {/* Project selector */}
      <div className="work-list" onMouseLeave={() => setActive(0)}>
        {projects.map((p, i) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className={`work-row ${i === active ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className="work-row-meta">
              <span className="work-row-num">{p.id}</span>
              <span className="work-row-type">{p.type} · {p.year}</span>
            </span>
            <h3 className="work-row-name">{p.name}</h3>
            {p.description && <span className="work-row-desc">{p.description}</span>}
            <span className="work-row-arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </div>
  )
}
