import { useEffect } from 'react'
import {
  initSmoothScroll,
  destroySmoothScroll,
  getSmoothScroll,
} from '../lib/motion'

/**
 * Mounts Lenis smooth-scrolling and keeps it synced with GSAP ScrollTrigger.
 * Does nothing under prefers-reduced-motion or when unsupported.
 */
export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [enabled])
}

export { getSmoothScroll }
