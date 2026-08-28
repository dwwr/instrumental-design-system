/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { DataLabel } from './DataLabel'

const meta: Meta<typeof DataLabel> = {
  title: 'Components/Readout4/DataLabel',
  component: DataLabel,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div
      style={{
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        gap: '1rem',
      }}
    >
      <DataLabel text="Life Support System" />
      <DataLabel text="Link Control System" />
      <DataLabel text="External Communications" squeeze />
      <DataLabel text="Reserve Energy Remaining" bottomText="EVA-01 : Entry Plug" />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
