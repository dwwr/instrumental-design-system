/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { Readout1 } from './Readout1'

const meta: Meta<typeof Readout1> = {
  title: 'Components/Readout1',
  component: Readout1,
  render: args => (
    <div
      style={{
        width: '100%',
        height: '100vw',
        minHeight: '500px',
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        boxSizing: 'border-box',
      }}
    >
      <Readout1 {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'MENTAL TOXICITY LEVEL',
    kpi1Key: 'ELAPSED TIME',
    kpi1Value: '120 min.',
    kpi2Key: 'L.C.L. PURITY',
    kpi2Value: '99.9999989%',
    items: [
      { subject: 'subject', subjectNumber: '00', subjectLabel: 'FIRST.C', value: 25 },
      { subject: 'subject', subjectNumber: '01', subjectLabel: 'THIRD.C', value: 50 },
      { subject: 'subject', subjectNumber: '02', subjectLabel: 'SECOND.C', value: 85 },
    ],
  },
}

export const Empty: Story = {
  args: {
    title: 'MENTAL TOXICITY LEVEL',
    kpi1Key: 'ELAPSED TIME',
    kpi1Value: '120 min.',
    kpi2Key: 'L.C.L. PURITY',
    kpi2Value: '99.9999989%',
    items: [],
  },
}

export const Loading: Story = {
  args: {
    title: 'Loading',
    kpi1Key: 'Loading',
    kpi1Value: 'Loading',
    kpi2Key: 'Loading',
    kpi2Value: 'Loading',
    isLoading: true,
  },
}
