/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { animate, createScope, stagger, utils } from 'animejs'
import { useEffect, useRef, useState } from 'react'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  /* background: #0a0a0a; */
  color: #f6b730;
  font-family: Helvetica, Arial, sans-serif;
`

const barsStyle = css`
  /* display: flex;
  gap: 0.5rem;
  align-items: flex-end; */
  height: 160px;
  border: 1;
  border-color: #0a0a0a;
  border-style: solid;
  /* height: 100%; */
  display: flex;
  align-items: center;
  width: 100%;
`

// const barStyle = css`
//   width: 28px;
//   height: 40px;
//   background: #f6b730;
//   border-radius: 2px;
//   transform-origin: bottom center;
// `

const barStyle = (i: number, currentNumber: number) => {
  const gradientColor = getGradientColor(i, 40)
  return css`
    background: ${i > currentNumber ? 'none' : gradientColor};
    flex: 1;
    height: 75%;
    border-radius: 3px;
    margin: 0 0.1rem;
    box-shadow: ${i > currentNumber ? 'none' : `0 0 15px ${gradientColor}`};
  `
}

const getGradientColor = (index: number, total: number): string => {
  // For a smoother transition, we'll break it into phases
  if (index < total * 0.4) {
    // Cyan to Blue phase
    const blueIntensity = (index / (total * 0.4)) * 255
    return `rgb(0, ${255 - blueIntensity}, 255)`
  } else if (index < total * 0.7) {
    // Blue phase
    return `rgb(0, 0, 255)`
  } else {
    // Blue to Purple phase
    const purpleIntensity = ((index - total * 0.7) / (total * 0.3)) * 128
    return `rgb(${purpleIntensity}, 0, 255)`
  }
}

const controlsStyle = css`
  display: flex;
  gap: 0.75rem;
`

const buttonStyle = css`
  appearance: none;
  border: 1px solid #f6b730;
  background: transparent;
  color: #f6b730;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;

  &:hover {
    background: rgba(246, 183, 48, 0.15);
  }
`

const hintStyle = css`
  font-size: 0.75rem;
  opacity: 0.6;
  max-width: 28rem;
  text-align: center;
  line-height: 1.4;
`

/**
 * Spike playground for anime.js v4.
 * Edit the animate() calls inside createScope to try APIs.
 * Docs: https://animejs.com/documentation/
 */
export const AnimeJsSpike = () => {
  const root = useRef<HTMLDivElement>(null)
  const scope = useRef<ReturnType<typeof createScope> | null>(null)
  const [playCount, setPlayCount] = useState(0)
  const [currentNumber, setCurrentNumber] = useState(20) // scaled 0–40
  const baseNumber = 20 // (value / 100) * 40
  const range = 2

  useEffect(() => {
    const state = { value: baseNumber }
    scope.current = createScope({ root }).add(() => {
      const tick = () => {
        animate(state, {
          value: baseNumber + utils.random(-range, range),
          duration: 100,
          ease: 'linear', // or 'inOut(2)' for smoother
          // ease: 'inOut(2)',
          onUpdate: () => setCurrentNumber(state.value),
          onComplete: tick, // chain next random target
        })
      }
      tick()
    })
    return () => scope.current?.revert()
  }, [baseNumber, range])

  return (
    <div ref={root} css={rootStyle}>
      <div css={barsStyle}>
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} className="spike-bar" css={barStyle(i, currentNumber)} />
        ))}
      </div>

      <div css={controlsStyle}>
        <button
          css={buttonStyle}
          type="button"
          onClick={() => {
            setPlayCount(n => n + 1)
            scope.current?.methods.burst()
          }}
        >
          Burst ({playCount})
        </button>
        <button
          css={buttonStyle}
          type="button"
          onClick={() => scope.current?.methods.scatter()}
        >
          Scatter
        </button>
        <button
          css={buttonStyle}
          type="button"
          onClick={() => scope.current?.methods.reset()}
        >
          Reset
        </button>
      </div>

      <p css={hintStyle}>
        Spike for anime.js — edit animations in <code>AnimeJsSpike.tsx</code>.
        Scope methods live under <code>scope.current.methods</code>.
      </p>
    </div>
  )
}

function animeRandom(min: number, max: number) {
  return Math.random() * (max - min) + min
}
