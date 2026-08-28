/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DataLabel, DataLabelProps } from '../data-label/DataLabel'

const overlayStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  height: 100%;
`
export interface OverlayProps {
  labels: DataLabelProps[]
}

export const Overlay: React.FC<OverlayProps> = ({ labels }) => {
  return (
    <div css={overlayStyle}>
      {labels.map((label) => (
        <DataLabel {...label} />
      ))}
    </div>
  )
}
