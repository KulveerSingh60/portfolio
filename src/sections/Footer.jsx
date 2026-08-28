import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import { LINKS, SOCIALS } from '../data'

const year = new Date().getFullYear()

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <button className="footer-meta mono" onClick={scrollTop} aria-label="Back to top">
          <span className="logo-mark mono">K<span className="accent">.</span></span>
          KULVEER.SINGH
          <span className="footer-top"><ArrowUp size={14} /> Top</span>
        </button>

        <div className="footer-social">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target={s.name === 'Email' ? undefined : '_blank'}
              rel={s.name === 'Email' ? undefined : 'noopener noreferrer'}
              aria-label={s.name}
            >
              {s.name === 'Email' ? <Mail size={16} /> : s.name === 'GitHub' ? <Github size={16} /> : <Linkedin size={16} />}
            </a>
          ))}
        </div>

        <div className="footer-note mono">
          <span>© {year} Kulveer Singh</span>
          <span className="footer-divider">·</span>
          <span>Built with <Heart size={13} className="heart" /> in Punjab, India</span>
        </div>
      </div>
    </footer>
  )
}
