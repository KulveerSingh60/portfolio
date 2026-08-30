import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROFILE, EXPERTISE, PROJECTS, EXPERIENCE, LINKS } from '../data'

const COMMANDS = ['STACK', 'PROJECTS', 'EXPERIENCE', 'CONTACT']

const hasUrl = (v) => typeof v === 'string' && /^https?:\/\//.test(v)

function StackPanel() {
  const categories = EXPERTISE.filter((c) => !c.secondary)
  return (
    <ul className="kt-list">
      {categories.map((cat) => (
        <li key={cat.id} className="kt-row">
          <span className="kt-row-label mono">{cat.title}</span>
          <span className="kt-chips">
            {cat.skills.map((s) => (
              <span key={s} className="tech-chip mono">{s}</span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  )
}

function ProjectsPanel() {
  return (
    <ul className="kt-list">
      {PROJECTS.slice(0, 3).map((p) => (
        <li key={p.id} className="kt-row kt-proj">
          {hasUrl(p.github) ? (
            <a className="kt-link" href={p.github} target="_blank" rel="noopener noreferrer">
              <span className="kt-proj-title">{p.title}</span>
              <ArrowUpRight size={14} className="kt-arrow" />
            </a>
          ) : (
            <span className="kt-proj-title">{p.title}</span>
          )}
          <span className="kt-chips">
            {p.tech.slice(0, 4).map((t) => (
              <span key={t} className="tech-chip mono">{t}</span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  )
}

function ExperiencePanel() {
  return (
    <ul className="kt-list">
      {EXPERIENCE.slice(0, 4).map((e, i) => (
        <li key={i} className="kt-row kt-exp">
          <span className="kt-exp-dur mono">{e.duration}</span>
          <span className="kt-exp-body">
            <strong>{e.role}</strong>
            <span className="kt-exp-org mono">{e.org}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

const CONTACT_ROWS = [
  { label: 'Email', value: LINKS.emailRaw, href: LINKS.email },
  { label: 'GitHub', value: LINKS.github.replace('https://github.com/', '@'), href: LINKS.github },
  { label: 'LinkedIn', value: 'linkedin.com/in/kulveer-singh-/', href: LINKS.linkedin },
]

function ContactPanel() {
  const external = (href) => hasUrl(href) && !href.startsWith('mailto:')
  return (
    <ul className="kt-list">
      {CONTACT_ROWS.map((c) => (
        <li key={c.label} className="kt-row">
          <span className="kt-row-label mono">{c.label}</span>
          <a
            className="kt-link kt-link-row"
            href={c.href}
            target={external(c.href) ? '_blank' : undefined}
            rel={external(c.href) ? 'noopener noreferrer' : undefined}
          >
            <span className="kt-val">{c.value}</span>
            {external(c.href) && <ArrowUpRight size={14} className="kt-arrow" />}
          </a>
        </li>
      ))}
      <li className="kt-row">
        <span className="kt-row-label mono">Status</span>
        <span className="kt-avail">{PROFILE.available}</span>
      </li>
    </ul>
  )
}

function renderPanel(active) {
  switch (active) {
    case 'STACK': return <StackPanel />
    case 'PROJECTS': return <ProjectsPanel />
    case 'EXPERIENCE': return <ExperiencePanel />
    case 'CONTACT': return <ContactPanel />
    default: return null
  }
}

export default function KulveerTerminal() {
  const [active, setActive] = useState(null)

  const prompt = active ? active.toLowerCase() : 'select a command...'

  return (
    <motion.div
      className="kt"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="kt-head">
        <span className="kt-title mono">// KULVEER.SYS</span>
        <span className="kt-status mono">
          <span className="kt-dot" aria-hidden="true" />
          SYSTEM ONLINE
        </span>
      </div>

      <div className="kt-commands" role="tablist" aria-label="Kulveer.Sys commands">
        {COMMANDS.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            className={`kt-cmd ${active === c ? 'active' : ''}`}
            onClick={() => setActive(active === c ? null : c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="kt-prompt mono" aria-live="polite">
        <span className="kt-prompt-caret">&gt;</span> {prompt}
      </div>

      <div className="kt-body">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderPanel(active)}
            </motion.div>
          ) : (
            <motion.p
              key="idle"
              className="kt-idle mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              Select a command above to explore the system.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
