import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import SectionBoundary from '../components/SectionBoundary'
import SectionHead from '../components/SectionHead'
import TiltedCard from '../components/reactbits/TiltedCard'
import { EXPERTISE, PROCESS } from '../data'

const TechCore = lazy(() => import('../components/3d/TechCore'))

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise" data-bg-theme="expertise">
      <div className="container">
        <SectionHead
          chapter="02"
          eyebrow="Expertise"
          title="What I can actually <span class='accent'>build</span>."
          sub="No percentage bars — here's what I can do, and what I can make for you."
        />

        <div className="expertise-grid">
          <div className="expertise-list">
            {EXPERTISE.map((cat, i) => (
              <TiltedCard key={cat.id} maxTilt={4} glare={false} className="expertise-tilt">
                <motion.div
                  className={`expertise-item${cat.secondary ? ' secondary' : ''}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                >
                  <span className="expertise-num mono">{String(i + 1).padStart(2, '0')}</span>
                  <div className="expertise-body">
                    <h3 className="expertise-title">{cat.title}</h3>
                    <p className="expertise-desc">{cat.desc}</p>
                    <div className="expertise-tags">
                      {cat.skills.map((s) => (
                        <span key={s} className="tech-chip mono">{s}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TiltedCard>
            ))}
          </div>

          <div className="expertise-visual">
            <SectionBoundary fallback={<div className="techcore-fallback mono">PHP · MySQL · JavaScript</div>}>
              <Suspense fallback={<div className="techcore-fallback mono">Loading tech…</div>}>
                <TechCore />
              </Suspense>
            </SectionBoundary>
          </div>
        </div>

        <div className="process">
          <div className="process-head">
            <span className="mono">How I work</span>
          </div>
          <div className="process-track">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                className="process-step"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="process-step-num mono">{p.step}</span>
                <h4 className="process-step-title">{p.title}</h4>
                <p className="process-step-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
