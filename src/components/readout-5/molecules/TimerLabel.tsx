/** @jsxImportSource @emotion/react  */

import { css } from '@emotion/react'
import { hudTextBlur, HUD_TEXT_BLUR } from '../styles'

interface TimerLabelProps {
  japaneseText: string
  englishText: string
  showIndicator?: boolean
  small?: boolean
}

const orangeYellow = 'rgb(255, 152, 20)'

const container = css`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${orangeYellow};
  border-radius: 2px;
  height: fit-content;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
`

const content = css`
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

export const TimerLabel = ({
  japaneseText,
  englishText,
  showIndicator,
  small,
}: TimerLabelProps) => {
  const kanjiStyle = small ? [kanjiSmall, squishedKanji] : kanjiLarge
  const englishStyle = small ? squishedText : english

  return (
    <div css={container}>
      <div css={content}>
        <div css={kanjiStyle}>{japaneseText}</div>
        <div css={englishStyle}>{englishText}</div>
      </div>
      {showIndicator && <div css={indicator} />}
    </div>
  )
}
