/** @jsxImportSource @emotion/react */

import { useLayoutEffect, useRef } from 'react'
import { hexagonContentStyle, hexagonStyle, textStyle, upTriangleStyle, downTriangleStyle } from './styles'

export interface HexagonProps {
  /** Storybook / static initial on state. Omitted from JSX so React won't clobber DOM paints. */
  isOn?: boolean
  text: string
}

export const Hexagon: React.FC<HexagonProps> = ({ isOn = false, text }) => {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    // Standalone stories: sync controls. Inside Readout2, paint hook owns data-on.
    if (!el.closest('[data-readout2-paint]')) {
      el.dataset.on = isOn ? 'true' : 'false'
    }
  }, [isOn])

  return (
    <div ref={rootRef} data-hex css={hexagonStyle}>
      <div css={hexagonContentStyle}>
        <div css={upTriangleStyle} />
        <span css={textStyle}>{text}</span>
        <div css={downTriangleStyle} />
      </div>
    </div>
  )
}
