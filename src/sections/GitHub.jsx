import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, ArrowUpRight, AlertTriangle } from 'lucide-react'
import SectionHead from '../components/SectionHead'
import { LINKS } from '../data'

const FALLBACK = [
  { name: 'portfolio', description: 'Modern 3D portfolio — Kulveer Singh', language: 'JavaScript' },
  { name: 'Inventory-Stock-MAnagement-System', description: 'Full-stack PHP & MySQL inventory system', language: 'PHP' },
  { name: 'projects', description: 'Full-stack web development projects', language: 'PHP' },
]

export default function GitHub() {
  const [repos, setRepos] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let cancel = false
    ;(async () => {
      try {
        const res = await fetch('https://api.github.com/users/KulveerSingh60/repos?per_page=8&sort=updated')
        if (!res.ok) throw new Error('failed')
        const data = await res.json()
        if (!cancel && Array.isArray(data)) setRepos(data.filter((r) => !r.fork))
        else if (!cancel) throw new Error('bad')
      } catch {
        if (!cancel) {
          setUsingFallback(true)
          setRepos(FALLBACK)
        }
      }
    })()
    return () => (cancel = true)
  }, [])

  return (
    <section id="github" className="section github">
      <div className="container">
        <SectionHead
          chapter="06"
          eyebrow="GitHub"
          title="Proof of <span class='accent'>work.</span>"
          sub={
            <>
              A live snapshot from{' '}
              <a className="inline-link" href={LINKS.github} target="_blank" rel="noopener noreferrer">
                github.com/KulveerSingh60
              </a>
            </>
          }
        />

        {usingFallback && (
          <div className="gh-note">
            <AlertTriangle size={15} /> Couldn't reach the GitHub API — showing cached highlights.
          </div>
        )}

        <div className="gh-grid">
          {repos === null
            ? Array.from({ length: 6 }).map((_, i) => <div className="gh-skeleton" key={i} />)
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
                    <ArrowUpRight size={15} />
                  </div>
                  <h4 className="gh-name mono">{r.name}</h4>
                  <p className="gh-desc">{r.description || 'No description'}</p>
                  <div className="gh-meta mono">
                    {r.language && <span className="gh-lang">{r.language}</span>}
                    {typeof r.stargazers_count !== 'undefined' && (
                      <span className="gh-stat"><Star size={14} /> {r.stargazers_count}</span>
                    )}
                    {typeof r.forks_count !== 'undefined' && (
                      <span className="gh-stat"><GitFork size={14} /> {r.forks_count}</span>
                    )}
                  </div>
                </motion.a>
              ))}
        </div>

        <div className="gh-cta">
          <a className="btn btn-ghost" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            View Full GitHub Profile <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
