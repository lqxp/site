<script setup lang="ts">
useSeoMeta({
  title: 'Fonctionnalités — QxChat',
  description: 'Rooms privées, chiffrement, multi-plateforme et auto-hébergement : ce que QxChat fait, concrètement.',
  ogType: 'website'
})

const showcase = [
  {
    src: '/assets/texting_showcase.png',
    title: 'Salons texte',
    text: 'Des conversations organisées par room, avec une hiérarchie claire.'
  },
  {
    src: '/assets/stream_showcase.png',
    title: 'Appels et stream',
    text: 'Voix, vidéo et partage d’écran, dans la même fenêtre que le texte.'
  },
  {
    src: '/assets/writing_showcase.png',
    title: 'Écriture rapide',
    text: 'Composer, répondre, suivre un fil sans perdre le contexte.'
  }
]

const features = [
  {
    tag: 'ROOMS',
    title: 'Rooms privées',
    text: 'Des espaces accessibles uniquement sur invitation, avec leurs propres permissions.'
  },
  {
    tag: 'CRYPTO',
    title: 'Chiffrement par room',
    text: 'Chaque room génère sa clé ; les messages sont protégés côté client.'
  },
  {
    tag: 'OS × 4',
    title: 'Multi-plateforme',
    text: 'Web, desktop (Tauri) et mobile, construits depuis la même base de code.'
  },
  {
    tag: 'SELF',
    title: 'Auto-hébergement',
    text: 'API, WebSocket et TURN configurables selon ton infra — rien d’imposé.'
  }
]
</script>

<template>
  <section class="page-hero container">
    <p class="eyebrow">Fonctionnalités</p>
    <h1>Comment ça marche, concrètement.</h1>
    <p class="lead">
      Trois écrans suffisent à montrer l’essentiel : des salons clairs, des appels qui marchent, une interface
      qui ne traîne pas.
    </p>
  </section>

  <section class="showcase-video container">
    <div class="window-chrome">
      <div class="window-chrome__bar">
        <span></span><span></span><span></span>
      </div>
      <video
        class="window-chrome__media"
        src="/assets/mobile_demo.mp4"
        autoplay
        muted
        loop
        playsinline
        controls
      ></video>
    </div>
    <p class="showcase-video__caption">Démo mobile — la même base que sur desktop.</p>
  </section>

  <section class="showcase-grid container">
    <figure v-for="item in showcase" :key="item.src">
      <img :src="item.src" :alt="item.title" />
      <figcaption>
        <strong>{{ item.title }}</strong>
        <span>{{ item.text }}</span>
      </figcaption>
    </figure>
  </section>

  <section class="feature-rows container">
    <div v-for="f in features" :key="f.tag" class="feature-row">
      <span class="feature-row__tag">{{ f.tag }}</span>
      <div>
        <h3>{{ f.title }}</h3>
        <p>{{ f.text }}</p>
      </div>
    </div>
  </section>

  <section class="stack-strip">
    <p class="container">Construit avec <strong>lqxp</strong> · Vue · Tauri · WebRTC · Rust</p>
  </section>
</template>

<style scoped>
.page-hero {
  padding: 56px 0 40px;
}

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin-bottom: 14px;
  max-width: 620px;
}

.showcase-video {
  padding-bottom: 48px;
}

.showcase-video__caption {
  margin-top: 12px;
  color: var(--slate);
  font-size: 0.9rem;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-bottom: 56px;
}

.showcase-grid figure {
  margin: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #fff;
}

.showcase-grid img {
  aspect-ratio: 16 / 11;
  object-fit: cover;
}

.showcase-grid figcaption {
  padding: 16px;
}

.showcase-grid figcaption strong {
  display: block;
  margin-bottom: 4px;
}

.showcase-grid figcaption span {
  color: var(--slate);
  font-size: 0.88rem;
}

.feature-rows {
  padding-bottom: 64px;
}

.feature-row {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 20px;
  padding: 24px 0;
  border-top: 1px solid var(--line);
}

.feature-row:first-child {
  border-top: none;
}

.feature-row__tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--blue-700);
  padding-top: 4px;
}

.feature-row h3 {
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.feature-row p {
  color: var(--slate);
  max-width: 560px;
}

.stack-strip {
  background: var(--cream);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 18px 0;
}

.stack-strip p {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  text-align: center;
  color: var(--ink);
}

@media (max-width: 900px) {
  .showcase-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 680px) {
  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .feature-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
