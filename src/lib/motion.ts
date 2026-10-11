import type Lenis from 'lenis'

// Shared handles for the motion system.

let lenis: Lenis | null = null
export const setLenis = (l: Lenis | null) => { lenis = l }
export const getLenis = () => lenis

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
