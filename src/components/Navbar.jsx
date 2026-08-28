import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, ArrowUpRight } from 'lucide-react'
import { LINKS, SOCIALS } from '../data'
import SoundToggle from './SoundToggle'

const NAV_LINKS = [
  { id: 'home', label: 'Home', num: '01' },
  { id: 'about', label: 'About', num: '02' },
  { id: 'expertise', label: 'Expertise', num: '03' },
  { id: 'work', label: 'Work', num: '04' },
  { id: 'experience', label: 'Journey', num: '05' },
  { id: 'lab', label: 'Lab', num: '06' },
  { id: 'github', label: 'GitHub', num: '07' },
  { id: 'contact', label: 'Contact', num: '08' },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      setHidden(y > 140 && y > lastY)

      let current = 'home'
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id)
        if (el && el.getBoundingClientRect().top <= 140) current = link.id
      }
      setActive(current)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  const go = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}${hidden ? ' hidden' : ''}`}>
        <div className="nav-inner container">
          <button className="nav-logo" onClick={() => go('home')} aria-label="Back to top">
            <span className="logo-mark mono">K<span className="accent">.</span></span>
            <span className="logo-text mono">KULVEER.SINGH</span>
          </button>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                className={`nav-link ${active === l.id ? 'active' : ''}`}
                onClick={() => go(l.id)}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <SoundToggle />

          <a
            className="nav-resume"
            href={SOCIALS[1].url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View LinkedIn <ArrowUpRight size={14} />
          </a>

          <button
            className="nav-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              className="mobile-links"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              aria-label="Mobile"
            >
              {NAV_LINKS.map((l) => (
                <motion.button
                  key={l.id}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  className="mobile-link"
                  onClick={() => go(l.id)}
                >
                  <span className="num mono">{l.num}</span>
                  <span className="mobile-link-label">{l.label}</span>
                  <ArrowUpRight size={18} className="mobile-link-arrow" />
                </motion.button>
              ))}
            </motion.nav>
            <div className="mobile-menu-social">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
