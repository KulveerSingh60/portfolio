import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILL_GROUPS } from '../data'

const ICON_GLYPH = {
  php: 'PHP', javascript: 'JS', html: '<>', css: '#', bootstrap: 'B',
  responsive: 'R', ajax: 'AJ', wordpress: 'W', seo: 'SEO', builder: 'DnD',
  mysql: 'SQL', git: 'GIT', vscode: 'VS', canva: 'C',
  word: 'W', excel: 'X', ppt: 'P', tally: 'T', keyboard: '⌨',
  analytics: 'A', smm: 'SMM',
  communication: '💬', teamwork: '🤝', problem: '🧩', adaptability: '⇄', time: '⏱',
}

const COLOR = {
  php: '#8892bf', javascript: '#f7df1e', html: '#e34c26', css: '#264de4', bootstrap: '#7952b3',
  responsive: '#61dafb', ajax: '#2bd98b', wordpress: '#21759b', seo: '#8ab4f8', builder: '#a1a1aa',
  mysql: '#00758f', git: '#f05033', vscode: '#007acc', canva: '#00c4cc',
  word: '#2b579a', excel: '#217346', ppt: '#d24726', tally: '#e2e2e2', keyboard: '#a1a1aa',
  analytics: '#22d3ee', smm: '#e1306c',
  communication: '#2bd98b', teamwork: '#22d3ee', problem: '#a78bfa', adaptability: '#f59e0b', time: '#34d399',
}

export default function Skills() {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])
  const group = SKILL_GROUPS[active]

  return (
    <section id="skills" className="section alt">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow justify-center"><span className="pulse-dot" /> My Toolbox</p>
          <h2 className="section-title">Skills &amp; <span className="accent">Technologies</span></h2>
          <p className="section-sub">A modern tech stack I use to plan, build and ship web applications.</p>
        </div>

        <div className="skills-tabs" role="tablist" aria-label="Skill categories">
          {SKILL_GROUPS.map((g, i) => (
            <button
              key={g.title}
              role="tab"
              aria-selected={active === i}
              className={`skills-tab ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              {g.title}
            </button>
          ))}
        </div>

        <div className="skills-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="tabpanel"
              initial={loaded ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="skills-grid"
            >
              {group.skills.map((s) => (
                <div className="skill-card" key={s.name}>
                  <span className="skill-ic" style={{ '--sc': COLOR[s.icon] || '#2bd98b' }}>
                    {ICON_GLYPH[s.icon] || '—'}
                  </span>
                  <div className="skill-info">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-pct">{s.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
