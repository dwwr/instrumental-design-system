/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'

const plotLineStyle = css`
  position: relative;
  & > *:first-child {
    display: none;
  }
  height: 100%;
  z-index: 3;
`

const tickStyle = (wide?: boolean) => css`
  z-index: 1;
  transform: rotate(-90deg);
  position: absolute;
  width: ${wide ? '1px' : '1.5px'};
  height: ${wide ? '5px' : '3px'};
  background-color: rgb(249, 202, 14);
  box-shadow: 0 0 2px rgb(249, 202, 14), 0 0 4px rgb(249, 202, 14);
`

interface YAxisProps {
  numberOfTicks: number
  wide?: boolean
}

export const YAxis: React.FC<YAxisProps> = ({ numberOfTicks, wide }) => {
  const ticks = Array.from({ length: numberOfTicks }, (_, i) => {
    return <div key={i} css={tickStyle(wide)} style={{ top: `${(i / numberOfTicks) * 100}%` }} />
  })

  return <div css={plotLineStyle}>{ticks}</div>
}
