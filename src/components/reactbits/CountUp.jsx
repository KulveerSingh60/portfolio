import { useEffect, useRef, useState } from 'react'

/**
 * React Bits "CountUp" pattern — animates a number from 0 to `to`
 * when scrolled into view. Uses IntersectionObserver + rAF.
 * Respects reduced motion by jumping straight to the final value.
 */
export default function CountUp({
  to,
  duration = 1.6,
  separator = '',
  className = '',
  suffix = '',
}) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (started.current) return
      started.current = true
      if (reduced) {
        setVal(to)
        return
      }
      let start = null
      const step = (ts) => {
        if (start === null) start = ts
        const p = Math.min((ts - start) / (duration * 1000), 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(to * eased))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run()
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  const formatted = String(val).replace(/\B(?=(\d{3})+(?!\d))/g, separator)

  return (
    <span ref={ref} className={`rb-count ${className}`}>
      {formatted}
      {suffix}
    </span>
  )
}
