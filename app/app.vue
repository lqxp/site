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

const appIcon = '/app-icon.svg'
const banner = '/image.png'

useSeoMeta({
  title: 'QxChat — Messagerie privée pour communautés et équipes',
  description:
    'QxChat est une messagerie privée avec salons, appels vocaux/vidéo, profils et chiffrement de rooms.',
  ogTitle: 'QxChat',
  ogDescription: 'Une messagerie privée, claire et multi-plateformes construite sur lqxp.',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

const showcase = [
  {
    type: 'image',
    src: '/assets/texting_showcase.png',
    title: 'Salons texte',
    text: 'Des conversations organisées par room, avec une interface claire.'
  },
  {
    type: 'image',
    src: '/assets/stream_showcase.png',
    title: 'Appels et stream',
    text: 'Voix, vidéo et partage d’écran pour travailler ou discuter en groupe.'
  },
  {
    type: 'image',
    src: '/assets/writing_showcase.png',
    title: 'Écriture rapide',
    text: 'Composer, répondre et suivre les échanges sans friction.'
  }
]

const useCases = [
  'Créer un serveur privé pour une équipe ou une communauté',
  'Discuter dans des salons texte avec historique local',
  'Lancer un appel vocal ou vidéo depuis une room',
  'Auto-héberger son infrastructure sans plateforme fermée'
]

const features = [
  ['Rooms privées', 'Des espaces de discussion accessibles sur invitation.'],
  ['Chiffrement', 'Des clés de room pour protéger les messages côté client.'],
  ['Multi-plateforme', 'Web, desktop Tauri et mobile sur la même base.'],
  ['Auto-hébergement', 'API, WebSocket et TURN configurables selon ton infra.']
]

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
  <div class="page-shell">
    <header id="top" class="hero">
      <nav class="topbar">
        <a class="brand" href="#top" aria-label="QxChat">
          <img class="brand__logo" :src="appIcon" alt="Logo QxChat" />
          <span>QxChat</span>
        </a>
        <div class="topbar__links">
          <a href="#definition">C’est quoi ?</a>
          <a href="#showcase">Showcase</a>
          <a href="#download">Download</a>
        </div>
      </nav>

      <div class="hero__grid">
        <div class="hero__copy">
          <span class="eyebrow">Messagerie privée · salons · appels</span>
          <h1>QxChat, c’est un Discord-like simple et auto-hébergeable.</h1>
          <p class="lead">
            Une app de chat pour créer des rooms, parler en vocal ou vidéo, gérer des profils et garder le contrôle de son infrastructure.
          </p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="#download">Télécharger</a>
            <a class="btn btn--secondary" href="#showcase">Voir l’app</a>
          </div>
        </div>

        <div class="product-card" aria-label="Aperçu QxChat">
          <img class="product-card__banner" :src="banner" alt="Bannière QxChat" />
          <div class="product-card__body">
            <img class="product-card__icon" :src="appIcon" alt="Logo QxChat" />
            <div>
              <strong>QxChat</strong>
              <span>Serveur privé · rooms · appels · profils</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <section id="definition" class="section definition">
        <div>
          <span class="eyebrow">Définition</span>
          <h2>Une messagerie pour discuter en groupe, sans dépendre d’un service centralisé.</h2>
        </div>
        <div class="definition__box">
          <p>
            QxChat rassemble les bases d’un outil communautaire : salons texte, appels, profils, présence et chiffrement de rooms.
          </p>
          <ul>
            <li v-for="item in useCases" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>

      <section id="showcase" class="section showcase-section">
        <div class="section__head">
          <span class="eyebrow">Showcase</span>
          <h2>L’app en situation, pas juste des promesses.</h2>
        </div>

        <div class="showcase-video">
          <video src="/assets/mobile_demo.mp4" autoplay muted loop playsinline controls></video>
          <div>
            <span>Mobile demo</span>
            <strong>Une interface utilisable aussi sur petit écran.</strong>
          </div>
        </div>

        <div class="showcase-grid">
          <article v-for="item in showcase" :key="item.src" class="showcase-card">
            <img :src="item.src" :alt="item.title" />
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="section features">
        <article v-for="feature in features" :key="feature[0]" class="feature-card">
          <h3>{{ feature[0] }}</h3>
          <p>{{ feature[1] }}</p>
        </article>
      </section>

      <section id="download" class="section download">
        <div>
          <span class="eyebrow">Download</span>
          <h2>Télécharger la dernière version depuis GitHub Releases.</h2>
          <p>
            Les liens sont récupérés automatiquement via l’API GitHub du repo <a href="https://github.com/lqxp/app" target="_blank" rel="noreferrer">lqxp/app</a>.
          </p>
        </div>

        <div class="download-grid">
          <a v-for="item in downloads" :key="item.name" class="download-card" :href="item.url" target="_blank" rel="noreferrer">
            <strong>{{ item.name }}</strong>
            <span>{{ item.assetName }}</span>
          </a>
        </div>
      </section>

      <section id="technique" class="section tech">
        <div>
          <span class="eyebrow">Technique</span>
          <h2>Un produit basé sur lqxp, Vue, Tauri, WebRTC et Rust.</h2>
        </div>
        <p>
          Le site explique le produit, montre l’interface et renvoie directement vers les builds disponibles.
        </p>
      </section>
    </main>
  </div>
</template>

<style>
:root {
  color-scheme: dark;
  --bg: #101114;
  --surface: #17191e;
  --surface-soft: #20232a;
  --text: #f4f0e8;
  --muted: #a7a39c;
  --line: rgba(255, 255, 255, 0.1);
  --primary: #f2c77b;
  --primary-dark: #21180d;
  --accent: #8fa7ff;
  --radius: 24px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background:
    radial-gradient(circle at 15% 0%, rgba(143, 167, 255, 0.18), transparent 26rem),
    radial-gradient(circle at 85% 12%, rgba(242, 199, 123, 0.16), transparent 24rem),
    var(--bg);
  color: var(--text);
}

a { color: inherit; text-decoration: none; }

.page-shell {
  min-height: 100vh;
}

.hero,
.section {
  width: min(1080px, calc(100% - 32px));
  margin: 0 auto;
}

.hero {
  padding: 24px 0 44px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 42px;
}

.brand,
.topbar__links,
.hero__actions,
.product-card__body {
  display: flex;
  align-items: center;
}

.brand {
  gap: 12px;
  font-weight: 750;
}

.brand__logo {
  width: 38px;
  height: 38px;
}

.topbar__links {
  gap: 18px;
  color: var(--muted);
  font-size: 0.94rem;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(320px, 0.78fr);
  gap: 34px;
  align-items: center;
}

.eyebrow {
  color: var(--primary);
  font-size: 0.78rem;
  font-weight: 750;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  max-width: 680px;
  margin-bottom: 18px;
  font-size: clamp(2.2rem, 5.1vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
}

h2 {
  margin-bottom: 0;
  font-size: clamp(1.55rem, 2.7vw, 2.35rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
}

h3 {
  margin-bottom: 8px;
  font-size: 1.08rem;
}

.lead,
p,
li {
  color: var(--muted);
  line-height: 1.65;
}

.lead {
  max-width: 620px;
  font-size: 1.06rem;
}

.hero__actions {
  gap: 12px;
  margin-top: 26px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 17px;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-weight: 700;
  font-size: 0.94rem;
}

.btn--primary {
  background: var(--primary);
  border-color: var(--primary);
  color: var(--primary-dark);
}

.btn--secondary {
  background: rgba(255, 255, 255, 0.04);
}

.product-card,
.definition__box,
.showcase-video,
.showcase-card,
.feature-card,
.download,
.download-card,
.tech {
  border: 1px solid var(--line);
  background: rgba(23, 25, 30, 0.82);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.26);
}

.product-card {
  overflow: hidden;
  border-radius: 30px;
}

.product-card__banner {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
}

.product-card__body {
  gap: 13px;
  padding: 16px;
}

.product-card__icon {
  width: 46px;
  height: 46px;
}

.product-card__body strong,
.product-card__body span {
  display: block;
}

.product-card__body span,
.showcase-video span,
.download-card span {
  color: var(--muted);
  font-size: 0.92rem;
}

.section {
  padding: 42px 0;
}

.definition {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(320px, 0.8fr);
  gap: 26px;
  align-items: start;
}

.definition__box,
.showcase-video,
.showcase-card,
.feature-card,
.download,
.download-card,
.tech {
  border-radius: var(--radius);
}

.definition__box,
.feature-card {
  padding: 24px;
}

.definition__box p {
  margin-bottom: 14px;
}

.definition__box ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding-left: 20px;
}

.section__head {
  max-width: 680px;
  margin-bottom: 22px;
}

.showcase-section {
  padding-top: 34px;
}

.showcase-video {
  overflow: hidden;
  margin-bottom: 16px;
}

.showcase-video video {
  width: 100%;
  max-height: 620px;
  object-fit: cover;
  display: block;
  background: #050506;
}

.showcase-video div {
  display: grid;
  gap: 4px;
  padding: 18px;
}

.showcase-video strong {
  font-size: 1.1rem;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.showcase-card {
  overflow: hidden;
}

.showcase-card img {
  width: 100%;
  aspect-ratio: 16 / 11;
  object-fit: cover;
  display: block;
}

.showcase-card div {
  padding: 18px;
}

.showcase-card p,
.feature-card p,
.download p,
.tech p {
  margin-bottom: 0;
}

.features,
.download-grid {
  display: grid;
  gap: 14px;
}

.features {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.feature-card {
  background: var(--surface-soft);
}

.download {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1fr);
  gap: 24px;
  align-items: start;
  padding: 28px;
}

.download p a {
  color: var(--primary);
}

.download-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.download-card {
  padding: 18px;
  transition: transform 160ms ease, border-color 160ms ease;
}

.download-card:hover {
  transform: translateY(-2px);
  border-color: rgba(242, 199, 123, 0.45);
}

.download-card strong,
.download-card span {
  display: block;
}

.download-card strong {
  margin-bottom: 8px;
}

.tech {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.8fr);
  gap: 24px;
  align-items: end;
  padding: 28px;
  margin-bottom: 54px;
}

@media (max-width: 900px) {
  .hero__grid,
  .definition,
  .showcase-grid,
  .features,
  .download,
  .tech {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .hero,
  .section {
    width: min(100%, calc(100% - 24px));
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 30px;
  }

  .topbar__links,
  .download-grid {
    grid-template-columns: 1fr;
    flex-wrap: wrap;
  }

  h1 {
    font-size: clamp(2rem, 12vw, 3rem);
  }

  .product-card,
  .definition__box,
  .showcase-video,
  .showcase-card,
  .feature-card,
  .download,
  .download-card,
  .tech {
    border-radius: 18px;
  }
}
</style>
