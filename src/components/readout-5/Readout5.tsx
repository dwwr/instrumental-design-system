/** @jsxImportSource @emotion/react  */

import { css } from '@emotion/react'
import { Timer } from './molecules/timer/Timer'
import TimerMask from './timer-mask.svg?react'
import { TimerLabel } from './molecules/TimerLabel'

const orangeYellow = 'rgb(246, 183, 48)'
const tickColor = 'rgb(214, 242, 182)'

type ModeId = 'stop' | 'slow' | 'normal' | 'racing'

const MODES: { id: ModeId; label: string }[] = [
  { id: 'stop', label: 'Stop' },
  { id: 'slow', label: 'Slow' },
  { id: 'normal', label: 'Normal' },
  { id: 'racing', label: 'Racing' },
]

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

const svg = css`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
`

const content = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 900px;
`

const chromeOverlay = css`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
`

const headerHairline = css`
  position: absolute;
  top: 22%;
  left: 3%;
  width: 28%;
  height: 1px;
  background-color: ${orangeYellow};
  opacity: 0.55;
`

const header = css`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  padding: 0.65rem 0.75rem 0 0.65rem;
  min-height: 5.5rem;
`

const kanjiLabelContainer = css`
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: fit-content;
  transform: scaleX(0.66);
  transform-origin: top left;
  flex-shrink: 0;
  /* recover layout space lost to scaleX so English sits beside the visual kanji */
  margin-right: calc(-0.34 * 380px);
`

const kanjiLabel = css`
  display: block;
  width: fit-content;
  color: ${orangeYellow};
  font-size: 66px;
  font-family: 'Eva-Matisse_Classic', sans-serif;
  word-spacing: 0.1rem;
  letter-spacing: -0.25rem;
  line-height: 1.15;
  text-shadow: 0 0 6px rgba(246, 183, 48, 0.45);
`

const kanjiLabelSmall = css`
  ${kanjiLabel};
  font-size: 40px;
  line-height: 1.5;
`

const englishHeader = css`
  color: ${orangeYellow};
  font-family: Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -3px;
  white-space: nowrap;
  margin-left: 0.35rem;
  /* sit below the mask top edge, aligned to the kanji baseline like the original WIP */
  margin-top: 2.15rem;
  align-self: flex-start;
  z-index: 3;
  text-shadow: 0 0 4px rgba(246, 183, 48, 0.35);
`

const timerContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-top: -1.5rem;
  margin-left: 4.5rem;
  margin-right: 0.5rem;
  padding-bottom: 1.5rem;
  z-index: 100;
  min-height: 0;
`

const modeRail = css`
  width: 62%;
  margin-top: 0.55rem;
  margin-left: 3.25rem;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const modeTicksRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.35rem;
  height: 8px;
`

const modeGapTickPair = css`
  display: flex;
  gap: 3px;
  align-items: center;
`

const modeGapTick = css`
  width: 1.5px;
  height: 7px;
  background-color: ${orangeYellow};
`

const modeStrip = css`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 0.7rem;
  padding: 0.4rem 0.55rem;
`

const modeItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 58px;
  flex: 1;
  max-width: 120px;
  background-color: black;
  border: 1.5px solid ${orangeYellow};
  border-radius: 0;
  color: ${orangeYellow};
  box-sizing: border-box;
  overflow: hidden;
`

const modeItemText = css`
  font-family: Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-size: 18px;
  transform: scaleY(1.35);
  transform-origin: center top;
  line-height: 1;
  letter-spacing: -0.04rem;
  margin-top: 0.35rem;
  font-weight: 700;
`

const activeIndicator = css`
  margin-top: auto;
  height: 48%;
  width: 100%;
  background-color: #e00000;
`

const inactiveIndicator = css`
  margin-top: auto;
  height: 48%;
  width: 100%;
  background-color: transparent;
`

const labelColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  height: auto;
  width: 200px;
  flex-shrink: 0;
  /* pull up to align with the hairline under ACTIVE TIME REMAINING */
  margin-top: -3.25rem;
  margin-right: 0.25rem;
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
  height: 14px;
  width: 2px;
  background-color: ${tickColor};
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
    <div css={content}>
      <div css={svg}>
        <TimerMask />
      </div>
      <ChromeOverlay />
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
    <div css={modeRail}>
      <ModeTicksRow />
      <div css={modeStrip}>
        {MODES.map(({ id, label }) => (
          <div key={id} css={modeItem}>
            <div css={modeItemText}>{label}</div>
            <div
              css={id === activeMode ? activeIndicator : inactiveIndicator}
            />
          </div>
        ))}
      </div>
      <ModeTicksRow />
    </div>
  </div>
)

const MODE_TICK_SLOTS = 5

const ModeTicksRow = () => (
  <div css={modeTicksRow} aria-hidden>
    {Array.from({ length: MODE_TICK_SLOTS }, (_, i) => (
      <div key={i} css={modeGapTickPair}>
        <div css={modeGapTick} />
        <div css={modeGapTick} />
      </div>
    ))}
  </div>
)

const Spacer = () => (
  <span css={spacer}>
    <div css={point} />
    <div css={point} />
  </span>
)

const ChromeOverlay = () => (
  <div css={chromeOverlay} aria-hidden>
    <div css={headerHairline} />
  </div>
)
