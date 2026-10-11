'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
 * Entrances, opted into with data attributes:
 *   data-lines      headline lines rise out of a mask ("load" = on arrival)
 *   data-reveal     fade and lift as it scrolls in ("load" = on arrival)
 */
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let ctx: gsap.Context | undefined
    let cancelled = false

    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((el) => {
          const onLoad = el.dataset.lines === 'load'
          gsap.set(el, { visibility: 'visible' })
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.5,
                ease: 'expo.out',
                stagger: 0.1,
                delay: onLoad ? 0.15 : 0,
                scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 85%', once: true },
              }),
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          const onLoad = el.dataset.reveal === 'load'
          gsap.set(el, { visibility: 'visible' })
          gsap.from(el, {
            y: 32,
            autoAlpha: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: onLoad ? Number(el.dataset.delay ?? 0.7) : 0,
            scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 90%', once: true },
          })
        })
      })
      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return null
}
