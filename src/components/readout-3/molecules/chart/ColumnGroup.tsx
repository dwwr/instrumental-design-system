/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Column } from './Column'
import { SegmentedColumn } from './SegmentedColumn'
import { XAxis } from './xAxis'
import { PlotLine } from './PlotLine'

const columnGroupStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
`

const columnContainerStyle = css`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  position: relative;
`

const segmentedColumnContainerStyle = css`
  width: 200%;
  height: 100%;
  margin-left: -4px;
`

const xAxisStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`

const topXAxisStyle = css`
  ${xAxisStyle};
  bottom: auto;
  z-index: 1;
  transform: scaleY(-1);
`

const plotLineStyle = css`
  margin-top: 2px;
`

export interface ColumnGroupProps {
  numberOfColumns: number
  values: number[]
}

export const ColumnGroup: React.FC<ColumnGroupProps> = ({ numberOfColumns, values }) => {
  return (
    <div css={columnGroupStyle}>
      <div css={columnContainerStyle}>
        <div css={topXAxisStyle}>
          <XAxis numberOfTicks={30} />
        </div>
        {[...Array(numberOfColumns)].map((_, i) => {
          return (
            <Column
              key={i}
              value={values[i]}
              numberOfBars={17}
              showYAxis={i === 2 || i === 6}
              numberOfColumns={numberOfColumns}
            />
          )
        })}
        <div css={segmentedColumnContainerStyle}>
          <SegmentedColumn value={values[0]} numberOfBars={17} />
        </div>
        <div css={xAxisStyle}>
          <XAxis numberOfTicks={30} />
        </div>
      </div>
      <div css={plotLineStyle}>
        <PlotLine numberOfTicks={60} />
      </div>
    </div>
  )
}
