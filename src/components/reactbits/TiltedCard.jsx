import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/motion'

/**
 * React Bits "TiltedCard" pattern — a 3D perspective tilt that reacts to
 * pointer position plus a moving glare highlight. Transform/opacity only,
 * respects reduced motion, and is fully cleaned up on unmount.
 */
export default function TiltedCard({
  children,
  className = '',
  maxTilt = 10,
  glare = true,
  scale = 1.02,
}) {
  const ref = useRef(null)
  const api = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tiltX = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power3.out' })
    const tiltY = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power3.out' })
    const glareX = gsap.quickTo(el, '--glare-x', { duration: 0.5, ease: 'power3.out' })
    const glareY = gsap.quickTo(el, '--glare-y', { duration: 0.5, ease: 'power3.out' })

    api.current = {
      move(px, py) {
        tiltX((0.5 - py) * maxTilt)
        tiltY((px - 0.5) * maxTilt)
        gsap.to(el, { scale, duration: 0.3, ease: 'power2.out' })
        if (glare) {
          glareX((px * 100).toFixed(2))
          glareY(((1 - py) * 100).toFixed(2))
        }
      },
      leave() {
        tiltX(0)
        tiltY(0)
        gsap.to(el, { scale: 1, duration: 0.5, ease: 'power2.out' })
      },
    }

    return () => {
      api.current = null
      gsap.to(el, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.2, overwrite: 'auto' })
    }
  }, [maxTilt, scale, glare])

  const onMouseMove = (e) => {
    if (!api.current) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    api.current.move((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height)
  }
  const onMouseLeave = () => api.current && api.current.leave()

  return (
    <div
      ref={ref}
      className={`rb-tilt ${className}${glare ? ' has-glare' : ''}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {glare && <span className="rb-glare" aria-hidden="true" />}
    </div>
  )
}
