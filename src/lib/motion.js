import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger }

/* ------------------------------------------------------------------ */
/*  Smooth scroll manager — Lenis wired to GSAP ScrollTrigger.        */
/*  Safe no-op when: unsupported, SSR, or prefers-reduced-motion.     */
/* ------------------------------------------------------------------ */
let lenis = null

function matchesReduced() {
  return reducedMotion()
}

export function initSmoothScroll() {
  if (typeof window === 'undefined') return null
  if (lenis) return lenis
  if (matchesReduced()) return null

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    syncTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time) => {
    lenis && lenis.raf(time * 1000)
  }
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  lenis._raf = raf
  return lenis
}

export function getSmoothScroll() {
  return lenis
}

export function destroySmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(lenis._raf)
  lenis.destroy()
  lenis = null
}

/** Smoothly scroll to an element or selector. Falls back to native. */
export function scrollTo(target) {
  if (lenis) {
    const el =
      typeof target === 'string' ? document.querySelector(target) : target
    lenis.scrollTo(el || target, { offset: 0, duration: 1.2 })
    return
  }
  const el =
    typeof target === 'string' ? document.querySelector(target) : target
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Pause/resume — used while a modal locks page scroll. */
export function stopSmoothScroll() {
  if (lenis) lenis.stop()
}
export function startSmoothScroll() {
  if (lenis) lenis.start()
}

/* ------------------------------------------------------------------ */
/*  Defaults: align ScrollTrigger with Lenis's transform space.       */
/* ------------------------------------------------------------------ */
ScrollTrigger.config({ ignoreMobileResize: true })
