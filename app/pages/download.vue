<template>
  <div class="page-download-hub" :class="{ 'is-loading-release': isReleaseLoading }">
    
    <section class="download-hero">
      <div class="container" style="max-width: 960px; margin: 0 auto; text-align: center;">
        
        <h1 class="download-hero-title">
          Download QxChat
          <span v-if="isReleaseLoading" class="version-skeleton" aria-label="Loading latest version"></span>
          <template v-else>{{ releaseData?.tag_name }}</template>
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

              <!-- Arch Dropdown Menu on Hover & Click -->
              <div class="arch-dropdown-wrapper" :class="{ 'is-open': macArchOpen }" @mouseleave="macArchOpen = false">
                <button
                  type="button"
                  class="arch-dropdown-trigger"
                  @click.stop="macArchOpen = !macArchOpen"
                  :title="'Current architecture: ' + macArch"
                >
                  <span>{{ macArch.toUpperCase() }}</span>
                  <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="arch-dropdown-menu">
                  <div class="dropdown-menu-header">CPU Architecture</div>
                  <button
                    type="button"
                    class="dropdown-item"
                    :class="{ active: macArch === 'arm64' }"
                    @click="macArch = 'arm64'; macArchOpen = false"
                  >
                    <span class="dropdown-item-radio"></span>
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-title">ARM64</span>
                      <span class="dropdown-item-sub">Apple Silicon (M)</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    class="dropdown-item"
                    :class="{ active: macArch === 'x64' }"
                    @click="macArch = 'x64'; macArchOpen = false"
                  >
                    <span class="dropdown-item-radio"></span>
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-title">x64 (Intel)</span>
                      <span class="dropdown-item-sub">Intel Core Macs</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div class="arch-tabs arch-tabs--single">
              <span class="universal-badge">.dmg Disk Image</span>
            </div>

            <div class="hub-action-row">
              <a :href="macAsset.url" target="_blank" rel="noopener" class="hub-download-btn">
                <span>Download .dmg ({{ macArch === 'arm64' ? 'ARM64' : 'x64' }})</span>
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
            <span>Zero bundled Chromium instances harmed in the making of this client. Discord installer: 140 MB. QxChat: 6 MB.</span>
          </div>
        </div>

      </div>
    </section>

    <!-- Backend-down popup: no hardcoded fallback versions.
         Shown when qxch.at is unreachable. -->
    <div v-if="showReleaseErrorPopup" class="release-error-overlay" role="alertdialog" aria-modal="true" aria-labelledby="release-error-title">
      <div class="release-error-modal">
        <button type="button" class="release-error-close" @click="dismissReleaseError" aria-label="Dismiss">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 id="release-error-title" class="release-error-title">Downloads temporarily unavailable</h2>
        <p class="release-error-text">
          We couldn't reach the QxChat backend (qxch.at) to fetch the latest
          versions, so download links are disabled right now instead of
          pointing at outdated files.
        </p>
        <div class="release-error-actions">
          <a href="https://github.com/lqxp/app/releases" target="_blank" rel="noopener" class="release-error-github-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
            <span>Get releases on GitHub</span>
          </a>
          <button type="button" class="release-error-retry-btn" @click="retryLoadRelease">
            <span>Retry</span>
          </button>
        </div>
      </div>
    </div>

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

useSeoMeta({
  title: 'Download for Windows, macOS, Linux, Android, iOS & NixOS',
  description: 'Download lightweight, native QxChat client apps for Windows, macOS, Linux, Android, iOS, and NixOS. ~6 MB installer, zero telemetry, client-side E2EE.',
  ogTitle: 'Download QxChat — Windows, macOS, Linux, Android, iOS',
  ogDescription: 'Ultra-lightweight native clients powered by Tauri v2 and Rust. Instant startup, minimal RAM usage, zero telemetry.',
  ogType: 'website',
  ogUrl: 'https://getqxchat.com/download',
  ogImage: 'https://getqxchat.com/og-cover.jpg',
  twitterCard: 'summary_large_image',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://getqxchat.com/download' }],
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    '@id': 'https://getqxchat.com/download#webpage',
    url: 'https://getqxchat.com/download',
    name: 'Download QxChat | Windows, macOS, Linux, Android, iOS, NixOS',
    isPartOf: { '@id': 'https://getqxchat.com/#website' },
    inLanguage: 'en',
    description: 'Download lightweight, native QxChat client apps for Windows, macOS, Linux, Android, iOS, and NixOS.',
  },
  {
    '@type': 'SoftwareApplication',
    name: 'QxChat',
    url: 'https://getqxchat.com/download',
    description: 'Native QxChat client downloads for Windows (.msi), macOS (.dmg), Linux (AppImage/.deb/.rpm), Android (.apk), iOS (.ipa) and NixOS (flake).',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'NixOS'],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    license: 'https://opensource.org/licenses/MIT',
  },
])

const winArch = ref<'x64' | 'arm64'>('x64')
const winArchOpen = ref(false)
const macArch = ref<'x64' | 'arm64'>('arm64')
const macArchOpen = ref(false)
const linuxArch = ref<'x64' | 'arm64'>('x64')
const linuxArchOpen = ref(false)
const linuxFormat = ref<'AppImage' | 'deb' | 'rpm'>('AppImage')

// Release metadata comes from the QxChat backend, fetched client-side
// so the statically generated site never serves a frozen version.
// Single source of truth: https://qxch.at/api/download (binaries catalogue).
// No Nuxt backend, no api.github.com calls, no hardcoded github.com URLs.
const QXCHAT_API_URL = 'https://qxch.at/api/download'

interface ApiEntry {
  name: string
  url?: string
  browser_download_url?: string
  size?: number
}

const releaseEntries = ref<ApiEntry[]>([])
const releaseTag = ref('')
const releaseLoaded = ref(false)
const releaseFailed = ref(false)

function normalizeReleasePayload(res: any): { tag: string; entries: ApiEntry[] } {
  if (!res || typeof res !== 'object') return { tag: '', entries: [] }
  const entries: ApiEntry[] = Array.isArray(res.binaries) && res.binaries.length > 0
    ? res.binaries
    : Array.isArray(res.latestBinaries) && res.latestBinaries.length > 0
      ? res.latestBinaries
      : Array.isArray(res.assets)
        ? res.assets
        : []
  const tag: string =
    typeof res.tag === 'string' && res.tag
      ? res.tag
      : typeof res.tag_name === 'string' && res.tag_name
        ? res.tag_name
        : typeof res.version === 'string' && res.version
          ? `v${res.version}`
          : typeof res?.release?.tag === 'string' && res.release.tag
            ? res.release.tag
            : typeof res?.latestRelease?.tag === 'string' && res.latestRelease.tag
              ? res.latestRelease.tag
              : ''
  return { tag, entries }
}

async function loadRelease() {
  releaseFailed.value = false
  try {
    const res = await $fetch<any>(QXCHAT_API_URL)
    const { tag, entries } = normalizeReleasePayload(res)
    const usable = entries.filter(
      e => e && typeof e.name === 'string' && (e.url || e.browser_download_url)
    )
    if (usable.length > 0) {
      releaseEntries.value = usable
      releaseTag.value = tag
      releaseLoaded.value = true
      return
    }
  } catch {
    // Backend unreachable => error popup (no hardcoded fallback versions).
  }
  releaseFailed.value = true
}

onMounted(() => {
  loadRelease()
})

// Compat object for the template (title only).
const releaseData = computed(() => (releaseTag.value ? { tag_name: releaseTag.value } : null))

const isReleaseLoading = computed(() => !releaseLoaded.value && !releaseFailed.value)

// Error popup state (backend down => no hardcoded fallback versions).
const releaseErrorDismissed = ref(false)
const showReleaseErrorPopup = computed(() => releaseFailed.value && !releaseErrorDismissed.value)

function dismissReleaseError() {
  releaseErrorDismissed.value = true
}

function retryLoadRelease() {
  releaseErrorDismissed.value = false
  loadRelease()
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

const loadingAsset = {
  name: 'Loading…',
  url: '#',
  size: 0,
  sizeStr: ''
}

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
  if (detectedOS.value === 'mac') return macArch.value === 'arm64' ? 'ARM64' : 'x64'
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

// Asset resolver: searches the qxch.at catalogue only.
// No match (or catalogue not loaded yet) => placeholder link '#'
// with buttons disabled via .is-loading-release. No GitHub fallback URLs.
const findEntry = (matcher: (name: string) => boolean) =>
  releaseEntries.value.find(a => typeof a.name === 'string' && matcher(a.name.toLowerCase()))

const toAsset = (entry: ApiEntry | undefined) => {
  if (!entry) return loadingAsset
  const url = entry.url || entry.browser_download_url || '#'
  return {
    name: entry.name,
    url,
    size: entry.size,
    sizeStr: formatBytes(entry.size)
  }
}

const resolveAsset = (matcher: (name: string) => boolean) => toAsset(findEntry(matcher))

// Windows Asset
const winAsset = computed(() => {
  if (!releaseLoaded.value) return loadingAsset
  if (winArch.value === 'arm64') {
    return resolveAsset(
      n => (n.includes('arm64') || n.includes('aarch64')) && n.endsWith('.msi')
    )
  }
  return resolveAsset(
    n => (n.includes('x64') || n.includes('x86_64') || n.includes('win')) && !n.includes('arm64') && !n.includes('aarch64') && n.endsWith('.msi')
  )
})

// macOS Asset (split binaries: Apple Silicon ARM64 vs Intel x64)
const macAsset = computed(() => {
  if (!releaseLoaded.value) return loadingAsset

  if (macArch.value === 'arm64') {
    return toAsset(
      findEntry(n =>
        n.endsWith('.dmg') &&
        (n.includes('aarch64') || n.includes('arm64') || n.includes('apple-silicon'))
      ) ?? findEntry(n =>
        // Backwards compat with older universal builds
        n.endsWith('.dmg') && (n.includes('universal') || n.includes('mac') || n.includes('darwin'))
      )
    )
  }

  return toAsset(
    findEntry(n =>
      n.endsWith('.dmg') &&
      !n.includes('aarch64') && !n.includes('arm64') && !n.includes('apple-silicon') &&
      (n.includes('x64') || n.includes('x86_64') || n.includes('intel'))
    ) ?? findEntry(n =>
      // Backwards compat with older universal builds
      n.endsWith('.dmg') && (n.includes('universal') || n.includes('mac') || n.includes('darwin'))
    )
  )
})

// Linux Asset
const linuxAsset = computed(() => {
  if (!releaseLoaded.value) return loadingAsset
  const isArm = linuxArch.value === 'arm64'

  if (linuxFormat.value === 'deb') {
    if (isArm) {
      return resolveAsset(
        n => (n.includes('arm64') || n.includes('aarch64')) && n.endsWith('.deb')
      )
    }
    return resolveAsset(
      n => (n.includes('amd64') || n.includes('x86_64') || n.includes('x64')) && !n.includes('arm64') && !n.includes('aarch64') && n.endsWith('.deb')
    )
  }

  if (linuxFormat.value === 'rpm') {
    if (isArm) {
      return resolveAsset(
        n => (n.includes('aarch64') || n.includes('arm64')) && n.endsWith('.rpm')
      )
    }
    return resolveAsset(
      n => (n.includes('x86_64') || n.includes('x64') || n.includes('amd64')) && !n.includes('aarch64') && !n.includes('arm64') && n.endsWith('.rpm')
    )
  }

  // AppImage
  if (isArm) {
    return resolveAsset(
      n => (n.includes('aarch64') || n.includes('arm64')) && n.endsWith('.appimage')
    )
  }
  return resolveAsset(
    n => (n.includes('amd64') || n.includes('x86_64') || n.includes('x64')) && !n.includes('aarch64') && !n.includes('arm64') && n.endsWith('.appimage')
  )
})

// Android Asset
const androidAsset = computed(() => {
  if (!releaseLoaded.value) return loadingAsset
  return resolveAsset(n => n.endsWith('.apk'))
})

// iOS Asset
const iosAsset = computed(() => {
  if (!releaseLoaded.value) return loadingAsset
  return resolveAsset(n => n.endsWith('.ipa'))
})

// NixOS Asset
const nixosAsset = computed(() => {
  if (!releaseLoaded.value) return loadingAsset
  return resolveAsset(n => n.includes('flake') && n.endsWith('.nix'))
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

.version-skeleton {
  display: inline-block;
  width: 3.5ch;
  height: 0.9em;
  border-radius: 0.2em;
  vertical-align: baseline;
  background: linear-gradient(90deg, var(--surface-raised) 25%, var(--border-color) 50%, var(--surface-raised) 75%);
  background-size: 200% 100%;
  animation: version-shimmer 1.2s ease-in-out infinite;
}

@keyframes version-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.is-loading-release .hub-download-btn,
.is-loading-release .primary-download-btn {
  opacity: 0.55;
  pointer-events: none;
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
  background: var(--accent-color);
  color: #ffffff;
  padding: 0 1.35rem;
  height: 50px;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.hub-download-btn:hover {
  background: var(--text-color);
  color: var(--bg-secondary);
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

.release-error-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
}

.release-error-modal {
  position: relative;
  max-width: 480px;
  width: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2.2rem 2rem 2rem;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
}

.release-error-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.release-error-close:hover {
  background: var(--surface-raised);
  color: var(--text-color);
}

.release-error-title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-color);
  margin: 0 0 0.75rem;
}

.release-error-text {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin: 0 0 1.75rem;
}

.release-error-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.release-error-github-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--accent-color);
  color: #ffffff;
  height: 50px;
  padding: 0 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.25s ease;
}

.release-error-github-btn:hover {
  background: var(--text-color);
  color: var(--bg-secondary);
}

.release-error-retry-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  height: 46px;
  padding: 0 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.release-error-retry-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
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