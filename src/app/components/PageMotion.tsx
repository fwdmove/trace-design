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
 *   data-split          headline lines rise out of a mask ("hero" = on load)
 *   data-fade           fade + lift on enter ("stagger" = children in turn)
 *   data-scrub-words    words brighten as the paragraph scrolls through
 *   data-clip           image frame opens from an inset as it scrolls in
 *   data-parallax       inner image drifts against the scroll
 *   data-stretch        hero headline: letters rise and widen on load, then
 *                       compress as you scroll away (Archivo's wdth axis)
 *   data-stretch-scroll section titles widen into place as they scroll in
 *   data-gallery        pinned sideways gallery: frames sway with velocity,
 *                       the piece in the middle gets the light (is-lit)
 *   data-count          number counts up on enter
 *   data-rise           characters rise as the element scrolls into view
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

  // Hero headline: letters rise and stretch open on load, then squeeze
  // narrow as the first screen scrolls away.
  gsap.utils.toArray<HTMLElement>('[data-stretch]').forEach((el) => {
    show(el)
    const split = SplitText.create(el, { type: 'words,chars', charsClass: 'char' })
    gsap.set(split.chars, { fontVariationSettings: "'wdth' 62" })
    gsap.from(split.chars, {
      yPercent: 105,
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.035,
      delay: 0.1,
    })
    gsap.to(split.chars, {
      fontVariationSettings: "'wdth' 112",
      duration: 1.8,
      ease: 'expo.inOut',
      stagger: 0.03,
      delay: 0.35,
      onComplete: () => {
        gsap.fromTo(
          split.chars,
          { fontVariationSettings: "'wdth' 112" },
          {
            fontVariationSettings: "'wdth' 62",
            ease: 'none',
            stagger: 0.01,
            scrollTrigger: { trigger: el, start: 'top top+=60', end: 'bottom top', scrub: true },
          },
        )
      },
    })
  })

  // Section titles widen into place as they scroll in.
  gsap.utils.toArray<HTMLElement>('[data-stretch-scroll]').forEach((el) => {
    show(el)
    const split = SplitText.create(el, { type: 'words,chars', charsClass: 'char' })
    gsap.fromTo(
      split.chars,
      { fontVariationSettings: "'wdth' 62", opacity: 0.15 },
      {
        fontVariationSettings: "'wdth' 100",
        opacity: 1,
        ease: 'none',
        stagger: 0.03,
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: true },
      },
    )
  })

  const mm = gsap.matchMedia()

  // The gallery: a pinned room that scrolls sideways on wide screens.
  mm.add('(min-width: 900px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-gallery]').forEach((el) => {
      const track = el.querySelector<HTMLElement>('[data-gallery-track]')
      const bar = el.querySelector<HTMLElement>('[data-gallery-bar]')
      const count = el.querySelector<HTMLElement>('[data-gallery-count]')
      if (!track) return
      const frames = gsap.utils.toArray<HTMLElement>('.piece-frame', el)
      const sway = frames.map((f) => gsap.quickTo(f, 'skewX', { duration: 0.8, ease: 'power3' }))
      const distance = () => track.scrollWidth - el.clientWidth

      const move = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar) gsap.set(bar, { scaleX: self.progress })
            const v = gsap.utils.clamp(-2.5, 2.5, self.getVelocity() / -900)
            sway.forEach((s) => s(v))
          },
          onLeave: () => sway.forEach((s) => s(0)),
          onLeaveBack: () => sway.forEach((s) => s(0)),
        },
      })

      // The big ghost title slides slower than the wall.
      const ghost = el.querySelector<HTMLElement>('.gallery-ghost')
      if (ghost) {
        gsap.to(ghost, {
          xPercent: 35,
          ease: 'none',
          scrollTrigger: { trigger: ghost, containerAnimation: move, start: 'left left', end: 'right left', scrub: true },
        })
      }

      // Whichever piece is in the middle of the wall gets the light.
      gsap.utils.toArray<HTMLElement>('[data-piece]', el).forEach((piece, i) => {
        ScrollTrigger.create({
          trigger: piece,
          containerAnimation: move,
          start: 'left 60%',
          end: 'right 40%',
          toggleClass: 'is-lit',
          onToggle: (self) => {
            if (self.isActive && count) count.textContent = String(i + 1).padStart(2, '0')
          },
        })
      })
    })
  })

  // Narrow screens: the gallery stacks, and each piece lights up mid-screen.
  mm.add('(max-width: 899px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-piece]').forEach((piece) => {
      ScrollTrigger.create({ trigger: piece, start: 'top 65%', end: 'bottom 35%', toggleClass: 'is-lit' })
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
