
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const inline = (s: string) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>')

function sequence(src: string): string {
  const lines = src.split('\n').map(l => l.trim()).filter(Boolean)
  const head = lines.find(l => l.startsWith('participants:'))
  const actors = (head?.slice('participants:'.length) ?? '').split(',').map(s => s.trim()).filter(Boolean)
  const col = (name: string) => actors.indexOf(name) + 1
  let i = 0
  const rows = lines.filter(l => l !== head).map((l) => {
    const section = l.match(/^==\s*(.+?)\s*==$/)
    if (section)
      return `<li class="sec">${inline(section[1]!)}</li>`
    const msg = l.match(/^(.+?)\s*->\s*(.+?):\s*(.+)$/)
    if (msg && col(msg[1]!) && col(msg[2]!)) {
      const from = col(msg[1]!)
      const to = col(msg[2]!)
      const a = Math.min(from, to)
      const b = Math.max(from, to)
      return `<li class="msg ${from < to ? 'right' : 'left'}" style="--a:${a};--b:${b + 1};--i:${i++}"><span class="label">${inline(msg[3]!)}</span><span class="arrow" aria-hidden="true"></span></li>`
    }
    const self = l.match(/^(.+?):\s*(.+)$/)
    if (self && col(self[1]!))
      return `<li class="act" style="--a:${col(self[1]!)};--i:${i++}"><span>${inline(self[2]!)}</span></li>`
    return `<li class="sec">${inline(l)}</li>`
  })
  return `<figure class="dg seq" style="--n:${actors.length}"><div class="lanes" aria-hidden="true">${actors.map(a => `<span>${esc(a)}</span>`).join('')}</div><ol>${rows.join('')}</ol></figure>\n`
}

function pipeline(src: string): string {
  const rows = src.split('\n').map(l => l.trim()).filter(Boolean).map((l, r) => {
    const steps = l.split(/\s*->\s*/)
    return `<li>${steps.map((s, k) => `${k ? '<span class="to" aria-label="then"></span>' : ''}<span class="step" style="--i:${r * 4 + k}">${inline(s)}</span>`).join('')}</li>`
  })
  return `<figure class="dg pipe"><ol>${rows.join('')}</ol></figure>\n`
}

function boxes(src: string): string {
  const parts = src.split('\n').map(l => l.trim()).filter(Boolean).map((l, k) => {
    if (l.startsWith('<->') || l.startsWith('->'))
      return `<div class="link" style="--i:${k}"><span class="wire" aria-hidden="true"></span><span class="label">${inline(l.replace(/^<?->\s*/, ''))}</span><span class="wire" aria-hidden="true"></span></div>`
    const [name, items = ''] = l.split('|').map(s => s.trim())
    return `<div class="box" style="--i:${k}"><strong>${inline(name!)}</strong><ul>${items.split(';').map(s => s.trim()).filter(Boolean).map(s => `<li>${inline(s)}</li>`).join('')}</ul></div>`
  })
  return `<figure class="dg boxes">${parts.join('')}</figure>\n`
}

export const diagrams: Record<string, (src: string) => string> = { sequence, pipeline, boxes }
