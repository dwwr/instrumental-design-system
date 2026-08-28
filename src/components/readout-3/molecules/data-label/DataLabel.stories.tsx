/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { DataLabel } from './DataLabel'

const meta: Meta<typeof DataLabel> = {
  title: 'Components/Readout3/DataLabel',
  component: DataLabel,
  render: args => (
    <div
      style={{
        height: '57px',
        backgroundColor: 'black',
        display: 'flex',
        boxSizing: 'border-box',
      }}
    >
      <DataLabel {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Blood Type:',
    text: 'Analyzing',
  },
}

export const NoLabel: Story = {
  args: {
    text: 'Energy Observational Data',
  },
}

export const Flicker: Story = {
  args: {
    label: 'Blood Type:',
    text: 'Analyzing',
    flicker: true,
  },
}

export const Condensed: Story = {
  args: {
    text: 'High level energy field approaching',
    condensed: true,
  },
}
