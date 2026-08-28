/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { Timer } from './Timer'

const meta: Meta<typeof Timer> = {
  title: 'Components/Timer',
  component: Timer,
  argTypes: {
    milliseconds: { control: 'number' },
  },
  render: args => (
    <div
      style={{
        width: '300px',
        height: '100px',
      }}
    >
      <Timer {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    milliseconds: 300000,
    runningColor: 'red',
    pausedColor: 'blue',
    completedColor: 'green',
    isPaused: false,
  },
}
