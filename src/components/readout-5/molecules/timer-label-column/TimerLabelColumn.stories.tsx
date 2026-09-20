/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react'
import { css } from '@emotion/react'
import { HUD_TICK, hudTickBlur } from '../../styles'
import { TimerLabel } from '../TimerLabel'

const meta: Meta = {
  title: 'Components/Readout5/TimerLabelColumn',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

const column = css`
  display: flex;
  flex-direction: column;
  width: 200px;
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

export const Default: Story = {
  render: () => (
    <div
      style={{
        minWidth: 280,
        padding: '3rem 2.5rem',
        borderRadius: 4,
        background:
          'linear-gradient(90deg, rgba(163,26,10,1) 0%, rgba(105,217,28,1) 50%, rgba(52,155,135,1) 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25)',
      }}
    >
      <div css={column}>
        <Spacer />
        <TimerLabel japaneseText="内部" englishText="Internal" active />
        <Spacer />
        <TimerLabel
          japaneseText="主電源供給システム"
          englishText="Main Energy Supply System"
          small
        />
        <Spacer />
        <TimerLabel japaneseText="外部" englishText="External" active />
        <Spacer />
      </div>
    </div>
  ),
}
