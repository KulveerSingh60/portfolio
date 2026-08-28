import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import SectionHead from '../components/SectionHead'
import { EXPERIENCE } from '../data'

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

        <div className="timeline">
          {EXPERIENCE.map((item, i) => (
            <motion.div
              key={item.role}
              className={`timeline-row ${item.type === 'education' ? 'edu' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <div className="timeline-marker" aria-hidden="true">
                {item.type === 'education' ? <GraduationCap size={18} /> : <Briefcase size={18} />}
              </div>
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-meta mono">
                <span className="timeline-period">{item.duration}</span>
                <span className="timeline-type">{item.type === 'education' ? 'Education' : 'Work'}</span>
              </div>
              <div className="timeline-card">
                <h3 className="timeline-role">{item.role}</h3>
                <p className="timeline-org mono">
                  {item.org}
                  {item.loc ? ` · ${item.loc}` : ''}
                </p>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
