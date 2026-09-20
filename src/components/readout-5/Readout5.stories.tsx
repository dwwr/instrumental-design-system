/** @jsxImportSource react */
import { useEffect, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { animate } from 'animejs'
import { Readout5 } from './Readout5'

const meta: Meta<typeof Readout5> = {
  title: 'Components/Readout5',
  component: Readout5,
  parameters: {
    layout: 'fullscreen',
  },
  render: args => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
      }}
    >
      <Readout5 {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = {
  args: {
    activeMode: 'racing',
    isPaused: false,
    isCompleted: false,
    pausedColor: 'rgb(255, 152, 20)',
    completedColor: 'rgb(209, 7, 10)',
  },
}

export const Paused: Story = {
  args: {
    activeMode: 'racing',
    isPaused: true,
    isCompleted: false,
    pausedColor: 'green',
    completedColor: 'rgb(209, 7, 10)',
  },
}

export const Completed: Story = {
  args: {
    activeMode: 'racing',
    isPaused: true,
    isCompleted: true,
    pausedColor: 'rgb(255, 152, 20)',
    completedColor: 'rgb(209, 7, 10)',
  },
}

type PerspectiveArgs = React.ComponentProps<typeof Readout5> & {
  perspective: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
  duration: number
}

type TransformValues = {
  perspective: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
}

const PerspectiveStage = ({
  perspective,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  duration,
  ...args
}: PerspectiveArgs) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const values = useRef<TransformValues>({
    perspective: 900,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
  })

  useEffect(() => {
    const stage = stageRef.current
    const target = targetRef.current
    if (!stage || !target) return

    const anim = animate(values.current, {
      perspective,
      rotateX,
      rotateY,
      rotateZ,
      scale,
      duration,
      ease: 'out(3)',
      onRender: () => {
        const v = values.current
        stage.style.perspective = `${v.perspective}px`
        target.style.transform = `rotateX(${v.rotateX}deg) rotateY(${v.rotateY}deg) rotateZ(${v.rotateZ}deg) scale(${v.scale})`
      },
    })

    return () => {
      anim.pause()
    }
  }, [perspective, rotateX, rotateY, rotateZ, scale, duration])

  return (
    <div
      ref={stageRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        perspective: '900px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <div
        ref={targetRef}
        style={{
          transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',
          transformStyle: 'preserve-3d',
        }}
      >
        <Readout5 {...args} />
      </div>
    </div>
  )
}

export const Perspective: StoryObj<PerspectiveArgs> = {
  args: {
    activeMode: 'racing',
    isPaused: false,
    isCompleted: false,
    pausedColor: 'rgb(255, 152, 20)',
    completedColor: 'rgb(209, 7, 10)',
    perspective: 480,
    rotateX: -28,
    rotateY: -21,
    rotateZ: -32,
    scale: 0.82,
    duration: 1400,
  },
  argTypes: {
    perspective: { control: { type: 'range', min: 400, max: 2000, step: 20 } },
    rotateX: { control: { type: 'range', min: -180, max: 180, step: 1 } },
    rotateY: { control: { type: 'range', min: -180, max: 180, step: 1 } },
    rotateZ: { control: { type: 'range', min: -180, max: 180, step: 1 } },
    scale: { control: { type: 'range', min: 0.5, max: 1.2, step: 0.01 } },
    duration: {
      control: { type: 'range', min: 0, max: 2000, step: 50 },
      description: 'anime.js tween duration (ms)',
    },
  },
  render: args => <PerspectiveStage {...args} />,
}
