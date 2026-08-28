/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { YAxis } from './yAxis'

const segmentedColumnContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  margin-left: 2px;
  padding-right: 1px;
`

export const segmentedColumnStyle = css`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
  z-index: 2;
`

const gradientBar = css`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`

const styleIncrementor = (i: number, currentNumber: number) => {
  return css`
    background: ${i > currentNumber || currentNumber === 0 ? 'none' : 'rgb(251, 181, 19)'};
    width: 100%;
    flex: 1;
    min-height: 0;
    border-radius: 5px;
    margin-top: 3px;
    margin-bottom: 1px;
    /* border: ${i > currentNumber ? '1px solid rgba(251, 181, 19, 0.2)' : 'none'};
    box-shadow: ${i <= currentNumber ? '0 0 5px rgba(251, 181, 19, 0.5)' : 'none'}; */
  `
}

export interface SegmentedColumnProps {
  value: number
  numberOfBars: number
}

export const SegmentedColumn: React.FC<SegmentedColumnProps> = ({ value, numberOfBars }) => {
  const scaledValue = Math.floor((value / 100) * 17)

  return (
    <div css={segmentedColumnContainerStyle}>
      <div
        css={css`
          margin-left: 5px;
        `}
      >
        <YAxis numberOfTicks={numberOfBars} />
      </div>
      <div css={segmentedColumnStyle}>
        <div css={gradientBar}>
          {[...Array(17)].map((_, i) => (
            <div key={i} css={styleIncrementor(i, scaledValue)} />
          ))}
        </div>
      </div>
      <div
        css={css`
          margin-right: 5px;
        `}
      >
        <YAxis numberOfTicks={numberOfBars} />
      </div>
    </div>
  )
}
