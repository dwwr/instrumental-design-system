/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useLayoutEffect, useRef } from 'react'
import { YAxis } from './yAxis'

export const columnStyle = css`
  width: 100%;
  height: 100%;
  /* background: linear-gradient(
    180deg,
    rgb(163, 25, 10) 0%,
    rgb(154, 217, 28) 30%,
    rgb(28, 217, 59) 45%,
    rgb(52, 155, 135) 100%,
    rgb(75, 170, 143) 100%
  ); */
  background: linear-gradient(
    180deg,
    rgba(163, 26, 10, 1) 0%,
    rgba(105, 217, 28, 1) 40%,
    rgba(52, 155, 135, 1) 100%,
    rgba(75, 170, 143, 1) 100%
  );
  margin: 0px -1px;
`

const columnFillBase = css`
  background: black;
  margin: 0px -1px;
`

export interface ColumnProps {
  value: number
  colIndex: number
  numberOfBars: number
  numberOfColumns: number
  showYAxis?: boolean
}

export const Column: React.FC<ColumnProps> = ({
  value,
  colIndex,
  numberOfBars,
  showYAxis = true,
}) => {
  const fillRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = fillRef.current
    if (!el) return
    // Standalone / story usage: sync from props. Chart paint owns live mode.
    if (!el.closest('[data-chart-paint]')) {
      el.style.height = `${Math.abs(value - 100)}%`
    }
  }, [value])

  return (
    <>
      {showYAxis && <YAxis numberOfTicks={numberOfBars} wide />}
      <div css={columnStyle}>
        <div
          ref={fillRef}
          className="r3-column-fill"
          data-col-index={colIndex}
          css={columnFillBase}
        />
      </div>
    </>
  )
}
