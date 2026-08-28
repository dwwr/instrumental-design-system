import { useEffect, useState } from 'react'

export const useHexagonStateAndFlash = (numberOfHexagons: number, range: number = 3) => {
  const [hexagonStates, setHexagonStates] = useState<number[]>(Array(numberOfHexagons).fill(0))
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    let hexagonInterval: NodeJS.Timeout
    let flashInterval: NodeJS.Timeout

    const startHexagonState = () => {
      hexagonInterval = setInterval(() => {
        setHexagonStates((prevStates) => {
          return prevStates.map((state) => {
            if (state < 1) {
              const deviation = Math.random() * range * 2 - range
              return Math.min(1, state + deviation)
            }
            return state
          })
        })
      }, 100)
    }

    const startFlash = () => {
      flashInterval = setInterval(() => {
        setFlash((prevFlash) => !prevFlash)
      }, 250)
    }

    const cycleIntervals = () => {
      startHexagonState()
      setTimeout(() => {
        clearInterval(hexagonInterval)
        setHexagonStates(Array(numberOfHexagons).fill(0))
        startFlash()

        setTimeout(() => {
          clearInterval(flashInterval)
          setFlash(false)
          setHexagonStates(Array(numberOfHexagons).fill(0))

          setTimeout(() => {
            cycleIntervals()
          }, 1000)
        }, 2000)
      }, 2000)
    }

    cycleIntervals()

    return () => {
      clearInterval(hexagonInterval)
      clearInterval(flashInterval)
    }
  }, [numberOfHexagons, range])

  return { hexagonStates, flash }
}
