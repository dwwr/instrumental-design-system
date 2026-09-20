/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { SevenSegmentDisplay } from '../SevenSegmentDisplay/SevenSegmentDisplay'
import { useCountdown } from './useCountdown'
import { formatMilliseconds } from './utils'
import { HUD_TEXT_BLUR } from '../../styles'

const colon = (color: string) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 8%;
  flex-shrink: 0;
  padding: 12% 0;
  box-sizing: border-box;

  div {
    width: 55%;
    aspect-ratio: 1;
    height: auto;
    background-color: ${color};
    border-radius: 1px;
    z-index: 1;
    filter: blur(${HUD_TEXT_BLUR}) drop-shadow(0 0 3px ${color});
  }
`

const numberContainer = css`
  display: flex;
  width: 64%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.15%;
`

const smallerNumberContainer = css`
  height: 75%;
  width: 34%;
  display: flex;
  align-self: flex-end;
  gap: 0.35%;
  /* padding-bottom: 3%; */
  box-sizing: border-box;
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
  completedColor,
}) => {
  const { time, isCompleted } = useCountdown(milliseconds, isPaused)

  const color = isPaused
    ? pausedColor
    : isCompleted
    ? completedColor
    : runningColor

  const formatted = formatMilliseconds(time)

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
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
