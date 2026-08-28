/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ListHeader } from './ListHeader'
import { Readout1ListItem, Readout1ListItemProps } from './list-item/Readout1ListItem'
import { ListWarningRow } from './ListWarningRow'

const listContainer = css`
  display: grid;
  grid-template-columns: 10% 90%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 1rem;
  margin-top: 0;
`

const loadingPulse = css`
  @keyframes pulse {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.3;
    }
  }
  animation: pulse 1.5s ease-in-out infinite;
`

const loadingItem = css`
  height: 100px;
  background: rgba(255, 51, 0, 0.2);
  grid-column: 1 / -1;
  margin: 0.5rem 0;
  border-radius: 4px;
`

interface ListContainerProps {
  items: Readout1ListItemProps[]
  isLoading?: boolean
}

export const ListContainer: React.FC<ListContainerProps> = ({ items, isLoading = false }) => {
  if (isLoading) {
    return (
      <div css={listContainer}>
        <ListHeader />
        {[1, 2, 3].map((i) => (
          <div key={i} css={[loadingItem, loadingPulse]} />
        ))}
      </div>
    )
  }

  return (
    <div css={listContainer}>
      <ListHeader />
      {items.map((item) => (
        <>
          <ListWarningRow />
          <Readout1ListItem {...item} />
        </>
      ))}
    </div>
  )
}
