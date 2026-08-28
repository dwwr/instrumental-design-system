// Many thanks to Temani Afif: https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/

import { css, keyframes } from '@emotion/react'

// Common variables
const vars = {
  emergencyColor: 'rgb(215, 0, 6)',
  size: '100px',
  ratio: '0.85',
  hexHeight: '0.25',
  hexWidth: '0.5',
  verticalMargin: '2px'
}

// Common calculations
const calculations = css`
  --emergency-color: ${vars.emergencyColor};
  --s: ${vars.size}; /* size */
  --r: ${vars.ratio}; /* ratio */
  --h: ${vars.hexHeight};
  --v: ${vars.hexWidth};
  --hc: calc(clamp(0, var(--h), 0.5) * var(--s));
  --vc: calc(clamp(0, var(--v), 0.5) * var(--s) * var(--r));
  --mv: ${vars.verticalMargin}; /* vertical margin */
  --mh: calc(var(--mv) + (var(--s) - 1.75 * var(--hc)) / 2); /* horizontal margin */
  --f: calc(2 * var(--s) * var(--r) + 4 * var(--mv) - 2 * var(--vc) - 2px);
`

export const mainStyle = css`
  ${calculations};
  background-color: black;
  display: flex;
  flex-direction: column;
  filter: blur(0.9px);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const pulse = keyframes`
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 5px var(--emergency-color));
  }
  50% {
    filter: brightness(1.3) drop-shadow(0 0 15px var(--emergency-color));
  }
`

export const containerStyle = css`
  ::before {
    content: '';
    width: calc(var(--s) / 2 + var(--mh));
    float: left;
    height: 135%;
    shape-outside: repeating-linear-gradient(#0000 0 calc(var(--f) - 2px), #000 0 var(--f));
  }
`
