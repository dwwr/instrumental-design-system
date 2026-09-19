/** @jsxImportSource @emotion/react */
import { useRef } from 'react'
import { useHexagonPaint } from './useHexagonPaint'
import { containerStyle, mainStyle } from './styles'
import { Hexagon } from './molecules/hexagon/Hexagon'

interface Readout2Props {
  text: string
  numberOfHexagons?: number
  stayOn?: boolean
  stayOff?: boolean
  outlineOffHexagons?: boolean
}

export const Readout2: React.FC<Readout2Props> = ({
  numberOfHexagons = 50,
  text,
  stayOn,
  stayOff,
  outlineOffHexagons = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useHexagonPaint({
    containerRef,
    numberOfHexagons,
    stayOn,
    stayOff,
  })

  return (
    <div css={mainStyle}>
      <div
        ref={containerRef}
        css={containerStyle}
        data-readout2-paint
        data-outline={outlineOffHexagons ? 'true' : 'false'}
      >
        {Array.from({ length: numberOfHexagons }, (_, i) => (
          <Hexagon key={i} text={text} />
        ))}
      </div>
    </div>
  )
}
