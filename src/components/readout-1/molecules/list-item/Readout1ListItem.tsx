/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { glowText } from '../../Readout1'
import { SegmentedBar } from '../SegmentedBar'

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
  value,
}) => {
  return (
    <div css={listItem}>
      <div css={[label, glowText]}>
        <div>{subject}</div>
        <div css={number}>{subjectNumber}</div>
        <div>{subjectLabel}</div>
      </div>
      <SegmentedBar value={value} />
    </div>
  )
}
