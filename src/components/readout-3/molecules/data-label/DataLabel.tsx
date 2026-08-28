/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export const borderStyle = css`
  display: inline-flex;
  align-items: end;
  justify-content: end;
  height: 100%;
  border: 3px solid rgb(249, 158, 14);
  border-radius: 7px;
  background: linear-gradient(
    to bottom,
    rgba(249, 158, 14, 0.15),
    rgba(69, 63, 53, 0.05) 50%,
    transparent
  );
  padding: 0 0.25rem 0 0.25rem;
`

export const glowTextStyle = css`
  font-family: 'Helvetica', monospace;
  color: rgb(251, 181, 19);
  text-transform: uppercase;
  text-shadow: 0 0 1px #ff0000, 0 0 4px #ff0000, 0 0 6px #ff0000;
  text-wrap: nowrap;
  margin-bottom: 0.65rem;
  transform: scaleY(3) scaleX(0.95);
`

export const textStretchStyle = css`
  font-size: 1.1rem;
`

export const labelStretchStyle = css`
  font-size: 0.55rem;
`

const condensedStyle = css`
  transform: scaleX(0.7);
  transform-origin: top left;
  margin-right: calc(-13% * var(--content-width, 1));
`

export const flickerAnimation = css`
  @keyframes flicker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
  animation: flicker 0.25s steps(2, end) infinite;
`

export interface DataLabelProps {
  text: string
  label?: string
  flicker?: boolean
  condensed?: boolean
}

export const DataLabel: React.FC<DataLabelProps> = ({
  label,
  text,
  flicker: shouldFlicker,
  condensed
}) => {
  return (
    <div css={[borderStyle, condensed && condensedStyle, shouldFlicker && flickerAnimation]}>
      <span css={[glowTextStyle, labelStretchStyle]}>{label}</span>
      <span css={[glowTextStyle, textStretchStyle]}>{text}</span>
    </div>
  )
}
