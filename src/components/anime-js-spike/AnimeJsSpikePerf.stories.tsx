/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { AnimeJsSpikePerf } from './AnimeJsSpikePerf'

const meta: Meta<typeof AnimeJsSpikePerf> = {
  title: 'Spikes/AnimeJs/Perf',
  component: AnimeJsSpikePerf,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    value: 50,
  },
}
