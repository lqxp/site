import { Marked, type Tokens } from 'marked'

const pages = new Set(['security', 'legal', 'terms'])

const slug = (s: string) => s.toLowerCase().replace(/^\d+\.?\s+/, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? ''
  if (!pages.has(id))
    throw createError({ statusCode: 404, statusMessage: 'No such page' })
  const md = await useStorage('assets:content').getItem<string>(`pages:${id}.md`)
  if (typeof md !== 'string')
    throw createError({ statusCode: 500, statusMessage: `Missing content/pages/${id}.md` })

  const marked = new Marked({ gfm: true })
  marked.use({
    renderer: {
      link({ href, text }: Tokens.Link) {
        return /^https?:/.test(href) ? `<a href="${href}" target="_blank" rel="noopener">${text}</a>` : `<a href="${href}">${text}</a>`
      },
    },
  })

  const [intro, ...rest] = md.split(/^## /m)
  const sections = rest.map((chunk) => {
    const nl = chunk.indexOf('\n')
    const title = chunk.slice(0, nl).trim()
    return { id: slug(title), title, html: marked.parse(chunk.slice(nl + 1)) as string }
  })
  return { intro: intro?.trim() ? marked.parse(intro) as string : '', sections }
})
