/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { ModeRow } from './ModeRow'

const meta: Meta<typeof ModeRow> = {
  title: 'Components/Readout5/ModeRow',
  component: ModeRow,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    activeMode: 'racing',
  },
  render: (args) => (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '3rem',
        background:
          'linear-gradient(90deg, rgba(163,26,10,1) 0%, rgba(105,217,28,1) 50%, rgba(52,155,135,1) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ModeRow {...args} />
    </div>
  ),
}
