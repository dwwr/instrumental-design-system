/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react'
import { Hexagon } from './Hexagon'
import { containerStyle, mainStyle } from '../../styles'

const meta: Meta<typeof Hexagon> = {
  title: 'Components/Readout2/Hexagon',
  component: Hexagon,
  argTypes: {
    isOn: { control: 'boolean' },
    outlineOffHexagons: { control: 'boolean' },
  },
  render: args => (
    <div
      css={mainStyle}
      style={{
        width: '130px',
        height: '90px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        marginLeft: '-1.75rem',
      }}
    >
      <div css={containerStyle}>
        <Hexagon {...args} />
      </div>
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const On: Story = {
  args: {
    isOn: true,
    outlineOffHexagons: false,
    text: 'Emergency',
  },
}

export const OffWithOutline: Story = {
  args: {
    isOn: false,
    outlineOffHexagons: true,
    text: 'Emergency',
  },
}

export const OffWithoutOutline: Story = {
  args: {
    isOn: false,
    outlineOffHexagons: false,
    text: 'Emergency',
  },
}
