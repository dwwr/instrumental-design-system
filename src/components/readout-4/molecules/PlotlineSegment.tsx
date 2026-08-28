/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const plotlineSegment = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #5ff7ff;
  font-family: 'Helvetica';
  font-size: clamp(0.6rem, 3vw, 1.2rem);
  font-weight: 600;
`

const textContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50%;
`

const sign = css`
  margin-bottom: 2px;
`

const number = css`
  margin-right: 0.25rem;
`

const line = (small?: boolean) => css`
  height: 2px;
  width: clamp(${small ? '5px, 1.5vw, 10px' : '10px, 3vw, 20px'});
  background-color: #5ff7ff;
`

const lineContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50%;
`

interface PlotlineSegmentProps {
  value: number
  hide?: boolean
}

export const PlotlineSegment = ({ value, hide }: PlotlineSegmentProps) => (
  <div css={plotlineSegment}>
    <div css={lineContainer}>
      <div css={line(true)} />
    </div>
    <div css={textContainer}>
      {!hide && (
        <>
          <span css={sign}>+</span>
          <span css={number}>{value.toString().padStart(2, '0')}</span>
          <div css={line()} />
        </>
      )}
    </div>
  </div>
)
