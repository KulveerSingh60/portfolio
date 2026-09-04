import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = ['PROFILE', 'EDUCATION', 'EXPERIENCE', 'FOCUS']

const tabId = (t) => `about-tab-${t.toLowerCase()}`
const panelId = (t) => `about-panel-${t.toLowerCase()}`

const aboutCopy = (label) => (
  <>
    <div className="about-tab-head mono">
      <span className="about-tab-chapter">0{TABS.indexOf(label) + 1}</span>
      <span>{label}</span>
    </div>
    <p className="about-tab-lead">{label === 'PROFILE' ? 'Full-stack web developer focused on building practical, responsive and well-crafted digital experiences. I enjoy turning ideas into functional products and continuously improving my technical skills.' : ''}</p>
  </>
)

function Panel({ tab }) {
  switch (tab) {
    case 'EDUCATION':
      return (
        <>
          {aboutCopy(tab)}
          <ul className="about-tab-list">
            <li>
              <strong>Bachelor of Computer Applications (BCA)</strong>
              <span className="about-tab-sub">Guru Kashi University</span>
            </li>
          </ul>
        </>
      )
    case 'EXPERIENCE':
      return (
        <>
          {aboutCopy(tab)}
          <ul className="about-tab-list">
            <li>
              <span className="about-tab-sub">12+ months of hands-on experience across web development, digital marketing and business computing.</span>
            </li>
          </ul>
        </>
      )
    case 'FOCUS':
      return (
        <>
          {aboutCopy(tab)}
          <ul className="about-tab-list">
            <li>
              <span className="about-tab-sub">Full-stack web development, PHP, MySQL, JavaScript, React, responsive interfaces and interactive web experiences.</span>
            </li>
          </ul>
        </>
      )
    default:
      return (
        <>
          {aboutCopy(tab)}
        </>
      )
  }
}

export default function AboutTabs() {
  const [tab, setTab] = useState('PROFILE')
  const tabsRef = useRef([])

  const select = (next) => {
    setTab(next)
    const el = tabsRef.current[TABS.indexOf(next)]
    if (el) el.focus()
  }

  const onKeyDown = (e) => {
    const idx = TABS.indexOf(tab)
    let next = null
    if (e.key === 'Home') {
      e.preventDefault()
      next = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      next = TABS.length - 1
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      next = (idx + 1) % TABS.length
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      next = (idx - 1 + TABS.length) % TABS.length
    }
    if (next !== null && next !== idx) select(TABS[next])
  }

  return (
    <div className="about-tabs">
      <div className="about-tabs-nav" role="tablist" aria-label="About">
        {TABS.map((t, i) => (
          <button
            key={t}
            ref={(el) => (tabsRef.current[i] = el)}
            role="tab"
            id={tabId(t)}
            aria-controls={panelId(t)}
            aria-selected={tab === t}
            tabIndex={tab === t ? 0 : -1}
            className={`about-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
            onKeyDown={onKeyDown}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="about-tabs-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            role="tabpanel"
            id={panelId(tab)}
            aria-labelledby={tabId(tab)}
            tabIndex={0}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Panel tab={tab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
