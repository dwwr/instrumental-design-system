/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { Readout3 } from './Readout3'

const meta: Meta<typeof Readout3> = {
  title: 'Components/Readout3',
  component: Readout3,
  argTypes: {
    benchmark: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
  render: args => (
    <div
      style={{
        width: '100%',
        height: '600px',
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '1rem',
      }}
    >
      <Readout3 {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
