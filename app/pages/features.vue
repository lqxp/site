<script setup lang="ts">
useSeoMeta({
  title: 'Features — QxChat',
  description: 'Private rooms, encryption, multi-platform and self-hosting: what QxChat actually does.',
  ogType: 'website'
})

const showcase = [
  {
    src: '/assets/texting_showcase.png',
    title: 'Text rooms',
    text: 'Conversations organized by room, with a clear hierarchy.'
  },
  {
    src: '/assets/stream_showcase.png',
    title: 'Calls & streaming',
    text: 'Voice, video and screen sharing, in the same window as text.'
  },
  {
    src: '/assets/writing_showcase.png',
    title: 'Quick writing',
    text: 'Compose, reply, follow a thread without losing context.'
  },
  {
    src: "/assets/overview_pc.png",
    title: "Desktop Experience",
    text: "Available in lightweight desktop client for Windows, macOS and Linux"
  }
]

const features = [
  {
    tag: 'ROOMS',
    title: 'Private rooms',
    text: 'Invite-only spaces, each with its own permissions.'
  },
  {
    tag: 'CRYPTO',
    title: 'Per-room encryption',
    text: 'Each room generates its own key; messages are protected client-side.'
  },
  {
    tag: 'OS × 4',
    title: 'Multi-platform',
    text: 'Web, desktop (Tauri) and mobile, built from the same codebase.'
  },
  {
    tag: 'SELF',
    title: 'Self-hosting',
    text: 'API, WebSocket and TURN configurable to your infra — nothing forced.'
  }
]
</script>

<template>
  <section class="page-hero container">
    <p class="eyebrow">Features</p>
    <h1>How it actually works.</h1>
    <p class="lead">
      Three screens are enough to show the essentials: clear rooms, calls that work, an interface
      that doesn't drag.
    </p>
  </section>

  <section class="showcase-video container">
    <div class="window-chrome">
      <div class="window-chrome__bar">
        <span></span><span></span><span></span>
      </div>
      <video class="window-chrome__media" src="/assets/mobile_demo.mp4" autoplay muted loop playsinline
        controls></video>
    </div>
    <p class="showcase-video__caption">Mobile demo — same base as desktop.</p>
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
    <p class="container">Built with <strong>lqxp</strong> · Vue · Tauri · WebRTC · Rust</p>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Shrink the demo video so it no longer dominates the page */
.showcase-video .window-chrome {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.showcase-video__caption {
  margin-top: 12px;
  color: var(--slate);
  font-size: 0.9rem;
  text-align: center;
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

  .showcase-video .window-chrome {
    max-width: 320px;
  }
}
</style>