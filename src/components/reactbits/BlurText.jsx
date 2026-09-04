import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/motion'

/**
 * React Bits "BlurText" pattern — words start blurred and resolve crisply
 * on scroll into view, with a stagger. Uses GSAP ScrollTrigger, cleans up,
 * and respects reduced motion (no GSAP applied -> words stay visible).
 */
export default function BlurText({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0,
  duration = 0.5,
  y = 12,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = Array.from(el.querySelectorAll('[data-rb-word]'))
    if (words.length === 0) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        words,
        { opacity: 0, filter: 'blur(10px)', y },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration,
          delay,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    })
    return () => mm.revert()
  }, [delay, duration, y])

  return (
    <Tag ref={ref} className={`rb-blurtext ${className}`}>
      {String(children)
        .split(' ')
        .map((w, i) => (
          <span
            key={i}
            data-rb-word
            style={{ display: 'inline-block', willChange: 'opacity, filter' }}
          >
            {w}&nbsp;
          </span>
        ))}
    </Tag>
  )
}
