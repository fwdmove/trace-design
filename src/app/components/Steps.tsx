'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, whenReady } from '@/lib/motion'

const steps = [
  { word: 'Discover', line: 'We learn what you do and what the site has to do.' },
  { word: 'design', line: 'Every page designed in full, phones included.' },
  { word: 'build', line: 'Hand-coded, fast, and easy to update.' },
  { word: 'launch.', line: 'Hosting, domains and handover, all handled.' },
]

/*
 * One sentence that walks through the process: the screen holds while you
 * scroll, and each step lights up in turn with its line underneath.
 */
export default function Steps() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (prefersReducedMotion()) { setStill(true); return }
    let st: ScrollTrigger | undefined
    let cancelled = false
    whenReady().then(() => {
      if (cancelled) return
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
      })
    })
    return () => { cancelled = true; st?.kill() }
  }, [])

  return (
    <section className={`steps${still ? ' is-still' : ''}`} id="process" ref={root} aria-labelledby="steps-title">
      <div className="steps-stage wrap">
        <p className="label" id="steps-title">(How it works)</p>
        <p className="steps-line">
          {steps.map((s, i) => (
            <span key={s.word} className={`steps-word${i === active || still ? ' is-on' : ''}${i < active ? ' is-done' : ''}`}>
              {s.word}
              {i < steps.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
        <div className="steps-foot">
          <ol className="steps-dots" aria-hidden="true">
            {steps.map((s, i) => <li key={s.word} className={i <= active ? 'is-on' : ''} />)}
          </ol>
          <div className="steps-captions">
            {steps.map((s, i) => (
              <p key={s.word} className={`steps-caption${i === active ? ' is-on' : ''}`}>
                <span className="mono">0{i + 1}</span> {s.line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
