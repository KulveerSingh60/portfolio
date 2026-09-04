import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import ProjectDevice from '../../components/3d/ProjectDevice'
import { stopSmoothScroll, startSmoothScroll } from '../../lib/motion'

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function CaseStudy({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const prevFocus = document.activeElement

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return

      const card = dialogRef.current.querySelector('.modal-card')
      const focusables = Array.from(card.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      )
      if (focusables.length === 0) {
        e.preventDefault()
        card.focus && card.focus()
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    stopSmoothScroll()
    window.addEventListener('keydown', onKey)

    if (closeRef.current) closeRef.current.focus()

    return () => {
      document.body.style.overflow = ''
      startSmoothScroll()
      window.removeEventListener('keydown', onKey)
      if (prevFocus && prevFocus.focus && prevFocus.focus instanceof Function) prevFocus.focus()
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        className="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="modal-card"
          tabIndex={-1}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close case study">
            <X size={20} />
          </button>

          <div className="modal-visual">
            <ProjectDevice visual={project.visual} />
            <div className="modal-visual-tag mono" style={{ color: project.accent }}>
              {project.number} / CASE STUDY
            </div>
          </div>

          <div className="modal-body">
            <div className="modal-meta mono">
              <span style={{ color: project.accent }}>{project.number}</span>
              <span>{project.tag}</span>
            </div>
            <h3 className="modal-title">{project.title}</h3>
            {project.role && <p className="modal-role mono">{project.role}</p>}

            {project.problem && (
              <div className="modal-block">
                <h4 className="modal-h mono">The Problem</h4>
                <p>{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div className="modal-block">
                <h4 className="modal-h mono">The Solution</h4>
                <p>{project.solution}</p>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <div className="modal-block">
                <h4 className="modal-h mono">Features</h4>
                <ul className="modal-list">
                  {project.features.map((f, i) => (
                    <li key={i}><span className="modal-list-dot" style={{ background: project.accent }} />{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <div className="modal-tech mono">
              {project.tech.map((t) => <span key={t} className="tech-chip">{t}</span>)}
            </div>
            <div className="modal-actions">
              {project.github && (
                <a className="btn btn-ghost sm" href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github size={16} /> GitHub
                </a>
              )}
              {project.demo && (
                <a className="btn btn-primary sm" href={project.demo} target="_blank" rel="noopener noreferrer">
                  Live Demo <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
