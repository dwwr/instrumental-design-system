# instrumental-design-system

A library of UI elements inspired by Evangelion. This repo contains the component library and Storybook catalog migrated from [dwwr.github.io](https://github.com/dwwr/dwwr.github.io).

## Getting started

```bash
npm install
npm run storybook
```

Storybook runs at [http://localhost:6006](http://localhost:6006).

To build a static Storybook site:

```bash
npm run build-storybook
```

Output is written to `storybook-static/`.

## Components

| Component | Description |
|-----------|-------------|
| **Readout1** | List/KPI panel with warning rows |
| **Readout2** | Hexagon emergency grid |
| **Readout3** | Animated bar chart |
| **Readout4** | Horizontal bar readout |
| **Readout5** | Active time remaining panel with timer mask (WIP) |
| **SevenSegmentDisplay** | Seven-segment numeric display |
| **Timer** | Countdown timer |

Each readout family includes molecule-level subcomponents with co-located stories.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Emotion (`@emotion/react`)
- Storybook 10
