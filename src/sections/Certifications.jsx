import { motion } from 'framer-motion'
import { Award, Globe } from 'lucide-react'
import { CERTIFICATIONS } from '../data'

export default function Certifications() {
  return (
    <section id="certificates" className="section alt">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow justify-center"><span className="pulse-dot" /> Credentials</p>
          <h2 className="section-title">Certifications &amp; <span className="accent">Achievements</span></h2>
        </div>

        <div className="cert-grid">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              className="cert-card"
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: (i % 4) * 0.08 }}
            >
              <span className="cert-ic"><Award size={22} /></span>
              <h4 className="cert-title">{c.title}</h4>
              <p className="cert-issuer">{c.issuer}</p>
              <span className="cert-duration mono">{c.duration}</span>
            </motion.div>
          ))}
        </div>

        <div className="cert-note">
          <Globe size={16} /> Full-stack PHP Web Development · Digital Marketing · Computer Fundamentals &amp; Accounts · ICIAI-2025 Conference Participation
        </div>
      </div>
    </section>
  )
}
