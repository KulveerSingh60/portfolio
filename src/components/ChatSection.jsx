import { useEffect, useRef } from 'react'
import AiAssistant from './AiAssistant'
import { gsap } from '../lib/motion'

export default function ChatSection() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="section ai-section" aria-label="Ask KULVEER.AI" data-bg-theme="ai">
      <div className="container">
        <div ref={ref}>
          <AiAssistant />
        </div>
      </div>
    </section>
  )
}
