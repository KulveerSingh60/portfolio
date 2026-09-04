import { useEffect } from 'react'
import { gsap } from '../lib/motion'

/**
 * GSAP ScrollTrigger reveal for a single element ref.
 *
 * - Only runs when the user does NOT prefer reduced motion (gsap.matchMedia).
 * - Content is left at natural visibility otherwise, so nothing stays hidden.
 * - Animates transform/opacity only (never layout properties).
 * - Fully cleaned up on unmount.
 */
export default function useReveal(ref, opts = {}) {
  const {
    y = 32,
    delay = 0,
    duration = 0.9,
    trigger,
    start = 'top 85%',
    once = true,
  } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: trigger || el, start, once },
        }
      )
      return () => tween.kill()
    })

    return () => mm.revert()
  }, [ref, y, delay, duration, trigger, start, once])
}
