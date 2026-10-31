export default defineEventHandler(async (event) => {
  const file = getRouterParam(event, 'file') ?? ''
  const m = /^([\w-]+)\.(png|jpg|gif|webp)$/.exec(file)
  if (!m)
    throw createError({ statusCode: 404 })
  const data = await $fetch<ArrayBuffer>(avatarUrl(m[1]!), { responseType: 'arrayBuffer', headers: ghHeaders() })
  setHeader(event, 'content-type', avatarType(m[2]!))
  setHeader(event, 'cache-control', 'public, max-age=86400')
  return Buffer.from(data)
})
