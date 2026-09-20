/** @jsxImportSource @emotion/react  */

import { css } from '@emotion/react'
import { hudTextBlur, HUD_TEXT_BLUR, hudActiveFlash } from '../styles'

export interface TimerLabelProps {
  japaneseText: string
  englishText: string
  active?: boolean
  flashing?: boolean
  faint?: boolean
  small?: boolean
}

const orangeYellow = 'rgb(255, 152, 20)'

const container = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${orangeYellow};
  border-radius: 2px;
  height: fit-content;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  background-color: #000;
`

const containerFaint = css`
  ${container};
  opacity: 0.1;
`

const content = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  letter-spacing: -0.05rem;
  z-index: 0;
  line-height: 1;
  width: 80%;
  min-width: 0;
  padding: 1px 0 2px;
`

const contentFull = css`
  ${content};
  width: 100%;
`

const textBaseStyle = css`
  ${hudTextBlur};
  color: ${orangeYellow};
  font-family: Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.1rem;
`

const kanji = css`
  ${textBaseStyle};
  font-family: 'Eva-Matisse_Classic', sans-serif;
`

const english = css`
  ${textBaseStyle};
  font-size: 36px;
  padding-left: 0.25rem;
  transform: scaleX(0.9);
  transform-origin: bottom left;
`

const englishExternal = css`
  ${english};
  transform: scaleX(0.85);
`

const kanjiLarge = css`
  ${kanji};
  font-size: 80px;
  line-height: 0.95;
`

const kanjiSmall = css`
  ${kanji};
  font-size: 40px;
  line-height: 1;
`

const squishedBase = css`
  transform-origin: bottom left;
`

const squishedKanji = css`
  ${squishedBase};
  transform: scaleX(0.56);
  padding-left: 3px;
`

const squishedText = css`
  ${english};
  ${squishedBase};
  font-size: 22px;
  font-weight: 600;
  transform: scaleX(0.6);
  padding-left: 13px;
`

const indicator = css`
  position: relative;
  z-index: 1;
  background-image: repeating-linear-gradient(
    135deg,
    red,
    red 16px,
    transparent 16px,
    transparent 32px
  );
  width: 20%;
  align-self: stretch;
  filter: blur(${HUD_TEXT_BLUR}) drop-shadow(0 0 4px #e00000)
    drop-shadow(0 0 6px rgba(224, 0, 0, 0.75));
`

const indicatorFlashing = css`
  ${indicator};
  ${hudActiveFlash};
`

export const TimerLabel = ({
  japaneseText,
  englishText,
  active = false,
  flashing = false,
  faint = false,
  small,
}: TimerLabelProps) => {
  const kanjiStyle = small ? [kanjiSmall, squishedKanji] : kanjiLarge
  const isExternal = englishText.toLowerCase() === 'external'
  const englishStyle = small
    ? squishedText
    : isExternal
    ? englishExternal
    : english

  return (
    <div css={faint ? containerFaint : container}>
      <div css={active ? content : contentFull}>
        <div css={kanjiStyle}>{japaneseText}</div>
        <div css={englishStyle}>{englishText}</div>
      </div>
      {active && <div css={flashing ? indicatorFlashing : indicator} />}
    </div>
  )
}
