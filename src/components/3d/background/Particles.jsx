import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getEnvironment, themeToHex } from '../../../lib/environmentStore'

/**
 * Particles — a TRUE 3D STAR FIELD. A single THREE.Points with one
 * BufferGeometry (positions + per-star depth/scale/seed) and one ShaderMaterial.
 *
 * Depth is the core effect: far stars are smaller, dimmer and slower; near
 * stars are larger, brighter and faster. Scroll velocity drives gentle motion
 * "through space" (stars drift with depth-scaled speed) plus a subtle velocity
 * stretch. Pointer adds a soft parallax tilt. All GPU-side, one draw call, no
 * per-frame allocation or React re-renders.
 *
 * Under reduced motion: static faint stars, all motion/size variation frozen.
 */

const VERT = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;
  attribute float aDepth; // 0 = far, 1 = near
  uniform float uTime;
  uniform float uPointerX;
  uniform float uPointerY;
  uniform float uScroll;      // scroll progress 0..1
  uniform float uVelocity;    // smoothed |velocity| (normalized-ish)
  uniform float uVelocityY;   // signed smoothed velocity (drives flow direction)
  uniform float uIntensity;   // star brightness (theme.star + hover particle)
  uniform float uDepthBoost;  // hover depth emphasis
  uniform float uReduced;
  varying float vAlpha;
  const float PI = 3.14159265;

  void main() {
    vec3 p = position;

    float t = uTime;
    if (uReduced > 0.5) t = 0.0;

    // depth-scaled drift speed: far stars slow, near stars faster
    float speed = 0.35 + aDepth * 1.6;
    p.x += sin(t * 0.1 + aSeed * PI * 2.0) * 0.4 * speed;
    p.y += cos(t * 0.08 + aSeed * 5.0) * 0.4 * speed;
    p.z += sin(t * 0.06 + aSeed * 3.0) * 0.6 * speed;

    // scroll flow "through space": near stars move more; uVelocityY signed so
    // scroll down pushes stars down/back and scroll up reverses it. velocity
    // magnitude scales the stream so fast scroll shows more motion.
    float flow = uVelocity * 6.0;
    p.y += -uVelocityY * (0.8 + aDepth * 4.5);
    p.z += uScroll * (1.2 + aDepth * 2.6) * (uReduced > 0.5 ? 0.0 : 1.0);
    p.z += -flow * (0.6 + aDepth * 1.8);

    // pointer parallax: near stars respond more, creating depth
    p.x += uPointerX * (0.25 + aDepth * 1.2);
    p.y += uPointerY * (0.25 + aDepth * 1.2);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // sizing: base scale * depth (near bigger) * velocity stretch * perspective
    float sizeBase = aScale * (0.6 + aDepth * 1.5);
    float velocity = (uVelocity * 1.5) * (0.5 + aDepth);
    float size = sizeBase * (1.0 + velocity) * (1.0 + uDepthBoost * 0.4)
               * (150.0 / -mv.z);

    // brightness fades with depth and is gated by overall star intensity
    float depthFade = mix(0.25, 1.0, aDepth);
    vAlpha = (0.5 + 0.5 * aSeed) * depthFade * uIntensity;
    if (uReduced > 0.5) vAlpha *= 0.3;

    gl_PointSize = max(1.0, size);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uReduced;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    if (uReduced > 0.5) a *= 0.4;
    gl_FragColor = vec4(uColor, a);
  }
`

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function Particles({ count = 1800 }) {
  const env = getEnvironment()

  const { geometry } = useMemo(() => {
    const rng = mulberry32(20240814)
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const seeds = new Float32Array(count)
    const depths = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // large 3D volume, spread across a deep field
      positions[i * 3] = (rng() - 0.5) * 46
      positions[i * 3 + 1] = (rng() - 0.5) * 30
      // z from near (-4) to far (-32); depth = far distance normalized
      const z = -4 - rng() * 28
      positions[i * 3 + 2] = z
      depths[i] = clamp01((-z - 4) / 28)
      scales[i] = 0.7 + rng() * 2.2
      seeds[i] = rng()
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geo.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1))
    return { geometry: geo }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(themeToHex(env.value.accent)) },
      uIntensity: { value: env.value.star },
      uPointerX: { value: 0 },
      uPointerY: { value: 0 },
      uScroll: { value: 0 },
      uVelocity: { value: 0 },
      uVelocityY: { value: 0 },
      uDepthBoost: { value: 0 },
      uReduced: { value: env.reducedMotion ? 1 : 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const scratch = useMemo(() => new THREE.Color(), [])

  useFrame((_, delta) => {
    const u = uniforms
    const v = env.value
    const s = env.scroll
    const h = env.hoverBoost
    const dt = Math.min(delta, 0.05)
    const k = 1 - Math.pow(0.001, dt)

    scratch.set(themeToHex(v.accent))
    u.uColor.value.lerp(scratch, k)
    // overall brightness follows theme.star + hover particle energy
    u.uIntensity.value += (v.star + h.particle * 0.35 - u.uIntensity.value) * k
    u.uDepthBoost.value += (h.depth - u.uDepthBoost.value) * k

    u.uPointerX.value += (env.pointer.x - u.uPointerX.value) * 0.05
    u.uPointerY.value += (env.pointer.y - u.uPointerY.value) * 0.05
    u.uScroll.value += (s.progress - u.uScroll.value) * 0.04

    // smoothed velocity magnitude for stretch + energy
    const mag = Math.min(2.5, Math.abs(s.smoothedVelocity) * 0.025)
    u.uVelocity.value += (mag - u.uVelocity.value) * (1 - Math.pow(0.5, dt))
    // signed velocity maintains scroll direction (down positive in Lenis)
    u.uVelocityY.value += (s.smoothedVelocity * 0.05 - u.uVelocityY.value) * (1 - Math.pow(0.5, dt))

    u.uTime.value += dt * (env.reducedMotion ? 0 : 1)
    if (env.reducedMotion) u.uReduced.value = 1
  })

  return (
    <points geometry={geometry}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        fog={false}
      />
    </points>
  )
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}
