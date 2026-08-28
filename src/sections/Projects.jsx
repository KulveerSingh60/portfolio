import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, GitBranch, Check } from 'lucide-react'
import { PROJECTS, PROJECT_FILTERS } from '../data'
import ProjectDevice from '../components/3d/ProjectDevice'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.filters.includes(filter))

  return (
    <section id="projects" className="section alt">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow justify-center"><span className="pulse-dot" /> Featured Work</p>
          <h2 className="section-title">Selected <span className="accent">Projects</span></h2>
        </div>

        <div className="filter-row" role="tablist" aria-label="Filter projects">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-list">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                className={`project-row ${i % 2 === 1 ? 'reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="project-visual">
                  <ProjectDevice visual={p.visual} />
                </div>

                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-number mono">/0{p.number}</span>
                    <span className="project-tag mono">{p.tag}</span>
                  </div>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>

                  <ul className="project-features">
                    {p.features.map((f) => (
                      <li key={f}><Check size={15} /> {f}</li>
                    ))}
                  </ul>

                  <div className="project-chips">
                    {p.tech.map((t) => (
                      <span className="chip mono" key={t}>{t}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a className="btn btn-ghost sm" href={p.github} target="_blank" rel="noopener noreferrer">
                      <GitBranch size={16} /> Code
                    </a>
                    <a className="btn btn-primary sm" href={p.github} target="_blank" rel="noopener noreferrer">
                      View Project <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
