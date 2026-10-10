import type Lenis from 'lenis'

// Shared handles for the motion system: the Lenis instance and the
// preloader "ready" signal.

let lenis: Lenis | null = null
export const setLenis = (l: Lenis | null) => { lenis = l }
export const getLenis = () => lenis

declare global {
  interface Window { __traceReady?: boolean }
}

export const READY_EVENT = 'trace:ready'

export function whenReady(): Promise<void> {
  return new Promise((resolve) => {
    if (window.__traceReady) return resolve()
    window.addEventListener(READY_EVENT, () => resolve(), { once: true })
  })
}

export function markReady() {
  window.__traceReady = true
  window.dispatchEvent(new Event(READY_EVENT))
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
