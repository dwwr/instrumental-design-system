/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { ColumnGroup } from './ColumnGroup'

const meta: Meta<typeof ColumnGroup> = {
  title: 'Components/Readout3/ColumnGroup',
  component: ColumnGroup,
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
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <ColumnGroup {...args} />
      </div>
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    numberOfColumns: 8,
    values: [10, 20, 30, 40, 50, 60, 70, 80],
  },
}
