/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { AnimeJsSpike } from './AnimeJsSpike'

const meta: Meta<typeof AnimeJsSpike> = {
  title: 'Spikes/AnimeJs',
  component: AnimeJsSpike,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
