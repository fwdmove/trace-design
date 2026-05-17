'use client'

import { useEffect } from 'react'

export default function SiteScripts() {
  useEffect(() => {
    // ── Nav scroll state ──────────────────────────────────
    const nav = document.getElementById('site-nav')
    const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 24)
    window.addEventListener('scroll', updateNav, { passive: true })
    updateNav()

    // ── Scroll reveal ─────────────────────────────────────
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

    // ── Number counter animation ──────────────────────────
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const target = parseInt(el.dataset.count ?? '0', 10)
          const suffix = el.dataset.suffix ?? ''
          const duration = 1100
          const startTime = performance.now()

          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const current = Math.floor(easeOutCubic(progress) * target)
            el.textContent = current + suffix
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          counterObserver.unobserve(el)
        })
      },
      { threshold: 0.6 }
    )

    document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el))

    return () => {
      window.removeEventListener('scroll', updateNav)
      revealObserver.disconnect()
      counterObserver.disconnect()
    }
  }, [])

  return null
}
