import { useEffect, useState } from 'react'

export const useXRotateAnimation = () => {
  const [scaleX, setScaleX] = useState(1)

  useEffect(() => {
    let direction = -1 // -1 for decreasing, 1 for increasing
    let currentValue = 1

    const interval = setInterval(() => {
      currentValue += direction * 0.05

      if (currentValue <= -1) {
        direction = 1 // start increasing
        currentValue = -1
      } else if (currentValue >= 1) {
        direction = -1 // start decreasing
        currentValue = 1
      }

      setScaleX(currentValue)
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return scaleX
}
