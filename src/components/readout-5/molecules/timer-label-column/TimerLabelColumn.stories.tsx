/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { TimerLabelColumn } from './TimerLabelColumn'

const meta: Meta<typeof TimerLabelColumn> = {
  title: 'Components/Readout5/TimerLabelColumn',
  component: TimerLabelColumn,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** All three labels fully on for visual reference. */
export const Default: Story = {
  args: {
    allOn: true,
  },
  render: (args) => (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '3rem 2.5rem',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TimerLabelColumn {...args} />
    </div>
  ),
}
