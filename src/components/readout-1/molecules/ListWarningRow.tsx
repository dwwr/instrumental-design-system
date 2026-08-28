/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const listWarningRow = css`
  display: grid;
  grid-template-columns: 7fr 1fr 3fr 1.5fr;
  grid-column: 2 / -1;
  font-size: clamp(0.45rem, 1.1vw, 2rem);
  text-wrap: nowrap;
`

export const ListWarningRow: React.FC = () => {
  return (
    <div css={listWarningRow}>
      <div>|</div>
      <div></div>
      <span>| CAUTION |</span>
      <span>| DANGER |</span>
    </div>
  )
}
