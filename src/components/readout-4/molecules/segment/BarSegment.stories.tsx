/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { BarSegment } from './BarSegment'

const colors = [
  { name: 'Red', green: false },
  { name: 'Green', green: true },
] as const

const motions = [
  { name: 'Steady', flicker: false },
  { name: 'Flicker', flicker: true },
] as const

const labelStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.55)',
  fontFamily: 'Helvetica, sans-serif',
  fontSize: '0.75rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const meta: Meta<typeof BarSegment> = {
  title: 'Components/Readout4/BarSegment',
  component: BarSegment,
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
        display: 'grid',
        gridTemplateColumns: `auto repeat(${colors.length}, 1fr)`,
        columnGap: '1.5rem',
        rowGap: '1.25rem',
        alignItems: 'center',
        justifyItems: 'start',
      }}
    >
      <div />
      {colors.map(({ name }) => (
        <div key={`col-${name}`} style={{ ...labelStyle, justifySelf: 'center' }}>
          {name}
        </div>
      ))}
      {motions.flatMap(({ name: motionName, flicker }) => [
        <div key={`row-${motionName}`} style={labelStyle}>
          {motionName}
        </div>,
        ...colors.map(({ name: colorName, green }) => (
          <div
            key={`${motionName}-${colorName}`}
            style={{ justifySelf: 'center' }}
          >
            <BarSegment number={1} green={green} flicker={flicker} />
          </div>
        )),
      ])}
    </div>
  ),
}
