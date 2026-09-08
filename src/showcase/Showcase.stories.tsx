/** @jsxImportSource react */
import { useEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Readout1, Readout1Props } from '../components/readout-1/Readout1'
import { Default as Readout1Default } from '../components/readout-1/Readout1.stories'
import { SegmentedBar } from '../components/readout-1/molecules/segmented-bar/SegmentedBar'
import { Readout2 } from '../components/readout-2/Readout2'
import {
  Default as Readout2Default,
  OutlinedOffHexagons as Readout2Outlined,
  StayOn as Readout2StayOn,
} from '../components/readout-2/Readout2.stories'
import { Readout3, Readout3Props } from '../components/readout-3/Readout3'
import { Default as Readout3Default } from '../components/readout-3/Readout3.stories'
import { ColumnGroup } from '../components/readout-3/molecules/chart/ColumnGroup'
import { SegmentedColumn } from '../components/readout-3/molecules/chart/SegmentedColumn'
import {
  DataLabel,
  DataLabelProps,
} from '../components/readout-3/molecules/data-label/DataLabel'
import { Readout4 } from '../components/readout-4/Readout4'
import { DataLabel as Readout4DataLabel } from '../components/readout-4/molecules/data-label/DataLabel'
import { BarSegment } from '../components/readout-4/molecules/segment/BarSegment'
import { Timer, TimerProps } from '../components/timer/Timer'
import { Default as TimerDefault } from '../components/timer/Timer.stories'

const meta: Meta = {
  title: 'Showcase',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
  },
}

export default meta
type Story = StoryObj

const showcaseLabelStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.55)',
  fontFamily: 'Helvetica, sans-serif',
  fontSize: '0.75rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const useIsMobile = (query = '(max-width: 768px)') => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

const SegmentedBarDemo = () => {
  const [value, setValue] = useState(50)

  return (
    <div
      style={{
        width: 'min(720px, 100%)',
        maxWidth: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={showcaseLabelStyle}>
        Segmented Bar — Slide to Change Value
      </div>
      <div style={{ width: '100%', height: '64px' }}>
        <SegmentedBar value={value} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        aria-label="Segmented bar value"
        style={{ width: '100%', accentColor: 'rgb(0, 180, 255)' }}
      />
    </div>
  )
}

const readout2Variants = [
  { name: 'Default', args: Readout2Default.args },
  { name: 'Outlined Off Hexagons', args: Readout2Outlined.args },
  { name: 'Stay On', args: Readout2StayOn.args },
] as const

const Readout2Row = () => {
  const isMobile = useIsMobile()

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 'min(1100px, 100%)',
        boxSizing: 'border-box',
      }}
    >
      <div style={showcaseLabelStyle}>
        Hexagonal &quot;Emergency&quot; Warning Overlay - Variations
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'stretch',
          gap: '0.75rem',
          marginTop: '0.75rem',
        }}
      >
        {readout2Variants.map(({ name, args }) => (
          <div key={name} style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                ...showcaseLabelStyle,
                textAlign: 'start',
                marginBottom: '0.35rem',
              }}
            >
              {name}
            </div>
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                maxWidth: isMobile ? '420px' : undefined,
                margin: isMobile ? '0 auto' : undefined,
                backgroundColor: 'black',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              <Readout2
                text={args?.text ?? 'Emergency'}
                outlineOffHexagons={args?.outlineOffHexagons}
                stayOn={args?.stayOn}
                stayOff={args?.stayOff}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const READOUT3_DESIGN_WIDTH = 960
const READOUT3_DESIGN_HEIGHT = 600

const Readout3Demo = () => {
  const isMobile = useIsMobile()
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!isMobile) {
      setScale(1)
      return
    }

    const frame = frameRef.current
    if (!frame) return

    const update = () => {
      setScale(Math.min(1, frame.clientWidth / READOUT3_DESIGN_WIDTH))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [isMobile])

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={showcaseLabelStyle}>Segmented Columns Readout</div>
      <div
        ref={frameRef}
        style={{
          width: '100%',
          height: READOUT3_DESIGN_HEIGHT * scale,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: isMobile ? READOUT3_DESIGN_WIDTH : '100%',
            height: READOUT3_DESIGN_HEIGHT,
            backgroundColor: 'black',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'start',
            boxSizing: 'border-box',
            overflow: 'hidden',
            transform: isMobile ? `scale(${scale})` : undefined,
            transformOrigin: 'top left',
          }}
        >
          <Readout3 {...(Readout3Default.args as Readout3Props)} />
        </div>
      </div>
    </div>
  )
}

const Readout1Demo = () => (
  <div
    style={{
      width: '100%',
      maxWidth: '100%',
      minWidth: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    }}
  >
    <div style={showcaseLabelStyle}>Segmented Bars Readout</div>
    <div style={{ width: '100%', height: '100%' }}>
      <Readout1 {...(Readout1Default.args as Readout1Props)} />
    </div>
  </div>
)

const dataLabelVariants: { name: string; args: DataLabelProps }[] = [
  {
    name: 'Default',
    args: {
      label: 'Blood Type:',
      text: 'Analyzing',
    },
  },
  {
    name: 'No Label',
    args: {
      text: 'Energy Observational Data',
    },
  },
  {
    name: 'Flicker',
    args: {
      label: 'Blood Type:',
      text: 'Analyzing',
      flicker: true,
    },
  },
  {
    name: 'Condensed',
    args: {
      text: 'High level energy field approaching',
      condensed: true,
    },
  },
]

const SegmentedColumnDemo = () => {
  const [value, setValue] = useState(50)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        minHeight: 0,
      }}
    >
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <SegmentedColumn numberOfBars={17} value={value} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        aria-label="Segmented column value"
        style={{ width: '100%', accentColor: 'rgb(251, 181, 19)' }}
      />
    </div>
  )
}

const DataLabelStories = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      justifyContent: 'center',
      minHeight: 0,
    }}
  >
    {dataLabelVariants.map(({ name, args }) => (
      <div key={name} style={{ flexShrink: 0 }}>
        <div style={{ ...showcaseLabelStyle, marginBottom: '0.35rem' }}>
          {name}
        </div>
        <div
          style={{
            height: '57px',
            display: 'flex',
            boxSizing: 'border-box',
          }}
        >
          <DataLabel {...args} />
        </div>
      </div>
    ))}
  </div>
)

const Readout3MoleculesDemo = () => {
  const isMobile = useIsMobile()

  const columnStyle: React.CSSProperties = {
    width: isMobile ? '100%' : '33%',
    height: isMobile ? '360px' : '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    minWidth: 0,
  }

  return (
    <div
      style={{
        width: '100%',
        height: isMobile ? 'auto' : '520px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        gap: '2rem',
        alignItems: 'stretch',
      }}
    >
      <div style={columnStyle}>
        <div style={{ ...showcaseLabelStyle, marginBottom: '0.35rem' }}>
          Column Group
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <ColumnGroup
            numberOfColumns={8}
            values={[10, 20, 30, 40, 50, 60, 70, 80]}
          />
        </div>
      </div>
      <div style={columnStyle}>
        <div style={{ ...showcaseLabelStyle, marginBottom: '1rem' }}>
          Data Labels
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            marginLeft: '2rem',
          }}
        >
          <DataLabelStories />
        </div>
      </div>
      <div style={columnStyle}>
        <div style={{ ...showcaseLabelStyle, marginBottom: '0.35rem' }}>
          Segmented Column — Slide to Change Value
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <SegmentedColumnDemo />
        </div>
      </div>
    </div>
  )
}

const READOUT4_DESIGN_WIDTH = 960
const READOUT4_DESIGN_HEIGHT = 540

const Readout4Demo = () => {
  const isMobile = useIsMobile()
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!isMobile) {
      setScale(1)
      return
    }

    const frame = frameRef.current
    if (!frame) return

    const update = () => {
      setScale(Math.min(1, frame.clientWidth / READOUT4_DESIGN_WIDTH))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [isMobile])

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={showcaseLabelStyle}>Life Support System Readout</div>
      <div
        ref={frameRef}
        style={{
          width: '100%',
          height: READOUT4_DESIGN_HEIGHT * scale,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: isMobile ? READOUT4_DESIGN_WIDTH : '100%',
            height: READOUT4_DESIGN_HEIGHT,
            backgroundColor: 'black',
            boxSizing: 'border-box',
            transform: isMobile ? `scale(${scale})` : undefined,
            transformOrigin: 'top left',
          }}
        >
          <Readout4 />
        </div>
      </div>
    </div>
  )
}

const readout4DataLabels = [
  { text: 'Life Support System' },
  { text: 'Link Control System' },
  { text: 'External Communications', squeeze: true },
  {
    text: 'Reserve Energy Remaining',
    bottomText: 'EVA-01 : Entry Plug',
  },
] as const

const barSegmentColors = [
  { name: 'Red', green: false },
  { name: 'Green', green: true },
] as const

const barSegmentMotions = [
  { name: 'Steady', flicker: false },
  { name: 'Flicker', flicker: true },
] as const

const Readout4MoleculesDemo = () => {
  const isMobile = useIsMobile()

  const columnStyle: React.CSSProperties = {
    width: isMobile ? '100%' : '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    minWidth: 0,
  }

  return (
    <div
      style={{
        width: '80%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        gap: '2rem',
        alignItems: 'stretch',
      }}
    >
      <div style={columnStyle}>
        <div style={showcaseLabelStyle}>Data Labels</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: isMobile ? 'center' : 'flex-start',
          }}
        >
          {readout4DataLabels.map(props => (
            <Readout4DataLabel key={props.text} {...props} />
          ))}
        </div>
      </div>
      <div style={columnStyle}>
        <div style={showcaseLabelStyle}>Bar Segments</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `auto repeat(${barSegmentColors.length}, 1fr)`,
            columnGap: '1.5rem',
            rowGap: '1.25rem',
            alignItems: 'center',
            justifyItems: 'start',
          }}
        >
          <div />
          {barSegmentColors.map(({ name }) => (
            <div
              key={`col-${name}`}
              style={{ ...showcaseLabelStyle, justifySelf: 'center' }}
            >
              {name}
            </div>
          ))}
          {barSegmentMotions.flatMap(({ name: motionName, flicker }) => [
            <div key={`row-${motionName}`} style={showcaseLabelStyle}>
              {motionName}
            </div>,
            ...barSegmentColors.map(({ name: colorName, green }) => (
              <div
                key={`${motionName}-${colorName}`}
                style={{ justifySelf: 'center' }}
              >
                <BarSegment number={1} green={green} flicker={flicker} />
              </div>
            )),
          ])}
        </div>
      </div>
    </div>
  )
}

const TimerDemo = () => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
    }}
  >
    <div style={showcaseLabelStyle}>Timer</div>
    <div style={{ width: '300px', height: '100px' }}>
      <Timer {...(TimerDefault.args as TimerProps)} />
    </div>
  </div>
)

export const Canvas: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        minHeight: '100vh',
        margin: 0,
        padding: '2rem',
        boxSizing: 'border-box',
        backgroundColor: 'black',
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '3rem',
      }}
    >
      <Readout3Demo />
      <Readout3MoleculesDemo />
      <Readout1Demo />
      <SegmentedBarDemo />
      <Readout2Row />
      <Readout4Demo />
      <Readout4MoleculesDemo />
      <TimerDemo />
    </div>
  ),
}
