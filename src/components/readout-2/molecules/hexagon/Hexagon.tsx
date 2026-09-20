/** @jsxImportSource @emotion/react */

import { useLayoutEffect, useRef } from 'react'
import {
  hexagonContentStyle,
  hexagonStyle,
  textStyle,
  upTriangleStyle,
  downTriangleStyle,
} from './styles'

export interface HexagonProps {
  isOn?: boolean
  text: string
}

export const Hexagon: React.FC<HexagonProps> = ({ isOn = false, text }) => {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
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
