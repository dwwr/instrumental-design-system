/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ColumnGroup } from './ColumnGroup'
import { useColumnValues } from './useColumnValues'

const chartStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  transform: skewX(-29deg);
  margin-left: -20%;
`

const columnContainerStyle = css`
  flex: 1;
  display: flex;
  position: relative;
`

export interface ChartProps {
  columnGroupCount: number
  columnGroupSize: number
  benchmark?: number
  deviate?: boolean
  loop?: boolean
}

export const Chart: React.FC<ChartProps> = ({
  columnGroupCount,
  columnGroupSize,
  benchmark,
  deviate,
  loop
}) => {
  const columnValues = useColumnValues(columnGroupSize, benchmark, deviate, loop)

  return (
    <div css={chartStyle}>
      <div css={columnContainerStyle}>
        {[...Array(columnGroupCount)].map((_, i) => (
          <ColumnGroup key={i} values={columnValues} numberOfColumns={columnGroupSize} />
        ))}
      </div>
    </div>
  )
}
