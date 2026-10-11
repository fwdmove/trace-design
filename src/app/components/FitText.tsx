'use client'

import { useEffect } from 'react'
import { fitAll } from '@/lib/fit'

// Keeps fitted display lines filling their width: once fonts load, and again
// whenever the viewport width changes. Runs with or without motion.
export default function FitText() {
  useEffect(() => {
    let raf = 0
    let width = window.innerWidth
    document.fonts.ready.then(() => fitAll())
    const onResize = () => {
      if (window.innerWidth === width) return
      width = window.innerWidth
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => fitAll())
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return null
}
