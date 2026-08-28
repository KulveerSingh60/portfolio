import { motion } from 'framer-motion'
import { STATS, PROFILE, CERTIFICATIONS } from '../data'
import SectionHead from '../components/SectionHead'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHead
          chapter="01"
          eyebrow="About"
          title="I build thoughtful digital experiences with code, design &amp; technology."
          sub=""
        />

        <div className="about-grid">
          <motion.div
            className="about-copy"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="about-lead">{PROFILE.about}</p>
            <p className="about-body">
              As a Computer Applications student and developer, I combine a strong technical
              foundation with real, hands-on internship experience — shipping production-style
              applications, applying digital marketing to live campaigns, and keeping a disciplined
              workflow across the full development lifecycle.
            </p>
            <p className="about-body">
              I'm currently focused on deepening my full-stack skills and building interactive,
              well-crafted web products that look as good as they work.
            </p>
            <div className="about-facts">
              <div>
                <span className="mono fact-k">Location</span>
                <span>{PROFILE.location}</span>
              </div>
              <div>
                <span className="mono fact-k">Focus</span>
                <span>Full-Stack Web Development</span>
              </div>
              <div>
                <span className="mono fact-k">Status</span>
                <span className="accent">{PROFILE.available}</span>
              </div>
            </div>
          </motion.div>

          <div className="about-stats">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <span className="stat-value mono">
                  {s.value}
                  <span className="accent">{s.suffix}</span>
                </span>
                <span className="stat-label">
                  <b>{s.label}</b>
                  <small>{s.sub}</small>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="about-certs">
          <div className="about-certs-head">
            <span className="mono">Credentials</span>
            <span className="mono about-certs-count">{String(CERTIFICATIONS.length).padStart(2, '0')}</span>
          </div>
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.title}
              className="cert-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <span className="cert-num mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="cert-title">{c.title}</span>
              <span className="cert-issuer mono">{c.issuer}</span>
              <span className="cert-duration mono">{c.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
