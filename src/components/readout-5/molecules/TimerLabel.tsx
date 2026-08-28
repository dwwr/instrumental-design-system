/** @jsxImportSource @emotion/react  */

import { css } from '@emotion/react'

interface TimerLabelProps {
  japaneseText: string
  englishText: string
  showIndicator?: boolean
  small?: boolean
}

const orangeYellow = 'rgb(246, 183, 48)'

const container = css`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${orangeYellow};
  border-radius: 2px;
  height: fit-content;
  text-wrap: nowrap;
`

const content = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  letter-spacing: -0.05rem;
  z-index: 0;
  line-height: 1;
  width: 80%;
`

const textBaseStyle = css`
  color: ${orangeYellow};
  font-family: 'Helvetica';
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
`

const kanjiSmall = css`
  ${kanji};
  font-size: 40px;
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
`

export const TimerLabel = ({
  japaneseText,
  englishText,
  showIndicator,
  small
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
