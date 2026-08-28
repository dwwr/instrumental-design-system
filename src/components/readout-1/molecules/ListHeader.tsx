/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

const listHeader = css`
  display: grid;
  grid-template-columns: 7fr 1fr 3fr 1.5fr;
  grid-column: 2 / -1;
  margin-bottom: 0.2rem;
`

const scaleNumbers = css`
  font-size: clamp(0.45rem, 1vw, 2rem);
  transform: scaleY(1.5);
`

const metric1 = css`
  position: relative;
  right: calc(${'-100.0'.length}ch / 2);
`

export const ListHeader: React.FC = () => {
  return (
    <div css={[listHeader, scaleNumbers]}>
      <span css={metric1}>-100.0</span>
      <span>+0</span>
      <span>+10.0</span>
      <span>+15.0</span>
    </div>
  )
}
