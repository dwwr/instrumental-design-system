/** @jsxImportSource react */
import { useEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ModeRow, type ModeId } from './ModeRow'

const MODE_ROW_DESIGN_WIDTH = 640
const MODE_ROW_DESIGN_HEIGHT = 130

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
  render: (args) => {
    const [activeMode, setActiveMode] = useState<ModeId>(
      args.activeMode ?? 'racing',
    )
    const frameRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)

    useEffect(() => {
      const frame = frameRef.current
      if (!frame) return

      const update = () => {
        setScale(Math.min(1, frame.clientWidth / MODE_ROW_DESIGN_WIDTH))
      }

      update()
      const observer = new ResizeObserver(update)
      observer.observe(frame)
      return () => observer.disconnect()
    }, [])

    return (
      <div
        style={{
          width: '100vw',
          minHeight: '100vh',
          boxSizing: 'border-box',
          padding: '1.5rem',
          background:
            'linear-gradient(90deg, rgba(163,26,10,1) 0%, rgba(105,217,28,1) 50%, rgba(52,155,135,1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          ref={frameRef}
          style={{
            width: '100%',
            maxWidth: MODE_ROW_DESIGN_WIDTH,
            height: MODE_ROW_DESIGN_HEIGHT * scale,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: MODE_ROW_DESIGN_WIDTH,
              height: MODE_ROW_DESIGN_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <ModeRow
              {...args}
              activeMode={activeMode}
              onModeClick={setActiveMode}
            />
          </div>
        </div>
      </div>
    )
  },
}
