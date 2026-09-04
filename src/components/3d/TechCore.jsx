import { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import { useRef } from 'react'
import { useIsMobile, useWebGL } from '../../hooks/useMedia'

const TECHS = [
  'PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3',
  'Bootstrap', 'AJAX', 'WordPress', 'Git', 'SEO',
]

function Core({ motionScale = 1 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.35 * motionScale
  })
  return (
    <group ref={ref}>
      <mesh>
        <torusKnotGeometry args={[0.55, 0.16, 120, 20]} />
        <meshStandardMaterial color="#1a1c22" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshStandardMaterial color="#2bd98b" metalness={0.4} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Orbiting({ motionScale = 1 }) {
  const group = useRef()
  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.children.forEach((child, i) => {
      const speed = (0.5 + (i % 3) * 0.2) * motionScale
      const angle = t * speed + (i / TECHS.length) * Math.PI * 2
      child.position.x = Math.cos(angle) * 2.1
      child.position.y = Math.sin(angle * 1.4) * 0.9
      child.position.z = Math.sin(angle) * 0.6
    })
  })
  return (
    <group ref={group}>
      {TECHS.map((t, i) => (
        <mesh key={t} position={[2.1, 0, 0]}>
          <Html center position={[0, 0, 0]} style={{ pointerEvents: 'none' }}>
            <span className="tech-tag mono">{t}</span>
          </Html>
        </mesh>
      ))}
    </group>
  )
}

export default function TechCore() {
  const webgl = useWebGL()
  const mobile = useIsMobile()
  const [reduced, setReduced] = useState(false)

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

  if (!webgl) {
    return (
      <div className="techcore-fallback mono">
        {TECHS.map((t) => <span key={t}>{t}</span>)}
      </div>
    )
  }

  const motionScale = reduced ? 0 : 1

  return (
    <Canvas
      dpr={[1, mobile ? 1.4 : 2]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ height: '100%', width: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#2bd98b" />
      <Suspense fallback={null}>
        <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.3} floatIntensity={reduced ? 0 : 0.6}>
          <Core motionScale={motionScale} />
        </Float>
        <Orbiting motionScale={motionScale} />
      </Suspense>
    </Canvas>
  )
}
