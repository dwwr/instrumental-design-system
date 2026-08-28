/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { flickerAnimation } from '../../../animations'

const barSegmentFlicker = css`
  animation: ${flickerAnimation} 0.1s infinite;
`
const greenRGB = '139, 232, 186'
const redRGB = '216, 121, 57'

const greenText = css`
  color: rgba(${greenRGB}, 0.95);
  text-shadow: 0 0 10px rgba(${greenRGB}, 0.95), 0 0 10px rgba(${greenRGB}, 0.95),
    0 0 10px rgba(${greenRGB}, 0.95);
`

const redText = css`
  color: rgba(${redRGB}, 0.95);
  text-shadow: 0 0 10px rgba(${redRGB}, 0.95), 0 0 10px rgba(${redRGB}, 0.95),
    0 0 10px rgba(${redRGB}, 0.95);
`

const greenBar = css`
  background-color: rgba(${greenRGB}, 0.95);
  box-shadow: 0 0 10px rgba(${greenRGB}, 0.4), 0 0 10px rgba(${greenRGB}, 0.3),
    0 0 10px rgba(${greenRGB}, 0.2), 0 0 10px rgba(${greenRGB}, 0.1);
`

const redBar = css`
  background-color: rgba(${redRGB}, 0.95);
  box-shadow: 0 0 10px rgba(214, 63, 43, 0.4), 0 0 10px rgba(214, 63, 43, 0.3),
    0 0 10px rgba(201, 43, 22, 0.2), 0 0 10px rgba(201, 43, 22, 0.1);
`

const container = (flicker?: boolean) => css`
  display: flex;
  flex-direction: column;
  ${flicker && barSegmentFlicker}
`

const barContainer = css`
  width: clamp(60px, 12vw, 140px);
  height: clamp(10px, 5vh, 30px);
  background-color: white;
  border-radius: 5px;
`

const bar = (green?: boolean) => css`
  ${barContainer}
  ${green ? greenBar : redBar}
`

const glowText = (green?: boolean) => css`
  font-size: clamp(0.8rem, 2vw, 1.1rem);
  font-family: 'Helvetica', monospace;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1.1;
  white-space: nowrap;
  ${green ? greenText : redText}
`

const numberText = (green?: boolean) => css`
  ${glowText(green)}
  font-size: clamp(1rem, 3vw, 1.3rem);
`

export interface BarSegmentProps {
  number: number
  flicker?: boolean
  green?: boolean
}

export const BarSegment = ({ number, flicker, green }: BarSegmentProps) => (
  <div css={container(flicker)}>
    <div>
      <span css={glowText(green)}>Seg. </span>
      <span css={numberText(green)}>{number}</span>
    </div>
    <div css={barContainer}>
      <div css={bar(green)} />
    </div>
  </div>
)
