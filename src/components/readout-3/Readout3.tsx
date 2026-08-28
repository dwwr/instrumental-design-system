/** @jsxImportSource @emotion/react */
import {
  containerStyle,
  topTextBarStyle,
  chartContainerStyle,
  bottomTextBarStyle,
  overlayContainerStyle
} from './styles'
import { DataLabel } from './molecules/data-label/DataLabel'
import { Chart } from './molecules/chart/Chart'
import { Overlay } from './molecules/overlay/Overlay'

export interface Readout3Props {
  benchmark?: number
}

export const Readout3: React.FC<Readout3Props> = ({ benchmark }) => {
  return (
    <div css={containerStyle}>
      <div css={topTextBarStyle}>
        <DataLabel text="Energy Observational Data" />
        <DataLabel label="Blood Type:" text="Analyzing" flicker />
      </div>
      <div css={chartContainerStyle}>
        <Chart columnGroupSize={8} columnGroupCount={4} benchmark={benchmark} deviate loop />
      </div>
      <div css={bottomTextBarStyle}>
        <DataLabel text="High level energy field approaching" condensed />
        <DataLabel label="Generating point:" text="Terminal Dogma: Point 00" />
        <DataLabel label="Observed by:" text="Magi" />
      </div>
      <div css={overlayContainerStyle}>
        <Overlay
          labels={[
            { label: 'Radioactivity', text: 'Negative' },
            { label: 'Radiant Heat', text: 'Negative', flicker: true }
          ]}
        />
      </div>
    </div>
  )
}
