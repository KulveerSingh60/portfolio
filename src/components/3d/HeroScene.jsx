import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows, Html } from '@react-three/drei'
import { useIsMobile, useWebGL } from '../../hooks/useMedia'
import HeroFallback from './HeroFallback'

function Monitor({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.95, 0.6, 0.035]} />
        <meshStandardMaterial color="#111317" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.87, 0.52]} />
        <meshBasicMaterial color="#0a0c10" />
      </mesh>
      <mesh position={[0, -0.33, 0]}>
        <boxGeometry args={[0.05, 0.34, 0.03]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.28, 0.02, 0.02]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  )
}

function ScreenGlow({ position, width = 1.1, height = 0.9 }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color="#2bd98b" transparent opacity={0.05} />
    </mesh>
  )
}

function Laptop({ position }) {
  return (
    <group position={position}>
      <group rotation={[0, 0, 0]}>
        <mesh position={[0, 0.05, -0.16]} rotation={[-0.35, 0, 0]}>
          <boxGeometry args={[0.84, 0.58, 0.02]} />
          <meshStandardMaterial color="#16181c" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.05, -0.17]} rotation={[-0.35, 0, 0]}>
          <boxGeometry args={[0.78, 0.52, 0.01]} />
          <meshBasicMaterial color="#0a0c10" />
        </mesh>
      </group>
      <mesh position={[0, -0.05, 0.1]} rotation={[-0.06, 0, 0]}>
        <boxGeometry args={[0.76, 0.022, 0.52]} />
        <meshStandardMaterial color="#1a1d21" metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  )
}

function CodePanel({ position, rotation = [0, 0, 0], scale = 1 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.6 + position[0]) * 0.04
  })
  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={ref} position={position} rotation={rotation} scale={scale}>
        <mesh>
          <boxGeometry args={[1.35, 0.8, 0.04]} />
          <meshStandardMaterial color="#14161a" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[1.25, 0.7]} />
          <meshBasicMaterial color="#0a0c10" />
        </mesh>
        <mesh position={[0, 0.34, 0.03]}>
          <planeGeometry args={[1.05, 0.05]} />
          <meshBasicMaterial color="#2bd98b" />
        </mesh>
      </group>
    </Float>
  )
}

function FloatShape({ position, size = 0.12, color = '#2bd98b', speed = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1}>
      <mesh position={position}>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
      </mesh>
    </Float>
  )
}

function Rig({ children }) {
  const group = useRef()
  useFrame((state) => {
    const { pointer } = state
    if (!group.current) return
    group.current.rotation.y += (pointer.x * 0.16 - group.current.rotation.y) * 0.05
    group.current.rotation.x += (-pointer.y * 0.09 - group.current.rotation.x) * 0.05
  })
  return <group ref={group}>{children}</group>
}

export default function HeroScene() {
  const webgl = useWebGL()
  const mobile = useIsMobile()

  if (!webgl) return <HeroFallback />

  return (
    <Canvas
      dpr={[1, mobile ? 1.5 : 2]}
      camera={{ position: [0, 0.6, 4.8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ height: '100%', width: '100%' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#22d3ee" />
      <pointLight position={[0, 2, 1]} intensity={0.5} color="#2bd98b" />

      <Suspense fallback={<Html center>Loading 3D…</Html>}>
        <Rig>
          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
            <group position={[0, 0.15, 0]}>
              <Monitor position={[0.85, 0.1, 0]} />
              <Laptop position={[-0.82, 0.08, 0.05]} />
              <CodePanel position={[0, 1.1, -0.5]} scale={0.92} />
              <ScreenGlow position={[0.85, 0.12, 0.1]} />
            </group>
          </Float>

          <FloatShape position={[-1.75, 0.9, -0.5]} size={0.09} color="#22d3ee" speed={1.4} />
          <FloatShape position={[1.72, -0.55, -0.7]} size={0.06} color="#2bd98b" speed={1.8} />
        </Rig>
        <ContactShadows position={[0, -0.62, 0]} opacity={0.5} scale={6} blur={2.8} far={2.5} />
      </Suspense>
    </Canvas>
  )
}
