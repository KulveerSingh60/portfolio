import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionHead from '../components/SectionHead'
import { EXPERIENCE } from '../data'
import { gsap } from '../lib/motion'
const WORK = EXPERIENCE.filter((e) => e.type === 'work')
const EDU = EXPERIENCE.filter((e) => e.type === 'education')

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function TimelineGroup({ label, items, accent }) {
  const progressRef = useRef(null)

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: progress, start: 'top 75%', end: 'bottom 55%', scrub: 0.4 },
        }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <div className="tl-group">
      <div className="tl-group-head">
        <span className={`tl-group-label mono ${accent ? 'accent' : ''}`}>{label}</span>
        <span className="tl-group-count mono">{String(items.length).padStart(2, '0')}</span>
      </div>

      <div className="timeline">
        <span ref={progressRef} className="timeline-progress" aria-hidden="true" />
        {items.map((item, i) => (
          <motion.div
            key={item.role}
            className="timeline-row"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: i * 0.04 }}
          >
            <div className="timeline-date">
              <span className="timeline-period">{item.duration}</span>
              <span className="timeline-type">{item.period}</span>
            </div>

            <div className="timeline-node" aria-hidden="true">
              <span className="timeline-dot" />
            </div>

            <div className="timeline-card">
              <h3 className="timeline-role">{item.role}</h3>
              <p className="timeline-org">
                {item.org}
                {item.loc ? <span className="timeline-loc"> · {item.loc}</span> : null}
              </p>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHead
          chapter="04"
          eyebrow="Journey"
          title="Experience &amp; <span class='accent'>Education.</span>"
          sub="A timeline of real roles, internships, training and study."
        />

        <TimelineGroup label="Work Experience" items={WORK} />
        <TimelineGroup label="Education" items={EDU} accent />
      </div>
    </section>
  )
}
