export default defineEventHandler(async () => {
  const html = await useStorage('assets:content').getItem<string>('privacy.html')
  if (typeof html !== 'string')
    throw createError({ statusCode: 500, statusMessage: 'Missing content/privacy.html' })
  const sections = [...html.matchAll(/<section aria-labelledby="([^"]+)"><h2 id="[^"]+">(.*?)<\/h2>([\s\S]*?)<\/section>/g)]
    .map(m => ({ id: m[1]!, title: m[2]!.replace(/<[^>]+>/g, ''), html: m[3]!.trim() }))
  return { sections }
})
