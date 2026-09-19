/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { Readout4 } from './Readout4'

const meta: Meta<typeof Readout4> = {
  title: 'Components/Readout4',
  component: Readout4,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 6, step: 1 },
    },
  },
  render: args => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Readout4 {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 1,
  },
}
