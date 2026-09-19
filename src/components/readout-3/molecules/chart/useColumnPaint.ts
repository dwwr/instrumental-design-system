import { createScope, createTimer } from 'animejs'
import { RefObject, useEffect, useLayoutEffect, useRef } from 'react'

const DEVIATE_MS = 100
const RESET_MS = 2000
const SEGMENT_COUNT = 17
const SEGMENT_ON = 'rgb(251, 181, 19)'

const deviateValue = (value: number, range: number, direction: 'increment' | 'decrement') => {
  const deviation = Math.floor(Math.random() * range)
  return direction === 'increment' ? value + deviation : value - deviation
}

const fillHeight = (value: number) => `${Math.abs(value - 100)}%`

interface UseColumnPaintOptions {
  rootRef: RefObject<HTMLDivElement | null>
  numberOfColumns: number
  benchmark?: number
  deviate?: boolean
  loop?: boolean
}

/**
 * Drives column fill heights + segmented bars via DOM without React setState.
 * Preserves original deviateValue math and 100ms / 2000ms timings.
 */
export const useColumnPaint = ({
  rootRef,
  numberOfColumns,
  benchmark,
  deviate = false,
  loop = false,
}: UseColumnPaintOptions) => {
  const benchmarkRef = useRef(benchmark)
  benchmarkRef.current = benchmark
  const paintRef = useRef<(values: number[]) => void>(() => {})

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const fillsByIndex: HTMLElement[][] = Array.from({ length: numberOfColumns }, () => [])
    root.querySelectorAll<HTMLElement>('.r3-column-fill').forEach(el => {
      const index = Number(el.dataset.colIndex)
      if (Number.isFinite(index) && index >= 0 && index < numberOfColumns) {
        fillsByIndex[index].push(el)
      }
    })

    const segTracks = Array.from(root.querySelectorAll<HTMLElement>('.r3-seg-track')).map(track =>
      Array.from(track.querySelectorAll<HTMLElement>('.r3-seg'))
    )

    const lastValues = new Float64Array(numberOfColumns).fill(Number.NaN)
    const lastSegLevel = new Int16Array(segTracks.length).fill(-1)

    const paintSegments = (trackIndex: number, value: number) => {
      const segs = segTracks[trackIndex]
      if (!segs) return
      const level = Math.floor((value / 100) * SEGMENT_COUNT)
      if (lastSegLevel[trackIndex] === level) return
      const prev = lastSegLevel[trackIndex]
      lastSegLevel[trackIndex] = level

      for (let i = 0; i < SEGMENT_COUNT; i++) {
        const shouldOn = level !== 0 && i <= level
        const wasOn = prev !== -1 && prev !== 0 && i <= prev
        if (shouldOn === wasOn) continue
        segs[i].style.background = shouldOn ? SEGMENT_ON : 'none'
      }
    }

    const paint = (values: number[]) => {
      for (let i = 0; i < numberOfColumns; i++) {
        const value = values[i] ?? 0
        if (lastValues[i] === value) continue
        lastValues[i] = value
        const height = fillHeight(value)
        const fills = fillsByIndex[i]
        for (let g = 0; g < fills.length; g++) {
          fills[g].style.height = height
        }
      }

      const segValue = values[0] ?? 0
      for (let t = 0; t < segTracks.length; t++) {
        paintSegments(t, segValue)
      }
    }

    paintRef.current = paint

    const seed = Array.from({ length: numberOfColumns }, () => benchmarkRef.current ?? 0)
    paint(seed)

    if (!deviate && !loop) return

    const values = seed.slice()

    const snapDeviate = () => {
      const bench = benchmarkRef.current
      if (bench || bench === 0) {
        for (let i = 0; i < values.length; i++) {
          values[i] = deviateValue(bench, 10, 'increment')
        }
      } else {
        for (let i = 0; i < values.length; i++) {
          values[i] =
            values[i] < 100
              ? deviateValue(values[i], 20, 'increment')
              : deviateValue(values[i], 20, 'decrement')
        }
      }
      paint(values)
    }

    const snapReset = () => {
      const bench = benchmarkRef.current ?? 0
      for (let i = 0; i < values.length; i++) {
        values[i] = bench
      }
      paint(values)
    }

    const scope = createScope({ root }).add(() => {
      if (deviate) {
        createTimer({
          duration: DEVIATE_MS,
          loop: true,
          onLoop: snapDeviate,
        })
      }
      if (loop) {
        createTimer({
          duration: RESET_MS,
          loop: true,
          onLoop: snapReset,
        })
      }
    })

    return () => {
      scope.revert()
      paintRef.current = () => {}
    }
  }, [rootRef, numberOfColumns, deviate, loop])

  useEffect(() => {
    const seed = Array.from({ length: numberOfColumns }, () => benchmark ?? 0)
    paintRef.current(seed)
  }, [benchmark, numberOfColumns])
}
