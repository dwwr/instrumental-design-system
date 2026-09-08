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

Output is written to `storybook-static/`. Dev and production both open on **Showcase → Canvas** first.

## Deploy (Vercel)

This repo is configured as a static Storybook app via [`vercel.json`](./vercel.json):

| Setting | Value |
|---------|--------|
| Install | `npm install` |
| Build | `npm run build-storybook` |
| Output | `storybook-static` |
| Landing | `/` → `/?path=/story/showcase--canvas` |

### Option A — Vercel Git integration

1. Push this repo to GitHub/GitLab/Bitbucket.
2. [Import the project](https://vercel.com/new) in Vercel.
3. Leave framework as Other / use overrides from `vercel.json` (no need to change build settings).
4. Deploy. Production and preview URLs will land on the Showcase.

### Option B — Vercel CLI

```bash
npx vercel
```

Follow the prompts; `vercel.json` supplies build/output. Use `npx vercel --prod` for production.

Requires **Node 24** (`engines` in `package.json`).

## Components

| Component | Description |
|-----------|-------------|
| **Readout1** | List/KPI panel with warning rows |
| **Readout2** | Hexagon emergency grid |
| **Readout3** | Animated bar chart |
| **Readout4** | Horizontal bar readout |
| **SevenSegmentDisplay** | Seven-segment numeric display |
| **Timer** | Countdown timer |

Each readout family includes molecule-level subcomponents with co-located stories.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Emotion (`@emotion/react`)
- Storybook 10
