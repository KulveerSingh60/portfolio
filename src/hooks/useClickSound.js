import { useEffect, useState, useCallback } from 'react'
import { isSoundEnabled, subscribeSound, playClick } from '../lib/sound'

export default function useClickSound() {
  const [soundEnabled, setSoundEnabledState] = useState(isSoundEnabled())

  useEffect(() => subscribeSound(setSoundEnabledState), [])

  const onClickSound = useCallback(() => {
    playClick()
  }, [])

  return { playClick: onClickSound, soundEnabled }
}
