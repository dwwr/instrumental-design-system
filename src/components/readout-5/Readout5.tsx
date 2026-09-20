/** @jsxImportSource @emotion/react  */

import { css } from '@emotion/react'
import { Timer } from './molecules/timer/Timer'
import TimerMask from './timer-mask.svg?react'
import { TimerLabel } from './molecules/TimerLabel'
import { ModeRow } from './molecules/mode-row/ModeRow'
import type { ModeId } from './molecules/mode-row/ModeRow'
import { HUD_AMBER, HUD_TICK, hudTextBlur, hudTickBlur } from './styles'

const orangeYellow = HUD_AMBER
const tickColor = HUD_TICK
const amberGlow = 'rgba(255, 152, 20, 1)'

const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(163, 26, 10, 1) 0%,
    rgba(105, 217, 28, 1) 40%,
    rgba(52, 155, 135, 1) 100%,
    rgba(75, 170, 143, 1) 100%
  );
`

const hudSurface = css`
  display: flex;
  flex-direction: column;
  width: fit-content;
  filter: drop-shadow(0 0 1px ${amberGlow})
    drop-shadow(0 0 3px rgba(255, 152, 20, 0.75))
    drop-shadow(0 0 6px rgba(255, 140, 10, 0.35));
`

const hudColumn = css`
  display: flex;
  flex-direction: column;
  width: fit-content;
`

const svg = css`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  overflow: visible;

  svg {
    overflow: visible;
  }
`

const content = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 455px;
  width: 900px;
  overflow: visible;
`

const header = css`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  padding: 0.65rem 0.75rem 0 0.65rem;
  min-height: 4.25rem;
`

const kanjiLabelContainer = css`
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: fit-content;
  transform: scaleX(0.66);
  transform-origin: top left;
  flex-shrink: 0;
  margin-right: calc(-0.34 * 480px);
`

const kanjiLabel = css`
  ${hudTextBlur};
  display: block;
  width: fit-content;
  color: ${orangeYellow};
  font-size: 66px;
  font-family: 'Eva-Matisse_Classic', sans-serif;
  word-spacing: 0.1rem;
  letter-spacing: -0.25rem;
  line-height: 1.15;
  transform: scaleY(1.2);
`

const kanjiLabelSmall = css`
  ${kanjiLabel};
  font-size: 40px;
  line-height: 1.5;
`

const englishHeader = css`
  ${hudTextBlur};
  color: ${orangeYellow};
  font-family: Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -3px;
  white-space: nowrap;
  margin-left: 0.5rem;
  margin-top: 2.15rem;
  align-self: flex-start;
  z-index: 3;
  transform: scaleX(0.7);
`

const timerContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-top: -2.75rem;
  margin-left: 4.5rem;
  margin-right: 0.5rem;
  padding-bottom: 1rem;
  z-index: 100;
  min-height: 0;
`

const modeRail = css`
  width: 62%;
  margin-top: 0.75rem;
  margin-left: 5rem;
`

const labelColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  height: auto;
  width: 200px;
  flex-shrink: 0;
  margin-top: -3.25rem;
  margin-right: 1.1rem;
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
  background-color: ${tickColor};
  ${hudTickBlur};
`

export interface Readout5Props {
  activeMode?: ModeId
  isPaused?: boolean
  pausedColor?: string
}

export const Readout5 = ({
  activeMode = 'racing',
  isPaused = true,
  pausedColor = orangeYellow,
}: Readout5Props) => (
  <div css={container}>
    <div css={hudColumn}>
      <div css={hudSurface}>
        <div css={content}>
          <div css={svg}>
            <TimerMask />
          </div>
          <div css={header}>
            <div css={kanjiLabelContainer}>
              <span css={kanjiLabel}>活動限界まで</span>
              <div css={kanjiLabelSmall}>あと</div>
            </div>
            <span css={englishHeader}>Active Time Remaining:</span>
          </div>
          <div css={timerContainer}>
            <Timer
              milliseconds={298560}
              isPaused={isPaused}
              runningColor={orangeYellow}
              pausedColor={pausedColor}
              completedColor={'rgb(209, 7, 10)'}
            />
            <div css={labelColumn}>
              <Spacer />
              <TimerLabel
                japaneseText="内部"
                englishText="Internal"
                showIndicator
              />
              <Spacer />
              <TimerLabel
                japaneseText="主電源供給システム"
                englishText="Main Energy Supply System"
                small
              />
              <Spacer />
            </div>
          </div>
        </div>
      </div>
      <div css={modeRail}>
        <ModeRow activeMode={activeMode} />
      </div>
    </div>
  </div>
)

const Spacer = () => (
  <span css={spacer}>
    <div css={point} />
    <div css={point} />
  </span>
)
