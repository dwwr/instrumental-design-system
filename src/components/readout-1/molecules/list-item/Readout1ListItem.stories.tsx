/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react'
import { Readout1ListItem } from './Readout1ListItem'

const meta: Meta<typeof Readout1ListItem> = {
  title: 'Components/Readout1/Readout1ListItem',
  component: Readout1ListItem,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
  render: args => (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: '10% 90%',
      }}
    >
      <Readout1ListItem {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    subject: 'subject',
    subjectNumber: '00',
    subjectLabel: 'EMPTY.C',
    value: 0,
  },
}

export const Quarter: Story = {
  args: {
    subject: 'subject',
    subjectNumber: '01',
    subjectLabel: 'QUARTER.C',
    value: 25,
  },
}

export const Half: Story = {
  args: {
    subject: 'subject',
    subjectNumber: '02',
    subjectLabel: 'HALF.C',
    value: 50,
  },
}

export const ThreeQuarters: Story = {
  args: {
    subject: 'subject',
    subjectNumber: '03',
    subjectLabel: 'THREE.C',
    value: 75,
  },
}

export const Full: Story = {
  args: {
    subject: 'subject',
    subjectNumber: '04',
    subjectLabel: 'FULL.C',
    value: 100,
  },
}
