export default cachedEventHandler(
  async () => {
    try {
      const repos = await $fetch<any[]>('https://api.github.com/orgs/lqxp/repos?per_page=100', {
        headers: {
          accept: 'application/vnd.github+json',
          'User-Agent': 'QxChat-Site-App'
        }
      })

      const totalStars = Array.isArray(repos)
        ? repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
        : 24

      return {
        stars: totalStars,
        reposCount: Array.isArray(repos) ? repos.length : 6
      }
    } catch {}
  },
  {
    maxAge: 60 * 15,
    name: 'github-org-stats'
  }
)
