/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { pulse } from '../../styles'

const hexagonClipPath = (offset = 0) => css`
  clip-path: polygon(
    calc(var(--hc) ${offset ? `- ${offset}px` : ''}) 0,
    calc(100% - var(--hc) ${offset ? `+ ${offset}px` : ''}) 0,
    calc(100% ${offset ? `+ ${offset}px` : ''}) var(--vc),
    calc(100% ${offset ? `+ ${offset}px` : ''}) calc(100% - var(--vc)),
    calc(100% - var(--hc) ${offset ? `+ ${offset}px` : ''}) 100%,
    calc(var(--hc) ${offset ? `- ${offset}px` : ''}) 100%,
    ${offset ? `-${offset}px` : '0'} calc(100% - var(--vc)),
    ${offset ? `-${offset - 0.5}px` : '0'} var(--vc)
  );
`

export const hexagonInnerLayer = css`
  content: '';
  position: absolute;
  background-color: black;
`

export const hexagonStyle = css`
  width: var(--s);
  margin: var(--mv) var(--mh);
  height: calc(var(--s) * var(--r));
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.45rem;
  ${hexagonClipPath()};
  margin-bottom: calc(var(--mv) - var(--vc));
`

export const hexagonOnStyle = css`
  ${hexagonStyle};
  background: var(--emergency-color);
  box-shadow: 0 0 15px var(--emergency-color);
  animation: ${pulse} 1s ease-in-out infinite;

  &::before {
    ${hexagonInnerLayer};
    top: 3px;
    left: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    ${hexagonClipPath(2)};
  }

  &::after {
    ${hexagonInnerLayer};
    z-index: 1;
    top: 4.5px;
    left: 4.5px;
    width: calc(100% - 9px);
    height: calc(100% - 9px);
    background-color: var(--emergency-color);
    ${hexagonClipPath(3)};
  }
`

export const hexagonOffStyle = (outlineOffHexagons: boolean) => css`
  ${hexagonStyle};
  background-color: ${outlineOffHexagons ? 'var(--emergency-color)' : 'black'};
  animation: ${pulse} 1s ease-in-out infinite;

  &::before {
    ${hexagonInnerLayer};
    top: 3px;
    left: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    ${hexagonClipPath(2)};
  }
`

export const textStyle = css`
  z-index: 2;
  font-family: 'Helvetica', monospace;
  font-size: 0.65rem;
  align-items: center;
  justify-content: center;
  align-self: center;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04rem;
`

const commonTriangleStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.85rem;
`

export const upTriangleStyle = css`
  &::after {
    ${commonTriangleStyle};
    z-index: 2;
    content: '▲';
  }
`
export const downTriangleStyle = css`
  &::before {
    ${commonTriangleStyle};
    z-index: 2;
    content: '▼';
  }
`
