import { css } from '@emotion/react'

export const HUD_AMBER = 'rgb(255, 152, 20)'
export const HUD_TICK = 'rgb(214, 242, 182)'
export const HUD_TEXT_BLUR = '0.65px'

export const hudTextShadow = css`
  text-shadow: 0 0 1px currentColor, 0 0 4px rgba(255, 152, 20, 0.35);
`

export const hudTextBlur = css`
  ${hudTextShadow};
  filter: blur(${HUD_TEXT_BLUR});
`

export const hudTextFilter = (...extra: string[]) => css`
  ${hudTextShadow};
  filter: blur(${HUD_TEXT_BLUR})${extra.length ? ` ${extra.join(' ')}` : ''};
`

/** Soft-focus used by chrome ticks (label spacers, mode bottom ticks). */
export const hudTickBlur = css`
  filter: blur(${HUD_TEXT_BLUR});
`

/** Hard on/off flash shared by Internal hazard stripe and active mode bar. */
export const hudActiveFlash = css`
  @keyframes readout5-indicator-flash {
    0%,
    49% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0.12;
    }
  }

  animation: readout5-indicator-flash 0.1s steps(1, end) infinite;
`
