import { Marked, type Tokens } from 'marked'
import { handbook } from '~~/app/utils/handbook'
import { diagrams } from '~~/server/utils/diagrams'
import { highlight } from '~~/server/utils/highlight'

const byFile = new Map(handbook.map(p => [p.source.split('/').pop()!, p.id]))

const slug = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const page = handbook.find(p => p.id === id)
  if (!page)
    throw createError({ statusCode: 404, statusMessage: 'No such page' })

  const [base, key] = page.source.startsWith('explain/')
    ? ['explain', page.source.slice('explain/'.length)]
    : ['content', page.source.slice('content/'.length).replaceAll('/', ':')]
  const md = await useStorage(`assets:${base}`).getItem<string>(key)
  if (typeof md !== 'string')
    throw createError({ statusCode: 500, statusMessage: `Missing ${page.source}` })

  const toc: { id: string, text: string, depth: number }[] = []
  const seen = new Map<string, number>()
  const marked = new Marked({ gfm: true })
  marked.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Heading['tokens']) => string } }, { tokens, depth }: Tokens.Heading) {
        const html = this.parser.parseInline(tokens)
        if (depth === 1)
          return ''
        let hid = slug(html)
        const n = seen.get(hid) ?? 0
        seen.set(hid, n + 1)
        if (n)
          hid += `-${n}`
        if (depth <= 3)
          toc.push({ id: hid, text: html.replace(/<[^>]+>/g, '').replace(/^\d+(?:\.\d+)*\.?\s+/, ''), depth })
        const num = html.match(/^(\d+(?:\.\d+)*\.?)\s+(.*)$/)
        const body = num ? `<span class="hn">${num[1]!.replace(/\.$/, '')}</span><span>${num[2]}</span>` : html
        return `<h${depth} id="${hid}"><a class="anchor" href="#${hid}" aria-hidden="true" tabindex="-1">#</a>${body}</h${depth}>\n`
      },
      link({ href, text }: Tokens.Link) {
        const file = href.split('#')[0]!.split('/').pop()!
        const target = byFile.get(file)
        if (target)
          return `<a href="/wiki/${target}${href.includes('#') ? `#${href.split('#')[1]}` : ''}">${text}</a>`
        if (/^https?:/.test(href))
          return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`
        if (href.endsWith('.md') || href.startsWith('../'))
          return text
        return `<a href="${href}">${text}</a>`
      },
      code({ text, lang }: Tokens.Code) {
        const draw = lang ? diagrams[lang] : undefined
        if (draw)
          return draw(text)
        const label = lang && lang !== 'text' ? `<span class="lang">${lang}</span>` : ''
        return `<div class="code">${label}<pre><code>${highlight(text)}</code></pre></div>\n`
      },
      codespan({ text }: Tokens.Codespan) {
        const raw = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        if (raw.length > 48 && /[{[]/.test(raw))
          return `<code class="wire">${highlight(raw)}</code>`
        return `<code>${text}</code>`
      },
      table(this: unknown, token: Tokens.Table) {
        const dirs: Record<string, string> = { 'Both': 'both', 'Client to server': 'up', 'Server to client': 'down' }
        const cell = (c: Tokens.TableCell) => {
          const dir = dirs[c.text.trim()]
          if (dir)
            return `<span class="dir ${dir}">${c.text.trim()}</span>`
          return (this as { parser: { parseInline: (t: Tokens.TableCell['tokens']) => string } }).parser.parseInline(c.tokens)
        }
        const head = token.header.map(c => `<th>${cell(c)}</th>`).join('')
        const body = token.rows.map(r => `<tr>${r.map(c => `<td>${cell(c)}</td>`).join('')}</tr>`).join('')
        return `<div class="table" tabindex="0"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>\n`
      },
    },
  })

  const html = await marked.parse(md)
  const words = md.split(/\s+/).length
  return { html, toc, minutes: Math.max(1, Math.round(words / 220)) }
})
