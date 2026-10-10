'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { getLenis, prefersReducedMotion, resolvePendingTransition, whenReady } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
 * The site's motion system. Markup opts in with data attributes; this binds
 * the presets on every route, after fonts load and the preloader finishes.
 *
 *   data-split          headline lines rise out of a mask ("hero" = on load)
 *   data-fade           fade + lift on enter ("stagger" = children in turn)
 *   data-scrub-words    words brighten as the paragraph scrolls through
 *   data-clip           image frame opens from an inset as it scrolls in
 *   data-parallax       inner image drifts against the scroll
 *   data-reel           endless strip that speeds up and skews with scroll velocity
 *   data-hscroll        pinned horizontal scroll on wide screens
 *   data-count          number counts up on enter
 *   data-rise           characters rise as the element scrolls into view
 *   data-magnetic       element leans toward the pointer
 */
export default function PageMotion() {
  const pathname = usePathname()

  useEffect(() => {
    resolvePendingTransition()
    getLenis()?.scrollTo(0, { immediate: true, force: true })

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
  // Headlines: lines slide up out of a mask.
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const onLoad = el.dataset.split === 'hero'
    show(el)
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 115,
          rotate: 2,
          duration: onLoad ? 1.4 : 1.1,
          ease: 'expo.out',
          stagger: 0.09,
          delay: onLoad ? 0.05 : 0,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
        }),
    })
  })

  // Generic entrances.
  gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
    show(el)
    const targets = el.dataset.fade === 'stagger' ? el.children : el
    gsap.from(targets, {
      y: 48,
      autoAlpha: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.08,
      delay: Number(el.dataset.delay ?? 0),
      scrollTrigger: el.closest('[data-hero]') ? undefined : { trigger: el, start: 'top 90%', once: true },
    })
  })

  // Statement paragraphs light up word by word.
  gsap.utils.toArray<HTMLElement>('[data-scrub-words]').forEach((el) => {
    show(el)
    const split = SplitText.create(el, { type: 'words' })
    gsap.fromTo(
      split.words,
      { opacity: 0.14 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
      },
    )
  })

  // Image frames open up as they enter.
  gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(14% 10% 14% 10% round 28px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 6px)',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 98%', end: 'top 40%', scrub: true },
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

  // Endless reel, nudged by scroll velocity.
  gsap.utils.toArray<HTMLElement>('[data-reel]').forEach((el) => {
    const track = el.querySelector<HTMLElement>('[data-reel-track]')
    if (!track) return
    const loop = gsap.to(track, { xPercent: -50, duration: 48, ease: 'none', repeat: -1 })
    const skew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' })
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity()
        const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(v) / 300)
        gsap.to(loop, { timeScale: boost * (self.direction < 0 ? -1 : 1), duration: 0.25, overwrite: true })
        gsap.to(loop, { timeScale: self.direction < 0 ? -1 : 1, duration: 1.2, delay: 0.25 })
        skew(gsap.utils.clamp(-6, 6, v / -260))
      },
      onLeave: () => skew(0),
    })
  })

  // Hero headline drifts up and softens as you leave the first screen.
  gsap.utils.toArray<HTMLElement>('[data-hero-drift]').forEach((el) => {
    gsap.to(el, {
      yPercent: -18,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top+=80', end: 'bottom top', scrub: true },
    })
  })

  // Pinned horizontal process track on wide screens.
  const mm = gsap.matchMedia()
  mm.add('(min-width: 900px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-hscroll]').forEach((el) => {
      const track = el.querySelector<HTMLElement>('[data-hscroll-track]')
      if (!track) return
      const distance = () => track.scrollWidth - el.clientWidth
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
    })
  })
  cleanups.push(() => mm.revert())

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

  // Oversized wordmark rises letter by letter.
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

  // Magnetic buttons (fine pointers only).
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
      const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
      const strength = Number(el.dataset.magnetic || 0.35)
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - r.left - r.width / 2) * strength)
        y((e.clientY - r.top - r.height / 2) * strength)
      }
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' })
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
