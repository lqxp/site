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
  title: 'Download — QxChat',
  description: 'Download the latest version of QxChat for Windows, Linux, macOS and Android.',
  ogType: 'website'
})

const platforms = [
  { name: 'Linux',   matcher: /linux|appimage|\.deb|\.rpm/i },
  { name: 'Windows', matcher: /windows|win|\.exe|\.msi/i },
  { name: 'macOS',   matcher: /macos|darwin|\.dmg|\.pkg/i },
  { name: 'Android', matcher: /android|\.apk|\.aab/i }
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
      assetName: asset?.name ?? 'Browse releases',
      url: asset?.browser_download_url ?? 'https://github.com/lqxp/app/releases'
    }
  })
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
    <a
      v-for="item in downloads"
      :key="item.name"
      class="download-card"
      :href="item.url"
      target="_blank"
      rel="noreferrer"
    >
      <span class="download-card__icon" aria-hidden="true">
        <!-- ── Linux ─────────────────────────────────────────────────── -->
        <template v-if="item.name === 'Linux'">
          <!-- PASTE YOUR LINUX SVG HERE -->
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.642 8.084c-.364.189-.79.42-1.242.42s-.81-.209-1.066-.413c-.13-.101-.234-.202-.313-.276-.137-.108-.12-.259-.064-.254.094.012.108.136.168.191.08.075.18.172.302.269.243.192.567.38.973.38s.878-.238 1.167-.4c.163-.092.371-.256.541-.381.13-.095.125-.21.232-.198.107.013.028.127-.122.258a3.404 3.404 0 0 1-.576.404z"/>
            <path d="M19.649 17.77c-.142-.16-.209-.456-.281-.771s-.153-.654-.411-.874l-.002-.001a1.054 1.054 0 0 0-.317-.192c.359-1.065.219-2.126-.145-3.084-.444-1.177-1.222-2.202-1.815-2.903-.664-.838-1.313-1.633-1.301-2.808.021-1.793.197-5.118-2.958-5.122a4.66 4.66 0 0 0-.401.017c-3.526.283-2.59 4.008-2.643 5.255-.064.912-.249 1.631-.877 2.523-.736.876-1.774 2.295-2.266 3.771-.232.697-.342 1.407-.241 2.08a1.9 1.9 0 0 0-.091.089c-.216.231-.376.511-.555.699-.166.167-.403.229-.664.323s-.547.231-.721.565l-.001.002a1 1 0 0 0-.108.484c0 .154.023.311.046.461.048.313.097.609.032.81-.206.564-.232.954-.087 1.237.146.284.444.409.783.479.676.141 1.592.106 2.314.489l.062-.117-.061.118c.773.404 1.557.547 2.182.405.454-.104.821-.374 1.011-.789.489-.002 1.025-.209 1.885-.256.583-.047 1.312.207 2.149.16a1.119 1.119 0 0 0 .099.264c.324.649.928.946 1.571.896s1.329-.43 1.883-1.089l-.102-.085.102.084c.527-.64 1.403-.905 1.984-1.255.29-.175.525-.395.544-.713.018-.318-.169-.675-.599-1.152z"/>
            <path d="M11.738 6.762c.015.048.093.04.138.063.04.02.071.065.116.066.042.001.107-.015.113-.057.008-.056-.073-.091-.126-.111-.067-.026-.153-.039-.216-.004-.014.008-.03.027-.025.043zm-.46 0c-.016.048-.094.04-.139.063-.039.02-.071.065-.115.066-.042.001-.108-.015-.114-.057-.007-.056.074-.091.126-.111.067-.026.153-.039.217-.004.015.008.03.027.025.043z"/>
          </svg>
        </template>

        <!-- ── Windows ─────────────────────────────────────────────── -->
        <template v-else-if="item.name === 'Windows'">
          <!-- PASTE YOUR WINDOWS SVG HERE -->
          <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1458647,7289.43426 C13.1508772,7291.43316 13.1568922,7294.82929 13.1619048,7297.46884 C16.7759398,7297.95757 20.3899749,7298.4613 23.997995,7299 C23.997995,7295.84873 24.002005,7292.71146 23.997995,7289.71311 C20.3809524,7289.71311 16.7649123,7289.43426 13.1458647,7289.43426 M4,7289.43526 L4,7296.22153 C6.72581454,7296.58933 9.45162907,7296.94113 12.1724311,7297.34291 C12.1774436,7294.71736 12.1704261,7292.0908 12.1704261,7289.46524 C9.44661654,7289.47024 6.72380952,7289.42627 4,7289.43526 M4,7281.84344 L4,7288.61071 C6.72581454,7288.61771 9.45162907,7288.57673 12.1774436,7288.57973 C12.1754386,7285.96017 12.1754386,7283.34361 12.1724311,7280.72405 C9.44461153,7281.06486 6.71679198,7281.42567 4,7281.84344 M24,7288.47179 C20.3879699,7288.48578 16.7759398,7288.54075 13.1619048,7288.55175 C13.1598997,7285.88921 13.1598997,7283.22967 13.1619048,7280.56914 C16.7689223,7280.01844 20.3839599,7279.50072 23.997995,7279 C24,7282.15826 23.997995,7285.31353 24,7288.47179" transform="translate(-4 -7279)"/>
          </svg>
        </template>

        <!-- ── macOS ──────────────────────────────────────────────── -->
        <template v-else-if="item.name === 'macOS'">
          <!-- PASTE YOUR MACOS SVG HERE -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <rect width="512" height="512" rx="15%" fill="url(#mac-a)"/>
            <defs>
              <linearGradient id="mac-a" x2="0" y1="100%">
                <stop offset="0" stop-color="#1e73f2"/>
                <stop offset="1" stop-color="#19d3fd"/>
              </linearGradient>
              <linearGradient id="mac-b" x2="0" y1="100%">
                <stop offset="0" stop-color="#dbe9f4"/>
                <stop offset="1" stop-color="#f7f6f6"/>
              </linearGradient>
            </defs>
            <path fill="url(#mac-b)" d="M435.2 0H274.4c-21.2 49.2-59.2 129.6-60.8 283.4a9.9 9.9 0 0010 10.1h58.7a9.9 9.9 0 019.9 10.2A933.3 933.3 0 00311.3 512h123.9a76.8 76.8 0 0076.8-76.8V76.8A76.8 76.8 0 00435.2 0z"/>
            <path fill="none" stroke="#000" stroke-linecap="round" stroke-width="20" d="M371 149v34m-229-34v34m263.4 147.2a215.2 215.2 0 01-298.8 0"/>
          </svg>
        </template>

        <!-- ── Android ────────────────────────────────────────────── -->
        <template v-else-if="item.name === 'Android'">
          <!-- PASTE YOUR ANDROID SVG HERE -->
          <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M335.413,62.069l32.308-47.853c2.808-4.158,1.702-9.856-2.455-12.664c-4.158-2.807-9.856-1.701-12.664,2.456 L319.235,53.43C299.968,44.637,278.554,39.737,256,39.737c-22.553,0-43.967,4.9-63.234,13.694L159.398,4.008 c-2.807-4.157-8.506-5.263-12.663-2.456c-4.158,2.808-5.263,8.505-2.456,12.664l32.308,47.853 c-40.562,24.799-68.666,67.984-72.608,117.976h304.044C404.08,130.053,375.975,86.87,335.413,62.069z M193.951,133.99 c-11.754,0-21.283-9.528-21.283-21.283c0-11.755,9.529-21.283,21.283-21.283c11.754,0,21.283,9.528,21.283,21.283 C215.234,124.462,205.705,133.99,193.951,133.99z M318.05,133.99c-11.754,0-21.283-9.528-21.283-21.283 c0-11.755,9.529-21.283,21.283-21.283c11.754,0,21.283,9.528,21.283,21.283C339.333,124.462,329.804,133.99,318.05,133.99z"/>
            <path d="M101.653,244.206v175.82c0,13.804,11.28,25.084,25.084,25.084h41.472v41.046 c0,14.198,11.615,25.844,25.844,25.844c14.198,0,25.844-11.645,25.844-25.844V445.11h72.971v41.046 c0,14.198,11.615,25.844,25.844,25.844c14.199,0,25.844-11.645,25.844-25.844V445.11h36.059c13.774,0,25.084-11.28,25.084-25.084 v-175.82v-37.245H101.653V244.206z"/>
            <path d="M46.75,206.961c-16.426,0-29.864,13.438-29.864,29.864V335.2c0,16.425,13.439,29.864,29.864,29.864 c16.425,0,29.864-13.439,29.864-29.864v-98.375C76.614,220.4,63.175,206.961,46.75,206.961z"/>
            <path d="M465.251,206.961c-16.425,0-29.864,13.438-29.864,29.864V335.2c0,16.425,13.439,29.864,29.864,29.864 c16.425,0,29.864-13.439,29.864-29.864v-98.375C495.114,220.4,481.675,206.961,465.251,206.961z"/>
          </svg>
        </template>
      </span>

      <span class="download-card__platform">{{ item.name }}</span>
      <span class="download-card__file">{{ item.assetName }}</span>
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