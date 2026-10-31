export interface Stats { stars: number, repos: number }

export default cachedEventHandler(async (): Promise<Stats | null> => {
  try {
    const repos = await $fetch<{ stargazers_count?: number, archived?: boolean }[]>(
      'https://api.github.com/orgs/lqxp/repos?per_page=100',
      { headers: ghHeaders() },
    )
    const stats = { stars: repos.reduce((n, r) => n + (r.stargazers_count ?? 0), 0), repos: repos.length }
    await remember('stats', stats)
    return stats
  }
  catch {
    return (await snapshot<Stats>('stats')) ?? null
  }
}, { maxAge: 60 * 60, name: 'stats' })
