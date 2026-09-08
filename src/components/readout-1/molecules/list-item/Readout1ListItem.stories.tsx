/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react'
import { Readout1ListItem } from './Readout1ListItem'

const baseArgs = {
  subject: 'subject',
  subjectNumber: '00',
  subjectLabel: 'SAMPLE.C',
} as const

const variants: { name: string; value: number }[] = [
  { name: 'Near Empty', value: 0 },
  { name: 'Quarter', value: 25 },
  { name: 'Half', value: 50 },
  { name: 'Three Quarters', value: 75 },
  { name: 'Full', value: 100 },
]

const meta: Meta<typeof Readout1ListItem> = {
  title: 'Components/Readout1/Readout1ListItem',
  component: Readout1ListItem,
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
              display: 'grid',
              gridTemplateColumns: '10% 90%',
              width: '100%',
            }}
          >
            <Readout1ListItem {...baseArgs} value={value} />
          </div>
        </div>
      ))}
    </div>
  ),
}
