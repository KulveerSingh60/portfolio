import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { LINKS } from '../data'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand mono">kulveer<span className="accent">.dev</span></p>
        <div className="footer-social">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={16} /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a href={LINKS.email} aria-label="Email"><Mail size={16} /></a>
        </div>
        <p className="footer-note">
          © {year} Kulveer Singh · Built with <Heart size={13} className="heart" /> and code · Designed in Punjab, India
        </p>
      </div>
    </footer>
  )
}
