import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows, Html, Sparkles } from '@react-three/drei'
import { useIsMobile, useWebGL } from '../../hooks/useMedia'
import HeroFallback from './HeroFallback'

function Monitor({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.05, 0.66, 0.035]} />
        <meshStandardMaterial color="#111317" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.95, 0.56]} />
        <meshBasicMaterial color="#0a0c10" />
      </mesh>
      <mesh position={[0.16, 0.16, 0.022]}>
        <planeGeometry args={[0.3, 0.05]} />
        <meshBasicMaterial color="#2bd98b" />
      </mesh>
      <mesh position={[0, 0.16, 0.022]}>
        <planeGeometry args={[0.6, 0.02]} />
        <meshBasicMaterial color="#1f232b" />
      </mesh>
      <mesh position={[-0.36, 0.05, 0.022]}>
        <planeGeometry args={[0.62, 0.02]} />
        <meshBasicMaterial color="#1f232b" />
      </mesh>
      <mesh position={[-0.36, 0.0, 0.022]}>
        <planeGeometry args={[0.44, 0.02]} />
        <meshBasicMaterial color="#1f232b" />
      </mesh>
      <mesh position={[0, -0.37, 0]}>
        <boxGeometry args={[0.05, 0.36, 0.03]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.555, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Laptop({ position }) {
  return (
    <group position={position}>
      <group rotation={[-0.32, 0.05, 0]}>
        <mesh position={[0, 0.05, -0.16]}>
          <boxGeometry args={[0.78, 0.54, 0.02]} />
          <meshStandardMaterial color="#16181c" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.05, -0.165]}>
          <boxGeometry args={[0.72, 0.48, 0.01]} />
          <meshBasicMaterial color="#0a0c10" />
        </mesh>
        <mesh position={[0.14, 0.15, -0.16]}>
          <planeGeometry args={[0.3, 0.04]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      </group>
      <mesh position={[0, -0.045, 0.1]} rotation={[-0.06, 0, 0]}>
        <boxGeometry args={[0.7, 0.022, 0.5]} />
        <meshStandardMaterial color="#1a1d21" metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  )
}

function CodePanel({ position, scale = 1 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5 + position[0] * 2) * 0.05
  })
  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <boxGeometry args={[1.5, 0.95, 0.05]} />
          <meshStandardMaterial color="#14161a" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.38, 0.83]} />
          <meshBasicMaterial color="#0a0c10" />
        </mesh>
        {[0.28, 0.16, 0.04, -0.08, -0.2].map((y, i) => (
          <mesh key={i} position={[0, y, 0.035]}>
            <planeGeometry args={[1.05 - i * 0.12, 0.03]} />
            <meshBasicMaterial color={i === 0 ? '#2bd98b' : '#20242c'} />
          </mesh>
        ))}
        {/* window chrome */}
        <mesh position={[-0.58, 0.4, 0.035]}>
          <planeGeometry args={[0.22, 0.05]} />
          <meshBasicMaterial color="#14b0ec" />
        </mesh>
      </group>
    </Float>
  )
}

function FloatShape({ position, size = 0.1, color = '#2bd98b', speed = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.8}>
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
      dpr={[1, mobile ? 1.4 : 2]}
      camera={{ position: [0, 0.4, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ height: '100%', width: '100%' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 3]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#22d3ee" />
      <pointLight position={[0, 2, 1]} intensity={0.5} color="#2bd98b" />

      <Suspense fallback={<Html center>Loading 3D…</Html>}>
        <Rig>
          <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.5}>
            <group position={[0, 0.1, 0]}>
              <Monitor position={[0.95, 0.1, 0]} />
              <Laptop position={[-0.95, 0.05, 0.05]} />
              <CodePanel position={[0, 1.25, -0.55]} scale={0.85} />
            </group>
          </Float>

          <FloatShape position={[-1.85, 0.95, -0.6]} size={0.08} color="#22d3ee" speed={1.3} />
          <FloatShape position={[1.8, -0.6, -0.8]} size={0.06} color="#2bd98b" speed={1.9} />

          <Sparkles count={mobile ? 12 : 26} scale={[5, 3, 3]} size={1.6} speed={0.4} opacity={0.35} color="#2bd98b" />
        </Rig>

        <ContactShadows position={[0, -0.68, 0]} opacity={0.45} scale={7} blur={2.6} far={2.6} />
      </Suspense>
    </Canvas>
  )
}
