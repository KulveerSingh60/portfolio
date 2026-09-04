import { useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import GradientPlane from './background/GradientPlane'
import Particles from './background/Particles'
import FloatingShapes from './background/FloatingShapes'
import { useIsMobile, useWebGL } from '../../hooks/useMedia'
import {
  getEnvironment,
  setPointer,
  setScroll,
  setReducedMotion,
  setVisible,
} from '../../lib/environmentStore'
import { getSmoothScroll } from '../../lib/motion'

/**
 * CameraRig — a small background camera. Subtle parallax from the pointer and
 * a tiny depth shift from scroll velocity, both damped toward neutral so the
 * scene gently breathes. Never affects page layout (canvas is fixed behind).
 */
function CameraRig({ reduced }) {
  const camera = useThree((s) => s.camera)
  const env = getEnvironment()

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const k = 1 - Math.pow(0.008, dt)
    const s = env.scroll
    const mag = Math.min(0.8, Math.abs(s.smoothedVelocity) * 0.014)

    // target: pointer parallax + velocity depth nudge
    const tx = reduced ? 0 : env.pointer.x * 0.95
    const ty = reduced ? 0 : env.pointer.y * 0.6
    const tz = 8 + (reduced ? 0 : s.smoothedVelocity * 0.05)

    camera.position.x += (tx - camera.position.x) * k
    camera.position.y += (ty - camera.position.y) * k
    camera.position.z += (tz + mag - camera.position.z) * k

    // gentle look-at keeps the star field centered as the camera drifts
    camera.lookAt(0, 0, -8)
  })
  return null
}

/**
 * ReactiveBackground — the single GLOBAL full-viewport 3D environment.
 * Position: fixed, behind content, pointer-events none. One R3F Canvas =>
 * ONE WebGL renderer + ONE rAF render loop shared by all child layers.
 *
 * Reduced motion: the Canvas is NOT mounted; a static CSS gradient is used
 * instead, so no continuous WebGL/animation work occurs.
 *
 * pointer / scroll / visibility / reduced-motion listeners live in <Driver/>
 * and are fully cleaned up when the canvas unmounts.
 */

function Driver({ mobile }) {
  useEffect(() => {
    const env = getEnvironment()
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const setReduced = () => {
      const on = reducedMq.matches
      setReducedMotion(on)
      env.reducedMotion = on
    }
    setReduced()
    if (reducedMq.addEventListener) reducedMq.addEventListener('change', setReduced)
    else if (reducedMq.addListener) reducedMq.addListener(setReduced)

    // Pointer (normalized -1..1, y up). Mutable, no React render.
    const onPointer = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -((e.clientY / window.innerHeight) * 2 - 1)
      setPointer(nx, ny)
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    // Scroll via existing Lenis (no second scroll system). Falls back to
    // native scroll events when Lenis is inactive (e.g. reduced motion).
    let lenis = getSmoothScroll()
    const onScroll = (y, vel) => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setScroll(Math.min(1, y / max), vel || 0)
    }
    const bindLenis = () => {
      const l = getSmoothScroll()
      if (l === lenis) return
      if (lenis) lenis.off && lenis.off('scroll', onScroll)
      lenis = l
      if (lenis && lenis.on) lenis.on('scroll', () => onScroll(lenis.actualScroll, lenis.velocity))
    }
    bindLenis()
    const iv = setInterval(bindLenis, 1500)
    const onNative = () => onScroll(window.scrollY, 0)
    window.addEventListener('scroll', onNative, { passive: true })

    // Visibility — pause heavy read when tab hidden.
    const onVis = () => {
      const hidden = document.hidden
      setVisible(!hidden)
      env.visible = !hidden
      env.scroll.velocity = 0
    }
    document.addEventListener('visibilitychange', onVis)
    onVis()

    return () => {
      setPointer(0, 0)
      setScroll(0, 0)
      if (reducedMq.removeEventListener) reducedMq.removeEventListener('change', setReduced)
      else if (reducedMq.removeListener) reducedMq.removeListener(setReduced)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onNative)
      if (lenis && lenis.off) lenis.off('scroll', onScroll)
      clearInterval(iv)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [mobile])

  return null
}

export default function ReactiveBackground() {
  const webgl = useWebGL()
  const mobile = useIsMobile()
  const [reduced, setReduced] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    if (mq.addEventListener) mq.addEventListener('change', update)
    else if (mq.addListener) mq.addListener(update)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update)
      else if (mq.removeListener) mq.removeListener(update)
    }
  }, [])

  // Pause the renderer entirely when the tab is hidden.
  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  if (!webgl || reduced) {
    // Static, calm CSS gradient — no WebGL under reduced motion / no WebGL.
    return <div className="bg-static" aria-hidden="true" />
  }

  const particleCount = mobile ? 500 : 1800

  return (
    <div className="reactive-bg" aria-hidden="true">
      <Canvas
        frameloop={hidden ? 'never' : 'always'}
        dpr={[1, mobile ? 1.4 : 2]}
        camera={{ position: [0, 0, 8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 6]} intensity={0.8} />
        <pointLight position={[0, 3, 2]} intensity={0.4} color="#2bd98b" />

        <GradientPlane />
        <Particles count={particleCount} />
        <FloatingShapes />

        <CameraRig reduced={reduced} />
        <Driver mobile={mobile} />
      </Canvas>
    </div>
  )
}
