'use client'

import { useEffect } from 'react'

export default function SiteScripts() {
  useEffect(() => {
    // Nav scroll state
    const nav = document.getElementById('site-nav')
    const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 24)
    window.addEventListener('scroll', updateNav, { passive: true })
    updateNav()

    // Reveal on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', updateNav)
      observer.disconnect()
    }
  }, [])

  return null
}
