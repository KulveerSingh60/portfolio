import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const STEPS = [
  'Initializing portfolio...',
  'Loading 3D environment ✓',
  'Loading projects ✓',
  'Loading developer profile ✓',
]

export default function Loader({ onDone }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = []
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), (i + 1) * 260))
    })
    timers.push(setTimeout(onDone, STEPS.length * 260 + 260))
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loader-inner">
        <div className="loader-mark">K<span>.</span></div>
        <div className="loader-bar">
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: `${(step / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="loader-lines" aria-live="polite">
          {STEPS.slice(0, step).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className={i === step - 1 ? 'active' : ''}
            >
              <span className="prompt">{'>'}</span> {line}
            </motion.p>
          ))}
          {STEPS.slice(step).map((line, i) => (
            <motion.p
              key={'pending' + i}
              initial={{ opacity: 0.25 }}
              className="pending"
            >
              <span className="prompt">{'>'}</span> {line}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
