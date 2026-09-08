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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 0%,
      rgba(255, 0, 0, 0.15) 50%,
      transparent 100%
    );
    animation: ${scanlineAnimation} 0.167s linear infinite,
      ${flickerAnimation} 0.167s infinite;
    pointer-events: none;
    z-index: 2;
  }
`

const gridArea = (
  colStart: number,
  colEnd: number,
  rowStart: number,
  rowEnd?: number
) => css`
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

const plotlineCellBase = css`
  align-self: start;
  height: 100%;
`

const barCellBase = css`
  height: 100%;
`

const borderCellBase = css`
  align-self: end;
`

const plotlineAreas = Array.from(
  { length: 7 },
  (_, i) =>
    css`
      ${gridArea(1, 2, 7 - i)};
      ${plotlineCellBase};
    `
)

const barAreas = Array.from(
  { length: 7 },
  (_, i) =>
    css`
      ${gridArea(1 + i, 2 + i, 8 - i)};
      ${barCellBase};
    `
)

const systemLabelsArea = css`
  ${gridArea(2, 5, 3, 5)};
  ${flexColumn};
`

const borderLineArea = css`
  ${gridArea(1, 8, 7)};
  ${borderCellBase};
`

const energyLabelArea = gridArea(5, 8, 8)

export interface Readout4Props {}

export const Readout4: React.FC<Readout4Props> = () => {
  return (
    <div css={layout}>
      {plotlineAreas.map((area, i) => (
        <div key={`plot-${i}`} css={area}>
          <PlotlineSegment value={i} hide={i === 0} />
        </div>
      ))}
      <div css={systemLabelsArea}>
        <DataLabel text="Life Support System" showIndicator />
        <DataLabel text="Link Control System" showIndicator />
        <DataLabel text="External Communications" squeeze showIndicator />
      </div>
      {barAreas.map((area, i) => (
        <div key={`bar-${i}`} css={area}>
          <BarSegment number={i} flicker={i === 1} green={i <= 1} />
        </div>
      ))}
      <div css={borderLineArea}>
        <BorderLine text="Border Line" />
      </div>
      <div css={energyLabelArea}>
        <DataLabel
          text="Reserve Energy Remaining"
          bottomText="EVA-01 : Entry Plug"
        />
      </div>
    </div>
  )
}
