/** @jsxImportSource @emotion/react */
import { useHexagonStateAndFlash } from './useHexagonStateAndFlash'
import { containerStyle, mainStyle, pulse } from './styles'
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
  outlineOffHexagons = false
}) => {
  const { hexagonStates, flash } = useHexagonStateAndFlash(numberOfHexagons)

  return (
    <div css={[mainStyle, pulse]}>
      <div css={containerStyle}>
        {hexagonStates.map((_, i) => {
          const isOn = stayOn || (!stayOff && (flash || hexagonStates[i] === 1))
          return <Hexagon key={i} isOn={isOn} outlineOffHexagons={outlineOffHexagons} text={text} />
        })}
      </div>
    </div>
  )
}
