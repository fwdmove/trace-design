'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { prefersReducedMotion, whenReady } from '@/lib/motion'
import { fitAll } from '@/lib/fit'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
 * The site's motion system. Markup opts in with data attributes; this binds
 * the presets on every route, after fonts load and the preloader finishes.
 *
 *   data-tone           the whole page shifts to this block's colors
 *   data-kin            letters spring up and swell open ("load" = on load)
 *   data-proximity      letters near the pointer thin, narrow and lean
 *   data-exit           fitted line slides sideways as the hero leaves
 *   data-slide          block slides sideways across its scroll
 *   data-wave           hovering ripples a wave through the block's letters
 *   data-marquee        endless band that speeds up with scroll velocity
 *   data-split          headline lines rise out of a mask
 *   data-fade           fade + lift on enter ("stagger" = children in turn)
 *   data-scrub-words    words brighten as the paragraph scrolls through
 *   data-hscroll        pinned horizontal scroll on wide screens
 *   data-count          number counts up on enter
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
      fitAll()
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
const chars = (el: Element) => gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.c:not(.c-sp)'))
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

function setup(cleanups: (() => void)[]) {
  const html = document.documentElement

  // Page color: each toned block takes over as it crosses the middle.
  gsap.utils.toArray<HTMLElement>('[data-tone]').forEach((el) => {
    const [bg, fg, ac] = (el.dataset.tone ?? '').split(' ')
    ScrollTrigger.create({
      trigger: el,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (!self.isActive) return
        gsap.to(html, { '--page-bg': bg, '--page-fg': fg, '--page-ac': ac, duration: 0.8, ease: 'power2.out', overwrite: true })
      },
    })
  })

  // Kinetic letters: rise out of the line mask while swelling from thin and
  // condensed to full weight. Proximity takes over once they land.
  gsap.utils.toArray<HTMLElement>('[data-kin]').forEach((el) => {
    const onLoad = el.dataset.kin === 'load'
    const letters = chars(el)
    show(el)
    gsap.fromTo(
      letters,
      { yPercent: 110, '--w': 120, '--x': 50 },
      {
        yPercent: 0,
        '--w': 860,
        '--x': 100,
        duration: onLoad ? 1.5 : 1.2,
        ease: 'expo.out',
        stagger: { each: onLoad ? 0.035 : 0.025 },
        delay: onLoad ? 0.1 : 0,
        scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 85%', once: true },
        onComplete: () => {
          gsap.set(letters, { clearProps: 'transform' })
          if (el.hasAttribute('data-proximity')) cleanups.push(proximity(el, letters))
        },
      },
    )
  })

  // Hero lines shear apart as you scroll off the first screen.
  gsap.utils.toArray<HTMLElement>('[data-hero] [data-exit]').forEach((el) => {
    const dir = Number(el.dataset.exit) || 1
    gsap.to(el, {
      xPercent: dir * 16,
      ease: 'none',
      scrollTrigger: { trigger: el.closest('[data-hero]'), start: 'top top', end: 'bottom top', scrub: true },
    })
  })

  // Section words drift across as they pass through.
  gsap.utils.toArray<HTMLElement>('[data-slide]').forEach((el) => {
    const dir = Number(el.dataset.slide) || 1
    gsap.fromTo(
      el,
      { xPercent: dir * 12 },
      {
        xPercent: dir * -4,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  })
  gsap.utils.toArray<HTMLElement>('.work-head [data-exit]').forEach((el) => {
    const dir = Number(el.dataset.exit) || 1
    gsap.fromTo(
      el,
      { xPercent: dir * 10 },
      {
        xPercent: dir * -6,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  })

  // Hover ripple through a block's letters.
  if (finePointer()) {
    gsap.utils.toArray<HTMLElement>('[data-wave]').forEach((el) => {
      const letters = chars(el)
      let busy = false
      const wave = () => {
        if (busy) return
        busy = true
        gsap.to(letters, {
          keyframes: { '--w': [860, 240, 860] },
          duration: 0.9,
          ease: 'sine.inOut',
          stagger: 0.03,
          onComplete: () => { busy = false },
        })
      }
      el.addEventListener('pointerenter', wave)
      cleanups.push(() => el.removeEventListener('pointerenter', wave))
    })
  } else {
    // Touch screens: the hero breathes on its own instead.
    gsap.utils.toArray<HTMLElement>('[data-hero] [data-proximity]').forEach((el) => {
      gsap.to(chars(el), {
        '--w': 260,
        '--x': 64,
        duration: 1.1,
        ease: 'sine.inOut',
        delay: 2.2,
        stagger: { each: 0.08, repeat: -1, yoyo: true },
      })
    })
  }

  // Crossed marquee bands, pushed by scroll velocity.
  gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((el) => {
    const track = el.querySelector<HTMLElement>('[data-marquee-track]')
    if (!track) return
    const dir = Number(el.dataset.marquee) || 1
    gsap.set(track, { xPercent: dir > 0 ? 0 : -50 })
    const loop = gsap.to(track, { xPercent: dir > 0 ? -50 : 0, duration: 30, ease: 'none', repeat: -1 })
    const skew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' })
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity()
        const boost = gsap.utils.clamp(1, 8, 1 + Math.abs(v) / 250)
        const sign = self.direction < 0 ? -1 : 1
        gsap.to(loop, { timeScale: boost * sign, duration: 0.25, overwrite: true })
        gsap.to(loop, { timeScale: sign, duration: 1.2, delay: 0.25 })
        skew(gsap.utils.clamp(-10, 10, (v / -200) * dir))
      },
      onLeave: () => skew(0),
    })
  })

  // Headlines: lines slide up out of a mask.
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    show(el)
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 115,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
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
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
      },
    )
  })

  // Pinned horizontal process track on wide screens; step words stretch
  // open as they slide in.
  const mm = gsap.matchMedia()
  mm.add('(min-width: 900px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-hscroll]').forEach((el) => {
      const track = el.querySelector<HTMLElement>('[data-hscroll-track]')
      if (!track) return
      const distance = () => track.scrollWidth - el.clientWidth
      const move = gsap.to(track, {
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
      track.querySelectorAll<HTMLElement>('.process-step').forEach((step) => {
        gsap.fromTo(
          chars(step),
          { '--x': 50, '--w': 200 },
          {
            '--x': 100,
            '--w': 860,
            ease: 'none',
            stagger: 0.04,
            scrollTrigger: {
              trigger: step,
              containerAnimation: move,
              start: 'left 95%',
              end: 'left 45%',
              scrub: true,
            },
          },
        )
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

  // Magnetic buttons (fine pointers only).
  if (finePointer()) {
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

// Letters near the pointer thin out, narrow and lean away from it, easing
// back as it moves on. Only runs while the block is on screen.
function proximity(el: HTMLElement, letters: HTMLElement[]) {
  if (!finePointer() || !letters.length) return () => {}

  const REST_W = 860
  const REST_X = 100
  const state = letters.map(() => ({ w: REST_W, x: REST_X, k: 0 }))
  const pointer = { x: -9999, y: -9999 }
  let visible = false

  const onMove = (e: PointerEvent) => {
    pointer.x = e.clientX
    pointer.y = e.clientY
  }
  const st = ScrollTrigger.create({
    trigger: el,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => { visible = self.isActive },
  })
  visible = st.isActive

  const tick = () => {
    if (!visible) return
    letters.forEach((c, i) => {
      const r = c.getBoundingClientRect()
      const dx = pointer.x - (r.left + r.width / 2)
      const dy = pointer.y - (r.top + r.height / 2)
      const radius = Math.max(r.height * 1.3, 120)
      let f = Math.max(0, 1 - Math.hypot(dx, dy) / radius)
      f = f * f * (3 - 2 * f)
      const s = state[i]
      s.w += (REST_W - f * (REST_W - 180) - s.w) * 0.14
      s.x += (REST_X - f * (REST_X - 55) - s.x) * 0.14
      s.k += (f * Math.sign(dx) * -14 - s.k) * 0.14
      c.style.setProperty('--w', s.w.toFixed(1))
      c.style.setProperty('--x', s.x.toFixed(1))
      c.style.setProperty('--k', s.k.toFixed(2))
    })
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  gsap.ticker.add(tick)
  return () => {
    window.removeEventListener('pointermove', onMove)
    gsap.ticker.remove(tick)
    st.kill()
  }
}
