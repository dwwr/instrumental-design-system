/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { HUD_AMBER, HUD_TEXT_BLUR, hudTextBlur } from '../../styles'

export const MODE_ITEM_WIDTH = 120
export const MODE_TICK_GAP = '0.45rem'

export interface ModeItemProps {
  label: string
  active?: boolean
  width?: number
}

const root = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 0 0 auto;
`

const card = (width: number) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 80px;
  width: ${width}px;
  background-color: black;
  border: 1.5px solid ${HUD_AMBER};
  border-radius: 5px;
  color: ${HUD_AMBER};
  box-sizing: border-box;
  overflow: hidden;
  filter: drop-shadow(0 0 1px rgba(255, 152, 20, 1))
    drop-shadow(0 0 3px rgba(255, 152, 20, 0.75))
    drop-shadow(0 0 6px rgba(255, 140, 10, 0.35));
`

const labelStyle = css`
  ${hudTextBlur};
  margin-top: 0.25rem;
  font-family: Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-size: 26px;
  transform: scaleY(1.4);
  transform-origin: center top;
  line-height: 1;
  letter-spacing: -0.04rem;
  font-weight: 700;
`

const activeIndicator = css`
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  height: 40%;
  width: 100%;
  background-color: #e00000;
  filter: drop-shadow(0 0 4px #e00000)
    drop-shadow(0 0 6px rgba(224, 0, 0, 0.75));
`

const inactiveIndicator = css`
  ${activeIndicator};
  background-color: transparent;
  filter: none;
`

const bottomTicks = (width: number) => css`
  display: flex;
  justify-content: space-between;
  width: ${width}px;
  height: 8px;
  margin-top: ${MODE_TICK_GAP};
`

const blackTick = css`
  width: 1.5px;
  height: 7px;
  background-color: #000;
  filter: blur(${HUD_TEXT_BLUR});
`

export const ModeItem = ({
  label,
  active = false,
  width = MODE_ITEM_WIDTH,
}: ModeItemProps) => (
  <div css={root}>
    <div css={card(width)}>
      <div css={labelStyle}>{label}</div>
      <div css={active ? activeIndicator : inactiveIndicator} />
    </div>
    <div css={bottomTicks(width)} aria-hidden>
      <div css={blackTick} />
      <div css={blackTick} />
    </div>
  </div>
)
