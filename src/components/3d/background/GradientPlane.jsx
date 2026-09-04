import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getEnvironment, themeToHex } from '../../../lib/environmentStore'

/**
 * GradientPlane — a single full-screen plane with a lightweight custom
 * shader that renders a fluid, atmospheric gradient. No expensive
 * post-processing; uses one plane + one shaderMaterial.
 *
 * Reacts to: pointer, active theme accent, scroll depth, and time.
 * Under reduced motion the uniforms are snapped to a calm static state.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uAccent;
  uniform vec3 uAccentAlt;
  uniform float uIntensity;
  uniform float uDepth;
  uniform float uDistortion;
  uniform float uPointerX;
  uniform float uPointerY;
  uniform float uScroll;
  uniform float uVelocity;
  uniform float uReduced;

  float noise2(vec2 p) {
    return sin(p.x * 3.1 + p.y * 2.7) * 0.5 + sin(p.x * 1.7 - p.y * 4.1) * 0.5;
  }

  void main() {
    float t = uTime * 0.06;
    if (uReduced > 0.5) t = 0.0;

    vec2 uv = vUv;
    // subtle parallax toward pointer + gentle scroll drift
    uv += vec2(uPointerX, uPointerY) * 0.035
        + vec2(0.0, uScroll * 0.06)
        + vec2(uVelocity * 0.2, uVelocity * -0.3);

    float n = noise2(uv * 2.2 + t);
    n += noise2(uv * 4.1 - t * 0.8) * 0.35 * (1.0 + uDistortion * 0.6 + uVelocity * 0.3);
    n *= 0.5 + 0.5 * uIntensity;

    vec3 col = mix(uAccentAlt, uAccent, clamp(0.5 + n, 0.0, 1.0));

    // radial depth vignette toward edges
    float d = distance(vUv, vec2(0.5 + uPointerX * 0.1, 0.5 - uPointerY * 0.07));
    float vignette = 1.0 - smoothstep(0.35, 0.95, d) * (0.55 - uDepth * 0.25);

    // soft atmospheric depth glow near the lower-center of the frame,
    // deepening the sense of space without brightening the whole screen
    float hg = exp(-pow(distance(vUv, vec2(0.5, 0.72)) / 0.34, 2.0)) * (0.25 + uDepth * 0.2);

    float alpha = 0.15 + uIntensity * 0.1;
    col *= vignette;
    col += uAccent * hg * 0.35;

    gl_FragColor = vec4(col, alpha);
  }
`

export default function GradientPlane({ size = 40 }) {
  const env = getEnvironment()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAccent: { value: new THREE.Color(themeToHex(env.value.accent)) },
      uAccentAlt: { value: new THREE.Color(themeToHex(env.value.accentAlt)) },
      uIntensity: { value: env.value.intensity },
      uDepth: { value: env.value.depth },
      uDistortion: { value: env.value.distortion },
      uPointerX: { value: 0 },
      uPointerY: { value: 0 },
      uScroll: { value: 0 },
      uVelocity: { value: 0 },
      uReduced: { value: env.reducedMotion ? 1 : 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const scratchAccent = useMemo(() => new THREE.Color(), [])
  const scratchAlt = useMemo(() => new THREE.Color(), [])

  useFrame((_, delta) => {
    const u = uniforms
    const v = env.value
    const hover = env.hoverBoost
    const s = env.scroll
    const dt = Math.min(delta, 0.05)
    const k = 1 - Math.pow(0.001, dt)

    // lerp all themed uniforms toward current value (GSAP animates env.value);
    // use pre-allocated scratch colors to avoid per-frame allocation.
    scratchAccent.set(themeToHex(v.accent))
    scratchAlt.set(themeToHex(v.accentAlt))
    u.uAccent.value.lerp(scratchAccent, k)
    u.uAccentAlt.value.lerp(scratchAlt, k)
    u.uIntensity.value += (v.intensity + hover.intensity * 0.1 - u.uIntensity.value) * k
    u.uDepth.value += (v.depth + hover.depth * 0.15 - u.uDepth.value) * k
    u.uDistortion.value += (v.distortion - u.uDistortion.value) * k

    // smoothing for pointer / scroll (mutate here, source kept in env)
    u.uPointerX.value += (env.pointer.x - u.uPointerX.value) * 0.06
    u.uPointerY.value += (env.pointer.y - u.uPointerY.value) * 0.06
    u.uScroll.value += (env.scroll.progress - u.uScroll.value) * 0.04
    const vmag = Math.min(1, Math.abs(s.smoothedVelocity) * 0.06)
    u.uVelocity.value += (vmag - u.uVelocity.value) * (1 - Math.pow(0.5, dt))

    u.uTime.value += dt * (env.reducedMotion ? 0 : 1)
    if (env.reducedMotion) {
      u.uReduced.value = 1
    }
  })

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[size, size]} />
      <shaderMaterial uniforms={uniforms} vertexShader={VERT} fragmentShader={FRAG} transparent depthWrite={false} />
    </mesh>
  )
}
