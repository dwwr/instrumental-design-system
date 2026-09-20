import { useState, useEffect, useRef } from 'react'

/**
 * Counts down in real wall-clock time while unpaused.
 * Uses performance.now() so display stays in sync (setInterval drifts).
 */
export const useCountdown = (
  milliseconds: number,
  isPaused?: boolean,
): { time: number; isCompleted: boolean } => {
  const [time, setTime] = useState(milliseconds)
  const remainingRef = useRef(milliseconds)

  // Reset when the starting duration changes.
  useEffect(() => {
    remainingRef.current = milliseconds
    setTime(milliseconds)
  }, [milliseconds])

  useEffect(() => {
    if (isPaused) return

    const startedAt = performance.now()
    const remainingAtStart = remainingRef.current
    let frameId = 0

    const tick = (now: number) => {
      const elapsed = now - startedAt
      const next = Math.max(0, remainingAtStart - elapsed)
      remainingRef.current = next
      setTime(next)
      if (next > 0) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isPaused])

  return { time, isCompleted: time === 0 }
}
