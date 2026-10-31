export interface ReleaseAsset { name: string, url: string, size: number }
export interface Release { tag: string, date: string, page: string, assets: ReleaseAsset[] }

export default cachedEventHandler(async (): Promise<Release | null> => {
  try {
    const r = await $fetch<{ tag_name: string, published_at: string, html_url: string, assets: { name: string, browser_download_url: string, size: number }[] }>(
      'https://api.github.com/repos/lqxp/app/releases/latest',
      { headers: ghHeaders() },
    )
    const release = {
      tag: r.tag_name,
      date: r.published_at,
      page: r.html_url,
      assets: r.assets.map(a => ({ name: a.name, url: a.browser_download_url, size: a.size })),
    }
    await remember('release', release)
    return release
  }
  catch {
    return (await snapshot<Release>('release')) ?? null
  }
}, { maxAge: 60 * 15, name: 'release' })
