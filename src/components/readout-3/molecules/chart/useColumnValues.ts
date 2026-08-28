import { useEffect, useState } from 'react'

const deviateValue = (value: number, range: number, direction: 'increment' | 'decrement') => {
  const deviation = Math.floor(Math.random() * range)
  return direction === 'increment' ? value + deviation : value - deviation
}

export const useColumnValues = (
  numberOfColumns: number,
  benchmark?: number,
  deviate?: boolean,
  loop?: boolean
) => {
  const [columnValues, setColumnValues] = useState<number[]>(
    Array(numberOfColumns).fill(benchmark ?? 0)
  )

  useEffect(() => {
    let deviateInterval: NodeJS.Timeout
    let resetInterval: NodeJS.Timeout

    if (deviate) {
      deviateInterval = setInterval(() => {
        setColumnValues((prevValues) => {
          if (benchmark || benchmark === 0) {
            return prevValues.map(() => deviateValue(benchmark, 10, 'increment'))
          }
          return prevValues.map((value) =>
            value < 100
              ? deviateValue(value, 20, 'increment')
              : deviateValue(value, 20, 'decrement')
          )
        })
      }, 100)
    }

    if (loop) {
      resetInterval = setInterval(() => {
        setColumnValues(Array(numberOfColumns).fill(benchmark ?? 0))
      }, 2000)
    }

    return () => {
      clearInterval(deviateInterval)
      clearInterval(resetInterval)
    }
  }, [numberOfColumns, benchmark, deviate, loop])

  return columnValues
}
