import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, FileDown, Github, Linkedin, Mail } from 'lucide-react'
import { LINKS, PROFILE } from '../data'

const HeroScene = lazy(() => import('../components/3d/HeroScene'))

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-text">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0} className="eyebrow">
            <span className="pulse-dot" /> {PROFILE.available}
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="hero-title">
            {PROFILE.firstName}
            <br />
            <span className="gradient-text">{PROFILE.role.toUpperCase()}</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="hero-sub mono">
            <span className="prompt">&gt;</span> {PROFILE.subLine}
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="hero-para">
            {PROFILE.tagline}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowUpRight size={18} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              <FileDown size={18} /> Download Resume
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5} className="hero-social">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={LINKS.email} aria-label="Email">
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <Suspense fallback={<HeroFallbackFallback />}>
            <HeroScene />
          </Suspense>
        </div>
      </div>

      <motion.a
        href="#about"
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll down to About"
      >
        <ArrowDown size={16} />
        <span>SCROLL</span>
      </motion.a>
    </section>
  )
}

function HeroFallbackFallback() {
  return <div className="hero-fallback-loading mono">Initializing 3D…</div>
}
