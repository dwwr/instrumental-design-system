/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { SegmentedColumn } from './SegmentedColumn'

const baseArgs = {
  numberOfBars: 17,
}

const meta: Meta<typeof SegmentedColumn> = {
  title: 'Components/Readout3/SegmentedColumn',
  component: SegmentedColumn,
  render: args => (
    <div
      style={{
        width: '150px',
        height: '600px',
        overflow: 'hidden',
        padding: '1rem',
        backgroundColor: 'black',
      }}
    >
      <SegmentedColumn {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    ...baseArgs,
    value: 0,
  },
}

export const Quarter: Story = {
  args: {
    ...baseArgs,
    value: 25,
  },
}

export const Half: Story = {
  args: {
    ...baseArgs,
    value: 50,
  },
}

export const ThreeQuarters: Story = {
  args: {
    ...baseArgs,
    value: 75,
  },
}

export const Full: Story = {
  args: {
    ...baseArgs,
    value: 100,
  },
}
