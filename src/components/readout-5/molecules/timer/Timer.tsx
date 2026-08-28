/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { SevenSegmentDisplay } from '../SevenSegmentDisplay/SevenSegmentDisplay'
import { useCountdown } from './useCountdown'
import { formatMilliseconds } from './utils'

const colon = (color: string) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 10%;

  div {
    width: 100%;
    height: 5%;
    background-color: ${color};
    border-radius: 3px;
    z-index: 1;
  }
`

const numberContainer = css`
  display: flex;
  width: 66.66%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const smallerNumberContainer = css`
  height: 75%;
  width: 33.33%;
  display: flex;
  align-self: end;
`

export interface TimerProps {
  milliseconds: number
  isPaused?: boolean
  runningColor: string
  pausedColor: string
  completedColor: string
}

export const Timer: React.FC<TimerProps> = ({
  milliseconds,
  isPaused,
  runningColor,
  pausedColor,
  completedColor
}) => {
  const { time, isCompleted } = useCountdown(milliseconds, isPaused)

  const color = isPaused ? pausedColor : isCompleted ? completedColor : runningColor

  const formatted = formatMilliseconds(time)

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center'
      }}
    >
      <div css={numberContainer}>
        <SevenSegmentDisplay number={Number(formatted[0])} color={color} />
        <div css={colon(color)}>
          <div></div>
          <div></div>
        </div>
        <SevenSegmentDisplay number={Number(formatted[1])} color={color} />
        <SevenSegmentDisplay number={Number(formatted[2])} color={color} />
      </div>

      <div css={smallerNumberContainer}>
        <div css={colon(color)}>
          <div></div>
          <div></div>
        </div>
        <SevenSegmentDisplay number={Number(formatted[3])} color={color} />
        <SevenSegmentDisplay number={Number(formatted[4])} color={color} />
      </div>
    </div>
  )
}
