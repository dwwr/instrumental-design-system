/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { SegmentedBar } from './SegmentedBar'

const meta: Meta<typeof SegmentedBar> = {
  title: 'Components/Readout1/SegmentedBar',
  component: SegmentedBar,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  render: args => (
    <div
      style={{
        width: '100%',
        height: '200px',
        backgroundColor: 'black',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      <SegmentedBar {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    value: 0,
  },
}

export const Quarter: Story = {
  args: {
    value: 25,
  },
}

export const Half: Story = {
  args: {
    value: 50,
  },
}

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
}

export const Full: Story = {
  args: {
    value: 100,
  },
}
