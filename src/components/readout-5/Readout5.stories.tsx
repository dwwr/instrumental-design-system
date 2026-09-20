/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { Readout5 } from './Readout5'

const meta: Meta<typeof Readout5> = {
  title: 'Components/Readout5',
  component: Readout5,
  parameters: {
    layout: 'fullscreen',
  },
  render: args => (
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

export const Running: Story = {
  args: {
    activeMode: 'racing',
    isPaused: false,
    isCompleted: false,
    pausedColor: 'rgb(255, 152, 20)',
    completedColor: 'rgb(209, 7, 10)',
  },
}

export const Paused: Story = {
  args: {
    activeMode: 'racing',
    isPaused: true,
    isCompleted: false,
    pausedColor: 'green',
    completedColor: 'rgb(209, 7, 10)',
  },
}

export const Completed: Story = {
  args: {
    activeMode: 'racing',
    isPaused: true,
    isCompleted: true,
    pausedColor: 'rgb(255, 152, 20)',
    completedColor: 'rgb(209, 7, 10)',
  },
}
