/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

interface BorderLineProps {
  text: string
}

const borderLine = css`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: #00ffff;
  margin: 1.5rem 0;
  filter: blur(0.25px);
`

const label = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleX(1.5);
  letter-spacing: 0.05rem;
  background-color: black;
  padding: 0 clamp(0.25rem, 1vw, 1.25rem);
  color: #00ffff;
  font-size: clamp(0.8rem, 2vw, 1.4rem);
  font-family: 'Helvetica';
  font-weight: bold;
  text-transform: uppercase;
  border: 2px solid #00ffff;
  border-radius: 6px;
`

export const BorderLine: React.FC<BorderLineProps> = ({ text }) => (
  <div css={borderLine}>
    <span css={label}>{text}</span>
  </div>
)
