'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
 * The site's motion system. Markup opts in with data attributes; this binds
 * the presets on every route once fonts have loaded.
 *
 *   data-split      headline lines rise out of a mask ("hero" = on load)
 *   data-fade       fade + lift on enter ("stagger" = children in turn)
 *   data-inview     gets .is-in when it scrolls into view (CSS demos key off it)
 *   data-progress   fills --p from 0 to 1 as it scrolls through the viewport
 *   data-count      number counts up on enter
 *   data-draw       SVG strokes draw in as the element scrolls into view
 *   data-magnetic   element leans toward the pointer
 */
export default function PageMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const html = document.documentElement
    if (prefersReducedMotion()) {
      document.querySelectorAll('[data-inview]').forEach((el) => el.classList.add('is-in'))
      return
    }

    let ctx: gsap.Context | undefined
    let cancelled = false
    const cleanups: (() => void)[] = []

    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => setup(cleanups))
      html.classList.add('motion-ready')
      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      cleanups.forEach((fn) => fn())
      ctx?.revert()
    }
  }, [pathname])

  return null
}

const show = (el: Element) => gsap.set(el, { visibility: 'visible' })

function setup(cleanups: (() => void)[]) {
  // Headlines: lines slide up out of a soft mask.
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const onLoad = el.dataset.split === 'hero'
    show(el)
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: onLoad ? 1.3 : 1.1,
          ease: 'expo.out',
          stagger: 0.08,
          delay: onLoad ? 0.15 : 0,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
        }),
    })
  })

  // Generic entrances.
  gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
    show(el)
    const targets = el.dataset.fade === 'stagger' ? el.children : el
    gsap.from(targets, {
      y: 28,
      autoAlpha: 0,
      filter: 'blur(6px)',
      duration: 1,
      ease: 'power3.out',
      stagger: 0.07,
      delay: Number(el.dataset.delay ?? 0),
      clearProps: 'filter',
      scrollTrigger: el.closest('[data-hero]') ? undefined : { trigger: el, start: 'top 90%', once: true },
    })
  })

  // In-view flags for CSS-driven demos.
  gsap.utils.toArray<HTMLElement>('[data-inview]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => el.classList.add('is-in'),
    })
  })

  // Scroll progress exposed as a CSS variable.
  gsap.utils.toArray<HTMLElement>('[data-progress]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      end: 'bottom 55%',
      scrub: true,
      onUpdate: (self) => el.style.setProperty('--p', self.progress.toFixed(3)),
    })
  })

  // Counters.
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count)
    const suffix = el.dataset.suffix ?? ''
    const state = { v: 0 }
    gsap.to(state, {
      v: target,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = Math.round(state.v) + suffix },
    })
  })

  // Strokes trace themselves in, then fill. Elements with pathLength use a
  // normalised dash of 1; others (like text) give their dash length in data-len.
  gsap.utils.toArray<SVGElement>('[data-draw]').forEach((el) => {
    const strokes = gsap.utils.toArray<SVGElement>(el.querySelectorAll('[pathLength], [data-len]'))
    const len = (t: SVGElement) => Number(t.dataset.len || 1)
    strokes.forEach((t) => gsap.set(t, { strokeDasharray: len(t), strokeDashoffset: len(t), fillOpacity: 0 }))
    gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 98%', end: 'max', scrub: 0.6 },
    })
      .to(strokes, { strokeDashoffset: 0, ease: 'none', stagger: 0.08, duration: 1 })
      .to(strokes, { fillOpacity: 1, ease: 'none', duration: 0.4 })
  })

  // Magnetic buttons (fine pointers only).
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
      const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
      const strength = Number(el.dataset.magnetic || 0.25)
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - r.left - r.width / 2) * strength)
        y((e.clientY - r.top - r.height / 2) * strength)
      }
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      })
    })
  }
}
