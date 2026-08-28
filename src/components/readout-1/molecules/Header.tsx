/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const display = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding: 0 1rem 0.25rem;
  gap: 0.5rem;
  font-size: clamp(0.5rem, 2.5vw, 2rem);
  letter-spacing: -0.25px;
  text-wrap: balance;
`

const column = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const stretch = css`
  font-size: clamp(0.5rem, 3.5vw, 2.5rem);
  transform: scaleY(2);
  text-transform: uppercase;
`

export interface HeaderProps {
  title: string
  kpi1Key: string
  kpi1Value: string
  kpi2Key: string
  kpi2Value: string
}

export const Header: React.FC<HeaderProps> = ({
  title,
  kpi1Key,
  kpi1Value,
  kpi2Key,
  kpi2Value
}) => {
  return (
    <div css={display}>
      <div css={[column, stretch]}>{title}</div>
      <div css={column}>
        <div>
          {kpi1Key}: {kpi1Value}
        </div>
        <div>
          {kpi2Key}: {kpi2Value}
        </div>
      </div>
    </div>
  )
}
