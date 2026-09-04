import { motion } from 'framer-motion'
import { FlaskConical, ArrowUpRight, Lock } from 'lucide-react'
import SectionHead from '../components/SectionHead'
import KulveerTerminal from '../components/KulveerTerminal'
import TiltedCard from '../components/reactbits/TiltedCard'
import { LAB_ITEMS } from '../data'

export default function Lab() {
  return (
    <section id="lab" className="section lab">
      <div className="container">
        <SectionHead
          chapter="05"
          eyebrow="The Lab"
          title="Where I <span class='accent'>experiment.</span>"
          sub="Small ideas, prototypes and explorations — the space where I try new things with technology."
        />

        <div className="lab-grid">
          {LAB_ITEMS.map((item, i) => (
            <TiltedCard key={item.number} maxTilt={8} className="lab-tilt">
              <motion.div
                className={`lab-card ${item.status === 'soon' ? 'soon' : ''}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
              <div className="lab-card-top">
                <span className="lab-num mono">{item.number}</span>
                <span className="lab-icon">
                  {item.status === 'soon' ? <Lock size={18} /> : <FlaskConical size={18} />}
                </span>
              </div>
              <div className="lab-tag mono">
                <span className={`lab-dot ${item.status}`} />
                {item.tag}
              </div>
              <h3 className="lab-title">{item.title}</h3>
              <p className="lab-desc">{item.desc}</p>
              {item.status !== 'soon' && (
                <span className="lab-link">
                  View <ArrowUpRight size={14} />
                </span>
              )}
            </motion.div>
            </TiltedCard>
          ))}

          <motion.div
            className="lab-add"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mono">+ New experiments are added as I explore — follow my GitHub to see them live.</span>
          </motion.div>
        </div>

        <KulveerTerminal />
      </div>
    </section>
  )
}
