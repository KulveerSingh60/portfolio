import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getEnvironment } from '../../../lib/environmentStore'

/**
 * FloatingShapes — a SMALL number of low-poly objects scattered in the
 * background volume. Once built; one shared useFrame drives slow float/rotate
 * for the whole group. Kept deliberately faint and recessive — the star field
 * is now the primary background. Camera parallax (in
 * ReactiveBackground's rig) replaces per-shape pointer motion.
 */

const DEFS = [
  { type: 'ico', size: 0.28, pos: [-9, 1.4, -6], speed: 0.09 },
  { type: 'ring', size: 0.4, pos: [9, -2.4, -7], speed: 0.1 },
  { type: 'ico', size: 0.18, pos: [7, 4.0, -9], speed: 0.13 },
  { type: 'ring', size: 0.3, pos: [-8, -3.8, -10], speed: 0.08 },
  { type: 'ico', size: 0.12, pos: [-6, 5.2, -11], speed: 0.16 },
  { type: 'ring', size: 0.5, pos: [4, -6.4, -12], speed: 0.06 },
]

export default function FloatingShapes() {
  const group = useRef()
  const env = getEnvironment()

  const materials = useMemo(() => {
    return [
      new THREE.MeshStandardMaterial({ color: '#2bd98b', metalness: 0.6, roughness: 0.35, transparent: true, opacity: 0.28 }),
      new THREE.MeshStandardMaterial({ color: '#22d3ee', metalness: 0.5, roughness: 0.4, transparent: true, opacity: 0.28 }),
    ]
  }, [])

  const scratch = useMemo(() => new THREE.Color(), [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const v = env.value
    const reduced = env.reducedMotion

    const mat0 = materials[0]
    const mat1 = materials[1]
    scratch.set(v.accent)
    mat0.color.lerp(scratch, 0.04)
    scratch.set(v.accentAlt)
    mat1.color.lerp(scratch, 0.04)

    // faint, theme-shaped opacity; even fainter than before (decorative only)
    const targetOp = 0.12 + v.shape * 0.18
    mat0.opacity += (targetOp - mat0.opacity) * 0.04
    mat1.opacity += (targetOp - mat1.opacity) * 0.04

    group.current.children.forEach((child, i) => {
      const def = DEFS[i % DEFS.length]
      const dt = reduced ? 0 : 1
      child.position.x = def.pos[0] + Math.sin(t * 0.2 * dt + i * 1.7) * 0.3
      child.position.y = def.pos[1] + Math.cos(t * 0.18 * dt + i * 2.3) * 0.3
      child.rotation.x = t * def.speed * dt + i
      child.rotation.y = t * def.speed * 1.2 * dt + i
    })
    if (reduced) {
      mat0.opacity = 0.06
      mat1.opacity = 0.06
    }
  })

  const shapes = useMemo(
    () =>
      DEFS.map((def, i) => {
        const mat = materials[i % 2]
        if (def.type === 'ring') {
          return (
            <mesh key={i} position={def.pos} material={mat}>
              <torusGeometry args={[def.size, def.size * 0.18, 12, 40]} />
            </mesh>
          )
        }
        return (
          <mesh key={i} position={def.pos} material={mat}>
            <icosahedronGeometry args={[def.size, 1]} />
          </mesh>
        )
      }),
    [materials]
  )

  return <group ref={group}>{shapes}</group>
}
