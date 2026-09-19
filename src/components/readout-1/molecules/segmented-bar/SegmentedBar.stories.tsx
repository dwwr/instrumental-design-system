/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { SegmentedBar } from './SegmentedBar'

const variants: { name: string; value: number }[] = [
  { name: 'Near Empty', value: 0 },
  { name: 'Quarter', value: 25 },
  { name: 'Half', value: 50 },
  { name: 'Three Quarters', value: 75 },
  { name: 'Full', value: 100 },
]

const meta: Meta<typeof SegmentedBar> = {
  title: 'Components/Readout1/SegmentedBar',
  component: SegmentedBar,
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
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {variants.map(({ name, value }) => (
        <div key={name}>
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.55)',
              fontFamily: 'Helvetica, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '0.35rem',
            }}
          >
            {name}
          </div>
          <div
            style={{
              width: '100%',
              height: '80px',
              boxSizing: 'border-box',
            }}
          >
            <SegmentedBar value={value} />
          </div>
        </div>
      ))}
    </div>
  ),
}
