'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { prefersReducedMotion, whenReady } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin)

/*
 * A small pile of labels that drops into a panel when it scrolls in. On fine
 * pointers each one can be picked up and tossed around inside the panel.
 */
export default function Stickers({ items }: { items: string[] }) {
  const root = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    let cancelled = false
    let ctx: gsap.Context | undefined
    const kills: (() => void)[] = []

    whenReady().then(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        const tags = gsap.utils.toArray<HTMLElement>('li', el)
        const rest = tags.map((_, i) => ((i * 37) % 17) - 8)
        gsap.set(tags, { rotation: (i) => rest[i] })
        gsap.from(tags, {
          y: () => -el.getBoundingClientRect().top * 0.35 - 240,
          rotation: (i) => rest[i] * -4,
          autoAlpha: 0,
          duration: 1.2,
          ease: 'bounce.out',
          stagger: { each: 0.08, from: 'random' },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })

        if (!window.matchMedia('(pointer: fine)').matches) return
        const panel = el.closest<HTMLElement>('.panel') ?? el
        tags.forEach((tag, i) => {
          const [d] = Draggable.create(tag, {
            type: 'x,y',
            bounds: panel,
            inertia: true,
            edgeResistance: 0.7,
            onPress() { gsap.to(tag, { scale: 1.1, duration: 0.3, ease: 'power3.out' }) },
            onDrag() {
              gsap.to(tag, { rotation: gsap.utils.clamp(-25, 25, this.deltaX * 2), duration: 0.4, overwrite: 'auto' })
            },
            onRelease() {
              gsap.to(tag, { scale: 1, rotation: rest[i], duration: 1, ease: 'elastic.out(1, 0.4)' })
            },
          })
          kills.push(() => d.kill())
        })
      }, el)
    })

    return () => { cancelled = true; kills.forEach((k) => k()); ctx?.revert() }
  }, [])

  return (
    <ul className="stickers" ref={root}>
      {items.map((t, i) => (
        <li key={t} className={`sticker sticker-${i % 4}`}>{t}</li>
      ))}
    </ul>
  )
}
