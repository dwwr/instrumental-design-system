/** @jsxImportSource react */
import type { Meta, StoryObj } from '@storybook/react'
import { SevenSegmentDisplay } from './SevenSegmentDisplay'

const meta: Meta<typeof SevenSegmentDisplay> = {
  title: 'Components/SevenSegmentDisplay',
  component: SevenSegmentDisplay,
  argTypes: {
    number: {
      control: { type: 'number', min: 0, max: 9, step: 1 },
    },
    color: {
      control: { type: 'color' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '120px', height: '180px', position: 'relative' }}>
        <SevenSegmentDisplay number={8} color="#ff0000" />
      </div>
    </div>
  ),
}

export const AllDigits: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      {[...Array(10).keys()].map(num => (
        <div key={num} style={{ width: '120px', height: '180px', position: 'relative' }}>
          <SevenSegmentDisplay number={num} color="#ff0000" />
        </div>
      ))}
    </div>
  ),
}

export const DifferentSizes: Story = {
  render: () => {
    const sizes = [
      { label: 'Small (60px × 90px)', width: 60, height: 90 },
      { label: 'Medium (120px × 180px)', width: 120, height: 180 },
      { label: 'Large (240px × 360px)', width: 240, height: 360 },
      { label: 'Extra Large (400px × 600px)', width: 400, height: 600 },
    ]

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          boxSizing: 'border-box',
        }}
      >
        {sizes.map(({ label, width, height }) => (
          <div
            key={label}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
          >
            <h3 style={{ color: 'white', margin: 0 }}>{label}</h3>
            <div style={{ width, height, position: 'relative' }}>
              <SevenSegmentDisplay number={8} color="#00ff00" />
            </div>
          </div>
        ))}
      </div>
    )
  },
}

export const AspectRatioContainment: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <h3 style={{ color: 'white', margin: 0 }}>Using aspect-ratio CSS (2:3 ratio)</h3>
        <div
          style={{
            width: '200px',
            aspectRatio: '2 / 3',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <SevenSegmentDisplay number={8} color="#ff00ff" />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <h3 style={{ color: 'white', margin: 0 }}>Using padding-bottom trick (responsive width)</h3>
        <div style={{ width: '300px', maxWidth: '100%' }}>
          <div
            style={{
              width: '100%',
              paddingBottom: '150%',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <SevenSegmentDisplay number={8} color="#ff00ff" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const MultipleDigits: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
        gap: '1rem',
      }}
    >
      {[1, 2, 3, 4].map(num => (
        <div key={num} style={{ width: '100px', height: '150px', position: 'relative' }}>
          <SevenSegmentDisplay number={num} color="#00ffff" />
        </div>
      ))}
    </div>
  ),
}

export const DifferentColors: Story = {
  render: () => {
    const colorVariants = [
      { color: '#ff0000', name: 'Red' },
      { color: '#00ff00', name: 'Green' },
      { color: '#0000ff', name: 'Blue' },
      { color: '#ffff00', name: 'Yellow' },
      { color: '#ff00ff', name: 'Magenta' },
      { color: '#00ffff', name: 'Cyan' },
      { color: '#ffffff', name: 'White' },
      { color: '#ff8800', name: 'Orange' },
    ]

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          boxSizing: 'border-box',
        }}
      >
        {colorVariants.map(({ color, name }) => (
          <div
            key={color}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '100px', height: '150px', position: 'relative' }}>
              <SevenSegmentDisplay number={8} color={color} />
            </div>
            <span style={{ color: 'white', fontSize: '0.875rem' }}>{name}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const ResponsiveScaling: Story = {
  render: () => {
    const widths = [
      { width: '50%', label: 'Responsive: 50% width with aspect ratio' },
      { width: '25%', label: 'Responsive: 25% width with aspect ratio' },
      { width: '75%', label: 'Responsive: 75% width with aspect ratio' },
    ]

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          boxSizing: 'border-box',
        }}
      >
        {widths.map(({ width, label }) => (
          <div
            key={width}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              width: '100%',
              maxWidth: '600px',
            }}
          >
            <h3 style={{ color: 'white', margin: 0 }}>{label}</h3>
            <div
              style={{
                width: width,
                aspectRatio: '2 / 3',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <SevenSegmentDisplay number={8} color="#ff0088" />
            </div>
          </div>
        ))}
      </div>
    )
  },
}

export const AspectRatioComparison: Story = {
  render: () => {
    const containers = [
      {
        label: 'Correct: 2:3 aspect ratio (200px × 300px)',
        width: '200px',
        height: '300px',
        border: '1px solid rgba(0, 255, 0, 0.5)',
        color: '#00ff00',
      },
      {
        label: 'Too wide: 1:1 aspect ratio (200px × 200px)',
        width: '200px',
        height: '200px',
        border: '1px solid rgba(255, 0, 0, 0.5)',
        color: '#ff0000',
      },
      {
        label: 'Too tall: 1:2 aspect ratio (200px × 400px)',
        width: '200px',
        height: '400px',
        border: '1px solid rgba(255, 0, 0, 0.5)',
        color: '#ff0000',
      },
    ]

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          boxSizing: 'border-box',
        }}
      >
        {containers.map(({ label, width, height, border, color }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <h3 style={{ color: 'white', margin: 0 }}>{label}</h3>
            <div
              style={{
                width,
                height,
                position: 'relative',
                border,
              }}
            >
              <SevenSegmentDisplay number={8} color={color} />
            </div>
          </div>
        ))}
      </div>
    )
  },
}
