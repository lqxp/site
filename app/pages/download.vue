<template>
  <div class="page-download-hub">
    
    <section class="download-hero">
      <div class="container" style="max-width: 960px; margin: 0 auto; text-align: center;">
        
        <h1 class="download-hero-title">
          Download QxChat {{ releaseData?.tag_name }}
        </h1>
        
        <p class="download-hero-desc">
          Ultra-lightweight native clients powered by Tauri v2 and Rust.<br />
          Instant startup, minimal RAM usage, zero telemetry, and client-side E2EE.
        </p>

        <!-- Smart Detected OS Spotlight Card -->
        <div class="spotlight-download-card">
          <div class="spotlight-left">
            <div class="spotlight-icon" v-html="detectedOSIcon"></div>
            <div class="spotlight-info">
              <span class="spotlight-tag">Detected System</span>
              <h3 class="spotlight-heading">QxChat for {{ detectedOSName }}</h3>
            </div>
          </div>

          <div class="spotlight-actions">
            <a :href="primaryDownloadUrl" target="_blank" rel="noopener" class="primary-download-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download for {{ detectedOSName }}</span>
            </a>

            <a href="https://qxch.at/app" target="_blank" rel="noopener" class="web-client-btn">
              <span>Open Web App</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>

    <section class="platforms-section">
      <div class="container" style="max-width: 1120px; margin: 0 auto;">
        
        <div class="section-heading-wrap">
          <span class="section-eyebrow">ALL CLIENTS</span>
          <h2>Native apps for desktop & mobile</h2>
          <p>Choose your operating system and preferred package format.</p>
        </div>

        <div class="platforms-grid">
          
          <!-- Card 1: Windows -->
          <div class="platform-hub-card">
            <div class="hub-card-top">
              <div class="hub-card-top-left">
                <div class="hub-icon-wrap" v-html="iconWindows"></div>
                <div class="hub-card-title">
                  <h3>Windows</h3>
                </div>
              </div>

              <!-- Arch Dropdown Menu on Hover & Click -->
              <div class="arch-dropdown-wrapper" :class="{ 'is-open': winArchOpen }" @mouseleave="winArchOpen = false">
                <button 
                  type="button" 
                  class="arch-dropdown-trigger" 
                  @click.stop="winArchOpen = !winArchOpen"
                  :title="'Current architecture: ' + winArch"
                >
                  <span>{{ winArch.toUpperCase() }}</span>
                  <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="arch-dropdown-menu">
                  <div class="dropdown-menu-header">CPU Architecture</div>
                  <button 
                    type="button" 
                    class="dropdown-item" 
                    :class="{ active: winArch === 'x64' }" 
                    @click="winArch = 'x64'; winArchOpen = false"
                  >
                    <span class="dropdown-item-radio"></span>
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-title">x64 (64-bit)</span>
                      <span class="dropdown-item-sub">Intel & AMD</span>
                    </div>
                  </button>
                  <button 
                    type="button" 
                    class="dropdown-item" 
                    :class="{ active: winArch === 'arm64' }" 
                    @click="winArch = 'arm64'; winArchOpen = false"
                  >
                    <span class="dropdown-item-radio"></span>
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-title">ARM64</span>
                      <span class="dropdown-item-sub">Snapdragon / Copilot+</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div class="arch-tabs arch-tabs--single">
              <span class="universal-badge">.msi Native Installer</span>
            </div>

            <div class="hub-action-row">
              <a :href="winAsset.url" target="_blank" rel="noopener" class="hub-download-btn">
                <span>Download .msi</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          <!-- Card 2: macOS -->
          <div class="platform-hub-card">
            <div class="hub-card-top">
              <div class="hub-card-top-left">
                <div class="hub-icon-wrap" v-html="iconMacos"></div>
                <div class="hub-card-title">
                  <h3>macOS</h3>
                </div>
              </div>
              <span class="hub-top-badge">Universal</span>
            </div>

            <div class="arch-tabs arch-tabs--single">
              <span class="universal-badge">Apple Silicon & Intel</span>
            </div>

            <div class="hub-action-row">
              <a :href="macAsset.url" target="_blank" rel="noopener" class="hub-download-btn">
                <span>Download .dmg</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          <!-- Card 3: Linux -->
          <div class="platform-hub-card">
            <div class="hub-card-top">
              <div class="hub-card-top-left">
                <div class="hub-icon-wrap" v-html="iconLinux"></div>
                <div class="hub-card-title">
                  <h3>Linux</h3>
                </div>
              </div>

              <!-- Arch Dropdown Menu on Hover & Click -->
              <div class="arch-dropdown-wrapper" :class="{ 'is-open': linuxArchOpen }" @mouseleave="linuxArchOpen = false">
                <button 
                  type="button" 
                  class="arch-dropdown-trigger" 
                  @click.stop="linuxArchOpen = !linuxArchOpen"
                  :title="'Current architecture: ' + linuxArch"
                >
                  <span>{{ linuxArch.toUpperCase() }}</span>
                  <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="arch-dropdown-menu">
                  <div class="dropdown-menu-header">CPU Architecture</div>
                  <button 
                    type="button" 
                    class="dropdown-item" 
                    :class="{ active: linuxArch === 'x64' }" 
                    @click="linuxArch = 'x64'; linuxArchOpen = false"
                  >
                    <span class="dropdown-item-radio"></span>
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-title">x64 (AMD64)</span>
                      <span class="dropdown-item-sub">Intel & AMD 64-bit</span>
                    </div>
                  </button>
                  <button 
                    type="button" 
                    class="dropdown-item" 
                    :class="{ active: linuxArch === 'arm64' }" 
                    @click="linuxArch = 'arm64'; linuxArchOpen = false"
                  >
                    <span class="dropdown-item-radio"></span>
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-title">ARM64 (aarch64)</span>
                      <span class="dropdown-item-sub">Raspberry Pi, Mac Asahi</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Single Format Selector Row -->
            <div class="arch-tabs">
              <button 
                type="button" 
                class="arch-tab-btn" 
                :class="{ active: linuxFormat === 'AppImage' }" 
                @click="linuxFormat = 'AppImage'"
              >
                AppImage
              </button>
              <button 
                type="button" 
                class="arch-tab-btn" 
                :class="{ active: linuxFormat === 'deb' }" 
                @click="linuxFormat = 'deb'"
              >
                .deb
              </button>
              <button 
                type="button" 
                class="arch-tab-btn" 
                :class="{ active: linuxFormat === 'rpm' }" 
                @click="linuxFormat = 'rpm'"
              >
                .rpm
              </button>
            </div>

            <div class="hub-action-row">
              <a :href="linuxAsset.url" target="_blank" rel="noopener" class="hub-download-btn">
                <span>Download {{ linuxFormat }}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          <!-- Card 4: Android -->
          <div class="platform-hub-card">
            <div class="hub-card-top">
              <div class="hub-card-top-left">
                <div class="hub-icon-wrap" v-html="iconAndroid"></div>
                <div class="hub-card-title">
                  <h3>Android</h3>
                </div>
              </div>
              <span class="hub-top-badge">ARM64</span>
            </div>

            <div class="arch-tabs arch-tabs--single">
              <span class="universal-badge">Native Android APK</span>
            </div>

            <div class="hub-action-row">
              <a :href="androidAsset.url" target="_blank" rel="noopener" class="hub-download-btn">
                <span>Download APK</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          <!-- Card 5: iOS -->
          <div class="platform-hub-card">
            <div class="hub-card-top">
              <div class="hub-card-top-left">
                <div class="hub-icon-wrap" v-html="iconIos"></div>
                <div class="hub-card-title">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <h3>iOS</h3>
                  </div>
                </div>
              </div>
              <span class="unsigned-badge">Unsigned</span>
            </div>

            <div class="arch-tabs arch-tabs--single">
              <span class="universal-badge">Sideload / AltStore / TrollStore</span>
            </div>

            <div class="hub-action-row">
              <a :href="iosAsset.url" target="_blank" rel="noopener" class="hub-download-btn">
                <span>Download .ipa</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          <!-- Card 6: NixOS -->
          <div class="platform-hub-card">
            <div class="hub-card-top">
              <div class="hub-card-top-left">
                <div class="hub-icon-wrap" v-html="iconNixos"></div>
                <div class="hub-card-title">
                  <h3>NixOS</h3>
                </div>
              </div>
              <span class="hub-top-badge">Flake</span>
            </div>

            <div class="arch-tabs arch-tabs--single">
              <span class="universal-badge">Flake Package Module</span>
            </div>

            <div class="hub-action-row">
              <a :href="nixosAsset.url" target="_blank" rel="noopener" class="hub-download-btn">
                <span>Download Flake (.nix)</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <!-- Sarcastic Comparison Pill Banner -->
        <div class="download-sarcasm-banner">
          <div class="sarcasm-pill">
            <span class="sarcasm-dot"></span>
            <span>Zero bundled Chromium instances harmed in the making of this client. Discord installer: 140 MB. QxChat: 6 MB.</span>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import iconWindows from '~/assets/svgs/windows.svg?raw'
import iconMacos from '~/assets/svgs/macos.svg?raw'
import iconLinux from '~/assets/svgs/linux.svg?raw'
import iconAndroid from '~/assets/svgs/android.svg?raw'
import iconIos from '~/assets/svgs/ios.svg?raw'
import iconNixos from '~/assets/svgs/nixos.svg?raw'

useHead({
  title: 'Download QxChat | Windows, macOS, Linux, Android, iOS, NixOS',
  meta: [
    { name: 'description', content: 'Download lightweight, native QxChat client apps for Windows, macOS, Linux, Android, iOS, and NixOS. Fast, secure, zero telemetry.' }
  ]
})

const winArch = ref<'x64' | 'arm64'>('x64')
const winArchOpen = ref(false)
const linuxArch = ref<'x64' | 'arm64'>('x64')
const linuxArchOpen = ref(false)
const linuxFormat = ref<'AppImage' | 'deb' | 'rpm'>('AppImage')

interface ReleaseAsset {
  name: string
  browser_download_url: string
  size?: number
}

interface ReleaseData {
  tag_name: string
  published_at: string
  assets: ReleaseAsset[]
}

const formatBytes = (bytes?: number) => {
  if (!bytes || bytes <= 0) return ''
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(2)} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(1)} MB`
  return `${(mb / 1024).toFixed(2)} GB`
}

// Fetch directly from GitHub on the client so we always see the freshest release,
// instead of going through a server route that can be cached/stale.
const { data: releaseData } = await useFetch<ReleaseData>('https://api.github.com/repos/lqxp/app/releases/latest', {
  server: false,
  cache: 'no-store',
  headers: {
    accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  },
  default: () => ({
    tag_name: 'v1.17.0',
    published_at: '',
    assets: []
  })
})

const detectedOS = ref<'win' | 'mac' | 'linux' | 'android' | 'ios' | 'nixos' | 'other'>('win')
const detectedArch = ref<'x64' | 'arm64'>('x64')

onMounted(() => {
  if (typeof window !== 'undefined') {
    const ua = window.navigator.userAgent.toLowerCase()
    const platform = (window.navigator.platform || '').toLowerCase()

    const isArm = ua.includes('arm64') || ua.includes('aarch64') || ua.includes('armv') || platform.includes('arm')
    if (isArm) {
      detectedArch.value = 'arm64'
      winArch.value = 'arm64'
      linuxArch.value = 'arm64'
    }

    if (ua.includes('win')) {
      detectedOS.value = 'win'
    } else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
      detectedOS.value = 'ios'
    } else if (ua.includes('mac') || ua.includes('darwin')) {
      detectedOS.value = 'mac'
    } else if (ua.includes('android')) {
      detectedOS.value = 'android'
    } else if (ua.includes('nixos')) {
      detectedOS.value = 'nixos'
    } else if (ua.includes('linux')) {
      detectedOS.value = 'linux'
    } else {
      detectedOS.value = 'win'
    }
  }
})

const detectedOSName = computed(() => {
  switch (detectedOS.value) {
    case 'win': return 'Windows'
    case 'mac': return 'macOS'
    case 'linux': return 'Linux'
    case 'android': return 'Android'
    case 'ios': return 'iOS'
    case 'nixos': return 'NixOS'
    default: return 'Desktop'
  }
})

const detectedArchDisplay = computed(() => {
  if (detectedOS.value === 'mac') return 'Universal'
  if (detectedArch.value === 'arm64') return 'ARM64'
  return 'x64'
})

const detectedOSIcon = computed(() => {
  switch (detectedOS.value) {
    case 'win': return iconWindows
    case 'mac': return iconMacos
    case 'linux': return iconLinux
    case 'android': return iconAndroid
    case 'ios': return iconIos
    case 'nixos': return iconNixos
    default: return iconWindows
  }
})

// Asset Resolver
const resolveAsset = (
  matcher: (name: string) => boolean,
  defaultName: string,
  defaultUrl: string,
  defaultSize?: number
) => {
  const asset = releaseData.value?.assets?.find(a => matcher(a.name.toLowerCase()))
  if (asset) {
    return {
      name: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
      sizeStr: formatBytes(asset.size)
    }
  }
  return {
    name: defaultName,
    url: defaultUrl,
    size: defaultSize,
    sizeStr: formatBytes(defaultSize)
  }
}

// Windows Asset
const winAsset = computed(() => {
  const isArm = winArch.value === 'arm64'
  const tag = releaseData.value?.tag_name
  const ver = tag.replace(/^v/, '')
  const base = `https://github.com/lqxp/app/releases/download/${tag}`

  if (isArm) {
    return resolveAsset(
      n => (n.includes('arm64') || n.includes('aarch64')) && n.endsWith('.msi'),
      `QxChat_${ver}_arm64_en-US.msi`,
      `${base}/QxChat_${ver}_arm64_en-US.msi`,
      11324620
    )
  }
  return resolveAsset(
    n => (n.includes('x64') || n.includes('x86_64') || n.includes('win')) && !n.includes('arm64') && !n.includes('aarch64') && n.endsWith('.msi'),
    `QxChat_${ver}_x64_en-US.msi`,
    `${base}/QxChat_${ver}_x64_en-US.msi`,
    11639193
  )
})

// macOS Asset
const macAsset = computed(() => {
  const tag = releaseData.value?.tag_name
  const ver = tag.replace(/^v/, '')
  const base = `https://github.com/lqxp/app/releases/download/${tag}`

  return resolveAsset(
    n => (n.includes('universal') || n.includes('mac') || n.includes('darwin')) && n.endsWith('.dmg'),
    `QxChat_${ver}_universal.dmg`,
    `${base}/QxChat_${ver}_universal.dmg`,
    25585254
  )
})

// Linux Asset
const linuxAsset = computed(() => {
  const isArm = linuxArch.value === 'arm64'
  const tag = releaseData.value?.tag_name
  const ver = tag.replace(/^v/, '')
  const base = `https://github.com/lqxp/app/releases/download/${tag}`

  if (linuxFormat.value === 'deb') {
    if (isArm) {
      return resolveAsset(
        n => (n.includes('arm64') || n.includes('aarch64')) && n.endsWith('.deb'),
        `QxChat_${ver}_arm64.deb`,
        `${base}/QxChat_${ver}_arm64.deb`,
        14470348
      )
    }
    return resolveAsset(
      n => (n.includes('amd64') || n.includes('x86_64') || n.includes('x64')) && !n.includes('arm64') && !n.includes('aarch64') && n.endsWith('.deb'),
      `QxChat_${ver}_amd64.deb`,
      `${base}/QxChat_${ver}_amd64.deb`,
      14365491
    )
  }

  if (linuxFormat.value === 'rpm') {
    if (isArm) {
      return resolveAsset(
        n => (n.includes('aarch64') || n.includes('arm64')) && n.endsWith('.rpm'),
        `QxChat-${ver}-1.aarch64.rpm`,
        `${base}/QxChat-${ver}-1.aarch64.rpm`,
        14470348
      )
    }
    return resolveAsset(
      n => (n.includes('x86_64') || n.includes('x64') || n.includes('amd64')) && !n.includes('aarch64') && !n.includes('arm64') && n.endsWith('.rpm'),
      `QxChat-${ver}-1.x86_64.rpm`,
      `${base}/QxChat-${ver}-1.x86_64.rpm`,
      14365491
    )
  }

  // AppImage
  if (isArm) {
    return resolveAsset(
      n => (n.includes('aarch64') || n.includes('arm64')) && n.endsWith('.appimage'),
      `QxChat_${ver}_aarch64.AppImage`,
      `${base}/QxChat_${ver}_aarch64.AppImage`,
      86822092
    )
  }
  return resolveAsset(
    n => (n.includes('amd64') || n.includes('x86_64') || n.includes('x64')) && !n.includes('aarch64') && !n.includes('arm64') && n.endsWith('.appimage'),
    `QxChat_${ver}_amd64.AppImage`,
    `${base}/QxChat_${ver}_amd64.AppImage`,
    91542323
  )
})

// Android Asset
const androidAsset = computed(() => {
  const tag = releaseData.value?.tag_name
  const ver = tag.replace(/^v/, '')
  const base = `https://github.com/lqxp/app/releases/download/${tag}`

  return resolveAsset(
    n => n.endsWith('.apk'),
    `QxChat_${ver}_aarch64.apk`,
    `${base}/QxChat_${ver}_aarch64.apk`,
    22963814
  )
})

// iOS Asset
const iosAsset = computed(() => {
  const tag = releaseData.value?.tag_name
  const ver = tag.replace(/^v/, '')
  const base = `https://github.com/lqxp/app/releases/download/${tag}`

  return resolveAsset(
    n => n.endsWith('.ipa'),
    `QxChat_${ver}_unsigned.ipa`,
    `${base}/QxChat_${ver}_unsigned.ipa`,
    9154232
  )
})

// NixOS Asset
const nixosAsset = computed(() => {
  const tag = releaseData.value?.tag_name
  const ver = tag.replace(/^v/, '')
  const base = `https://github.com/lqxp/app/releases/download/${tag}`

  return resolveAsset(
    n => n.includes('flake') && n.endsWith('.nix'),
    `QxChat_${ver}_flake.nix`,
    `${base}/QxChat_${ver}_flake.nix`,
    1525
  )
})

const primaryAsset = computed(() => {
  switch (detectedOS.value) {
    case 'win': return winAsset.value
    case 'mac': return macAsset.value
    case 'linux': return linuxAsset.value
    case 'android': return androidAsset.value
    case 'nixos': return nixosAsset.value
    case 'ios': return iosAsset.value
    default: return winAsset.value
  }
})

const primaryDownloadUrl = computed(() => primaryAsset.value.url)
</script>

<style scoped>
.page-download-hub {
  min-height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
  padding-top: 100px;
  padding-bottom: 5rem;
}

.download-hero {
  padding: 3rem 1.5rem 4rem;
}

.hero-release-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.pill-version {
  color: var(--text-color);
  font-weight: 700;
}

.pill-divider {
  opacity: 0.4;
}

.download-hero-title {
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1.05;
  color: var(--text-color);
  margin-bottom: 1.25rem;
}

.download-hero-desc {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 680px;
  margin: 0 auto 3rem;
}

.spotlight-download-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  max-width: 860px;
  margin: 0 auto;
}

.spotlight-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.spotlight-icon {
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spotlight-icon :deep(svg),
.spotlight-icon svg {
  width: 46px;
  height: 46px;
}

.spotlight-tag {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--accent-color);
  display: block;
  margin-bottom: 0.25rem;
}

.spotlight-heading {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-color);
  margin: 0;
}

.spotlight-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.primary-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--accent-color);
  color: #ffffff;
  padding: 0 1.8rem;
  height: 52px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.primary-download-btn:hover {
  background: var(--text-color);
  color: var(--bg-secondary);
}

.web-client-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-raised);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0 1.4rem;
  height: 52px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.web-client-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.platforms-section {
  padding: 4rem 1.5rem 6rem;
  border-top: 1px solid var(--border-color);
}

.section-heading-wrap {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-eyebrow {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--accent-color);
  display: block;
  margin-bottom: 0.5rem;
}

.section-heading-wrap h2 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text-color);
  margin-bottom: 0.75rem;
}

.section-heading-wrap p {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin: 0;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  max-width: 1120px;
  margin: 0 auto;
}

.platform-hub-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2.2rem 1.8rem;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease;
}

.platform-hub-card:hover {
  border-color: var(--accent-color);
}

.hub-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.hub-card-top-left {
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.hub-icon-wrap {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hub-icon-wrap :deep(svg),
.hub-icon-wrap svg {
  width: 42px;
  height: 42px;
}

.hub-card-title h3 {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-color);
  margin: 0;
}

.hub-top-badge {
  font-size: 0.68rem;
  font-weight: 700;
  background: var(--surface-raised);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 3px 8px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.unsigned-badge {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
}

.arch-dropdown-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.arch-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: var(--surface-raised);
  border: 1px solid var(--border-color);
  color: var(--accent-color);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.arch-dropdown-wrapper:hover .arch-dropdown-trigger,
.arch-dropdown-wrapper.is-open .arch-dropdown-trigger {
  background: var(--accent-color);
  color: #ffffff;
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(28, 113, 216, 0.25);
}

.dropdown-chevron {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.arch-dropdown-wrapper:hover .dropdown-chevron,
.arch-dropdown-wrapper.is-open .dropdown-chevron {
  transform: rotate(180deg);
}

.arch-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 210px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.16);
  padding: 6px;
  z-index: 60;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px) scale(0.96);
  transform-origin: top right;
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), visibility 0.2s;
  pointer-events: none;
}

.arch-dropdown-menu::before {
  content: '';
  position: absolute;
  top: -14px;
  left: 0;
  right: 0;
  height: 14px;
  background: transparent;
}

.arch-dropdown-wrapper:hover .arch-dropdown-menu,
.arch-dropdown-wrapper.is-open .arch-dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.dropdown-menu-header {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
  padding: 6px 10px 4px;
  opacity: 0.7;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease;
  color: var(--text-color);
}

.dropdown-item:hover {
  background: var(--surface-raised);
}

.dropdown-item.active {
  background: rgba(28, 113, 216, 0.08);
}

.dropdown-item-radio {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.dropdown-item.active .dropdown-item-radio {
  border-color: var(--accent-color);
  background: var(--accent-color);
  box-shadow: 0 0 6px rgba(28, 113, 216, 0.4);
}

.dropdown-item-title {
  display: block;
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-color);
}

.dropdown-item-sub {
  display: block;
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.arch-tabs {
  display: flex;
  gap: 6px;
  background: var(--surface-raised);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  margin-bottom: 1.5rem;
}

.arch-tabs--single {
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
}

.universal-badge {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-color);
  text-align: center;
}

.arch-tab-btn {
  flex: 1;
  background: none;
  border: none;
  padding: 8px 4px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: center;
  white-space: nowrap;
}

.arch-tab-btn:active {
  transform: scale(0.94);
}

.arch-tab-btn.active {
  background: var(--bg-secondary);
  color: var(--text-color);
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.hub-action-row {
  margin-top: auto;
}

.hub-download-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--text-color);
  color: var(--bg-secondary);
  padding: 0 1.35rem;
  height: 50px;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.hub-download-btn:hover {
  background: var(--accent-color);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(28, 113, 216, 0.3);
}

.hub-download-btn:active {
  transform: scale(0.96);
}

.download-sarcasm-banner {
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sarcasm-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 22px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text-secondary);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  text-align: center;
}

.sarcasm-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  flex-shrink: 0;
}

@media (max-width: 960px) {
  .platforms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .spotlight-download-card {
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
  .spotlight-actions {
    width: 100%;
    flex-direction: column;
  }
  .primary-download-btn,
  .web-client-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .platforms-grid {
    grid-template-columns: 1fr;
  }
}
</style>