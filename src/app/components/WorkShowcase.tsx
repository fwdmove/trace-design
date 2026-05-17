'use client'

import { useState } from 'react'

interface Project {
  id: string
  name: string
  type: string
  year: string
  color: string
  description?: string
}

interface Props {
  projects: Project[]
}

export default function WorkShowcase({ projects }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className="work-showcase">
      {/* Typographic stage panel */}
      <div className="work-stage">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`work-stage-panel ${i === active ? 'is-active' : ''}`}
            style={{ background: p.color }}
          >
            <span className="work-stage-ghost">{p.name}</span>
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

      {/* Project list */}
      <div className="work-list" onMouseLeave={() => setActive(0)}>
        {projects.map((p, i) => (
          <a
            key={p.id}
            href="#"
            className={`work-row ${i === active ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className="work-row-meta">
              <span className="work-row-num">{p.id}</span>
              <span className="work-row-type">{p.type} · {p.year}</span>
            </span>
            <h3 className="work-row-name">{p.name}</h3>
            <span className="work-row-arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </div>
  )
}
