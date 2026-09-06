import { css, SerializedStyles } from '@emotion/react'
import { createScope, createTimer, utils } from 'animejs'
import { useEffect, useRef } from 'react'

const INTERVAL_MS = 100
const RANGE = 2
const SEGMENT_COUNT = 40

const getGradientColor = (index: number, total: number): string => {
  if (index < total * 0.4) {
    const blueIntensity = (index / (total * 0.4)) * 255
    return `rgb(0, ${255 - blueIntensity}, 255)`
  }
  if (index < total * 0.7) {
    return `rgb(0, 0, 255)`
  }
  const purpleIntensity = ((index - total * 0.7) / (total * 0.3)) * 128
  return `rgb(${purpleIntensity}, 0, 255)`
}

const SEGMENT_COLORS = Array.from({ length: SEGMENT_COUNT }, (_, i) =>
  getGradientColor(i, SEGMENT_COUNT)
)

const SegmentedBarContainer = css`
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
`

const segmentBase = css`
  flex: 1;
  height: 75%;
  border-radius: 3px;
  margin: 0 0.1rem;
  background: none;
  box-shadow: none;
`

interface SegmentedBarProps {
  value: number
}

export const SegmentedBar: React.FC<SegmentedBarProps> = ({ value }) => {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const valueRef = useRef(value)
  const paintRef = useRef<(level: number) => void>(() => {})
  valueRef.current = value

  useEffect(() => {
    const trackEl = track.current
    if (!trackEl) return

    const segments = Array.from(
      trackEl.querySelectorAll<HTMLDivElement>('.spike-bar')
    )

    let lastLevel = Number.NEGATIVE_INFINITY

    const paint = (level: number) => {
      for (let i = 0; i < SEGMENT_COUNT; i++) {
        const shouldOn = i <= level
        const wasOn = i <= lastLevel
        if (shouldOn === wasOn) continue

        const el = segments[i]
        const color = SEGMENT_COLORS[i]
        if (shouldOn) {
          el.style.background = color
          el.style.boxShadow = `0 0 15px ${color}`
        } else {
          el.style.background = 'none'
          el.style.boxShadow = 'none'
        }
      }
      lastLevel = level
    }

    paintRef.current = paint

    const snap = () => {
      const base = (valueRef.current / 100) * SEGMENT_COUNT
      paint(base + utils.random(-RANGE, RANGE))
    }

    paint((valueRef.current / 100) * SEGMENT_COUNT)

    const scope = createScope({ root }).add(() => {
      createTimer({
        duration: INTERVAL_MS,
        loop: true,
        onLoop: snap,
      })
    })

    return () => {
      scope.revert()
    }
  }, [])

  useEffect(() => {
    paintRef.current((value / 100) * SEGMENT_COUNT)
  }, [value])
  return (
    <div
      ref={el => {
        track.current = el
        root.current = el
      }}
      css={SegmentedBarContainer}
    >
      {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
        <div key={i} className="spike-bar" css={segmentBase} />
      ))}
    </div>
  )
}
