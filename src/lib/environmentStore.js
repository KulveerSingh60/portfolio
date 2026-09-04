/**
 * environmentStore — lightweight shared mutable environment state for the
 * reactive 3D background. No external state-management dependency.
 *
 * Design:
 *  - High-frequency values (pointer, scroll) are stored as a plain mutable
 *    object and UPDATED WITHOUT triggering React renders (ref-style).
 *  - Thematic values (activeTheme, accent RGB, intensities) use target/current
 *    pairs. The R3F frame loop reads `state.theme` and GSAP animates
 *    `state.theme` (the "current" values) toward `state.theme.target`.
 *  - A tiny pub/sub (subscribe) lets React hooks (useSectionTheme) react to
 *    theme changes only, avoiding renders on every pointer/scroll tick.
 */

const THEMES = {
  home: {
    accent: [43, 217, 139], // #2bd98b
    accentAlt: [34, 211, 238], // #22d3ee
    intensity: 0.5,
    depth: 0.5,
    distortion: 0.12,
    particle: 0.5,
    shape: 0.6,
    star: 0.45,
    atmosphere: 0.5,
  },
  about: {
    accent: [122, 162, 247],
    accentAlt: [43, 217, 139],
    intensity: 0.52,
    depth: 0.55,
    distortion: 0.15,
    particle: 0.52,
    shape: 0.55,
    star: 0.5,
    atmosphere: 0.54,
  },
  expertise: {
    accent: [34, 211, 238],
    accentAlt: [167, 139, 250],
    intensity: 0.56,
    depth: 0.58,
    distortion: 0.18,
    particle: 0.55,
    shape: 0.6,
    star: 0.54,
    atmosphere: 0.6,
  },
  work: {
    accent: [232, 164, 77],
    accentAlt: [43, 217, 139],
    intensity: 0.6,
    depth: 0.68,
    distortion: 0.2,
    particle: 0.56,
    shape: 0.55,
    star: 0.5,
    atmosphere: 0.64,
  },
  journey: {
    accent: [156, 210, 255],
    accentAlt: [122, 162, 247],
    intensity: 0.56,
    depth: 0.58,
    distortion: 0.16,
    particle: 0.62,
    shape: 0.5,
    star: 0.58,
    atmosphere: 0.58,
  },
  lab: {
    accent: [255, 122, 176],
    accentAlt: [34, 211, 238],
    intensity: 0.6,
    depth: 0.62,
    distortion: 0.28,
    particle: 0.58,
    shape: 0.56,
    star: 0.54,
    atmosphere: 0.62,
  },
  github: {
    accent: [177, 190, 202],
    accentAlt: [43, 217, 139],
    intensity: 0.54,
    depth: 0.56,
    distortion: 0.14,
    particle: 0.56,
    shape: 0.52,
    star: 0.5,
    atmosphere: 0.56,
  },
  ai: {
    accent: [147, 197, 253],
    accentAlt: [125, 211, 252],
    intensity: 0.64,
    depth: 0.72,
    distortion: 0.24,
    particle: 0.6,
    shape: 0.52,
    star: 0.6,
    atmosphere: 0.68,
  },
  contact: {
    accent: [110, 231, 183],
    accentAlt: [43, 217, 139],
    intensity: 0.48,
    depth: 0.45,
    distortion: 0.1,
    particle: 0.46,
    shape: 0.44,
    star: 0.42,
    atmosphere: 0.48,
  },
}

function cloneTheme(theme) {
  return {
    ...theme,
    accent: theme.accent.slice(),
    accentAlt: theme.accentAlt.slice(),
  }
}

const state = {
  activeTheme: 'home',
  // "current" values actually read by the frame loop; GSAP tweens them toward target.
  value: cloneTheme(THEMES.home),
  target: cloneTheme(THEMES.home),

  // High-frequency, mutable — no React renders.
  pointer: { x: 0, y: 0 },
  rawPointer: { x: 0, y: 0 },
  scroll: { progress: 0, velocity: 0, smoothedVelocity: 0 },

  // Hover emphasis multiplier (0..1).
  hoverBoost: { depth: 0, intensity: 0, particle: 0, distortion: 0 },

  reducedMotion: false,
  visible: true,

  listeners: new Set(),
}

function emit() {
  state.listeners.forEach((fn) => fn(state.activeTheme))
}

/** Set which section is active and start a smooth transition. */
export function setActiveTheme(theme) {
  if (!THEMES[theme]) theme = 'home'
  if (state.activeTheme === theme) return
  state.activeTheme = theme
  state.target = cloneTheme(THEMES[theme])
  emit()
}

/** Directly set hover boost (0..1) to lift depth/intensity near some cards. */
export function setHoverBoost(amount) {
  state.hoverBoost.depth = clamp01(amount)
  state.hoverBoost.intensity = clamp01(amount)
}

/**
 * Apply a per-section hover emphasis profile (0..1 each field). Each section
 * lifts the environment slightly differently so cards feel context-aware
 * while staying subtle. Pass `null` to clear all hover emphasis.
 */
export function setHoverProfile(boost) {
  const h = state.hoverBoost
  h.depth = 0
  h.intensity = 0
  h.particle = 0
  h.distortion = 0
  if (!boost) return
  if (boost.depth) h.depth = clamp01(boost.depth)
  if (boost.intensity) h.intensity = clamp01(boost.intensity)
  if (boost.particle) h.particle = clamp01(boost.particle)
  if (boost.distortion) h.distortion = clamp01(boost.distortion)
}

/** Update high-frequency pointer (normalized -1..1, y up). Mutable, no render. */
export function setPointer(x, y) {
  state.rawPointer.x = x
  state.rawPointer.y = y
}

/** Update scroll progress (0..1) and scroll velocity (px/frame-ish, smoothed). */
export function setScroll(progress, velocity) {
  state.scroll.progress = progress
  state.scroll.velocity = velocity
  const s = state.scroll
  s.smoothedVelocity += (velocity - s.smoothedVelocity) * 0.08
}

export function setReducedMotion(value) {
  state.reducedMotion = !!value
}

export function setVisible(value) {
  state.visible = !!value
}

export function getEnvironment() {
  return state
}

/** Subscribe to THEME changes only. Returns an unsubscribe function. */
export function subscribeEnvironment(fn) {
  state.listeners.add(fn)
  return () => state.listeners.delete(fn)
}

export function getTheme(name) {
  return name ? THEMES[name] : THEMES[state.activeTheme]
}

/** Convert an [r,g,b] 0..255 array to a '#rrggbb' hex string. */
export function themeToHex(rgb) {
  return (
    '#' +
    rgb
      .map((c) => {
        const h = Math.max(0, Math.min(255, Math.round(c))).toString(16)
        return h.length === 1 ? '0' + h : h
      })
      .join('')
  )
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

export { THEMES }
