import { useEffect, useRef } from 'react'
import { CalendarCheck, Briefcase, Award, Code2 } from 'lucide-react'
import { STATS } from '../data'

const ICONS = { calendar: CalendarCheck, briefcase: Briefcase, award: Award, code: Code2 }

function CountUp({ target, suffix }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.textContent = target + suffix
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const dur = 1500
        const start = performance.now()
        function step(now) {
          const p = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = Math.floor(eased * target) + suffix
          if (p < 1) requestAnimationFrame(step)
          else el.textContent = target + suffix
        }
        requestAnimationFrame(step)
        io.disconnect()
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, suffix])

  return <span ref={ref} className="stat-value">{target + suffix}</span>
}

export default function Statistics() {
  return (
    <section className="stats" aria-label="Key statistics">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s, i) => {
            const Icon = ICONS[s.icon]
            return (
              <div className="stat-card" key={s.label} style={{ '--i': i }}>
                <span className="stat-ic"><Icon size={20} /></span>
                <div className="stat-num"><CountUp target={s.value} suffix={s.suffix} /></div>
                <p className="stat-label">{s.label}</p>
                <div className="stat-line" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
