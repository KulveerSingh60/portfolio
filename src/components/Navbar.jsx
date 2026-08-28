import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github } from 'lucide-react'
import { LINKS } from '../data'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      let current = 'home'
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id)
        if (el && el.getBoundingClientRect().top <= 120) current = link.id
      }
      setActive(current)
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
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner container">
          <button className="nav-logo" onClick={() => go('home')} aria-label="Go to top">
            <span className="logo-mark">K</span>
            <span className="logo-text">kulveer<span className="accent">.dev</span></span>
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
            <a
              className="nav-cta"
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} /> GitHub
            </a>
          </nav>

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
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              {NAV_LINKS.map((l) => (
                <motion.button
                  key={l.id}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  className="mobile-link"
                  onClick={() => go(l.id)}
                >
                  <span className="num">0{NAV_LINKS.indexOf(l) + 1}</span> {l.label}
                </motion.button>
              ))}
              <motion.a
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                className="mobile-link mobile-github"
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} /> github.com/KulveerSingh60
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
