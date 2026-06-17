<script setup lang="ts">
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
  title: 'Téléchargement — QxChat',
  description: 'Télécharge la dernière version de QxChat pour Windows, Linux, macOS et Android.',
  ogType: 'website'
})

const platforms = [
  { name: 'Windows', matcher: /windows|win|\.exe|\.msi/i },
  { name: 'Linux', matcher: /linux|appimage|\.deb|\.rpm/i },
  { name: 'Android', matcher: /android|\.apk|\.aab/i },
  { name: 'macOS', matcher: /macos|darwin|\.dmg|\.pkg/i }
]

const { data: latestRelease } = await useFetch<Release>('https://api.github.com/repos/lqxp/app/releases/latest', {
  key: 'lqxp-app-latest-release',
  default: () => ({ tag_name: '', html_url: 'https://github.com/lqxp/app/releases', assets: [] })
})

const downloads = computed(() => {
  const assets = latestRelease.value?.assets ?? []

  return platforms.map((platform) => {
    const asset = assets.find((item) => platform.matcher.test(item.name))

    return {
      name: platform.name,
      assetName: asset?.name ?? 'Voir les releases',
      url: asset?.browser_download_url ?? 'https://github.com/lqxp/app/releases'
    }
  })
})
</script>

<template>
  <section class="page-hero container">
    <p class="eyebrow">Téléchargement</p>
    <h1>Récupère la dernière version.</h1>
    <p class="lead">
      Les liens sont récupérés automatiquement depuis les
      <a href="https://github.com/lqxp/app/releases" target="_blank" rel="noreferrer">GitHub Releases</a>
      du dépôt lqxp/app.
    </p>
    <p v-if="latestRelease?.tag_name" class="release-tag">{{ latestRelease.tag_name }}</p>
  </section>

  <section class="download-grid container">
    <a
      v-for="item in downloads"
      :key="item.name"
      class="download-card"
      :href="item.url"
      target="_blank"
      rel="noreferrer"
    >
      <span class="download-card__platform">{{ item.name }}</span>
      <span class="download-card__file">{{ item.assetName }}</span>
      <span class="download-card__arrow" aria-hidden="true">↓</span>
    </a>
  </section>

  <section class="download-note container">
    <p>
      Pas de build pour ta plateforme ?
      <a href="https://github.com/lqxp/app" target="_blank" rel="noreferrer">Compile QxChat toi-même</a>,
      le code est ouvert.
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

.download-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 24px 0 48px;
}

.download-card {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  transition: border-color 150ms ease, transform 150ms ease;
}

.download-card:hover {
  border-color: var(--blue-400);
  transform: translateY(-2px);
}

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

.download-note {
  padding-bottom: 72px;
  color: var(--slate);
  font-size: 0.92rem;
}

.download-note a {
  color: var(--blue-700);
  font-weight: 600;
}

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
