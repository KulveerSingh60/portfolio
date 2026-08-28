import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Languages as LangIcon } from 'lucide-react'
import { EXPERIENCE, LANGUAGES } from '../data'

const work = EXPERIENCE.filter((e) => e.type === 'work')
const education = EXPERIENCE.filter((e) => e.type === 'education')

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow justify-center"><span className="pulse-dot" /> My Path</p>
          <h2 className="section-title">Experience &amp; <span className="accent">Education</span></h2>
        </div>

        <div className="exp-grid">
          <div className="exp-col">
            <h3 className="exp-head"><Briefcase size={18} /> Experience & Internships</h3>
            <div className="timeline">
              {work.map((e, i) => (
                <motion.div
                  className="timeline-item"
                  key={e.role}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="t-dot" />
                  <div className="t-content">
                    <span className="t-duration mono">{e.duration}</span>
                    <h4>{e.role}</h4>
                    <h5 className="t-company">{e.company}</h5>
                    {e.location && <p className="t-loc mono">{e.location}</p>}
                    <p className="t-desc">{e.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="exp-col">
            <h3 className="exp-head"><GraduationCap size={18} /> Education</h3>
            <div className="timeline">
              {education.map((e, i) => (
                <motion.div
                  className="timeline-item"
                  key={e.role}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="t-dot accent-dot" />
                  <div className="t-content">
                    <span className="t-duration mono">{e.duration}</span>
                    <h4>{e.role}</h4>
                    <h5 className="t-company">{e.company}</h5>
                    {e.location && <p className="t-loc mono">{e.location}</p>}
                    <p className="t-desc">{e.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <h3 className="exp-head lang-head"><LangIcon size={18} /> Languages</h3>
            <div className="langs">
              {LANGUAGES.map((l) => (
                <div className="lang-chip" key={l.name}>
                  <span className="lang-name">{l.name}</span>
                  <span className="lang-level mono">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
