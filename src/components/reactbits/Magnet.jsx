import { useRef } from 'react'
import { gsap } from '../../lib/motion'

/**
 * React Bits "Magnet" pattern — the wrapped element eases toward the
 * cursor within a radius, then springs back on leave.
 * Uses transform-only animation and respects reduced motion.
 */
export default function Magnet({ children, strength = 0.5, disabled }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (disabled || !ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const relX = e.clientX - (r.left + r.width / 2)
    const relY = e.clientY - (r.top + r.height / 2)
    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    if (disabled || !ref.current) return
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  return (
    <span
      ref={ref}
      className="rb-magnet"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </span>
  )
}
