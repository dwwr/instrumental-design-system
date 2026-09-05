/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { animate, createScope, stagger } from 'animejs'
import { useEffect, useRef, useState } from 'react'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: #0a0a0a;
  color: #f6b730;
  font-family: Helvetica, Arial, sans-serif;
`

const barsStyle = css`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  height: 160px;
`

const barStyle = css`
  width: 28px;
  height: 40px;
  background: #f6b730;
  border-radius: 2px;
  transform-origin: bottom center;
`

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

  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      // Looping idle pulse on mount
      animate('.spike-bar', {
        scaleY: [
          { to: 1.8, ease: 'inOut(2)', duration: 400 },
          { to: 1, ease: 'inOut(2)', duration: 400 },
        ],
        delay: stagger(80),
        loop: true,
        alternate: true,
      })

      // Methods callable from UI controls
      self?.add('burst', () => {
        animate('.spike-bar', {
          scaleY: [
            { to: 3, ease: 'out(3)', duration: 200 },
            { to: 1, ease: 'out(4)', duration: 600 },
          ],
          rotate: { from: -8, to: 0 },
          delay: stagger(40, { from: 'center' }),
        })
      })

      self?.add('scatter', () => {
        animate('.spike-bar', {
          x: () => animeRandom(-80, 80),
          y: () => animeRandom(-40, 40),
          rotate: () => animeRandom(-45, 45),
          duration: 700,
          ease: 'out(3)',
          delay: stagger(30),
        })
      })

      self?.add('reset', () => {
        animate('.spike-bar', {
          x: 0,
          y: 0,
          rotate: 0,
          scaleY: 1,
          duration: 500,
          ease: 'out(4)',
        })
      })
    })

    return () => scope.current?.revert()
  }, [])

  return (
    <div ref={root} css={rootStyle}>
      <div css={barsStyle}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="spike-bar" css={barStyle} />
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
