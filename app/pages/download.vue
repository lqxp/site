<script setup lang="ts">
import iconGecko from '~/assets/svgs/firefox.svg?raw'
import iconWebkit from '~/assets/svgs/safari.svg?raw'
import iconChromium from '~/assets/svgs/chrome.svg?raw'
import iconGeneric from '~/assets/svgs/generic.svg?raw'
import iconWindows from '~/assets/svgs/windows.svg?raw'
import iconMacos from '~/assets/svgs/macos.svg?raw'
import iconAndroid from '~/assets/svgs/android.svg?raw'
import iconLinux from '~/assets/svgs/linux.svg?raw'

type ReleaseAsset = {
  name: string
  browser_download_url: string
}

type Release = {
  tag_name: string
  html_url: string
  assets: ReleaseAsset[]
}

useSeoMeta({
  title: 'Download — QxChat',
  description: 'Download the latest version of QxChat for Windows, Linux, macOS and Android.',
  ogType: 'website'
})

const linuxFormat = ref<'AppImage' | '.deb' | '.rpm'>('AppImage')

const linuxFormats = [
  { label: 'AppImage' as const, matcher: /\.AppImage$/i },
  { label: '.deb' as const, matcher: /\.deb$/i },
  { label: '.rpm' as const, matcher: /\.rpm$/i },
]

const otherPlatforms = [
  { name: 'Windows', matcher: /windows|win|\.exe|\.msi/i },
  { name: 'macOS', matcher: /macos|darwin|\.dmg|\.pkg/i },
  { name: 'Android', matcher: /android|\.apk|\.aab/i },
]

// ── Icônes plateformes (Windows / macOS / Android) ────────────
const platformIcons: Record<string, string> = {
  Windows: iconWindows,
  macOS: iconMacos,
  Android: iconAndroid,
}

const { data: latestRelease } = await useFetch<Release>('https://api.github.com/repos/lqxp/app/releases/latest', {
  key: 'lqxp-app-latest-release',
  default: () => ({ tag_name: '', html_url: 'https://github.com/lqxp/app/releases', assets: [] })
})

const linuxAsset = computed(() => {
  const assets = latestRelease.value?.assets ?? []
  const fmt = linuxFormats.find(f => f.label === linuxFormat.value)!
  const asset = assets.find(a => fmt.matcher.test(a.name))
  return {
    file: asset?.name ?? 'Browse releases',
    url: asset?.browser_download_url ?? 'https://github.com/lqxp/app/releases',
  }
})

const downloads = computed(() => {
  const assets = latestRelease.value?.assets ?? []
  return otherPlatforms.map((platform) => {
    const asset = assets.find((item) => platform.matcher.test(item.name))
    return {
      name: platform.name,
      assetName: asset?.name ?? 'Browse releases',
      url: asset?.browser_download_url ?? 'https://github.com/lqxp/app/releases'
    }
  })
})

// ── Icône navigateur (détection du moteur côté client) ─────────
const browserIcon = ref<HTMLElement | null>(null)
const browserLabel = ref('Open in browser')

const browserIcons: Record<string, string> = {
  gecko: iconGecko,
  webkit: iconWebkit,
  chromium: iconChromium,
  generic: iconGeneric,
}

onMounted(() => {
  const ua = navigator.userAgent
  const isChromium = /Chrome\//.test(ua) || /Chromium\//.test(ua)
  const isGecko = /Gecko\//.test(ua) && !/like Gecko/.test(ua.replace(/\(.*?\)/g, ''))
  const isWebKit = !isGecko && /AppleWebKit/.test(ua) && /Safari/.test(ua) && !/Chrome/.test(ua)

  const engine = isChromium ? 'chromium' : isGecko ? 'gecko' : isWebKit ? 'webkit' : 'generic'

  if (browserIcon.value) browserIcon.value.innerHTML = browserIcons[engine]
})
</script>

<template>
  <section class="page-hero container">
    <p class="eyebrow">Download</p>
    <h1>Get the latest version.</h1>
    <p class="lead">
      Links are fetched automatically from the
      <a href="https://github.com/lqxp/app/releases" target="_blank" rel="noreferrer">GitHub Releases</a>
      of the lqxp/app repository.
    </p>
    <p v-if="latestRelease?.tag_name" class="release-tag">{{ latestRelease.tag_name }}</p>
  </section>

  <section class="download-grid container">
    <!-- ── Web Experience card ─────────────────────────────────────── -->
    <a class="download-card" href="/app">
      <span class="download-card__icon" aria-hidden="true" ref="browserIcon"></span>
      <span class="download-card__badge">qxch.at/app</span>
      <span class="download-card__platform">Web</span>
      <span class="download-card__file">{{ browserLabel }}</span>
      <span class="download-card__arrow">→</span>
    </a>

    <!-- ── Windows, macOS, Android cards ───────────────────────── -->
    <a v-for="item in downloads" :key="item.name" class="download-card" :href="item.url" target="_blank"
      rel="noreferrer">
      <span class="download-card__icon" aria-hidden="true" v-html="platformIcons[item.name]"></span>

      <span class="download-card__platform">{{ item.name }}</span>
      <span class="download-card__file">{{ item.assetName }}</span>
      <span class="download-card__arrow" aria-hidden="true">↓</span>
    </a>

    <!-- ── Linux card (with format selector) ───────────────────── -->
    <a class="download-card" :href="linuxAsset.url" target="_blank" rel="noreferrer">
      <span class="download-card__icon" aria-hidden="true" v-html="iconLinux"></span>

      <span class="download-card__platform">Linux</span>

      <div class="format-pills" @click.stop>
        <button v-for="fmt in linuxFormats" :key="fmt.label" class="pill" :class="{ active: linuxFormat === fmt.label }"
          @click.prevent="linuxFormat = fmt.label">{{ fmt.label }}</button>
      </div>

      <span class="download-card__file">{{ linuxAsset.file }}</span>
      <span class="download-card__arrow" aria-hidden="true">↓</span>
    </a>

  </section>

  <section class="download-note container">
    <p>
      No build for your platform?
      <a href="https://github.com/lqxp/app" target="_blank" rel="noreferrer">Build QxChat yourself</a>,
      the code is open.
    </p>
  </section>
</template>

<style scoped>
.page-hero {
  padding: 56px 0 32px;
}

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin-bottom: 14px;
  max-width: 600px;
}

.page-hero .lead a {
  color: var(--blue-700);
  font-weight: 600;
}

.release-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 18px;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  background: var(--cream);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--ink);
}

/* ── Download grid ────────────────────────────────────────────── */
.download-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 24px 0 48px;
}

.download-card {
  position: relative;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  transition: border-color 150ms ease, transform 150ms ease;
  text-decoration: none;
  color: inherit;
}

.download-card__badge {
  position: absolute;
  top: 14px;
  right: 14px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 99px;
  background: var(--cream);
  color: var(--ink);
  letter-spacing: 0.02em;
}

.download-card:hover {
  border-color: var(--blue-400);
  transform: translateY(-2px);
}

/* ── Platform icon ────────────────────────────────────────────── */
.download-card__icon {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 32px;
  height: 32px;
  color: var(--ink);
}

.download-card__icon svg {
  width: 100%;
  height: 100%;
}

/* ── Card text ────────────────────────────────────────────────── */
.download-card__platform {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
}

.download-card__file {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--slate);
}

.download-card__arrow {
  margin-top: auto;
  align-self: flex-end;
  color: var(--blue-700);
  font-size: 1.1rem;
}

/* ── Linux format pills ───────────────────────────────────────── */
.format-pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.pill {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 3px 10px;
  border-radius: 99px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--slate);
  cursor: pointer;
  transition: background 100ms, color 100ms, border-color 100ms;
  line-height: 1.6;
}

.pill:hover {
  border-color: var(--blue-400);
  color: var(--blue-700);
}

.pill.active {
  background: var(--blue-50, #e8f0fe);
  color: var(--blue-700);
  border-color: var(--blue-400);
  font-weight: 600;
}

/* ── Download note ────────────────────────────────────────────── */
.download-note {
  padding-bottom: 72px;
  color: var(--slate);
  font-size: 0.92rem;
}

.download-note a {
  color: var(--blue-700);
  font-weight: 600;
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .download-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .download-grid {
    grid-template-columns: 1fr;
  }
}
</style>