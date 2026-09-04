import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, LayoutGrid, Rows3 } from 'lucide-react'
import SectionBoundary from '../../components/SectionBoundary'
import SectionHead from '../../components/SectionHead'
import ProjectDevice from '../../components/3d/ProjectDevice'
import CaseStudy from './CaseStudy'
import { PROJECTS, PROJECT_FILTERS } from '../../data'

export default function Projects() {
  const [view, setView] = useState('gallery')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.filters.includes(filter))

  return (
    <section id="work" className="section work" data-bg-theme="work">
      <div className="container">
        <div className="work-head">
          <SectionHead
            chapter="03"
            eyebrow="Selected Work"
            title="Things I've <span class='accent'>built</span>."
            sub="A selection of real projects from my internships and training."
          />

          <div className="work-tools">
            <div className="work-filters" role="group" aria-label="Filter projects">
              {PROJECT_FILTERS.map((f) => (
                <button
                  key={f}
                  className={`filter-chip mono ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="work-viewswitch" role="group" aria-label="View mode">
              <button
                className={`view-switch ${view === 'gallery' ? 'active' : ''}`}
                onClick={() => setView('gallery')}
                aria-label="Gallery view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`view-switch ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <Rows3 size={16} />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view + filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'gallery' ? (
              <div className="projects-gallery">
                {filtered.map((p, i) => (
                  <motion.article
                    key={p.id}
                    className={`project-row ${i % 2 === 1 ? 'reverse' : ''}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="project-visual">
                      <span className="project-num mono" style={{ color: p.accent }}>{p.number}</span>
                      <ProjectDevice visual={p.visual} />
                    </div>

                    <div className="project-info">
                      <div className="project-tag mono" style={{ color: p.accent }}>{p.tag}</div>
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-desc">{p.description}</p>
                      <div className="project-tech mono">
                        {p.tech.map((t) => <span key={t} className="tech-chip">{t}</span>)}
                      </div>
                      <div className="project-links">
                        <button className="btn btn-primary sm" onClick={() => setSelected(p)}>
                          View Case Study
                        </button>
                        {p.demo && (
                          <a className="btn btn-live sm" href={p.demo} target="_blank" rel="noopener noreferrer">
                            <ArrowUpRight size={16} /> Live
                          </a>
                        )}
                        {p.github && (
                          <a className="btn btn-ghost sm" href={p.github} target="_blank" rel="noopener noreferrer">
                            <ArrowUpRight size={16} /> GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="projects-list">
                {filtered.map((p, i) => (
                  <motion.button
                    key={p.id}
                    className="project-list-row"
                    onClick={() => setSelected(p)}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    <span className="pl-num mono" style={{ color: p.accent }}>{p.number}</span>
                    <span className="pl-title">{p.title}</span>
                    <span className="pl-tags mono">{p.tech.join(' · ')}</span>
                    <ArrowUpRight size={18} className="pl-arrow" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <SectionBoundary fallback={null}>
        <AnimatePresence>
          {selected && <CaseStudy project={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      </SectionBoundary>
    </section>
  )
}
