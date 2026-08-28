/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const digit = css`
  position: relative;
  width: 100%;
  height: 100%;
`

const segment = css`
  position: absolute;
  /* transition: background-color 0.2s; */
`

const horizontalSegment = css`
  width: 66%;
  height: 9%;
  left: 16%;
  clip-path: polygon(0% 51%, 10% 0%, 90% 0%, 100% 50%, 89% 100%, 10% 100%);
`

const verticalSegment = css`
  width: 14%;
  height: 44.5%;
  clip-path: polygon(0% 10%, 50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%);
`

const a = css`
  ${horizontalSegment}
  top: 0;
`

const g = css`
  ${horizontalSegment}
  top: 45.7%;
`

const d = css`
  ${horizontalSegment}
  bottom: 0;
`

const rightSegments = css`
  ${verticalSegment}
  right: 9.5%;
`

const leftSegments = css`
  ${verticalSegment}
  left: 7%;
`

const topSegments = css`
  top: 5.4%;
`

const bottomSegments = css`
  bottom: 5%;
`

// ----a---
// |       |
// f       b
// |       |
// |---g---|
// |       |
// e       c
// |       |
// ----d----

const numbers: Record<number, string> = {
  0: 'abcdef',
  1: 'bc',
  2: 'abged',
  3: 'abgcd',
  4: 'fbgc',
  5: 'afgcd',
  6: 'afgedc',
  7: 'abc',
  8: 'abcdefg',
  9: 'abfgcd'
}

export interface SevenSegmentDisplayProps {
  number: number
  color: string
}

export const SevenSegmentDisplay: React.FC<SevenSegmentDisplayProps> = ({ number, color }) => {
  const segments = numbers[number] || ''

  const getSegmentStyles = (segmentId: string, ...styles: any[]) => ({
    css: [segment, ...styles],
    style: { backgroundColor: segments.includes(segmentId) ? color : undefined }
  })

  return (
    <div css={digit}>
      <div {...getSegmentStyles('a', a)} />
      <div {...getSegmentStyles('b', verticalSegment, rightSegments, topSegments)} />
      <div {...getSegmentStyles('c', verticalSegment, rightSegments, bottomSegments)} />
      <div {...getSegmentStyles('d', d)} />
      <div {...getSegmentStyles('e', verticalSegment, leftSegments, bottomSegments)} />
      <div {...getSegmentStyles('f', verticalSegment, leftSegments, topSegments)} />
      <div {...getSegmentStyles('g', g)} />
    </div>
  )
}
