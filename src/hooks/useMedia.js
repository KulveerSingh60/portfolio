import { useEffect, useState } from 'react'

export function useWebGL() {
  const [supported, setSupported] = useState(true)
  useEffect(() => {
    let ok = true
    try {
      const canvas = document.createElement('canvas')
      ok = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch {
      ok = false
    }
    setSupported(ok)
  }, [])
  return supported
}

export function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const update = () => setMobile(mq.matches)
    update()
    if (mq.addEventListener) mq.addEventListener('change', update)
    else mq.addListener(update)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update)
      else mq.removeListener(update)
    }
  }, [])
  return mobile
}
