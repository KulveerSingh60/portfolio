import { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import SectionBoundary from '../components/SectionBoundary'
import Marquee from '../components/Marquee'
import HeroFallback from '../components/3d/HeroFallback'
import { PROFILE, SOCIALS } from '../data'
import { useIsMobile } from '../hooks/useMedia'

const HeroScene = lazy(() => import('../components/3d/HeroScene'))

const line1 = 'KULVEER'
const line2 = 'SINGH'

export default function Hero() {
  const [play, setPlay] = useState(false)
  const mobile = useIsMobile()

  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.div
            className="hero-tag mono"
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            <span className="hero-status" /> {PROFILE.available}
          </motion.div>

          <h1 className="hero-title" aria-label={`${line1} ${line2} full-stack developer`}>
            <span className="hero-line" aria-hidden="true">
              {line1.split('').map((c, i) => (
                <motion.span
                  className="hero-char mono"
                  key={i}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={play ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i }}
                >
                  {c}
                </motion.span>
              ))}
            </span>
            <span className="hero-line" aria-hidden="true">
              {line2.split('').map((c, i) => (
                <motion.span
                  className="hero-char mono hero-char-accent"
                  key={i}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={play ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 + 0.05 * i }}
                >
                  {c}
                </motion.span>
              ))}
            </span>
            <span className="hero-line hero-role" aria-hidden="true">
              <span className="hero-role-mark mono">FULL-STACK</span>
              <span className="hero-role-mark mono hero-role-accent">DEVELOPER<span className="hero-dot">.</span></span>
            </span>
          </h1>

          <motion.p
            className="hero-statement"
            initial={{ opacity: 0, y: 16 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {PROFILE.statement} Building real-world apps with{' '}
            <span className="accent">PHP, MySQL &amp; JavaScript</span> — clean, responsive,
            built to perform.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            <a className="btn btn-primary" href="#work">
              Explore Work <ArrowDown size={18} />
            </a>
            <a
              className="btn btn-ghost"
              href={SOCIALS[1].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View LinkedIn <ArrowUpRight size={18} />
            </a>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a href={SOCIALS[0].url} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href={SOCIALS[1].url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={SOCIALS[2].url} aria-label="Email"><Mail size={18} /></a>
            <span className="hero-socials-line" />
          </motion.div>
        </div>

        <motion.div
          className="hero-3d"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={play ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <SectionBoundary fallback={<HeroFallback />}>
            <Suspense fallback={<HeroFallback />}>
              <HeroScene />
            </Suspense>
          </SectionBoundary>
        </motion.div>
      </div>

      <Marquee />
    </section>
  )
}
