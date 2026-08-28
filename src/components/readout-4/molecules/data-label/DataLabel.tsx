/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { flickerAnimation } from '../../../animations'

const primaryColor = 'rgb(216, 121, 57)'

const boxFlicker = css`
  animation: ${flickerAnimation} 0.1s infinite;
`

const labelContainer = css`
  display: flex;
  align-items: stretch;
  > * {
    flex-shrink: 0;
  }
`

const glowBox = (flicker?: boolean) => css`
  margin-left: 0.5rem;
  width: clamp(15px, 3vw, 25px);
  height: 100%;
  background-color: ${primaryColor};
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(214, 63, 43, 0.4), 0 0 20px rgba(214, 63, 43, 0.3),
    0 0 20px rgba(201, 43, 22, 0.2), 0 0 20px rgba(201, 43, 22, 0.1);
  ${flicker && boxFlicker}
`

const label = css`
  border: 2px solid ${primaryColor};
  border-radius: 5px;
  width: clamp(160px, 32vw, 400px);
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const glowText = css`
  font-family: 'Helvetica', monospace;
  font-size: clamp(0.8rem, 2.5vw, 2rem);
  line-height: 1.2;
  color: ${primaryColor};
  text-transform: uppercase;
  text-shadow: 0 0 1px #ff0000, 0 0 4px #ff0000, 0 0 6px #ff0000;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  word-spacing: 0.1rem;
`

const squeezeText = css`
  word-spacing: -0.1rem;
  width: clamp(125%, 10vw, 125%);
  transform: scaleX(0.8);
  transform-origin: left;
`

const boldText = css`
  font-weight: bold;
`

const spacedText = css`
  transform: scaleX(1.1);
`

const divider = css`
  border-top: 2px solid ${primaryColor};
  align-self: center;
  width: clamp(96%, 10vw, 96%);
  height: 0;
`

interface DataLabelProps {
  text: string
  bottomText?: string
  squeeze?: boolean
  showIndicator?: boolean
  flicker?: boolean
}

export const DataLabel = ({
  text,
  bottomText,
  squeeze,
  showIndicator,
  flicker
}: DataLabelProps) => (
  <div css={labelContainer}>
    <div css={label}>
      {bottomText ? (
        <>
          <span css={[glowText, squeezeText, boldText]}>{text}</span>
          <div css={divider} />
          <span css={[glowText, squeeze && squeezeText, boldText, spacedText]}>{bottomText}</span>
        </>
      ) : (
        <span css={[glowText, squeeze && squeezeText, boldText]}>{text}</span>
      )}
    </div>
    {showIndicator && <div css={glowBox(flicker)} />}
  </div>
)
