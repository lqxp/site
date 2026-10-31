export interface Contributor {
  login: string
  avatar: string
  total: number
  repos: { name: string, commits: number }[]
}

const repos = ['lqxp', 'app', 'client', 'site', 'qxchat.ts']

const aliases: Record<string, string> = {
  'Anaïs Saraiva': 'Kisakay',
  'Anais Saraiva': 'Kisakay',
}

export default cachedEventHandler(async (): Promise<Contributor[]> => {
  const people = new Map<string, { repos: Map<string, number> }>()
  const results = await Promise.allSettled(repos.map(async (repo) => {
    const list = await $fetch<{ login?: string, name?: string, type?: string, contributions?: number }[]>(
      `https://api.github.com/repos/lqxp/${repo}/contributors?per_page=100&anon=1`,
      { headers: ghHeaders() },
    )
    for (const c of list) {
      const login = c.type === 'Anonymous' ? aliases[c.name ?? ''] : c.login
      if (!login || c.type === 'Bot' || login.includes('[bot]'))
        continue
      const p = people.get(login) ?? { repos: new Map() }
      p.repos.set(repo, (p.repos.get(repo) ?? 0) + (c.contributions ?? 0))
      people.set(login, p)
    }
  }))

  if (results.some(r => r.status === 'rejected')) {
    const last = await snapshot<Contributor[]>('contributors')
    if (last?.length)
      return last
  }

  // Avatars are served from our own origin (/avatars/<login>.<ext>, prerendered by People.vue) rather than
  // inlined as base64: the page stays light and nothing is loaded from GitHub.
  const out = await Promise.all([...people].map(async ([login, p]): Promise<Contributor> => {
    let avatar = ''
    try {
      const res = await $fetch.raw(avatarUrl(login), { method: 'HEAD', headers: ghHeaders() })
      avatar = `/avatars/${login}.${avatarExt(res.headers.get('content-type'))}`
    }
    catch {}
    const list = [...p.repos].map(([name, commits]) => ({ name, commits })).sort((a, b) => b.commits - a.commits)
    return { login, avatar, total: list.reduce((n, r) => n + r.commits, 0), repos: list }
  }))
  out.sort((a, b) => b.total - a.total)
  if (!out.length)
    return (await snapshot<Contributor[]>('contributors')) ?? []
  await remember('contributors', out)
  return out
}, { maxAge: 60 * 60, name: 'contributors-v4' })
