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

export default cachedEventHandler(
  async () => {
    const fallbackTag = 'v1.20.4'
    const fallbackBase = `https://github.com/lqxp/app/releases/download/${fallbackTag}`

    try {
      const release = await $fetch<GitHubRelease>(
        'https://api.github.com/repos/lqxp/app/releases/latest',
        {
          headers: {
            accept: 'application/vnd.github+json',
            'User-Agent': 'QxChat-Site-App',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      )

      const assets = Array.isArray(release.assets) ? release.assets : []
      const tag = release.tag_name || fallbackTag
      const ver = tag.replace(/^v/, '')
      const base = `https://github.com/lqxp/app/releases/download/${tag}`

      const lower = (n: string) => n.toLowerCase()
      const isDmg = (n: string) => lower(n).endsWith('.dmg')

      // macOS split binaries (Apple Silicon ARM64 vs Intel x64),
      // with fallback to legacy universal builds.
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
    } catch {
      return {
        tag_name: fallbackTag,
        published_at: '',
        assets: [],
        downloads: {
          windows: {
            x64: `${fallbackBase}/QxChat_1.20.4_x64_en-US.msi`,
            arm64: `${fallbackBase}/QxChat_1.20.4_arm64_en-US.msi`
          },
          macos: {
            arm64: `${fallbackBase}/QxChat_1.20.4_aarch64.dmg`,
            x64: `${fallbackBase}/QxChat_1.20.4_x64.dmg`
          },
          linux: {
            appimage_x64: `${fallbackBase}/QxChat_1.20.4_amd64.AppImage`,
            appimage_arm64: `${fallbackBase}/QxChat_1.20.4_aarch64.AppImage`
          },
          android: `${fallbackBase}/QxChat_1.20.4_aarch64.apk`,
          ios: `${fallbackBase}/QxChat_1.20.4_unsigned.ipa`,
          nixos: `${fallbackBase}/QxChat_1.20.4_flake.nix`
        }
      }
    }
  },
  {
    maxAge: 60 * 5,
    name: 'app-latest-release'
  }
)
