import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const STEPS = [
  'Initializing experience',
  'Loading 3D environment',
  'Loading projects',
  'Loading developer profile',
]

const STEP_MS = 300
const TOTAL_MS = STEPS.length * STEP_MS + 420
const FAILSAFE_MS = 5200

export default function Loader({ onDone }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      onDone()
    }

    const timers = []
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), (i + 1) * STEP_MS))
    })
    timers.push(setTimeout(finish, TOTAL_MS))
    // Hard failsafe — a stuck loader must never blank the site.
    timers.push(setTimeout(finish, FAILSAFE_MS))
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  useEffect(() => {
    const onKey = (e) => e.key === 'Enter' && onDone()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDone])

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loader-inner">
        <div className="loader-mark mono">K<span>.</span></div>
        <div className="loader-label mono">kulveer/<span className="accent">dev</span></div>
        <div className="loader-progress">
          <motion.span
            className="loader-progress-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step / STEPS.length }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        <div className="loader-lines mono">
          {STEPS.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: i < step ? 1 : 0.28 }}
              className={i < step ? 'done' : ''}
            >
              <span className="prompt">{i < step ? '✓' : '>'}</span> {line}
              {i === step - 1 && <span className="caret" aria-hidden="true" />}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
