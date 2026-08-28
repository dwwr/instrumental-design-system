/** @jsxImportSource @emotion/react  */

import { css } from '@emotion/react'
import { Timer } from './molecules/timer/Timer'
import TimerMask from './timer-mask.svg?react'
import { TimerLabel } from './molecules/TimerLabel'

const orangeYellow = 'rgb(246, 183, 48)'
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
  height: 100%;
  width: 100%;
`

const content = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 900px;
  /* background-color: red; */
`

const header = css`
  /* display: flex; */
`

const kanjiLabelContainer = css`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  height: 100%;
  z-index: 1;
  width: fit-content;
  transform: scaleX(0.66);
  transform-origin: bottom left;
`

const kanjiLabel = css`
  display: flex;
  width: fit-content;
  color: ${orangeYellow};
  border-radius: 10px;
  font-size: 66px;
  font-family: 'Eva-Matisse_Classic', sans-serif;
  z-index: 0;
  word-spacing: 0.1rem;
  letter-spacing: -0.25rem;
  line-height: 1.2;
  /* text-wrap: nowrap; */
`

const kanjiLabelSmall = css`
  ${kanjiLabel};
  font-size: 40px;
  line-height: 1.8;
`

const timerContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70%;
  /* width: 100%; */
  /* width: 100%; */
  margin-top: -3rem;
  margin-left: 4.5rem;
  /* background-color: red; */
  z-index: 100;
`

const labelText = css`
  color: ${orangeYellow};
  font-family: 'Helvetica';
  text-transform: uppercase;
  font-size: 32px;
  text-wrap: nowrap;
  align-self: flex-end;
  /* margin-left: 1rem; */
  letter-spacing: -3px;
  z-index: 3;
`

const modeContainer = css`
  width: 60%;
  margin-top: 2rem;
  margin-left: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const modeItem = css`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  align-items: center;
  text-align: center;
  height: 90px;
  width: 110px;
  background-color: black;
  border: 2px solid ${orangeYellow};
  border-radius: 5px;
  color: ${orangeYellow};
  margin-left: 1rem;
`

const modeItemText = css`
  font-family: 'Helvetica';
  text-transform: uppercase;
  font-size: 22px;
  transform-origin: top left;
  transform: scaleY(1.5);
  line-height: 1;
  letter-spacing: -0.05rem;
  margin: 0.25rem;
`

const activeIndicator = css`
  margin-top: 0.5rem;
  height: 30px;
  width: 90%;
  background-color: red;
`

const labelColumn = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 200px;
  margin-right: 1rem;
  & > * {
    margin-bottom: 0.5rem;
  }
  & > *:last-child {
    margin-top: auto;
  }
`

const spacer = css`
  /* height: 1px; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const point = css`
  height: 5px;
  width: 2px;
  background-color: rgb(214, 242, 182);
`

export interface Readout5Props {}

export const Readout5 = (_props: Readout5Props) => (
  <div css={container}>
    <div css={content}>
      <div css={svg}>
        <TimerMask />
      </div>
      <div css={header}>
        <div css={kanjiLabelContainer}>
          <span css={kanjiLabel}>
            <span>活動限界まで</span>
            <span css={labelText} style={{ marginLeft: '1rem' }}>
              {' '}
              Active Time Remaining:
            </span>
          </span>
          <div css={kanjiLabelSmall}>あと</div>
        </div>
      </div>
      <div css={timerContainer}>
        <Timer
          milliseconds={298560}
          isPaused={true}
          runningColor={orangeYellow}
          pausedColor={'green'}
          completedColor={'rgb(209, 7, 10)'}
        />
        <div css={labelColumn}>
          <Spacer />
          <TimerLabel japaneseText="内部" englishText="Internal" showIndicator />
          <Spacer />
          <TimerLabel
            japaneseText="主電源供給システム"
            englishText="Main Energy Supply System"
            small
          />
          <Spacer />
          <Spacer />
        </div>
      </div>
    </div>
    <div css={modeContainer}>
      <div css={modeItem}>
        <div css={modeItemText}>Stop </div>
        <div css={activeIndicator} />
      </div>
      <div css={modeItem}>
        <div css={modeItemText}>Slow </div>
        <div css={activeIndicator} />
      </div>
      <div css={modeItem}>
        <div css={modeItemText}>Normal </div>
        <div css={activeIndicator} />
      </div>
      <div css={modeItem}>
        <div css={modeItemText}>Racing </div>
        <div css={activeIndicator} />
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
