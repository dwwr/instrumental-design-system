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

const pulse = keyframes`
  0%, 100% {
    filter: blur(0.9px) brightness(1);
  }
  50% {
    filter: blur(0.9px) brightness(1.3);
  }
`

export const mainStyle = css`
  ${calculations};
  background-color: black;
  /* Row flex (default): stretches .container on the cross axis → definite height
     for the float’s percentage height. Do not set flex-direction: column. */
  display: flex;
  /* Single filter animation for the whole grid (not per-hex). */
  filter: blur(0.9px) brightness(1);
  animation: ${pulse} 1s ease-in-out infinite;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
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

  /* Outlined off-hexes: set data-outline on this container */
  &[data-outline='true'] [data-hex][data-on='false'] {
    background-color: var(--emergency-color);

    /* Restore inset ring suppressed on plain off hexes */
    &::before {
      content: '';
    }
  }
`
