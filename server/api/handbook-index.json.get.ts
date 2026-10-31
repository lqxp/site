import { marked, type Token } from 'marked'
import { handbook } from '~~/app/utils/handbook'

const slug = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')

const plain = (s: string) => s
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/<[^>]+>/g, ' ')
  .replace(/[*`]/g, '')
  .replace(/[#>|]/g, ' ')
  .replace(/^\s*[-+]\s+/gm, ' ')
  .replace(/-{3,}/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

export default defineEventHandler(async () => {
  const pages = []
  for (const page of handbook) {
    const [base, key] = page.source.startsWith('explain/')
      ? ['explain', page.source.slice('explain/'.length)]
      : ['content', page.source.slice('content/'.length).replaceAll('/', ':')]
    const md = await useStorage(`assets:${base}`).getItem<string>(key)
    if (typeof md !== 'string')
      continue

    const seen = new Map<string, number>()
    const sections: { id: string, title: string, text: string }[] = [{ id: '', title: '', text: '' }]
    for (const t of marked.lexer(md) as Token[]) {
      if (t.type === 'heading') {
        let id = slug(marked.parseInline(t.text) as string)
        const n = seen.get(id) ?? 0
        seen.set(id, n + 1)
        if (n)
          id += `-${n}`
        if (t.depth >= 2 && t.depth <= 3)
          sections.push({ id, title: t.text.replace(/^\d+(?:\.\d+)*\.?\s+/, '').replace(/[`*_]/g, ''), text: '' })
        continue
      }
      if (t.type === 'code' || t.type === 'space' || t.type === 'hr')
        continue
      sections.at(-1)!.text += ` ${plain(t.raw)}`
    }
    pages.push({
      id: page.id,
      title: page.title,
      emoji: page.emoji,
      sections: sections.map(s => ({ ...s, text: s.text.trim() })).filter(s => s.text || s.id),
    })
  }
  return pages
})
