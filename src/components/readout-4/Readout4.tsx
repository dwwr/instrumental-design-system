/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { BarSegment } from './molecules/segment/BarSegment'
import { DataLabel } from './molecules/data-label/DataLabel'
import { BorderLine } from './molecules/border-line/BorderLine'
import { PlotlineSegment } from './molecules/PlotlineSegment'
import { flickerAnimation, scanlineAnimation } from '../animations'

const layout = css`
  width: 100%;
  height: 100%;
  display: grid;
  grid-auto-columns: repeat(7, 10.66%);
  grid-auto-rows: repeat(8, 1fr);
  background-color: black;
  position: relative;
  column-gap: clamp(0.25rem, 1vw, 1rem);
  filter: blur(0.5px);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(214, 63, 43, 0.95), #8be8ba);
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent 0%, rgba(255, 0, 0, 0.15) 50%, transparent 100%);
    animation: ${scanlineAnimation} 0.167s linear infinite, ${flickerAnimation} 0.167s infinite;
    pointer-events: none;
    z-index: 2;
  }
`

const gridArea = (colStart: number, colEnd: number, rowStart: number, rowEnd?: number) => css`
  grid-column-start: ${colStart};
  grid-column-end: ${colEnd};
  grid-row-start: ${rowStart};
  grid-row-end: ${rowEnd || rowStart + 1};
`

const flexColumn = css`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

export interface Readout4Props {}

export const Readout4: React.FC<Readout4Props> = () => {
  return (
    <div css={layout}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} css={gridArea(1, 2, 7 - i)} style={{ alignSelf: 'start', height: '100%' }}>
          <PlotlineSegment value={i} hide={i === 0} />
        </div>
      ))}
      <div css={[gridArea(2, 5, 3, 5), flexColumn]}>
        <DataLabel text="Life Support System" showIndicator flicker />
        <DataLabel text="Link Control System" showIndicator />
        <DataLabel text="External Communications" squeeze showIndicator />
      </div>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} css={gridArea(1 + i, 2 + i, 8 - i)} style={{ height: '100%' }}>
          <BarSegment number={i} flicker={i === 1} green={i <= 1} />
        </div>
      ))}
      <div css={gridArea(1, 8, 7)} style={{ alignSelf: 'end' }}>
        <BorderLine text="Border Line" />
      </div>
      <div css={gridArea(5, 8, 8)}>
        <DataLabel text="Reserve Energy Remaining" bottomText="EVA-01 : Entry Plug" />
      </div>
    </div>
  )
}
