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
  text-shadow: 0 0 10px rgba(${greenRGB}, 0.95);
`

const redText = css`
  color: rgba(${redRGB}, 0.95);
  text-shadow: 0 0 10px rgba(${redRGB}, 0.95);
`

const greenBar = css`
  background-color: rgba(${greenRGB}, 0.95);
  box-shadow: 0 0 12px rgba(${greenRGB}, 0.55);
`

const redBar = css`
  background-color: rgba(${redRGB}, 0.95);
  box-shadow: 0 0 12px rgba(214, 63, 43, 0.45);
`

const containerBase = css`
  display: flex;
  flex-direction: column;
`

const barContainer = css`
  width: clamp(60px, 12vw, 140px);
  height: clamp(10px, 5vh, 30px);
  background-color: white;
  border-radius: 5px;
`

const glowTextBase = css`
  font-size: clamp(0.8rem, 2vw, 1.1rem);
  font-family: 'Helvetica', monospace;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1.1;
  white-space: nowrap;
`

const numberTextBase = css`
  ${glowTextBase};
  font-size: clamp(1rem, 3vw, 1.3rem);
`

export interface BarSegmentProps {
  number: number
  flicker?: boolean
  green?: boolean
}

export const BarSegment = ({ number, flicker, green }: BarSegmentProps) => (
  <div css={[containerBase, flicker && barSegmentFlicker]}>
    <div>
      <span css={[glowTextBase, green ? greenText : redText]}>Seg. </span>
      <span css={[numberTextBase, green ? greenText : redText]}>{number}</span>
    </div>
    <div css={barContainer}>
      <div css={[barContainer, green ? greenBar : redBar]} />
    </div>
  </div>
)
