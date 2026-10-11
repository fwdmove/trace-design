'use client'

import { useState } from 'react'

export interface AccordionItem {
  title: string
  desc: string
  includes: string[]
}

// Services as an accordion: one open at a time, the panel eases open on
// a grid-row transition so no height is measured.
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className="acc">
      {items.map((s, i) => {
        const isOpen = open === i
        return (
          <li key={s.title} className={`acc-item ${isOpen ? 'is-open' : ''}`} data-fade>
            <h3>
              <button
                type="button"
                className="acc-head"
                aria-expanded={isOpen}
                aria-controls={`acc-panel-${i}`}
                id={`acc-head-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="mono acc-num">0{i + 1}</span>
                <span className="acc-title">{s.title}</span>
                <span className="acc-icon" aria-hidden="true"><i /><i /></span>
              </button>
            </h3>
            <div className="acc-panel" id={`acc-panel-${i}`} role="region" aria-labelledby={`acc-head-${i}`} inert={!isOpen}>
              <div className="acc-inner">
                <div className="acc-content">
                  <p>{s.desc}</p>
                  <ul className="chips">
                    {s.includes.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
