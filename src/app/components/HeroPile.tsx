'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { projects } from '@/content/work'
import { prefersReducedMotion, whenReady } from '@/lib/motion'

gsap.registerPlugin(Draggable, InertiaPlugin)

type Item =
  | { kind: 'site'; site: (typeof projects)[number] }
  | { kind: 'tag'; text: string; tone: string }
  | { kind: 'badge'; text: string }

// A loose mix: small prints of the work among the things the studio does.
const items: Item[] = [
  { kind: 'site', site: projects[0] },
  { kind: 'tag', text: 'Web design', tone: 'peach' },
  { kind: 'site', site: projects[1] },
  { kind: 'badge', text: 'Est. 2019' },
  { kind: 'site', site: projects[2] },
  { kind: 'tag', text: 'Development', tone: 'sage' },
  { kind: 'site', site: projects[3] },
  { kind: 'tag', text: 'Landing pages', tone: 'lilac' },
]

// Resting tilt for each piece (mirrored in CSS); positions live in CSS.
const tilt = [-6, -8, 5, 10, 4, 6, -4, -3]

/*
 * A loose pile beside the headline: small prints of the work mixed with
 * labels. On wide screens each piece floats, leans with the pointer, and can
 * be picked up and thrown; a plain click on a print opens the live site.
 * Small screens get a simple swipeable row of prints.
 */
export default function HeroPile() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    let cancelled = false

    whenReady().then(() => {
      if (cancelled) return
      mm.add('(min-width: 900px) and (pointer: fine)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.pile-card', el)
        let top = 10

        // Deal the prints onto the table.
        gsap.from(cards, {
          y: () => window.innerHeight * 0.6,
          rotation: (i) => tilt[i] * 3,
          scale: 0.8,
          autoAlpha: 0,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.09,
          delay: 0.55,
        })

        const floats = cards.map((card, i) =>
          gsap.to(card.querySelector('.pile-float'), {
            y: i % 2 ? 10 : -10,
            rotation: i % 2 ? -1.2 : 1.2,
            duration: 3.2 + i * 0.45,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          }),
        )

        // Depth: each print leans a different amount with the pointer.
        const movers = cards.map((card, i) => ({
          x: gsap.quickTo(card.querySelector('.pile-lean'), 'x', { duration: 1.2, ease: 'power3' }),
          y: gsap.quickTo(card.querySelector('.pile-lean'), 'y', { duration: 1.2, ease: 'power3' }),
          depth: 14 + i * 7,
        }))
        const lean = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          movers.forEach((m) => { m.x(nx * m.depth); m.y(ny * m.depth) })
        }
        window.addEventListener('pointermove', lean)

        const drags = cards.map((card, i) => {
          let moved = false
          const link = card.querySelector('a')
          const block = (e: Event) => { if (moved) { e.preventDefault(); moved = false } }
          link?.addEventListener('click', block)
          const [d] = Draggable.create(card, {
            type: 'x,y',
            bounds: el,
            inertia: true,
            dragClickables: true,
            edgeResistance: 0.8,
            onPress() {
              card.style.zIndex = String(++top)
              floats[i].pause()
              gsap.to(card, { scale: 1.06, rotation: tilt[i] * 0.3, duration: 0.4, ease: 'power3.out' })
              card.classList.add('is-held')
            },
            onDrag() {
              moved = true
              gsap.to(card, { rotation: gsap.utils.clamp(-14, 14, this.deltaX * 0.9), duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
            },
            onRelease() {
              gsap.to(card, { scale: 1, rotation: tilt[i], duration: 1.1, ease: 'elastic.out(1, 0.45)' })
              card.classList.remove('is-held')
              floats[i].resume()
            },
          })
          return () => { d.kill(); link?.removeEventListener('click', block) }
        })

        return () => {
          window.removeEventListener('pointermove', lean)
          drags.forEach((kill) => kill())
        }
      })
    })

    return () => { cancelled = true; mm.revert() }
  }, [])

  return (
    <div className="pile" id="work" ref={root}>
      {items.map((it, i) => (
        <div className={`pile-card pile-card-${i + 1} pile-is-${it.kind}`} key={i}>
          <div className="pile-lean">
            <div className="pile-float">
              {it.kind === 'site' ? (
                <a href={it.site.url} target="_blank" rel="noreferrer" className="pile-print" draggable={false}>
                  <span className="pile-bar" aria-hidden="true"><i /><i /><i /></span>
                  <span className="pile-shot" style={{ background: it.site.tone }}>
                    <Image src={it.site.image} alt={it.site.alt} fill sizes="(max-width: 900px) 50vw, 16vw" priority draggable={false} />
                  </span>
                  <span className="pile-label">
                    <span className="pile-name">{it.site.name}</span>
                    <span className="pile-type">{it.site.type} ↗</span>
                  </span>
                </a>
              ) : it.kind === 'tag' ? (
                <span className={`pile-tag pile-tag-${it.tone}`} aria-hidden="true">{it.text}</span>
              ) : (
                <span className="pile-badge" aria-hidden="true"><em>{it.text}</em></span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
