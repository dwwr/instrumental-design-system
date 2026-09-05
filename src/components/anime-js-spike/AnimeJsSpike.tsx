/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { animate, createScope, utils } from 'animejs'
import { useEffect, useRef, useState } from 'react'

const INTERVAL_MS = 100
const RANGE = 2
const SEGMENT_COUNT = 40

const getGradientColor = (index: number, total: number): string => {
  if (index < total * 0.4) {
    const blueIntensity = (index / (total * 0.4)) * 255
    return `rgb(0, ${255 - blueIntensity}, 255)`
  } else if (index < total * 0.7) {
    return `rgb(0, 0, 255)`
  } else {
    const purpleIntensity = ((index - total * 0.7) / (total * 0.3)) * 128
    return `rgb(${purpleIntensity}, 0, 255)`
  }
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
`

export const AnimeJsSpike = () => {
  const root = useRef<HTMLDivElement>(null)
  const scope = useRef<ReturnType<typeof createScope> | null>(null)
  const [currentNumber, setCurrentNumber] = useState(20)
  const value = 50 // % of total
  const baseNumber = (value / 100) * SEGMENT_COUNT

  useEffect(() => {
    const state = { value: baseNumber }
    scope.current = createScope({ root }).add(() => {
      const tick = () => {
        animate(state, {
          value: baseNumber + utils.random(-RANGE, RANGE),
          duration: 0,
          onComplete: () => {
            setCurrentNumber(state.value)
            window.setTimeout(tick, INTERVAL_MS)
          },
        })
      }
      tick()
    })
    return () => scope.current?.revert()
  }, [baseNumber, RANGE])

  return (
    <div ref={root} css={rootStyle}>
      <div css={barsStyle}>
        {Array.from({ length: 40 }, (_, i) => {
          const on = i <= currentNumber
          const color = SEGMENT_COLORS[i]
          return (
            <div
              key={i}
              className="spike-bar"
              css={segmentBase}
              style={
                on
                  ? { background: color, boxShadow: `0 0 15px ${color}` }
                  : { background: 'none', boxShadow: 'none' }
              }
            />
          )
        })}
      </div>
    </div>
  )
}
