/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { DataLabel, DataLabelProps } from './DataLabel'

const variants: { name: string; args: DataLabelProps }[] = [
  {
    name: 'Default',
    args: {
      label: 'Blood Type:',
      text: 'Analyzing',
    },
  },
  {
    name: 'No Label',
    args: {
      text: 'Energy Observational Data',
    },
  },
  {
    name: 'Flicker',
    args: {
      label: 'Blood Type:',
      text: 'Analyzing',
      flicker: true,
    },
  },
  {
    name: 'Condensed',
    args: {
      text: 'High level energy field approaching',
      condensed: true,
    },
  },
]

const meta: Meta<typeof DataLabel> = {
  title: 'Components/Readout3/DataLabel',
  component: DataLabel,
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
        justifyContent: 'center',
      }}
    >
      {variants.map(({ name, args }) => (
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
              height: '57px',
              display: 'flex',
              boxSizing: 'border-box',
            }}
          >
            <DataLabel {...args} />
          </div>
        </div>
      ))}
    </div>
  ),
}
