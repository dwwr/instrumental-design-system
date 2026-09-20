/** @jsxImportSource @emotion/react */

import { Fragment } from 'react'
import { css } from '@emotion/react'
import { HUD_AMBER } from '../../styles'
import { ModeItem, MODE_ITEM_WIDTH, MODE_TICK_GAP } from '../mode-item/ModeItem'

export type ModeId = 'stop' | 'slow' | 'normal' | 'racing'

export interface ModeOption {
  id: ModeId
  label: string
}

export const DEFAULT_MODES: ModeOption[] = [
  { id: 'stop', label: 'Stop' },
  { id: 'slow', label: 'Slow' },
  { id: 'normal', label: 'Normal' },
  { id: 'racing', label: 'Racing' },
]

export const MODE_GAP = '0.9rem'

export interface ModeRowProps {
  modes?: ModeOption[]
  activeMode?: ModeId
  onModeClick?: (id: ModeId) => void
}

const row = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
`

const yellowTickPair = css`
  display: flex;
  gap: 3px;
  align-items: center;
  flex-shrink: 0;
  height: 16px;
`

const yellowTick = css`
  width: 1.5px;
  height: 10px;
  background-color: ${HUD_AMBER};
  filter: drop-shadow(0 0 1px rgba(255, 152, 20, 1))
    drop-shadow(0 0 3px rgba(255, 152, 20, 0.75))
    drop-shadow(0 0 6px rgba(255, 140, 10, 0.35));
`

const gapSlot = css`
  width: ${MODE_GAP};
  flex: 0 0 ${MODE_GAP};
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const edgeSlot = css`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
`

const modeSlot = css`
  display: flex;
  flex-direction: column;
  flex: 0 0 ${MODE_ITEM_WIDTH}px;
  width: ${MODE_ITEM_WIDTH}px;
  margin-top: ${MODE_TICK_GAP};
`

const YellowTicks = () => (
  <div css={yellowTickPair} aria-hidden>
    <div css={yellowTick} />
    <div css={yellowTick} />
  </div>
)

export const ModeRow = ({
  modes = DEFAULT_MODES,
  activeMode = 'racing',
  onModeClick,
}: ModeRowProps) => (
  <div css={row}>
    <div css={edgeSlot}>
      <YellowTicks />
    </div>
    {modes.map(({ id, label }, i) => (
      <Fragment key={id}>
        <div css={modeSlot}>
          <ModeItem
            label={label}
            active={id === activeMode}
            onClick={onModeClick ? () => onModeClick(id) : undefined}
          />
        </div>
        {i < modes.length - 1 ? (
          <div css={gapSlot}>
            <YellowTicks />
          </div>
        ) : (
          <div css={edgeSlot}>
            <YellowTicks />
          </div>
        )}
      </Fragment>
    ))}
  </div>
)
