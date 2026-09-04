import { motion } from 'framer-motion'

const SCREENS = {
  inventory: { title: 'Inventory Dashboard', urlLabel: '/inventory', accent: '#2bd98b' },
  estateluxe: { title: 'Real Estate Website', urlLabel: '/estateluxe', accent: '#e8a44d' },
  laptop: { title: 'Full-Stack App', urlLabel: '/app', accent: '#22d3ee' },
  conference: { title: 'ICIAI-2025', urlLabel: '/paper', accent: '#a78bfa' },
}

function DashPreview({ accent }) {
  return (
    <div className="pv pv-dash">
      <aside className="pv-side">
        <span className="pv-side-logo" style={{ background: accent }} />
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={`pv-side-link ${i === 0 ? 'active' : ''}`} style={i === 0 ? { color: accent } : undefined} />
        ))}
      </aside>
      <div className="pv-main">
        <div className="pv-stats">
          {[62, 44, 31].map((w, i) => (
            <div className="pv-stat" key={i}>
              <span className="pv-stat-label" />
              <span className="pv-stat-num" style={{ width: `${w}%`, background: accent }} />
            </div>
          ))}
        </div>
        <div className="pv-chart">
          <span className="pv-chart-title" style={{ background: accent }} />
          <div className="pv-bars">
            {[38, 55, 44, 70, 58, 82, 64, 90, 74, 60, 68, 84].map((h, i) => (
              <span key={i} className="pv-bar" style={{ height: `${h}%`, background: i % 3 === 0 ? accent : '#2a3138' }} />
            ))}
          </div>
        </div>
        <div className="pv-table">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="pv-trow" key={i}>
              <span className="pv-tdot" style={{ background: accent }} />
              <span className="pv-tname" />
              <span className="pv-tval" style={i % 2 ? { background: accent } : undefined} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EstatePreview({ accent }) {
  return (
    <div className="pv pv-estate">
      <div className="pv-hero">
        <span className="pv-hero-badge" style={{ background: accent }}>Find your home</span>
        <span className="pv-hero-title" />
        <span className="pv-hero-sub" />
      </div>
      <div className="pv-prop">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="pv-card" key={i}>
            <div className="pv-card-media" style={{ background: `linear-gradient(140deg, ${accent}55, #1c1f26 70%)` }}>
              <span className="pv-card-tag mono" style={{ color: accent }}>For Sale</span>
              <span className="pv-card-price mono" style={{ color: accent }}>
                {i === 0 ? '$420k' : i === 1 ? '$310k' : '$540k'}
              </span>
            </div>
            <div className="pv-card-lines">
              <span className="pv-card-line" />
              <span className="pv-card-line short" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GenericPreview({ accent }) {
  return (
    <div className="pv pv-generic">
      <div className="screen-header">
        <div className="sh-title" style={{ background: accent }}>Preview</div>
      </div>
      <div className="sk-row">
        <div className="sk-line long" style={{ background: '#1f2430' }} />
        <div className="sk-line med" style={{ background: '#1f2430' }} />
      </div>
      <div className="screen-cards">
        {Array.from({ length: 2 }).map((_, i) => (
          <div className="sc-card" key={i}>
            <span className="sc-dot" style={{ background: accent }} />
            <span className="sc-line" />
            <span className="sc-line short" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProjectDevice({ visual }) {
  const s = SCREENS[visual] || SCREENS.laptop
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
          <span className="d-url mono">/{s.urlLabel}</span>
        </div>
        <div className="device-screen">
          {visual === 'inventory' ? (
            <DashPreview accent={s.accent} />
          ) : visual === 'estateluxe' ? (
            <EstatePreview accent={s.accent} />
          ) : (
            <GenericPreview accent={s.accent} />
          )}
          <div className="screen-fade" />
        </div>
        <div className="device-base" />
      </div>
      <span
        className="device-glow"
        style={{ background: `radial-gradient(closest-side, ${s.accent}42, transparent 72%)` }}
      />
    </motion.div>
  )
}
