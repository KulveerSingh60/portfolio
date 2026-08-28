/* Centralized, optional UI interaction sound.
 * - Web Audio API only (no audio files, no external assets).
 * - Off by default; enabled via the nav toggle; persisted to localStorage.
 * - Delegated click listener -> one subtle tick per real activation.
 * - No autoplay, no hover sounds, never blocks navigation,
 *   and silently ignores any audio failure.
 */

export const SOUND_KEY = 'portfolio-sound-enabled'

const QUIET = 0.09
let enabled = false
let ctx = null
let listeners = new Set()
let bound = false

function getCtx() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    try {
      ctx = new AC()
    } catch {
      ctx = null
    }
  }
  return ctx
}

function tick() {
  const ac = getCtx()
  if (!ac) return
  try {
    if (ac.state === 'suspended') ac.resume()
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    const t = ac.currentTime
    osc.type = 'sine'
    osc.frequency.value = 1250
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(QUIET, t + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.start(t)
    osc.stop(t + 0.07)
  } catch {
    /* audio must never break the site */
  }
}

function onClick(e) {
  if (!enabled) return
  if (!e.target || !e.target.closest) return
  const el = e.target.closest('a, button, [role="button"]')
  if (!el) return
  if (el.hasAttribute('data-sound-off')) return
  tick()
}

export function initSound() {
  if (typeof window === 'undefined') return
  try {
    enabled = localStorage.getItem(SOUND_KEY) === '1'
  } catch {
    enabled = false
  }
  if (!bound) {
    document.addEventListener('click', onClick, { passive: true })
    bound = true
  }
}

export function isSoundEnabled() {
  return enabled
}

export function setSoundEnabled(value) {
  enabled = !!value
  try {
    if (enabled) localStorage.setItem(SOUND_KEY, '1')
    else localStorage.removeItem(SOUND_KEY)
  } catch {
    /* ignore storage errors */
  }
  listeners.forEach((fn) => fn(enabled))
}

export function subscribeSound(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function playClick() {
  if (enabled) tick()
}
