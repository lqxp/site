interface GitHubAsset {
  name: string
  browser_download_url: string
  size?: number
}

interface GitHubRelease {
  tag_name: string
  published_at: string
  assets: GitHubAsset[]
}

const pick = (assets: GitHubAsset[], matcher: (name: string) => boolean) =>
  assets.find(a => matcher(a.name.toLowerCase()))?.browser_download_url ?? null

// --- Cache serveur avec TTL explicite ---
// But : ne pas frapper GitHub à chaque visite, mais re-interroger
// l'API dès que le TTL expire (au lieu de rester gelé sur 1.20.4).
// - TTL = 5 min : tant que le cache est frais => réponse immédiate (HIT).
// - TTL expiré => re-fetch GitHub (MISS), puis nouveau TTL.
// - GitHub en erreur + cache périmé existant => on sert le périmé (STALE)
//   plutôt qu'un fallback obsolète.
// - Aucun cache du tout + GitHub HS => fallback statique (dernier recours).
const TTL_MS = 5 * 60 * 1000
const FALLBACK_TAG = 'v1.20.5'

type ReleasePayload = {
  tag_name: string
  published_at: string
  assets: GitHubAsset[]
  downloads: unknown
}

let cache: { data: ReleasePayload; expiresAt: number } | null = null
let inflight: Promise<ReleasePayload> | null = null

function buildFallback(): ReleasePayload {
  const base = `https://github.com/lqxp/app/releases/download/${FALLBACK_TAG}`
  const ver = FALLBACK_TAG.replace(/^v/, '')
  return {
    tag_name: FALLBACK_TAG,
    published_at: '',
    assets: [],
    downloads: {
      windows: {
        x64: `${base}/QxChat_${ver}_x64_en-US.msi`,
        arm64: `${base}/QxChat_${ver}_arm64_en-US.msi`
      },
      macos: {
        arm64: `${base}/QxChat_${ver}_aarch64.dmg`,
        x64: `${base}/QxChat_${ver}_x64.dmg`
      },
      linux: {
        appimage_x64: `${base}/QxChat_${ver}_amd64.AppImage`,
        appimage_arm64: `${base}/QxChat_${ver}_aarch64.AppImage`
      },
      android: `${base}/QxChat_${ver}_aarch64.apk`,
      ios: `${base}/QxChat_${ver}_unsigned.ipa`,
      nixos: `${base}/QxChat_${ver}_flake.nix`
    }
  }
}

async function fetchFreshRelease(): Promise<ReleasePayload> {
  const headers: Record<string, string> = {
    accept: 'application/vnd.github+json',
    'User-Agent': 'QxChat-Site-App',
    'X-GitHub-Api-Version': '2022-11-28'
  }
  // Token optionnel pour éviter le rate-limit anonyme (60 req/h/IP)
  // qui faisait tomber dans le catch => vieux fallback 1.20.4.
  const token = process.env.GITHUB_TOKEN || process.env.NUXT_GITHUB_TOKEN
  if (token) headers.authorization = `Bearer ${token}`

  const release = await $fetch<GitHubRelease>(
    'https://api.github.com/repos/lqxp/app/releases/latest',
    { headers }
  )

  const assets = Array.isArray(release.assets) ? release.assets : []
  const tag = release.tag_name || FALLBACK_TAG
  const ver = tag.replace(/^v/, '')
  const base = `https://github.com/lqxp/app/releases/download/${tag}`

  const lower = (n: string) => n.toLowerCase()
  const isDmg = (n: string) => lower(n).endsWith('.dmg')

  const macArm64 =
    pick(assets, n => isDmg(n) && (n.includes('aarch64') || n.includes('arm64') || n.includes('apple-silicon'))) ??
    pick(assets, n => isDmg(n) && n.includes('universal')) ??
    `${base}/QxChat_${ver}_aarch64.dmg`

  const macX64 =
    pick(
      assets,
      n =>
        isDmg(n) &&
        !n.includes('aarch64') &&
        !n.includes('arm64') &&
        !n.includes('apple-silicon') &&
        (n.includes('x64') || n.includes('x86_64') || n.includes('intel'))
    ) ??
    pick(assets, n => isDmg(n) && n.includes('universal')) ??
    `${base}/QxChat_${ver}_x64.dmg`

  return {
    tag_name: tag,
    published_at: release.published_at,
    assets,
    downloads: {
      windows: {
        x64:
          pick(
            assets,
            n =>
              (n.includes('x64') || n.includes('x86_64') || n.includes('win')) &&
              !n.includes('arm64') &&
              !n.includes('aarch64') &&
              n.endsWith('.msi')
          ) ?? `${base}/QxChat_${ver}_x64_en-US.msi`,
        arm64:
          pick(
            assets,
            n => (n.includes('arm64') || n.includes('aarch64')) && n.endsWith('.msi')
          ) ?? `${base}/QxChat_${ver}_arm64_en-US.msi`
      },
      macos: {
        arm64: macArm64,
        x64: macX64
      },
      linux: {
        appimage_x64:
          pick(
            assets,
            n =>
              (n.includes('amd64') || n.includes('x86_64') || n.includes('x64')) &&
              !n.includes('aarch64') &&
              !n.includes('arm64') &&
              n.endsWith('.appimage')
          ) ?? `${base}/QxChat_${ver}_amd64.AppImage`,
        appimage_arm64:
          pick(
            assets,
            n => (n.includes('aarch64') || n.includes('arm64')) && n.endsWith('.appimage')
          ) ?? `${base}/QxChat_${ver}_aarch64.AppImage`
      },
      android: pick(assets, n => n.endsWith('.apk')) ?? `${base}/QxChat_${ver}_aarch64.apk`,
      ios: pick(assets, n => n.endsWith('.ipa')) ?? `${base}/QxChat_${ver}_unsigned.ipa`,
      nixos:
        pick(assets, n => n.includes('flake') && n.endsWith('.nix')) ??
        `${base}/QxChat_${ver}_flake.nix`
    }
  }
}

export default defineEventHandler(async (event) => {
  const now = Date.now()

  // 1) Cache frais => on sert sans re-fetch (TTL).
  if (cache && now < cache.expiresAt) {
    setHeader(event, 'Cache-Control', 'public, max-age=300, stale-while-revalidate=21600')
    setHeader(event, 'X-Release-Cache', 'HIT')
    return cache.data
  }

  // 2) TTL expiré => re-fetch GitHub (requêtes concurrentes mutualisées).
  if (!inflight) {
    inflight = fetchFreshRelease()
      .then((fresh) => {
        cache = { data: fresh, expiresAt: Date.now() + TTL_MS }
        return fresh
      })
      .finally(() => {
        inflight = null
      })
  }

  try {
    const fresh = await inflight
    setHeader(event, 'Cache-Control', 'public, max-age=300, stale-while-revalidate=21600')
    setHeader(event, 'X-Release-Cache', cache && now < cache.expiresAt ? 'HIT' : 'MISS')
    return fresh
  } catch {
    // 3) GitHub HS mais ancien cache dispo => STALE plutôt que fallback.
    if (cache) {
      setHeader(event, 'Cache-Control', 'public, max-age=300, stale-while-revalidate=21600')
      setHeader(event, 'X-Release-Cache', 'STALE')
      return cache.data
    }
    // 4) Dernier recours : fallback statique (jamais mis en cache).
    setHeader(event, 'Cache-Control', 'public, max-age=60')
    setHeader(event, 'X-Release-Cache', 'FALLBACK')
    return buildFallback()
  }
})
