import { useEffect, useState } from 'react'

interface useMeqiaqueryOptions {
  mode?: 'max' | 'min'
  element?: 'width' | 'height'
}

export const useMediaquery = (
  value: number,
  options: useMeqiaqueryOptions = { mode: 'max', element: 'width' }
) => {
  const [matches, setMatches] = useState<boolean>(false)

  const updateMatches = () =>
    setMatches(
      window.matchMedia(`(${options.mode}-${options.element}: ${value}px)`)
        .matches
    )

  useEffect(() => {
    updateMatches()

    window.addEventListener('resize', updateMatches)

    return () => {
      window.removeEventListener('rezize', updateMatches)
    }
  }, [])

  return matches
}
