/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react'
import { Hexagon } from './Hexagon'
import { containerStyle, mainStyle } from '../../styles'

const meta: Meta<typeof Hexagon> = {
  title: 'Components/Readout2/Hexagon',
  component: Hexagon,
  argTypes: {
    isOn: { control: 'boolean' },
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
      <div css={containerStyle} data-outline={args.isOn ? 'false' : 'true'}>
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
    text: 'Emergency',
  },
}

export const OffWithOutline: Story = {
  args: {
    isOn: false,
    text: 'Emergency',
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
      <div css={containerStyle} data-outline="true">
        <Hexagon {...args} />
      </div>
    </div>
  ),
}

export const OffWithoutOutline: Story = {
  args: {
    isOn: false,
    text: 'Emergency',
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
      <div css={containerStyle} data-outline="false">
        <Hexagon {...args} />
      </div>
    </div>
  ),
}
