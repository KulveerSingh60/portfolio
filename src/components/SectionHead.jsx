import { motion } from 'framer-motion'

export default function SectionHead({ chapter, eyebrow, title, sub, align = 'left' }) {
  return (
    <motion.div
      className={`section-head ${align === 'center' ? 'center' : 'left'}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-head-row">
        {chapter && <span className="chapter mono">{chapter}</span>}
        {eyebrow && <span className="eyebrow mono">{eyebrow}</span>}
      </div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p className="section-sub">{sub}</p>}
    </motion.div>
  )
}
