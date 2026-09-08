/**
 * Readout3 hot-path microbench: before (React/Emotion-style full tree update)
 * vs after (DOM paint with change detection), at production DOM scale.
 *
 * Scale matches Readout3 defaults: 4 groups × 8 columns × 17 segments,
 * plus static axis tick nodes that the old path re-reconciled every tick.
 */
import { chromium } from 'playwright-core'
import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const html = `<!doctype html>
<html>
<body>
<script>
const GROUPS = 4
const COLS = 8
const SEGS = 17
const X_TICKS = 30 * 10
const PLOT_TICKS = 60
const TICKS = 200
const WARMUP = 30

function buildDom() {
  const root = document.createElement('div')
  root.id = 'root'
  root.style.cssText = 'width:1200px;height:700px;background:#000;overflow:hidden'
  document.body.appendChild(root)

  for (let g = 0; g < GROUPS; g++) {
    const group = document.createElement('div')
    group.className = 'group'
    group.style.cssText = 'display:flex;height:160px'

    for (let a = 0; a < 2; a++) {
      const axis = document.createElement('div')
      axis.className = 'xaxis'
      for (let t = 0; t < X_TICKS; t++) {
        const tick = document.createElement('div')
        tick.className = 'xtick'
        tick.style.left = (t / 30) * 100 + '%'
        axis.appendChild(tick)
      }
      group.appendChild(axis)
    }

    for (let c = 0; c < COLS; c++) {
      const col = document.createElement('div')
      col.className = 'col'
      col.style.cssText = 'flex:1;height:100%;position:relative;background:linear-gradient(#a31a0a,#69d91c,#349b87)'
      const fill = document.createElement('div')
      fill.className = 'r3-column-fill'
      fill.dataset.colIndex = String(c)
      fill.style.cssText = 'height:50%;background:#000'
      col.appendChild(fill)
      group.appendChild(col)
    }

    const track = document.createElement('div')
    track.className = 'r3-seg-track'
    track.style.cssText = 'display:flex;flex-direction:column-reverse;width:40px'
    for (let s = 0; s < SEGS; s++) {
      const seg = document.createElement('div')
      seg.className = 'r3-seg'
      seg.style.cssText = 'flex:1;background:none;margin:1px 0;border-radius:5px'
      track.appendChild(seg)
    }
    group.appendChild(track)

    const plot = document.createElement('div')
    for (let t = 0; t < PLOT_TICKS; t++) {
      const tick = document.createElement('div')
      tick.className = 'ptick'
      tick.style.left = (t / PLOT_TICKS) * 100 + '%'
      plot.appendChild(tick)
    }
    group.appendChild(plot)
    root.appendChild(group)
  }

  return {
    root,
    fillsByIndex: Array.from({ length: COLS }, (_, i) =>
      Array.from(root.querySelectorAll('.r3-column-fill[data-col-index="' + i + '"]'))
    ),
    tracks: Array.from(root.querySelectorAll('.r3-seg-track')).map(t =>
      Array.from(t.querySelectorAll('.r3-seg'))
    ),
    xticks: Array.from(root.querySelectorAll('.xtick')),
    pticks: Array.from(root.querySelectorAll('.ptick')),
    nodeCount: root.querySelectorAll('*').length,
  }
}

function deviate(bench) {
  return bench + Math.floor(Math.random() * 10)
}

/** Old hot path: Emotion css() per fill/seg + full axis style rewrite (React reconcile proxy). */
function oldTick(dom, values) {
  for (let g = 0; g < GROUPS; g++) {
    for (let c = 0; c < COLS; c++) {
      const h = Math.abs(values[c] - 100)
      // Simulate Emotion serialized style object + class application
      const emotionLike = 'height:' + h + '%;background:black;margin:0 -1px;'
      const el = dom.fillsByIndex[c][g]
      el.setAttribute('data-emotion-css', emotionLike)
      el.style.cssText = emotionLike
    }
    const level = Math.floor((values[0] / 100) * SEGS)
    const segs = dom.tracks[g]
    for (let i = 0; i < SEGS; i++) {
      const bg = i > level || level === 0 ? 'none' : 'rgb(251, 181, 19)'
      const emotionLike =
        'background:' + bg +
        ';width:100%;flex:1;min-height:0;border-radius:5px;margin-top:3px;margin-bottom:1px'
      segs[i].setAttribute('data-emotion-css', emotionLike)
      segs[i].style.cssText = emotionLike
    }
  }
  // Axis ticks re-rendered with same left% (cheap write, expensive at volume)
  for (let i = 0; i < dom.xticks.length; i++) {
    const el = dom.xticks[i]
    el.style.left = el.style.left
  }
  for (let i = 0; i < dom.pticks.length; i++) {
    const el = dom.pticks[i]
    el.style.left = el.style.left
  }
  void dom.root.offsetHeight
}

/** New hot path: paint only changed fills/segments. */
function newTick(dom, values, lastValues, lastSeg) {
  for (let c = 0; c < COLS; c++) {
    if (lastValues[c] === values[c]) continue
    lastValues[c] = values[c]
    const height = Math.abs(values[c] - 100) + '%'
    const fills = dom.fillsByIndex[c]
    for (let g = 0; g < fills.length; g++) fills[g].style.height = height
  }
  const level = Math.floor((values[0] / 100) * SEGS)
  for (let g = 0; g < GROUPS; g++) {
    if (lastSeg[g] === level) continue
    const prev = lastSeg[g]
    lastSeg[g] = level
    const segs = dom.tracks[g]
    for (let i = 0; i < SEGS; i++) {
      const shouldOn = level !== 0 && i <= level
      const wasOn = prev !== -1 && prev !== 0 && i <= prev
      if (shouldOn === wasOn) continue
      segs[i].style.background = shouldOn ? 'rgb(251, 181, 19)' : 'none'
    }
  }
  void dom.root.offsetHeight
}

function stats(samples) {
  const sorted = samples.slice().sort((a, b) => a - b)
  const sum = sorted.reduce((a, b) => a + b, 0)
  const pct = p => sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))]
  return {
    mean: sum / sorted.length,
    p50: pct(50),
    p95: pct(95),
    p99: pct(99),
    min: sorted[0],
    max: sorted[sorted.length - 1],
  }
}

function run() {
  const dom = buildDom()
  const values = Array(COLS).fill(50)
  const lastValues = Array(COLS).fill(NaN)
  const lastSeg = Array(GROUPS).fill(-1)

  const oldSamples = []
  const newSamples = []

  for (let i = 0; i < WARMUP + TICKS; i++) {
    for (let c = 0; c < COLS; c++) values[c] = deviate(50)
    const t0 = performance.now()
    oldTick(dom, values)
    const dt = performance.now() - t0
    if (i >= WARMUP) oldSamples.push(dt)
  }

  lastValues.fill(NaN)
  lastSeg.fill(-1)
  for (let i = 0; i < WARMUP + TICKS; i++) {
    for (let c = 0; c < COLS; c++) values[c] = deviate(50)
    const t0 = performance.now()
    newTick(dom, values, lastValues, lastSeg)
    const dt = performance.now() - t0
    if (i >= WARMUP) newSamples.push(dt)
  }

  const oldS = stats(oldSamples)
  const newS = stats(newSamples)
  const speedup = oldS.mean / newS.mean

  return {
    meta: {
      groups: GROUPS,
      columns: COLS,
      segments: SEGS,
      xTicks: X_TICKS * 2 * GROUPS,
      plotTicks: PLOT_TICKS * GROUPS,
      nodeCount: dom.nodeCount,
      samples: TICKS,
      intervalMs: 100,
      browser: navigator.userAgent,
    },
    before: oldS,
    after: newS,
    speedupMean: speedup,
    cpuAt10Hz: {
      beforePct: (oldS.mean / 100) * 100,
      afterPct: (newS.mean / 100) * 100,
    },
  }
}

window.__RESULT__ = run()
</script>
</body>
</html>`

const file = join(tmpdir(), 'readout3-bench.html')
writeFileSync(file, html)

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
})
const page = await browser.newPage()
await page.goto('file://' + file)
const result = await page.evaluate(() => window.__RESULT__)
await browser.close()

console.log(JSON.stringify(result, null, 2))
