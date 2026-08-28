/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { Readout5 } from './Readout5'

const meta: Meta<typeof Readout5> = {
  title: 'Components/Readout5',
  component: Readout5,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Readout5 />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
