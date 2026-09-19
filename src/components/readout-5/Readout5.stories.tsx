/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { Readout5 } from './Readout5'

const meta: Meta<typeof Readout5> = {
  title: 'Components/Readout5',
  component: Readout5,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Readout5 {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

/** Amber frozen frame matching the ATR reference (Racing active). */
export const Default: Story = {
  args: {
    activeMode: 'racing',
    isPaused: true,
    pausedColor: 'rgb(246, 183, 48)',
  },
}

/** Paused green state for comparison. */
export const PausedGreen: Story = {
  args: {
    activeMode: 'racing',
    isPaused: true,
    pausedColor: 'green',
  },
}
