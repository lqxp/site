import { writeFileSync } from 'node:fs'
import { Hct, SchemeContent, TonalPalette, argbFromHex, hexFromArgb, type DynamicScheme } from '@material/material-color-utilities'
import * as t from '../design/tokens'

const OUT = new URL('../app/assets/css/tokens.css', import.meta.url)

const roles = [
  'primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer', 'inversePrimary',
  'primaryFixed', 'primaryFixedDim', 'onPrimaryFixed', 'onPrimaryFixedVariant',
  'secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer',
  'tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer',
  'tertiaryFixed', 'onTertiaryFixed',
  'error', 'onError', 'errorContainer', 'onErrorContainer',
  'surface', 'onSurface', 'surfaceVariant', 'onSurfaceVariant',
  'surfaceDim', 'surfaceBright',
  'surfaceContainerLowest', 'surfaceContainerLow', 'surfaceContainer',
  'surfaceContainerHigh', 'surfaceContainerHighest',
  'inverseSurface', 'inverseOnSurface', 'outline', 'outlineVariant', 'shadow', 'scrim',
] as const

const kebab = (s: string) => s.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)

const warm = TonalPalette.fromInt(argbFromHex(t.tertiarySeed))

const brand = TonalPalette.fromInt(argbFromHex(t.seed))
function luminance(argb: number) {
  const c = [16, 8, 0].map((sh) => {
    const v = ((argb >> sh) & 255) / 255
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!
}
const contrastWithWhite = (argb: number) => 1.05 / (luminance(argb) + 0.05)
let containerTone = Hct.fromInt(argbFromHex(t.seed)).tone
while (contrastWithWhite(brand.tone(containerTone)) < 4.6) containerTone -= 0.5
const night = TonalPalette.fromHueAndChroma(Hct.fromInt(argbFromHex(t.seed)).hue, 30)

function scheme(hex: string, dark: boolean): string {
  const s: DynamicScheme = new SchemeContent(Hct.fromInt(argbFromHex(hex)), dark, 0, '2025')
  const v: Record<string, number> = {}
  for (const r of roles) v[r] = (s as unknown as Record<string, number>)[r]!
  const tone = (n: number) => warm.tone(n)
  Object.assign(v, dark
    ? { tertiary: tone(80), onTertiary: tone(20), tertiaryContainer: tone(30), onTertiaryContainer: tone(90), tertiaryFixed: tone(90), onTertiaryFixed: tone(10) }
    : { tertiary: tone(38), onTertiary: tone(100), tertiaryContainer: tone(90), onTertiaryContainer: tone(10), tertiaryFixed: tone(90), onTertiaryFixed: tone(10) })
  if (hex === t.seed)
    Object.assign(v, { primaryContainer: brand.tone(containerTone), onPrimaryContainer: brand.tone(100) })
  const lines = roles.map(r => `--${kebab(r)}: ${hexFromArgb(v[r]!)};`)
  return `color-scheme: ${dark ? 'dark' : 'light'};\n    ${lines.join('\n    ')}`
}

function themed(selector: string, hex: string): string {
  const light = `${selector}`
  const dark = `${selector}[data-theme="dark"]`
  const auto = `${selector}:not([data-theme="light"])`
  return [
    `  ${light} {\n    ${scheme(hex, false)}\n  }`,
    `  ${dark} {\n    ${scheme(hex, true)}\n  }`,
    `  @media (prefers-color-scheme: dark) {\n    ${auto} {\n    ${scheme(hex, true)}\n    }\n  }`,
  ].join('\n')
}

function spring({ damping, stiffness }: t.Spring): { ease: string, ms: number } {
  const w = Math.sqrt(stiffness)
  const x = (time: number) => {
    if (damping >= 1)
      return 1 - Math.exp(-w * time) * (1 + w * time)
    const wd = w * Math.sqrt(1 - damping * damping)
    return 1 - Math.exp(-damping * w * time) * (Math.cos(wd * time) + (damping * w / wd) * Math.sin(wd * time))
  }
  const settle = Math.log(1 / 0.002) / (damping * w)
  const end = damping >= 1 ? settle * 1.15 : settle
  const n = 40
  const pts: string[] = []
  for (let i = 0; i <= n; i++) {
    const v = i === n ? 1 : x((i / n) * end)
    pts.push(String(Math.round(v * 1000) / 1000))
  }
  return { ease: `linear(${pts.join(', ')})`, ms: Math.round(end * 1000) }
}

const px = (n: number) => (n === 0 ? '0' : `${n / 16}rem`)

const root: string[] = []
for (const [k, v] of Object.entries(t.shape))
  root.push(`--r-${k}: ${v === 9999 ? '9999px' : `${v}px`};`)
for (const [k, v] of Object.entries(t.space))
  root.push(`--s-${k}: ${px(v)};`)
for (const [k, v] of Object.entries(t.size))
  root.push(`--z-${k}: ${k.startsWith('measure') ? px(v) : `${v}px`};`)
for (const [k, s] of Object.entries(t.springs)) {
  const { ease, ms } = spring(s)
  root.push(`--ease-${k}: ${ease};`, `--dur-${k}: ${ms}ms;`)
}
t.elevation.forEach((dp, i) => {
  root.push(dp === 0
    ? `--elev-${i}: 0 0 0 0 transparent;`
    : `--elev-${i}: 0 ${dp / 2}px ${dp * 1.5}px color-mix(in srgb, var(--shadow) 14%, transparent), 0 ${dp / 8}px ${dp / 2}px color-mix(in srgb, var(--shadow) 18%, transparent);`)
})
for (const [k, v] of Object.entries(t.state))
  root.push(`--state-${k}: ${v * 100}%;`)
root.push(`--stagger: ${t.stagger}ms;`)
for (const [k, v] of Object.entries(t.easings))
  root.push(`--ease-${k}: cubic-bezier(${v.join(', ')});`)
for (const [k, v] of Object.entries(t.durations))
  root.push(`--dur-${k}: ${v}ms;`)
root.push(`--w-em: ${t.emphasisWeight};`)
for (const [k, v] of Object.entries(t.weights))
  root.push(`--w-${k}: ${v};`)
root.push(`--night: ${hexFromArgb(night.tone(6))};`, `--night-2: ${hexFromArgb(night.tone(12))};`, `--night-3: ${hexFromArgb(night.tone(20))};`, `--on-night: ${hexFromArgb(night.tone(96))};`, `--on-night-2: ${hexFromArgb(night.tone(75))};`, `--night-accent: ${hexFromArgb(TonalPalette.fromInt(argbFromHex(t.seed)).tone(70))};`)
root.push(`--font-sans: "SN Pro", system-ui, -apple-system, "Segoe UI", sans-serif;`)
root.push(`--font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;`)

const typeClasses = Object.entries(t.type).map(([k, s]) => {
  return `  .t-${k} { font-size: ${px(s.size)}; line-height: ${px(s.line)}; font-weight: ${s.weight}; letter-spacing: ${s.tracking / 16}rem; }`
})

const css = `@layer tokens {
  :root {
    ${root.join('\n    ')}
  }
${themed(':root', t.seed)}
}

@layer base {
${typeClasses.join('\n')}
  .em { font-weight: var(--w-em); }
}
`

writeFileSync(OUT, css)
console.log(`tokens.css: ${css.length} bytes`)
