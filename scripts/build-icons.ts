import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? files(p) : /\.(vue|ts|css)$/.test(f) ? [p] : []
  })
}

const patterns = [
  /class="[^"]*\bicon\b[^"]*"[^>]*>\s*([a-z_]+)\s*</g,
  /\b(?:icon|trailing)\s*[:=]\s*["']([a-z_]+)["']/g,
  /["'][a-z_-]+["']\s*:\s*["']([a-z_]+)["']/g,
  /\?\s*["']([a-z_]+)["']\s*:\s*["']([a-z_]+)["']/g,
  /\bshow\([^)]*?,\s*["']([a-z_]+)["']/g,
  /content:\s*"([a-z_]+)"/g,
]
const found = new Set<string>()
for (const f of files(join(ROOT, 'app'))) {
  const src = readFileSync(f, 'utf8')
  for (const re of patterns) {
    for (const m of src.matchAll(re)) m.slice(1).forEach(n => n && found.add(n))
  }
}

const meta = await (await fetch('https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true')).text()
const known = new Set<string>(JSON.parse(meta.replace(/^\)\]\}'/, '')).icons.map((i: { name: string }) => i.name))
const icons = [...found].filter(n => known.has(n)).sort()

const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..700,0..1,0&icon_names=${icons.join(',')}&display=block`, { headers: { 'user-agent': UA } })).text()
const url = css.match(/url\((https:[^)]+)\)/)?.[1]
if (!url)
  throw new Error(`No font in response:\n${css}`)
const font = Buffer.from(await (await fetch(url)).arrayBuffer())
const name = `material-symbols-${createHash('sha256').update(font).digest('hex').slice(0, 10)}.woff2`

const fonts = join(ROOT, 'public/fonts')
for (const f of readdirSync(fonts)) {
  if (f.startsWith('material-symbols'))
    rmSync(join(fonts, f))
}
writeFileSync(join(fonts, name), font)

for (const f of [join(ROOT, 'app/assets/css/fonts.css'), join(ROOT, 'nuxt.config.ts')]) {
  writeFileSync(f, readFileSync(f, 'utf8').replace(/\/fonts\/material-symbols[\w-]*\.woff2/g, `/fonts/${name}`))
}
console.log(`${icons.length} icons -> public/fonts/${name} (${font.length} bytes)\n${icons.join(' ')}`)
