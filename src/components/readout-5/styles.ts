import { css } from '@emotion/react'

/** Shared text soft-focus used by all Readout5 copy and digits. */
export const HUD_TEXT_BLUR = '0.55px'

/**
 * Common `filter: blur` for text. Compose with extra filter functions
 * when an element also needs drop-shadow glow.
 */
export const hudTextBlur = css`
  filter: blur(${HUD_TEXT_BLUR});
`

export const hudTextFilter = (...extra: string[]) => css`
  filter: blur(${HUD_TEXT_BLUR})${extra.length ? ` ${extra.join(' ')}` : ''};
`
