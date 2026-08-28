/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const glowLine = css`
  border: none;
  height: 2px;
  background: #ff3300;
  box-shadow: 0 0 5px #ff3300, 0 0 10px #ff3300, 0 0 15px #ff3300, 0 0 20px #ff3300;
`

const lineContainer = css`
  height: 10px;
  padding-bottom: 0.5rem;
`

export const GlowLine: React.FC = () => {
  return (
    <div css={lineContainer}>
      <hr css={glowLine} />
    </div>
  )
}
