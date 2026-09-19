/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useLayoutEffect, useRef } from 'react'
import { YAxis } from './yAxis'

const SEGMENT_COUNT = 17
const SEGMENT_ON = 'rgb(251, 181, 19)'

const segmentedColumnContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  margin-left: 2px;
  padding-right: 1px;
`

export const segmentedColumnStyle = css`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
  z-index: 2;
`

const gradientBar = css`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`

const segmentBase = css`
  background: none;
  width: 100%;
  flex: 1;
  min-height: 0;
  border-radius: 5px;
  margin-top: 3px;
  margin-bottom: 1px;
  /* border / box-shadow intentionally omitted (parity with source) */
`

const yAxisGutterLeft = css`
  margin-left: 5px;
`

const yAxisGutterRight = css`
  margin-right: 5px;
`

export interface SegmentedColumnProps {
  value: number
  numberOfBars: number
}

const paintSegments = (segs: HTMLElement[], scaledValue: number) => {
  for (let i = 0; i < segs.length; i++) {
    const shouldOn = scaledValue !== 0 && i <= scaledValue
    segs[i].style.background = shouldOn ? SEGMENT_ON : 'none'
  }
}

export const SegmentedColumn: React.FC<SegmentedColumnProps> = ({ value, numberOfBars }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const scaledValue = Math.floor((value / 100) * SEGMENT_COUNT)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (track.closest('[data-chart-paint]')) return
    paintSegments(Array.from(track.querySelectorAll<HTMLElement>('.r3-seg')), scaledValue)
  }, [scaledValue])

  return (
    <div css={segmentedColumnContainerStyle}>
      <div css={yAxisGutterLeft}>
        <YAxis numberOfTicks={numberOfBars} />
      </div>
      <div css={segmentedColumnStyle}>
        <div ref={trackRef} className="r3-seg-track" css={gradientBar}>
          {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
            <div key={i} className="r3-seg" css={segmentBase} />
          ))}
        </div>
      </div>
      <div css={yAxisGutterRight}>
        <YAxis numberOfTicks={numberOfBars} />
      </div>
    </div>
  )
}
