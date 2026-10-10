'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Draggable } from 'gsap/Draggable'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { prefersReducedMotion, whenReady } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, ScrambleTextPlugin)

/*
 * The site's motion system. Markup opts in with data attributes; this binds
 * the presets after fonts load and the preloader finishes. The motion is
 * deliberately blunt: stepped eases, hard cuts, things you can grab.
 *
 *   data-fit            text sized to fill its container's width (always on)
 *   data-split          characters blink in at random ("hero" = drop in on load, scatter on scroll)
 *   data-fade           blocks shunt in from the left in hard steps
 *   data-mark-words     words get blacked out one by one as the paragraph scrolls through
 *   data-stamp          cards slam down like a rubber stamp
 *   data-tape           endless tape that speeds up and skews with scroll velocity
 *   data-drag           window you can drag around [data-drag-stage]
 *   data-scramble       text scrambles when its link is hovered
 *   data-count          number counts up on enter
 *   data-rise           characters rise as the element scrolls into view
 */
export default function PageMotion() {
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false
    let ctx: gsap.Context | undefined
    const cleanups: (() => void)[] = []

    document.fonts.ready.then(() => {
      if (cancelled) return
      fitAll()
      const onResize = () => fitAll()
      window.addEventListener('resize', onResize)
      cleanups.push(() => window.removeEventListener('resize', onResize))
      if (prefersReducedMotion()) return
      whenReady().then(() => {
        if (cancelled) return
        ctx = gsap.context(() => setup(cleanups))
        ScrollTrigger.refresh()
      })
    })

    return () => {
      cancelled = true
      cleanups.forEach((fn) => fn())
      ctx?.revert()
    }
  }, [pathname])

  return null
}

// Scale each [data-fit] so its text spans the parent's content box exactly.
function fitAll() {
  document.querySelectorAll<HTMLElement>('[data-fit]').forEach((el) => {
    const parent = el.parentElement
    if (!parent) return
    const cs = getComputedStyle(parent)
    const room = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
    el.style.fontSize = '100px'
    const w = el.scrollWidth
    if (w) el.style.fontSize = `${(100 * room) / w}px`
  })
}

const show = (el: Element) => gsap.set(el, { visibility: 'visible' })

function setup(cleanups: (() => void)[]) {
  // Headlines.
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    show(el)
    if (el.dataset.split === 'hero') {
      SplitText.create(el, {
        type: 'chars',
        mask: 'chars',
        onSplit: (self) => {
          const tl = gsap.timeline()
          tl.from(self.chars, { yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: 0.07 })
          // Scroll away and the letters fall apart at different rates.
          self.chars.forEach((c, i) => {
            gsap.to(c, {
              y: () => (i % 2 ? 1 : 0.55) * window.innerHeight * 0.18,
              rotate: [-6, 4, -3, 7, -5][i % 5],
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top top+=60', end: 'bottom top', scrub: true },
            })
          })
          return tl
        },
      })
      return
    }
    SplitText.create(el, {
      type: 'chars,words',
      onSplit: (self) =>
        gsap.from(self.chars, {
          autoAlpha: 0,
          duration: 0.01,
          stagger: { each: 0.025, from: 'random' },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
    })
  })

  // Blocks shunt in.
  gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
    show(el)
    const targets = el.dataset.fade === 'stagger' ? el.children : el
    gsap.from(targets, {
      x: -40,
      autoAlpha: 0,
      duration: 0.45,
      ease: 'steps(4)',
      stagger: 0.08,
      delay: Number(el.dataset.delay ?? 0),
      scrollTrigger: el.closest('[data-hero]') ? undefined : { trigger: el, start: 'top 90%', once: true },
    })
  })

  // Statement words get blacked out in order as you read.
  gsap.utils.toArray<HTMLElement>('[data-mark-words]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words' })
    const words = split.words as HTMLElement[]
    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      end: 'bottom 45%',
      scrub: true,
      onUpdate: (self) => {
        const n = Math.round(self.progress * words.length)
        words.forEach((w, i) => w.classList.toggle('is-on', i < n))
      },
    })
  })

  // Stamps.
  ScrollTrigger.batch('[data-stamp]', {
    start: 'top 85%',
    once: true,
    onEnter: (batch) =>
      gsap.from(batch, {
        scale: 1.5,
        rotate: () => gsap.utils.random(-9, 9),
        autoAlpha: 0,
        duration: 0.32,
        ease: 'power4.in',
        stagger: 0.14,
      }),
  })
  gsap.utils.toArray<HTMLElement>('[data-stamp]').forEach(show)

  // Tapes.
  gsap.utils.toArray<HTMLElement>('[data-tape]').forEach((el) => {
    const track = el.querySelector<HTMLElement>('[data-tape-track]')
    if (!track) return
    const dir = el.dataset.tape === 'reverse' ? -1 : 1
    const loop = gsap.fromTo(track, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 40, ease: 'none', repeat: -1 })
    const skew = gsap.quickTo(track, 'skewX', { duration: 0.4, ease: 'power3' })
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity()
        const boost = gsap.utils.clamp(1, 8, 1 + Math.abs(v) / 250)
        gsap.to(loop, { timeScale: boost * (self.direction < 0 ? -1 : 1), duration: 0.2, overwrite: true })
        gsap.to(loop, { timeScale: self.direction < 0 ? -1 : 1, duration: 1, delay: 0.2 })
        skew(gsap.utils.clamp(-12, 12, v / -200))
      },
      onLeave: () => skew(0),
    })
  })

  // Draggable windows (wide screens; on small screens they sit in a row).
  const mm = gsap.matchMedia()
  mm.add('(min-width: 900px)', () => {
    const stage = document.querySelector('[data-drag-stage]')
    const wins = gsap.utils.toArray<HTMLElement>('[data-drag]')
    gsap.from(wins, { scale: 0, duration: 0.3, ease: 'steps(3)', stagger: 0.12, delay: 0.9 })
    const ds = wins.map((w) =>
      Draggable.create(w, {
        bounds: stage ?? undefined,
        dragClickables: true,
        minimumMovement: 4,
        edgeResistance: 0.85,
        onPress() { w.classList.add('is-grabbed') },
        onRelease() { w.classList.remove('is-grabbed') },
      })[0],
    )
    return () => ds.forEach((d) => d.kill())
  })
  cleanups.push(() => mm.revert())

  // Scramble on hover.
  gsap.utils.toArray<HTMLElement>('[data-scramble]').forEach((el) => {
    const host = el.closest('a, button') ?? el
    const text = el.textContent ?? ''
    const run = () =>
      gsap.to(el, { duration: 0.5, scrambleText: { text, chars: '█▓▒░/\\#*+=', speed: 0.6 }, overwrite: true })
    host.addEventListener('pointerenter', run)
    cleanups.push(() => host.removeEventListener('pointerenter', run))
  })

  // Counters.
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count)
    const suffix = el.dataset.suffix ?? ''
    const state = { v: 0 }
    gsap.to(state, {
      v: target,
      duration: 1.2,
      ease: 'steps(12)',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = Math.round(state.v) + suffix },
    })
  })

  // Oversized footer wordmark rises letter by letter.
  gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
    show(el)
    const split = SplitText.create(el, { type: 'chars' })
    gsap.from(split.chars, {
      yPercent: 100,
      ease: 'none',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: true },
    })
  })
}
