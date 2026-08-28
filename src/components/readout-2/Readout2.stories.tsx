/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { Readout2 } from './Readout2'

const meta: Meta<typeof Readout2> = {
  title: 'Components/Readout2',
  component: Readout2,
  render: args => (
    <div
      style={{
        width: '500px',
        height: '500px',
        backgroundColor: 'black',
        boxSizing: 'border-box',
      }}
    >
      <Readout2 {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Emergency',
  },
}

export const OutlinedOffHexagons: Story = {
  args: {
    text: 'Emergency',
    outlineOffHexagons: true,
  },
}

export const StayOn: Story = {
  args: {
    text: 'Emergency',
    stayOn: true,
    stayOff: false,
  },
}

export const StayOff: Story = {
  args: {
    text: 'Emergency',
    stayOff: true,
    stayOn: false,
    outlineOffHexagons: true,
  },
}
