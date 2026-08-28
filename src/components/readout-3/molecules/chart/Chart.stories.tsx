/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { Chart } from './Chart'

const baseArgs = {
  columnGroupCount: 3,
  columnGroupSize: 8,
  deviate: true,
}

const meta: Meta<typeof Chart> = {
  title: 'Components/Readout3/Chart',
  component: Chart,
  render: args => (
    <div
      style={{
        width: '100%',
        height: '600px',
        overflow: 'hidden',
        padding: '1rem',
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '200%',
          overflow: 'hidden',
        }}
      >
        <Chart {...args} />
      </div>
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Baseline: Story = {
  args: {
    ...baseArgs,
    benchmark: 0,
  },
}

export const Low: Story = {
  args: {
    ...baseArgs,
    benchmark: 25,
  },
}

export const Medium: Story = {
  args: {
    ...baseArgs,
    benchmark: 50,
  },
}

export const High: Story = {
  args: {
    ...baseArgs,
    benchmark: 90,
  },
}

export const NoDeviation: Story = {
  args: {
    ...baseArgs,
    benchmark: 50,
    deviate: false,
  },
}
