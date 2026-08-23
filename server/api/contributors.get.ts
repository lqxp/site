export default cachedEventHandler(
  async () => {
    const repos = ['app', 'client', 'lqxp', 'qxchat.ts', 'site']
    const contributorsMap = new Map<
      string,
      {
        login: string
        id: number
        avatar_url: string
        html_url: string
        contributions: number
      }
    >()

    await Promise.allSettled(
      repos.map(async (repo) => {
        try {
          const res = await $fetch<any[]>(
            `https://api.github.com/repos/lqxp/${repo}/contributors?per_page=100`,
            {
              headers: {
                accept: 'application/vnd.github+json',
                'User-Agent': 'QxChat'
              }
            }
          )

          if (Array.isArray(res)) {
            for (const c of res) {
              if (!c.login || c.type === 'Bot' || c.login.includes('[bot]')) continue
              const existing = contributorsMap.get(c.login)
              if (existing) {
                existing.contributions += c.contributions || 0
              } else {
                contributorsMap.set(c.login, {
                  login: c.login,
                  id: c.id,
                  avatar_url: c.avatar_url,
                  html_url: c.html_url,
                  contributions: c.contributions || 0
                })
              }
            }
          }
        } catch (e) {}
      })
    )

    const list = Array.from(contributorsMap.values()).sort(
      (a, b) => b.contributions - a.contributions
    )

    if (list.length === 0) {
      return [
        {
          login: 'lqxp',
          id: 1,
          avatar_url: 'https://avatars.githubusercontent.com/u/198751508?v=4',
          html_url: 'https://github.com/lqxp',
          contributions: 1
        }
      ]
    }

    return list
  },
  {
    maxAge: 60 * 15,
    name: 'github-contributors'
  }
)
