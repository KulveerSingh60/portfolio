import { useEffect } from 'react'
import { gsap } from '../lib/motion'
import {
  getEnvironment,
  setActiveTheme,
  setHoverProfile,
  subscribeEnvironment,
} from '../lib/environmentStore'

/**
 * useSectionTheme — the ONE shared mechanism that:
 *  1. Observes [data-bg-theme] sections (IntersectionObserver) and activates
 *     the theme of the section occupying the viewport.
 *  2. Smoothly transitions the environment's current values toward the theme
 *     using GSAP (no competing loops; per-frame GPU lerp adds micro-smoothing).
 *  3. Adds hover emphasis (depth/intensity boost) for Expertise/Work/Lab/AI
 *     cards via document-level event delegation.
 *
 * Mounts once in App. Fully cleaned up on unmount.
 */

export default function useSectionTheme() {
  useEffect(() => {
    const env = getEnvironment()
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')

    // ---- GSAP transition: env.value -> env.target ----
    let tweens = []
    const animateTo = (target) => {
      tweens.forEach((t) => t.kill())
      tweens = []
      const obj = env.value
      const props = {}
      Object.keys(target).forEach((k) => {
        if (Array.isArray(target[k])) {
          target[k].forEach((c, i) => {
            props[k + '_' + i] = c
          })
        } else if (k !== 'accent' && k !== 'accentAlt') {
          props[k] = target[k]
        }
      })
      const proxy = {}
      Object.keys(props).forEach((p) => {
        const [key, idx] = p.split('_')
        proxy[p] = idx !== undefined ? obj[key][Number(idx)] : obj[key]
      })
      const tw = gsap.to(proxy, {
        ...props,
        duration: reducedMq.matches ? 0 : 0.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          Object.keys(props).forEach((p) => {
            const [key, idx] = p.split('_')
            if (idx !== undefined) obj[key][Number(idx)] = proxy[p]
            else obj[key] = proxy[p]
          })
        },
      })
      tweens.push(tw)
    }
    animateTo(env.target)

    // subscribe to theme changes from the observer
    const unsub = subscribeEnvironment((theme) => {
      animateTo(env.target)
      void theme
    })

    // ---- IntersectionObserver for active section ----
    const sections = Array.from(document.querySelectorAll('[data-bg-theme]'))
    const visible = new Map()
    sections.forEach((s) => visible.set(s, false))

    const io = new IntersectionObserver(
      (entries) => {
        let best = null
        let bestRatio = 0
        entries.forEach((e) => {
          visible.set(e.target, e.isIntersecting)
        })
        // pick the section with the greatest intersection ratio
        visible.forEach((isOn, el) => {
          if (isOn) {
            const r = el.getBoundingClientRect()
            const ratio = Math.min(1, Math.max(0, r.height / window.innerHeight))
            if (ratio > bestRatio) {
              bestRatio = ratio
              best = el
            }
          }
        })
        if (best) setActiveTheme(best.getAttribute('data-bg-theme'))
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.1, 0.4, 0.7] }
    )
    sections.forEach((s) => io.observe(s))
    // initialize
    setActiveTheme(document.querySelector('.hero')?.getAttribute('data-bg-theme') || 'home')

    // ---- Hover emphasis via document-level delegation ----
    // Each card type lifts the environment a little differently so the scene
    // feels context-aware while staying subtle. Values are smoothed with GSAP.
    const PROFILES = {
      // expertise items -> subtle star/particle brightness lift
      '.expertise-item': { particle: 0.4 },
      // projects -> deeper space / stronger depth
      '.project-row': { depth: 0.6 },
      '.project-list-row': { depth: 0.6 },
      // lab -> subtle distortion / particle energy
      '.lab-card': { distortion: 0.5, particle: 0.4 },
      // KULVEER.AI -> slightly stronger digital atmosphere
      '.ai-section': { intensity: 0.35 },
    }

    const sectionOf = (node) =>
      Object.keys(PROFILES).find((sel) => node.closest && node.closest(sel))

    const tween = (to) => {
      if (reducedMq.matches) {
        setHoverProfile(to)
        return
      }
      gsap.to(env.hoverBoost, { ...to, duration: 0.4, ease: 'power2.out' })
    }

    const onOver = (e) => {
      const t = e.target
      if (t instanceof Element) {
        const sel = sectionOf(t)
        if (sel) tween(PROFILES[sel])
      }
    }
    const onOut = (e) => {
      const t = e.target
      if (t instanceof Element && sectionOf(t)) tween({})
    }
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)

    return () => {
      io.disconnect()
      unsub()
      tweens.forEach((t) => t.kill())
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      setHoverProfile(null)
    }
  }, [])
}
