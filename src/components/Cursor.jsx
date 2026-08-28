import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mqPointer = matchMedia('(pointer: fine)')
    const mqMotion = matchMedia('(prefers-reduced-motion: reduce)')
    if (!mqPointer.matches || mqMotion.matches) return
    setEnabled(true)

    let x = -100,
      y = -100,
      rx = -100,
      ry = -100
    let raf

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      const target = e.target.closest('a, button, [data-cursor]')
      setLabel(target ? (target.dataset.cursor || 'CLICK') : '')
    }

    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px)`
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className={`cursor-ring${label ? ' has-label' : ''}`} ref={ringRef} aria-hidden="true">
        {label && <span>{label}</span>}
      </div>
    </>
  )
}
