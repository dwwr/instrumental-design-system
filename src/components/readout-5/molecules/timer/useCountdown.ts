import { useState, useEffect } from 'react'

export const useCountdown = (
  milliseconds: number,
  isPaused?: boolean
): { time: number; isCompleted: boolean } => {
  const [time, setTime] = useState(milliseconds)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 10 : 0))
      }, 10)
    }

    return () => clearInterval(interval)
  }, [isPaused])

  return { time, isCompleted: time === 0 }
}
