import { useEffect, useState } from 'react'
import { isSoundEnabled, setSoundEnabled, subscribeSound } from '../lib/sound'

export default function SoundToggle() {
  const [on, setOn] = useState(isSoundEnabled())

  useEffect(() => {
    const unsub = subscribeSound(setOn)
    return unsub
  }, [])

  return (
    <button
      type="button"
      className="nav-sound mono"
      aria-pressed={on}
      aria-label={on ? 'Sound on — click to mute' : 'Sound off — click to enable'}
      title={on ? 'Sound on' : 'Sound off'}
      onClick={() => setSoundEnabled(!on)}
    >
      SOUND {on ? 'ON' : 'OFF'}
    </button>
  )
}
