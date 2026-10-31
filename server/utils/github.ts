import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export function ghHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'accept': 'application/vnd.github+json', 'user-agent': 'qxchat-site' }
  if (process.env.GITHUB_TOKEN)
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  return headers
}

type Key = 'contributors' | 'stats' | 'release'
const file = () => join(process.cwd(), 'content/github.json')

async function readAll(): Promise<Partial<Record<Key, unknown>>> {
  try {
    return JSON.parse(await readFile(file(), 'utf8'))
  }
  catch {
    return {}
  }
}

export async function snapshot<T>(key: Key): Promise<T | undefined> {
  return (await readAll())[key] as T | undefined
}

export async function remember(key: Key, value: unknown) {
  if (!import.meta.dev && !import.meta.prerender)
    return
  const all = await readAll()
  all[key] = value
  await writeFile(file(), `${JSON.stringify(all)}\n`).catch(() => {})
}

export const avatarUrl = (login: string) => `https://github.com/${encodeURIComponent(login)}.png?size=96`

const exts: Record<string, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp' }
export const avatarExt = (type: string | null) => exts[type?.split(';')[0] ?? ''] ?? 'png'
export const avatarType = (ext: string) => Object.keys(exts).find(t => exts[t] === ext) ?? 'image/png'
