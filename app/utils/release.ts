import type { Release, ReleaseAsset } from '~~/server/api/release.get'

export type PlatformId = 'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'nixos'

export interface Build {
  label: string
  arch?: string
  note?: string
  asset: ReleaseAsset
}

export interface Platform {
  id: PlatformId
  name: string
  blurb: string
  builds: Build[]
}

type Rule = [label: string, arch: string | undefined, test: RegExp, note?: string]

const rules: Record<PlatformId, { name: string, blurb: string, rules: Rule[] }> = {
  windows: {
    name: 'Windows',
    blurb: 'MSI installer for x64 and ARM64 PCs.',
    rules: [
      ['Installer', 'x64', /_x64_.*\.msi$/],
      ['Installer', 'ARM64', /_arm64_.*\.msi$/],
    ],
  },
  macos: {
    name: 'macOS',
    blurb: 'Disk images for Apple silicon and Intel Macs. If macOS blocks the first launch, right-click the app and choose Open.',
    rules: [
      ['Disk image', 'Apple silicon', /_aarch64\.dmg$/],
      ['Disk image', 'Intel', /_x64\.dmg$/],
    ],
  },
  linux: {
    name: 'Linux',
    blurb: 'AppImage runs anywhere. Packages for Debian, Ubuntu, Fedora and openSUSE.',
    rules: [
      ['AppImage', 'x64', /_amd64\.AppImage$/],
      ['AppImage', 'ARM64', /_aarch64\.AppImage$/],
      ['.deb', 'x64', /_amd64\.deb$/],
      ['.deb', 'ARM64', /_arm64\.deb$/],
      ['.rpm', 'x64', /\.x86_64\.rpm$/],
      ['.rpm', 'ARM64', /\.aarch64\.rpm$/],
      ['Archive', 'x64', /_linux-x86_64\.tar\.gz$/],
      ['Archive', 'ARM64', /_linux-aarch64\.tar\.gz$/],
    ],
  },
  android: {
    name: 'Android',
    blurb: 'For 64-bit ARM phones. Allow installs from your browser when Android asks.',
    rules: [['APK', 'ARM64', /\.apk$/]],
  },
  ios: {
    name: 'iOS',
    blurb: 'Unsigned build. Install it with AltStore or SideStore, or use the web app.',
    rules: [['Unsigned IPA', undefined, /_unsigned\.ipa$/]],
  },
  nixos: {
    name: 'NixOS',
    blurb: 'A Nix flake for NixOS and Nix users.',
    rules: [['flake.nix', undefined, /_flake\.nix$/]],
  },
}

export function platforms(release: Release | null | undefined): Platform[] {
  const assets = release?.assets ?? []
  return (Object.keys(rules) as PlatformId[]).map((id) => {
    const r = rules[id]
    const builds: Build[] = []
    for (const [label, arch, test, note] of r.rules) {
      const asset = assets.find(a => test.test(a.name))
      if (asset)
        builds.push({ label, arch, note, asset })
    }
    return { id, name: r.name, blurb: r.blurb, builds }
  })
}

export function detectPlatform(): { id: PlatformId, arm: boolean } | null {
  const ua = navigator.userAgent.toLowerCase()
  const arm = /arm64|aarch64/.test(ua)
  if (/iphone|ipad|ipod/.test(ua))
    return { id: 'ios', arm: true }
  if (ua.includes('android'))
    return { id: 'android', arm: true }
  if (ua.includes('windows'))
    return { id: 'windows', arm }
  if (ua.includes('mac os'))
    return { id: 'macos', arm: true }
  if (ua.includes('linux'))
    return { id: 'linux', arm }
  return null
}

export function bytes(n: number): string {
  if (n < 1024 * 1024)
    return `${Math.round(n / 1024)} KB`
  return `${(n / 1024 / 1024).toFixed(1)} MB`
}
