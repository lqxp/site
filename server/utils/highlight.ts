const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const rules: [RegExp, string][] = [
  [/^(\/\/[^\n]*|#[^\n]*)/, 'c'],
  [/^"(?:[^"\\\n]|\\.)*"(?=\s*:)/, 'k'],
  [/^"(?:[^"\\\n]|\\.)*"/, 's'],
  [/^'(?:[^'\\\n]|\\.)*'/, 's'],
  [/^\b\d+(?:\.\d+)?\b/, 'n'],
  [/^\b(?:true|false|null)\b/, 'n'],
  [/^\b[A-Z][A-Za-z0-9-]+(?=\()/, 'f'],
  [/^\b[a-zA-Z_][\w.-]*(?=\s*=[^=])/, 'k'],
  [/^(?:->|=>|<-|\|\||[{}[\]()])/, 'p'],
]

export function highlight(src: string): string {
  let out = ''
  let i = 0
  let plain = ''
  const flush = () => {
    out += esc(plain)
    plain = ''
  }
  while (i < src.length) {
    const rest = src.slice(i)
    const prev = src[i - 1]
    let hit: [string, string] | undefined
    for (const [re, cls] of rules) {
      if (cls === 'c' && prev && !/\s/.test(prev))
        continue
      const m = rest.match(re)
      if (m) {
        hit = [m[0], cls]
        break
      }
    }
    if (hit) {
      flush()
      out += `<span class="${hit[1]}">${esc(hit[0])}</span>`
      i += hit[0].length
    }
    else {
      plain += src[i]
      i++
    }
  }
  flush()
  return out
}
