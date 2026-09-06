// Many thanks to Temani Afif: https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/
//
// Safari note: the flex *row* parent is required so the float’s percentage height
// resolves. `flex-direction: column` leaves the container height content-sized,
// so `height: 120%` on ::before is indefinite in WebKit and shape-outside drifts.
// Hexes must be `inline-block` (not inline-flex) for shape-outside wrapping.

import { css, keyframes } from '@emotion/react'

const vars = {
  emergencyColor: 'rgb(215, 0, 6)',
  size: '100px',
  ratio: '0.85',
  hexHeight: '0.25',
  hexWidth: '0.5',
  verticalMargin: '2px',
}

const calculations = css`
  --emergency-color: ${vars.emergencyColor};
  --s: ${vars.size};
  --r: ${vars.ratio};
  --h: ${vars.hexHeight};
  --v: ${vars.hexWidth};
  --hc: calc(clamp(0, var(--h), 0.5) * var(--s));
  --vc: calc(clamp(0, var(--v), 0.5) * var(--s) * var(--r));
  --mv: ${vars.verticalMargin};
  --mh: calc(var(--mv) + (var(--s) - 1.75 * var(--hc)) / 2);
  --f: calc(2 * var(--s) * var(--r) + 4 * var(--mv) - 2 * var(--vc) - 2px);
`

export const mainStyle = css`
  ${calculations};
  background-color: black;
  /* Row flex (default): stretches .container on the cross axis → definite height
     for the float’s percentage height. Do not set flex-direction: column. */
  display: flex;
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
  width: 100%;
  height: 100%;
  /* Kill whitespace nodes between inline-block hexes */
  font-size: 0;

  &::before {
    content: '';
    width: calc(var(--s) / 2 + var(--mh));
    float: left;
    /* Definite % only works because parent flex-row stretches this container */
    height: 120%;
    shape-outside: repeating-linear-gradient(
      #0000 0 calc(var(--f) - 3px),
      #000 0 var(--f)
    );
  }
`
