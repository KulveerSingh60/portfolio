import { useEffect, useRef } from 'react'

/**
 * Adds a fade-on-scroll reveal to a container. Applies `fade-item` to
 * direct children (or the node itself with `self`) and adds `in` when
 * the element enters the viewport.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const { trigger = 'children', threshold = 0.12, stagger = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }

    const targets = trigger === 'self' ? [el] : Array.from(el.children)
    targets.forEach((t, i) => {
      t.classList.add('fade-item')
      if (stagger) t.style.transitionDelay = `${i * stagger}ms`
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [trigger, threshold, stagger])

  return ref
}
