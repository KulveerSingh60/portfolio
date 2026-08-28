import { motion } from 'framer-motion'
import { Code2, Zap, Smartphone, Users } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const FEATURES = [
  { icon: Code2, title: 'Full-Stack', sub: 'PHP, MySQL & JavaScript' },
  { icon: Zap, title: 'Fast & Optimized', sub: '~40% faster page loads' },
  { icon: Smartphone, title: 'Responsive', sub: 'Flawless on every screen' },
  { icon: Users, title: 'Team Player', sub: 'Full SDLC experience' },
]

export default function About() {
  const reveal = useReveal()

  return (
    <section id="about" className="section">
      <div className="container">
        <div ref={reveal} className="about-grid">
          <div className="about-visual">
            <motion.div
              className="about-snippet mono"
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="cwin-bar">
                <span className="cwin-dot red" /><span className="cwin-dot yellow" /><span className="cwin-dot green" />
                <span className="cwin-title">developer.ts</span>
              </div>
              <pre className="cwin-body">
                <span className="t-key">const</span> <span className="t-var">developer</span> = {'{'}
                {'\n'}
                {'  '}<span className="t-prop">name</span>: <span className="t-str">'Kulveer Singh'</span>,
                {'\n'}
                {'  '}<span className="t-prop">role</span>: <span className="t-str">'Full-Stack Developer'</span>,
                {'\n'}
                {'  '}<span className="t-prop">edu</span>: <span className="t-str">'BCA · Guru Kashi University'</span>,
                {'\n'}
                {'  '}<span className="t-prop">location</span>: <span className="t-str">'Punjab, India'</span>,
                {'\n'}
                {'  '}<span className="t-prop">hireable</span>: <span className="t-bool">true</span>,
                {'\n'}
                {'}'};
              </pre>
            </motion.div>
          </div>

          <div className="about-copy">
            <p className="eyebrow"><span className="pulse-dot" /> About Me</p>
            <h2 className="section-title left">
              Turning ideas into <span className="accent">working applications</span>
            </h2>
            <p className="section-sub left">
              I'm a motivated Computer Applications graduate (BCA, Guru Kashi University) with 12+
              months of combined internship experience across full-stack web development, digital
              marketing, and business computing. I've shipped a real-world inventory system end-to-end
              and I'm equally comfortable in technical and non-technical environments — quick to learn,
              detail-oriented, and committed to quality.
            </p>

            <div className="about-features">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="feature-chip"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="feature-ic"><f.icon size={18} /></span>
                  <span>
                    <strong>{f.title}</strong>
                    <small>{f.sub}</small>
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
