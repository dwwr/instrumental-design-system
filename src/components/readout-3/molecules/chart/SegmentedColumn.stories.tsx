/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { SegmentedColumn } from './SegmentedColumn'

const variants: { name: string; value: number }[] = [
  { name: 'Empty', value: 0 },
  { name: 'Quarter', value: 25 },
  { name: 'Half', value: 50 },
  { name: 'Three Quarters', value: 75 },
  { name: 'Full', value: 100 },
]

const meta: Meta<typeof SegmentedColumn> = {
  title: 'Components/Readout3/SegmentedColumn',
  component: SegmentedColumn,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Stories: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'black',
        boxSizing: 'border-box',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: '0.75rem',
      }}
    >
      {variants.map(({ name, value }) => (
        <div
          key={name}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
          }}
        >
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.55)',
              fontFamily: 'Helvetica, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '0.35rem',
              textAlign: 'center',
            }}
          >
            {name}
          </div>
          <div
            style={{
              flex: 1,
              minHeight: '600px',
              overflow: 'hidden',
            }}
          >
            <SegmentedColumn numberOfBars={17} value={value} />
          </div>
        </div>
      ))}
    </div>
  ),
}
