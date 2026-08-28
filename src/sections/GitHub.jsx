import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink, ArrowUpRight, AlertCircle } from 'lucide-react'
import { LINKS } from '../data'

const FALLBACK = [
  { name: 'portfolio', description: 'Modern 3D portfolio — Kulveer Singh', language: 'JavaScript', stars: 0, forks: 0 },
  { name: 'Inventory-Stock-MAnagement-System', description: 'Full-stack PHP & MySQL inventory system', language: 'PHP', stars: 0, forks: 0 },
]

export default function GitHub() {
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancel = false
    ;(async () => {
      try {
        const res = await fetch('https://api.github.com/users/KulveerSingh60/repos?per_page=8&sort=updated')
        if (!res.ok) throw new Error('failed')
        const data = await res.json()
        if (!cancel && Array.isArray(data)) setRepos(data.filter((r) => !r.fork))
      } catch {
        if (!cancel) { setError(true); setRepos(FALLBACK) }
      }
    })()
    return () => (cancel = true)
  }, [])

  return (
    <section id="github" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow justify-center"><span className="pulse-dot" /> My Code</p>
          <h2 className="section-title">GitHub <span className="accent">Repositories</span></h2>
          <p className="section-sub">
            A snapshot of my public work. Full profile at{' '}
            <a className="inline-link" href={LINKS.github} target="_blank" rel="noopener noreferrer">
              github.com/KulveerSingh60
            </a>
          </p>
        </div>

        {error && (
          <div className="gh-error">
            <AlertCircle size={16} /> Could not reach the GitHub API — showing cached highlights.
          </div>
        )}

        <div className="gh-grid">
          {repos === null
            ? Array.from({ length: 3 }).map((_, i) => <div className="gh-skeleton" key={i} />)
            : repos.slice(0, 6).map((r, i) => (
                <motion.a
                  key={r.name}
                  href={r.html_url || `${LINKS.github}/${r.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gh-card"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: (i % 3) * 0.08 }}
                >
                  <div className="gh-top">
                    <Github size={18} />
                    <span className="gh-ext"><ExternalLink size={15} /></span>
                  </div>
                  <h4 className="gh-name mono">{r.name}</h4>
                  <p className="gh-desc">{r.description || 'No description'}</p>
                  <div className="gh-meta">
                    {r.language && <span className="gh-lang"><i /> {r.language}</span>}
                    <span className="gh-stats"><Star size={14} /> {r.stargazers_count || 0}</span>
                    <span className="gh-stats"><GitFork size={14} /> {r.forks_count || 0}</span>
                  </div>
                </motion.a>
              ))}
        </div>

        <div className="gh-cta">
          <a className="btn btn-ghost" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            View GitHub Profile <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
