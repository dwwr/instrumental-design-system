/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import { glowText } from '../../Readout1'

const listItem = css`
  display: contents;
`

const label = css`
  padding: 0.5rem;
  font-size: clamp(0.4rem, 2vw, 1rem);
  text-align: center;
  justify-self: end;
  letter-spacing: -0.5px;
  line-height: 1;
  margin-right: 0.5rem;
  text-transform: uppercase;
`

const number = css`
  font-size: clamp(1.5rem, 8vw, 4rem);
  letter-spacing: -2px;
`

const gradientBar = css`
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
`
const getGradientColor = (index: number, total: number): string => {
  // For a smoother transition, we'll break it into phases
  if (index < total * 0.4) {
    // Cyan to Blue phase
    const blueIntensity = (index / (total * 0.4)) * 255
    return `rgb(0, ${255 - blueIntensity}, 255)`
  } else if (index < total * 0.7) {
    // Blue phase
    return `rgb(0, 0, 255)`
  } else {
    // Blue to Purple phase
    const purpleIntensity = ((index - total * 0.7) / (total * 0.3)) * 128
    return `rgb(${purpleIntensity}, 0, 255)`
  }
}

const useRandomDeviation = (baseNumber: number, range: number = 3) => {
  // Convert baseNumber from 0-100 range to 0-40 range
  const [currentNumber, setCurrentNumber] = useState(baseNumber)

  useEffect(() => {
    const interval = setInterval(() => {
      const deviation = Math.random() * range * 2 - range
      setCurrentNumber(baseNumber + deviation)
    }, 100)

    return () => clearInterval(interval)
  }, [baseNumber, range])

  return currentNumber
}

const styleIncrementor = (i: number, currentNumber: number) => {
  const gradientColor = getGradientColor(i, 40)
  return css`
    background: ${i > currentNumber ? 'none' : gradientColor};
    flex: 1;
    height: 75%;
    border-radius: 3px;
    margin: 0 0.1rem;
    box-shadow: ${i > currentNumber ? 'none' : `0 0 15px ${gradientColor}`};
  `
}

export interface Readout1ListItemProps {
  subject: string
  subjectNumber: string
  subjectLabel: string
  value: number
}

export const Readout1ListItem: React.FC<Readout1ListItemProps> = ({
  subject,
  subjectNumber,
  subjectLabel,
  value
}) => {
  const scaledValue = (value / 100) * 40
  const currentNumber = useRandomDeviation(scaledValue || 0, 2)
  return (
    <div css={listItem}>
      <div css={[label, glowText]}>
        <div>{subject}</div>
        <div css={number}>{subjectNumber}</div>
        <div>{subjectLabel}</div>
      </div>
      <div css={gradientBar}>
        {[...Array(40)].map((_, i) => (
          <div key={i} css={styleIncrementor(i, currentNumber)} />
        ))}
      </div>
    </div>
  )
}
