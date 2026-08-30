import { motion } from 'framer-motion'

const SCREENS = {
  inventory: {
    title: 'Inventory Dashboard',
    lines: [
      { w: '40%', c: '#2bd98b' },
      { w: '90%', c: '#1f2430' },
      { w: '80%', c: '#1a1e29' },
      { w: '60%', c: '#1a1e29' },
    ],
    cards: 3,
    accent: '#2bd98b',
  },
  laptop: {
    title: 'Full-Stack App',
    lines: [
      { w: '35%', c: '#22d3ee' },
      { w: '85%', c: '#1f2430' },
      { w: '70%', c: '#1a1e29' },
    ],
    cards: 2,
    accent: '#22d3ee',
  },
  marketing: {
    title: 'GreenBasket',
    lines: [
      { w: '45%', c: '#e1306c' },
      { w: '88%', c: '#1f2430' },
      { w: '75%', c: '#1a1e29' },
    ],
    cards: 3,
    accent: '#e1306c',
  },
  conference: {
    title: 'ICIAI-2025',
    lines: [
      { w: '38%', c: '#a78bfa' },
      { w: '90%', c: '#1f2430' },
      { w: '62%', c: '#1a1e29' },
    ],
    cards: 2,
    accent: '#a78bfa',
  },
}

export default function ProjectDevice({ visual, image }) {
  const s = SCREENS[visual] || SCREENS.inventory
  return (
    <motion.div
      className="device"
      initial={{ opacity: 0, y: 40, rotateY: 14 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="device-inner">
        <div className="device-top">
          <span className="d-dot red" /><span className="d-dot yellow" /><span className="d-dot green" />
          <span className="d-url mono">/{visual}</span>
        </div>
        <div className="device-screen">
          <div className="screen-header">
            <div className="sh-title" style={{ background: s.accent }}>{s.title}</div>
            <div className="sh-chip mono">≈</div>
          </div>
          {image ? (
            <img className="device-shot" src={image} alt={`${s.title} screenshot`} loading="lazy" />
          ) : (
            <>
              <div className="skeleton">
                {s.lines.map((l, i) => (
                  <div key={i} className="sk-line" style={{ width: l.w, background: l.c }} />
                ))}
              </div>
              <div className="screen-cards">
                {Array.from({ length: s.cards }).map((_, i) => (
                  <div className="sc-card" key={i}>
                    <span className="sc-dot" style={{ background: s.accent }} />
                    <span className="sc-line" />
                  </div>
                ))}
              </div>
            </>
          )}
          {!image && <div className="screen-fade" />}
        </div>
        <div className="device-base" />
      </div>
      <span
        className="device-glow"
        style={{ background: `radial-gradient(closest-side, ${s.accent}2e, transparent 70%)` }}
      />
    </motion.div>
  )
}
