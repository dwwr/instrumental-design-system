/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { HUD_TICK, hudTickBlur } from '../../styles'
import { TimerLabel } from '../TimerLabel'

export interface TimerLabelColumnProps {
  isPaused?: boolean
  isCompleted?: boolean
}

const column = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  height: auto;
  width: 200px;
  flex-shrink: 0;
  gap: 0.4rem;
`

const spacer = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`

const point = css`
  height: 7px;
  width: 2px;
  background-color: ${HUD_TICK};
  ${hudTickBlur};
`

const Spacer = () => (
  <span css={spacer}>
    <div css={point} />
    <div css={point} />
  </span>
)

export const TimerLabelColumn = ({
  isPaused = false,
  isCompleted = false,
}: TimerLabelColumnProps) => {
  const completed = isCompleted
  const paused = isPaused && !completed

  const internalOn = !paused
  const externalOn = paused

  return (
    <div css={column}>
      <Spacer />
      <TimerLabel
        japaneseText="内部"
        englishText="Internal"
        active={internalOn}
        flashing={completed}
        faint={!internalOn}
      />
      <Spacer />
      <TimerLabel
        japaneseText="主電源供給システム"
        englishText="Main Energy Supply System"
        small
      />
      <Spacer />
      <TimerLabel
        japaneseText="外部"
        englishText="External"
        active={externalOn}
        faint={!externalOn}
      />
      <Spacer />
    </div>
  )
}
