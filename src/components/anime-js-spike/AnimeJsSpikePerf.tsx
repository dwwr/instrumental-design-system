/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { createScope, createTimer, utils } from 'animejs'
import { useEffect, useRef } from 'react'

/**
 * Performance-minded meter: same visual contract as Readout1ListItem /
 * AnimeJsSpike, but ticks update the DOM directly — no React re-render
 * per jitter frame.
 *
 * Strategy:
 * - Precompute segment colors once
 * - Mount 40 segments once; keep element refs
 * - createTimer (anime) drives the 100ms snap loop
 * - Paint only segments whose on/off state changed
 * - value prop is read via ref so the Storybook slider doesn't restart the loop
 */

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

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: #0a0a0a;
  color: #f6b730;
  font-family: Helvetica, Arial, sans-serif;
`

const barsStyle = css`
  height: 160px;
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

const hintStyle = css`
  font-size: 0.75rem;
  opacity: 0.55;
  max-width: 32rem;
  text-align: center;
  line-height: 1.4;
`

export interface AnimeJsSpikePerfProps {
  /** 0–100 fill level (same as Readout1ListItem `value`) */
  value?: number
}

export const AnimeJsSpikePerf = ({ value = 50 }: AnimeJsSpikePerfProps) => {
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

    // Sentinel so the first paint always writes every segment
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

    // Initial paint at the current value (no deviation yet)
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

  // Slider: recenter immediately without tearing down the timer
  useEffect(() => {
    paintRef.current((value / 100) * SEGMENT_COUNT)
  }, [value])

  return (
    <div ref={root} css={rootStyle}>
      <div ref={track} css={barsStyle}>
        {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
          <div key={i} className="spike-bar" css={segmentBase} />
        ))}
      </div>
      <p css={hintStyle}>
        Perf path: <code>createTimer</code> + direct DOM paints (no{' '}
        <code>setState</code> per tick). Visual match to the list-item meter;
        only segments that flip on/off are touched.
      </p>
    </div>
  )
}
