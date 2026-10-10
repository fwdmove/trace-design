'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { prefersReducedMotion, whenReady } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
 * The site's motion system. Markup opts in with data attributes; this binds
 * the presets on every route, after fonts load and the preloader finishes.
 *
 *   data-split          headline words float up out of a soft blur ("hero" = on load)
 *   data-fade           fade, lift and un-blur on enter ("stagger" = children in turn)
 *   data-scrub-words    words brighten as the paragraph scrolls through
 *   data-clip           image frame opens from a rounded pebble as it scrolls in
 *   data-parallax       inner image drifts against the scroll
 *   data-morph          shape slowly changes its outline, like something alive
 *   data-float          gentle bob, each element on its own rhythm
 *   data-draw           SVG path draws itself as the section scrolls through
 *   data-count          number counts up on enter
 *   data-rise           characters rise out of a blur as the element scrolls in
 *   data-magnetic       element leans toward the pointer
 */
export default function PageMotion() {
  const pathname = usePathname()

  useEffect(() => {
    if (prefersReducedMotion()) return

    let ctx: gsap.Context | undefined
    let cancelled = false
    const cleanups: (() => void)[] = []

    Promise.all([document.fonts.ready, whenReady()]).then(() => {
      if (cancelled) return
      ctx = gsap.context(() => setup(cleanups))
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
  // Headlines: words drift up out of a soft blur.
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const onLoad = el.dataset.split === 'hero'
    show(el)
    SplitText.create(el, {
      type: 'words',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.words, {
          y: 40,
          opacity: 0,
          filter: 'blur(12px)',
          duration: onLoad ? 1.8 : 1.4,
          ease: 'power3.out',
          stagger: onLoad ? 0.08 : 0.05,
          delay: onLoad ? 0.1 : 0,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
        }),
    })
  })

  // Generic entrances.
  gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
    show(el)
    const targets = el.dataset.fade === 'stagger' ? el.children : el
    gsap.from(targets, {
      y: 36,
      autoAlpha: 0,
      filter: 'blur(8px)',
      duration: 1.4,
      ease: 'power3.out',
      stagger: 0.1,
      delay: Number(el.dataset.delay ?? 0),
      clearProps: 'filter',
      scrollTrigger: el.closest('[data-hero]') ? undefined : { trigger: el, start: 'top 90%', once: true },
    })
  })

  // Statement paragraphs light up word by word.
  gsap.utils.toArray<HTMLElement>('[data-scrub-words]').forEach((el) => {
    show(el)
    const split = SplitText.create(el, { type: 'words' })
    gsap.fromTo(
      split.words,
      { opacity: 0.18 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: 1 },
      },
    )
  })

  // Image frames open from a rounded pebble.
  gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(10% 12% 10% 12% round 50%)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0%)',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 100%', end: 'top 35%', scrub: 1.2 },
      },
    )
  })

  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 10)
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  })

  // Living outlines: border-radius wanders between organic shapes.
  const r = () => gsap.utils.random(32, 68, 1)
  const outline = () => `${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`
  gsap.utils.toArray<HTMLElement>('[data-morph]').forEach((el) => {
    const step = () => gsap.to(el, { borderRadius: outline(), duration: gsap.utils.random(5, 8), ease: 'sine.inOut', onComplete: step })
    gsap.set(el, { borderRadius: outline() })
    step()
  })

  // Gentle float, each on its own rhythm.
  gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el, i) => {
    const amount = Number(el.dataset.float || 10)
    gsap.fromTo(el, { y: -amount }, {
      y: amount,
      duration: 3.2 + (i % 3) * 0.7,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: -i * 0.9,
    })
  })

  // Paths that draw themselves through a section.
  gsap.utils.toArray<SVGPathElement>('[data-draw]').forEach((path) => {
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: path.closest('section') ?? path,
        start: 'top 70%',
        end: 'bottom 70%',
        scrub: 1.2,
      },
    })
  })

  // Hero headline drifts up and softens as you leave the first screen.
  gsap.utils.toArray<HTMLElement>('[data-hero-drift]').forEach((el) => {
    gsap.to(el, {
      yPercent: -14,
      opacity: 0.2,
      filter: 'blur(6px)',
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top+=80', end: 'bottom top', scrub: true },
    })
  })

  // Counters.
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count)
    const suffix = el.dataset.suffix ?? ''
    const state = { v: 0 }
    gsap.to(state, {
      v: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = Math.round(state.v) + suffix },
    })
  })

  // Oversized wordmark rises letter by letter out of a blur.
  gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
    show(el)
    const split = SplitText.create(el, { type: 'chars' })
    gsap.from(split.chars, {
      yPercent: 60,
      opacity: 0,
      filter: 'blur(20px)',
      ease: 'none',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 1 },
    })
  })

  // Magnetic buttons (fine pointers only).
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' })
      const y = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' })
      const strength = Number(el.dataset.magnetic || 0.3)
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - r.left - r.width / 2) * strength)
        y((e.clientY - r.top - r.height / 2) * strength)
      }
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 1.4, ease: 'elastic.out(1, 0.4)' })
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
