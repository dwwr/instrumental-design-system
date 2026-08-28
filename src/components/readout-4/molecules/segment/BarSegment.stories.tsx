/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { BarSegment } from './BarSegment'

const meta: Meta<typeof BarSegment> = {
  title: 'Components/Readout4/BarSegment',
  component: BarSegment,
  render: args => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        padding: '1rem',
      }}
    >
      <BarSegment {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    number: 1,
  },
}
